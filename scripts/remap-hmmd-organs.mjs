import fs from "node:fs/promises";
import path from "node:path";
import crypto from "node:crypto";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dataPath = path.join(root, "hmmd-data.js");
const icdPath = path.join(root, "icd10-tt06-data.js");
const reportDir = path.join(root, "reports");
const reportPath = path.join(reportDir, "hmmd-organ-mapping-audit.json");

export const ORGAN_LABELS = {
  lung: "Phổi – màng phổi",
  colorectal: "Đại trực tràng – hậu môn",
  breast: "Vú",
  stomach: "Dạ dày",
  esophagus: "Thực quản",
  small_bowel: "Ruột non – tá tràng",
  liver: "Gan",
  biliary_pancreas: "Đường mật – túi mật – tụy",
  kidney: "Thận",
  urinary_male: "Tiết niệu – sinh dục nam",
  gynecologic: "Phụ khoa",
  thyroid: "Tuyến giáp",
  endocrine: "Nội tiết khác",
  head_neck: "Đầu – cổ",
  cns: "Hệ thần kinh trung ương",
  hematolymphoid: "Hạch – huyết học",
  skin: "Da – hắc tố",
  bone_soft_tissue: "Xương – mô mềm",
  mediastinum: "Trung thất – tuyến ức",
  peritoneum_retroperitoneum: "Phúc mạc – sau phúc mạc",
  other: "Khác / chưa phân nhóm",
};

function normalize(value) {
  return String(value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/gu, "")
    .replace(/đ/giu, "d")
    .toLowerCase()
    .replace(/[–—]/gu, "-")
    .replace(/[^a-z0-9%+]+/gu, " ")
    .replace(/\s+/gu, " ")
    .trim();
}

