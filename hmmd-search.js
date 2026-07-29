const organLabels = {
  all: "Tất cả cơ quan",
  lung: "Phổi",
  colorectal: "Đại trực tràng",
  breast: "Vú",
  thyroid: "Tuyến giáp",
  kidney: "Thận",
  liver: "Gan",
  other: "Khác / chưa phân nhóm",
};

const popularMarkers = ["PD-L1", "CK7", "CK20", "TTF-1", "Napsin A", "P40", "P63", "CK5/6", "CD56", "PAX8", "GATA3", "CDX2", "SATB2"];
const markerNameOverrides = new Map([
  ["afp", "AFP"], ["alk", "ALK"], ["bcl2", "BCL2"], ["bcl6", "BCL6"], ["ca125", "CA 125"],
  ["cck56", "CK5/6"], ["cck566", "CK5/6"], ["ccyclind1", "Cyclin D1"],
  ["cd3", "CD3"], ["cd4", "CD4"], ["cd5", "CD5"], ["cd8", "CD8"], ["cd10", "CD10"],
  ["cd15", "CD15"], ["cd20", "CD20"], ["cd30", "CD30"], ["cd34", "CD34"], ["cd45", "CD45"],
  ["cd56", "CD56"], ["cd68", "CD68"], ["cd79a", "CD79a"], ["cd99", "CD99"], ["cd117", "CD117"],
  ["cd138", "CD138"], ["cdx2", "CDX2"], ["cxd2", "CDX2"], ["cea", "CEA"],
  ["chro", "Chromogranin A"], ["chromo", "Chromogranin A"], ["chromogarnin", "Chromogranin A"],
  ["chromogranin", "Chromogranin A"], ["chromogranina", "Chromogranin A"],
  ["ck", "CK"], ["ck13", "CK1/3"], ["ck14", "CK14"], ["ck19", "CK19"], ["ck20", "CK20"],
  ["ck2o", "CK20"], ["ck56", "CK5/6"], ["ck566", "CK5/6"], ["ck7", "CK7"],
  ["ckae13", "CK AE1/AE3"], ["ckae1ae3", "CK AE1/AE3"], ["cke13", "CK AE1/AE3"],
  ["ckea1ea3", "CK AE1/AE3"], ["kae13", "CK AE1/AE3"],
  ["cyclind1", "Cyclin D1"], ["d240", "D2-40"], ["desmin", "Desmin"], ["dog1", "DOG1"],
  ["ema", "EMA"], ["er", "ER"], ["gata", "GATA3"], ["gata3", "GATA3"], ["gfap", "GFAP"],
  ["hepar", "HepPar-1"], ["hepar1", "HepPar-1"], ["heppar", "HepPar-1"], ["heppar1", "HepPar-1"],
  ["hepparto", "HepPar-1"], ["peppar1", "HepPar-1"], ["her", "HER2"], ["her2", "HER2"],
  ["hmb45", "HMB45"], ["hymb45", "HMB45"], ["kappa", "Kappa"], ["ki", "Ki-67"], ["ki67", "Ki-67"],
  ["lambda", "Lambda"], ["lamda", "Lambda"], ["lca", "LCA"], ["lmh1", "MLH1"], ["mlh1", "MLH1"],
  ["mmr", "MMR"], ["msh2", "MSH2"], ["msh6", "MSH6"], ["muc2", "MUC2"], ["mum1", "MUM1"],
  ["myogenin", "Myogenin"], ["myoglobin", "Myoglobin"], ["napsina", "Napsin A"], ["nsapsina", "Napsin A"],
  ["neurofilament", "Neurofilament"], ["nse", "NSE"], ["oct34", "OCT3/4"], ["oct4", "OCT4"],
  ["olig2", "Olig2"], ["p16", "P16"], ["p40", "P40"], ["p53", "P53"], ["p63", "P63"],
  ["pdl1", "PD-L1"],
  ["pax5", "PAX5"], ["pax8", "PAX8"], ["pms2", "PMS2"], ["psm2", "PMS2"], ["pr", "PR"],
  ["psa", "PSA"], ["s100", "S100"], ["sall4", "SALL4"], ["sma", "SMA"],
  ["synap", "Synaptophysin"], ["synapphytosin", "Synaptophysin"], ["synaptophysin", "Synaptophysin"],
  ["synaptophysine", "Synaptophysin"], ["tdt", "TdT"], ["tff1", "TFF1"],
  ["thyroglobolin", "Thyroglobulin"], ["thyroglobulin", "Thyroglobulin"],
  ["ttf", "TTF-1"], ["ttf1", "TTF-1"], ["ttfi", "TTF-1"],
  ["vimantin", "Vimentin"], ["vimentin", "Vimentin"], ["vimentine", "Vimentin"],
  ["wt1", "WT1"], ["wtf1", "WT1"],
]);

const uploadedDataset = window.HMMD_DATASET && Array.isArray(window.HMMD_DATASET.cases) ? window.HMMD_DATASET : null;
const icdDataset = window.ICD10_TT06_DATA && Array.isArray(window.ICD10_TT06_DATA.entries) ? window.ICD10_TT06_DATA : null;
const MAX_VISIBLE_RESULTS = 50;
const MAX_EXPLORER_ROWS = 250;
const LOCAL_STORAGE_KEY = "hmmd-local-cases-v1";
const state = {
  positive: [],
  negative: [],
  results: [],
  filter: "all",
  explorerView: "reports",
  pickerIndex: { positive: 0, negative: 0 },
};

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
let toastTimer;
let markerStatsCache;
let diagnosisStatsCache;
let organStatsCache;
let icdEntriesCache;
const diagnosisIcdCache = new Map();

function escapeHtml(value) {
  return String(value ?? "").replace(/[&<>'"]/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" }[char]));
}

function markerKey(value) {
  return String(value || "")
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\b(neu|clone|antibody)\b/g, "")
    .replace(/[^a-z0-9]/g, "");
}

function stripMarkerQualifier(value) {
  return String(value || "").replace(/\s*\((?:[^)]*%|[123]\+|[+-])[^)]*\)\s*$/i, "").trim();
}

function canonicalMarker(value) {
  const cleaned = stripMarkerQualifier(value).replace(/\s+/g, " ").trim();
  if (!cleaned) return "";
  const key = markerKey(cleaned);
  if (markerNameOverrides.has(key)) return markerNameOverrides.get(key);
  return cleaned.charAt(0).toUpperCase() + cleaned.slice(1);
}

