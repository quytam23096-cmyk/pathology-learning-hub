const PO = "https://www.pathologyoutlines.com";
const WCT = "https://whobluebooks.iarc.fr/structures";
const CAP = "https://www.cap.org/protocols-and-guidelines/cancer-protocols/current-cancer-protocols/";
const COMMONS_CATEGORY = "https://commons.wikimedia.org/wiki/Category:Histopathology";

function commonsImage(file) {
  return `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(file)}?width=1100`;
}

function commonsSource(file) {
  return `https://commons.wikimedia.org/wiki/File:${encodeURIComponent(file.replaceAll(" ", "_"))}`;
}

const chapters = [
  {
    id: "all",
    name: "Tất cả cơ quan",
    short: "ALL",
    color: "#17454b",
    intro: "Xem toàn bộ atlas, sau đó lọc theo cơ quan, pattern hoặc từ khóa.",
    who: "https://whobluebooks.iarc.fr/structures/",
    po: `${PO}/`,
  },
  {
    id: "thyroid",
    name: "Tuyến giáp",
    short: "THY",
    color: "#5b2bbd",
    intro: "Bắt đầu bằng cấu trúc nang, chất keo, nhân kiểu PTC, xâm lấn bao/mạch và marker calcitonin khi nghi MTC.",
    who: `${WCT}/endocrine-and-neuroendocrine-tumours/`,
    po: `${PO}/thyroid.html`,
  },
  {
    id: "lung",
    name: "Phổi",
    short: "LUNG",
    color: "#2563eb",
    intro: "Tách adenocarcinoma, squamous, small cell và di căn; chú ý TTF-1, Napsin A, p40, neuroendocrine markers.",
    who: `${WCT}/thoracic-tumours/`,
    po: `${PO}/lung.html`,
  },
  {
    id: "colon",
    name: "Đại trực tràng",
    short: "CRC",
    color: "#04756f",
    intro: "Học chuỗi polyp tăng sản - serrated - adenoma - carcinoma, luôn tìm dấu loạn sản và xâm nhập mô đệm.",
    who: `${WCT}/digestive-system-tumours/`,
    po: `${PO}/colon.html`,
  },
  {
    id: "breast",
    name: "Vú",
    short: "BR",
    color: "#c2415a",
    intro: "Tách in situ/xâm nhập, type mô học, Nottingham grade, ER/PR/HER2, Ki-67, margin và hạch.",
    who: `${WCT}/breast-tumours/`,
    po: `${PO}/breast.html`,
  },
  {
    id: "hpb",
    name: "Gan mật tụy",
    short: "HPB",
    color: "#96730f",
    intro: "Nhìn trabeculae, mật, xơ hóa, tuyến quanh tụy, PanIN/IPMN và dấu xâm nhập.",
    who: `${WCT}/digestive-system-tumours/`,
    po: `${PO}/liver.html`,
  },
  {
    id: "gyn",
    name: "Phụ khoa",
    short: "GYN",
    color: "#8b5cf6",
    intro: "Gắn vị trí cổ tử cung, nội mạc, buồng trứng; đọc p16, p53, ER/PR, LVSI và độ sâu xâm nhập.",
    who: `${WCT}/female-genital-tumours/`,
    po: `${PO}/femalegenital.html`,
  },
  {
    id: "gu",
    name: "Tiết niệu - nam",
    short: "GU",
    color: "#16a34a",
    intro: "Tuyến tiền liệt cần Gleason/Grade Group; thận cần subtype; bàng quang cần mức xâm nhập cơ.",
    who: `${WCT}/urinary-and-male-genital-tumours/`,
    po: `${PO}/genitourinary.html`,
  },
  {
    id: "skin",
    name: "Da",
    short: "SKIN",
    color: "#ea580c",
    intro: "Đọc liên quan thượng bì, palisading, keratinization, sắc tố, Breslow, ulceration và margin.",
    who: "https://whobluebooks.iarc.who.int/structures/skintumours/",
    po: `${PO}/skintumors.html`,
  },
  {
    id: "heme",
    name: "Hạch - huyết học",
    short: "HEME",
    color: "#0891b2",
    intro: "Nhìn kiến trúc hạch trước: còn nang phản ứng hay bị xóa? Sau đó mới đọc panel CD và EBER.",
    who: "https://whobluebooks.iarc.fr/structures/haematolymphoid/",
    po: `${PO}/hematopathology.html`,
  },
  {
    id: "cns",
    name: "Thần kinh",
    short: "CNS",
    color: "#4f46e5",
    intro: "Tập nhận whorl, psammoma, hoại tử, vi mạch và gắn mô học với marker/phân tử.",
    who: `${WCT}/central-nervous-system-tumours/`,
    po: `${PO}/Cnstumor.html`,
  },
  {
    id: "headneck",
    name: "Đầu cổ",
    short: "HN",
    color: "#9333ea",
    intro: "Gắn với vị trí, keratinization, perineural invasion, p16/EBER khi phù hợp.",
    who: `${WCT}/head-and-neck-tumours/`,
    po: `${PO}/headneck.html`,
  },
  {
    id: "soft",
    name: "Mô mềm - xương",
    short: "STB",
    color: "#db2777",
    intro: "Nhìn spindle cells, myxoid/collagen, atypia, mitosis, necrosis và marker phân dòng.",
    who: `${WCT}/soft-tissue-and-bone-tumours/`,
    po: `${PO}/softtissue.html`,
  },
  {
    id: "inflammation",
    name: "Viêm - nhiễm",
    short: "INF",
    color: "#475569",
    intro: "Nhìn loại viêm: cấp, mạn, hạt, hoại tử, mô bào, ký sinh hoặc virus; cần nhuộm đặc biệt khi nghi nhiễm.",
    who: "https://whobluebooks.iarc.fr/",
    po: `${PO}/infectiousdisease.html`,
  },
];

const patterns = [
  ["all", "Tất cả"],
  ["benign", "Lành tính"],
  ["precursor", "Tiền ung thư"],
  ["carcinoma", "Carcinoma"],
  ["glandular", "Tuyến"],
  ["squamous", "Gai"],
  ["neuroendocrine", "Nội tiết TK"],
  ["lymphoid", "Lymphoid"],
  ["spindle", "Spindle"],
  ["inflammation", "Viêm"],
  ["ihc", "IHC/marker"],
];

const verifiedTopicLinks = {
  "thyroid-ptc": `${PO}/topic/thyroidpapillary.html`,
  "thyroid-follicular-adenoma": `${PO}/topic/thyroidfollicularadenoma.html`,
  "thyroid-medullary": `${PO}/topic/thyroidmedullary.html`,
  "thyroid-anaplastic": `${PO}/topic/thyroidanaplastic.html`,
  "lung-adeno": `${PO}/topic/lungtumoradenocarcinoma.html`,
  "lung-small-cell": `${PO}/topic/lungtumorsmallcell.html`,
  "colon-adeno": `${PO}/topic/colonadenocarcinoma.html`,
  "breast-dcis": `${PO}/topic/breastmalignantdcis.html`,
  "breast-idc": `${PO}/topic/breastmalignantductalnos.html`,
  "cervix-scc": `${PO}/topic/cervixscc.html`,
};

