const organLabels = {
  all: "Tất cả cơ quan",
  lung: "Phổi",
  colorectal: "Đại trực tràng",
  breast: "Vú",
  thyroid: "Tuyến giáp",
  kidney: "Thận",
  liver: "Gan",
};

const baseDiagnoses = [
  {
    id: "lung-adeno",
    nameVi: "Carcinoma tuyến của phổi",
    nameEn: "Lung adenocarcinoma",
    organ: "lung",
    icdo: "8140/3",
    positive: ["CK7", "TTF-1", "Napsin A"],
    negative: ["p40", "CK5/6"],
    suggested: ["ALK", "ROS1", "PD-L1"],
    notes: "Kiểu hình mô phỏng thường gặp; phải đối chiếu hình thái và bối cảnh u nguyên phát/di căn.",
  },
  {
    id: "lung-squamous",
    nameVi: "Carcinoma tế bào vảy của phổi",
    nameEn: "Lung squamous cell carcinoma",
    organ: "lung",
    icdo: "8070/3",
    positive: ["p40", "p63", "CK5/6"],
    negative: ["TTF-1", "Napsin A"],
    suggested: ["PD-L1"],
    notes: "p40 thường đặc hiệu hơn p63 trong panel mô phỏng này.",
  },
  {
    id: "lung-mixed",
    nameVi: "NSCLC có kiểu hình tuyến–vảy không điển hình",
    nameEn: "NSCLC with atypical mixed phenotype",
    organ: "lung",
    icdo: "8046/3",
    positive: ["CK7", "CK5/6", "Napsin A"],
    negative: ["TTF-1", "p63", "CD56"],
    suggested: ["p40", "INSM1", "Synaptophysin"],
    notes: "Quy tắc minh họa theo ca mẫu trong bản phác thảo; không phải tiêu chuẩn chẩn đoán đã thẩm định.",
  },
  {
    id: "lung-small-cell",
    nameVi: "Carcinoma tế bào nhỏ của phổi",
    nameEn: "Small cell lung carcinoma",
    organ: "lung",
    icdo: "8041/3",
    positive: ["INSM1", "Synaptophysin", "Chromogranin", "CD56"],
    negative: ["p40"],
    suggested: ["Ki-67", "RB1", "p53"],
    notes: "Cần tương quan hình thái thần kinh nội tiết và chỉ số tăng sinh.",
  },
  {
    id: "colorectal-adeno",
    nameVi: "Carcinoma tuyến đại trực tràng",
    nameEn: "Colorectal adenocarcinoma",
    organ: "colorectal",
    icdo: "8140/3",
    positive: ["CK20", "CDX2", "SATB2"],
    negative: ["CK7", "PAX8"],
    suggested: ["MLH1", "PMS2", "MSH2", "MSH6"],
    notes: "Panel mô phỏng để định hướng nguồn gốc ruột; không thay thế đánh giá giải phẫu bệnh đầy đủ.",
  },
  {
    id: "breast-ductal",
    nameVi: "Carcinoma vú xâm nhập típ không đặc biệt",
    nameEn: "Invasive breast carcinoma of no special type",
    organ: "breast",
    icdo: "8500/3",
    positive: ["GATA3", "ER", "PR", "Mammaglobin"],
    negative: ["TTF-1", "PAX8"],
    suggested: ["HER2", "Ki-67", "E-cadherin"],
    notes: "Cần báo cáo ER, PR, HER2 và chỉ số tăng sinh theo quy trình tại cơ sở.",
  },
  {
    id: "thyroid-papillary",
    nameVi: "Carcinoma tuyến giáp thể nhú",
    nameEn: "Papillary thyroid carcinoma",
    organ: "thyroid",
    icdo: "8260/3",
    positive: ["TTF-1", "PAX8", "Thyroglobulin", "HBME-1"],
    negative: ["Calcitonin"],
    suggested: ["BRAF V600E", "Galectin-3"],
    notes: "Chẩn đoán chủ yếu dựa trên đặc điểm nhân và cấu trúc; HMMD chỉ hỗ trợ trong bối cảnh phù hợp.",
  },
  {
    id: "kidney-clear-cell",
    nameVi: "Carcinoma tế bào thận, tế bào sáng",
    nameEn: "Clear cell renal cell carcinoma",
    organ: "kidney",
    icdo: "8310/3",
    positive: ["PAX8", "CAIX", "CD10"],
    negative: ["CK7"],
    suggested: ["Vimentin", "AMACR"],
    notes: "Kiểu nhuộm CAIX và hình thái cần được đánh giá đồng thời.",
  },
];