function uniqueMarkers(values) {
  const seen = new Set();
  return (values || []).map(canonicalMarker).filter((marker) => {
    const key = markerKey(marker);
    if (!key || seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function normalizedText(value) {
  return String(value || "").toLocaleLowerCase("vi-VN").normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/đ/g, "d");
}

function extractPdL1Report(item) {
  const source = [item.conclusionText, item.notesText || item.notes].filter(Boolean).join("\n");
  if (!/(?:\bPD\s*[-–]?\s*L\s*[-–]?\s*1\b|\bPDL\s*[-–]?\s*1\b)/i.test(source)) return null;
  const text = normalizedText(source);
  const hasNegative = /khong\s+boc\s+lo|\bam\s+tinh\b/.test(text);
  const hasPositive = /\bco\s+boc\s+lo|\bduong\s+tinh\b/.test(text);
  const scoreMap = new Map();
  [...source.matchAll(/\b(CPS|TPS|TC)\s*(?:=|:)?\s*([<>≥≤]?\s*\d+(?:[.,]\d+)?(?:\s*[-–]\s*\d+(?:[.,]\d+)?)?)\s*(%)?/gi)].forEach((match) => {
    const metric = match[1].toUpperCase();
    const value = match[2].replace(/\s+/g, " ").trim();
    const key = `${metric}:${value.replace(/\s/g, "")}`;
    const display = `${metric} ${value}${match[3] ? "%" : ""}`;
    if (!scoreMap.has(key) || match[3]) scoreMap.set(key, display);
  });
  const scores = [...scoreMap.values()];
  const clones = [...source.matchAll(/\b(SP\s*263|22\s*C3|28\s*[-–]\s*8|SP\s*142)\b/gi)]
    .map((match) => match[1].replace(/\s+/g, "").toUpperCase());
  const unique = (values) => [...new Set(values)];
  return {
    marker: "PD-L1",
    status: hasPositive && !hasNegative ? "positive" : hasNegative && !hasPositive ? "negative" : "reported",
    scores: unique(scores),
    clones: unique(clones),
    text: source,
  };
}

function normalizeCaseMarkers(item) {
  const rawPositive = Array.isArray(item.rawPositive) ? item.rawPositive : [...(item.positive || [])];
  const rawNegative = Array.isArray(item.rawNegative) ? item.rawNegative : [...(item.negative || [])];
  const positive = uniqueMarkers(rawPositive);
  const negative = uniqueMarkers(rawNegative);
  const markerReports = [];
  const pdL1 = extractPdL1Report(item);
  if (pdL1) {
    markerReports.push(pdL1);
    if (pdL1.status === "positive" && !positive.some((marker) => markerKey(marker) === "pdl1")) positive.push("PD-L1");
    if (pdL1.status === "negative" && !negative.some((marker) => markerKey(marker) === "pdl1")) negative.push("PD-L1");
  }
  return {
    ...item,
    rawPositive,
    rawNegative,
    positive,
    negative,
    reportedMarkers: uniqueMarkers([...(item.reportedMarkers || []), ...markerReports.map((report) => report.marker)]),
    markerReports,
    suggested: uniqueMarkers(item.suggested),
  };
}

function loadLocalCases() {
  try {
    const saved = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || "[]");
    return Array.isArray(saved) ? saved : [];
  } catch {
    return [];
  }
}

const officialCases = (uploadedDataset?.cases || []).map(normalizeCaseMarkers);
let diagnoses = [...officialCases, ...loadLocalCases().map(normalizeCaseMarkers)];

function saveLocalCases() {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(diagnoses.filter((item) => item.local)));
}

function invalidateStats() {
  markerStatsCache = undefined;
  diagnosisStatsCache = undefined;
  organStatsCache = undefined;
}

function showToast(message) {
  const toast = $("#toast");
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 3000);
}

function allMarkers() {
  return getMarkerStats().map((item) => item.name);
}

function getMarkerStats() {
  if (markerStatsCache) return markerStatsCache;
  const stats = new Map();
  diagnoses.forEach((item) => {
    const positive = new Set(item.positive || []);
    const negative = new Set(item.negative || []);
    const reported = new Set([...(item.reportedMarkers || []), ...positive, ...negative]);
    const aliasesByName = new Map();
    [...(item.rawPositive || []), ...(item.rawNegative || [])].forEach((alias) => {
      const name = canonicalMarker(alias);
      if (!name) return;
      if (!aliasesByName.has(name)) aliasesByName.set(name, new Set());
      aliasesByName.get(name).add(String(alias).trim());
    });
    (item.markerReports || []).forEach((report) => {
      if (!aliasesByName.has(report.marker)) aliasesByName.set(report.marker, new Set());
      aliasesByName.get(report.marker).add("PD-L1 / PDL1 / PDL-1");
    });
    reported.forEach((name) => {
      const entry = stats.get(name) || { name, positive: 0, negative: 0, reportedOnly: 0, cases: 0, aliases: new Set() };
      if (positive.has(name)) entry.positive += 1;
      if (negative.has(name)) entry.negative += 1;
      if (!positive.has(name) && !negative.has(name)) entry.reportedOnly += 1;
      entry.cases += 1;
      (aliasesByName.get(name) || []).forEach((alias) => entry.aliases.add(alias));
      stats.set(name, entry);
    });
  });
  markerStatsCache = [...stats.values()].map((entry) => ({ ...entry, aliases: [...entry.aliases].sort((a, b) => a.localeCompare(b, "vi")) })).sort((a, b) => a.name.localeCompare(b.name, "vi"));
  return markerStatsCache;
}

function getIcdEntries() {
  if (icdEntriesCache) return icdEntriesCache;
  const unique = new Map();
  (icdDataset?.entries || []).forEach((entry) => {
    const key = `${entry.code}|${normalizedText(entry.name)}`;
    const current = unique.get(key);
    if (!current || (current.model !== "disease" && entry.model === "disease")) unique.set(key, entry);
  });
  icdEntriesCache = [...unique.values()];
  return icdEntriesCache;
}

function getDiagnosisStats() {
  if (diagnosisStatsCache) return diagnosisStatsCache;
  const stats = new Map();
  diagnoses.forEach((item) => {
    const name = String(item.diagnosisText || item.nameEn || "Chưa ghi chẩn đoán").trim() || "Chưa ghi chẩn đoán";
    const key = name.toLocaleLowerCase("vi").replace(/\s+/g, " ");
    const entry = stats.get(key) || { name, cases: 0, directCodes: new Set() };
    entry.cases += 1;
    if (item.icd10) entry.directCodes.add(String(item.icd10).toUpperCase());
    stats.set(key, entry);
  });
  diagnosisStatsCache = [...stats.values()].map((entry) => ({
    ...entry,
    directCodes: [...entry.directCodes],
    suggestedIcd: getDiagnosisIcdSuggestions(entry.name),
  })).sort((a, b) => b.cases - a.cases || a.name.localeCompare(b.name, "vi"));
  return diagnosisStatsCache;
}

