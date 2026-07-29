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
];

const chapterNames = { lung: "Phổi", breast: "Vú", skin: "Da" };
const rank = (options) => assistant.rankCases(cases, {
  chapterNameFor: (id) => chapterNames[id],
  ...options,
});

const checks = [
  ["Vietnamese organ and malignancy", rank({ query: "ung thu vu" })[0]?.item.id, "breast-idc"],
  ["Vietnamese clinical wording", rank({ query: "u ac tinh vu" })[0]?.item.id, "breast-idc"],
  ["Morphology phrase", rank({ query: "te bao nho khuon nhan" })[0]?.item.id, "lung-small-cell"],
  ["Noisy novice wording", rank({ query: "khong biet chan doan thay te bao nho khuon nhan" })[0]?.item.id, "lung-small-cell"],
  ["English diagnosis", rank({ query: "small cell carcinoma" })[0]?.item.id, "lung-small-cell"],
  ["Guided clue", rank({ organ: "skin", clueIds: ["squamous"] })[0]?.item.id, "skin-scc"],
  ["IHC marker", rank({ organ: "lung", marker: "INSM1 TTF-1" })[0]?.item.id, "lung-small-cell"],
];

const failures = checks.filter(([, actual, expected]) => actual !== expected);
console.log(JSON.stringify({ checks: checks.length, failures }, null, 2));
if (failures.length) process.exitCode = 1;
