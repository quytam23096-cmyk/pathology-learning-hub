const workflow = [
  ["Xác định bệnh phẩm", "Đọc vị trí lấy mẫu, loại thủ thuật, số mảnh, bên phải/trái và có đủ thông tin lâm sàng không."],
  ["Tách đại thể và vi thể", "Đại thể nói mẫu nhìn bằng mắt thường; vi thể nói pattern dưới kính hiển vi."],
  ["Tìm câu kết luận", "Kết luận là nơi chốt chẩn đoán. So lại với mô tả vi thể để hiểu vì sao có kết luận đó."],
  ["Phân tầng mức độ", "Lành tính, viêm, loạn sản, in situ, xâm nhập, di căn hoặc chưa đủ mô để kết luận."],
  ["Đánh dấu yếu tố bắt buộc", "Grade, kích thước, độ xâm lấn, diện cắt, LVI/PNI, hạch, hoại tử, phân bào, biomarker."],
  ["Mở nguồn đúng mục", "PathologyOutlines để học nhanh, WHO để xem phân loại u, CAP để xem checklist báo cáo ung thư."],
  ["Viết lại bằng lời của mình", "Tóm tắt thành 3 dòng: mẫu gì, chẩn đoán gì, điều gì ảnh hưởng điều trị/theo dõi."],
];

const sampleReport = `Bệnh phẩm: Sinh thiết đại tràng sigma.
Chẩn đoán lâm sàng: U đại tràng sigma, nghi ung thư.
Đại thể: 04 mảnh mô màu trắng xám, kích thước 0,2-0,4 cm, vùi hết.
Vi thể: Các mảnh niêm mạc đại tràng có cấu trúc tuyến tăng sinh phức tạp, tế bào dị dạng, nhân lớn tăng sắc. Một số tuyến xâm nhập mô đệm, kèm phản ứng desmoplasia và hoại tử bẩn.
Kết luận: Adenocarcinoma tuyến đại tràng, biệt hóa vừa, trên mẫu sinh thiết.
HMMD/ghi chú: Nên đánh giá MMR/MSI khi có chỉ định lâm sàng.`;

const atlasItems = [
  {
    title: "Adenocarcinoma đại tràng",
    tag: "Tiêu hóa",
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Cecal_adenocarcinoma.jpg",
    source: "https://commons.wikimedia.org/wiki/File:Cecal_adenocarcinoma.jpg",
    note: "Gợi ý học: tuyến bất thường, mô đệm phản ứng, dấu hiệu xâm nhập.",
  },
  {
    title: "Carcinoma tuyến vú xâm nhập",
    tag: "Vú",
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Histopathology_of_invasive_ductal_carcinoma_of_the_breast.jpg",
    source: "https://commons.wikimedia.org/wiki/File:Histopathology_of_invasive_ductal_carcinoma_of_the_breast.jpg",
    note: "Gợi ý học: ổ tế bào u trong mô đệm/mỡ, kiểu xâm nhập, độ biệt hóa.",
  },
  {
    title: "Carcinoma tế bào gai",
    tag: "Da/cổ tử cung/phổi",
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Histopathology_of_invasive_squamous_cell_carcinoma.jpg",
    source: "https://commons.wikimedia.org/wiki/File:Histopathology_of_invasive_squamous_cell_carcinoma.jpg",
    note: "Gợi ý học: tế bào dạng gai, bào tương ái toan, cầu sừng hoặc sừng hóa.",
  },
  {
    title: "Viêm hạt",
    tag: "Viêm",
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Histopathology_of_granuloma_of_colonic_mucosa.jpg",
    source: "https://commons.wikimedia.org/wiki/File:Histopathology_of_granuloma_of_colonic_mucosa.jpg",
    note: "Gợi ý học: cụm mô bào, tế bào khổng lồ, hoại tử bã đậu hay không.",
  },
];