function renderDiagnosisSearchOptions() {
  const options = new Map();
  getDiagnosisStats().forEach((item) => options.set(`diagnosis:${normalizedText(item.name)}`, item.name));
  getIcdEntries().forEach((item) => options.set(`icd:${item.code}:${normalizedText(item.name)}`, `${item.code} — ${item.name}`));
  $("#diagnosisSearchOptions").innerHTML = [...options.values()]
    .map((value) => `<option value="${escapeHtml(value)}"></option>`)
    .join("");
}

function diagnosticTokens(value) {
  const stopWords = new Set(["u", "cua", "o", "tinh", "va", "hoac", "khac", "theo", "doi", "nghi", "den", "tu", "cac", "vi", "tri"]);
  return normalizedText(value).replace(/[^a-z0-9]+/g, " ").trim().split(/\s+/).filter((token) => token.length > 1 && !stopWords.has(token));
}

function getDiagnosisIcdSuggestions(name) {
  const cacheKey = normalizedText(name).trim();
  if (diagnosisIcdCache.has(cacheKey)) return diagnosisIcdCache.get(cacheKey);
  const sourceTokens = [...new Set(diagnosticTokens(name))];
  const hasDiseaseIntent = sourceTokens.some((token) => ["ac", "lanh", "sinh", "carcinoma", "ung", "lympho", "sarcoma"].includes(token));
  if (!sourceTokens.length || !hasDiseaseIntent) {
    diagnosisIcdCache.set(cacheKey, []);
    return [];
  }
  const sourceSet = new Set(sourceTokens);
  const icdEntries = getIcdEntries();
  const matches = icdEntries.map((entry) => {
    const targetTokens = [...new Set(diagnosticTokens(entry.name))];
    const targetSet = new Set(targetTokens);
    const intersection = sourceTokens.filter((token) => targetSet.has(token)).length;
    const union = new Set([...sourceTokens, ...targetTokens]).size || 1;
    const coverage = intersection / Math.min(sourceTokens.length, Math.max(targetTokens.length, 1));
    const jaccard = intersection / union;
    const score = coverage * 0.7 + jaccard * 0.3;
    const parent = entry.parentCode ? icdEntries.find((candidate) => candidate.code === entry.parentCode) : null;
    const parentTokens = new Set(parent ? diagnosticTokens(parent.name) : []);
    const distinctiveTokens = targetTokens.filter((token) => !parentTokens.has(token));
    const detailedDiseaseAllowed = entry.model !== "disease" || /\.9$/.test(entry.code) || distinctiveTokens.every((token) => sourceSet.has(token));
    return { ...entry, score, intersection, detailedDiseaseAllowed };
  }).filter((entry) => entry.detailedDiseaseAllowed && entry.intersection >= Math.min(2, sourceTokens.length) && entry.score >= 0.84)
    .sort((a, b) => b.score - a.score || a.code.length - b.code.length || a.code.localeCompare(b.code, "vi", { numeric: true }));
  const uniqueCodes = [];
  const seenCodes = new Set();
  for (const match of matches) {
    if (seenCodes.has(match.code)) continue;
    seenCodes.add(match.code);
    uniqueCodes.push({ code: match.code, name: match.name, score: match.score });
    if (uniqueCodes.length === 3) break;
  }
  diagnosisIcdCache.set(cacheKey, uniqueCodes);
  return uniqueCodes;
}

function extractIcdCode(value) {
  const match = String(value || "").toUpperCase().match(/\b[A-Z]\d{2}(?:\.\d[A-Z0-9]?)?\b/);
  return match ? match[0] : "";
}

function createClinicalDiagnosisQuery(query) {
  const rawQuery = String(query || "").trim();
  const textQuery = normalizedText(rawQuery).trim();
  const queryCode = extractIcdCode(rawQuery);
  const officialCodes = queryCode ? [] : getIcdEntries()
    .filter((entry) => normalizedText(entry.name).includes(textQuery))
    .map((entry) => String(entry.code).toUpperCase());
  return { textQuery, queryCode, officialCodes };
}

function clinicalDiagnosisMatches(item, query) {
  const { textQuery, queryCode, officialCodes } = query;
  if (!textQuery) return true;

  const diagnosisText = item.diagnosisText || item.nameEn || "";
  if (normalizedText(diagnosisText).includes(textQuery)) return true;

  const itemCodes = new Set([
    item.icd10,
    ...getDiagnosisIcdSuggestions(diagnosisText).map((match) => match.code),
  ].filter(Boolean).map((code) => String(code).toUpperCase()));
  if (queryCode) {
    return [...itemCodes].some((code) => code === queryCode || code.startsWith(`${queryCode}.`) || queryCode.startsWith(`${code}.`));
  }

  return officialCodes.some((officialCode) => [...itemCodes].some((code) => code === officialCode || code.startsWith(`${officialCode}.`) || officialCode.startsWith(`${code}.`)));
}

function getOrganStats() {
  if (organStatsCache) return organStatsCache;
  const counts = new Map(Object.keys(organLabels).filter((key) => key !== "all").map((key) => [key, 0]));
  diagnoses.forEach((item) => counts.set(item.organ || "other", (counts.get(item.organ || "other") || 0) + 1));
  organStatsCache = [...counts].map(([key, cases]) => ({ key, name: organLabels[key], cases })).sort((a, b) => b.cases - a.cases);
  return organStatsCache;
}

function updateDatasetSummary() {
  const markerCount = getMarkerStats().length;
  const diagnosisCount = getDiagnosisStats().length;
  const organCount = getOrganStats().filter((item) => item.cases > 0).length;
  $("#caseTotal").textContent = diagnoses.length.toLocaleString("vi-VN");
  $("#markerTotal").textContent = markerCount.toLocaleString("vi-VN");
  $("#diagnosisTotal").textContent = diagnosisCount.toLocaleString("vi-VN");
  $("#resultTotal").textContent = diagnoses.filter((item) => String(item.conclusionText || item.nameVi || "").trim()).length.toLocaleString("vi-VN");
  $("#organTotal").textContent = organCount.toLocaleString("vi-VN");
  $("#datasetStatus").textContent = uploadedDataset ? "Bản chính thức" : "Chưa có dữ liệu";
  $("#datasetStatusDetail").textContent = uploadedDataset
    ? `${diagnoses.length.toLocaleString("vi-VN")} ca · ${markerCount.toLocaleString("vi-VN")} marker chuẩn · ${(uploadedDataset.meta?.markerCount || markerCount).toLocaleString("vi-VN")} cách ghi nguồn`
    : "Không thể nạp kho dữ liệu";
}

