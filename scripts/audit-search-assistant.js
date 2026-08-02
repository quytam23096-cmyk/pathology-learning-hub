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
  {
    id: "thyroid-ftc",
    chapter: "thyroid",
    diagnosis: "Ung thư biểu mô tuyến giáp thể nang",
    english: "Follicular thyroid carcinoma",
    pattern: ["carcinoma", "glandular"],
    micro: ["U dạng nang", "Bắt buộc có xâm lấn bao và/hoặc mạch", "Không có nhân kiểu PTC điển hình"],
    report: [], memory: "", pitfall: "", markers: ["TTF-1", "PAX8"],
  },
  {
    id: "thyroid-niftp",
    chapter: "thyroid",
    diagnosis: "Tân sinh tuyến giáp dạng nang không xâm nhập với đặc điểm nhân dạng nhú",
    english: "Non-invasive follicular thyroid neoplasm with papillary-like nuclear features",
    pattern: ["precursor", "glandular"],
    micro: ["Cấu trúc dạng nang", "Không xâm lấn bao/mạch, không nhú thật sự đáng kể"],
    report: [], memory: "", pitfall: "", markers: [],
  },
  {
    id: "lung-ais",
    chapter: "lung",
    diagnosis: "Ung thư biểu mô tuyến tại chỗ của phổi",
    english: "Adenocarcinoma in situ of the lung",
    pattern: ["precursor", "carcinoma", "glandular"],
    micro: ["Tăng trưởng mọc dọc vách phế nang (lepidic) thuần túy", "Không thấy xâm nhập mô đệm"],
    report: [], memory: "", pitfall: "", markers: ["TTF-1"],
  },
  {
    id: "lung-metastatic-colon",
    chapter: "lung",
    diagnosis: "Ung thư biểu mô tuyến đại trực tràng di căn phổi",
    english: "Metastatic colorectal adenocarcinoma in the lung",
    pattern: ["carcinoma", "glandular"],
    micro: ["Thường thiếu kiểu cấu trúc mọc dọc vách phế nang (lepidic)"],
    report: [], memory: "", pitfall: "", markers: ["SATB2", "CDX2"],
  },
  {
    id: "gyn-leiomyoma",
    chapter: "gyn",
    diagnosis: "U cơ trơn tử cung",
    english: "Uterine leiomyoma",
    pattern: ["benign", "spindle"],
    micro: ["Bó tế bào cơ trơn đan xen", "Không hoại tử u, phân bào thấp"],
    report: [], memory: "", pitfall: "", markers: ["Desmin"],
  },
  {
    id: "soft-osteosarcoma",
    chapter: "soft",
    diagnosis: "Sarcoma xương",
    english: "Osteosarcoma",
    pattern: ["spindle"],
    micro: ["Chất dạng xương ác tính được tạo trực tiếp bởi tế bào u"],
    report: [], memory: "", pitfall: "", markers: [],
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
  ["Lepidic is absent from thyroid", rank({ organ: "thyroid", clueIds: ["lepidic"] }).length, 0],
  ["Lepidic identifies lung AIS", rank({ organ: "lung", clueIds: ["lepidic"] })[0]?.item.id, "lung-ais"],
  ["Negative lepidic statement is excluded", rank({ organ: "lung", clueIds: ["lepidic"] }).some(({ item }) => item.id === "lung-metastatic-colon"), false],
  ["Follicular architecture identifies FTC", rank({ organ: "thyroid", clueIds: ["follicular"] })[0]?.item.id, "thyroid-ftc"],
  ["NIFTP is not papillary architecture", rank({ organ: "thyroid", clueIds: ["papillary"] }).some(({ item }) => item.id === "thyroid-niftp"), false],
  ["NIFTP is not invasive", rank({ organ: "thyroid", clueIds: ["invasive"] }).some(({ item }) => item.id === "thyroid-niftp"), false],
  ["Lung AIS is not invasive", rank({ organ: "lung", clueIds: ["invasive"] }).some(({ item }) => item.id === "lung-ais"), false],
  ["Negative necrosis statement is excluded", rank({ organ: "gyn", clueIds: ["high-grade"] }).some(({ item }) => item.id === "gyn-leiomyoma"), false],
  ["Sụn does not match sừng", rank({ clueIds: ["chondroid-osteoid"] }).some(({ item }) => item.id === "skin-scc"), false],
  ["Osteoid identifies osteosarcoma", rank({ organ: "soft", clueIds: ["chondroid-osteoid"] })[0]?.item.id, "soft-osteosarcoma"],
  ["Multiple clues use intersection", rank({ organ: "lung", clueIds: ["lepidic", "small-cell"] }).length, 0],
  ["Vietnamese free morphology query", rank({ organ: "lung", morphologyQuery: "tế bào nhỏ, khuôn nhân, hoại tử" })[0]?.item.id, "lung-small-cell"],
  ["English free morphology query", rank({ organ: "lung", morphologyQuery: "small cells with nuclear molding and necrosis" })[0]?.item.id, "lung-small-cell"],
  ["Free lepidic query is absent from thyroid", rank({ organ: "thyroid", morphologyQuery: "mọc dọc vách phế nang / lepidic" }).length, 0],
  ["Free keratin pearl query identifies SCC", rank({ organ: "skin", morphologyQuery: "cầu sừng / keratin pearl" })[0]?.item.id, "skin-scc"],
  ["Free capsular invasion query identifies FTC", rank({ organ: "thyroid", morphologyQuery: "xâm nhập bao của u dạng nang" })[0]?.item.id, "thyroid-ftc"],
];