const SITE_RULES = [
  { organ: "colorectal", site: "Đại tràng sigma", patterns: [/dai trang (?:sigma|xich ma)/u] },
  { organ: "colorectal", site: "Đại tràng", patterns: [/dai trang|manh trang|ruot thua|appendix/u] },
  { organ: "colorectal", site: "Đại tràng", patterns: [/dt len|u ac (?:cua )?dt(?: |$)/u] },
  { organ: "colorectal", site: "Trực tràng", patterns: [/truc trang/u] },
  { organ: "colorectal", site: "Hậu môn", patterns: [/hau mon/u] },
  { organ: "small_bowel", site: "Tá tràng", patterns: [/ta trang/u] },
  { organ: "small_bowel", site: "Ruột non", patterns: [/ruot non|hong trang|hoi trang/u] },
  { organ: "stomach", site: "Dạ dày", patterns: [/da day|stomach|hang mon vi|hang vi|tam vi|than vi|thuan vi|mon vi|bo cong nho|(?:^| )bcn(?: |$)/u] },
  { organ: "esophagus", site: "Thực quản", patterns: [/thuc quan/u] },
  { organ: "lung", site: "Phổi / phế quản", patterns: [/mang phoi|tran dmp|khi quan|phe quan|(?:^| )phoi(?: |$)/u] },
  { organ: "breast", site: "Vú", patterns: [/tuyen vu|(?:^| )vu(?: |$)/u] },
  { organ: "gynecologic", site: "Cổ tử cung", patterns: [/co tu cung|(?:^| )ctc(?: |$)/u] },
  { organ: "gynecologic", site: "Nội mạc tử cung", patterns: [/noi mac tu cung|(?:^| )nmtc(?: |$)|endometr/u] },
  { organ: "gynecologic", site: "Buồng trứng", patterns: [/buong trung|ovarian|ovary/u] },
  { organ: "gynecologic", site: "Buồng trứng", patterns: [/u (?:ac |nang )?bt(?: |$)|k bt(?: |$)/u] },
  { organ: "gynecologic", site: "Tử cung", patterns: [/tu cung|uterine|uterus/u] },
  { organ: "gynecologic", site: "Âm hộ / âm đạo", patterns: [/am ho|am dao|vulva|vaginal/u] },
  { organ: "gynecologic", site: "Nguyên bào nuôi", patterns: [/nguyen bao nuoi|paget san ho/u] },
  { organ: "kidney", site: "Thận", patterns: [/be than|nguyen bao than|than u nuoc|than (?:phai|trai|p |t )|than .*rcc|sarcom.*than|renal cell|renal carcinoma|u (?:ac )?(?:cua )?than(?: |$)/u] },
  { organ: "urinary_male", site: "Bàng quang", patterns: [/bang quang/u] },
  { organ: "urinary_male", site: "Tuyến tiền liệt", patterns: [/tien liet tuyen|tuyen tien liet|(?:^| )tlt(?: |$)|prostat/u] },
  { organ: "urinary_male", site: "Tinh hoàn", patterns: [/tinh hoan|seminoma|yolk sac/u] },
  { organ: "urinary_male", site: "Dương vật", patterns: [/duong vat|bao qui dau|bao quy dau/u] },
  { organ: "urinary_male", site: "Đường tiết niệu", patterns: [/duong nieu|nieu quan|nieu dao|urothel/u] },
  { organ: "biliary_pancreas", site: "Đường mật", patterns: [/duong mat|soi mat|cholangi/u] },
  { organ: "biliary_pancreas", site: "Túi mật", patterns: [/tui mat/u] },
  { organ: "biliary_pancreas", site: "Bóng Vater", patterns: [/bong (?:vater|valter)/u] },
  { organ: "biliary_pancreas", site: "Tụy", patterns: [/dau tuy|pancrea/u] },
  { organ: "liver", site: "Gan", patterns: [/(?:^| )gan(?: |$)|hepatocellular|hcc(?: |$)/u] },
  { organ: "hematolymphoid", site: "Hạch / hệ huyết học", patterns: [/(?:^| )hach(?: |$)|lympho|lymphoma|hodgkin|da u tuy|tuy xuong|myeloma|leukemi|b505|crbc/u] },
  { organ: "cns", site: "Màng não", patterns: [/mang nao|meningioma/u] },
  { organ: "cns", site: "Não", patterns: [/tieu nao|nao that|(?:^| )nao(?: |$)|sao bao|astrocyt|glioma|glioblast|oligodendro|ependym/u] },
  { organ: "cns", site: "Tủy sống", patterns: [/u tuy (?:c\d|l\d|nguc)|tuy song|ong song/u] },
  { organ: "thyroid", site: "Tuyến giáp", patterns: [/tuyen giap|(?:^| )giap(?: |$)|thyroid/u] },
  { organ: "endocrine", site: "Tuyến thượng thận", patterns: [/tuyen thuong than|adrenal/u] },
  { organ: "endocrine", site: "Tuyến yên", patterns: [/tuyen yen|pituitar/u] },
  { organ: "mediastinum", site: "Tuyến ức", patterns: [/tuyen uc|thymoma|thymic/u] },
  { organ: "mediastinum", site: "Trung thất", patterns: [/trung that|mediastin/u] },
  { organ: "bone_soft_tissue", site: "Xương", patterns: [/xuong ham|xuong chau|xuong dui|canh chau|cot song|(?:^| )xuong(?: |$)|osteosarcoma|chondrosarcoma/u] },
  { organ: "bone_soft_tissue", site: "Chi / mô mềm", patterns: [/thanh nguc|vung hong|vung mong|vung vai|cang tay|can tay|vung dui|duoi dui|dau duoi dui/u] },
  { organ: "head_neck", site: "Amidan", patterns: [/amidan|amydan|amydal|amidale|amidal/u] },
  { organ: "head_neck", site: "Vòm mũi họng", patterns: [/(?:^| )vom(?: |$)|hau mui|mui hau|hau-mui|nasopharyn/u] },
  { organ: "head_neck", site: "Hạ họng", patterns: [/ha hong|ha hau|xoang le|hypopharyn/u] },
  { organ: "head_neck", site: "Hầu miệng", patterns: [/hau mieng|hau hong|thanh ben hong|oropharyn/u] },
  { organ: "head_neck", site: "Thanh quản", patterns: [/day thanh|thanh quan|laryn/u] },
  { organ: "head_neck", site: "Khoang miệng / lưỡi", patterns: [/san mieng|khoang mieng|day luoi|(?:^| )luoi(?: |$)|khau cai|oral cavity/u] },
  { organ: "head_neck", site: "Tuyến nước bọt", patterns: [/tuyen mang tai|tuyen nuoc bot|tuyen nc bot|tuyen le|mang tai|parotid|salivary/u] },
  { organ: "head_neck", site: "Mũi / xoang", patterns: [/viem xoang|canh mui|vung mui|u mui(?: |$)|hoc mui|xoang mui|xoang ham|mui phai|sinonasal/u] },
  { organ: "head_neck", site: "Hàm mặt", patterns: [/vung thai duong|vung cam|goc ham|so va mat|dau mat co|xhd|xht|ham duoi|ham tren|ham mat|vung ham/u] },
  { organ: "head_neck", site: "Mắt / hốc mắt", patterns: [/ket mac|mi duoi mat|u mat(?: |$)|hoc mat|nhan cau|ocular|orbital/u] },
  { organ: "head_neck", site: "Đầu – cổ", patterns: [/viem tai giua|viem loet mieng|vung co|u co(?: |$)|moi(?: |$)/u] },
  { organ: "skin", site: "Da / hắc tố", patterns: [/vay nen|vanh tai|hac to|melanoma|(?:^| )da(?: |$)|(?:^| )u da(?: |$)|da ac tinh|ap xe da|skin/u] },
  { organ: "peritoneum_retroperitoneum", site: "Sau phúc mạc", patterns: [/sau phuc mac|retroperitone/u] },
  { organ: "peritoneum_retroperitoneum", site: "Phúc mạc / ổ bụng", patterns: [/xoang bung|ac cua bung|phuc mac|mac treo|thanh bung|u o bung|u bung(?: |$)|peritone/u] },
  { organ: "bone_soft_tissue", site: "Mô mềm", patterns: [/mo lien ket|mo mem|phan mem|sarcom|fibrosarcoma|(?:^| )u mo(?: |$)|gist(?: |$)/u] },
];