const systems = [
  {
    name: "Tiêu hóa",
    tag: "GI",
    summary: "Tập trung vào vị trí lấy mẫu, mức độ loạn sản, có xâm nhập hay không, subtype và biomarker như MMR/MSI khi là carcinoma đại trực tràng.",
    questions: ["Mẫu là sinh thiết hay bệnh phẩm cắt?", "Có loạn sản cao độ hay xâm nhập mô đệm?", "Có margin, hạch, LVI/PNI, pT/pN không?"],
    keys: ["Adenoma", "Dysplasia", "Adenocarcinoma", "MMR/MSI", "pTNM"],
    links: [
      ["PathologyOutlines GI", "https://www.pathologyoutlines.com/gastrointestinal.html"],
      ["WHO Digestive System Tumours", "https://publications.iarc.who.int/Book-And-Report-Series/Who-Classification-Of-Tumours/Digestive-System-Tumours-2019"],
    ],
  },
  {
    name: "Vú",
    tag: "Breast",
    summary: "Đọc loại tổn thương, in situ hay xâm nhập, grade, ER/PR/HER2, Ki-67, diện cắt và hạch nách.",
    questions: ["DCIS hay carcinoma xâm nhập?", "Grade mô học và kích thước u?", "ER, PR, HER2, Ki-67 đã có chưa?"],
    keys: ["DCIS", "IDC/ILC", "ER/PR", "HER2", "Margin"],
    links: [
      ["PathologyOutlines Breast", "https://www.pathologyoutlines.com/breast.html"],
      ["WHO Breast Tumours", "https://publications.iarc.who.int/Book-And-Report-Series/Who-Classification-Of-Tumours/Breast-Tumours-2019"],
    ],
  },
  {
    name: "Phụ khoa",
    tag: "Gyn",
    summary: "Phải gắn vị trí giải phẫu với HPV/p16, type mô học, độ xâm nhập, LVSI, diện cắt và giai đoạn.",
    questions: ["Cổ tử cung, nội mạc tử cung hay buồng trứng?", "Tổn thương tiền ung thư hay xâm nhập?", "p16, p53, ER/PR hoặc MMR có cần không?"],
    keys: ["CIN/HSIL", "Endometrioid", "Serous", "p16", "p53"],
    links: [
      ["PathologyOutlines Female Genital", "https://www.pathologyoutlines.com/femalegenital.html"],
      ["WHO Female Genital Tumours", "https://publications.iarc.who.int/Book-And-Report-Series/Who-Classification-Of-Tumours/Female-Genital-Tumours-2020"],
    ],
  },
  {
    name: "Phổi - màng phổi",
    tag: "Thoracic",
    summary: "Xác định subtype carcinoma, phân biệt nguyên phát/di căn, và tìm biomarker điều trị đích khi là ung thư phổi không tế bào nhỏ.",
    questions: ["Adenocarcinoma, squamous, small cell hay loại khác?", "TTF-1, p40, synaptophysin/chromogranin có hỗ trợ không?", "EGFR/ALK/ROS1/PD-L1 có được yêu cầu không?"],
    keys: ["TTF-1", "p40", "Small cell", "PD-L1", "EGFR/ALK"],
    links: [
      ["PathologyOutlines Lung", "https://www.pathologyoutlines.com/lung.html"],
      ["WHO Thoracic Tumours", "https://publications.iarc.who.int/Book-And-Report-Series/Who-Classification-Of-Tumours/Thoracic-Tumours-2021"],
    ],
  },
  {
    name: "Tiết niệu - nam khoa",
    tag: "GU",
    summary: "Với tuyến tiền liệt cần Gleason/Grade Group; với bàng quang cần mức độ xâm nhập cơ; với thận cần subtype và grade.",
    questions: ["Mẫu sinh thiết, TUR hay phẫu thuật cắt?", "Có xâm nhập cơ, vỏ, mạch máu hoặc diện cắt?", "Grade Group, ISUP grade hoặc subtype đã rõ chưa?"],
    keys: ["Gleason", "Grade Group", "Urothelial", "Muscle invasion", "Renal subtype"],
    links: [
      ["PathologyOutlines GU", "https://www.pathologyoutlines.com/genitourinary.html"],
      ["WHO Urinary and Male Genital", "https://publications.iarc.who.int/Book-And-Report-Series/Who-Classification-Of-Tumours/Urinary-And-Male-Genital-Tumours-2022"],
    ],
  },
  {
    name: "Da",
    tag: "Skin",
    summary: "Da cần đọc loại u, độ sâu xâm nhập, ulceration, margin; melanoma có Breslow, mitosis, satellitosis và biomarker khi cần.",
    questions: ["U biểu mô, melanocytic hay lymphoid?", "Breslow/Clark, ulceration, mitosis có ghi không?", "Diện cắt sâu và bên còn u không?"],
    keys: ["BCC", "SCC", "Melanoma", "Breslow", "Margin"],
    links: [
      ["PathologyOutlines Skin", "https://www.pathologyoutlines.com/skintumors.html"],
      ["WHO Skin Tumours", "https://publications.iarc.who.int/Book-And-Report-Series/Who-Classification-Of-Tumours/Skin-Tumours-2025"],
    ],
  },
  {
    name: "Huyết học - lympho",
    tag: "Heme",
    summary: "Không chỉ nhìn H&E; thường phải ghép hình thái, flow/IHC, di truyền, vị trí hạch và bối cảnh lâm sàng.",
    questions: ["Tổn thương phản ứng hay lymphoma?", "Panel CD markers có đủ để phân dòng?", "Có cần FISH, clonality hoặc molecular không?"],
    keys: ["CD20/CD3", "Ki-67", "EBER", "Flow", "FISH"],
    links: [
      ["PathologyOutlines Hematopathology", "https://www.pathologyoutlines.com/hematopathology.html"],
      ["WHO Haematolymphoid Tumours", "https://publications.iarc.who.int/Book-And-Report-Series/Who-Classification-Of-Tumours/Haematolymphoid-Tumours-2024"],
    ],
  },
  {
    name: "Mô mềm - xương",
    tag: "Sarcoma",
    summary: "Nhóm này rất rộng: vị trí, độ sâu, kích thước, hoại tử, mitosis, subtype và xét nghiệm phân tử thường quyết định chẩn đoán.",
    questions: ["Tổn thương mỡ, cơ trơn, thần kinh, mạch máu hay không rõ dòng biệt hóa?", "FNCLCC grade hoặc yếu tố grade có đủ không?", "Có cần marker/molecular đặc hiệu?"],
    keys: ["Sarcoma", "FNCLCC", "Necrosis", "Mitosis", "Fusion"],
    links: [
      ["PathologyOutlines Soft Tissue", "https://www.pathologyoutlines.com/softtissue.html"],
      ["WHO Soft Tissue and Bone", "https://publications.iarc.who.int/Book-And-Report-Series/Who-Classification-Of-Tumours/Soft-Tissue-And-Bone-Tumours-2020"],
    ],
  },
  {
    name: "Đầu cổ",
    tag: "H&N",
    summary: "Cần gắn với vị trí, HPV/EBV khi phù hợp, type mô học, độ sâu xâm nhập, PNI, margin và hạch cổ.",
    questions: ["Vị trí chính xác: khoang miệng, hầu, tuyến nước bọt, tuyến giáp?", "HPV/p16 hoặc EBV có liên quan không?", "PNI, LVI, DOI, margin đã ghi chưa?"],
    keys: ["SCC", "p16", "EBER", "DOI", "PNI"],
    links: [
      ["PathologyOutlines Head & Neck", "https://www.pathologyoutlines.com/headneck.html"],
      ["WHO Head and Neck Tumours", "https://publications.iarc.who.int/Book-And-Report-Series/Who-Classification-Of-Tumours/Head-And-Neck-Tumours-2024"],
    ],
  },
  {
    name: "Thần kinh trung ương",
    tag: "CNS",
    summary: "CNS hiện đại dựa nhiều vào tích hợp mô học và phân tử: IDH, 1p/19q, ATRX, p53, methylation khi cần.",
    questions: ["U thần kinh đệm, màng não, phôi thai hay di căn?", "IDH, ATRX, p53, 1p/19q có định hướng không?", "WHO grade và tiêu chuẩn phân tử đã rõ chưa?"],
    keys: ["IDH", "1p/19q", "ATRX", "WHO grade", "Methylation"],
    links: [
      ["PathologyOutlines CNS", "https://www.pathologyoutlines.com/cnstumors.html"],
      ["WHO CNS Tumours", "https://publications.iarc.who.int/Book-And-Report-Series/Who-Classification-Of-Tumours/Central-Nervous-System-Tumours-2021"],
    ],
  },
];

