const fs = require("fs");
const vm = require("vm");

const context = { window: {} };
vm.createContext(context);

["medical-vi.js", "who-catalog.js", "webpathology-catalog.js"].forEach((file) => {
  vm.runInContext(fs.readFileSync(file, "utf8"), context, { filename: file });
});

const medicalVi = context.window.MEDICAL_VI;
const who = context.window.WHO_ATLAS_CATALOG;
const webPathology = context.window.WEBPATHOLOGY_CATALOG;

if (!medicalVi?.translateDetailed || !who?.entries || !webPathology?.entries) {
  throw new Error("Khong nap duoc lop dich hoac danh muc nguon.");
}

const values = [];
who.entries.forEach((entry) => {
  [entry.nameEn, entry.sectionEn, entry.groupEn, entry.categoryEn]
    .filter(Boolean)
    .forEach((source) => values.push({ source, catalog: "WHO" }));
});
webPathology.entries.forEach((entry) => {
  [entry.titleEn, ...(entry.trailEn || [])]
    .filter(Boolean)
    .forEach((source) => values.push({ source, catalog: "WebPathology" }));
});

const unique = [...new Map(values.map((item) => [`${item.catalog}\0${item.source}`, item])).values()];
const counts = { reviewed: 0, assisted: 0, "source-only": 0 };
const unsafe = [];
const forbidden = /(?:tận cùn(?!g)|quá sản|nội ống|diagnostic nhóm|cấp inflammation|eosinophilic viêm|xơ hóa pneumocytoma)/i;

unique.forEach((item) => {
  const detail = medicalVi.translateDetailed(item.source);
  counts[detail.status] = (counts[detail.status] || 0) + 1;
  if (detail.text && (medicalVi.hasUnsafeEnglishResidue(detail.text) || forbidden.test(detail.text))) {
    unsafe.push({ ...item, translation: detail.text, status: detail.status });
  }
});

const expectations = new Map([
  ["Acute inflammation and suppuration", "Viêm cấp và mưng mủ"],
  ["Histiocytic, lymphocytic, and eosinophilic inflammatory patterns", "Các kiểu viêm ưu thế mô bào, lympho bào và bạch cầu ái toan"],
  ["Chapter 4: Diagnostic category: Benign", "Chương 4: Nhóm chẩn đoán: Lành tính"],
  ["Pulmonary hamartoma", "U mô thừa của phổi"],
  ["Sclerosing pneumocytoma", "U phế bào xơ hóa"],
  ["Blunt Duct Adenosis", "Bệnh tuyến ống tận cùng"],
  ["Ductal Hyperplasia", "Tăng sản biểu mô ống tuyến"],
  ["Intraductal Papilloma", "U nhú trong ống"],
]);

const mismatches = [];
expectations.forEach((expected, source) => {
  const actual = medicalVi.translateDetailed(source).text;
  if (actual !== expected) mismatches.push({ source, expected, actual });
});

const uiFiles = ["app.js", "atlas-bilingual.js", "atlas-curation.js", "atlas-expansion.js", "search-assistant.js", "index.html"];
const uiViolations = [];
uiFiles.filter((file) => fs.existsSync(file)).forEach((file) => {
  const lines = fs.readFileSync(file, "utf8").split(/\r?\n/);
  lines.forEach((line, index) => {
    if (forbidden.test(line)) {
      uiViolations.push({ file, line: index + 1, text: line.trim().slice(0, 180) });
    }
  });
});

console.log(JSON.stringify({
  catalogs: {
    whoEntries: who.entries.length,
    webPathologyEntries: webPathology.entries.length,
    uniqueStrings: unique.length,
  },
  translationStatus: counts,
  unsafeTranslations: unsafe.length,
  expectationMismatches: mismatches.length,
  uiTerminologyViolations: uiViolations.length,
  unsafeExamples: unsafe.slice(0, 10),
  mismatches,
  uiViolations: uiViolations.slice(0, 20),
}, null, 2));

if (unsafe.length || mismatches.length || uiViolations.length) process.exitCode = 1;