const cases = [
  {
    id: "thyroid-normal",
    chapter: "thyroid",
    diagnosis: "Tuyến giáp bình thường",
    english: "Normal thyroid",
    file: "Normal Thyroid cell.jpg",
    pattern: ["benign"],
    source: "Wikimedia Commons",
    micro: ["Nang giáp kích thước tương đối đều", "Lòng nang chứa keo hồng", "Biểu mô nang thấp, nhân đều"],
    report: ["Dùng làm mốc so sánh khi đọc bướu giáp, viêm giáp và u tuyến"],
    memory: "Nang đều + keo hồng + biểu mô thấp = nền bình thường.",
    pitfall: "Nang giáp co kéo do xử lý mô có thể làm hình ảnh không đều giả.",
    markers: ["Thyroglobulin", "TTF-1", "PAX8"],
  },
  {
    id: "thyroid-nodular",
    chapter: "thyroid",
    diagnosis: "Bướu giáp nhân / quá sản dạng keo",
    english: "Nodular hyperplasia / colloid goiter",
    file: "Normal thyroid cell No.2.jpg",
    pattern: ["benign"],
    source: "Wikimedia Commons",
    micro: ["Nang giáp kích thước không đều", "Chất keo có thể tăng hoặc giảm", "Xơ hóa, xuất huyết, thoái hóa nang"],
    report: ["Tìm bao u thật sự và dấu xâm lấn nếu nghi u dạng nang"],
    memory: "Không đều nhưng lành: nhiều nang to nhỏ, keo nhiều, không atypia kiểu PTC.",
    pitfall: "Có thể giống follicular adenoma trên FNA; bệnh phẩm cắt giúp đánh giá bao.",
    markers: ["Không cần marker thường quy"],
  },
  {
    id: "thyroid-hashimoto",
    chapter: "thyroid",
    diagnosis: "Viêm tuyến giáp Hashimoto",
    english: "Hashimoto thyroiditis",
    file: "Hashimoto thyroiditis -- high mag.jpg",
    pattern: ["inflammation"],
    source: "Wikimedia Commons",
    micro: ["Thâm nhiễm lympho lan tỏa", "Có nang lympho/trung tâm mầm", "Tế bào Hurthle/oncocytic metaplasia"],
    report: ["Mô tả viêm mạn tự miễn và loại trừ u nếu có nhân nghi ngờ"],
    memory: "Lympho + trung tâm mầm + Hurthle cell.",
    pitfall: "Thay đổi Hurthle nổi bật có thể làm nghi u tế bào Hurthle.",
    markers: ["TPO Ab lâm sàng", "Thyroglobulin"],
  },
  {
    id: "thyroid-subacute",
    chapter: "thyroid",
    diagnosis: "Viêm tuyến giáp bán cấp",
    english: "Subacute granulomatous thyroiditis",
    file: "Hashimoto thyroiditis -- intermed mag.jpg",
    pattern: ["inflammation"],
    source: "Wikimedia Commons",
    micro: ["Phá hủy nang giáp", "Viêm hạt quanh chất keo", "Tế bào khổng lồ đa nhân"],
    report: ["Gắn với đau tuyến giáp sau nhiễm virus nếu phù hợp lâm sàng"],
    memory: "Keo tràn ra ngoài nang sẽ kéo mô bào và tế bào khổng lồ tới dọn.",
    pitfall: "Ảnh minh họa dùng cùng nhóm viêm giáp; nên thay ảnh bằng case subacute thật khi có.",
    markers: ["Không đặc hiệu"],
  },
  {
    id: "thyroid-follicular-adenoma",
    chapter: "thyroid",
    diagnosis: "U tuyến giáp thể nang",
    english: "Follicular adenoma",
    file: "Follicular Adenoma of the Thyroid Gland (5186991355).jpg",
    pattern: ["benign", "glandular"],
    source: "Wikimedia Commons",
    micro: ["U có bao", "Nang nhỏ hoặc lớn tương đối đồng dạng", "Không xâm lấn bao hay mạch"],
    report: ["Phải cắt bao đủ để loại trừ follicular carcinoma"],
    memory: "Follicular adenoma = u có bao nhưng chưa xâm lấn.",
    pitfall: "Không chẩn đoán chắc trên FNA vì không đánh giá được xâm lấn bao/mạch.",
    markers: ["PAX8", "TTF-1", "Thyroglobulin"],
  },
  {
    id: "thyroid-niftp",
    chapter: "thyroid",
    diagnosis: "NIFTP",
    english: "Non-invasive follicular thyroid neoplasm with papillary-like nuclear features",
    file: "Thyroid papillary carcinoma histopathology (3).jpg",
    pattern: ["precursor", "glandular"],
    source: "Wikimedia Commons",
    micro: ["Cấu trúc dạng nang", "Nhân có đặc điểm PTC", "Không xâm lấn bao/mạch, không nhú thật sự đáng kể"],
    report: ["Cần lấy mẫu bao đầy đủ; tiêu chuẩn loại trừ rất quan trọng"],
    memory: "Nhân kiểu PTC nhưng hành vi thấp nếu không xâm lấn và đủ tiêu chuẩn.",
    pitfall: "Nếu có xâm lấn hoặc cấu trúc nhú rõ, không gọi NIFTP.",
    markers: ["RAS-like", "BRAF V600E thường không phù hợp"],
  },
  {
    id: "thyroid-ptc",
    chapter: "thyroid",
    diagnosis: "Ung thư biểu mô tuyến giáp thể nhú",
    english: "Papillary thyroid carcinoma",
    file: "Thyroid papillary carcinoma histopathology (2).jpg",
    pattern: ["carcinoma", "glandular"],
    source: "Wikimedia Commons",
    micro: ["Nhú phân nhánh có trục xơ mạch", "Nhân sáng kiểu Orphan Annie, rãnh nhân", "Thể vùi trong nhân và psammoma bodies có thể gặp"],
    report: ["Subtype", "Xâm lấn bao/mạch", "Di căn hạch", "Margin"],
    memory: "PTC là bệnh của nhân: sáng, rãnh, vùi.",
    pitfall: "Follicular variant/NIFTP cần đánh giá xâm lấn và tiêu chuẩn loại trừ.",
    markers: ["BRAF V600E", "HBME1", "Galectin-3"],
  },
  {
    id: "thyroid-ftc",
    chapter: "thyroid",
    diagnosis: "Ung thư biểu mô tuyến giáp thể nang",
    english: "Follicular thyroid carcinoma",
    file: "Follicular Adenoma of the Thyroid Gland (5186991355).jpg",
    pattern: ["carcinoma", "glandular"],
    source: "Wikimedia Commons",
    micro: ["U dạng nang", "Bắt buộc có xâm lấn bao và/hoặc mạch", "Không có nhân kiểu PTC điển hình"],
    report: ["Mức xâm lấn bao/mạch", "Số ổ xâm lấn mạch", "Margin"],
    memory: "FTC không phải nhìn atypia trước; hãy tìm xâm lấn bao/mạch.",
    pitfall: "Ảnh minh họa dạng nang; cần thay bằng ảnh FTC thật khi có.",
    markers: ["RAS-like", "PAX8", "Thyroglobulin"],
  },
  {
    id: "thyroid-medullary",
    chapter: "thyroid",
    diagnosis: "Ung thư biểu mô tuyến giáp thể tủy",
    english: "Medullary thyroid carcinoma",
    file: "Medullary thyroid carcinoma - 2 - high mag.jpg",
    pattern: ["carcinoma", "neuroendocrine", "ihc"],
    source: "Wikimedia Commons",
    micro: ["Tế bào đa giác hoặc thoi", "Xếp đám, bè, dây", "Amyloid mô đệm có thể gặp"],
    report: ["Calcitonin", "Amyloid", "Liên quan MEN2/RET khi phù hợp"],
    memory: "MTC = tế bào C, calcitonin và amyloid.",
    pitfall: "Có thể nhầm u neuroendocrine di căn nếu không gắn vị trí tuyến giáp.",
    markers: ["Calcitonin", "CEA", "Chromogranin", "Synaptophysin"],
  },
  {
    id: "thyroid-anaplastic",
    chapter: "thyroid",
    diagnosis: "Ung thư tuyến giáp không biệt hóa",
    english: "Anaplastic thyroid carcinoma",
    file: "Anaplastic thyroid carcinoma low mag.jpg",
    pattern: ["carcinoma", "spindle"],
    source: "Wikimedia Commons",
    micro: ["Tế bào rất dị dạng", "Dạng thoi/khổng lồ/đa hình", "Hoại tử và phân bào nhiều"],
    report: ["Lan rộng ngoài tuyến", "Hoại tử", "Marker biểu mô có thể yếu"],
    memory: "Mất hình thái tuyến giáp, chỉ còn u rất ác tính và phá hủy.",
    pitfall: "Cần phân biệt sarcoma, lymphoma, melanoma và di căn.",
    markers: ["PAX8 có thể dương", "Pan-CK có thể yếu", "p53"],
  },
  {
    id: "lung-adeno",
    chapter: "lung",
    diagnosis: "Adenocarcinoma phổi",
    english: "Lung adenocarcinoma",
    file: "Lung adenocarcinoma with lepidic growth - low magnification.jpg",
    pattern: ["carcinoma", "glandular", "ihc"],
    source: "Wikimedia Commons",
    micro: ["Lepidic/acinar/papillary/micropapillary/solid patterns", "Tạo tuyến hoặc mucin", "Có thể có STAS"],
    report: ["Pattern ưu thế", "Grade", "STAS", "PD-L1/EGFR/ALK khi cần"],
    memory: "Adeno phổi = tuyến/mucin + TTF-1/Napsin A thường hỗ trợ.",
    pitfall: "Sinh thiết nhỏ không nên overcall subtype/grade khi mẫu ít.",
    markers: ["TTF-1", "Napsin A", "CK7"],
  },
  {
    id: "lung-squamous",
    chapter: "lung",
    diagnosis: "Carcinoma tế bào gai phổi",
    english: "Lung squamous cell carcinoma",
    file: "Histopathology of squamous-cell carcinoma of the lung.jpg",
    pattern: ["carcinoma", "squamous", "ihc"],
    source: "Wikimedia Commons",
    micro: ["Keratinization/cầu sừng", "Intercellular bridges", "Ổ tế bào gai xâm nhập"],
    report: ["Mức biệt hóa", "Hoại tử", "p40/p63/CK5/6 nếu kém biệt hóa"],
    memory: "Gai = hồng, cầu sừng, cầu nối gian bào.",
    pitfall: "Carcinoma gai di căn tới phổi có thể giống nguyên phát.",
    markers: ["p40", "p63", "CK5/6"],
  },
  {
    id: "lung-small-cell",
    chapter: "lung",
    diagnosis: "Carcinoma tế bào nhỏ",
    english: "Small cell lung carcinoma",
    file: "Lung cancer histology collection.png",
    pattern: ["carcinoma", "neuroendocrine", "ihc"],
    source: "Wikimedia Commons",
    micro: ["Tế bào nhỏ, nhân tăng sắc", "Ít bào tương", "Nuclear molding, hoại tử, phân bào nhiều"],
    report: ["Xác nhận neuroendocrine", "Ki-67 rất cao", "Mẫu nhỏ cần phân biệt lymphoma"],
    memory: "Small cell = blue tumor, molding, necrosis, Ki-67 cao.",
    pitfall: "Crush artifact có thể làm khó phân biệt lymphoma/carcinoma kém biệt hóa.",
    markers: ["Synaptophysin", "Chromogranin", "INSM1", "TTF-1"],
  },
  {
    id: "lung-mucinous",
    chapter: "lung",
    diagnosis: "Adenocarcinoma phổi dạng nhầy",
    english: "Invasive mucinous adenocarcinoma",
    file: "Lung adenocarcinoma with lepidic growth - low magnification 2.jpg",
    pattern: ["carcinoma", "glandular"],
    source: "Wikimedia Commons",
    micro: ["Tế bào trụ/goblet có mucin", "Có thể lan dạng lepidic", "TTF-1 có thể âm"],
    report: ["Tỷ lệ mucinous", "Pattern xâm nhập", "Loại trừ di căn tiêu hóa"],
    memory: "Mucinous lung adeno dễ làm mình nghĩ tới đường tiêu hóa.",
    pitfall: "CK20/CDX2 có thể gây nhiễu; cần lâm sàng và hình ảnh.",
    markers: ["CK7", "CK20/CDX2 biến thiên", "TTF-1 thường giảm"],
  },
  {
    id: "colon-hyperplastic",
    chapter: "colon",
    diagnosis: "Polyp tăng sản đại tràng",
    english: "Hyperplastic polyp",
    file: "Mixed histology polyp.png",
    pattern: ["benign"],
    source: "Wikimedia Commons",
    micro: ["Răng cưa nông ở bề mặt", "Crypt thẳng, đáy crypt đều", "Không loạn sản thật sự"],
    report: ["Vị trí và kích thước", "Phân biệt SSL nếu ở đại tràng phải hoặc crypt bất thường"],
    memory: "Răng cưa chỉ ở bề mặt, chân crypt thẳng.",
    pitfall: "Sessile serrated lesion có thể bị gọi nhầm là polyp tăng sản.",
    markers: ["Không cần IHC thường quy"],
  },
  {
    id: "colon-ssl",
    chapter: "colon",
    diagnosis: "Tổn thương răng cưa không cuống",
    english: "Sessile serrated lesion",
    file: "Mixed histology polyp.png",
    pattern: ["precursor", "glandular"],
    source: "Wikimedia Commons",
    micro: ["Giãn chân crypt", "Crypt hình L/ủng hoặc lan ngang", "Răng cưa kéo xuống đáy crypt"],
    report: ["Có/không loạn sản", "Vị trí", "Cắt trọn hay không"],
    memory: "SSL = bất thường ở chân crypt, không chỉ trên bề mặt.",
    pitfall: "Mảnh nhỏ nông dễ bỏ sót chân crypt.",
    markers: ["BRAF", "MLH1 khi có dysplasia"],
  },
  {
    id: "colon-adenoma",
    chapter: "colon",
    diagnosis: "Adenoma đại trực tràng",
    english: "Conventional colorectal adenoma",
    file: "Adenocarcinoma (left) and Villous Adenoma (right) in Colon Segment (4768849269).jpg",
    pattern: ["precursor", "glandular"],
    source: "Wikimedia Commons",
    micro: ["Tuyến đông đúc hoặc nhú", "Loạn sản biểu mô", "Đánh giá low-grade/high-grade"],
    report: ["Kiến trúc ống/nhung mao", "Mức độ loạn sản", "Margin nếu cắt polyp"],
    memory: "Adenoma = loạn sản thật sự; nhung mao nhiều hơn thường nguy cơ cao hơn.",
    pitfall: "Viêm/tái tạo có thể làm giả atypia.",
    markers: ["Không cần IHC thường quy"],
  },
  {
    id: "colon-adeno",
    chapter: "colon",
    diagnosis: "Adenocarcinoma đại trực tràng",
    english: "Colorectal adenocarcinoma",
    file: "Colon adenocarcinoma - biopsy, high mag.jpg",
    pattern: ["carcinoma", "glandular", "ihc"],
    source: "Wikimedia Commons",
    micro: ["Tuyến ác tính méo mó", "Desmoplasia", "Dirty necrosis có thể gặp"],
    report: ["Grade", "Độ sâu xâm nhập", "LVI/PNI", "Hạch", "MMR/MSI"],
    memory: "Tuyến bẩn, xâm nhập mô đệm và phản ứng xơ.",
    pitfall: "Sinh thiết nông có thể chỉ thấy loạn sản cao độ.",
    markers: ["MLH1", "PMS2", "MSH2", "MSH6", "SATB2/CDX2"],
  },
  {
    id: "breast-dcis",
    chapter: "breast",
    diagnosis: "DCIS vú",
    english: "Ductal carcinoma in situ",
    file: "Breast DCIS histopathology (1).jpg",
    pattern: ["precursor", "carcinoma"],
    source: "Wikimedia Commons",
    micro: ["Tế bào ác tính còn trong ống", "Myoepithelial còn bao quanh", "Comedo necrosis có thể gặp"],
    report: ["Grade nhân", "Hoại tử", "Kích thước/lan rộng", "Margin"],
    memory: "Ác tính nhưng còn trong ống.",
    pitfall: "Có thể kèm ổ xâm nhập nhỏ bị bỏ sót trên sinh thiết.",
    markers: ["p63", "SMMHC", "ER"],
  },
  {
    id: "breast-idc",
    chapter: "breast",
    diagnosis: "Carcinoma vú xâm nhập NST",
    english: "Invasive breast carcinoma of no special type",
    file: "Histopathology of invasive ductal carcinoma of the breast.jpg",
    pattern: ["carcinoma", "glandular", "ihc"],
    source: "Wikimedia Commons",
    micro: ["Đám/tuyến tế bào u trong mô đệm", "Mất lớp myoepithelial", "Desmoplasia thường gặp"],
    report: ["Nottingham grade", "ER/PR/HER2", "Ki-67", "LVI", "Margin", "Hạch"],
    memory: "Xâm nhập = u vượt ra khỏi ống vào mô đệm/mỡ.",
    pitfall: "Sclerosing adenosis/radial scar có thể giả xâm nhập.",
    markers: ["ER", "PR", "HER2", "Ki-67", "p63/SMMHC"],
  },
  {
    id: "breast-ilc",
    chapter: "breast",
    diagnosis: "Carcinoma tiểu thùy xâm nhập",
    english: "Invasive lobular carcinoma",
    file: "Infiltrating ductal carcinoma 10X.jpg",
    pattern: ["carcinoma"],
    source: "Wikimedia Commons",
    micro: ["Tế bào rời rạc, single-file", "Ít tạo tuyến", "Có thể có tế bào nhẫn"],
    report: ["ER/PR/HER2", "E-cadherin", "Margin vì u lan tỏa khó thấy"],
    memory: "Lobular thích đi hàng một và mất kết dính.",
    pitfall: "Ảnh minh họa chưa đặc hiệu ILC; nên thay ảnh ILC thật khi có.",
    markers: ["E-cadherin mất", "p120 bào tương", "ER"],
  },
  {
    id: "breast-mucinous",
    chapter: "breast",
    diagnosis: "Carcinoma vú dạng nhầy",
    english: "Mucinous breast carcinoma",
    file: "Histopathology of mucinous invasive ductal carcinoma of the breast.jpg",
    pattern: ["carcinoma", "glandular"],
    source: "Wikimedia Commons",
    micro: ["Hồ mucin ngoại bào", "Đảo tế bào u trôi trong mucin", "Đánh giá thuần/tạp"],
    report: ["Tỷ lệ thành phần mucinous", "ER/PR/HER2", "Grade", "Hạch"],
    memory: "Tế bào u như đảo nổi trong hồ mucin.",
    pitfall: "Mucin đơn thuần không đủ; cần tế bào u xâm nhập.",
    markers: ["ER", "PR", "HER2"],
  },
  {
    id: "hpb-hcc",
    chapter: "hpb",
    diagnosis: "Carcinoma tế bào gan",
    english: "Hepatocellular carcinoma",
    file: "Hepatocellular carcinoma histopathology (1).jpg",
    pattern: ["carcinoma"],
    source: "Wikimedia Commons",
    micro: ["Bè tế bào gan dày", "Mất reticulin", "Có thể thấy mật trong u"],
    report: ["Grade", "Xâm lấn mạch", "Nền xơ gan", "Margin"],
    memory: "U vẫn giống tế bào gan nhưng bè dày và mất khung reticulin.",
    pitfall: "HCC biệt hóa cao có thể giống nốt tái tạo/dysplastic nodule.",
    markers: ["Arginase-1", "HepPar-1", "Glypican-3"],
  },
  {
    id: "hpb-ipmn",
    chapter: "hpb",
    diagnosis: "IPMN tụy",
    english: "Intraductal papillary mucinous neoplasm",
    file: "Histopathology of pancreatobiliary intraductal papillary mucinous neoplasm in the pancreas.jpg",
    pattern: ["precursor", "glandular"],
    source: "Wikimedia Commons",
    micro: ["Nhú trong ống", "Biểu mô tiết nhầy", "Đánh giá mức loạn sản"],
    report: ["Subtype", "Low/high-grade dysplasia", "Có carcinoma xâm nhập không"],
    memory: "U nhầy trong ống tụy: tìm nhú, mucin và xâm nhập.",
    pitfall: "Không gọi carcinoma xâm nhập nếu chưa thấy u vượt ống vào mô đệm.",
    markers: ["MUC1/MUC2/MUC5AC tùy subtype"],
  },
  {
    id: "hpb-shock-liver",
    chapter: "hpb",
    diagnosis: "Hoại tử trung tâm tiểu thùy gan",
    english: "Centrilobular necrosis / shock liver",
    file: "Histopathology of shock liver.jpg",
    pattern: ["inflammation"],
    source: "Wikimedia Commons",
    micro: ["Hoại tử quanh tĩnh mạch trung tâm", "Vùng cửa bảo tồn tương đối", "Gợi ý thiếu máu/sốc/độc chất"],
    report: ["Mô tả pattern tổn thương, không tự gọi nguyên nhân nếu thiếu lâm sàng"],
    memory: "Vùng 3 chịu thiếu oxy trước.",
    pitfall: "Có thể bị gọi nhầm là viêm gan đặc hiệu.",
    markers: ["Không đặc hiệu"],
  },
  {
    id: "cervix-hsil",
    chapter: "gyn",
    diagnosis: "HSIL/CIN3 cổ tử cung",
    english: "High-grade squamous intraepithelial lesion",
    file: "Ca in situ, cervix 2.jpg",
    pattern: ["precursor", "squamous", "ihc"],
    source: "Wikimedia Commons",
    micro: ["Dày toàn bộ biểu mô", "Mất trưởng thành", "Chưa xâm nhập mô đệm"],
    report: ["Margin nếu khoét chóp", "Lan vào tuyến", "p16 nếu cần"],
    memory: "Loạn sản cao nhưng chưa vượt màng đáy.",
    pitfall: "Lan vào tuyến có thể làm tưởng xâm nhập.",
    markers: ["p16 block", "Ki-67 tăng cao"],
  },
  {
    id: "cervix-scc",
    chapter: "gyn",
    diagnosis: "Carcinoma tế bào gai cổ tử cung",
    english: "HPV-associated cervical squamous cell carcinoma",
    file: "Histopathology of squamous cell carcinoma of the cervix.png",
    pattern: ["carcinoma", "squamous", "ihc"],
    source: "Wikimedia Commons",
    micro: ["Đảo tế bào gai xâm nhập", "Keratinization có thể gặp", "Phản ứng mô đệm"],
    report: ["Độ sâu xâm nhập", "LVSI", "Margin", "p16"],
    memory: "Từ HSIL sang SCC khi đã vào mô đệm.",
    pitfall: "Sinh thiết nông có thể chưa chứng minh xâm nhập.",
    markers: ["p16", "p40", "CK5/6"],
  },
  {
    id: "endometrium-endometrioid",
    chapter: "gyn",
    diagnosis: "Carcinoma nội mạc tử cung dạng endometrioid",
    english: "Endometrioid endometrial carcinoma",
    file: "Histopathology of endometrial adenocarcinoma, endometrioid type.jpg",
    pattern: ["carcinoma", "glandular", "ihc"],
    source: "Wikimedia Commons",
    micro: ["Tuyến chen chúc/back-to-back", "Đánh giá thành phần đặc", "Atypia nhân"],
    report: ["FIGO grade", "Xâm nhập cơ", "LVSI", "p53/MMR khi cần"],
    memory: "Grade chủ yếu dựa vào tỷ lệ đặc.",
    pitfall: "Tăng sản không điển hình có thể rất sát carcinoma trên mẫu nhỏ.",
    markers: ["ER", "PR", "MMR", "p53"],
  },
  {
    id: "ovary-krukenberg",
    chapter: "gyn",
    diagnosis: "U Krukenberg",
    english: "Signet-ring cell carcinoma metastasis to ovary",
    file: "Gross pathology and histopathology of signet ring cell carcinoma metastasis to the ovary.jpg",
    pattern: ["carcinoma", "glandular"],
    source: "Wikimedia Commons",
    micro: ["Tế bào nhẫn", "Mô đệm phản ứng", "Thường nghĩ di căn tiêu hóa"],
    report: ["Tìm nguồn nguyên phát", "Hai bên hay một bên", "Panel CK7/CK20/CDX2/SATB2"],
    memory: "Buồng trứng + tế bào nhẫn = nghĩ di căn trước.",
    pitfall: "Không vội gọi ung thư buồng trứng nguyên phát.",
    markers: ["CK7", "CK20", "CDX2", "SATB2"],
  },
  {
    id: "prostate-adeno",
    chapter: "gu",
    diagnosis: "Adenocarcinoma tuyến tiền liệt",
    english: "Prostate adenocarcinoma",
    file: "Histopathology of prostate adenocarcinoma involving adipose tissue.jpg",
    pattern: ["carcinoma", "glandular", "ihc"],
    source: "Wikimedia Commons",
    micro: ["Tuyến nhỏ xâm nhập", "Thiếu lớp basal", "Có thể xâm nhập quanh thần kinh"],
    report: ["Gleason pattern", "Grade Group", "Số core dương", "Tỷ lệ/chiều dài u"],
    memory: "Gleason là ngôn ngữ chính của tuyến tiền liệt.",
    pitfall: "Atrophy/adenosis có thể giả carcinoma trên sinh thiết nhỏ.",
    markers: ["p63/HMWCK âm basal", "AMACR"],
  },
  {
    id: "kidney-clear-cell",
    chapter: "gu",
    diagnosis: "Carcinoma tế bào thận tế bào sáng",
    english: "Clear cell renal cell carcinoma",
    file: "Clear cell papillary renal cell carcinoma - high mag.jpg",
    pattern: ["carcinoma"],
    source: "Wikimedia Commons",
    micro: ["Tế bào sáng", "Mạng mạch máu mảnh", "Đọc WHO/ISUP grade"],
    report: ["Subtype", "Grade", "Hoại tử", "Xâm lấn mạch/xoang thận"],
    memory: "Clear cell = tế bào sáng và lưới mạch tinh tế.",
    pitfall: "Ảnh minh họa clear cell papillary RCC; nên thay ảnh clear cell RCC chuẩn khi có.",
    markers: ["CAIX", "CD10", "PAX8"],
  },
  {
    id: "kidney-papillary1",
    chapter: "gu",
    diagnosis: "Papillary renal cell carcinoma type 1",
    english: "Papillary RCC type 1",
    file: "Histopathology of papillary renal cell carcinoma type 1.jpg",
    pattern: ["carcinoma"],
    source: "Wikimedia Commons",
    micro: ["Cấu trúc nhú/ống-nhú", "Đại thực bào bọt trong trục nhú", "Tế bào nhỏ, ít bào tương"],
    report: ["Subtype", "Grade", "Hoại tử", "Xâm lấn"],
    memory: "Nhú + mô bào bọt = gợi ý papillary RCC.",
    pitfall: "Cần phân biệt với clear cell papillary RCC và metastasis.",
    markers: ["PAX8", "CK7", "AMACR"],
  },
  {
    id: "skin-bcc",
    chapter: "skin",
    diagnosis: "Carcinoma tế bào đáy",
    english: "Basal cell carcinoma",
    file: "Basal-cell carcinoma - histopathology (1).jpg",
    pattern: ["carcinoma"],
    source: "Wikimedia Commons",
    micro: ["Ổ tế bào basaloid", "Palisading ngoại vi", "Khe co rút quanh u"],
    report: ["Subtype nguy cơ cao", "Margin", "PNI nếu có"],
    memory: "BCC = basaloid + palisading + retraction cleft.",
    pitfall: "Trichoepithelioma và basaloid SCC có thể giống.",
    markers: ["BerEP4", "BCL2"],
  },
  {
    id: "skin-scc",
    chapter: "skin",
    diagnosis: "Carcinoma tế bào gai da",
    english: "Cutaneous squamous cell carcinoma",
    file: "Squamous cell carcinoma histopathology (2).jpg",
    pattern: ["carcinoma", "squamous"],
    source: "Wikimedia Commons",
    micro: ["Đảo tế bào gai xâm nhập", "Keratin pearls", "Atypia và mitosis"],
    report: ["Độ sâu", "Biệt hóa", "PNI", "Margin"],
    memory: "Da SCC giống squamous ở nơi khác nhưng phải đọc độ sâu và PNI.",
    pitfall: "Pseudoepitheliomatous hyperplasia có thể giống SCC.",
    markers: ["p40", "CK5/6"],
  },
  {
    id: "skin-melanoma",
    chapter: "skin",
    diagnosis: "Melanoma",
    english: "Cutaneous melanoma",
    file: "Melanoma in skin.jpg",
    pattern: ["carcinoma", "ihc"],
    source: "Wikimedia Commons",
    micro: ["Tế bào melanocytic không điển hình", "Lan pagetoid hoặc xâm nhập bì", "Đọc Breslow và ulceration"],
    report: ["Breslow thickness", "Ulceration", "Mitosis", "Margin", "Regression/satellitosis"],
    memory: "Melanoma report bắt đầu bằng Breslow.",
    pitfall: "Không dựa vào sắc tố đơn độc; amelanotic melanoma có thể không đen.",
    markers: ["SOX10", "S100", "Melan-A", "HMB45"],
  },
  {
    id: "heme-follicular",
    chapter: "heme",
    diagnosis: "Lymphoma nang",
    english: "Follicular lymphoma",
    file: "Follicular lymphoma - intermed mag.jpg",
    pattern: ["lymphoid", "ihc"],
    source: "Wikimedia Commons",
    micro: ["Nang dày đặc, mất phân cực", "Centrocytes/centroblasts", "BCL2 trong nang"],
    report: ["Grade 1-2/3A/3B", "Pattern nang/lan tỏa", "Panel CD20/CD10/BCL6/BCL2"],
    memory: "Nang lymphoma không còn dark/light zone và BCL2 bật trong nang.",
    pitfall: "Tăng sản nang phản ứng có thể giống nếu không đọc kiến trúc và IHC.",
    markers: ["CD20", "CD10", "BCL6", "BCL2"],
  },
  {
    id: "heme-hodgkin",
    chapter: "heme",
    diagnosis: "Lymphoma Hodgkin cổ điển",
    english: "Classic Hodgkin lymphoma",
    file: "Hodgkin lymphoma mixed cellularity high mag.jpg",
    pattern: ["lymphoid", "ihc"],
    source: "Wikimedia Commons",
    micro: ["Tế bào Reed-Sternberg/Hodgkin", "Nền viêm hỗn hợp", "Có thể có xơ hóa tùy subtype"],
    report: ["Subtype", "CD30/CD15", "EBER khi cần"],
    memory: "Tế bào lớn trong biển tế bào viêm.",
    pitfall: "Nhiều lymphoma tế bào lớn CD30+ có thể bắt chước.",
    markers: ["CD30", "CD15", "PAX5 yếu", "EBER"],
  },
  {
    id: "cns-meningioma",
    chapter: "cns",
    diagnosis: "Meningioma",
    english: "Meningioma",
    file: "Meningioma showing Psammoma body.jpg",
    pattern: ["spindle"],
    source: "Wikimedia Commons",
    micro: ["Whorls", "Psammoma bodies", "Tế bào đồng dạng"],
    report: ["WHO grade", "Brain invasion", "Mitosis", "Necrosis"],
    memory: "Whorl + psammoma = nghĩ meningioma.",
    pitfall: "Spindle meningioma có thể giống schwannoma/fibrous lesion.",
    markers: ["EMA", "PR", "SSTR2A"],
  },
  {
    id: "headneck-oral-scc",
    chapter: "headneck",
    diagnosis: "Carcinoma tế bào gai khoang miệng",
    english: "Oral squamous cell carcinoma",
    file: "Oral cancer (1) squamous cell carcinoma histopathology.jpg",
    pattern: ["carcinoma", "squamous"],
    source: "Wikimedia Commons",
    micro: ["Đảo tế bào gai xâm nhập", "Keratinization", "Phản ứng mô đệm"],
    report: ["Độ sâu xâm nhập", "PNI/LVI", "Margin", "Hạch"],
    memory: "Ở đầu cổ, PNI và margin cực kỳ quan trọng.",
    pitfall: "Pseudoepitheliomatous hyperplasia trên mẫu nông.",
    markers: ["p40", "CK5/6", "p16 tùy vị trí"],
  },
  {
    id: "headneck-pleomorphic",
    chapter: "headneck",
    diagnosis: "U tuyến đa dạng tuyến nước bọt",
    english: "Pleomorphic adenoma",
    file: "Pleomorphic adenoma.jpg",
    pattern: ["benign", "glandular", "spindle"],
    source: "Wikimedia Commons",
    micro: ["Thành phần biểu mô và myoepithelial", "Nền myxoid/chondroid", "Ranh giới tương đối rõ"],
    report: ["Cắt trọn", "Bao/vỏ", "Dấu biến đổi carcinoma ex pleomorphic adenoma nếu có"],
    memory: "Pleomorphic adenoma là u hai pha trong nền myxochondroid.",
    pitfall: "Sinh thiết nhỏ có thể chỉ bắt một vùng.",
    markers: ["S100", "SOX10", "p63", "CK"],
  },
  {
    id: "soft-neurofibroma",
    chapter: "soft",
    diagnosis: "Neurofibroma",
    english: "Neurofibroma",
    file: "Neurofibroma -1.jpg",
    pattern: ["benign", "spindle"],
    source: "Wikimedia Commons",
    micro: ["Tế bào thoi lượn sóng", "Nền collagen/myxoid", "Ít atypia"],
    report: ["Ranh giới", "Plexiform hay không", "Atypia nếu có"],
    memory: "Spindle lành tính, nhân lượn sóng, nền mềm.",
    pitfall: "Schwannoma, perineurioma và sẹo có thể giống nhau.",
    markers: ["S100", "SOX10"],
  },
  {
    id: "inflammation-granuloma",
    chapter: "inflammation",
    diagnosis: "Viêm hạt",
    english: "Granulomatous inflammation",
    file: "Histopathology of granuloma of colonic mucosa.jpg",
    pattern: ["inflammation"],
    source: "Wikimedia Commons",
    micro: ["Cụm mô bào dạng biểu mô", "Tế bào khổng lồ có thể gặp", "Có/không hoại tử bã đậu"],
    report: ["Vị trí", "Hoại tử", "Nhuộm AFB/GMS/PAS khi nghi nhiễm"],
    memory: "Granuloma là pattern, không phải một chẩn đoán nguyên nhân.",
    pitfall: "Granuloma dị vật và Crohn/TB/nấm cần bối cảnh khác nhau.",
    markers: ["AFB", "GMS", "PAS"],
  },
];

