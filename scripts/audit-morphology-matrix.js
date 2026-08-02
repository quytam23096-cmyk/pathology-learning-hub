const fs = require("fs");
const vm = require("vm");

const context = { window: {}, console };
context.globalThis = context;
vm.createContext(context);

for (const file of [
  "atlas-curation.js",
  "atlas-bilingual.js",
  "atlas-expansion.js",
  "search-assistant.js",
]) {
  vm.runInContext(fs.readFileSync(file, "utf8"), context, { filename: file });
}

const appSource = fs.readFileSync("app.js", "utf8");
const appMarker = "cases.forEach(standardizeBuiltinCase);";
const appPrefix = appSource.slice(0, appSource.indexOf(appMarker) + appMarker.length)
  + ";globalThis.__atlasCases=cases;globalThis.__atlasChapters=chapters;";
vm.runInContext(appPrefix, context, { filename: "app-morphology-audit.js" });

const assistant = context.window.ATLAS_SEARCH_ASSISTANT;
const cases = context.__atlasCases;
const chapterNames = new Map(context.__atlasChapters.map((chapter) => [chapter.id, chapter.name]));
const caseIds = new Set(cases.map((item) => item.id));
const failures = [];

if (caseIds.size !== cases.length) failures.push("Atlas contains duplicate case ids");

for (const clue of assistant.morphologyClues) {
  if (!Array.isArray(clue.caseIds)) {
    failures.push(`${clue.id}: missing curated caseIds`);
    continue;
  }

  const unique = new Set(clue.caseIds);
  if (unique.size !== clue.caseIds.length) failures.push(`${clue.id}: duplicate case id in matrix`);
  for (const id of unique) {
    if (!caseIds.has(id)) failures.push(`${clue.id}: unknown case id ${id}`);
  }

  const rankedIds = assistant.rankCases(cases, {
    clueIds: [clue.id],
    chapterNameFor: (id) => chapterNames.get(id) || id,
  }).map(({ item }) => item.id);
  const expected = [...unique].sort();
  const actual = [...rankedIds].sort();
  if (JSON.stringify(actual) !== JSON.stringify(expected)) {
    failures.push(`${clue.id}: runtime results differ from curated matrix`);
  }
}

const matchingIds = (clueIds, organ = "all") => assistant.rankCases(cases, {
  clueIds,
  allowedChapters: organ === "all" ? [] : [organ],
  chapterNameFor: (id) => chapterNames.get(id) || id,
}).map(({ item }) => item.id);

const invariants = [
  ["lepidic excludes every thyroid lesion", !matchingIds(["lepidic"], "thyroid").length],
  ["lepidic excludes colorectal metastasis with a negative statement", !matchingIds(["lepidic"]).includes("lung-metastatic-colon")],
  ["follicular architecture includes follicular thyroid carcinoma", matchingIds(["follicular"], "thyroid").includes("thyroid-ftc")],
  ["follicular architecture excludes pilocytic astrocytoma", !matchingIds(["follicular"]).includes("cns-pilocytic-astrocytoma")],
  ["papillary architecture excludes NIFTP", !matchingIds(["papillary"]).includes("thyroid-niftp")],
  ["invasion excludes NIFTP", !matchingIds(["invasive"]).includes("thyroid-niftp")],
  ["invasion excludes lung AIS", !matchingIds(["invasive"]).includes("lung-ais")],
  ["invasion excludes breast LCIS", !matchingIds(["invasive"]).includes("breast-lcis")],
  ["high-grade morphology excludes leiomyoma", !matchingIds(["high-grade"]).includes("gyn-leiomyoma")],
  ["chondroid or osteoid excludes squamous keratinisation", !matchingIds(["chondroid-osteoid"]).includes("skin-scc")],
  ["amyloid identifies medullary thyroid carcinoma", matchingIds(["amyloid"]).includes("thyroid-medullary")],
  ["hyaline material excludes medullary thyroid carcinoma", !matchingIds(["hyaline-amyloid"]).includes("thyroid-medullary")],
  ["combined clues are intersected", !matchingIds(["lepidic", "small-cell"]).length],
];

for (const [label, passed] of invariants) {
  if (!passed) failures.push(label);
}

console.log(JSON.stringify({
  auditVersion: assistant.morphologyAuditVersion,
  cases: cases.length,
  morphologyClues: assistant.morphologyClues.length,
  curatedRelations: assistant.morphologyClues.reduce((total, clue) => total + clue.caseIds.length, 0),
  invariants: invariants.length,
  failures,
}, null, 2));

if (failures.length) process.exitCode = 1;