function addMarker(lane, rawValue) {
  const marker = canonicalMarker(rawValue);
  if (!marker) return;
  const otherLane = lane === "positive" ? "negative" : "positive";
  const key = markerKey(marker);
  state[otherLane] = state[otherLane].filter((item) => markerKey(item) !== key);
  if (!state[lane].some((item) => markerKey(item) === key)) state[lane].push(marker);
  closeMarkerPicker(lane);
  renderQuery();
}

function removeMarker(lane, marker) {
  state[lane] = state[lane].filter((item) => markerKey(item) !== markerKey(marker));
  renderQuery();
}

function renderChips(lane) {
  const container = $(`#${lane}Chips`);
  container.innerHTML = state[lane].length
    ? state[lane].map((marker) => `<span class="marker-chip ${lane}">${escapeHtml(marker)}<button type="button" data-remove-marker="${lane}" data-marker="${escapeHtml(marker)}" aria-label="Xóa ${escapeHtml(marker)}">×</button></span>`).join("")
    : `<span class="empty-lane">Chưa chọn marker</span>`;
  $(`#${lane}Count`).textContent = `${state[lane].length} marker`;
}

function renderPopularMarkers() {
  $("#popularMarkerList").innerHTML = popularMarkers.map((marker) => {
    const key = markerKey(marker);
    const positive = state.positive.some((item) => markerKey(item) === key);
    const negative = state.negative.some((item) => markerKey(item) === key);
    return `<button type="button" class="popular-marker${positive ? " is-positive" : negative ? " is-negative" : ""}" data-popular-marker="${marker}" title="Bấm: dương tính · Shift + bấm: âm tính">${positive ? "+ " : negative ? "− " : ""}${marker}</button>`;
  }).join("");
}

function renderSignature() {
  const organ = $("#organSelect").value;
  const chips = [
    `<span class="signature-chip organ">${organLabels[organ]}</span>`,
    ...state.positive.map((marker) => `<span class="signature-chip positive">${escapeHtml(marker)} +</span>`),
    ...state.negative.map((marker) => `<span class="signature-chip negative">${escapeHtml(marker)} −</span>`),
  ];
  $("#querySignature").innerHTML = chips.join("");
}

function renderQuery() {
  renderChips("positive");
  renderChips("negative");
  renderPopularMarkers();
  renderSignature();
}

function markerSuggestionsFor(lane, query) {
  const queryKey = markerKey(query);
  const selectedKeys = new Set([...state.positive, ...state.negative].map(markerKey));
  const popularOrder = new Map(popularMarkers.map((marker, index) => [markerKey(marker), index]));
  return getMarkerStats()
    .filter((item) => !selectedKeys.has(markerKey(item.name)))
    .filter((item) => !queryKey || markerKey(item.name).includes(queryKey))
    .sort((a, b) => {
      const aKey = markerKey(a.name);
      const bKey = markerKey(b.name);
      const aPrefix = queryKey && aKey.startsWith(queryKey) ? 0 : 1;
      const bPrefix = queryKey && bKey.startsWith(queryKey) ? 0 : 1;
      const aPopular = popularOrder.has(aKey) ? popularOrder.get(aKey) : 999;
      const bPopular = popularOrder.has(bKey) ? popularOrder.get(bKey) : 999;
      return aPrefix - bPrefix || aPopular - bPopular || b.cases - a.cases || a.name.localeCompare(b.name, "vi");
    })
    .slice(0, 12);
}

function renderMarkerPicker(lane, query = "") {
  const list = $(`#${lane}Suggestions`);
  const input = $(`#${lane}Input`);
  const suggestions = markerSuggestionsFor(lane, query);
  state.pickerIndex[lane] = Math.min(state.pickerIndex[lane], Math.max(suggestions.length - 1, 0));
  list.innerHTML = suggestions.length
    ? suggestions.map((item, index) => `<button type="button" role="option" class="marker-option${index === state.pickerIndex[lane] ? " active" : ""}" data-marker-option="${escapeHtml(item.name)}" data-lane="${lane}" aria-selected="${index === state.pickerIndex[lane]}"><span><strong>${escapeHtml(item.name)}</strong><small>${item.cases.toLocaleString("vi-VN")} ca có báo cáo${item.reportedOnly ? ` · ${item.reportedOnly.toLocaleString("vi-VN")} ca chỉ ghi chỉ số/kết quả` : ""}</small></span><em><b>+${item.positive.toLocaleString("vi-VN")}</b><i>−${item.negative.toLocaleString("vi-VN")}</i></em></button>`).join("")
    : `<div class="marker-option-empty">Không tìm thấy marker phù hợp</div>`;
  list.hidden = false;
  input.setAttribute("aria-expanded", "true");
}

function closeMarkerPicker(lane) {
  const list = $(`#${lane}Suggestions`);
  const input = $(`#${lane}Input`);
  if (!list || !input) return;
  list.hidden = true;
  input.setAttribute("aria-expanded", "false");
  state.pickerIndex[lane] = 0;
}

function movePickerSelection(lane, direction) {
  const list = $(`#${lane}Suggestions`);
  const options = $$("[data-marker-option]", list);
  if (!options.length) return;
  state.pickerIndex[lane] = (state.pickerIndex[lane] + direction + options.length) % options.length;
  options.forEach((option, index) => {
    option.classList.toggle("active", index === state.pickerIndex[lane]);
    option.setAttribute("aria-selected", index === state.pickerIndex[lane]);
  });
  options[state.pickerIndex[lane]].scrollIntoView({ block: "nearest" });
}