const terms = [
  ["Đại thể", "Mô tả bệnh phẩm bằng mắt thường: kích thước, màu sắc, số mảnh, vị trí u, diện cắt và cách lấy mẫu."],
  ["Vi thể", "Mô tả hình ảnh dưới kính hiển vi. Đây là phần giải thích vì sao kết luận được đưa ra."],
  ["H&E", "Nhuộm hematoxylin-eosin nền tảng. Hematoxylin làm nhân xanh tím, eosin làm bào tương/mô đệm hồng."],
  ["Loạn sản", "Biến đổi tiền ung thư của biểu mô. Cần chú ý mức độ thấp/cao và có xâm nhập hay không."],
  ["Carcinoma in situ", "Tế bào ác tính còn nằm trong lớp biểu mô, chưa vượt màng đáy để xâm nhập mô đệm."],
  ["Xâm nhập", "U đã vượt cấu trúc giới hạn bình thường vào mô xung quanh; thường làm thay đổi điều trị và staging."],
  ["Grade", "Độ biệt hóa/độ ác tính mô học. Grade khác stage: grade nói tế bào xấu đến đâu, stage nói bệnh lan đến đâu."],
  ["Stage/TNM", "Giai đoạn dựa trên kích thước/xâm lấn tại chỗ, hạch vùng và di căn xa. Thường cần bệnh phẩm phẫu thuật đầy đủ."],
  ["Margin/diện cắt", "Bờ phẫu thuật còn u hay không. Margin dương tính thường quan trọng với nguy cơ tái phát tại chỗ."],
  ["LVI", "Xâm nhập mạch máu hoặc mạch bạch huyết. Là yếu tố nguy cơ lan tràn ở nhiều loại ung thư."],
  ["PNI", "Xâm nhập quanh dây thần kinh. Hay quan trọng trong ung thư đầu cổ, tụy, tiền liệt tuyến và một số ung thư khác."],
  ["Hoại tử", "Vùng mô chết trong u. Có thể liên quan grade, đáp ứng điều trị hoặc tốc độ tăng trưởng của u."],
  ["Mitosis", "Số phân bào. Càng nhiều phân bào thường gợi ý u tăng sinh mạnh hơn, nhưng cách tính tùy loại u."],
  ["HMMD/IHC", "Hóa mô miễn dịch dùng kháng thể để nhận diện dòng biệt hóa hoặc biomarker điều trị."],
  ["Ki-67", "Marker tăng sinh tế bào. Giá trị cần đọc theo bối cảnh loại u, không dùng đơn độc để kết luận."],
  ["p16", "Có thể là marker liên quan HPV trong một số bối cảnh, nhưng ý nghĩa khác nhau theo cơ quan."],
  ["p53", "Kiểu biểu hiện p53 giúp định hướng bất thường TP53 ở một số u, đặc biệt trong phụ khoa và tiêu hóa."],
  ["MMR/MSI", "Hệ sửa lỗi bắt cặp DNA. Mất biểu hiện MMR có thể gợi ý MSI-high và liên quan Lynch syndrome/miễn dịch trị liệu."],
  ["ER/PR/HER2", "Bộ biomarker then chốt trong ung thư vú, giúp phân nhóm và lựa chọn điều trị."],
  ["Gleason/Grade Group", "Hệ thống grade của ung thư tuyến tiền liệt; báo cáo thường ghi pattern và Grade Group."],
  ["Breslow", "Độ dày u melanoma tính bằng mm. Đây là yếu tố staging quan trọng trong melanoma da."],
  ["Synoptic report", "Báo cáo dạng checklist có các trường dữ liệu chuẩn, giúp không bỏ sót yếu tố quan trọng."],
];

