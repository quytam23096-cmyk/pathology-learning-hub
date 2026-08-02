import fs from "node:fs/promises";
import crypto from "node:crypto";

const dataSource = await fs.readFile(new URL("../hmmd-data.js", import.meta.url), "utf8");
const icdSource = await fs.readFile(new URL("../icd10-tt06-data.js", import.meta.url), "utf8");
const searchSource = await fs.readFile(new URL("../hmmd-search.js", import.meta.url), "utf8");
const htmlSource = await fs.readFile(new URL("../hmmd-search.html", import.meta.url), "utf8");
const report = JSON.parse(await fs.readFile(new URL("../reports/hmmd-organ-mapping-audit.json", import.meta.url), "utf8"));
const dataset = JSON.parse(dataSource.replace(/^window\.HMMD_DATASET\s*=\s*/u, "").replace(/;\s*$/u, ""));
const icdDataset = JSON.parse(icdSource.replace(/^window\.ICD10_TT06_DATA\s*=\s*/u, "").replace(/;\s*$/u, ""));

const organs = [
  "lung", "colorectal", "breast", "stomach", "esophagus", "small_bowel", "liver",
  "biliary_pancreas", "kidney", "urinary_male", "gynecologic", "thyroid", "endocrine",
  "head_neck", "cns", "hematolymphoid", "skin", "bone_soft_tissue", "mediastinum",
  "peritoneum_retroperitoneum", "other",
];
const organSet = new Set(organs);
const officialIcdCodes = new Set((icdDataset.entries || []).map((entry) => String(entry.code).toUpperCase()));
const sensitiveKeys = new Set(["name", "fullName", "patientName", "age", "address", "patientId", "pathologyId", "soGpb", "soVv"]);

function normalize(value) {
  return String(value || "").normalize("NFD").replace(/[\u0300-\u036f]/gu, "").replace(/đ/giu, "d").toLowerCase();
}

function diagnosisIntent(value) {
  const text = normalize(value).replace(/[^a-z0-9]+/gu, " ").trim();
  if (/\b(?:tai cho|in situ)\b/u.test(text)) return "in_situ";
  if (/\b(?:u ac|ung thu|carcinom|adenocarcinom|sarcom|lymphom|melanom)\b/u.test(text) || /^k(?: |$)/u.test(text)) return "malignant";
  if (/\b(?:u lanh|lanh tinh|benign)\b/u.test(text)) return "benign";
  if (/\b(?:khong chac chan|chua ro ban chat|khong ro ban chat|khong xac dinh tinh chat)\b/u.test(text)) return "uncertain";
  return "";
}

function icdMatchesIntent(code, intent) {
  const match = String(code || "").toUpperCase().match(/^([CD])(\d{2})/u);
  if (!match || !intent) return !intent;
  const number = Number(match[2]);
  if (intent === "malignant") return match[1] === "C";
  if (intent === "in_situ") return match[1] === "D" && number <= 9;
  if (intent === "benign") return match[1] === "D" && number >= 10 && number <= 36;
  if (intent === "uncertain") return match[1] === "D" && number >= 37 && number <= 48;
  return true;
}

function contentHash(cases) {
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

const counts = Object.fromEntries(organs.map((organ) => [organ, dataset.cases.filter((item) => item.organ === organ).length]));
const invalidOrgans = dataset.cases.filter((item) => !organSet.has(item.organ));
const invalidConfidence = dataset.cases.filter((item) => !["high", "medium", "low"].includes(item.organMappingConfidence));
const unresolvedMismatch = dataset.cases.filter((item) => item.organ === "other" && (item.organMappingSource !== "unresolved" || item.organMappingConfidence !== "low"));
const classifiedMismatch = dataset.cases.filter((item) => item.organ !== "other" && item.organMappingConfidence === "low");
const invalidSuggestedIcd = dataset.cases.filter((item) => item.icd10Suggested && !officialIcdCodes.has(String(item.icd10Suggested).toUpperCase()));
const invalidSuggestedIcdIntent = dataset.cases.filter((item) => item.icd10Suggested && !icdMatchesIntent(item.icd10Suggested, diagnosisIntent(item.diagnosisText)));
const exposedSensitiveKeys = [...new Set(dataset.cases.flatMap((item) => Object.keys(item).filter((key) => sensitiveKeys.has(key))))];
const ids = new Set(dataset.cases.map((item) => item.id));
const currentContentHash = contentHash(dataset.cases);
const expectedContentHash = "8adae037ca3ab51c155bde3b2d7bbc3bbb21f923bf5627abad263afd9cad4a11";

const checks = {
  caseCountPreserved: dataset.cases.length === 3924 && dataset.meta?.caseCount === 3924,
  uniqueIds: ids.size === dataset.cases.length,
  noSensitiveKeys: exposedSensitiveKeys.length === 0,
  organTaxonomyComplete: dataset.meta?.organCount === organs.length && invalidOrgans.length === 0,
  mappingMetadataComplete: invalidConfidence.length === 0,
  unresolvedCasesRemainExplicit: unresolvedMismatch.length === 0 && counts.other === 120,
  classifiedCasesHaveSupportedConfidence: classifiedMismatch.length === 0,
  officialIcdSuggestionsOnly: invalidSuggestedIcd.length === 0,
  suggestedIcdRespectsDiseaseBehavior: invalidSuggestedIcdIntent.length === 0,
  clinicalContentPreserved: currentContentHash === expectedContentHash && report.source?.contentHash === expectedContentHash && report.quality?.contentHashPreserved === true,
  reportMatchesDataset: report.after?.unclassified === counts.other && report.quality?.resolvedFromOther === 1908,
  uiContainsEveryOrgan: organs.every((organ) => new RegExp(`${organ}:|value=["']${organ}["']`, "u").test(searchSource + htmlSource)),
  uiShowsMappingEvidence: /caseLocationLabel/u.test(searchSource) && /icd10Suggested/u.test(searchSource) && /specimenSite/u.test(searchSource),
};

console.log(JSON.stringify({
  counts,
  unclassifiedRate: counts.other / dataset.cases.length,
  reportQuality: report.quality,
  invalidOrgans: invalidOrgans.length,
  invalidConfidence: invalidConfidence.length,
  unresolvedMismatch: unresolvedMismatch.length,
  classifiedMismatch: classifiedMismatch.length,
  invalidSuggestedIcd: invalidSuggestedIcd.length,
  invalidSuggestedIcdIntent: invalidSuggestedIcdIntent.length,
  exposedSensitiveKeys,
  currentContentHash,
  checks,
}, null, 2));

if (Object.values(checks).some((value) => value !== true)) throw new Error("HMMD organ mapping audit failed");