function matchSite(value) {
  const raw = String(value || "").normalize("NFC").toLowerCase();
  if (/(?:^|\s)tủy\s+xương(?:\s|$)|đa\s+u\s+tủy/iu.test(raw)) return { organ: "hematolymphoid", site: "Tủy xương / hệ huyết học" };
  if (/(?:^|\s)tủy\s+sống(?:\s|$)/iu.test(raw)) return { organ: "cns", site: "Tủy sống" };
  if (/(?:^|\s)tụy(?:\s|$)|đầu\s+tụy/iu.test(raw)) return { organ: "biliary_pancreas", site: "Tụy" };
  const text = normalize(value);
  if (!text) return null;
  for (const rule of SITE_RULES) {
    if (rule.patterns.some((pattern) => pattern.test(text))) return { organ: rule.organ, site: rule.site };
  }
  return null;
}

function parseWindowAssignment(source, prefix) {
  return JSON.parse(source.replace(prefix, "").replace(/;\s*$/u, ""));
}

function extractExplicitIcd(value) {
  const match = String(value || "").toUpperCase().match(/\b[CD]\d{2}(?:\.\d[A-Z0-9]?)?\b/u);
  return match ? match[0] : "";
}

const STOP_WORDS = new Set([
  "u", "ac", "tinh", "lanh", "cua", "o", "vi", "tri", "khac", "khong", "dac", "hieu",
  "chua", "ro", "nghi", "theo", "doi", "benh", "ung", "thu", "bieu", "mo", "va", "hoac",
]);

function tokens(value) {
  return normalize(value).split(/\s+/u).filter((token) => token.length > 1 && !STOP_WORDS.has(token));
}

function diagnosisIntent(value) {
  const text = normalize(value);
  if (/\b(?:tai cho|in situ)\b/u.test(text)) return "in_situ";
  if (/\b(?:u ac|ung thu|carcinom|adenocarcinom|sarcom|lymphom|melanom)\b/u.test(text) || /^k(?: |$)/u.test(text)) return "malignant";
  if (/\b(?:u lanh|lanh tinh|benign)\b/u.test(text)) return "benign";
  if (/\b(?:khong chac chan|chua ro ban chat|khong ro ban chat|khong xac dinh tinh chat)\b/u.test(text)) return "uncertain";
  return "";
}