const sourceCards = [
  {
    title: "PathologyOutlines",
    kind: "Textbook online",
    note: "Dùng để học nhanh từng bệnh: clinical, gross, microscopic, IHC, differential diagnosis và references.",
    link: "https://www.pathologyoutlines.com/",
  },
  {
    title: "WHO Classification of Tumours Online",
    kind: "Phân loại u",
    note: "Dùng khi cần tên u chuẩn, tiêu chuẩn phân loại, grade và thay đổi mới theo từng hệ cơ quan.",
    link: "https://tumourclassification.iarc.who.int/",
  },
  {
    title: "IARC WHO Blue Books",
    kind: "Danh mục sách",
    note: "Trang công khai để xem các volume WHO theo năm, bao gồm Digestive, Breast, Skin, Head and Neck, Heme...",
    link: "https://publications.iarc.who.int/Book-And-Report-Series/Who-Classification-Of-Tumours",
  },
  {
    title: "CAP Cancer Protocols",
    kind: "Checklist báo cáo",
    note: "Dùng để kiểm tra các yếu tố bắt buộc khi đọc hoặc viết báo cáo ung thư chuẩn hóa.",
    link: "https://www.cap.org/protocols-and-guidelines/cancer-protocols/current-cancer-protocols/",
  },
  {
    title: "NCI Pathology Reports",
    kind: "Giải thích cho người học",
    note: "Nguồn dễ đọc về vai trò báo cáo GPB, các phần thường có và cách báo cáo liên quan điều trị.",
    link: "https://www.cancer.gov/about-cancer/diagnosis-staging/diagnosis/pathology-reports-fact-sheet",
  },
  {
    title: "Wikimedia Commons",
    kind: "Ảnh minh họa mở",
    note: "Dùng ảnh học pattern có dẫn nguồn. Khi dùng chính thức, kiểm tra giấy phép của từng ảnh.",
    link: "https://commons.wikimedia.org/wiki/Category:Histopathology",
  },
];