const failures = checks.filter(([, actual, expected]) => actual !== expected);
const coverageFailures = [];
if (assistant.organOptions.length < 45) coverageFailures.push("Organ coverage below 45 options");
if (assistant.morphologyClues.length < 35) coverageFailures.push("Morphology coverage below 35 clues");
if (assistant.morphologyClues.some((clue) => !clue.group || !clue.sourceTerms?.length)) {
  coverageFailures.push("Morphology clue missing group or source terms");
}
if (assistant.morphologyClues.some((clue) => !Array.isArray(clue.caseIds))) {
  coverageFailures.push("Morphology clue missing curated case matrix");
}
if (!assistant.morphologyAuditVersion?.startsWith("2026-08-02")) {
  coverageFailures.push("Morphology audit version is missing or stale");
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

const stomachOption = assistant.organOptions.find((option) => option.id === "stomach");
const skinOption = assistant.organOptions.find((option) => option.id === "skin");
const thyroidOption = assistant.organOptions.find((option) => option.id === "thyroid");
const parathyroidOption = assistant.organOptions.find((option) => option.id === "parathyroid");
const chapterNameFor = (chapter) => ({ uppergi: "Thực quản - dạ dày", skin: "Da" }[chapter] || chapter);
const gastricCase = {
  id: "gastric",
  chapter: "uppergi",
  diagnosis: "Ung thư biểu mô tuyến dạ dày",
  english: "Gastric adenocarcinoma",
  pattern: ["glandular"],
  markers: [],
  micro: ["Tạo tuyến ác tính"],
  report: [],
  memory: "",
  pitfall: "",
};
const skinCase = {
  ...gastricCase,
  id: "skin",
  chapter: "skin",
  diagnosis: "Ung thư biểu mô tế bào đáy",
  english: "Basal cell carcinoma of skin",
};
if (!assistant.caseMatchesOrgan(gastricCase, stomachOption, chapterNameFor)) {
  coverageFailures.push("Gastric case must match the detailed stomach organ");
}
if (assistant.caseMatchesOrgan(skinCase, stomachOption, chapterNameFor)) {
  coverageFailures.push("Skin case must not match the detailed stomach organ");
}
if (!assistant.caseMatchesOrgan(skinCase, skinOption, chapterNameFor)) {
  coverageFailures.push("Skin case must match the detailed skin organ");
}
const parathyroidCase = {
  ...gastricCase,
  id: "parathyroid",
  chapter: "thyroid",
  diagnosis: "U tuyến cận giáp",
  english: "Parathyroid adenoma",
};
if (!assistant.caseMatchesOrgan(parathyroidCase, parathyroidOption, chapterNameFor)) {
  coverageFailures.push("Parathyroid case must match the detailed parathyroid organ");
}
if (assistant.caseMatchesOrgan(parathyroidCase, thyroidOption, chapterNameFor)) {
  coverageFailures.push("Parathyroid case must not be grouped as thyroid by substring");
}

console.log(JSON.stringify({
  checks: checks.length,
  organOptions: assistant.organOptions.length,
  morphologyClues: assistant.morphologyClues.length,
  failures,
  coverageFailures,
}, null, 2));
if (failures.length || coverageFailures.length) process.exitCode = 1;