function scoreDiagnosis(diagnosis) {
  const organ = $("#organSelect").value;
  const query = [
    ...state.positive.map((marker) => ({ marker, expected: "positive" })),
    ...state.negative.map((marker) => ({ marker, expected: "negative" })),
  ];
  const positiveKeys = new Set((diagnosis.positive || []).map(markerKey));
  const negativeKeys = new Set((diagnosis.negative || []).map(markerKey));
  const matched = [];
  const conflicts = [];
  const unknown = [];

  query.forEach(({ marker, expected }) => {
    const key = markerKey(marker);
    const isPositive = positiveKeys.has(key);
    const isNegative = negativeKeys.has(key);
    if ((expected === "positive" && isPositive) || (expected === "negative" && isNegative)) matched.push(`${marker}(${expected === "positive" ? "+" : "−"})`);
    else if ((expected === "positive" && isNegative) || (expected === "negative" && isPositive)) conflicts.push(`${marker}(${expected === "positive" ? "+" : "−"})`);
    else unknown.push(`${marker}(${expected === "positive" ? "+" : "−"})`);
  });

  const compared = Math.max(query.length, 1);
  const evidenceScore = query.length ? ((matched.length + unknown.length * 0.18) / compared) * 78 : 0;
  const conflictPenalty = conflicts.length * Math.min(16, 26 / compared);
  const organScore = organ === "all" ? 8 : diagnosis.organ === organ ? 18 : -14;
  const notes = $("#notesInput").value.toLowerCase();
  const searchableNotes = `${diagnosis.notes || ""} ${diagnosis.diagnosisText || ""} ${diagnosis.conclusionText || ""}`.toLowerCase();
  const noteScore = notes && searchableNotes.split(/\W+/).some((word) => word.length > 5 && notes.includes(word)) ? 3 : 0;
  const score = Math.round(Math.max(4, Math.min(99, evidenceScore + organScore + noteScore - conflictPenalty)));
  const selectedKeys = new Set(query.map(({ marker }) => markerKey(marker)));
  const suggested = [...(diagnosis.positive || []), ...(diagnosis.suggested || [])].filter((marker) => !selectedKeys.has(markerKey(marker))).slice(0, 4);
  return { ...diagnosis, score, matched, conflicts, unknown, suggested };
}

function runSearch({ announce = true } = {}) {
  const diagnosisQuery = $("#diagnosisSearch").value.trim();
  if (!state.positive.length && !state.negative.length && !diagnosisQuery) {
    showToast("Hãy thêm marker hoặc nhập chẩn đoán lâm sàng / mã ICD-10.");
    $("#diagnosisSearch").focus();
    return;
  }
  const diagnosisFilter = createClinicalDiagnosisQuery(diagnosisQuery);
  const candidates = diagnosisQuery ? diagnoses.filter((item) => clinicalDiagnosisMatches(item, diagnosisFilter)) : diagnoses;
  if (!candidates.length) {
    state.results = [];
    renderResults();
    showToast("Không tìm thấy chẩn đoán lâm sàng hoặc mã ICD-10 tương ứng.");
    return;
  }
  state.results = candidates.map(scoreDiagnosis).sort((a, b) => b.score - a.score || a.conflicts.length - b.conflicts.length);
  renderResults();
  if (announce) showToast(`Đã đối chiếu ${candidates.length.toLocaleString("vi-VN")} ca trong kho dữ liệu.`);
}

function renderResults() {
  let results = state.results;
  if (state.filter === "strong") results = results.filter((item) => item.score >= 75);
  if (state.filter === "conflict-free") results = results.filter((item) => item.conflicts.length === 0);
  const visibleResults = results.slice(0, MAX_VISIBLE_RESULTS);
  $("#resultSummary").textContent = state.results.length
    ? `${results.length.toLocaleString("vi-VN")} kết quả · hiển thị ${visibleResults.length} ca phù hợp nhất`
    : "Sẵn sàng tra cứu";
  if (!results.length) {
    $("#resultsList").innerHTML = `<div class="empty-results"><span>⌕</span><h3>Chưa có kết quả phù hợp</h3><p>Thử đổi cơ quan, bớt marker hoặc kiểm tra lại chẩn đoán lâm sàng / mã ICD-10.</p></div>`;
    return;
  }
  $("#resultsList").innerHTML = visibleResults.map((item, index) => resultTemplate(item, index)).join("");
}

function resultTemplate(item, index) {
  const scoreColor = item.score >= 80 ? "#159968" : item.score >= 60 ? "#1768d7" : item.score >= 40 ? "#b87509" : "#d44c58";
  const evidence = [
    ...item.matched.map((value) => `<span class="evidence match">✓ ${escapeHtml(value)}</span>`),
    ...item.conflicts.map((value) => `<span class="evidence conflict">! ${escapeHtml(value)}</span>`),
    ...item.unknown.map((value) => `<span class="evidence unknown">? ${escapeHtml(value)}</span>`),
  ].join("");
  const locationLabel = organLabels[item.organ] || organLabels.other;
  const recordMeta = locationLabel;
  const title = item.conclusionText || item.nameVi || item.diagnosisText || "Chưa ghi kết quả";
  const subtitle = `Chẩn đoán lâm sàng: ${escapeHtml(item.diagnosisText || item.nameEn || "Chưa ghi")}`;
  const sourceDetails = `<dl class="source-data">
      <div><dt>Chẩn đoán lâm sàng</dt><dd>${escapeHtml(item.diagnosisText || item.nameEn || "—")}</dd></div>
      ${item.icd10 ? `<div><dt>ICD-10</dt><dd>${escapeHtml(item.icd10)}</dd></div>` : ""}
      <div><dt>Kết quả nhuộm hóa mô</dt><dd>${escapeHtml(item.conclusionText || item.nameVi || "—")}</dd></div>
      <div><dt>Dương tính</dt><dd>${escapeHtml(item.positiveText || (item.positive || []).join(", ") || "—")}</dd></div>
      <div><dt>Âm tính</dt><dd>${escapeHtml(item.negativeText || (item.negative || []).join(", ") || "—")}</dd></div>
      ${markerReportSummary(item) ? `<div><dt>Kết quả marker chuyên biệt</dt><dd>${escapeHtml(markerReportSummary(item))}</dd></div>` : ""}
      <div><dt>Ghi chú</dt><dd>${escapeHtml(item.notesText || item.notes || "—")}</dd></div>
    </dl>`;
  const sourceLabel = item.local ? "CA NẠP TRÊN THIẾT BỊ" : "KHO DỮ LIỆU HMMD";
  return `<article class="result-item${index === 0 ? " is-top expanded" : ""}" data-result-id="${escapeHtml(item.id)}">
    <div class="result-main" tabindex="0" role="button" aria-expanded="${index === 0 ? "true" : "false"}">
      <div class="score-ring" style="--score:${item.score};--score-color:${scoreColor}"><strong>${item.score}<small>%</small></strong></div>
      <div class="result-title">
        <div class="result-rank"><span>#${index + 1}</span>${index === 0 ? "Gần nhất · " : ""}${recordMeta}</div>
        <h3>${escapeHtml(title)}</h3><p>${subtitle}</p>
        <div class="match-meta"><span class="match">✓ ${item.matched.length} phù hợp</span><span class="conflict">! ${item.conflicts.length} xung đột</span><span class="unknown">? ${item.unknown.length} chưa có dữ liệu</span></div>
      </div>
      <button class="result-open" type="button" aria-label="Xem chi tiết">⌄</button>
    </div>
    <div class="result-details">
      <div class="detail-block"><h4>Đối chiếu dấu ấn đã nhập</h4><div class="evidence-list">${evidence || '<span class="empty-lane">Chưa nhập marker để đối chiếu.</span>'}</div><div class="result-source">${sourceLabel}</div></div>
      <div class="detail-block"><h4>Dữ liệu nguồn</h4>${sourceDetails}</div>
    </div>
  </article>`;
}