const markerAliases = new Map([
  ["ttf1", "TTF-1"], ["ttf-1", "TTF-1"], ["napsina", "Napsin A"], ["napsin a", "Napsin A"],
  ["ck5/6", "CK5/6"], ["ck56", "CK5/6"], ["p63", "p63"], ["p40", "p40"], ["cd56", "CD56"],
  ["ck7", "CK7"], ["ck20", "CK20"], ["cdx2", "CDX2"], ["satb2", "SATB2"], ["pax8", "PAX8"],
  ["gata3", "GATA3"], ["er", "ER"], ["pr", "PR"], ["her2", "HER2"], ["ki67", "Ki-67"], ["ki-67", "Ki-67"],
  ["insm1", "INSM1"], ["synaptophysin", "Synaptophysin"], ["chromogranin", "Chromogranin"],
  ["thyroglobulin", "Thyroglobulin"], ["calcitonin", "Calcitonin"], ["hbme1", "HBME-1"], ["hbme-1", "HBME-1"],
  ["caix", "CAIX"], ["cd10", "CD10"], ["amacr", "AMACR"], ["mammaglobin", "Mammaglobin"],
]);

const popularMarkers = ["CK7", "CK20", "TTF-1", "Napsin A", "p40", "p63", "CK5/6", "CD56", "PAX8", "GATA3", "CDX2", "SATB2"];
const state = { positive: [], negative: [], results: [], filter: "all" };
let diagnoses = [...baseDiagnoses, ...loadCustomRules()];
let toastTimer;

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

function normalizeKey(value) {
  return String(value || "").trim().toLowerCase().replace(/[\s_-]+/g, "").replace(/[^a-z0-9/+]/g, "");
}

function canonicalMarker(value) {
  const trimmed = String(value || "").trim();
  if (!trimmed) return "";
  const aliasKey = trimmed.toLowerCase().replace(/\s+/g, " ");
  if (markerAliases.has(aliasKey)) return markerAliases.get(aliasKey);
  const known = allMarkers().find((marker) => normalizeKey(marker) === normalizeKey(trimmed));
  return known || trimmed;
}

function allMarkers() {
  return [...new Set(diagnoses.flatMap((item) => [...item.positive, ...item.negative, ...item.suggested]))].sort((a, b) => a.localeCompare(b));
}

function loadCustomRules() {
  try {
    const saved = JSON.parse(localStorage.getItem("hmmd-demo-rules") || "[]");
    return Array.isArray(saved) ? saved : [];
  } catch {
    return [];
  }
}

function saveCustomRules() {
  localStorage.setItem("hmmd-demo-rules", JSON.stringify(diagnoses.filter((item) => item.custom)));
}

function showToast(message) {
  const toast = $("#toast");
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2800);
}

function populateMarkerSuggestions() {
  $("#markerSuggestions").innerHTML = allMarkers().map((marker) => `<option value="${escapeHtml(marker)}"></option>`).join("");
  $("#markerTotal").textContent = allMarkers().length;
  $("#diagnosisTotal").textContent = diagnoses.length;
}

function addMarker(lane, rawValue) {
  const marker = canonicalMarker(rawValue);
  if (!marker) return;
  const otherLane = lane === "positive" ? "negative" : "positive";
  state[otherLane] = state[otherLane].filter((item) => normalizeKey(item) !== normalizeKey(marker));
  if (!state[lane].some((item) => normalizeKey(item) === normalizeKey(marker))) state[lane].push(marker);
  renderQuery();
}

