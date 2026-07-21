const IARC = "https://tumourclassification.iarc.who.int";
const PO = "https://www.pathologyoutlines.com";

function commonsImage(file) {
  return `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(file)}?width=1600`;
}

function commonsPage(file) {
  return `https://commons.wikimedia.org/wiki/File:${encodeURIComponent(file.replaceAll(" ", "_"))}`;
}

const demoCases = [
  {
    id: "thyroid-ptc",
    organ: "thyroid",
    organVi: "Tuyến giáp",
    organCode: "THY",
    diagnosisVi: "Ung thư biểu mô tuyến giáp thể nhú",
    diagnosisEn: "Papillary thyroid carcinoma",
    icdo: "82603/3",
    whoEdition: "WHO 5th ed.",
    file: "Thyroid papillary carcinoma histopathology (2).jpg",
    micro: ["Nhú phân nhánh có trục xơ mạch.", "Nhân sáng, rãnh nhân và thể vùi trong nhân.", "Có thể gặp thể cát (psammoma bodies)."],
    markers: ["TTF-1", "PAX8", "Thyroglobulin", "BRAF V600E", "HBME1"],
    memory: "PTC là bệnh của nhân: sáng, rãnh và thể vùi trong nhân.",
    who: `${IARC}/chaptercontent/53/44`,
    po: `${PO}/topic/thyroidpapillaryclassic.html`,
    webpath: "https://www.webpathology.com/images/endocrine/thyroid/papillary-carcinoma",
  },
  {
    id: "thyroid-medullary",
    organ: "thyroid",
    organVi: "Tuyến giáp",
    organCode: "THY",
    diagnosisVi: "Ung thư biểu mô tuyến giáp thể tủy",
    diagnosisEn: "Medullary thyroid carcinoma",
    icdo: "83450/3",
    whoEdition: "WHO 5th ed.",
    file: "Medullary thyroid carcinoma - 2 - high mag.jpg",
    micro: ["Tế bào đa giác hoặc hình thoi, xếp thành đám, bè hay dây.", "Chất dạng amyloid có thể hiện diện trong mô đệm.", "Đối chiếu calcitonin và bối cảnh MEN2/RET khi phù hợp."],
    markers: ["Calcitonin", "CEA", "Chromogranin", "Synaptophysin", "INSM1"],
    memory: "Tế bào C + calcitonin + amyloid là bộ ba định hướng quan trọng.",
    who: `${IARC}/chaptercontent/53/50`,
    po: `${PO}/topic/thyroidmedullary.html`,
    webpath: "https://www.webpathology.com/search-result?query=Medullary%20thyroid%20carcinoma",
  },
  {
    id: "lung-adeno",
    organ: "lung",
    organVi: "Phổi",
    organCode: "LUNG",
    diagnosisVi: "Ung thư biểu mô tuyến phổi",
    diagnosisEn: "Lung adenocarcinoma",
    icdo: "81400/3",
    whoEdition: "WHO 5th ed.",
    file: "Lung adenocarcinoma with lepidic growth - low magnification.jpg",
    micro: ["Nhận diện các kiểu lepidic, nang tuyến, nhú, vi nhú hoặc đặc.", "Tìm cấu trúc tuyến hay chất nhầy trong bào tương.", "Ghi nhận STAS khi tiêu chuẩn hình thái phù hợp."],
    markers: ["TTF-1", "Napsin A", "CK7", "PD-L1", "ALK"],
    memory: "Tạo tuyến hoặc mucin, thường được hỗ trợ bởi TTF-1 và Napsin A.",
    who: `${IARC}/chaptercontent/35/23`,
    po: `${PO}/topic/lungtumoradenocarcinoma.html`,
    webpath: "https://www.webpathology.com/search-result?query=Lung%20adenocarcinoma",
  },
  {
    id: "lung-squamous",
    organ: "lung",
    organVi: "Phổi",
    organCode: "LUNG",
    diagnosisVi: "Ung thư biểu mô tế bào vảy của phổi",
    diagnosisEn: "Squamous cell carcinoma of the lung",
    icdo: "80700/3",
    whoEdition: "WHO 5th ed.",
    file: "Histopathology of squamous-cell carcinoma of the lung.jpg",
    micro: ["Sừng hóa, cầu sừng hoặc cầu nối gian bào.", "Ổ tế bào vảy xâm nhập mô đệm.", "Ở u kém biệt hóa, p40 hữu ích hơn p63 về độ đặc hiệu."],
    markers: ["p40", "CK5/6", "p63", "TTF-1 âm"],
    memory: "Tế bào vảy: bào tương ái toan, cầu sừng và cầu nối gian bào.",
    who: `${IARC}/chaptercontent/35/41`,
    po: `${PO}/topic/lungtumorsquamous.html`,
    webpath: "https://www.webpathology.com/search-result?query=Squamous%20cell%20carcinoma%20of%20the%20lung",
  },
  {
    id: "colon-adeno",
    organ: "colon",
    organVi: "Đại trực tràng",
    organCode: "CRC",
    diagnosisVi: "Ung thư biểu mô tuyến đại trực tràng",
    diagnosisEn: "Colorectal adenocarcinoma",
    icdo: "81400/3",
    whoEdition: "WHO 5th ed.",
    file: "Colon adenocarcinoma - biopsy, high mag.jpg",
    micro: ["Các tuyến ác tính méo mó xâm nhập mô đệm.", "Phản ứng mô đệm xơ và hoại tử bẩn có thể gặp.", "Đánh giá độ mô học, LVI/PNI, hạch và tình trạng MMR."],
    markers: ["CDX2", "SATB2", "CK20", "MLH1", "PMS2", "MSH2", "MSH6"],
    memory: "Tuyến bẩn, bất thường và phản ứng xơ mô đệm gợi xâm nhập.",
    who: `${IARC}/chaptercontent/31/62`,
    po: `${PO}/topic/colontumoradenocarcinoma.html`,
    webpath: "https://www.webpathology.com/search-result?query=Colorectal%20adenocarcinoma",
  },
  {
    id: "breast-idc",
    organ: "breast",
    organVi: "Vú",
    organCode: "BR",
    diagnosisVi: "Ung thư biểu mô vú xâm nhập NST",
    diagnosisEn: "Invasive breast carcinoma of no special type",
    icdo: "85000/3",
    whoEdition: "WHO 6th ed. beta",
    file: "Histopathology of invasive ductal carcinoma of the breast.jpg",
    micro: ["Đám hoặc tuyến tế bào u xâm nhập mô đệm.", "Mất lớp tế bào cơ biểu mô quanh cấu trúc xâm nhập.", "Đánh giá độ mô học Nottingham và các dấu ấn tiên lượng."],
    markers: ["ER", "PR", "HER2", "Ki-67", "p63", "SMMHC"],
    memory: "Xâm nhập là khi tế bào u vượt khỏi đơn vị ống - tiểu thùy vào mô đệm hoặc mỡ.",
    who: `${IARC}/chaptercontent/84/77`,
    po: `${PO}/topic/breastmalignantductalNOS.html`,
    webpath: "https://www.webpathology.com/search-result?query=Invasive%20breast%20carcinoma%20of%20no%20special%20type",
  },
  {
    id: "hpb-hcc",
    organ: "hpb",
    organVi: "Gan mật tụy",
    organCode: "HPB",
    diagnosisVi: "Ung thư biểu mô tế bào gan",
    diagnosisEn: "Hepatocellular carcinoma",
    icdo: "81700/3",
    whoEdition: "WHO 6th ed. beta",
    file: "Hepatocellular carcinoma histopathology (1).jpg",
    micro: ["Bè tế bào gan dày và mất khung reticulin.", "Có thể gặp mật trong tế bào u hoặc lòng giả tuyến.", "Đánh giá xâm lấn mạch và nền gan ngoài u."],
    markers: ["Arginase-1", "HepPar-1", "Glypican-3", "Canalicular pCEA"],
    memory: "U vẫn gợi tế bào gan nhưng bè dày, mất reticulin và có thể tạo mật.",
    who: `${IARC}/chaptercontent/72/83`,
    po: `${PO}/topic/livertumorhcc.html`,
    webpath: "https://www.webpathology.com/search-result?query=Hepatocellular%20carcinoma",
  },
  {
    id: "cns-glioblastoma",
    organ: "cns",
    organVi: "Thần kinh trung ương",
    organCode: "CNS",
    diagnosisVi: "U nguyên bào thần kinh đệm, IDH kiểu hoang dại",
    diagnosisEn: "Glioblastoma, IDH-wildtype",
    icdo: "94403/3",
    whoEdition: "WHO 5th ed.",
    file: "AFIP-00405564-Glioblastoma-Micro.jpg",
    micro: ["U thần kinh đệm lan tỏa độ cao.", "Hoại tử dạng giả hàng rào và/hoặc tăng sinh vi mạch.", "Cần tích hợp hình thái với tình trạng IDH và dữ liệu phân tử."],
    markers: ["GFAP", "OLIG2", "IDH1 R132H", "ATRX", "p53", "Ki-67"],
    memory: "Hoại tử giả hàng rào và tăng sinh vi mạch là hai điểm neo hình thái.",
    who: `${IARC}/chaptercontent/45/7`,
    po: `${PO}/topic/cnstumorglioblastoma.html`,
    webpath: "https://www.webpathology.com/search-result?query=Glioblastoma%20IDH-wildtype",
  },
].map((item) => ({
  ...item,
  image: commonsImage(item.file),
  imageSource: commonsPage(item.file),
}));