const sourceCards = [
  {
    title: "WHO/IARC Blue Books",
    kind: "Phân loại chuẩn",
    note: "Trang cấu trúc WCT liệt kê hệ thống phân loại theo cơ quan, dùng để đối chiếu tên u và nhóm bệnh.",
    url: "https://whobluebooks.iarc.fr/structures/",
  },
  {
    title: "PathologyOutlines",
    kind: "Vi thể và IHC",
    note: "Dùng để đọc thêm microscopic features, differential diagnosis và marker. Site có thể chặn bot nhưng mở tốt trên trình duyệt.",
    url: `${PO}/`,
  },
  {
    title: "CAP Cancer Protocols",
    kind: "Checklist báo cáo",
    note: "Dùng khi cần biết báo cáo ung thư cần đủ yếu tố nào: grade, margin, LVI/PNI, hạch, biomarker.",
    url: CAP,
  },
  {
    title: "Wikimedia Commons",
    kind: "Ảnh mở minh họa",
    note: "Ảnh nhúng trong atlas có link về file gốc để kiểm tra tác giả/giấy phép. Có thể thay ảnh bằng nguồn của bạn.",
    url: COMMONS_CATEGORY,
  },
];

let state = {
  chapter: "thyroid",
  pattern: "all",
  query: "",
  selectedId: "thyroid-ptc",
};

