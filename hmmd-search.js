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

const popularMarkers = ["CK7", "CK20", "TTF-1", "Napsin A", "P40", "P63", "CK5/6", "CD56", "PAX8", "GATA3", "CDX2", "SATB2"];
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

function escapeHtml(value) {
  return String(value ?? "").replace(/[&<>'"]/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" }[char]));
}

function normalizeKey(value) {
  return String(value || "").trim().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[\s_-]+/g, "").replace(/[^a-z0-9/+]/g, "");
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

function normalizeCaseMarkers(item) {
  return {
    ...item,
    positive: uniqueMarkers(item.positive),
    negative: uniqueMarkers(item.negative),
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
    new Set([...positive, ...negative]).forEach((name) => {
      const entry = stats.get(name) || { name, positive: 0, negative: 0, cases: 0 };
      if (positive.has(name)) entry.positive += 1;
      if (negative.has(name)) entry.negative += 1;
      entry.cases += 1;
      stats.set(name, entry);
    });
  });
  markerStatsCache = [...stats.values()].sort((a, b) => a.name.localeCompare(b.name, "vi"));
  return markerStatsCache;
}

function getDiagnosisStats() {
  if (diagnosisStatsCache) return diagnosisStatsCache;
  const stats = new Map();
  diagnoses.forEach((item) => {
    const name = String(item.diagnosisText || item.nameEn || "Chưa ghi chẩn đoán").trim() || "Chưa ghi chẩn đoán";
    const key = name.toLocaleLowerCase("vi").replace(/\s+/g, " ");
    const entry = stats.get(key) || { name, cases: 0 };
    entry.cases += 1;
    stats.set(key, entry);
  });
  diagnosisStatsCache = [...stats.values()].sort((a, b) => b.cases - a.cases || a.name.localeCompare(b.name, "vi"));
  return diagnosisStatsCache;
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
  $("#organTotal").textContent = organCount.toLocaleString("vi-VN");
  $("#datasetStatus").textContent = uploadedDataset ? "Bản chính thức" : "Chưa có dữ liệu";
  $("#datasetStatusDetail").textContent = uploadedDataset
    ? `${diagnoses.length.toLocaleString("vi-VN")} ca · ${markerCount.toLocaleString("vi-VN")} marker chuẩn hóa`
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
    ? suggestions.map((item, index) => `<button type="button" role="option" class="marker-option${index === state.pickerIndex[lane] ? " active" : ""}" data-marker-option="${escapeHtml(item.name)}" data-lane="${lane}" aria-selected="${index === state.pickerIndex[lane]}"><span><strong>${escapeHtml(item.name)}</strong><small>${item.cases.toLocaleString("vi-VN")} ca có dữ liệu</small></span><em><b>+${item.positive.toLocaleString("vi-VN")}</b><i>−${item.negative.toLocaleString("vi-VN")}</i></em></button>`).join("")
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
  const caseCode = normalizeKey($("#caseCode").value);
  if (!state.positive.length && !state.negative.length && !caseCode) {
    showToast("Hãy thêm marker hoặc nhập mã ca cần tìm.");
    $("#positiveInput").focus();
    return;
  }
  const exactCaseMatches = caseCode
    ? diagnoses.filter((item) => normalizeKey(item.caseCode || item.sourceNumber || item.id) === caseCode)
    : [];
  const candidates = caseCode
    ? (exactCaseMatches.length
        ? exactCaseMatches
        : diagnoses.filter((item) => normalizeKey(item.caseCode || item.sourceNumber || item.id).includes(caseCode)))
    : diagnoses;
  if (!candidates.length) {
    state.results = [];
    renderResults();
    showToast("Không tìm thấy mã ca tương ứng trong kho dữ liệu.");
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
    $("#resultsList").innerHTML = `<div class="empty-results"><span>⌕</span><h3>Chưa có kết quả phù hợp</h3><p>Thử đổi cơ quan, bớt marker hoặc kiểm tra lại mã ca.</p></div>`;
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
  const recordMeta = `${locationLabel} · ${escapeHtml(item.caseCode || item.id)}`;
  const title = item.conclusionText || item.nameVi || item.diagnosisText || "Chưa ghi kết quả";
  const subtitle = `Chẩn đoán lâm sàng: ${escapeHtml(item.diagnosisText || item.nameEn || "Chưa ghi")}`;
  const sourceDetails = `<dl class="source-data">
      <div><dt>Chẩn đoán lâm sàng</dt><dd>${escapeHtml(item.diagnosisText || item.nameEn || "—")}</dd></div>
      <div><dt>Kết quả nhuộm hóa mô</dt><dd>${escapeHtml(item.conclusionText || item.nameVi || "—")}</dd></div>
      <div><dt>Dương tính</dt><dd>${escapeHtml(item.positiveText || (item.positive || []).join(", ") || "—")}</dd></div>
      <div><dt>Âm tính</dt><dd>${escapeHtml(item.negativeText || (item.negative || []).join(", ") || "—")}</dd></div>
      <div><dt>Ghi chú</dt><dd>${escapeHtml(item.notesText || item.notes || "—")}</dd></div>
    </dl>`;
  const sourceLabel = item.local ? "CA NẠP TRÊN THIẾT BỊ" : `KHO DỮ LIỆU HMMD · CA ${escapeHtml(item.sourceNumber || item.id)}`;
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

function loadPreset() {
  state.positive = ["CK AE1/AE3", "CK7"];
  state.negative = ["CK5/6", "P63", "Napsin A", "TTF-1", "ALK"];
  $("#organSelect").value = "lung";
  $("#notesInput").value = "";
  $("#caseCode").value = "";
  renderQuery();
  runSearch({ announce: false });
}

function resetQuery() {
  state.positive = [];
  state.negative = [];
  state.results = [];
  $("#organSelect").value = "all";
  $("#notesInput").value = "";
  $("#caseCode").value = "";
  renderQuery();
  $("#resultSummary").textContent = "Sẵn sàng tra cứu";
  $("#resultsList").innerHTML = `<div class="empty-results"><span>⌕</span><h3>Bắt đầu từ một kiểu hình HMMD</h3><p>Thêm marker dương tính, âm tính hoặc nhập mã ca, sau đó bấm “Tra cứu chẩn đoán”.</p></div>`;
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
    markers: ["Danh mục marker", "Tên marker đã được chuẩn hóa và số ca có kết quả dương, âm."],
    diagnoses: ["Danh mục chẩn đoán", "Các chẩn đoán lâm sàng đang có trong kho dữ liệu."],
    organs: ["Phân bố cơ quan", "Số ca được phân nhóm theo cơ quan hoặc vị trí bệnh phẩm."],
    reports: ["Báo cáo kho dữ liệu", "Tổng quan mức độ đầy đủ của dữ liệu đang dùng trong tra cứu."],
  }[view];
}

function renderDataExplorer() {
  const view = state.explorerView;
  const [title, subtitle] = explorerHeadings(view);
  $("#dataDialogTitle").textContent = title;
  $("#dataDialogSubtitle").textContent = subtitle;
  $$('[data-explorer-tab]').forEach((button) => button.classList.toggle("active", button.dataset.explorerTab === view));
  const search = $("#dataSearch").value.trim().toLocaleLowerCase("vi");
  $(".data-dialog-tools").classList.toggle("hidden", view === "organs" || view === "reports");

  if (view === "markers") {
    const rows = getMarkerStats().filter((item) => item.name.toLocaleLowerCase("vi").includes(search));
    const visible = rows.slice(0, MAX_EXPLORER_ROWS);
    $("#dataDialogContent").innerHTML = `<div class="data-list-summary"><strong>${rows.length.toLocaleString("vi-VN")} marker</strong><span>Tên chuẩn hóa · số ca dương tính và âm tính</span></div><div class="data-table marker-table"><div class="data-table-head"><span>Marker</span><span>Số ca</span><span>Dương</span><span>Âm</span></div>${visible.map((item) => `<div class="data-table-row"><strong>${escapeHtml(item.name)}</strong><span>${item.cases.toLocaleString("vi-VN")}</span><span class="positive-value">+${item.positive.toLocaleString("vi-VN")}</span><span class="negative-value">−${item.negative.toLocaleString("vi-VN")}</span></div>`).join("")}</div>${rows.length > visible.length ? `<p class="data-limit-note">Đang hiển thị ${visible.length} dòng. Hãy nhập tên marker để lọc nhanh.</p>` : ""}`;
    return;
  }

  if (view === "diagnoses") {
    const rows = getDiagnosisStats().filter((item) => item.name.toLocaleLowerCase("vi").includes(search));
    const visible = rows.slice(0, MAX_EXPLORER_ROWS);
    $("#dataDialogContent").innerHTML = `<div class="data-list-summary"><strong>${rows.length.toLocaleString("vi-VN")} chẩn đoán</strong><span>Thống kê theo nội dung chẩn đoán lâm sàng</span></div><div class="data-table diagnosis-table"><div class="data-table-head"><span>Chẩn đoán lâm sàng</span><span>Số ca</span></div>${visible.map((item) => `<div class="data-table-row"><strong>${escapeHtml(item.name)}</strong><span>${item.cases.toLocaleString("vi-VN")}</span></div>`).join("")}</div>${rows.length > visible.length ? `<p class="data-limit-note">Đang hiển thị ${visible.length} dòng. Hãy nhập chẩn đoán để lọc nhanh.</p>` : ""}`;
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
  const withMarkers = diagnoses.filter((item) => (item.positive || []).length || (item.negative || []).length).length;
  const withNotes = diagnoses.filter((item) => String(item.notesText || item.notes || "").trim()).length;
  const localCount = diagnoses.filter((item) => item.local).length;
  const metric = (label, value) => { const percent = Math.round((value / total) * 1000) / 10; return `<div class="coverage-row"><div><span>${label}</span><strong>${value.toLocaleString("vi-VN")} ca · ${percent.toLocaleString("vi-VN")}%</strong></div><div><i style="width:${percent}%"></i></div></div>`; };
  $("#dataDialogContent").innerHTML = `<div class="report-cards"><article><span>Ca HMMD</span><strong>${diagnoses.length.toLocaleString("vi-VN")}</strong></article><article><span>Marker chuẩn hóa</span><strong>${getMarkerStats().length.toLocaleString("vi-VN")}</strong></article><article><span>Chẩn đoán</span><strong>${getDiagnosisStats().length.toLocaleString("vi-VN")}</strong></article><article><span>Ca nạp trên thiết bị</span><strong>${localCount.toLocaleString("vi-VN")}</strong></article></div><section class="coverage-panel"><h3>Mức độ đầy đủ</h3>${metric("Có chẩn đoán lâm sàng", withDiagnosis)}${metric("Có kết quả nhuộm hóa mô", withConclusion)}${metric("Có marker dương hoặc âm", withMarkers)}${metric("Có ghi chú", withNotes)}</section>`;
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
$("#loadPreset").addEventListener("click", loadPreset);
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
renderQuery();
resetQuery();