function icdMatchesIntent(code, intent) {
  const match = String(code || "").toUpperCase().match(/^([CD])(\d{2})/u);
  if (!match || !intent) return !intent;
  const letter = match[1];
  const number = Number(match[2]);
  if (intent === "malignant") return letter === "C";
  if (intent === "in_situ") return letter === "D" && number <= 9;
  if (intent === "benign") return letter === "D" && number >= 10 && number <= 36;
  if (intent === "uncertain") return letter === "D" && number >= 37 && number <= 48;
  return true;
}

function organFromIcdCode(code) {
  const match = String(code || "").toUpperCase().match(/^([CD])(\d{2})/u);
  if (!match) return "";
  const letter = match[1];
  const number = Number(match[2]);
  if (letter !== "C") return "";
  if (number <= 14 || (number >= 30 && number <= 32) || number === 69) return "head_neck";
  if (number === 15) return "esophagus";
  if (number === 16) return "stomach";
  if (number === 17) return "small_bowel";
  if (number >= 18 && number <= 21) return "colorectal";
  if (number === 22) return "liver";
  if (number >= 23 && number <= 25) return "biliary_pancreas";
  if (number === 33 || number === 34) return "lung";
  if (number === 37 || number === 38) return "mediastinum";
  if ((number >= 40 && number <= 41) || number === 47 || number === 49) return "bone_soft_tissue";
  if (number === 43 || number === 44) return "skin";
  if (number === 48) return "peritoneum_retroperitoneum";
  if (number === 50) return "breast";
  if (number >= 51 && number <= 58) return "gynecologic";
  if (number >= 60 && number <= 63) return "urinary_male";
  if (number === 64) return "kidney";
  if (number >= 65 && number <= 68) return "urinary_male";
  if (number >= 70 && number <= 72) return "cns";
  if (number === 73) return "thyroid";
  if (number === 74 || number === 75) return "endocrine";
  if (number === 77 || (number >= 81 && number <= 96)) return "hematolymphoid";
  return "";
}

function buildIcdMatcher(entries) {
  const diseases = entries.filter((entry) => entry.model === "disease" && /^[CD]\d{2}/u.test(entry.code));
  const byCode = new Map();
  for (const entry of entries) if (!byCode.has(entry.code)) byCode.set(entry.code, entry);
  return {
    byCode,
    suggest(diagnosis, preferredOrgan) {
      const intent = diagnosisIntent(diagnosis);
      if (!intent) return null;
      const sourceTokens = [...new Set(tokens(diagnosis))];
      if (!sourceTokens.length) return null;
      const sourceSet = new Set(sourceTokens);
      const matches = [];
      for (const entry of diseases) {
        if (!icdMatchesIntent(entry.code, intent)) continue;
        const entryOrgan = organFromIcdCode(entry.code) || matchSite(entry.name)?.organ || "";
        if (preferredOrgan && entryOrgan && entryOrgan !== preferredOrgan) continue;
        const targetTokens = [...new Set(tokens(entry.name))];
        const parent = entry.parentCode ? byCode.get(entry.parentCode) : null;
        const parentTokens = new Set(parent ? tokens(parent.name) : []);
        const distinctiveTokens = targetTokens.filter((token) => !parentTokens.has(token));
        if (!/\.9$/u.test(entry.code) && (!distinctiveTokens.length || distinctiveTokens.some((token) => !sourceSet.has(token)))) continue;
        const intersection = targetTokens.filter((token) => sourceSet.has(token)).length;
        if (!intersection) continue;
        const coverage = intersection / sourceTokens.length;
        const jaccard = intersection / new Set([...sourceTokens, ...targetTokens]).size;
        const score = coverage * 0.8 + jaccard * 0.2;
        if (coverage >= 0.75 && score >= 0.78) matches.push({ code: entry.code, name: entry.name, score, organ: entryOrgan });
      }
      matches.sort((a, b) => b.score - a.score || a.code.length - b.code.length || a.code.localeCompare(b.code, "vi", { numeric: true }));
      return matches[0] || null;
    },
  };
}