let imageOverrides = loadOverrides();

const els = {
  organNav: document.getElementById("organNav"),
  searchInput: document.getElementById("searchInput"),
  patternFilters: document.getElementById("patternFilters"),
  resetFilters: document.getElementById("resetFilters"),
  chapterPanel: document.getElementById("chapterPanel"),
  diagnosisHeading: document.getElementById("diagnosisHeading"),
  diagnosisCount: document.getElementById("diagnosisCount"),
  diagnosisGrid: document.getElementById("diagnosisGrid"),
  caseDetail: document.getElementById("caseDetail"),
  posterTitle: document.getElementById("posterTitle"),
  posterNote: document.getElementById("posterNote"),
  memoryPoster: document.getElementById("memoryPoster"),
  galleryTitle: document.getElementById("galleryTitle"),
  galleryCount: document.getElementById("galleryCount"),
  galleryGrid: document.getElementById("galleryGrid"),
  sourceGrid: document.getElementById("sourceGrid"),
  statOrgans: document.getElementById("statOrgans"),
  statDx: document.getElementById("statDx"),
  statSources: document.getElementById("statSources"),
  imageDialog: document.getElementById("imageDialog"),
  imageDialogTitle: document.getElementById("imageDialogTitle"),
  imageUrlInput: document.getElementById("imageUrlInput"),
  imageSourceInput: document.getElementById("imageSourceInput"),
  saveImage: document.getElementById("saveImage"),
  resetImage: document.getElementById("resetImage"),
  openImageManager: document.getElementById("openImageManager"),
};