function resetQuery() {
  state.positive = [];
  state.negative = [];
  state.results = [];
  $("#organSelect").value = "all";
  $("#notesInput").value = "";
  $("#diagnosisSearch").value = "";
  renderQuery();
  $("#resultSummary").textContent = "Sẵn sàng tra cứu";
  $("#resultsList").innerHTML = `<div class="empty-results"><span>⌕</span><h3>Bắt đầu từ một kiểu hình HMMD</h3><p>Thêm marker dương tính, âm tính hoặc nhập chẩn đoán lâm sàng / mã ICD-10, sau đó bấm “Tra cứu chẩn đoán”.</p></div>`;
}

function splitMarkerInput(value) {
  return String(value || "").split(/[,;\n]/).map((item) => item.trim()).filter(Boolean);
}

function openCaseDialog() {
  $("#caseDialog").showModal();
  $("#caseForm [name='diagnosisText']").focus();
}

function saveCase(event) {
  const submitter = event.submitter;
  if (!submitter || submitter.value !== "default") return;
  event.preventDefault();
  const form = event.currentTarget;
  if (!form.reportValidity()) return;
  const data = new FormData(form);
  const positiveRaw = splitMarkerInput(data.get("positive"));
  const negativeRaw = splitMarkerInput(data.get("negative"));
  const timestamp = Date.now();
  const diagnosisText = String(data.get("diagnosisText") || "").trim();
  const conclusionText = String(data.get("conclusionText") || "").trim();
  const notesText = String(data.get("notes") || "").trim();
  const newCase = normalizeCaseMarkers({
    id: `local-${timestamp}`,
    sourceNumber: "LOCAL",
    caseCode: String(data.get("caseCode") || "").trim() || `HMMD-LOCAL-${String(timestamp).slice(-8)}`,
    local: true,
    custom: true,
    uploaded: true,
    organ: data.get("organ") || "other",
    nameVi: conclusionText,
    nameEn: diagnosisText,
    diagnosisText,
    icd10: String(data.get("icd10") || "").trim().toUpperCase(),
    conclusionText,
    positive: positiveRaw,
    negative: negativeRaw,
    suggested: [],
    positiveText: positiveRaw.join(", "),
    negativeText: negativeRaw.join(", "),
    notes: notesText,
    notesText,
  });
  diagnoses.push(newCase);
  saveLocalCases();
  invalidateStats();
  updateDatasetSummary();
  renderDiagnosisSearchOptions();
  form.reset();
  $("#caseDialog").close();
  showToast(`Đã nạp ca “${newCase.caseCode}” trên thiết bị này.`);
  if ($("#dataDialog").open) renderDataExplorer();
}

function setActiveNavigation(view) {
  $$("[data-view]", $(".main-nav")).forEach((button) => button.classList.toggle("active", button.dataset.view === view));
}

function openDataExplorer(view) {
  state.explorerView = view;
  setActiveNavigation(view);
  $("#dataSearch").value = "";
  if (!$("#dataDialog").open) $("#dataDialog").showModal();
  renderDataExplorer();
}

function explorerHeadings(view) {
  return {
    markers: ["Danh mục marker", "Tên chuẩn, biến thể nguồn và số ca có báo cáo dương, âm hoặc chỉ số riêng."],
    diagnoses: ["Chẩn đoán lâm sàng & ICD-10", "Chẩn đoán lâm sàng trong kho HMMD và danh mục ICD-10 chính thức của Bộ Y tế."],
    results: ["Kết quả nhuộm HMMD", "Hiển thị nguyên văn kết quả, marker dương/âm, chỉ số chuyên biệt và ghi chú của từng ca."],
    organs: ["Phân bố cơ quan", "Số ca được phân nhóm theo cơ quan hoặc vị trí bệnh phẩm."],
    reports: ["Báo cáo kho dữ liệu", "Tổng quan mức độ đầy đủ của dữ liệu đang dùng trong tra cứu."],
  }[view];
}

function markerReportSummary(item) {
  return (item.markerReports || []).map((report) => {
    const status = report.status === "positive" ? "Dương tính theo ghi nhận nguồn" : report.status === "negative" ? "Âm tính theo ghi nhận nguồn" : "Có báo cáo kết quả";
    const details = [...(report.clones || []), ...(report.scores || []), ...(report.status === "reported" ? [] : [status])];
    return `${report.marker}: ${details.length ? details.join(" · ") : status}`;
  }).join("\n");
}

function icdMatches(search) {
  const text = normalizedText(search).trim();
  const code = String(search || "").trim().toUpperCase().replace(/\s+/g, "");
  return getIcdEntries().filter((entry) => !text || entry.code.toUpperCase().startsWith(code) || normalizedText(entry.name).includes(text));
}