const modeContent = {
  clinical: {
    number: "Mẫu 01",
    title: "Clinical Light",
    description: "Ưu tiên tốc độ đọc, chữ rõ và độ tương phản trong môi trường làm việc sáng.",
  },
  scope: {
    number: "Mẫu 02",
    title: "Digital Scope",
    description: "Ảnh vi thể chiếm diện tích lớn, nền tối giảm xao nhãng khi học hình thái.",
  },
  workspace: {
    number: "Mẫu 03",
    title: "Atlas Workspace",
    description: "Bố cục dày thông tin với danh sách ca chạy ngang, phù hợp tra cứu lặp lại.",
  },
};

const organOrder = ["all", "thyroid", "lung", "colon", "breast", "hpb", "cns"];
const organMeta = {
  all: { name: "Tất cả", code: "ALL" },
  thyroid: { name: "Tuyến giáp", code: "THY" },
  lung: { name: "Phổi", code: "LUNG" },
  colon: { name: "Đại trực tràng", code: "CRC" },
  breast: { name: "Vú", code: "BR" },
  hpb: { name: "Gan mật tụy", code: "HPB" },
  cns: { name: "Thần kinh", code: "CNS" },
};

const params = new URLSearchParams(window.location.search);
const requestedTheme = params.get("theme");
const state = {
  theme: Object.hasOwn(modeContent, requestedTheme) ? requestedTheme : "clinical",
  organ: "all",
  query: "",
  selectedId: "thyroid-ptc",
  detailTab: "micro",
  zoom: 1,
};

