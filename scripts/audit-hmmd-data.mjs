import fs from "node:fs/promises";
import crypto from "node:crypto";

const dataSource = await fs.readFile(new URL("../hmmd-data.js", import.meta.url), "utf8");
const searchSource = await fs.readFile(new URL("../hmmd-search.js", import.meta.url), "utf8");
const dataset = JSON.parse(dataSource.replace(/^window\.HMMD_DATASET\s*=\s*/u, "").replace(/;\s*$/u, ""));
const cases2025 = dataset.cases.filter((item) => /^hmmd-2025-/u.test(item.id));
const cases2026 = dataset.cases.filter((item) => /^hmmd-2026-/u.test(item.id));
const ids = new Set(dataset.cases.map((item) => item.id));
const sensitiveKeys = new Set(["name", "fullName", "patientName", "age", "address", "patientId", "pathologyId", "soGpb", "soVv"]);
const exposedSensitiveKeys = [...new Set(dataset.cases.flatMap((item) => Object.keys(item).filter((key) => sensitiveKeys.has(key))))];
const forbiddenSpellingPattern = /PD\s*=\s*L\s*1|KI567|(?<![A-Za-z0-9])K67(?![A-Za-z0-9])|SYNAPTO(?:PHYSSIN|PHUSSIN)|(?<![A-Za-z0-9])(?:MLHI|MLS1|MSH1|PHS2)(?![A-Za-z0-9])/giu;
let forbidden2026Spellings = 0;
for (const item of cases2026) {
  const text = [item.positiveText, item.negativeText, item.notesText].filter(Boolean).join("\n");
  forbiddenSpellingPattern.lastIndex = 0;
  forbidden2026Spellings += [...text.matchAll(forbiddenSpellingPattern)].length;
}
const mmrPanelCases = cases2026.filter((item) => {
  const markers = new Set([...(item.positive || []), ...(item.negative || [])]);
  return ["MLH1", "PMS2", "MSH2", "MSH6"].every((marker) => markers.has(marker));
}).length;
function clinicalContentHash(cases) {
  const immutable = cases.map((item) => ({
    id: item.id,
    diagnosisText: item.diagnosisText,
    conclusionText: item.conclusionText,
    positive: item.positive,
    negative: item.negative,
    positiveDisplay: item.positiveDisplay,
    negativeDisplay: item.negativeDisplay,
    positiveText: item.positiveText,
    negativeText: item.negativeText,
    notesText: item.notesText,
    suggested: item.suggested,
  }));
  return crypto.createHash("sha256").update(JSON.stringify(immutable)).digest("hex");
}

const existingCasesHash = clinicalContentHash(cases2025);
const checks = {
  caseCount: dataset.cases.length === 3924,
  metaCaseCount: dataset.meta?.caseCount === 3924,
  cases2025: cases2025.length === 2378,
  cases2026: cases2026.length === 1546,
  uniqueIds: ids.size === dataset.cases.length,
  existingCasesPreserved: existingCasesHash === "16ee72a4e8b7b102ee4ce0086224bca5b79ff8ead66efff33dc0e5918c9cdfc5",
  noSensitiveKeys: exposedSensitiveKeys.length === 0,
  normalized2026Spellings: forbidden2026Spellings === 0,
  mmrPanelExpandedIn2026: mmrPanelCases >= 13,
  searchUsesKi67: /\["ki67",\s*"Ki67"\]/u.test(searchSource),
  searchNormalizesSynaptophysinTypos: /synaptophyssin/u.test(searchSource) && /synaptophussin/u.test(searchSource),
  searchExpandsMmrPanel: /function\s+expandMmrPanel/u.test(searchSource) && /"MLH1",\s*"PMS2",\s*"MSH2",\s*"MSH6"/u.test(searchSource),
  searchRecognizesPdL1EqualsTypo: /\[-–=\]\?/u.test(searchSource),
};
console.log(JSON.stringify({
  meta: dataset.meta,
  cases2025: cases2025.length,
  cases2026: cases2026.length,
  exposedSensitiveKeys,
  forbidden2026Spellings,
  mmrPanelCases,
  checks,
}, null, 2));
if (Object.values(checks).some((value) => value !== true)) throw new Error("HMMD data audit failed");