function renderDataExplorer() {
  const view = state.explorerView;
  const [title, subtitle] = explorerHeadings(view);
  $("#dataDialogTitle").textContent = title;
  $("#dataDialogSubtitle").textContent = subtitle;
  $$('[data-explorer-tab]').forEach((button) => button.classList.toggle("active", button.dataset.explorerTab === view));
  const search = $("#dataSearch").value.trim().toLocaleLowerCase("vi");
  $(".data-dialog-tools").classList.toggle("hidden", view === "organs" || view === "reports");
  $("#dataSearch").placeholder = view === "diagnoses" ? "Nhập mã ICD-10 hoặc chẩn đoán lâm sàng…" : view === "results" ? "Tìm chẩn đoán, marker hoặc kết quả…" : "Nhập tên marker hoặc biến thể nguồn…";

  if (view === "markers") {
    const rows = getMarkerStats().filter((item) => `${item.name} ${(item.aliases || []).join(" ")}`.toLocaleLowerCase("vi").includes(search));
    const visible = rows.slice(0, MAX_EXPLORER_ROWS);
    const sourceVariantCount = uploadedDataset?.meta?.markerCount || rows.length;
    $("#dataDialogContent").innerHTML = `<div class="data-list-summary"><strong>${rows.length.toLocaleString("vi-VN")} marker chuẩn</strong><span>${sourceVariantCount.toLocaleString("vi-VN")} cách ghi marker trong cột nguồn · PD-L1 được bổ sung từ kết luận/ghi chú</span></div><div class="data-table marker-table"><div class="data-table-head"><span>Marker / biến thể nguồn</span><span>Có báo cáo</span><span>Dương</span><span>Âm</span><span>Chỉ số / khác</span></div>${visible.map((item) => `<div class="data-table-row"><div class="marker-name-cell"><strong>${escapeHtml(item.name)}</strong>${item.aliases?.length ? `<small>${escapeHtml(item.aliases.slice(0, 8).join(" · "))}</small>` : ""}</div><span>${item.cases.toLocaleString("vi-VN")}</span><span class="positive-value">+${item.positive.toLocaleString("vi-VN")}</span><span class="negative-value">−${item.negative.toLocaleString("vi-VN")}</span><span>${item.reportedOnly.toLocaleString("vi-VN")}</span></div>`).join("")}</div>${rows.length > visible.length ? `<p class="data-limit-note">Đang hiển thị ${visible.length} dòng. Hãy nhập tên marker để lọc nhanh.</p>` : ""}`;
    return;
  }

  if (view === "diagnoses") {
    const normalizedSearch = normalizedText(search);
    const rows = getDiagnosisStats().filter((item) => {
      const codes = [...item.directCodes, ...item.suggestedIcd.map((match) => match.code)].join(" ");
      return !search || normalizedText(item.name).includes(normalizedSearch) || codes.toLocaleLowerCase("vi").includes(search);
    });
    const visible = rows.slice(0, MAX_EXPLORER_ROWS);
    const officialRows = icdMatches(search).slice(0, search ? 120 : 40);
    const icdMeta = icdDataset?.meta;
    $("#dataDialogContent").innerHTML = `<div class="icd-source-banner"><div><strong>ICD-10 theo Thông tư 06/2026/TT-BYT</strong><span>${getIcdEntries().length.toLocaleString("vi-VN")} mục thuộc Chương II — U tân sinh · đồng bộ ${escapeHtml(new Date(icdMeta?.generatedAt || Date.now()).toLocaleDateString("vi-VN"))}</span></div><a href="${escapeHtml(icdMeta?.source || "https://icd.kcb.vn/icd-10-tt06/icd10-tt06")}" target="_blank" rel="noopener">Mở nguồn Bộ Y tế ↗</a></div><section class="data-section"><div class="data-list-summary"><strong>${rows.length.toLocaleString("vi-VN")} chẩn đoán lâm sàng</strong><span>Mã chỉ được gợi ý khi nội dung khớp chặt với danh mục chính thức</span></div><div class="data-table diagnosis-table"><div class="data-table-head"><span>Chẩn đoán lâm sàng</span><span>ICD-10 đối chiếu</span><span>Số ca</span></div>${visible.map((item) => { const codes = item.directCodes.length ? item.directCodes : item.suggestedIcd.map((match) => match.code); return `<div class="data-table-row"><strong>${escapeHtml(item.name)}</strong><span class="icd-code-list">${codes.length ? codes.map((code) => `<code>${escapeHtml(code)}</code>`).join("") : "—"}</span><span>${item.cases.toLocaleString("vi-VN")}</span></div>`; }).join("")}</div>${rows.length > visible.length ? `<p class="data-limit-note">Đang hiển thị ${visible.length} dòng chẩn đoán lâm sàng.</p>` : ""}</section><section class="data-section icd-catalog"><div class="data-list-summary"><strong>${officialRows.length.toLocaleString("vi-VN")} mục ICD-10 đang hiển thị</strong><span>${search ? "Kết quả khớp mã hoặc tên bệnh" : "Nhập mã hoặc tên bệnh để lọc toàn bộ danh mục"}</span></div><div class="data-table icd-table"><div class="data-table-head"><span>Mã</span><span>Tên chính thức</span></div>${officialRows.map((item) => `<div class="data-table-row"><code>${escapeHtml(item.code)}</code><strong>${escapeHtml(item.name)}</strong></div>`).join("")}</div></section>`;
    return;
  }

  if (view === "results") {
    const rows = diagnoses.filter((item) => !search || normalizedText([item.diagnosisText, item.conclusionText, item.positiveText, item.negativeText, item.notesText, markerReportSummary(item)].join(" ")).includes(normalizedText(search)));
    const visible = rows.slice(0, MAX_EXPLORER_ROWS);
    $("#dataDialogContent").innerHTML = `<div class="data-list-summary"><strong>${rows.length.toLocaleString("vi-VN")} kết quả nhuộm HMMD</strong><span>Hiển thị nguyên văn theo từng ca; không diễn giải lại nội dung nguồn</span></div><div class="result-record-list">${visible.map((item) => `<article class="result-record-card"><header><div><strong>${escapeHtml(item.diagnosisText || item.nameEn || "Chưa ghi chẩn đoán lâm sàng")}</strong></div><span>${escapeHtml(organLabels[item.organ] || organLabels.other)}</span></header><dl><div><dt>Kết quả nhuộm HMMD</dt><dd>${escapeHtml(item.conclusionText || item.nameVi || "—")}</dd></div><div><dt>Marker dương tính</dt><dd>${escapeHtml(item.positiveText || (item.rawPositive || []).join(", ") || "—")}</dd></div><div><dt>Marker âm tính</dt><dd>${escapeHtml(item.negativeText || (item.rawNegative || []).join(", ") || "—")}</dd></div>${markerReportSummary(item) ? `<div class="special-marker-result"><dt>Kết quả marker chuyên biệt</dt><dd>${escapeHtml(markerReportSummary(item))}</dd></div>` : ""}<div><dt>Ghi chú</dt><dd>${escapeHtml(item.notesText || item.notes || "—")}</dd></div></dl></article>`).join("")}</div>${rows.length > visible.length ? `<p class="data-limit-note">Đang hiển thị ${visible.length} ca. Hãy tìm theo chẩn đoán, marker hoặc nội dung kết quả để thu hẹp.</p>` : ""}`;
    return;
  }

  if (view === "organs") {
    const total = Math.max(diagnoses.length, 1);
    $("#dataDialogContent").innerHTML = `<div class="organ-grid">${getOrganStats().map((item) => { const percent = Math.round((item.cases / total) * 1000) / 10; return `<article class="organ-card"><div><span>${escapeHtml(item.name)}</span><strong>${item.cases.toLocaleString("vi-VN")} ca</strong></div><div class="organ-bar"><i style="width:${Math.max(percent, item.cases ? 1 : 0)}%"></i></div><small>${percent.toLocaleString("vi-VN")}% kho dữ liệu</small></article>`; }).join("")}</div>`;
    return;
  }

  const total = Math.max(diagnoses.length, 1);
  const withDiagnosis = diagnoses.filter((item) => String(item.diagnosisText || item.nameEn || "").trim()).length;
  const withConclusion = diagnoses.filter((item) => String(item.conclusionText || item.nameVi || "").trim()).length;
  const withMarkers = diagnoses.filter((item) => (item.positive || []).length || (item.negative || []).length || (item.reportedMarkers || []).length).length;
  const withNotes = diagnoses.filter((item) => String(item.notesText || item.notes || "").trim()).length;
  const localCount = diagnoses.filter((item) => item.local).length;
  const metric = (label, value) => { const percent = Math.round((value / total) * 1000) / 10; return `<div class="coverage-row"><div><span>${label}</span><strong>${value.toLocaleString("vi-VN")} ca · ${percent.toLocaleString("vi-VN")}%</strong></div><div><i style="width:${percent}%"></i></div></div>`; };
  const pdL1Stats = getMarkerStats().find((item) => item.name === "PD-L1");
  $("#dataDialogContent").innerHTML = `<div class="report-cards"><article><span>Ca HMMD</span><strong>${diagnoses.length.toLocaleString("vi-VN")}</strong></article><article><span>Marker chuẩn</span><strong>${getMarkerStats().length.toLocaleString("vi-VN")}</strong></article><article><span>PD-L1 có báo cáo</span><strong>${(pdL1Stats?.cases || 0).toLocaleString("vi-VN")}</strong></article><article><span>Chẩn đoán lâm sàng</span><strong>${getDiagnosisStats().length.toLocaleString("vi-VN")}</strong></article><article><span>Mục ICD-10 Bộ Y tế</span><strong>${getIcdEntries().length.toLocaleString("vi-VN")}</strong></article><article><span>Ca nạp trên thiết bị</span><strong>${localCount.toLocaleString("vi-VN")}</strong></article></div><section class="coverage-panel"><h3>Mức độ đầy đủ</h3>${metric("Có chẩn đoán lâm sàng", withDiagnosis)}${metric("Có kết quả nhuộm HMMD", withConclusion)}${metric("Có marker hoặc kết quả marker chuyên biệt", withMarkers)}${metric("Có ghi chú", withNotes)}</section>`;
}