const els = {
  organCount: document.getElementById("organCount"),
  organList: document.getElementById("organList"),
  caseCount: document.getElementById("caseCount"),
  caseList: document.getElementById("caseList"),
  search: document.getElementById("demoSearch"),
  viewerOrgan: document.getElementById("viewerOrgan"),
  viewerTitle: document.getElementById("viewerTitle"),
  viewerEnglish: document.getElementById("viewerEnglish"),
  slideImage: document.getElementById("slideImage"),
  imageCaption: document.getElementById("imageCaption"),
  imageSource: document.getElementById("imageSource"),
  icdoCode: document.getElementById("icdoCode"),
  whoEdition: document.getElementById("whoEdition"),
  detailContent: document.getElementById("detailContent"),
  memoryText: document.getElementById("memoryText"),
  zoomOut: document.getElementById("zoomOut"),
  zoomIn: document.getElementById("zoomIn"),
  zoomReset: document.getElementById("zoomReset"),
  zoomValue: document.getElementById("zoomValue"),
  modeNumber: document.getElementById("modeNumber"),
  modeTitle: document.getElementById("modeTitle"),
  modeDescription: document.getElementById("modeDescription"),
};

function normalize(value) {
  return String(value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D")
    .toLowerCase();
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function caseSearchText(item) {
  return normalize([
    item.organVi,
    item.diagnosisVi,
    item.diagnosisEn,
    item.icdo,
    ...item.micro,
    ...item.markers,
  ].join(" "));
}

function visibleCases() {
  const query = normalize(state.query).trim();
  return demoCases.filter((item) => {
    const organOk = state.organ === "all" || item.organ === state.organ;
    const queryOk = !query || caseSearchText(item).includes(query);
    return organOk && queryOk;
  });
}

function selectedCase() {
  return demoCases.find((item) => item.id === state.selectedId) || demoCases[0];
}

function renderTheme() {
  document.documentElement.dataset.theme = state.theme;
  document.querySelectorAll("[data-theme-choice]").forEach((button) => {
    const active = button.dataset.themeChoice === state.theme;
    button.classList.toggle("active", active);
    button.setAttribute("aria-pressed", String(active));
  });
  const content = modeContent[state.theme];
  els.modeNumber.textContent = content.number;
  els.modeTitle.textContent = content.title;
  els.modeDescription.textContent = content.description;
}

function renderOrgans() {
  els.organCount.textContent = String(organOrder.length - 1);
  els.organList.innerHTML = organOrder.map((organ) => {
    const meta = organMeta[organ];
    const count = organ === "all" ? demoCases.length : demoCases.filter((item) => item.organ === organ).length;
    return `
      <button class="organ-button ${state.organ === organ ? "active" : ""}" type="button" data-organ="${escapeHtml(organ)}">
        <i>${escapeHtml(meta.code)}</i>
        <strong>${escapeHtml(meta.name)}</strong>
        <em>${count}</em>
      </button>
    `;
  }).join("");

  els.organList.querySelectorAll("[data-organ]").forEach((button) => {
    button.addEventListener("click", () => {
      state.organ = button.dataset.organ;
      const first = visibleCases()[0];
      if (first) state.selectedId = first.id;
      renderOrgans();
      renderCaseList();
      renderSelectedCase();
    });
  });
}

function renderCaseList() {
  const items = visibleCases();
  els.caseCount.textContent = `${items.length} ca`;
  if (!items.length) {
    els.caseList.innerHTML = `<div class="empty-message">Không có ca phù hợp.</div>`;
    return;
  }

  if (!items.some((item) => item.id === state.selectedId)) state.selectedId = items[0].id;
  els.caseList.innerHTML = items.map((item) => `
    <button class="case-button ${state.selectedId === item.id ? "active" : ""}" type="button" data-case="${escapeHtml(item.id)}">
      <img src="${escapeHtml(item.image)}" alt="" loading="lazy" />
      <span>
        <strong>${escapeHtml(item.diagnosisVi)}</strong>
        <small lang="en">${escapeHtml(item.diagnosisEn)}</small>
        <em>${escapeHtml(item.organCode)} · ICD-O ${escapeHtml(item.icdo)}</em>
      </span>
    </button>
  `).join("");

  els.caseList.querySelectorAll("[data-case]").forEach((button) => {
    button.addEventListener("click", () => {
      state.selectedId = button.dataset.case;
      state.zoom = 1;
      renderCaseList();
      renderSelectedCase();
    });
  });
}

function renderDetailContent(item) {
  if (state.detailTab === "markers") {
    els.detailContent.innerHTML = `
      <h3>Dấu ấn định hướng</h3>
      <div class="marker-grid">${item.markers.map((marker) => `<span class="marker-chip">${escapeHtml(marker)}</span>`).join("")}</div>
    `;
    return;
  }

  if (state.detailTab === "sources") {
    els.detailContent.innerHTML = `
      <h3>Đối chiếu nguồn gốc</h3>
      <div class="source-links">
        <a href="${escapeHtml(item.who)}" target="_blank" rel="noreferrer">WHO Classification <span>↗</span></a>
        <a href="${escapeHtml(item.po)}" target="_blank" rel="noreferrer">PathologyOutlines <span>↗</span></a>
        <a href="${escapeHtml(item.webpath)}" target="_blank" rel="noreferrer">WebPathology <span>↗</span></a>
      </div>
    `;
    return;
  }

  els.detailContent.innerHTML = `
    <h3>Đặc điểm cần nhìn</h3>
    <ul>${item.micro.map((entry) => `<li>${escapeHtml(entry)}</li>`).join("")}</ul>
  `;
}

function renderSelectedCase() {
  const item = selectedCase();
  els.viewerOrgan.textContent = item.organVi;
  els.viewerTitle.textContent = item.diagnosisVi;
  els.viewerEnglish.textContent = item.diagnosisEn;
  els.slideImage.src = item.image;
  els.slideImage.alt = `Vi thể minh họa: ${item.diagnosisVi}`;
  els.slideImage.style.setProperty("--zoom", state.zoom);
  els.imageCaption.textContent = `Vi thể H&E · ${item.diagnosisEn}`;
  els.imageSource.href = item.imageSource;
  els.icdoCode.textContent = item.icdo;
  els.whoEdition.textContent = item.whoEdition;
  els.memoryText.textContent = item.memory;
  els.zoomValue.textContent = `${Math.round(state.zoom * 100)}%`;
  renderDetailContent(item);
}

function setZoom(nextZoom) {
  state.zoom = Math.min(1.8, Math.max(0.8, nextZoom));
  renderSelectedCase();
}

document.querySelectorAll("[data-theme-choice]").forEach((button) => {
  button.addEventListener("click", () => {
    state.theme = button.dataset.themeChoice;
    const url = new URL(window.location.href);
    url.searchParams.set("theme", state.theme);
    window.history.replaceState({}, "", url);
    renderTheme();
  });
});

document.querySelectorAll("[data-detail-tab]").forEach((button) => {
  button.addEventListener("click", () => {
    state.detailTab = button.dataset.detailTab;
    document.querySelectorAll("[data-detail-tab]").forEach((tab) => {
      const active = tab.dataset.detailTab === state.detailTab;
      tab.classList.toggle("active", active);
      tab.setAttribute("aria-selected", String(active));
    });
    renderDetailContent(selectedCase());
  });
});

els.search.addEventListener("input", () => {
  state.query = els.search.value;
  const first = visibleCases()[0];
  if (first) state.selectedId = first.id;
  renderCaseList();
  if (first) renderSelectedCase();
});

els.zoomOut.addEventListener("click", () => setZoom(state.zoom - 0.2));
els.zoomIn.addEventListener("click", () => setZoom(state.zoom + 0.2));
els.zoomReset.addEventListener("click", () => setZoom(1));

document.addEventListener("keydown", (event) => {
  if (event.key === "/" && document.activeElement !== els.search) {
    event.preventDefault();
    els.search.focus();
  }
  if (event.key === "Escape" && document.activeElement === els.search) {
    els.search.value = "";
    state.query = "";
    renderCaseList();
    renderSelectedCase();
    els.search.blur();
  }
});

renderTheme();
renderOrgans();
renderCaseList();
renderSelectedCase();