function loadOverrides() {
  try {
    return JSON.parse(localStorage.getItem("atlasImageOverrides") || "{}");
  } catch {
    return {};
  }
}

function saveOverrides() {
  localStorage.setItem("atlasImageOverrides", JSON.stringify(imageOverrides));
}

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
    .replace(/đ/g, "d")
    .replace(/Đ/g, "d");
}

function chapterById(id) {
  return chapters.find((chapter) => chapter.id === id) || chapters[0];
}

function patternLabel(id) {
  return patterns.find(([key]) => key === id)?.[1] || id;
}

function imageFor(item) {
  const override = imageOverrides[item.id];
  if (override?.url) return override.url;
  return commonsImage(item.file);
}

function imageSourceFor(item) {
  const override = imageOverrides[item.id];
  if (override?.source) return override.source;
  return item.source;
}

function imageLinkFor(item) {
  return imageOverrides[item.id]?.sourceUrl || commonsSource(item.file);
}

function allText(item) {
  const chapter = chapterById(item.chapter);
  return normalize([
    chapter.name,
    item.diagnosis,
    item.english,
    item.pattern.join(" "),
    item.micro.join(" "),
    item.report.join(" "),
    item.memory,
    item.pitfall,
    item.markers.join(" "),
  ].join(" "));
}