document.addEventListener("click", (event) => {
  const markerOption = event.target.closest("[data-marker-option]");
  if (markerOption) {
    addMarker(markerOption.dataset.lane, markerOption.dataset.markerOption);
    const input = $(`#${markerOption.dataset.lane}Input`);
    input.value = "";
    input.focus();
    return;
  }
  const remove = event.target.closest("[data-remove-marker]");
  if (remove) return removeMarker(remove.dataset.removeMarker, remove.dataset.marker);
  const add = event.target.closest("[data-add-marker]");
  if (add) {
    const lane = add.dataset.addMarker;
    const input = $(`#${lane}Input`);
    addMarker(lane, input.value);
    input.value = "";
    input.focus();
    return;
  }
  const clear = event.target.closest("[data-clear-lane]");
  if (clear) {
    state[clear.dataset.clearLane] = [];
    renderQuery();
    return;
  }
  const popular = event.target.closest("[data-popular-marker]");
  if (popular) {
    addMarker(event.shiftKey ? "negative" : "positive", popular.dataset.popularMarker);
    return;
  }
  const resultMain = event.target.closest(".result-main");
  if (resultMain) {
    const item = resultMain.closest(".result-item");
    item.classList.toggle("expanded");
    resultMain.setAttribute("aria-expanded", item.classList.contains("expanded"));
    return;
  }
  const viewButton = event.target.closest("[data-view]");
  if (viewButton) {
    const view = viewButton.dataset.view;
    document.body.classList.remove("menu-open");
    $("#mobileMenu").setAttribute("aria-expanded", "false");
    if (view === "search") {
      if ($("#dataDialog").open) $("#dataDialog").close();
      setActiveNavigation("search");
      $("#searchWorkspace").scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      openDataExplorer(view);
    }
    return;
  }
  const tab = event.target.closest("[data-explorer-tab]");
  if (tab) {
    state.explorerView = tab.dataset.explorerTab;
    setActiveNavigation(state.explorerView);
    $("#dataSearch").value = "";
    renderDataExplorer();
    return;
  }
  if (!event.target.closest(".marker-picker")) {
    closeMarkerPicker("positive");
    closeMarkerPicker("negative");
  }
});

$$('[data-marker-input]').forEach((input) => {
  const lane = input.dataset.markerInput;
  input.addEventListener("focus", () => renderMarkerPicker(lane, input.value));
  input.addEventListener("input", () => { state.pickerIndex[lane] = 0; renderMarkerPicker(lane, input.value); });
  input.addEventListener("keydown", (event) => {
    const list = $(`#${lane}Suggestions`);
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      if (list.hidden) renderMarkerPicker(lane, input.value);
      else movePickerSelection(lane, event.key === "ArrowDown" ? 1 : -1);
      return;
    }
    if (event.key === "Escape") {
      closeMarkerPicker(lane);
      return;
    }
    if (event.key !== "Enter") return;
    event.preventDefault();
    const options = $$("[data-marker-option]", list);
    const selected = !list.hidden && options[state.pickerIndex[lane]];
    addMarker(lane, selected ? selected.dataset.markerOption : input.value);
    input.value = "";
  });
});

$("#runSearch").addEventListener("click", () => runSearch());
$("#diagnosisSearch").addEventListener("keydown", (event) => {
  if (event.key !== "Enter") return;
  event.preventDefault();
  runSearch();
});
$("#resetQuery").addEventListener("click", resetQuery);
$("#openCaseDialog").addEventListener("click", openCaseDialog);
$("#caseForm").addEventListener("submit", saveCase);
$("#closeDataDialog").addEventListener("click", () => $("#dataDialog").close());
$("#dataDialog").addEventListener("close", () => setActiveNavigation("search"));
$("#dataSearch").addEventListener("input", renderDataExplorer);
$("#resultFilter").addEventListener("change", (event) => { state.filter = event.target.value; renderResults(); });
$("#organSelect").addEventListener("change", () => { renderSignature(); if (state.results.length) runSearch({ announce: false }); });
$("#mobileMenu").addEventListener("click", () => {
  const isOpen = document.body.classList.toggle("menu-open");
  $("#mobileMenu").setAttribute("aria-expanded", isOpen);
});

document.addEventListener("keydown", (event) => {
  if ((event.ctrlKey || event.metaKey) && event.key === "Enter") {
    event.preventDefault();
    runSearch();
  }
  const resultMain = event.target.closest?.(".result-main");
  if (resultMain && (event.key === "Enter" || event.key === " ")) {
    event.preventDefault();
    resultMain.click();
  }
});

updateDatasetSummary();
renderDiagnosisSearchOptions();
renderQuery();
resetQuery();
