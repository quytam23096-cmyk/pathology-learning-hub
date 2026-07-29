const fs = require("fs");
const vm = require("vm");

const context = { window: {} };
vm.createContext(context);
vm.runInContext(fs.readFileSync("search-assistant.js", "utf8"), context, { filename: "search-assistant.js" });

const assistant = context.window.ATLAS_SEARCH_ASSISTANT;
if (!assistant?.rankCases) throw new Error("Khong nap duoc bo tim kiem dinh huong.");

const cases = [
  {
    id: "lung-small-cell",
    chapter: "lung",
    diagnosis: "Ung thư biểu mô tế bào nhỏ của phổi",
    english: "Small cell carcinoma of the lung",
    pattern: ["carcinoma", "neuroendocrine"],
    micro: ["Tế bào nhỏ, khuôn nhân, giả ảnh đè ép", "Hoại tử và nhiều phân bào"],
    report: [],
    memory: "",
    pitfall: "",
    markers: ["INSM1", "Synaptophysin", "TTF-1"],
  },
  {
    id: "breast-idc",
    chapter: "breast",
    diagnosis: "Ung thư biểu mô vú xâm nhập, không thuộc típ đặc biệt",
    english: "Invasive breast carcinoma of no special type",
    pattern: ["carcinoma", "glandular"],
    micro: ["Tế bào u tạo tuyến và xâm nhập mô đệm"],
    report: [],
    memory: "",
    pitfall: "",
    markers: ["ER", "PR", "HER2", "GATA3"],
  },
  {
    id: "skin-scc",
    chapter: "skin",
    diagnosis: "Ung thư biểu mô tế bào vảy da",
    english: "Cutaneous squamous cell carcinoma",
    pattern: ["carcinoma", "squamous"],
    micro: ["Sừng hóa, cầu sừng và cầu nối gian bào"],
    report: [],
    memory: "",
    pitfall: "",
    markers: ["p40", "CK5/6"],
  },
  {
    id: "ovary-krukenberg",
    chapter: "gyn",
    diagnosis: "U Krukenberg (ung thư biểu mô tế bào nhẫn di căn buồng trứng)",
    english: "Krukenberg tumour",
    pattern: ["carcinoma", "glandular"],
    micro: ["Tế bào nhẫn trong mô đệm phản ứng"],
    report: [],
    memory: "",
    pitfall: "",
    markers: ["CK7", "CK20", "CDX2", "SATB2"],
  },
];

const chapterNames = { lung: "Phổi", breast: "Vú", skin: "Da", gyn: "Phụ khoa" };
const rank = (options) => assistant.rankCases(cases, {
  chapterNameFor: (id) => chapterNames[id],
  ...options,
});

const checks = [
  ["Vietnamese organ and malignancy", rank({ query: "ung thu vu" })[0]?.item.id, "breast-idc"],
  ["Vietnamese clinical wording", rank({ query: "u ac tinh vu" })[0]?.item.id, "breast-idc"],
  ["Morphology phrase", rank({ query: "te bao nho khuon nhan" })[0]?.item.id, "lung-small-cell"],
  ["Noisy novice wording", rank({ query: "khong biet chan doan thay te bao nho khuon nhan" })[0]?.item.id, "lung-small-cell"],
  ["Accent-sensitive signet-ring wording", rank({ query: "tế bào nhẫn" })[0]?.item.id, "ovary-krukenberg"],
  ["Accent-sensitive signet-ring result count", rank({ query: "tế bào nhẫn" }).length, 1],
  ["English diagnosis", rank({ query: "small cell carcinoma" })[0]?.item.id, "lung-small-cell"],
  ["Guided clue", rank({ organ: "skin", clueIds: ["squamous"] })[0]?.item.id, "skin-scc"],
  ["IHC marker", rank({ organ: "lung", marker: "INSM1 TTF-1" })[0]?.item.id, "lung-small-cell"],
];

const failures = checks.filter(([, actual, expected]) => actual !== expected);
const coverageFailures = [];
if (assistant.organOptions.length < 45) coverageFailures.push("Organ coverage below 45 options");
if (assistant.morphologyClues.length < 35) coverageFailures.push("Morphology coverage below 35 clues");
if (assistant.morphologyClues.some((clue) => !clue.group || !clue.sourceTerms?.length)) {
  coverageFailures.push("Morphology clue missing group or source terms");
}
if (new Set(assistant.organOptions.map((option) => option.id)).size !== assistant.organOptions.length) {
  coverageFailures.push("Duplicate organ option id");
}
if (new Set(assistant.morphologyClues.map((clue) => clue.id)).size !== assistant.morphologyClues.length) {
  coverageFailures.push("Duplicate morphology clue id");
}
if (assistant.organOptions.some((option) => option.id !== "all" && (!option.label || !option.group || !option.terms?.length))) {
  coverageFailures.push("Organ option missing label, group, or source terms");
}

console.log(JSON.stringify({
  checks: checks.length,
  organOptions: assistant.organOptions.length,
  morphologyClues: assistant.morphologyClues.length,
  failures,
  coverageFailures,
}, null, 2));
if (failures.length || coverageFailures.length) process.exitCode = 1;