function removeMarker(lane, marker) {
  state[lane] = state[lane].filter((item) => item !== marker);
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
    const positive = state.positive.includes(marker);
    const negative = state.negative.includes(marker);
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

function scoreDiagnosis(diagnosis) {
  const organ = $("#organSelect").value;
  const query = [
    ...state.positive.map((marker) => ({ marker, expected: "positive" })),
    ...state.negative.map((marker) => ({ marker, expected: "negative" })),
  ];
  const positiveKeys = new Set(diagnosis.positive.map(normalizeKey));
  const negativeKeys = new Set(diagnosis.negative.map(normalizeKey));
  const matched = [];
  const conflicts = [];
  const unknown = [];

  query.forEach(({ marker, expected }) => {
    const key = normalizeKey(marker);
    const isPositive = positiveKeys.has(key);
    const isNegative = negativeKeys.has(key);
    if ((expected === "positive" && isPositive) || (expected === "negative" && isNegative)) matched.push(`${marker}(${expected === "positive" ? "+" : "−"})`);
    else if ((expected === "positive" && isNegative) || (expected === "negative" && isPositive)) conflicts.push(`${marker}(${expected === "positive" ? "+" : "−"})`);
    else unknown.push(`${marker}(${expected === "positive" ? "+" : "−"})`);
  });

  const compared = Math.max(query.length, 1);
  const evidenceScore = ((matched.length + unknown.length * 0.18) / compared) * 78;
  const conflictPenalty = conflicts.length * Math.min(16, 26 / compared);
  const organScore = organ === "all" ? 8 : diagnosis.organ === organ ? 18 : -14;
  const notes = $("#notesInput").value.toLowerCase();
  const noteScore = notes && diagnosis.notes.toLowerCase().split(/\W+/).some((word) => word.length > 5 && notes.includes(word)) ? 3 : 0;
  const score = Math.round(Math.max(4, Math.min(99, evidenceScore + organScore + noteScore - conflictPenalty)));
  const selectedKeys = new Set(query.map(({ marker }) => normalizeKey(marker)));
  const suggested = [...diagnosis.positive, ...diagnosis.suggested].filter((marker) => !selectedKeys.has(normalizeKey(marker))).slice(0, 4);
  return { ...diagnosis, score, matched, conflicts, unknown, suggested };
}

function runSearch({ announce = true } = {}) {
  if (!state.positive.length && !state.negative.length) {
    showToast("Hãy thêm ít nhất một marker dương tính hoặc âm tính.");
    $("#positiveInput").focus();
    return;
  }
  state.results = diagnoses.map(scoreDiagnosis).sort((a, b) => b.score - a.score || a.conflicts.length - b.conflicts.length);
  renderResults();
  if (announce) showToast(`Đã đối chiếu ${diagnoses.length} quy tắc trong dữ liệu demo.`);
}

function renderResults() {
  const filter = state.filter;
  let results = state.results;
  if (filter === "strong") results = results.filter((item) => item.score >= 75);
  if (filter === "conflict-free") results = results.filter((item) => item.conflicts.length === 0);
  $("#resultSummary").textContent = state.results.length ? `${results.length} kết quả · xếp theo mức độ tương đồng` : "Sẵn sàng tra cứu";
  if (!results.length) {
    $("#resultsList").innerHTML = `<div class="empty-results"><span>⌕</span><h3>Chưa có kết quả phù hợp bộ lọc</h3><p>Thử đổi cơ quan, bớt marker hoặc chọn “Tất cả kết quả”.</p></div>`;
    return;
  }
  $("#resultsList").innerHTML = results.map((item, index) => resultTemplate(item, index)).join("");
}

function resultTemplate(item, index) {
  const scoreColor = item.score >= 80 ? "#159968" : item.score >= 60 ? "#1768d7" : item.score >= 40 ? "#b87509" : "#d44c58";
  const evidence = [
    ...item.matched.map((value) => `<span class="evidence match">✓ ${escapeHtml(value)}</span>`),
    ...item.conflicts.map((value) => `<span class="evidence conflict">! ${escapeHtml(value)}</span>`),
    ...item.unknown.map((value) => `<span class="evidence unknown">? ${escapeHtml(value)}</span>`),
  ].join("");
  const suggested = item.suggested.length
    ? item.suggested.map((marker) => `<button type="button" data-suggest-marker="${escapeHtml(marker)}">＋ ${escapeHtml(marker)}</button>`).join("")
    : `<span class="empty-lane">Không có gợi ý bổ sung trong quy tắc demo.</span>`;
  return `<article class="result-item${index === 0 ? " is-top expanded" : ""}" data-result-id="${item.id}">
    <div class="result-main" tabindex="0" role="button" aria-expanded="${index === 0 ? "true" : "false"}">
      <div class="score-ring" style="--score:${item.score};--score-color:${scoreColor}"><strong>${item.score}<small>%</small></strong></div>
      <div class="result-title">
        <div class="result-rank"><span>#${index + 1}</span>${index === 0 ? "Gần nhất" : organLabels[item.organ]} · ICD-O ${escapeHtml(item.icdo || "—")}</div>
        <h3>${escapeHtml(item.nameVi)}</h3><p>${escapeHtml(item.nameEn || "")}</p>
        <div class="match-meta"><span class="match">✓ ${item.matched.length} phù hợp</span><span class="conflict">! ${item.conflicts.length} xung đột</span><span class="unknown">? ${item.unknown.length} chưa có trong quy tắc</span></div>
      </div>
      <button class="result-open" type="button" aria-label="Xem chi tiết">⌄</button>
    </div>
    <div class="result-details">
      <div class="detail-block"><h4>Đối chiếu dấu ấn đã nhập</h4><div class="evidence-list">${evidence || '<span class="empty-lane">Chưa có dữ liệu đối chiếu.</span>'}</div><p class="detail-note">${escapeHtml(item.notes)}</p><div class="result-source">RECORD · ${item.custom ? "CUSTOM" : "SIMULATED"}-${escapeHtml(item.id.toUpperCase())}</div></div>
      <div class="detail-block"><h4>Marker có thể cân nhắc tiếp</h4><div class="suggested-markers">${suggested}</div><p class="detail-note">Bấm marker để thêm vào nhóm dương tính và chạy lại đối chiếu.</p></div>
    </div>
  </article>`;
}

function loadPreset() {
  state.positive = ["CK7", "CK5/6", "Napsin A"];
  state.negative = ["TTF-1", "p63", "CD56"];
  $("#organSelect").value = "lung";
  $("#notesInput").value = "Grade III, biệt hóa kém";
  $("#caseCode").value = "HMMD-DEMO-042";
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
  $("#resultsList").innerHTML = `<div class="empty-results"><span>⌕</span><h3>Bắt đầu từ một kiểu hình HMMD</h3><p>Thêm marker dương tính, âm tính và ghi chú, sau đó bấm “Tra cứu chẩn đoán”.</p></div>`;
}

function openRuleDialog() {
  $("#ruleDialog").showModal();
}

function saveRule(event) {
  const submitter = event.submitter;
  if (!submitter || submitter.value !== "default") return;
  event.preventDefault();
  const form = event.currentTarget;
  if (!form.reportValidity()) return;
  const data = new FormData(form);
  const splitMarkers = (value) => String(value || "").split(",").map(canonicalMarker).filter(Boolean);
  const newRule = {
    id: `custom-${Date.now()}`,
    custom: true,
    nameVi: data.get("nameVi").trim(),
    nameEn: data.get("nameEn").trim(),
    organ: data.get("organ"),
    icdo: data.get("icdo").trim() || "—",
    positive: splitMarkers(data.get("positive")),
    negative: splitMarkers(data.get("negative")),
    suggested: splitMarkers(data.get("suggested")),
    notes: data.get("notes").trim() || "Quy tắc do người dùng thêm trong bản demo.",
  };
  diagnoses.push(newRule);
  saveCustomRules();
  populateMarkerSuggestions();
  form.reset();
  $("#ruleDialog").close();
  showToast(`Đã lưu quy tắc “${newRule.nameVi}” trên thiết bị này.`);
  if (state.positive.length || state.negative.length) runSearch({ announce: false });
}

function escapeHtml(value) {
  return String(value ?? "").replace(/[&<>'"]/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" }[char]));
}

document.addEventListener("click", (event) => {
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
  const suggested = event.target.closest("[data-suggest-marker]");
  if (suggested) {
    addMarker("positive", suggested.dataset.suggestMarker);
    runSearch({ announce: false });
    showToast(`Đã thêm ${suggested.dataset.suggestMarker}(+) và đối chiếu lại.`);
    return;
  }
  const nav = event.target.closest("[data-demo-nav]");
  if (nav && nav.dataset.demoNav !== "search") {
    showToast("Bản demo này tập trung vào luồng Tra cứu. Các phân hệ còn lại sẽ dùng chung dữ liệu đã chuẩn hóa.");
  }
});

$$('#positiveInput, #negativeInput').forEach((input) => input.addEventListener("keydown", (event) => {
  if (event.key !== "Enter") return;
  event.preventDefault();
  const lane = input.id.startsWith("positive") ? "positive" : "negative";
  addMarker(lane, input.value);
  input.value = "";
}));

$("#runSearch").addEventListener("click", () => runSearch());
$("#loadPreset").addEventListener("click", loadPreset);
$("#resetQuery").addEventListener("click", resetQuery);
$("#openRuleDialog").addEventListener("click", openRuleDialog);
$("#ruleForm").addEventListener("submit", saveRule);
$("#resultFilter").addEventListener("change", (event) => { state.filter = event.target.value; renderResults(); });
$("#organSelect").addEventListener("change", () => { renderSignature(); if (state.results.length) runSearch({ announce: false }); });
$("#dismissNotice").addEventListener("click", (event) => event.target.closest(".notice").remove());
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

populateMarkerSuggestions();
renderQuery();
loadPreset();
