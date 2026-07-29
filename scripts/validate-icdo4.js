const fs = require("fs");
const vm = require("vm");

const context = { window: {}, console };
vm.createContext(context);

for (const file of ["atlas-curation.js", "atlas-expansion.js", "icdo-normalization.js"]) {
  vm.runInContext(fs.readFileSync(file, "utf8"), context, { filename: file });
}

const metadata = context.window.ATLAS_CURATION.caseMetadata;
const audit = context.window.ICDO4_AUDIT;
const failures = [];
const codePattern = /\b[0-9]{4}[0-9A-Z]\/[0-9]\b/g;

if (!audit) failures.push("window.ICDO4_AUDIT was not created");
if (Object.keys(metadata).length !== 120) failures.push(`expected 120 cases, found ${Object.keys(metadata).length}`);

for (const [id, value] of Object.entries(metadata)) {
  const icdo = value.icdo;
  if (!icdo) {
    failures.push(`${id}: missing ICD-O metadata`);
    continue;
  }

  const codes = icdo.code.match(codePattern) || [];
  if (icdo.status === "not-coded" && codes.length) failures.push(`${id}: not-coded entry contains a code`);
  if (icdo.status !== "not-coded" && !codes.length) failures.push(`${id}: coded entry has no morphology code`);
  if (icdo.status === "exact" && codes.length !== 1) failures.push(`${id}: exact entry must contain one code`);
  if (icdo.status === "conditional" && codes.length < 2) failures.push(`${id}: conditional entry must contain at least two codes`);

  for (const code of codes) {
    if (!audit.officialPreferredTerms[code]) failures.push(`${id}: ${code} is absent from the audited ICD-O-4 term map`);
  }

  if (!icdo.verified) failures.push(`${id}: ICD-O audit flag is false`);
}

const expectedCorrections = {
  "thyroid-anaplastic": "80202/3",
  "lung-ais": "82500/2",
  "lung-mucinous": "82530/3",
  "cervix-scc": "80850/3",
  "colon-high-grade-dysplasia": "82103/2",
};

for (const [id, code] of Object.entries(expectedCorrections)) {
  if (metadata[id].icdo.code !== code) failures.push(`${id}: expected corrected code ${code}, found ${metadata[id].icdo.code}`);
}

if (failures.length) {
  console.error(failures.join("\n"));
  process.exit(1);
}

console.log(JSON.stringify({
  cases: audit.caseCount,
  coded: audit.codedCaseCount,
  conditional: audit.conditionalCaseCount,
  notCoded: audit.notCodedCaseCount,
  auditedCodes: Object.keys(audit.officialPreferredTerms).length,
  source: audit.source,
  releaseDate: audit.releaseDate,
  workbookSha256: audit.workbookSha256,
}, null, 2));