const els = {
  loadSample: document.getElementById("loadSample"),
  clearReport: document.getElementById("clearReport"),
  analyzeReport: document.getElementById("analyzeReport"),
  reportInput: document.getElementById("reportInput"),
  reportFindings: document.getElementById("reportFindings"),
  workflowList: document.getElementById("workflowList"),
  atlasGrid: document.getElementById("atlasGrid"),
  systemGrid: document.getElementById("systemGrid"),
  systemSearch: document.getElementById("systemSearch"),
  termGrid: document.getElementById("termGrid"),
  termSearch: document.getElementById("termSearch"),
  sourceGrid: document.getElementById("sourceGrid"),
};

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function normalize(value) {
  return String(value || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d");
}

function escapeRegExp(value) {
  return String(value).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function containsTerm(text, term) {
  const normalizedTerm = normalize(term);
  const compactTerm = normalizedTerm.replace(/[^a-z0-9]/g, "");
  if (compactTerm.length <= 4 && /^[a-z0-9]+$/.test(compactTerm)) {
    const pattern = new RegExp(`(^|[^a-z0-9])${escapeRegExp(normalizedTerm)}([^a-z0-9]|$)`, "i");
    return pattern.test(text);
  }
  return text.includes(normalizedTerm);
}

function renderWorkflow() {
  els.workflowList.innerHTML = workflow
    .map(([title, detail]) => `<li><strong>${escapeHtml(title)}</strong><span>${escapeHtml(detail)}</span></li>`)
    .join("");
}

function detectReport(text) {
  const clean = normalize(text);
  const has = (words) => words.some((word) => containsTerm(clean, word));
  const sections = [];
  const missing = [];

  [
    ["Bệnh phẩm/vị trí", ["bệnh phẩm", "benh pham", "sinh thiết", "phẫu thuật", "mẫu", "vị trí"]],
    ["Chẩn đoán lâm sàng", ["chẩn đoán lâm sàng", "chan doan lam sang", "lâm sàng"]],
    ["Đại thể", ["đại thể", "dai the", "macroscopic", "gross"]],
    ["Vi thể", ["vi thể", "vi the", "microscopic", "mô học", "mo hoc"]],
    ["Kết luận", ["kết luận", "ket luan", "diagnosis"]],
    ["HMMD/biomarker", ["hmmd", "hóa mô miễn dịch", "ihc", "ki-67", "her2", "er", "pr", "p16", "p53", "mmr"]],
  ].forEach(([label, words]) => {
    if (has(words)) sections.push(label);
    else missing.push(label);
  });

  const riskSignals = [
    ["Ác tính/xâm nhập", ["ung thư", "carcinoma", "adenocarcinoma", "sarcoma", "lymphoma", "melanoma", "ác tính", "xâm nhập", "invasive"]],
    ["Tiền ung thư", ["loạn sản", "dysplasia", "in situ", "hsil", "cin"]],
    ["Yếu tố staging", ["pt", "pn", "tnm", "hạch", "di căn", "margin", "diện cắt", "lvi", "pni", "xâm nhập mạch", "xâm nhập thần kinh"]],
    ["Dấu ấn điều trị", ["er", "pr", "her2", "egfr", "alk", "ros1", "pd-l1", "mmr", "msi", "braf", "kras", "nras"]],
    ["Viêm đặc hiệu", ["granuloma", "viêm hạt", "lao", "nấm", "cmv", "hpylori", "h. pylori"]],
  ]
    .filter(([, words]) => has(words))
    .map(([label]) => label);

  const questions = [];
  if (!sections.includes("Kết luận")) questions.push("Chưa thấy phần kết luận: cần tìm câu chẩn đoán cuối cùng.");
  if (!sections.includes("Vi thể")) questions.push("Chưa thấy mô tả vi thể: khó hiểu cơ sở của chẩn đoán.");
  if (riskSignals.includes("Ác tính/xâm nhập")) {
    questions.push("Nếu là u ác tính: kiểm tra grade, xâm nhập, diện cắt, LVI/PNI, hạch và biomarker.");
  }
  if (riskSignals.includes("Dấu ấn điều trị")) {
    questions.push("Đọc biomarker theo đúng loại u; không diễn giải Ki-67/p53/p16 đơn độc.");
  }
  if (!questions.length) {
    questions.push("Tóm tắt lại: bệnh phẩm gì, pattern chính là gì, kết luận thuộc nhóm lành/viêm/tiền ung thư/ác tính?");
  }

  return { sections, missing, riskSignals, questions };
}

function renderReportFindings() {
  const text = els.reportInput.value.trim();
  if (!text) {
    els.reportFindings.innerHTML = `
      <div class="empty-state">
        Dán báo cáo vào ô trên hoặc bấm nút nạp ca mẫu để bắt đầu luyện đọc.
      </div>
    `;
    return;
  }

  const result = detectReport(text);
  const sections = result.sections.length ? result.sections.join(", ") : "Chưa nhận diện rõ";
  const missing = result.missing.slice(0, 4).join(", ") || "Không có mục lớn bị thiếu rõ ràng";
  const risks = result.riskSignals.length ? result.riskSignals.join(", ") : "Chưa thấy tín hiệu nguy cơ cao trong từ khóa";

  els.reportFindings.innerHTML = `
    <article class="finding-card">
      <strong>Mục đã thấy</strong>
      <p>${escapeHtml(sections)}</p>
    </article>
    <article class="finding-card">
      <strong>Cần kiểm tra thêm</strong>
      <p>${escapeHtml(missing)}</p>
    </article>
    <article class="finding-card">
      <strong>Tín hiệu cần chú ý</strong>
      <p>${escapeHtml(risks)}</p>
    </article>
    <article class="finding-card">
      <strong>Câu hỏi đọc tiếp</strong>
      <ul>${result.questions.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
    </article>
    <article class="finding-card">
      <strong>Nguồn nên mở</strong>
      <p>Tra bệnh trong PathologyOutlines, đối chiếu phân loại WHO, rồi dùng CAP protocol nếu là ung thư cần báo cáo chuẩn.</p>
    </article>
    <article class="finding-card">
      <strong>Lưu ý</strong>
      <p>Công cụ này chỉ giúp học cách đọc và đặt câu hỏi, không đưa chẩn đoán y khoa.</p>
    </article>
  `;
}

function renderAtlas() {
  els.atlasGrid.innerHTML = atlasItems
    .map((item, index) => {
      const img = item.fallback || item.image;
      return `
        <article class="atlas-card">
          <img src="${escapeHtml(img)}" alt="${escapeHtml(item.title)}" loading="${index === 0 ? "eager" : "lazy"}" />
          <div class="atlas-body">
            <span class="tag">${escapeHtml(item.tag)}</span>
            <h3>${escapeHtml(item.title)}</h3>
            <p>${escapeHtml(item.note)}</p>
            <a class="caption-link" href="${escapeHtml(item.source)}" target="_blank" rel="noreferrer">Nguồn ảnh ↗</a>
          </div>
        </article>
      `;
    })
    .join("");
}

function renderSystems() {
  const query = normalize(els.systemSearch.value);
  const filtered = systems.filter((item) => {
    const haystack = normalize([item.name, item.tag, item.summary, item.keys.join(" "), item.questions.join(" ")].join(" "));
    return haystack.includes(query);
  });

  if (!filtered.length) {
    els.systemGrid.innerHTML = `<div class="empty-state">Không thấy chuyên khoa phù hợp. Thử từ khóa rộng hơn như "u", "marker", "carcinoma".</div>`;
    return;
  }

  els.systemGrid.innerHTML = filtered
    .map((item, index) => {
      const color = ["", "coral", "amber", "violet", "blue"][index % 5];
      return `
        <article class="system-card">
          <header>
            <div>
              <h3>${escapeHtml(item.name)}</h3>
              <p>${escapeHtml(item.summary)}</p>
            </div>
            <span class="tag ${color}">${escapeHtml(item.tag)}</span>
          </header>
          <div class="chip-row">
            ${item.keys.map((key) => `<span class="tag">${escapeHtml(key)}</span>`).join("")}
          </div>
          <ul class="mini-list">
            ${item.questions.map((question) => `<li>${escapeHtml(question)}</li>`).join("")}
          </ul>
          <div class="link-row">
            ${item.links.map(([label, href]) => `<a href="${escapeHtml(href)}" target="_blank" rel="noreferrer">${escapeHtml(label)} ↗</a>`).join("")}
          </div>
        </article>
      `;
    })
    .join("");
}

function renderTerms() {
  const query = normalize(els.termSearch.value);
  const filtered = terms.filter(([title, detail]) => normalize(`${title} ${detail}`).includes(query));

  if (!filtered.length) {
    els.termGrid.innerHTML = `<div class="empty-state">Không có thuật ngữ phù hợp.</div>`;
    return;
  }

  els.termGrid.innerHTML = filtered
    .map(
      ([title, detail]) => `
        <article class="term-card">
          <strong>${escapeHtml(title)}</strong>
          <p>${escapeHtml(detail)}</p>
        </article>
      `,
    )
    .join("");
}

function renderSources() {
  els.sourceGrid.innerHTML = sourceCards
    .map(
      (source) => `
        <article class="source-card">
          <span class="tag">${escapeHtml(source.kind)}</span>
          <h3>${escapeHtml(source.title)}</h3>
          <p>${escapeHtml(source.note)}</p>
          <a href="${escapeHtml(source.link)}" target="_blank" rel="noreferrer">Mở nguồn ↗</a>
        </article>
      `,
    )
    .join("");
}

function bindEvents() {
  els.loadSample.addEventListener("click", () => {
    els.reportInput.value = sampleReport;
    renderReportFindings();
  });

  els.clearReport.addEventListener("click", () => {
    els.reportInput.value = "";
    renderReportFindings();
    els.reportInput.focus();
  });

  els.analyzeReport.addEventListener("click", renderReportFindings);
  els.reportInput.addEventListener("input", renderReportFindings);
  els.systemSearch.addEventListener("input", renderSystems);
  els.termSearch.addEventListener("input", renderTerms);

  document.querySelectorAll(".nav a").forEach((link) => {
    link.addEventListener("click", () => {
      document.querySelectorAll(".nav a").forEach((item) => item.classList.remove("active"));
      link.classList.add("active");
    });
  });
}

function init() {
  renderWorkflow();
  renderReportFindings();
  renderAtlas();
  renderSystems();
  renderTerms();
  renderSources();
  bindEvents();
}

init();