function classifyCase(item, icdMatcher) {
  const diagnosisMatch = matchSite(item.diagnosisText || item.nameEn);
  const conclusionMatch = matchSite(item.conclusionText || item.nameVi);
  const explicitCode = extractExplicitIcd(`${item.diagnosisText || ""}\n${item.conclusionText || ""}`);
  const explicitEntry = explicitCode ? icdMatcher.byCode.get(explicitCode) : null;
  const explicitOrgan = explicitCode ? organFromIcdCode(explicitCode) || matchSite(explicitEntry?.name)?.organ || "" : "";
  const rawIcdSuggestion = icdMatcher.suggest(item.diagnosisText || item.nameEn || "", diagnosisMatch?.organ || "");
  const suggestedIcd = rawIcdSuggestion && (
    (diagnosisMatch && rawIcdSuggestion.organ === diagnosisMatch.organ)
    || (conclusionMatch && rawIcdSuggestion.organ === conclusionMatch.organ)
  ) ? rawIcdSuggestion : null;
  const candidates = [diagnosisMatch?.organ, explicitOrgan, suggestedIcd?.organ, conclusionMatch?.organ].filter(Boolean);
  const uniqueCandidates = [...new Set(candidates)];

  let organ = "other";
  let source = "unresolved";
  let confidence = "low";
  if (diagnosisMatch) {
    organ = diagnosisMatch.organ;
    source = uniqueCandidates.length === 1 && candidates.length >= 2 ? "clinical+icd/hmmd" : "clinical_diagnosis";
    confidence = uniqueCandidates.length === 1 || !conclusionMatch ? "high" : "medium";
  } else if (explicitOrgan) {
    organ = explicitOrgan;
    source = "explicit_icd10";
    confidence = conclusionMatch && conclusionMatch.organ === organ ? "high" : "medium";
  } else if (suggestedIcd?.organ && conclusionMatch?.organ === suggestedIcd.organ) {
    organ = suggestedIcd.organ;
    source = "icd10+hmmd_conclusion";
    confidence = "high";
  } else if (conclusionMatch) {
    organ = conclusionMatch.organ;
    source = "hmmd_conclusion";
    confidence = "medium";
  } else if (item.organ && item.organ !== "other" && ORGAN_LABELS[item.organ]) {
    organ = item.organ;
    source = "existing_classification";
    confidence = "medium";
  }

  return {
    organ,
    specimenSite: diagnosisMatch?.site || "",
    mappingSource: source,
    mappingConfidence: confidence,
    explicitIcd10: explicitCode,
    suggestedIcd10: suggestedIcd?.code || "",
    suggestedIcd10Name: suggestedIcd?.name || "",
    candidates: {
      clinical: diagnosisMatch?.organ || "",
      explicitIcd10: explicitOrgan,
      suggestedIcd10: suggestedIcd?.organ || "",
      hmmdConclusion: conclusionMatch?.organ || "",
    },
    conflict: uniqueCandidates.length > 1,
  };
}

function countBy(values, getter) {
  const counts = {};
  for (const value of values) {
    const key = getter(value) || "";
    counts[key] = (counts[key] || 0) + 1;
  }
  return Object.fromEntries(Object.entries(counts).sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0], "vi")));
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

const originalSource = await fs.readFile(dataPath, "utf8");
const icdSource = await fs.readFile(icdPath, "utf8");
const dataset = parseWindowAssignment(originalSource, /^window\.HMMD_DATASET\s*=\s*/u);
const icdDataset = parseWindowAssignment(icdSource, /^window\.ICD10_TT06_DATA\s*=\s*/u);
const icdMatcher = buildIcdMatcher(icdDataset.entries || []);
const beforeCases = structuredClone(dataset.cases);
const beforeContentHash = contentHash(beforeCases);

const mapped = dataset.cases.map((item) => ({ item, result: classifyCase(item, icdMatcher) }));
dataset.cases = mapped.map(({ item, result }) => {
  const {
    specimenSite: _oldSpecimenSite,
    organMappingSource: _oldMappingSource,
    organMappingConfidence: _oldMappingConfidence,
    icd10Suggested: _oldIcd10Suggested,
    icd10SuggestedName: _oldIcd10SuggestedName,
    ...base
  } = item;
  return {
    ...base,
    organ: result.organ,
    specimenSite: result.specimenSite,
    organMappingSource: result.mappingSource,
    organMappingConfidence: result.mappingConfidence,
    ...(result.explicitIcd10 ? { icd10: result.explicitIcd10 } : {}),
    ...(result.suggestedIcd10 ? { icd10Suggested: result.suggestedIcd10, icd10SuggestedName: result.suggestedIcd10Name } : {}),
  };
});
dataset.meta.organCount = Object.keys(ORGAN_LABELS).length;
dataset.meta.organMappingVersion = "2026-08-02-clinical-site-icd10-hmmd-v1";