function filteredCases() {
  const query = normalize(state.query);
  return cases.filter((item) => {
    const chapterOk = state.chapter === "all" || item.chapter === state.chapter;
    const patternOk = state.pattern === "all" || item.pattern.includes(state.pattern);
    const queryOk = !query || allText(item).includes(query);
    return chapterOk && patternOk && queryOk;
  });
}

function safeImageAttrs(item) {
  return `src="${escapeHtml(imageFor(item))}" alt="${escapeHtml(item.diagnosis)}" loading="lazy" onerror="this.style.display='none'; this.parentElement.classList.add('image-missing')"`;
}

function officialLinks(item) {
  const chapter = chapterById(item.chapter);
  const links = [
    { label: "WHO/IARC", url: chapter.who },
    { label: "PathologyOutlines", url: verifiedTopicLinks[item.id] || chapter.po },
  ];
  if (item.report.some((entry) => normalize(entry).includes("margin") || normalize(entry).includes("grade") || normalize(entry).includes("hach"))) {
    links.push({ label: "CAP", url: CAP });
  }
  return links;
}

function renderNav() {
  els.organNav.innerHTML = chapters.map((chapter) => {
    const count = chapter.id === "all" ? cases.length : cases.filter((item) => item.chapter === chapter.id).length;
    return `
      <button class="nav-pill ${state.chapter === chapter.id ? "active" : ""}" type="button" data-chapter="${escapeHtml(chapter.id)}">
        <i style="--dot:${escapeHtml(chapter.color)}"></i>
        <strong>${escapeHtml(chapter.name)}</strong>
        <em>${count}</em>
      </button>
    `;
  }).join("");

  els.organNav.querySelectorAll("[data-chapter]").forEach((button) => {
    button.addEventListener("click", () => {
      state.chapter = button.dataset.chapter;
      const first = filteredCases()[0] || cases[0];
      state.selectedId = first.id;
      renderAll();
      document.getElementById("atlasBoard").scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });
}

function renderPatterns() {
  els.patternFilters.innerHTML = patterns.map(([id, label]) => `
    <button class="filter-chip ${state.pattern === id ? "active" : ""}" type="button" data-pattern="${escapeHtml(id)}">
      ${escapeHtml(label)}
    </button>
  `).join("");

  els.patternFilters.querySelectorAll("[data-pattern]").forEach((button) => {
    button.addEventListener("click", () => {
      state.pattern = button.dataset.pattern;
      const first = filteredCases()[0] || cases[0];
      state.selectedId = first.id;
      renderAll();
    });
  });
}

function renderChapterPanel() {
  const chapter = chapterById(state.chapter);
  const visible = filteredCases();
  const chapterCases = state.chapter === "all" ? cases : cases.filter((item) => item.chapter === state.chapter);
  const markerCount = new Set(chapterCases.flatMap((item) => item.markers)).size;

  els.chapterPanel.style.setProperty("--chapter-color", chapter.color);
  els.chapterPanel.innerHTML = `
    <span class="chapter-code">${escapeHtml(chapter.short)}</span>
    <div>
      <span class="eyebrow">${state.chapter === "all" ? "Tổng quan" : "Chương cơ quan"}</span>
      <h2>${escapeHtml(chapter.name)}</h2>
      <p>${escapeHtml(chapter.intro)}</p>
    </div>
    <div class="chapter-metrics">
      <div><strong>${chapterCases.length}</strong><span>chẩn đoán</span></div>
      <div><strong>${new Set(chapterCases.flatMap((item) => item.pattern)).size}</strong><span>pattern</span></div>
      <div><strong>${markerCount}</strong><span>marker/gợi ý</span></div>
    </div>
    <div class="chapter-links">
      <a href="${escapeHtml(chapter.who)}" target="_blank" rel="noreferrer">WHO/IARC classification ↗</a>
      <a href="${escapeHtml(chapter.po)}" target="_blank" rel="noreferrer">PathologyOutlines chapter ↗</a>
    </div>
  `;

  els.diagnosisHeading.textContent = state.chapter === "all" ? "Tất cả chẩn đoán" : `Chẩn đoán ${chapter.name}`;
  els.diagnosisCount.textContent = `${visible.length} thẻ đang hiển thị`;
}

function renderDiagnosisGrid() {
  const items = filteredCases();
  if (!items.length) {
    els.diagnosisGrid.innerHTML = `<div class="empty-state">Không có chẩn đoán phù hợp. Hãy thử từ khóa rộng hơn hoặc bấm “Hiện tất cả”.</div>`;
    return;
  }

  els.diagnosisGrid.innerHTML = items.map((item) => {
    const chapter = chapterById(item.chapter);
    return `
      <button class="diagnosis-card ${item.id === state.selectedId ? "active" : ""}" type="button" data-case="${escapeHtml(item.id)}">
        <img ${safeImageAttrs(item)} />
        <span class="organ-badge" style="--badge:${escapeHtml(chapter.color)}">${escapeHtml(chapter.name)}</span>
        <strong>${escapeHtml(item.diagnosis)}</strong>
        <em>${escapeHtml(item.english)}</em>
        <p>${escapeHtml(item.micro.slice(0, 2).join(" · "))}</p>
        <small>${escapeHtml(item.pattern.slice(0, 3).map(patternLabel).join(" / "))}</small>
      </button>
    `;
  }).join("");

  bindCaseButtons(els.diagnosisGrid);
}

function renderDetail() {
  const items = filteredCases();
  if (!items.length) {
    els.caseDetail.innerHTML = "";
    return;
  }

  const item = items.find((entry) => entry.id === state.selectedId) || items[0];
  state.selectedId = item.id;
  const chapter = chapterById(item.chapter);
  const links = officialLinks(item);

  document.documentElement.style.setProperty("--hero-image", `url("${imageFor(item)}")`);

  els.caseDetail.innerHTML = `
    <div class="detail-image">
      <img ${safeImageAttrs(item)} />
      <div class="image-credit">Ảnh: ${escapeHtml(imageSourceFor(item))}</div>
    </div>
    <div class="detail-copy">
      <span class="eyebrow">${escapeHtml(chapter.name)} · ${escapeHtml(item.pattern.map(patternLabel).join(" / "))}</span>
      <h2>${escapeHtml(item.diagnosis)}</h2>
      <p class="english">${escapeHtml(item.english)}</p>
      <div class="detail-grid">
        <section>
          <h3>Vi thể cần nhìn</h3>
          <ul>${item.micro.map((entry) => `<li>${escapeHtml(entry)}</li>`).join("")}</ul>
        </section>
        <section>
          <h3>Gợi ý báo cáo</h3>
          <ul>${item.report.map((entry) => `<li>${escapeHtml(entry)}</li>`).join("")}</ul>
        </section>
        <section>
          <h3>Điểm ghi nhớ</h3>
          <p>${escapeHtml(item.memory)}</p>
          <p><strong>Dễ nhầm:</strong> ${escapeHtml(item.pitfall)}</p>
        </section>
      </div>
      <div class="tag-row">
        ${item.markers.map((marker) => `<span>${escapeHtml(marker)}</span>`).join("")}
      </div>
      <div class="link-row">
        <a href="${escapeHtml(imageLinkFor(item))}" target="_blank" rel="noreferrer"><span>Nguồn ảnh</span>${escapeHtml(imageSourceFor(item))} ↗</a>
        ${links.map((link) => `<a href="${escapeHtml(link.url)}" target="_blank" rel="noreferrer"><span>Đọc nguồn</span>${escapeHtml(link.label)} ↗</a>`).join("")}
        <button class="btn" type="button" data-edit-image="${escapeHtml(item.id)}">Đổi ảnh này</button>
      </div>
    </div>
  `;

  const editButton = els.caseDetail.querySelector("[data-edit-image]");
  editButton?.addEventListener("click", () => openImageDialog(item.id));
}

function renderPoster() {
  const chapter = chapterById(state.chapter);
  const pool = (state.chapter === "all" ? cases : cases.filter((item) => item.chapter === state.chapter)).slice(0, 10);
  els.posterTitle.textContent = state.chapter === "all" ? "10 pattern nền tảng" : `Atlas ${chapter.name}`;
  els.posterNote.textContent = state.chapter === "thyroid"
    ? "Bố cục mô phỏng poster tuyến giáp: từ lành tính, viêm, u dạng nang đến PTC/MTC/ATC."
    : state.chapter === "lung"
      ? "Bố cục mô phỏng poster ung thư phổi: tách tuyến, gai, tế bào nhỏ và mucinous."
      : state.chapter === "colon"
        ? "Bố cục mô phỏng poster polyp đại tràng: hyperplastic, serrated, adenoma và carcinoma."
        : "Dùng để ôn nhanh: mỗi thẻ là một hình ảnh, ba dấu hiệu chính và một câu ghi nhớ.";

  els.memoryPoster.innerHTML = pool.map((item, index) => {
    return `
      <article class="memory-card" style="--poster-color:${escapeHtml(chapterById(item.chapter).color)}">
        <img ${safeImageAttrs(item)} />
        <div class="memory-body">
          <span class="number">${index + 1}</span>
          <h3>${escapeHtml(item.diagnosis)}</h3>
          <p>${escapeHtml(item.micro.slice(0, 3).join(" · "))}</p>
          <div class="memory-note">${escapeHtml(item.memory)}</div>
        </div>
      </article>
    `;
  }).join("");
}

function renderGallery() {
  const items = filteredCases();
  const chapter = chapterById(state.chapter);
  els.galleryTitle.textContent = state.chapter === "all" ? "Tất cả ảnh atlas" : `Thư viện ảnh ${chapter.name}`;
  els.galleryCount.textContent = `${items.length} ảnh/chẩn đoán đang hiển thị`;

  if (!items.length) {
    els.galleryGrid.innerHTML = `<div class="empty-state">Không có ảnh phù hợp với bộ lọc hiện tại.</div>`;
    return;
  }

  els.galleryGrid.innerHTML = items.map((item) => {
    const chapterItem = chapterById(item.chapter);
    return `
      <article class="gallery-card" data-case="${escapeHtml(item.id)}">
        <div class="gallery-image">
          <img ${safeImageAttrs(item)} />
          <span class="organ-badge" style="--badge:${escapeHtml(chapterItem.color)}">${escapeHtml(chapterItem.name)}</span>
        </div>
        <div class="gallery-body">
          <div class="tag-row">${item.pattern.slice(0, 3).map((id) => `<span>${escapeHtml(patternLabel(id))}</span>`).join("")}</div>
          <h3>${escapeHtml(item.diagnosis)}</h3>
          <p class="english">${escapeHtml(item.english)}</p>
          <ul>${item.micro.slice(0, 2).map((entry) => `<li>${escapeHtml(entry)}</li>`).join("")}</ul>
        </div>
      </article>
    `;
  }).join("");

  bindCaseCards(els.galleryGrid);
}

function renderSources() {
  els.sourceGrid.innerHTML = sourceCards.map((card) => `
    <article class="source-card">
      <span class="eyebrow">${escapeHtml(card.kind)}</span>
      <h3>${escapeHtml(card.title)}</h3>
      <p>${escapeHtml(card.note)}</p>
      <a href="${escapeHtml(card.url)}" target="_blank" rel="noreferrer">Mở nguồn ↗</a>
    </article>
  `).join("");
}

function bindCaseButtons(scope) {
  scope.querySelectorAll("[data-case]").forEach((button) => {
    button.addEventListener("click", () => {
      state.selectedId = button.dataset.case;
      renderAll();
      els.caseDetail.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });
}

function bindCaseCards(scope) {
  scope.querySelectorAll("[data-case]").forEach((card) => {
    card.addEventListener("click", () => {
      state.selectedId = card.dataset.case;
      const selected = cases.find((item) => item.id === state.selectedId);
      if (selected) state.chapter = selected.chapter;
      renderAll();
      els.caseDetail.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });
}

function openImageDialog(id = state.selectedId) {
  const item = cases.find((entry) => entry.id === id) || cases[0];
  state.selectedId = item.id;
  const override = imageOverrides[item.id] || {};
  els.imageDialogTitle.textContent = `Cập nhật ảnh: ${item.diagnosis}`;
  els.imageUrlInput.value = override.url || "";
  els.imageSourceInput.value = override.source || "";
  els.imageDialog.showModal();
}

function bindEvents() {
  els.searchInput.addEventListener("input", () => {
    state.query = els.searchInput.value;
    if (state.query.trim()) state.chapter = "all";
    const first = filteredCases()[0];
    if (first) state.selectedId = first.id;
    renderAll();
  });

  els.resetFilters.addEventListener("click", () => {
    state = { chapter: "thyroid", pattern: "all", query: "", selectedId: "thyroid-ptc" };
    els.searchInput.value = "";
    renderAll();
  });

  els.openImageManager.addEventListener("click", () => openImageDialog(state.selectedId));

  els.saveImage.addEventListener("click", () => {
    const item = cases.find((entry) => entry.id === state.selectedId) || cases[0];
    const url = els.imageUrlInput.value.trim();
    const source = els.imageSourceInput.value.trim();
    if (!url) return;
    imageOverrides[item.id] = { url, source: source || "Ảnh tùy chỉnh", sourceUrl: url };
    saveOverrides();
    els.imageDialog.close();
    renderAll();
  });

  els.resetImage.addEventListener("click", () => {
    const item = cases.find((entry) => entry.id === state.selectedId) || cases[0];
    delete imageOverrides[item.id];
    saveOverrides();
    els.imageUrlInput.value = "";
    els.imageSourceInput.value = "";
    els.imageDialog.close();
    renderAll();
  });
}

function updateStats() {
  els.statOrgans.textContent = String(chapters.length - 1);
  els.statDx.textContent = String(cases.length);
  els.statSources.textContent = String(sourceCards.length);
}

function renderAll() {
  const visible = filteredCases();
  if (visible.length && !visible.some((item) => item.id === state.selectedId)) {
    state.selectedId = visible[0].id;
  }
  renderNav();
  renderPatterns();
  renderChapterPanel();
  renderDiagnosisGrid();
  renderDetail();
  renderPoster();
  renderGallery();
}

function init() {
  updateStats();
  renderSources();
  renderAll();
  bindEvents();
}

init();