const beforeOther = beforeCases.filter((item) => item.organ === "other").length;
const afterOther = dataset.cases.filter((item) => item.organ === "other").length;
const conflicts = mapped.filter(({ result }) => result.conflict);
const changed = mapped.filter(({ item, result }) => item.organ !== result.organ);
const changedKnown = mapped.filter(({ item, result }) => item.organ !== "other" && item.organ !== result.organ);
const resolvedFromOther = mapped.filter(({ item, result }) => item.organ === "other" && result.organ !== "other");
const contentFields = ["diagnosisText", "conclusionText", "positiveText", "negativeText", "notesText"];
const contentMismatches = dataset.cases.filter((item, index) => contentFields.some((field) => item[field] !== beforeCases[index][field]));
const unresolved = mapped.filter(({ result }) => result.organ === "other");
const afterContentHash = contentHash(dataset.cases);

const report = {
  generatedAt: new Date().toISOString(),
  source: {
    hmmdCases: dataset.cases.length,
    icdEntries: icdDataset.entries?.length || 0,
    icdTitle: icdDataset.meta?.title || "",
    icdSource: icdDataset.meta?.source || "",
    contentHash: beforeContentHash,
  },
  before: { organCounts: countBy(beforeCases, (item) => item.organ), unclassified: beforeOther },
  after: { organCounts: countBy(dataset.cases, (item) => item.organ), unclassified: afterOther },
  quality: {
    changedCases: changed.length,
    correctedPreviouslyClassifiedCases: changedKnown.length,
    resolvedFromOther: resolvedFromOther.length,
    unresolvedCases: unresolved.length,
    unclassifiedRate: unresolved.length / dataset.cases.length,
    conflictCases: conflicts.length,
    conflictRate: conflicts.length / dataset.cases.length,
    contentMismatches: contentMismatches.length,
    contentHashPreserved: beforeContentHash === afterContentHash,
    invalidOrganKeys: dataset.cases.filter((item) => !ORGAN_LABELS[item.organ]).length,
    duplicateIds: dataset.cases.length - new Set(dataset.cases.map((item) => item.id)).size,
    confidence: countBy(mapped, ({ result }) => result.mappingConfidence),
    sources: countBy(mapped, ({ result }) => result.mappingSource),
    conflictPairs: countBy(conflicts, ({ result }) => `${result.candidates.clinical || "none"} -> ${result.candidates.hmmdConclusion || "none"}`),
  },
  conflictExamples: conflicts.slice(0, 100).map(({ item, result }) => ({
    id: item.id,
    diagnosisText: item.diagnosisText,
    conclusionText: item.conclusionText,
    selectedOrgan: result.organ,
    candidates: result.candidates,
  })),
  correctedPreviouslyClassifiedExamples: changedKnown.slice(0, 150).map(({ item, result }) => ({
    id: item.id,
    diagnosisText: item.diagnosisText,
    previousOrgan: item.organ,
    selectedOrgan: result.organ,
    specimenSite: result.specimenSite,
    candidates: result.candidates,
  })),
  unresolvedExamples: unresolved.slice(0, 200).map(({ item }) => ({
    id: item.id,
    diagnosisText: item.diagnosisText,
    conclusionText: item.conclusionText,
  })),
};

if (contentMismatches.length || !report.quality.contentHashPreserved || report.quality.invalidOrganKeys || report.quality.duplicateIds) {
  throw new Error(`Organ mapping validation failed: ${JSON.stringify(report.quality)}`);
}

await fs.mkdir(reportDir, { recursive: true });
await fs.writeFile(reportPath, `${JSON.stringify(report, null, 2)}\n`, "utf8");
await fs.writeFile(dataPath, `window.HMMD_DATASET = ${JSON.stringify(dataset)};\n`, "utf8");
console.log(JSON.stringify(report, null, 2));
