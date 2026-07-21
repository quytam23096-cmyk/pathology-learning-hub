const PO = "https://www.pathologyoutlines.com";
const PO_SEARCH = "https://www.google.com/cse?cx=partner-pub-3521518608648020%3A8640627894&q=";
const WCT = "https://whobluebooks.iarc.fr/structures";
const IARC = "https://tumourclassification.iarc.who.int";
const CAP = "https://www.cap.org/protocols-and-guidelines/cancer-protocols/current-cancer-protocols/";
const COMMONS_CATEGORY = "https://commons.wikimedia.org/wiki/Category:Histopathology";
const curation = window.ATLAS_CURATION || {};
const bilingualAtlas = window.ATLAS_BILINGUAL || {};

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
    intro: "Xem toàn bộ atlas, sau đó lọc theo cơ quan, kiểu cấu trúc hoặc từ khóa.",
    who: "https://whobluebooks.iarc.fr/structures/",
    po: `${PO}/`,
  },
  {
    id: "thyroid",
    name: "Tuyến giáp",
    short: "THY",
    color: "#5b2bbd",
    intro: "Bắt đầu bằng cấu trúc nang, chất keo, đặc điểm nhân kiểu PTC, xâm lấn vỏ bao/mạch và dấu ấn calcitonin khi nghi MTC.",
    who: `${WCT}/endocrine-and-neuroendocrine-tumours/`,
    po: `${PO}/thyroid.html`,
  },
  {
    id: "lung",
    name: "Phổi",
    short: "LUNG",
    color: "#2563eb",
    intro: "Phân biệt ung thư biểu mô tuyến, ung thư biểu mô tế bào vảy, ung thư biểu mô tế bào nhỏ và u di căn; chú ý TTF-1, Napsin A, p40 cùng các dấu ấn thần kinh nội tiết.",
    who: `${WCT}/thoracic-tumours/`,
    po: `${PO}/lung.html`,
  },
  {
    id: "colon",
    name: "Đại trực tràng",
    short: "CRC",
    color: "#04756f",
    intro: "Học chuỗi polyp tăng sản - tổn thương răng cưa - u tuyến - ung thư biểu mô; luôn tìm loạn sản và xâm nhập mô đệm.",
    who: `${IARC}/chapters/31`,
    po: `${PO}/colon.html`,
  },
  {
    id: "breast",
    name: "Vú",
    short: "BR",
    color: "#c2415a",
    intro: "Phân biệt tổn thương tại chỗ và xâm nhập; đánh giá típ mô học, độ mô học Nottingham, ER/PR/HER2, Ki-67, diện cắt và hạch.",
    who: `${WCT}/breast-tumours/`,
    po: `${PO}/breast.html`,
  },
  {
    id: "hpb",
    name: "Gan mật tụy",
    short: "HPB",
    color: "#96730f",
    intro: "Đánh giá cấu trúc bè, sắc tố mật, xơ hóa, các tuyến quanh tụy, PanIN/IPMN và dấu hiệu xâm nhập.",
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
    intro: "Tuyến tiền liệt cần điểm Gleason/nhóm độ mô học; thận cần xác định típ mô học; bàng quang cần đánh giá mức độ xâm nhập lớp cơ.",
    who: `${WCT}/urinary-and-male-genital-tumours/`,
    po: `${PO}/genitourinary.html`,
  },
  {
    id: "skin",
    name: "Da",
    short: "SKIN",
    color: "#ea580c",
    intro: "Đánh giá liên quan thượng bì, xếp hàng rào, sừng hóa, sắc tố, độ dày Breslow, loét và diện cắt.",
    who: "https://whobluebooks.iarc.who.int/structures/skintumours/",
    po: `${PO}/skintumors.html`,
  },
  {
    id: "heme",
    name: "Hạch - huyết học",
    short: "HEME",
    color: "#0891b2",
    intro: "Đánh giá kiến trúc hạch trước: còn nang phản ứng hay đã bị xóa? Sau đó mới đọc bảng dấu ấn CD và EBER.",
    who: "https://whobluebooks.iarc.fr/structures/haematolymphoid/",
    po: `${PO}/hematopathology.html`,
  },
  {
    id: "cns",
    name: "Thần kinh",
    short: "CNS",
    color: "#4f46e5",
    intro: "Tập nhận diện cấu trúc xoáy, thể cát, hoại tử, tăng sinh vi mạch và đối chiếu hình thái với dấu ấn/phân tử.",
    who: `${WCT}/central-nervous-system-tumours/`,
    po: `${PO}/Cnstumor.html`,
  },
  {
    id: "headneck",
    name: "Đầu cổ",
    short: "HN",
    color: "#9333ea",
    intro: "Đối chiếu vị trí, mức độ sừng hóa, xâm nhập quanh thần kinh và p16/EBER khi phù hợp.",
    who: `${WCT}/head-and-neck-tumours/`,
    po: `${PO}/headneck.html`,
  },
  {
    id: "soft",
    name: "Mô mềm - xương",
    short: "STB",
    color: "#db2777",
    intro: "Đánh giá tế bào hình thoi, nền dạng nhầy/collagen, mức độ không điển hình, phân bào, hoại tử và dấu ấn định hướng biệt hóa.",
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
  ["carcinoma", "Ung thư biểu mô"],
  ["glandular", "Tuyến"],
  ["squamous", "Tế bào vảy"],
  ["neuroendocrine", "Thần kinh nội tiết"],
  ["lymphoid", "Dòng lympho"],
  ["spindle", "Tế bào hình thoi"],
  ["inflammation", "Viêm"],
  ["ihc", "HMMD/IHC"],
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
Object.assign(verifiedTopicLinks, curation.topicLinks || {});

// Direct WHO Blue Books topic links verified against Digestive System Tumours (5th ed.).
// These pages may require the reader to sign in with their own WHO/IARC subscription.
const verifiedWhoLinks = {
  "colon-hyperplastic": `${IARC}/chaptercontent/31/57`,
  "colon-ssl": `${IARC}/chaptercontent/31/57`,
  "colon-tsa": `${IARC}/chaptercontent/31/57`,
  "colon-adenoma": `${IARC}/chaptercontent/31/59`,
  "colon-villous": `${IARC}/chaptercontent/31/59`,
  "colon-high-grade-dysplasia": `${IARC}/chaptercontent/31/59`,
  "colon-adeno": `${IARC}/chaptercontent/31/62`,
  "colon-mucinous-adeno": `${IARC}/chaptercontent/31/62`,
  "colon-signet-ring": `${IARC}/chaptercontent/31/62`,
};

// Tên tiếng Việt ưu tiên cách dùng trong hướng dẫn Bộ Y tế và danh pháp WHO.
// Tên tiếng Anh vẫn được giữ riêng trong từng thẻ để hỗ trợ tra cứu song ngữ.
const standardizedDiagnoses = {
  "thyroid-follicular-adenoma": "U tuyến thể nang tuyến giáp",
  "thyroid-niftp": "Tân sinh tuyến giáp dạng nang không xâm nhập với đặc điểm nhân dạng nhú (NIFTP)",
  "thyroid-ptc": "Ung thư biểu mô tuyến giáp thể nhú",
  "thyroid-ftc": "Ung thư biểu mô tuyến giáp thể nang",
  "thyroid-medullary": "Ung thư biểu mô tuyến giáp thể tủy",
  "thyroid-anaplastic": "Ung thư biểu mô tuyến giáp không biệt hóa",
  "lung-adeno": "Ung thư biểu mô tuyến phổi",
  "lung-squamous": "Ung thư biểu mô tế bào vảy của phổi",
  "lung-small-cell": "Ung thư biểu mô tế bào nhỏ của phổi",
  "lung-mucinous": "Ung thư biểu mô tuyến dạng nhầy xâm nhập của phổi",
  "colon-adenoma": "U tuyến đại trực tràng thông thường",
  "colon-adeno": "Ung thư biểu mô tuyến đại trực tràng",
  "breast-dcis": "Ung thư biểu mô ống tại chỗ (DCIS) của vú",
  "breast-idc": "Ung thư biểu mô vú xâm nhập, không thuộc típ đặc biệt (NST)",
  "breast-ilc": "Ung thư biểu mô tiểu thùy xâm nhập",
  "breast-mucinous": "Ung thư biểu mô vú dạng nhầy",
  "hpb-hcc": "Ung thư biểu mô tế bào gan",
  "hpb-ipmn": "Tân sinh nhầy nhú trong ống tụy (IPMN)",
  "hpb-shock-liver": "Hoại tử vùng trung tâm tiểu thùy gan",
  "hpb-fnh": "Tăng sản nốt khu trú của gan (FNH)",
  "cervix-hsil": "Tổn thương nội biểu mô vảy độ cao cổ tử cung (HSIL/CIN 3)",
  "cervix-scc": "Ung thư biểu mô tế bào vảy cổ tử cung liên quan HPV",
  "endometrium-endometrioid": "Ung thư biểu mô dạng nội mạc tử cung",
  "ovary-krukenberg": "U Krukenberg (ung thư biểu mô tế bào nhẫn di căn buồng trứng)",
  "prostate-adeno": "Ung thư biểu mô tuyến tiền liệt",
  "kidney-clear-cell": "Ung thư biểu mô tế bào thận, loại tế bào sáng",
  "kidney-papillary1": "Ung thư biểu mô tế bào thận dạng nhú",
  "skin-bcc": "Ung thư biểu mô tế bào đáy",
  "skin-scc": "Ung thư biểu mô tế bào vảy da",
  "skin-melanoma": "U hắc tố ác tính da",
  "heme-follicular": "U lympho thể nang",
  "heme-hodgkin": "U lympho Hodgkin kinh điển",
  "cns-meningioma": "U màng não",
  "headneck-oral-scc": "Ung thư biểu mô tế bào vảy khoang miệng",
  "headneck-pleomorphic": "U tuyến đa hình tuyến nước bọt",
  "soft-neurofibroma": "U xơ thần kinh",
  "lung-ais": "Ung thư biểu mô tuyến tại chỗ của phổi",
  "lung-acinar-pattern": "Ung thư biểu mô tuyến phổi, kiểu nang tuyến ưu thế",
  "lung-papillary-pattern": "Ung thư biểu mô tuyến phổi, kiểu nhú ưu thế",
  "lung-carcinoid": "U thần kinh nội tiết biệt hóa tốt (carcinoid) của phổi",
  "colon-tsa": "U tuyến răng cưa truyền thống",
  "colon-villous": "U tuyến nhung mao",
  "colon-mucinous-adeno": "Ung thư biểu mô tuyến dạng nhầy đại trực tràng",
  "breast-fibroadenoma": "U xơ tuyến vú",
  "breast-phyllodes": "U dạng lá (phyllodes) của vú",
  "breast-lcis": "Ung thư biểu mô tiểu thùy tại chỗ (LCIS)",
  "breast-metaplastic": "Ung thư biểu mô dị sản của vú",
  "hpb-cholangiocarcinoma": "Ung thư biểu mô đường mật trong gan",
  "hpb-pdac": "Ung thư biểu mô tuyến ống tụy",
  "gyn-ovarian-serous": "Ung thư biểu mô thanh dịch độ cao buồng trứng",
  "gyn-leiomyosarcoma": "Sarcoma cơ trơn tử cung",
  "gyn-endometrial-serous": "Ung thư biểu mô thanh dịch nội mạc tử cung",
  "gu-urothelial-low": "Ung thư biểu mô niệu mạc nhú độ thấp",
  "gu-urothelial-high": "Ung thư biểu mô niệu mạc độ cao",
  "kidney-chromophobe": "Ung thư biểu mô tế bào thận kỵ màu",
  "heme-dlbcl": "U lympho tế bào B lớn lan tỏa",
  "heme-cll-sll": "Bệnh bạch cầu lympho mạn / u lympho tế bào nhỏ (CLL/SLL)",
  "cns-glioblastoma": "U nguyên bào thần kinh đệm, IDH kiểu dại",
  "soft-gist": "U mô đệm đường tiêu hóa (GIST)",
  "thyroid-tall-cell-ptc": "Ung thư biểu mô tuyến giáp thể nhú, dưới típ tế bào cao",
  "lung-large-cell-ne": "Ung thư biểu mô thần kinh nội tiết tế bào lớn của phổi",
  "lung-metastatic-colon": "Ung thư biểu mô tuyến đại trực tràng di căn phổi",
  "colon-high-grade-dysplasia": "U tuyến đại trực tràng có loạn sản độ cao",
  "colon-signet-ring": "Ung thư biểu mô tế bào nhẫn đại trực tràng",
  "gyn-ein": "Tân sinh nội biểu mô nội mạc tử cung (EIN)",
  "gyn-cervix-adenocarcinoma": "Ung thư biểu mô tuyến cổ tử cung liên quan HPV",
  "gyn-ovary-mucinous": "U nhầy buồng trứng giáp biên hoặc ác tính",
  "gyn-mature-teratoma": "U quái trưởng thành dạng nang của buồng trứng",
  "gu-hgpin": "Tân sinh nội biểu mô tuyến tiền liệt độ cao (HGPIN)",
  "gu-seminoma": "U tinh bào",
  "skin-nevus": "Nơ vi tế bào hắc tố lành tính (nốt ruồi)",
  "skin-dermatofibroma": "U xơ bì",
  "heme-mantle-cell": "U lympho tế bào áo nang",
  "heme-marginal-zone": "U lympho vùng rìa",
  "cns-schwannoma": "U bao dây thần kinh (schwannoma)",
  "headneck-nasopharyngeal": "Ung thư biểu mô vòm mũi họng không sừng hóa",
  "soft-lipoma": "U mỡ",
};

const medicalTermRules = [
  [/Lepidic\/acinar\/papillary\/micropapillary\/solid patterns/gi, "các kiểu lepidic, nang tuyến, nhú, vi nhú và đặc"],
  [/Comedo necrosis/gi, "hoại tử comedo"],
  [/Sclerosing adenosis/gi, "bệnh tuyến xơ hóa"],
  [/radial scar/gi, "sẹo tia"],
  [/dysplastic nodule/gi, "nốt loạn sản"],
  [/Pseudoepitheliomatous hyperplasia/gi, "tăng sản giả biểu mô"],
  [/centrocytes\/centroblasts/gi, "tế bào tâm nang/nguyên bào tâm nang"],
  [/fibrous lesion/gi, "tổn thương xơ"],
  [/salt-and-pepper/gi, "muối tiêu"],
  [/typical carcinoid/gi, "carcinoid điển hình"],
  [/Low\/high grade/gi, "độ thấp/độ cao"],
  [/Variant histology/gi, "biến thể mô học"],
  [/Raisin-like nuclei/gi, "nhân dạng nho khô"],
  [/seborrheic keratosis/gi, "dày sừng tiết bã"],
  [/Horn cysts/gi, "nang sừng"],
  [/proliferation centers/gi, "trung tâm tăng sinh"],
  [/Richter transformation/gi, "chuyển dạng Richter"],
  [/microvascular proliferation/gi, "tăng sinh vi mạch"],
  [/oncocytic epithelium/gi, "biểu mô ái toan"],
  [/apoptotic bodies/gi, "thể chết theo chương trình"],
  [/muscularis mucosae/gi, "cơ niêm"],
  [/mantle zone/gi, "vùng áo"],
  [/Verocay bodies/gi, "thể Verocay"],
  [/atypical hyperplasia/gi, "tăng sản không điển hình"],
  [/clear cell papillary RCC/gi, "u thận dạng nhú tế bào sáng"],
  [/clear cell RCC/gi, "ung thư biểu mô tế bào thận típ tế bào sáng"],
  [/papillary RCC/gi, "ung thư biểu mô tế bào thận dạng nhú"],
  [/follicular\/mantle\/CLL/gi, "u lympho thể nang/u lympho tế bào vùng áo/CLL"],
  [/pleomorphic adenoma/gi, "u tuyến đa hình"],
  [/fibroadenoma cellular/gi, "u xơ tuyến giàu tế bào"],
  [/fibroadenoma/gi, "u xơ tuyến"],
  [/mature teratoma/gi, "u quái trưởng thành"],
  [/case subacute/gi, "ca viêm tuyến giáp bán cấp"],
  [/follicular carcinoma/gi, "ung thư biểu mô dạng nang"],
  [/follicular adenoma/gi, "u tuyến dạng nang"],
  [/follicular variant/gi, "biến thể dạng nang"],
  [/follicular lymphoma/gi, "u lympho thể nang"],
  [/mantle cell lymphoma/gi, "u lympho tế bào vùng áo"],
  [/sessile serrated lesion/gi, "tổn thương răng cưa không cuống"],
  [/oncocytic metaplasia/gi, "chuyển sản tế bào ái toan"],
  [/Hürthle cell/gi, "tế bào Hürthle"],
  [/Hurthle cell/gi, "tế bào Hürthle"],
  [/WHO\/ISUP grade/gi, "độ mô học WHO/ISUP"],
  [/WHO grade/gi, "độ mô học WHO"],
  [/Nottingham grade/gi, "độ mô học Nottingham"],
  [/FIGO grade/gi, "độ mô học FIGO"],
  [/Grade nhân/gi, "độ nhân"],
  [/Grade Group/gi, "nhóm độ mô học"],
  [/high-grade dysplasia/gi, "loạn sản độ cao"],
  [/low-grade dysplasia/gi, "loạn sản độ thấp"],
  [/high grade/gi, "độ cao"],
  [/high-grade/gi, "độ cao"],
  [/low-grade/gi, "độ thấp"],
  [/Breslow thickness/gi, "độ dày Breslow"],
  [/mitotic rate/gi, "chỉ số phân bào"],
  [/mitotic count/gi, "số lượng phân bào"],
  [/nuclear molding/gi, "khuôn nhân"],
  [/psammoma bodies/gi, "thể cát"],
  [/crush artifact/gi, "giả ảnh đè ép"],
  [/core biopsy/gi, "sinh thiết lõi kim"],
  [/dirty necrosis/gi, "hoại tử bẩn"],
  [/reactive lymphoid hyperplasia/gi, "quá sản lympho phản ứng"],
  [/intercellular bridges/gi, "cầu nối gian bào"],
  [/keratin pearls/gi, "cầu sừng"],
  [/p16 block-positive/gi, "p16 dương tính kiểu khối"],
  [/p16 block/gi, "p16 kiểu khối"],
  [/myoepithelial markers/gi, "các dấu ấn cơ biểu mô"],
  [/neuroendocrine markers/gi, "các dấu ấn thần kinh nội tiết"],
  [/basal markers/gi, "các dấu ấn tế bào đáy"],
  [/basal layer/gi, "lớp tế bào đáy"],
  [/single-file/gi, "xếp hàng một"],
  [/back-to-back/gi, "áp sát nhau"],
  [/dark\/light zone/gi, "vùng tối/vùng sáng"],
  [/dạng map-like/gi, "dạng bản đồ"],
  [/map-like/gi, "dạng bản đồ"],
  [/tangential section/gi, "lát cắt tiếp tuyến"],
  [/atypical lipomatous tumor/gi, "u mỡ không điển hình"],
  [/adenocarcinoma/gi, "ung thư biểu mô tuyến"],
  [/adeno phổi/gi, "ung thư biểu mô tuyến phổi"],
  [/lung adeno/gi, "ung thư biểu mô tuyến phổi"],
  [/small cell/gi, "tế bào nhỏ"],
  [/squamous cell/gi, "tế bào vảy"],
  [/squamous/gi, "tế bào vảy"],
  [/carcinoma tế bào gai/gi, "ung thư biểu mô tế bào vảy"],
  [/carcinoma gai/gi, "ung thư biểu mô tế bào vảy"],
  [/carcinoma/gi, "ung thư biểu mô"],
  [/lymphoma/gi, "u lympho"],
  [/melanoma/gi, "u hắc tố ác tính"],
  [/neuroendocrine/gi, "thần kinh nội tiết"],
  [/myoepithelial/gi, "cơ biểu mô"],
  [/desmoplasia/gi, "phản ứng mô đệm xơ"],
  [/palisading/gi, "xếp hàng rào"],
  [/retraction cleft/gi, "khe co rút"],
  [/keratinization/gi, "sừng hóa"],
  [/ulceration/gi, "loét"],
  [/regression/gi, "thoái triển"],
  [/satellitosis/gi, "vệ tinh"],
  [/overcall/gi, "kết luận quá mức"],
  [/under-sample/gi, "lấy mẫu chưa đủ"],
  [/blue tumor/gi, "u tế bào xanh"],
  [/borderline/gi, "giáp biên"],
  [/bilateral/gi, "hai bên"],
  [/excision/gi, "phẫu thuật cắt bỏ"],
  [/capsule/gi, "vỏ bao"],
  [/clonality/gi, "tính đơn dòng"],
  [/organoid/gi, "dạng cơ quan"],
  [/rosette/gi, "hoa hồng"],
  [/dạng storiform/gi, "dạng bánh xe"],
  [/storiform/gi, "dạng bánh xe"],
  [/collagen trapping/gi, "bẫy sợi collagen"],
  [/lipoblast/gi, "nguyên bào mỡ"],
  [/granuloma/gi, "u hạt"],
  [/goblet/gi, "hình đài"],
  [/crypt/gi, "hốc tuyến"],
  [/mucinous/gi, "dạng nhầy"],
  [/mucin/gi, "chất nhầy"],
  [/không atypia/gi, "không có tế bào không điển hình"],
  [/atypia/gi, "không điển hình"],
  [/mitosis/gi, "phân bào"],
  [/necrosis/gi, "hoại tử"],
  [/spindle cells/gi, "tế bào hình thoi"],
  [/myxochondroid/gi, "sụn-nhầy"],
  [/myxoid/gi, "dạng nhầy"],
  [/patterns/gi, "kiểu cấu trúc"],
  [/Subtype/gi, "típ mô học"],
  [/Pattern/gi, "kiểu cấu trúc"],
  [/Grade/gi, "độ mô học"],
  [/Margin/gi, "diện cắt"],
  [/biomarker/gi, "dấu ấn sinh học"],
  [/markers/gi, "dấu ấn"],
  [/marker/gi, "dấu ấn"],
  [/molding/gi, "khuôn nhân"],
  [/dysplasia/gi, "loạn sản"],
  [/micropapillary/gi, "vi nhú"],
  [/papillary/gi, "nhú"],
  [/acinar/gi, "nang tuyến"],
  [/lepidic/gi, "mọc dọc vách phế nang (lepidic)"],
  [/\bsolid\b/gi, "đặc"],
  [/\badenoma\b/gi, "u tuyến"],
  [/clear cell/gi, "tế bào sáng"],
  [/\bspindle\b/gi, "tế bào hình thoi"],
  [/schwannoma/gi, "u tế bào Schwann"],
  [/neurofibroma/gi, "u xơ thần kinh"],
  [/perineurioma/gi, "u tế bào quanh thần kinh"],
  [/meningioma/gi, "u màng não"],
  [/seminoma/gi, "u tinh bào"],
  [/teratoma/gi, "u quái"],
  [/\bnevus\b/gi, "nốt ruồi tế bào hắc tố"],
  [/\blipoma\b/gi, "u mỡ"],
  [/blastoid/gi, "dạng nguyên bào"],
  [/lymphoepithelial/gi, "lympho-biểu mô"],
  [/report/gi, "báo cáo"],
  [/panel/gi, "bảng dấu ấn"],
  [/brain invasion/gi, "xâm nhập não"],
  [/mass-forming/gi, "dạng tạo khối"],
  [/periductal/gi, "quanh ống"],
  [/coagulative/gi, "đông"],
  [/tubo-ovarian/gi, "vòi tử cung - buồng trứng"],
  [/peritoneal/gi, "phúc mạc"],
  [/staging/gi, "phân giai đoạn"],
  [/lamina propria/gi, "mô đệm dưới biểu mô"],
  [/rete testis/gi, "lưới tinh"],
  [/parakeratosis/gi, "á sừng"],
  [/elastosis/gi, "thoái hóa sợi đàn hồi"],
  [/syncytial/gi, "hợp bào"],
  [/monocytoid/gi, "dạng tế bào mono"],
  [/ancient/gi, "thoái hóa lâu ngày"],
  [/epithelioid/gi, "dạng biểu mô"],
  [/whorled/gi, "dạng xoáy"],
  [/aberrant/gi, "bất thường"],
  [/nucleoli/gi, "hạch nhân"],
  [/maturation/gi, "sự trưởng thành"],
  [/amelanotic/gi, "không sắc tố"],
  [/Tế bào melanocytic/gi, "Tế bào hắc tố"],
  [/melanocytic/gi, "tế bào hắc tố"],
  [/pagetoid/gi, "kiểu Paget"],
  [/atrophy/gi, "teo"],
  [/adenosis/gi, "bệnh tuyến"],
  [/cellularity/gi, "mật độ tế bào"],
  [/overgrowth/gi, "tăng sinh quá mức"],
  [/lobular/gi, "tiểu thùy"],
  [/pleomorphic/gi, "đa hình"],
  [/classic/gi, "kinh điển"],
  [/\btypical\b/gi, "điển hình"],
  [/serous/gi, "thanh dịch"],
  [/endometrioid/gi, "dạng nội mạc tử cung"],
  [/metaplastic/gi, "dị sản"],
  [/urothelial/gi, "niệu mạc"],
  [/halo/gi, "quầng sáng"],
  [/chromophobe/gi, "kỵ màu"],
  [/oncocytoma/gi, "u tế bào ưa acid (oncocytoma)"],
  [/eosinophilic/gi, "ưa eosin"],
  [/keratinocyte/gi, "tế bào sừng"],
  [/irritated/gi, "kích thích"],
  [/pigmented/gi, "tăng sắc tố"],
  [/lymphoid/gi, "dòng lympho"],
  [/\bsheet\b/gi, "mảng"],
  [/promoter/gi, "vùng khởi động"],
  [/oncocytic/gi, "ái toan"],
  [/stroma/gi, "mô đệm"],
  [/rupture/gi, "vỡ u"],
  [/scalloping/gi, "khía lõm"],
  [/colorectal/gi, "đại trực tràng"],
  [/enteric/gi, "kiểu ruột"],
  [/\bcore\b/gi, "mảnh sinh thiết kim lõi"],
  [/cribriform/gi, "dạng sàng"],
  [/\blayer\b/gi, "lớp"],
  [/\bwhorls?\b/gi, "cấu trúc xoáy"],
  [/\bpsammoma\b/gi, "thể cát"],
  [/\bplexiform\b/gi, "dạng đám rối"],
  [/\bchondroid\b/gi, "dạng sụn"],
  [/\bectopic\b/gi, "lạc chỗ"],
  [/\bconventional\b/gi, "thông thường"],
  [/\bacellular\b/gi, "không tế bào"],
  [/\batypical\b/gi, "không điển hình"],
  [/basaloid/gi, "dạng đáy"],
  [/\bbasal\b/gi, "tế bào đáy"],
  [/tế bào gai/gi, "tế bào vảy"],
  [/\bGai\b/g, "Tế bào vảy"],
  [/Hurthle/gi, "Hürthle"],
  [/Chromogranin(?! A)/gi, "Chromogranin A"],
  [/thể vùi trong nhân/gi, "giả thể vùi trong nhân"],
  [/thành phần non/gi, "thành phần chưa trưởng thành"],
  [/không phải nhìn không điển hình trước/gi, "không dựa vào mức độ không điển hình"],
  [/\bhiền\b/gi, "lành tính"],
];

function standardizeMedicalText(value) {
  const input = String(value || "");
  const result = medicalTermRules.reduce((text, [pattern, replacement]) => text.replace(pattern, replacement), input);
  return /^[A-ZÀ-ỸĐ]/.test(input) ? result.charAt(0).toUpperCase() + result.slice(1) : result;
}

function standardizeBuiltinCase(item) {
  if (standardizedDiagnoses[item.id]) item.diagnosis = standardizedDiagnoses[item.id];
  item.micro = item.micro.map(standardizeMedicalText);
  item.report = item.report.map(standardizeMedicalText);
  item.memory = standardizeMedicalText(item.memory);
  item.pitfall = standardizeMedicalText(item.pitfall);
  item.markers = item.markers.map(standardizeMedicalText);
  return item;
}

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
    diagnosis: "Ung thư biểu mô tế bào thận dạng nhú",
    english: "Papillary renal cell carcinoma",
    file: "Histopathology of papillary renal cell carcinoma type 1.jpg",
    pattern: ["carcinoma"],
    source: "Wikimedia Commons",
    micro: ["Cấu trúc nhú hoặc ống-nhú", "Đại thực bào bọt trong trục nhú có thể gặp", "Hình thái tế bào và bào tương có thể thay đổi"],
    report: ["Độ mô học WHO/ISUP", "Hoại tử", "Xâm lấn mạch hoặc mô quanh thận", "Giai đoạn pTNM"],
    memory: "Cấu trúc nhú kèm mô bào bọt gợi ý ung thư biểu mô tế bào thận dạng nhú.",
    pitfall: "WHO 2022 không còn chia thường quy thành típ 1 và típ 2; cần phân biệt với các u thận dạng nhú khác và u di căn.",
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

const expandedCases = [
  {
    id: "lung-ais",
    chapter: "lung",
    diagnosis: "Adenocarcinoma in situ phổi",
    english: "Adenocarcinoma in situ",
    file: "Lung adenocarcinoma with lepidic growth - low magnification.jpg",
    pattern: ["precursor", "carcinoma", "glandular"],
    source: "Wikimedia Commons",
    micro: ["Tăng trưởng lepidic thuần túy", "Không thấy xâm nhập mô đệm, mạch hoặc màng phổi", "Kích thước u nhỏ, thường không nhầy"],
    report: ["Không gọi AIS trên sinh thiết nhỏ nếu chưa đánh giá toàn u", "Ghi chú cần bệnh phẩm cắt để xác định xâm nhập"],
    memory: "AIS = lepidic thuần, chưa xâm nhập.",
    pitfall: "Sinh thiết nhỏ không đủ để loại xâm nhập ở vùng khác của u.",
    markers: ["TTF-1", "Napsin A"],
  },
  {
    id: "lung-acinar-pattern",
    chapter: "lung",
    diagnosis: "Adenocarcinoma phổi pattern acinar",
    english: "Acinar predominant lung adenocarcinoma",
    file: "Lung adenocarcinoma with lepidic growth - low magnification 2.jpg",
    pattern: ["carcinoma", "glandular"],
    source: "Wikimedia Commons",
    micro: ["Tuyến tròn/bầu dục xâm nhập", "Lòng tuyến có thể chứa mucin", "Mô đệm quanh tuyến phản ứng"],
    report: ["Ước lượng pattern ưu thế", "Ghi nhận pattern grade cao nếu có"],
    memory: "Acinar = tuyến thật sự trong mô đệm.",
    pitfall: "Dễ nhầm lepidic nếu chỉ nhìn vùng sát phế nang còn bảo tồn.",
    markers: ["TTF-1", "Napsin A", "CK7"],
  },
  {
    id: "lung-papillary-pattern",
    chapter: "lung",
    diagnosis: "Adenocarcinoma phổi pattern papillary",
    english: "Papillary lung adenocarcinoma",
    file: "Lung cancer histology collection.png",
    pattern: ["carcinoma", "glandular"],
    source: "Wikimedia Commons",
    micro: ["Nhú có trục xơ mạch", "Tế bào u phủ quanh trục", "Có thể phối hợp acinar/lepidic"],
    report: ["Tỷ lệ pattern", "Tìm micropapillary/solid nếu có"],
    memory: "Papillary phải có trục xơ mạch.",
    pitfall: "Micropapillary không có trục xơ mạch và ý nghĩa tiên lượng khác.",
    markers: ["TTF-1", "Napsin A"],
  },
  {
    id: "lung-carcinoid",
    chapter: "lung",
    diagnosis: "U carcinoid phổi",
    english: "Pulmonary carcinoid tumour",
    file: "Lung cancer histology collection.png",
    pattern: ["neuroendocrine", "ihc"],
    source: "Wikimedia Commons",
    micro: ["Ổ/bè tế bào tương đối đều", "Nhiễm sắc chất kiểu salt-and-pepper", "Ít hoại tử và ít phân bào trong typical carcinoid"],
    report: ["Typical hay atypical", "Số phân bào", "Hoại tử", "Margin/hạch nếu phẫu thuật"],
    memory: "Carcinoid phổi = neuroendocrine biệt hóa tốt.",
    pitfall: "Không nhầm với small cell nếu tế bào đều và phân bào thấp.",
    markers: ["Synaptophysin", "Chromogranin", "INSM1", "Ki-67"],
  },
  {
    id: "colon-tsa",
    chapter: "colon",
    diagnosis: "Adenoma răng cưa truyền thống",
    english: "Traditional serrated adenoma",
    file: "Mixed histology polyp.png",
    pattern: ["precursor", "glandular"],
    source: "Wikimedia Commons",
    micro: ["Kiến trúc nhung mao/răng cưa", "Tế bào học loạn sản", "Crypt ectopic có thể gặp"],
    report: ["Kích thước", "Mức độ loạn sản", "Cắt trọn hay không"],
    memory: "TSA = răng cưa nhưng có loạn sản thật sự.",
    pitfall: "Dễ lẫn SSL có dysplasia hoặc conventional adenoma.",
    markers: ["BRAF/KRAS tùy bối cảnh"],
  },
  {
    id: "colon-villous",
    chapter: "colon",
    diagnosis: "Adenoma nhung mao",
    english: "Villous adenoma",
    file: "Adenocarcinoma (left) and Villous Adenoma (right) in Colon Segment (4769483202).jpg",
    pattern: ["precursor", "glandular"],
    source: "Wikimedia Commons",
    micro: ["Nhú dài dạng ngón", "Lõi mô đệm mạch máu", "Biểu mô loạn sản phủ bề mặt"],
    report: ["Tỷ lệ thành phần nhung mao", "Low/high-grade dysplasia", "Margin nếu cắt polyp"],
    memory: "Nhung mao nhiều hơn = cần chú ý nguy cơ cao hơn.",
    pitfall: "Sinh thiết mảnh vụn có thể khó ước lượng tỷ lệ nhung mao.",
    markers: ["Không cần IHC thường quy"],
  },
  {
    id: "colon-inflammatory-polyp",
    chapter: "colon",
    diagnosis: "Polyp viêm / giả polyp",
    english: "Inflammatory polyp / pseudopolyp",
    file: "Histopathology of granuloma of colonic mucosa.jpg",
    pattern: ["inflammation", "benign"],
    source: "Wikimedia Commons",
    micro: ["Niêm mạc tái tạo", "Mô hạt và viêm", "Không phải u biểu mô thật sự"],
    report: ["Gắn với bối cảnh IBD/viêm", "Loại trừ dysplasia nếu nghi ngờ"],
    memory: "Giả polyp là hậu quả viêm và tái tạo.",
    pitfall: "Tái tạo mạnh có thể giả loạn sản.",
    markers: ["Không cần IHC thường quy"],
  },
  {
    id: "colon-mucinous-adeno",
    chapter: "colon",
    diagnosis: "Adenocarcinoma đại tràng dạng nhầy",
    english: "Mucinous colorectal adenocarcinoma",
    file: "Adenocarcinoma of the colon-histology.JPG",
    pattern: ["carcinoma", "glandular"],
    source: "Wikimedia Commons",
    micro: ["Hồ mucin ngoại bào", "Đảo tế bào u trong mucin", "Có thể có tế bào nhẫn"],
    report: ["Tỷ lệ thành phần nhầy", "MMR/MSI", "Grade và giai đoạn"],
    memory: "Mucinous CRC = u trôi trong hồ mucin.",
    pitfall: "Mucin sau thủ thuật hoặc mucin acellular cần đọc khác mucin có tế bào u.",
    markers: ["MMR", "SATB2", "CDX2"],
  },
  {
    id: "breast-fibroadenoma",
    chapter: "breast",
    diagnosis: "Fibroadenoma vú",
    english: "Fibroadenoma",
    file: "Histopathology of invasive ductal carcinoma of the breast.jpg",
    pattern: ["benign"],
    source: "Wikimedia Commons",
    micro: ["Tổn thương hai thành phần tuyến và mô đệm", "Kiểu quanh ống hoặc trong ống", "Mô đệm lành tính, ít atypia"],
    report: ["Ghi kích thước nếu phẫu thuật", "Loại trừ phyllodes nếu mô đệm tăng sinh mạnh"],
    memory: "Fibroadenoma = tuyến và mô đệm lành, giới hạn rõ.",
    pitfall: "Ảnh đại diện chưa đặc hiệu; nên thay bằng ảnh fibroadenoma thật khi có.",
    markers: ["Không cần IHC thường quy"],
  },
  {
    id: "breast-phyllodes",
    chapter: "breast",
    diagnosis: "U dạng lá vú",
    english: "Phyllodes tumour",
    file: "Infiltrating ductal carcinoma 10X.jpg",
    pattern: ["spindle"],
    source: "Wikimedia Commons",
    micro: ["Kiến trúc dạng lá", "Mô đệm tăng sinh", "Đánh giá cellularity, atypia, mitosis, margin"],
    report: ["Lành/giáp biên/ác", "Margin", "Overgrowth mô đệm", "Hoại tử nếu có"],
    memory: "Phyllodes là bệnh của mô đệm dạng lá.",
    pitfall: "Core biopsy có thể khó phân biệt fibroadenoma cellular.",
    markers: ["Không đặc hiệu"],
  },
  {
    id: "breast-lcis",
    chapter: "breast",
    diagnosis: "Tân sinh tiểu thùy tại chỗ",
    english: "Lobular carcinoma in situ / lobular neoplasia",
    file: "Breast DCIS histopathology (1).jpg",
    pattern: ["precursor"],
    source: "Wikimedia Commons",
    micro: ["Tiểu thùy giãn bởi tế bào đơn dạng", "Tế bào rời rạc, mất kết dính", "Không xâm nhập mô đệm"],
    report: ["Classic hay pleomorphic", "Margin tùy bối cảnh", "Tương quan hình ảnh"],
    memory: "Lobular = mất kết dính, E-cadherin âm.",
    pitfall: "Pleomorphic LCIS có thể giống DCIS high grade.",
    markers: ["E-cadherin mất", "p120 bào tương", "ER"],
  },
  {
    id: "breast-metaplastic",
    chapter: "breast",
    diagnosis: "Carcinoma vú chuyển sản",
    english: "Metaplastic breast carcinoma",
    file: "Infiltrating ductal carcinoma 10X.jpg",
    pattern: ["carcinoma", "spindle", "squamous"],
    source: "Wikimedia Commons",
    micro: ["Thành phần biểu mô ác tính", "Chuyển sản gai/thoi/xương sụn có thể gặp", "Thường grade cao"],
    report: ["Subtype", "Tỷ lệ thành phần", "ER/PR/HER2", "Margin/hạch"],
    memory: "Metaplastic = carcinoma nhưng đổi hình thái sang thành phần khác.",
    pitfall: "Có thể giống sarcoma nếu marker biểu mô yếu.",
    markers: ["Pan-CK", "p63", "ER/PR/HER2"],
  },
  {
    id: "hpb-cholangiocarcinoma",
    chapter: "hpb",
    diagnosis: "Cholangiocarcinoma trong gan",
    english: "Intrahepatic cholangiocarcinoma",
    file: "Histopathology of adenosquamous carcinoma of the pancreas.jpg",
    pattern: ["carcinoma", "glandular"],
    source: "Wikimedia Commons",
    micro: ["Tuyến ác tính trong mô gan", "Mô đệm xơ/desmoplasia", "Mucin có thể gặp"],
    report: ["Mass-forming/periductal nếu có", "Xâm lấn mạch", "Margin", "Nền gan"],
    memory: "CCA = tuyến ác tính + mô đệm xơ trong gan.",
    pitfall: "Cần phân biệt di căn adenocarcinoma đến gan.",
    markers: ["CK7", "CK19", "Albumin ISH", "IDH1/FGFR2 tùy bối cảnh"],
  },
  {
    id: "hpb-pdac",
    chapter: "hpb",
    diagnosis: "Adenocarcinoma ống tụy",
    english: "Pancreatic ductal adenocarcinoma",
    file: "Histopathology of adenosquamous carcinoma of the pancreas.jpg",
    pattern: ["carcinoma", "glandular"],
    source: "Wikimedia Commons",
    micro: ["Tuyến ác tính xâm nhập", "Desmoplasia mạnh", "PNI rất hay gặp"],
    report: ["Grade", "Margin tụy/mật/retroperitoneal", "PNI/LVI", "Hạch"],
    memory: "PDAC thích đi quanh thần kinh.",
    pitfall: "Viêm tụy mạn có thể giả tuyến bất thường; cần nhìn xâm nhập và atypia.",
    markers: ["SMAD4", "CK7", "CA19-9"],
  },
  {
    id: "hpb-cirrhosis",
    chapter: "hpb",
    diagnosis: "Xơ gan",
    english: "Cirrhosis",
    file: "Hepatocellular carcinoma histopathology (1).jpg",
    pattern: ["inflammation"],
    source: "Wikimedia Commons",
    micro: ["Nốt tái tạo", "Vách xơ bắc cầu", "Viêm hoạt động tùy nguyên nhân"],
    report: ["Mức độ hoạt động", "Nguyên nhân gợi ý", "Nốt nghi dysplasia/HCC nếu có"],
    memory: "Xơ gan = nốt tái tạo bị vách xơ chia cắt.",
    pitfall: "Ảnh đại diện gan u; nên thay ảnh xơ gan thật nếu có.",
    markers: ["Trichrome", "Reticulin"],
  },
  {
    id: "gyn-ovarian-serous",
    chapter: "gyn",
    diagnosis: "Carcinoma thanh dịch độ cao buồng trứng",
    english: "High-grade serous carcinoma",
    file: "Gross pathology and histopathology of signet ring cell carcinoma metastasis to the ovary.jpg",
    pattern: ["carcinoma", "glandular", "ihc"],
    source: "Wikimedia Commons",
    micro: ["Nhú/khe tuyến phức tạp", "Atypia nhân độ cao", "Hoại tử và phân bào nhiều"],
    report: ["Nguồn tubo-ovarian/peritoneal", "p53 pattern", "BRCA/HRD khi phù hợp"],
    memory: "High-grade serous = p53 bất thường và nhân rất xấu.",
    pitfall: "Ảnh đại diện chưa đặc hiệu; cần thay ảnh HGSC thật khi có.",
    markers: ["p53 aberrant", "WT1", "PAX8", "p16"],
  },
  {
    id: "gyn-leiomyoma",
    chapter: "gyn",
    diagnosis: "U cơ trơn tử cung",
    english: "Leiomyoma",
    file: "Histopathology of endometrial adenocarcinoma, endometrioid type.jpg",
    pattern: ["benign", "spindle"],
    source: "Wikimedia Commons",
    micro: ["Bó tế bào cơ trơn đan xen", "Nhân hình thoi đều", "Không hoại tử u, phân bào thấp"],
    report: ["Biến thể nếu có", "Hoại tử/atypia/mitosis nếu nghi ngờ"],
    memory: "Leiomyoma = bó cơ trơn đều, lành.",
    pitfall: "Ảnh đại diện nội mạc; nên thay bằng ảnh leiomyoma thật khi có.",
    markers: ["SMA", "Desmin", "h-caldesmon"],
  },
  {
    id: "gyn-leiomyosarcoma",
    chapter: "gyn",
    diagnosis: "Leiomyosarcoma tử cung",
    english: "Uterine leiomyosarcoma",
    file: "Histopathology of endometrial adenocarcinoma, endometrioid type.jpg",
    pattern: ["spindle", "carcinoma"],
    source: "Wikimedia Commons",
    micro: ["Atypia tế bào cơ trơn", "Hoại tử u dạng coagulative", "Phân bào tăng"],
    report: ["Kích thước", "Hoại tử", "Mitosis", "Margin"],
    memory: "Cơ trơn ác tính cần bộ ba: atypia, mitosis, hoại tử u.",
    pitfall: "Không dựa một tiêu chí đơn độc nếu mẫu hạn chế.",
    markers: ["SMA", "Desmin", "h-caldesmon"],
  },
  {
    id: "gyn-endometrial-serous",
    chapter: "gyn",
    diagnosis: "Carcinoma nội mạc tử cung thanh dịch",
    english: "Serous endometrial carcinoma",
    file: "Histopathology of endometrial adenocarcinoma, endometrioid type.jpg",
    pattern: ["carcinoma", "glandular", "ihc"],
    source: "Wikimedia Commons",
    micro: ["Kiến trúc nhú/tuyến phức tạp", "Nhân độ cao", "Có thể xâm nhập nông nhưng nguy cơ cao"],
    report: ["p53 pattern", "Xâm nhập cơ", "LVSI", "Hạch/mạc nối nếu staging"],
    memory: "Serous nội mạc = high-grade, p53 bất thường, hành vi ác.",
    pitfall: "Có thể nhầm endometrioid grade 3 nếu không dùng p53/MMR đúng.",
    markers: ["p53 aberrant", "p16", "ER biến thiên"],
  },
  {
    id: "gu-urothelial-low",
    chapter: "gu",
    diagnosis: "Carcinoma niệu mạc nhú độ thấp",
    english: "Low-grade papillary urothelial carcinoma",
    file: "Histopathology of papillary renal cell carcinoma type 1.jpg",
    pattern: ["carcinoma"],
    source: "Wikimedia Commons",
    micro: ["Nhú có trục xơ mạch", "Lớp tế bào niệu mạc dày nhưng tương đối đều", "Ít mất phân cực"],
    report: ["Low/high grade", "Có xâm nhập lamina propria/cơ không", "Cơ hiện diện hay không"],
    memory: "Bàng quang: grade và xâm nhập cơ quyết định lớn.",
    pitfall: "Ảnh đại diện nhú thận; nên thay ảnh niệu mạc thật khi có.",
    markers: ["GATA3", "p63", "CK20"],
  },
  {
    id: "gu-urothelial-high",
    chapter: "gu",
    diagnosis: "Carcinoma niệu mạc độ cao",
    english: "High-grade urothelial carcinoma",
    file: "Histopathology of papillary renal cell carcinoma type 2.jpg",
    pattern: ["carcinoma", "ihc"],
    source: "Wikimedia Commons",
    micro: ["Mất phân cực rõ", "Nhân dị dạng, tăng sắc", "Tìm xâm nhập lamina propria/cơ"],
    report: ["Xâm nhập cơ detrusor", "LVI", "Variant histology", "CIS kèm theo"],
    memory: "High-grade urothelial: việc đầu tiên là tìm cơ và xâm nhập cơ.",
    pitfall: "Mẫu TUR vụn dễ khó xác định lớp cơ thật.",
    markers: ["GATA3", "p63", "CK7/CK20"],
  },
  {
    id: "kidney-chromophobe",
    chapter: "gu",
    diagnosis: "Chromophobe renal cell carcinoma",
    english: "Chromophobe RCC",
    file: "Histopathology of papillary renal cell carcinoma type 2.jpg",
    pattern: ["carcinoma"],
    source: "Wikimedia Commons",
    micro: ["Tế bào lớn màng rõ", "Halo quanh nhân", "Raisin-like nuclei có thể gặp"],
    report: ["Subtype", "Grade nếu áp dụng", "Hoại tử/xâm lấn"],
    memory: "Chromophobe = màng tế bào rõ và halo quanh nhân.",
    pitfall: "Dễ nhầm oncocytoma nếu eosinophilic.",
    markers: ["CK7 lan tỏa", "KIT/CD117", "PAX8"],
  },
  {
    id: "skin-actinic-keratosis",
    chapter: "skin",
    diagnosis: "Dày sừng ánh sáng",
    english: "Actinic keratosis",
    file: "Squamous cell carcinoma histopathology (2).jpg",
    pattern: ["precursor", "squamous"],
    source: "Wikimedia Commons",
    micro: ["Atypia keratinocyte vùng đáy", "Elastosis ánh sáng", "Parakeratosis"],
    report: ["Mức độ atypia", "Có xâm nhập không", "Margin nếu cắt"],
    memory: "AK là tổn thương tiền SCC trên nền da tổn thương nắng.",
    pitfall: "SCC in situ và SCC xâm nhập cần tìm độ dày và xâm nhập bì.",
    markers: ["p53", "Ki-67"],
  },
  {
    id: "skin-sebk",
    chapter: "skin",
    diagnosis: "Dày sừng tiết bã",
    english: "Seborrheic keratosis",
    file: "Basal-cell carcinoma - histopathology (1).jpg",
    pattern: ["benign"],
    source: "Wikimedia Commons",
    micro: ["Tăng sản tế bào basaloid lành", "Horn cysts", "Giới hạn rõ"],
    report: ["Loại trừ melanoma/SCC nếu lâm sàng nghi", "Mô tả viêm/irritated nếu có"],
    memory: "Horn cysts là manh mối kinh điển.",
    pitfall: "Pigmented seborrheic keratosis có thể giống melanoma lâm sàng.",
    markers: ["Không cần IHC thường quy"],
  },
  {
    id: "heme-dlbcl",
    chapter: "heme",
    diagnosis: "Lymphoma tế bào B lớn lan tỏa",
    english: "Diffuse large B-cell lymphoma",
    file: "Follicular lymphoma - intermed mag.jpg",
    pattern: ["lymphoid", "ihc"],
    source: "Wikimedia Commons",
    micro: ["Xóa kiến trúc hạch", "Tế bào lymphoid lớn lan tỏa", "Nucleoli rõ, phân bào nhiều"],
    report: ["Cell-of-origin nếu làm", "MYC/BCL2/BCL6", "EBER khi cần"],
    memory: "DLBCL = sheet tế bào B lớn.",
    pitfall: "Ảnh đại diện follicular lymphoma; nên thay ảnh DLBCL thật khi có.",
    markers: ["CD20", "PAX5", "CD10/BCL6/MUM1", "Ki-67"],
  },
  {
    id: "heme-cll-sll",
    chapter: "heme",
    diagnosis: "CLL/SLL",
    english: "Chronic lymphocytic leukemia / small lymphocytic lymphoma",
    file: "Follicular lymphoma - intermed mag.jpg",
    pattern: ["lymphoid", "ihc"],
    source: "Wikimedia Commons",
    micro: ["Lympho nhỏ đơn dạng", "Proliferation centers", "Kiến trúc hạch bị xóa"],
    report: ["CD5/CD23", "Cyclin D1 âm để loại mantle cell", "Richter transformation nếu nghi"],
    memory: "SLL = lympho nhỏ + proliferation centers.",
    pitfall: "Mantle cell lymphoma cũng CD5+ nhưng Cyclin D1/SOX11 khác.",
    markers: ["CD20 yếu", "CD5", "CD23", "LEF1"],
  },
  {
    id: "cns-glioblastoma",
    chapter: "cns",
    diagnosis: "Glioblastoma",
    english: "Glioblastoma, IDH-wildtype",
    file: "Meningioma showing Psammoma body.jpg",
    pattern: ["carcinoma"],
    source: "Wikimedia Commons",
    micro: ["U thần kinh đệm độ cao", "Hoại tử giả hàng rào", "Tăng sinh vi mạch"],
    report: ["IDH", "MGMT promoter", "Necrosis/microvascular proliferation"],
    memory: "GBM = hoại tử giả hàng rào + vi mạch tăng sinh.",
    pitfall: "Ảnh đại diện meningioma; cần thay bằng ảnh GBM thật khi có.",
    markers: ["GFAP", "OLIG2", "IDH1 R132H", "ATRX", "p53"],
  },
  {
    id: "headneck-warthin",
    chapter: "headneck",
    diagnosis: "U Warthin tuyến nước bọt",
    english: "Warthin tumour",
    file: "Pleomorphic adenoma.jpg",
    pattern: ["benign", "glandular", "lymphoid"],
    source: "Wikimedia Commons",
    micro: ["Biểu mô oncocytic hai hàng", "Nền lymphoid có trung tâm mầm", "Khoang nang/nhú"],
    report: ["Vị trí tuyến mang tai", "Biến đổi viêm/hoại tử nếu có"],
    memory: "Warthin = oncocytic epithelium + lymphoid stroma.",
    pitfall: "Ảnh đại diện pleomorphic adenoma; nên thay ảnh Warthin thật khi có.",
    markers: ["CK7", "Mitochondrial marker"],
  },
  {
    id: "soft-gist",
    chapter: "soft",
    diagnosis: "GIST",
    english: "Gastrointestinal stromal tumour",
    file: "Neurofibroma -1.jpg",
    pattern: ["spindle", "ihc"],
    source: "Wikimedia Commons",
    micro: ["Tế bào thoi hoặc epithelioid", "Bó/whorled pattern", "Đánh giá mitotic rate"],
    report: ["Vị trí", "Kích thước", "Mitotic count", "Hoại tử", "Rupture"],
    memory: "GIST report cần kích thước + vị trí + mitosis.",
    pitfall: "Ảnh đại diện neurofibroma; nên thay ảnh GIST thật khi có.",
    markers: ["DOG1", "CD117", "CD34"],
  },
  {
    id: "infection-tb",
    chapter: "inflammation",
    diagnosis: "Viêm hạt hoại tử bã đậu",
    english: "Necrotizing granulomatous inflammation",
    file: "Histopathology of granuloma of colonic mucosa.jpg",
    pattern: ["inflammation"],
    source: "Wikimedia Commons",
    micro: ["Granuloma dạng biểu mô", "Hoại tử bã đậu trung tâm", "Tế bào khổng lồ Langhans có thể gặp"],
    report: ["Nhuộm AFB", "PCR/cấy nếu lâm sàng nghi lao", "Tìm nấm nếu AFB âm"],
    memory: "Hoại tử bã đậu làm nghĩ lao, nhưng phải chứng minh tác nhân.",
    pitfall: "Nấm cũng có thể gây hoại tử hạt.",
    markers: ["AFB", "GMS", "PAS"],
  },
];

cases.push(...expandedCases);

const studioBoosterCases = [
  {
    id: "thyroid-graves",
    chapter: "thyroid",
    diagnosis: "Bệnh Graves",
    english: "Graves disease",
    file: "Normal thyroid cell No.2.jpg",
    pattern: ["benign", "inflammation"],
    source: "Wikimedia Commons",
    micro: ["Nang tuyến tăng sản, biểu mô cao hơn bình thường", "Chất keo nhạt, bờ keo có hình scalloping", "Mô đệm có thể giàu mạch và lympho"],
    report: ["Gợi ý tương quan lâm sàng/cường giáp", "Loại trừ u nếu có nhân khu trú"],
    memory: "Graves: tuyến hoạt động mạnh, biểu mô cao và keo bị 'gặm' ở bờ.",
    pitfall: "Ảnh đại diện cùng nhóm tuyến giáp; nên thay ảnh Graves thật nếu có slide phù hợp.",
    markers: ["TSH receptor Ab lâm sàng", "Thyroglobulin", "TTF-1"],
  },
  {
    id: "thyroid-tall-cell-ptc",
    chapter: "thyroid",
    diagnosis: "PTC biến thể tế bào cao",
    english: "Tall cell variant papillary thyroid carcinoma",
    file: "Thyroid papillary carcinoma histopathology (2).jpg",
    pattern: ["carcinoma", "glandular"],
    source: "Wikimedia Commons",
    micro: ["Tế bào u cao, ái toan, chiều cao ít nhất gấp nhiều lần chiều rộng", "Nhân kiểu PTC rõ: sáng, rãnh, giả thể vùi", "Thường có xâm nhập và hành vi ác hơn PTC kinh điển"],
    report: ["Ghi rõ biến thể tall cell", "Xâm nhập bao/mô quanh tuyến", "Di căn hạch, margin"],
    memory: "Tall cell = PTC nhưng tế bào cao, hồng và đáng chú ý hơn về tiên lượng.",
    pitfall: "Cần đủ tỷ lệ thành phần tall cell, không gọi chỉ vì có vài vùng ái toan.",
    markers: ["BRAF V600E", "TTF-1", "PAX8", "Thyroglobulin"],
  },
  {
    id: "lung-large-cell-ne",
    chapter: "lung",
    diagnosis: "Carcinoma thần kinh nội tiết tế bào lớn phổi",
    english: "Large cell neuroendocrine carcinoma",
    file: "Lung cancer histology collection.png",
    pattern: ["carcinoma", "neuroendocrine", "ihc"],
    source: "Wikimedia Commons",
    micro: ["Tế bào lớn, nhân rõ, bào tương nhiều hơn small cell", "Kiến trúc neuroendocrine: organoid, bè, rosette hoặc palisading", "Hoại tử và phân bào cao"],
    report: ["Xác nhận marker neuroendocrine", "Ki-67 cao", "Phân biệt với small cell và NSCLC kém biệt hóa"],
    memory: "LCNEC = neuroendocrine grade cao nhưng tế bào lớn.",
    pitfall: "Sinh thiết nhỏ có thể khó tách LCNEC với carcinoma kém biệt hóa; cần IHC và hình thái.",
    markers: ["INSM1", "Synaptophysin", "Chromogranin", "TTF-1"],
  },
  {
    id: "lung-metastatic-colon",
    chapter: "lung",
    diagnosis: "Adenocarcinoma đại trực tràng di căn phổi",
    english: "Metastatic colorectal adenocarcinoma to lung",
    file: "Adenocarcinoma of the colon-histology.JPG",
    pattern: ["carcinoma", "glandular", "ihc"],
    source: "Wikimedia Commons",
    micro: ["Tuyến dạng colorectal, có thể hoại tử bẩn", "Thường thiếu pattern lepidic của adenocarcinoma phổi nguyên phát", "Cần đối chiếu tiền sử u đại trực tràng"],
    report: ["Ghi nghi di căn nếu IHC và lâm sàng phù hợp", "So sánh với mẫu đại trực tràng cũ nếu có"],
    memory: "Phổi có tuyến nhưng TTF-1 âm, CDX2/SATB2 dương: nghĩ nguồn đại trực tràng.",
    pitfall: "Adenocarcinoma phổi dạng enteric có thể bắt chước carcinoma đại trực tràng.",
    markers: ["CDX2", "SATB2", "CK20", "TTF-1 âm"],
  },
  {
    id: "colon-high-grade-dysplasia",
    chapter: "colon",
    diagnosis: "Adenoma đại tràng loạn sản độ cao",
    english: "Colorectal adenoma with high-grade dysplasia",
    file: "Mixed histology polyp.png",
    pattern: ["precursor", "glandular"],
    source: "Wikimedia Commons",
    micro: ["Kiến trúc tuyến phức tạp, cribriform hoặc back-to-back", "Nhân tăng sắc, mất cực tính rõ", "Chưa có xâm nhập qua muscularis mucosae vào mô đệm dưới niêm"],
    report: ["Kích thước polyp", "Loại adenoma", "Mức loạn sản", "Margin/cuống polyp nếu cắt"],
    memory: "High-grade dysplasia đáng sợ, nhưng chưa phải carcinoma xâm nhập nếu chưa vào mô đệm dưới niêm.",
    pitfall: "Tangential section có thể giả cribriform hoặc giả xâm nhập.",
    markers: ["Không cần IHC thường quy", "p53/Ki-67 khi cần hỗ trợ"],
  },
  {
    id: "colon-signet-ring",
    chapter: "colon",
    diagnosis: "Carcinoma tế bào nhẫn đại trực tràng",
    english: "Signet ring cell carcinoma of colorectum",
    file: "Adenocarcinoma of the colon-histology.JPG",
    pattern: ["carcinoma", "glandular"],
    source: "Wikimedia Commons",
    micro: ["Tế bào chứa mucin đẩy nhân lệch ngoại vi", "Lan tỏa hoặc từng ổ trong mô đệm", "Có thể kèm hồ mucin và xâm nhập sâu"],
    report: ["Tỷ lệ thành phần tế bào nhẫn", "MMR/MSI", "Grade, LVI/PNI, giai đoạn"],
    memory: "Tế bào nhẫn: mucin đẩy nhân sang rìa như chiếc nhẫn.",
    pitfall: "Cần loại trừ di căn từ dạ dày hoặc vú thùy nếu bối cảnh không rõ.",
    markers: ["CDX2", "SATB2", "MMR", "CK20"],
  },
  {
    id: "breast-adh",
    chapter: "breast",
    diagnosis: "Tăng sản ống không điển hình",
    english: "Atypical ductal hyperplasia",
    file: "Breast DCIS histopathology (1).jpg",
    pattern: ["precursor"],
    source: "Wikimedia Commons",
    micro: ["Tăng sinh tế bào đơn dạng trong ống", "Kiểu kiến trúc gợi DCIS nhưng giới hạn về kích thước/số ống", "Có thể có cầu nối hoặc micropapillary"],
    report: ["Ghi ADH trên core biopsy", "Khuyến nghị tương quan hình ảnh và cân nhắc excision theo bối cảnh"],
    memory: "ADH là 'gần DCIS nhưng chưa đủ lượng'.",
    pitfall: "Core biopsy dễ under-sample DCIS đi kèm.",
    markers: ["ER", "CK5/6 giảm", "E-cadherin còn"],
  },
  {
    id: "breast-radial-scar",
    chapter: "breast",
    diagnosis: "Sẹo tia / tổn thương xơ hóa phức tạp",
    english: "Radial scar / complex sclerosing lesion",
    file: "Histopathology of invasive ductal carcinoma of the breast.jpg",
    pattern: ["benign", "spindle"],
    source: "Wikimedia Commons",
    micro: ["Trung tâm xơ hóa, ống tuyến bị kéo méo tỏa tia", "Có lớp tế bào cơ biểu mô quanh ống", "Có thể kèm tăng sản, ADH hoặc carcinoma"],
    report: ["Tương quan hình ảnh", "Ghi tổn thương kèm theo nếu có", "Margin nếu excision"],
    memory: "Radial scar nhìn giống xâm nhập vì kéo méo, nhưng ống còn myoepithelial layer.",
    pitfall: "Dễ nhầm carcinoma ống xâm nhập nếu không kiểm tra myoepithelial markers.",
    markers: ["p63", "SMMHC", "Calponin"],
  },
  {
    id: "hpb-hepatocellular-adenoma",
    chapter: "hpb",
    diagnosis: "U tuyến tế bào gan",
    english: "Hepatocellular adenoma",
    file: "Hepatocellular carcinoma histopathology (1).jpg",
    pattern: ["benign", "glandular"],
    source: "Wikimedia Commons",
    micro: ["Bè tế bào gan lành, không có khoảng cửa điển hình", "Mạch máu đơn độc, có thể xuất huyết", "Tùy subtype có viêm, mỡ hoặc beta-catenin bất thường"],
    report: ["Subtype nếu có IHC", "Kích thước", "Hoại tử/xuất huyết", "Loại trừ HCC"],
    memory: "HCA là nốt tế bào gan không có khoảng cửa thật sự.",
    pitfall: "Ảnh đại diện HCC; cần thay ảnh HCA thật khi có để tránh nhầm ác tính.",
    markers: ["LFABP", "SAA/CRP", "Beta-catenin", "GS"],
  },
  {
    id: "hpb-fnh",
    chapter: "hpb",
    diagnosis: "Tăng sản nốt khu trú gan",
    english: "Focal nodular hyperplasia",
    file: "Hepatocellular carcinoma histopathology (1).jpg",
    pattern: ["benign"],
    source: "Wikimedia Commons",
    micro: ["Nốt tế bào gan tăng sản quanh sẹo xơ trung tâm", "Ống mật phản ứng trong vách xơ", "Mạch bất thường, không có atypia ác tính"],
    report: ["Gợi ý FNH nếu hình thái/IHC phù hợp", "Tương quan hình ảnh học"],
    memory: "FNH = gan phản ứng quanh mạch bất thường và sẹo trung tâm.",
    pitfall: "Sinh thiết nhỏ có thể khó tách HCA; glutamine synthetase dạng map-like hỗ trợ FNH.",
    markers: ["Glutamine synthetase map-like", "CK7 ống mật phản ứng"],
  },
  {
    id: "gyn-ein",
    chapter: "gyn",
    diagnosis: "Tân sinh nội mạc tử cung",
    english: "Endometrial intraepithelial neoplasia / atypical hyperplasia",
    file: "Histopathology of endometrial adenocarcinoma, endometrioid type.jpg",
    pattern: ["precursor", "glandular"],
    source: "Wikimedia Commons",
    micro: ["Tuyến chen chúc, tỷ lệ tuyến/mô đệm tăng", "Tế bào khác nền nội mạc xung quanh", "Chưa thấy xâm nhập mô đệm dạng carcinoma"],
    report: ["Ghi EIN/atypical hyperplasia", "Tìm carcinoma nội mạc đi kèm nếu bệnh phẩm đầy đủ"],
    memory: "EIN = tuyến chen chúc + tế bào khác nền.",
    pitfall: "Polyp nội mạc hoặc thay đổi tiết có thể giả chen chúc.",
    markers: ["PTEN mất có thể gặp", "PAX2 giảm", "MMR khi cần"],
  },
  {
    id: "gyn-cervix-adenocarcinoma",
    chapter: "gyn",
    diagnosis: "Adenocarcinoma cổ tử cung liên quan HPV",
    english: "HPV-associated endocervical adenocarcinoma",
    file: "Ca in situ, cervix 2.jpg",
    pattern: ["carcinoma", "glandular", "ihc"],
    source: "Wikimedia Commons",
    micro: ["Tuyến ác tính cổ trong", "Nhân giả tầng, phân bào và apoptotic bodies", "Có thể kèm AIS"],
    report: ["Kích thước/xâm nhập", "LVSI", "Margin", "p16 block-positive nếu làm"],
    memory: "Adeno cổ tử cung HPV: tuyến ác tính + p16 block.",
    pitfall: "Phân biệt với carcinoma nội mạc tử cung lan xuống cổ tử cung.",
    markers: ["p16 block", "HPV ISH/RNA", "ER thường âm/yếu"],
  },
  {
    id: "gyn-ovary-mucinous",
    chapter: "gyn",
    diagnosis: "U nhầy buồng trứng giáp biên/ác tính",
    english: "Mucinous borderline tumour / carcinoma of ovary",
    file: "Gross pathology and histopathology of signet ring cell carcinoma metastasis to the ovary.jpg",
    pattern: ["glandular", "carcinoma"],
    source: "Wikimedia Commons",
    micro: ["Tuyến/nang lót biểu mô nhầy", "Tăng tầng, phức tạp kiến trúc nếu borderline", "Xâm nhập phá hủy mô đệm nếu carcinoma"],
    report: ["Kích thước, một/bilateral", "Borderline hay carcinoma", "Kiểu xâm nhập", "Loại trừ di căn đường tiêu hóa"],
    memory: "U nhầy buồng trứng lớn một bên thường nguyên phát hơn, hai bên/nhỏ nghĩ di căn.",
    pitfall: "Ảnh đại diện Krukenberg; luôn phải loại trừ di căn GI.",
    markers: ["CK7", "CK20", "CDX2", "SATB2"],
  },
  {
    id: "gyn-mature-teratoma",
    chapter: "gyn",
    diagnosis: "U quái trưởng thành buồng trứng",
    english: "Mature cystic teratoma",
    file: "Gross pathology and histopathology of signet ring cell carcinoma metastasis to the ovary.jpg",
    pattern: ["benign"],
    source: "Wikimedia Commons",
    micro: ["Mô trưởng thành từ một hoặc nhiều lá phôi", "Hay gặp da, tuyến bã, tóc, mô thần kinh hoặc sụn", "Không có thành phần non nếu là mature teratoma"],
    report: ["Thành phần mô hiện diện", "Có biến đổi ác tính hay không", "Bờ/mảnh vỡ nếu xoắn/vỡ"],
    memory: "Teratoma trưởng thành = nhiều loại mô trưởng thành trong một u.",
    pitfall: "Cần tìm kỹ thành phần non hoặc carcinoma gai phát sinh trong u ở người lớn tuổi.",
    markers: ["Không cần IHC thường quy"],
  },
  {
    id: "gu-bph",
    chapter: "gu",
    diagnosis: "Tăng sản lành tính tuyến tiền liệt",
    english: "Benign prostatic hyperplasia",
    file: "Histopathology of prostate adenocarcinoma involving adipose tissue.jpg",
    pattern: ["benign", "glandular"],
    source: "Wikimedia Commons",
    micro: ["Nốt tăng sản tuyến và mô đệm", "Tuyến hai lớp còn tế bào đáy", "Có thể có thể tinh bột corpora amylacea"],
    report: ["Mô tả BPH nếu TURP/sinh thiết", "Tìm ổ carcinoma nhỏ nếu có nghi ngờ"],
    memory: "BPH còn lớp basal, khác carcinoma tuyến tiền liệt mất basal.",
    pitfall: "Ảnh đại diện carcinoma; nên thay bằng ảnh BPH thật khi có.",
    markers: ["p63", "HMWCK", "AMACR"],
  },
  {
    id: "gu-hgpin",
    chapter: "gu",
    diagnosis: "PIN độ cao tuyến tiền liệt",
    english: "High-grade prostatic intraepithelial neoplasia",
    file: "Histopathology of prostate adenocarcinoma involving adipose tissue.jpg",
    pattern: ["precursor", "glandular"],
    source: "Wikimedia Commons",
    micro: ["Tuyến có cấu trúc lớn sẵn có", "Tế bào lòng tuyến atypia, nucleoli rõ", "Lớp basal còn nhưng không liên tục"],
    report: ["Ghi HGPIN", "Không gọi carcinoma nếu còn kiến trúc tuyến lớn và basal layer"],
    memory: "HGPIN có atypia giống ung thư nhưng vẫn nằm trong tuyến có basal.",
    pitfall: "Dễ nhầm adenocarcinoma nhỏ nếu không kiểm basal markers.",
    markers: ["p63/HMWCK còn rải rác", "AMACR có thể dương"],
  },
  {
    id: "gu-seminoma",
    chapter: "gu",
    diagnosis: "Seminoma tinh hoàn",
    english: "Seminoma",
    file: "Clear cell papillary renal cell carcinoma - high mag.jpg",
    pattern: ["carcinoma", "ihc"],
    source: "Wikimedia Commons",
    micro: ["Tế bào lớn, bào tương sáng, nhân trung tâm", "Vách xơ mảnh có lympho", "Có thể có granuloma"],
    report: ["Kích thước", "Xâm nhập rete testis/mạch", "GCNIS", "Margin/thừng tinh"],
    memory: "Seminoma = tế bào sáng đều + lympho trong vách xơ.",
    pitfall: "Ảnh đại diện thận tế bào sáng; nên thay ảnh seminoma thật khi có.",
    markers: ["OCT3/4", "SALL4", "CD117", "PLAP"],
  },
  {
    id: "skin-nevus",
    chapter: "skin",
    diagnosis: "Nốt ruồi melanocytic lành",
    english: "Benign melanocytic nevus",
    file: "Melanoma in skin.jpg",
    pattern: ["benign"],
    source: "Wikimedia Commons",
    micro: ["Tế bào nevus thành ổ đều", "Maturation theo chiều sâu", "Không có mitosis sâu đáng kể"],
    report: ["Loại nevus nếu cần", "Margin nếu cắt", "Dấu atypia nếu có"],
    memory: "Nevus lành trưởng thành khi đi sâu xuống bì.",
    pitfall: "Ảnh đại diện melanoma; cần thay bằng ảnh nevus thật khi có để so sánh.",
    markers: ["SOX10", "S100", "Melan-A", "HMB45 giảm theo sâu"],
  },
  {
    id: "skin-dermatofibroma",
    chapter: "skin",
    diagnosis: "Dermatofibroma",
    english: "Dermatofibroma / benign fibrous histiocytoma",
    file: "Neurofibroma -1.jpg",
    pattern: ["benign", "spindle"],
    source: "Wikimedia Commons",
    micro: ["Tế bào thoi trong bì, dạng storiform", "Collagen trapping ngoại vi", "Thượng bì có thể tăng sản"],
    report: ["Margin nếu cắt", "Biến thể tế bào/aneurysmal nếu có"],
    memory: "Dermatofibroma thường 'bẫy' collagen ở rìa.",
    pitfall: "Phân biệt DFSP khi tổn thương lan sâu, CD34 mạnh lan tỏa.",
    markers: ["Factor XIIIa", "CD34 thường âm/yếu"],
  },
  {
    id: "heme-mantle-cell",
    chapter: "heme",
    diagnosis: "Lymphoma tế bào mantle",
    english: "Mantle cell lymphoma",
    file: "Follicular lymphoma - intermed mag.jpg",
    pattern: ["lymphoid", "ihc"],
    source: "Wikimedia Commons",
    micro: ["Lympho nhỏ/trung bình đơn dạng", "Kiểu mantle zone, nốt hoặc lan tỏa", "Có thể có biến thể blastoid"],
    report: ["Cyclin D1/SOX11", "Ki-67", "TP53 nếu cần", "Phân biệt CLL/SLL"],
    memory: "Mantle cell = CD5+ B-cell nhưng Cyclin D1/SOX11 là chìa khóa.",
    pitfall: "Dễ nhầm CLL/SLL nếu chỉ thấy CD5 dương.",
    markers: ["CD20", "CD5", "Cyclin D1", "SOX11"],
  },
  {
    id: "heme-marginal-zone",
    chapter: "heme",
    diagnosis: "Lymphoma vùng rìa",
    english: "Marginal zone lymphoma",
    file: "Follicular lymphoma - intermed mag.jpg",
    pattern: ["lymphoid", "ihc"],
    source: "Wikimedia Commons",
    micro: ["Tế bào B nhỏ/monocytoid", "Có thể xâm nhập nang và tạo tổn thương lymphoepithelial", "Tương quan MALT nếu ngoài hạch"],
    report: ["Vị trí", "Clonality", "Loại trừ follicular/mantle/CLL", "H. pylori nếu dạ dày"],
    memory: "MZL hay đi cùng nền viêm mạn và phá biểu mô trong MALT.",
    pitfall: "Reactive lymphoid hyperplasia có thể rất giống nếu không có clonality/IHC.",
    markers: ["CD20", "BCL2", "CD5 âm", "CD10 âm", "Cyclin D1 âm"],
  },
  {
    id: "cns-schwannoma",
    chapter: "cns",
    diagnosis: "Schwannoma",
    english: "Schwannoma",
    file: "Neurofibroma -1.jpg",
    pattern: ["benign", "spindle"],
    source: "Wikimedia Commons",
    micro: ["Vùng Antoni A và Antoni B", "Verocay bodies có thể gặp", "Tế bào thoi S100/SOX10 dương mạnh"],
    report: ["Vị trí thần kinh", "Biến đổi thoái hóa/ancient nếu có", "Margin nếu phẫu thuật"],
    memory: "Schwannoma = Antoni A/B và Verocay.",
    pitfall: "Neurofibroma thường thấm nhập hơn và không có capsule rõ như schwannoma.",
    markers: ["S100", "SOX10"],
  },
  {
    id: "headneck-nasopharyngeal",
    chapter: "headneck",
    diagnosis: "Carcinoma vòm mũi họng không sừng hóa",
    english: "Non-keratinizing nasopharyngeal carcinoma",
    file: "Oral cancer (1) squamous cell carcinoma histopathology.jpg",
    pattern: ["carcinoma", "squamous", "ihc"],
    source: "Wikimedia Commons",
    micro: ["Tế bào biểu mô ác tính dạng syncytial", "Nền lympho tương bào dày", "Thường liên quan EBV"],
    report: ["EBER", "Subtype", "Xâm nhập mô lân cận nếu bệnh phẩm phẫu thuật"],
    memory: "NPC không sừng hóa = carcinoma ẩn trong biển lympho, EBER giúp mở khóa.",
    pitfall: "Có thể nhầm lymphoma nếu mẫu nhỏ và lympho quá nhiều.",
    markers: ["EBER", "Pan-CK", "p63/p40"],
  },
  {
    id: "soft-lipoma",
    chapter: "soft",
    diagnosis: "Lipoma",
    english: "Lipoma",
    file: "Neurofibroma -1.jpg",
    pattern: ["benign"],
    source: "Wikimedia Commons",
    micro: ["Mô mỡ trưởng thành", "Tế bào mỡ đều, không atypia", "Vách xơ mảnh có thể gặp"],
    report: ["Kích thước/vị trí", "Tìm lipoblast hoặc atypia nếu nghi ALT/WDL"],
    memory: "Lipoma = mỡ trưởng thành đều và hiền.",
    pitfall: "Khối sâu/lớn cần nghĩ atypical lipomatous tumor nếu có tế bào mô đệm atypia.",
    markers: ["MDM2/CDK4 nếu nghi ALT/WDL"],
  },
  {
    id: "infection-fungal-granuloma",
    chapter: "inflammation",
    diagnosis: "Viêm hạt do nấm",
    english: "Fungal granulomatous inflammation",
    file: "Histopathology of granuloma of colonic mucosa.jpg",
    pattern: ["inflammation"],
    source: "Wikimedia Commons",
    micro: ["Granuloma có hoặc không hoại tử", "Có thể thấy cấu trúc nấm trên H&E nếu nhiều", "Cần nhuộm GMS/PAS để tìm thành nấm"],
    report: ["Nhuộm GMS/PAS", "Mô tả dạng men/sợi nếu thấy", "Tương quan nuôi cấy/PCR"],
    memory: "Granuloma không dừng ở lao: GMS/PAS giúp tìm nấm.",
    pitfall: "AFB âm không loại trừ nấm; cần chọn nhuộm theo bối cảnh.",
    markers: ["GMS", "PAS", "Mucicarmine tùy nghi ngờ"],
  },
];

cases.push(...studioBoosterCases);
cases.forEach(standardizeBuiltinCase);

function applyVerifiedCuration(item) {
  const metadata = curation.caseMetadata?.[item.id] || {};
  const legacyImage = curation.verifiedLegacyImages?.[item.id];
  const replacement = curation.imageReplacements?.[item.id];

  Object.assign(item, metadata);
  item.learningEn = bilingualAtlas[item.id] || null;
  item.classification = curation.chapterStandards?.[item.chapter] || null;
  if (["colon", "hpb", "breast"].includes(item.chapter)) {
    item.systems = [
      ...(item.systems || []),
      {
        label: "WHO 6th edition · Beta",
        note: "Bản beta trực tuyến hiện đã có cho hệ tiêu hóa và vú. Thẻ này vẫn ghi rõ ấn bản của trang thực thể đã đối chiếu; không tự xem nội dung ấn bản 5 là tương đương ấn bản 6.",
        url: `${IARC}/home`,
      },
    ];
  }
  if (item.chapter === "thyroid" && !item.systems) {
    item.systems = [{
      label: "Bethesda 2023",
      note: "Chỉ áp dụng cho tế bào học FNA tuyến giáp; không thay thế chẩn đoán mô bệnh học của thực thể này.",
      url: curation.sources?.bethesda2023 || "https://journals.sagepub.com/doi/10.1089/thy.2023.0141",
    }];
  }
  item.imageVerified = false;
  item.imageKind = "Chưa xác minh";
  item.imageNote = "Ảnh cũ không được hiển thị vì chưa đủ bằng chứng khớp chính xác với chẩn đoán.";

  if (legacyImage) {
    item.imageVerified = true;
    item.imageKind = legacyImage.kind || "Vi thể";
    item.imageNote = legacyImage.note || "Ảnh mở đã được đối chiếu với tên chẩn đoán và trang tệp gốc.";
  }

  if (replacement) {
    item.file = replacement.file;
    item.source = replacement.source;
    item.sourceUrl = replacement.sourceUrl;
    item.imageVerified = true;
    item.imageKind = replacement.kind || "Vi thể";
    item.imageNote = replacement.note || "Ảnh mở đã được đối chiếu với tên chẩn đoán và trang tệp gốc.";
  }

  return item;
}

cases.forEach(applyVerifiedCuration);

const sourceCards = [
  {
    title: "WHO/IARC Blue Books",
    kind: "Phân loại chuẩn",
    note: "Nguồn phân loại chính thức theo cơ quan và chẩn đoán. WHO Online hiện có bản beta ấn bản 6 cho hệ tiêu hóa và vú; các liên kết thực thể ấn bản 5 trong atlas được ghi nhãn riêng. Một số trang cần người đọc đăng nhập.",
    url: `${IARC}/home`,
  },
  {
    title: "WHO Classification Structure",
    kind: "Danh mục phân loại công khai",
    note: "Cung cấp cấu trúc 14 quyển và tên thực thể chính thức dùng cho thư viện tra cứu lớn của atlas.",
    url: "https://whobluebooks.iarc.fr/structures/",
  },
  {
    title: "PathologyOutlines",
    kind: "Vi thể và HMMD/IHC",
    note: "Dùng để đọc thêm đặc điểm vi thể, chẩn đoán phân biệt và các dấu ấn hóa mô miễn dịch. Trang có thể hạn chế truy cập tự động nhưng mở được trên trình duyệt.",
    url: `${PO}/`,
  },
  {
    title: "CAP Cancer Protocols",
    kind: "Bảng kiểm báo cáo",
    note: "Dùng để đối chiếu các yếu tố cần có trong báo cáo ung thư: độ mô học, diện cắt, LVI/PNI, hạch và dấu ấn sinh học.",
    url: CAP,
  },
  {
    title: "Bộ Y tế Việt Nam",
    kind: "Thuật ngữ và quy trình",
    note: "Đối chiếu cách dùng thuật ngữ giải phẫu bệnh, mô bệnh học và tên bệnh trong tài liệu chuyên môn tiếng Việt.",
    url: "https://kcb.vn/upload/2005611/20210723/Huong-dan-qQTKT-Giaiphaubenh.pdf",
  },
  {
    title: "Wikimedia Commons",
    kind: "Ảnh mở minh họa",
    note: "Ảnh nhúng trong atlas có liên kết đến tệp gốc để kiểm tra tác giả và giấy phép. Có thể thay ảnh bằng nguồn của bạn.",
    url: COMMONS_CATEGORY,
  },
  {
    title: "WebPathology",
    kind: "Thư viện ảnh tham khảo",
    note: "Liên kết mở WebPathology ở cửa sổ riêng theo đúng tên chẩn đoán. Không sao chép hoặc nhúng ảnh vì nội dung WebPathology có bản quyền và cần xin phép trước khi đăng lại.",
    url: "https://www.webpathology.com/",
  },
  {
    title: "ICD-O-4",
    kind: "Mã hình thái ung thư",
    note: "International Classification of Diseases for Oncology (Phân loại Bệnh Quốc tế về Ung thư), bản ICD-O-4 do IARC công bố ngày 20/07/2026. Atlas chỉ hiện mã đã đối chiếu; mã vị trí giải phẫu phụ thuộc đúng vị trí lấy mẫu.",
    url: curation.sources?.icdo4 || `${IARC}/icd-o-4/`,
  },
  {
    title: "The Bethesda System 2023",
    kind: "Tế bào học tuyến giáp",
    note: "Hệ thống sáu nhóm dành cho FNA tuyến giáp. Không dùng Bethesda để thay thế chẩn đoán mô bệnh học.",
    url: curation.sources?.bethesda2023 || "https://journals.sagepub.com/doi/10.1089/thy.2023.0141",
  },
  {
    title: "FIGO 2023 - nội mạc tử cung",
    kind: "Phân giai đoạn",
    note: "Chỉ gắn ở các thẻ ung thư nội mạc tử cung phù hợp; phân giai đoạn cần đầy đủ dữ liệu giải phẫu bệnh, phân tử và lâm sàng/phẫu thuật.",
    url: curation.sources?.figo2023Endometrium || "https://pmc.ncbi.nlm.nih.gov/articles/PMC10482588/",
  },
];

const whoCatalog = window.WHO_ATLAS_CATALOG || { volumes: [], entries: [] };
const whoVolumes = Array.isArray(whoCatalog.volumes) ? whoCatalog.volumes : [];
const whoEntries = Array.isArray(whoCatalog.entries) ? whoCatalog.entries : [];
const whoVolumeMap = new Map(whoVolumes.map((volume) => [volume.id, volume]));
const whoVolumeChapters = {
  digestive: ["colon", "hpb", "soft"],
  breast: ["breast"],
  thoracic: ["lung"],
  "female-genital": ["gyn"],
  urinary: ["gu"],
  "head-neck": ["headneck"],
  endocrine: ["thyroid"],
  skin: ["skin"],
  haematolymphoid: ["heme"],
  cns: ["cns"],
  "soft-tissue-bone": ["soft"],
  eye: [],
  paediatric: [],
  genetic: [],
};
const whoEntryAliases = {
  "digestive|focal nodular hyperplasia of the liver": "hpb-fnh",
  "digestive|pancreatic intraductal papillary mucinous neoplasm": "hpb-ipmn",
  "breast|lobular carcinoma in situ": "breast-lcis",
  "thoracic|adenocarcinoma in situ of the lung": "lung-ais",
  "thoracic|invasive mucinous adenocarcinoma of the lung": "lung-mucinous",
  "thoracic|large cell neuroendocrine carcinoma of the lung": "lung-large-cell-ne",
  "female-genital|high grade serous carcinoma of the ovary": "gyn-ovarian-serous",
  "head-neck|nasopharyngeal carcinoma": "headneck-nasopharyngeal",
};

let state = {
  chapter: "thyroid",
  pattern: "all",
  query: "",
  selectedId: "thyroid-ptc",
  whoVolume: "all",
  whoQuery: "",
  whoLimit: 36,
};

let imageOverrides = loadOverrides();
let customCases = loadCustomCases();
cases.push(...customCases);

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
  statWho: document.getElementById("statWho"),
  statSources: document.getElementById("statSources"),
  sideWhoCount: document.getElementById("sideWhoCount"),
  whoVolumeCount: document.getElementById("whoVolumeCount"),
  whoEntryCount: document.getElementById("whoEntryCount"),
  whoLinkedCount: document.getElementById("whoLinkedCount"),
  whoSearchInput: document.getElementById("whoSearchInput"),
  whoResetFilters: document.getElementById("whoResetFilters"),
  whoVolumeFilters: document.getElementById("whoVolumeFilters"),
  whoResultSummary: document.getElementById("whoResultSummary"),
  whoCatalogGrid: document.getElementById("whoCatalogGrid"),
  whoLoadMore: document.getElementById("whoLoadMore"),
  imageDialog: document.getElementById("imageDialog"),
  imageDialogTitle: document.getElementById("imageDialogTitle"),
  imageUrlInput: document.getElementById("imageUrlInput"),
  imageSourceInput: document.getElementById("imageSourceInput"),
  saveImage: document.getElementById("saveImage"),
  resetImage: document.getElementById("resetImage"),
  openImageManager: document.getElementById("openImageManager"),
  openCaseStudio: document.getElementById("openCaseStudio"),
  caseDialog: document.getElementById("caseDialog"),
  customChapter: document.getElementById("customChapter"),
  customPattern: document.getElementById("customPattern"),
  customDiagnosis: document.getElementById("customDiagnosis"),
  customEnglish: document.getElementById("customEnglish"),
  customImageUrl: document.getElementById("customImageUrl"),
  customSourceUrl: document.getElementById("customSourceUrl"),
  customMicro: document.getElementById("customMicro"),
  customReport: document.getElementById("customReport"),
  customMemory: document.getElementById("customMemory"),
  customPitfall: document.getElementById("customPitfall"),
  customMarkers: document.getElementById("customMarkers"),
  customCount: document.getElementById("customCount"),
  customJsonBox: document.getElementById("customJsonBox"),
  saveCustomCase: document.getElementById("saveCustomCase"),
  exportCustom: document.getElementById("exportCustom"),
  importCustom: document.getElementById("importCustom"),
  clearCustom: document.getElementById("clearCustom"),
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

function loadCustomCases() {
  try {
    const items = JSON.parse(localStorage.getItem("atlasCustomCases") || "[]");
    return Array.isArray(items) ? items.filter((item) => item?.id && item?.diagnosis) : [];
  } catch {
    return [];
  }
}

function saveCustomCases() {
  localStorage.setItem("atlasCustomCases", JSON.stringify(customCases));
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

function normalizeWhoName(value) {
  return normalize(value)
    .replace(/\b(nos|nst)\b/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

let whoMatches = new Map();

function findAtlasCaseForWho(entry) {
  const target = normalizeWhoName(entry.nameEn);
  if (!target) return null;
  const aliasId = whoEntryAliases[`${entry.volumeId}|${target}`];
  if (aliasId) return cases.find((item) => item.id === aliasId) || null;

  const curatedAlias = cases.find((item) => (
    Array.isArray(item.whoTerms)
    && item.whoTerms.some((term) => normalizeWhoName(term) === target)
  ));
  if (curatedAlias) return curatedAlias;

  const allowedChapters = whoVolumeChapters[entry.volumeId] || [];
  return cases.find((item) => (
    allowedChapters.includes(item.chapter)
    && normalizeWhoName(item.english) === target
  )) || null;
}

function prepareWhoCatalog() {
  whoMatches = new Map();
  whoEntries.forEach((entry) => {
    const linkedCase = findAtlasCaseForWho(entry);
    entry.searchText = normalize([
      entry.nameEn,
      entry.sectionEn,
      entry.groupEn,
      entry.categoryEn,
      whoVolumeMap.get(entry.volumeId)?.nameVi,
      whoVolumeMap.get(entry.volumeId)?.nameEn,
      linkedCase?.diagnosis,
      linkedCase?.english,
      linkedCase?.icdo?.code,
      ...(linkedCase?.whoTerms || []),
    ].join(" "));
    if (linkedCase) whoMatches.set(entry, linkedCase);
  });
}

function translatedWhoQueryGroups(value) {
  const query = normalize(value);
  if (!query) return [];
  const groups = [];
  Object.entries(curation.vietnameseWhoQueryMap || {}).forEach(([vietnamese, englishTerms]) => {
    const key = normalize(vietnamese);
    if (!query.includes(key)) return;
    if (key === "ung thu bieu mo tuyen" && query.includes("tuyen giap")) return;
    groups.push((englishTerms || []).map(normalize));
  });
  return groups;
}

function filteredWhoEntries() {
  const query = normalize(state.whoQuery);
  const translatedGroups = translatedWhoQueryGroups(state.whoQuery);
  return whoEntries.filter((entry) => {
    const volumeOk = state.whoVolume === "all" || entry.volumeId === state.whoVolume;
    const directMatch = !query || entry.searchText.includes(query);
    const translatedMatch = translatedGroups.length > 0
      && translatedGroups.every((group) => group.some((term) => entry.searchText.includes(term)));
    const queryOk = directMatch || translatedMatch;
    return volumeOk && queryOk;
  });
}

function chapterById(id) {
  return chapters.find((chapter) => chapter.id === id) || chapters[0];
}

function patternLabel(id) {
  return patterns.find(([key]) => key === id)?.[1] || id;
}

function imageFor(item) {
  if (item.imageUrl) return item.imageUrl;
  const override = imageOverrides[item.id];
  if (override?.url) return override.url;
  if (!item.custom && item.imageVerified !== true) return "";
  if (!item.file) return "";
  return commonsImage(item.file);
}

function imageSourceFor(item) {
  const override = imageOverrides[item.id];
  if (override?.source) return override.source;
  if (item.sourceUrl) return item.source || "Ảnh tùy chỉnh";
  return item.source;
}

function imageLinkFor(item) {
  const override = imageOverrides[item.id];
  if (override?.sourceUrl) return override.sourceUrl;
  if (item.sourceUrl) return item.sourceUrl;
  if (item.imageUrl) return item.imageUrl;
  if (!item.file) return "#";
  return commonsSource(item.file);
}

function imageSearchLinkFor(item) {
  return `https://commons.wikimedia.org/w/index.php?search=${encodeURIComponent(`${item.english} histopathology`)}&title=Special:MediaSearch&type=image`;
}

function webPathologyUrlFor(item) {
  if (item.webPathologyUrl) return item.webPathologyUrl;
  return `https://www.webpathology.com/search-result?query=${encodeURIComponent(item.english)}`;
}

function pathologyOutlinesSearchUrl(term) {
  return `${PO_SEARCH}${encodeURIComponent(term)}`;
}

function webPathologyEntryUrl(entry) {
  return `https://www.webpathology.com/search-result?query=${encodeURIComponent(entry.nameEn)}`;
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
    item.icdo?.code,
    item.classification?.label,
    (item.whoTerms || []).join(" "),
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

function imageMarkup(item, variant = "card") {
  if (imageFor(item)) return `<img class="atlas-image ${escapeHtml(variant)}" ${safeImageAttrs(item)} />`;
  return `
    <span class="image-placeholder ${escapeHtml(variant)}" role="img" aria-label="Chưa có ảnh đã xác minh cho ${escapeHtml(item.diagnosis)}">
      <span class="image-placeholder-icon" aria-hidden="true">⌕</span>
      <strong>Chưa có ảnh đã xác minh</strong>
      <small>Không dùng ảnh gần giống để tránh học sai</small>
    </span>
  `;
}

function bilingualList(vietnamese, english) {
  const englishItems = Array.isArray(english) && english.length
    ? english
    : ["English learning summary is pending specialist review; use the linked primary references."];
  return `
    <div class="language-block" lang="vi">
      <span>VI</span>
      <ul>${vietnamese.map((entry) => `<li>${escapeHtml(entry)}</li>`).join("")}</ul>
    </div>
    <div class="language-block english-block" lang="en">
      <span>EN</span>
      <ul>${englishItems.map((entry) => `<li>${escapeHtml(entry)}</li>`).join("")}</ul>
    </div>
  `;
}

function bilingualMemory(item) {
  const english = item.learningEn || {};
  return `
    <div class="language-block" lang="vi">
      <span>VI</span>
      <p>${escapeHtml(item.memory)}</p>
      <p><strong>Dễ nhầm:</strong> ${escapeHtml(item.pitfall)}</p>
    </div>
    <div class="language-block english-block" lang="en">
      <span>EN</span>
      <p>${escapeHtml(english.memory || "English memory point pending specialist review.")}</p>
      <p><strong>Pitfall:</strong> ${escapeHtml(english.pitfall || "Use the linked primary references for the complete differential diagnosis.")}</p>
    </div>
  `;
}

function officialLinks(item) {
  const chapter = chapterById(item.chapter);
  const directWhoLink = verifiedWhoLinks[item.id];
  const chapterStandard = item.classification || curation.chapterStandards?.[item.chapter];
  const exactPathologyOutlines = verifiedTopicLinks[item.id];
  const links = [
    { label: directWhoLink ? "WHO/IARC 5th ed · trang đúng thực thể" : "WHO/IARC · danh mục quyển (không phải trang thực thể)", url: directWhoLink || chapterStandard?.url || chapter.who },
    { label: exactPathologyOutlines ? "PathologyOutlines · đúng chủ đề" : "PathologyOutlines · tìm đúng tên chẩn đoán", url: exactPathologyOutlines || pathologyOutlinesSearchUrl(item.english) },
    { label: item.webPathologyUrl ? "WebPathology · gallery đúng chủ đề" : "WebPathology · tìm đúng tên chẩn đoán", url: webPathologyUrlFor(item) },
  ];
  if (item.report.some((entry) => {
    const text = normalize(entry);
    return text.includes("margin") || text.includes("grade") || text.includes("dien cat") || text.includes("do mo hoc") || text.includes("hach");
  })) {
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
      <div><strong>${new Set(chapterCases.flatMap((item) => item.pattern)).size}</strong><span>kiểu cấu trúc</span></div>
      <div><strong>${markerCount}</strong><span>dấu ấn/gợi ý</span></div>
    </div>
    <div class="chapter-links">
      <a href="${escapeHtml(chapter.who)}" target="_blank" rel="noreferrer">Phân loại WHO/IARC ↗</a>
      <a href="${escapeHtml(chapter.po)}" target="_blank" rel="noreferrer">Chương PathologyOutlines ↗</a>
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
        ${imageMarkup(item, "card-image")}
        <span class="organ-badge" style="--badge:${escapeHtml(chapter.color)}">${escapeHtml(chapter.name)}</span>
        <strong>${escapeHtml(item.diagnosis)}</strong>
        <em>${escapeHtml(item.english)}</em>
        <p>${escapeHtml(item.micro.slice(0, 2).join(" · "))}</p>
        ${item.learningEn?.micro?.[0] ? `<p class="card-feature-en" lang="en">${escapeHtml(item.learningEn.micro[0])}</p>` : ""}
        <small>${escapeHtml(item.pattern.slice(0, 3).map(patternLabel).join(" / "))}</small>
        ${item.icdo?.code ? `<span class="icdo-chip">ICD-O-4 ${escapeHtml(item.icdo.code)}</span>` : ""}
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
  const imageUrl = imageFor(item);
  const imageAvailable = Boolean(imageUrl);
  const userManagedImage = Boolean(item.imageUrl || imageOverrides[item.id]?.url || item.custom);
  const imageReviewLabel = userManagedImage
    ? "Ảnh người dùng thêm"
    : imageAvailable
      ? "Đã đối chiếu tên tệp"
      : "Chưa có ảnh đủ điều kiện";
  const imageReviewNote = userManagedImage
    ? "Ảnh tùy chỉnh chưa được atlas kiểm định; cần tự xác nhận chẩn đoán, quyền sử dụng và nguồn."
    : item.imageNote || "Chỉ nhúng ảnh mở có trang nguồn rõ ràng.";
  const imageLink = imageAvailable ? imageLinkFor(item) : imageSearchLinkFor(item);
  const imageAction = imageAvailable ? "Mở trang tệp và giấy phép" : "Tìm ảnh mở theo đúng chẩn đoán";
  const icdo = item.icdo || {
    code: "Chưa đối chiếu",
    version: "ICD-O-4",
    note: "Không suy đoán mã. Mục này sẽ chỉ hiện mã sau khi đối chiếu bảng ICD-O-4 chính thức.",
  };
  const standard = item.classification || curation.chapterStandards?.[item.chapter];

  if (imageUrl) document.documentElement.style.setProperty("--hero-image", `url("${imageUrl}")`);

  els.caseDetail.innerHTML = `
    <div class="detail-image ${imageAvailable ? "verified" : "unverified"}">
      ${imageMarkup(item, "detail-figure")}
      <div class="image-credit">
        <strong>${escapeHtml(item.imageKind || (imageAvailable ? "Ảnh minh họa" : "Chưa có ảnh"))}</strong>
        <span>${escapeHtml(imageAvailable ? imageSourceFor(item) : "Ảnh cũ không phù hợp đã được ẩn")}</span>
      </div>
    </div>
    <div class="detail-copy">
      <span class="eyebrow">${escapeHtml(chapter.name)} · ${escapeHtml(item.pattern.map(patternLabel).join(" / "))}</span>
      <h2>${escapeHtml(item.diagnosis)}</h2>
      <p class="english">${escapeHtml(item.english)}</p>
      <div class="classification-strip">
        <div>
          <span>Phân loại / Classification</span>
          <strong>${escapeHtml(standard ? `${standard.label} · ${standard.edition}${standard.year ? ` (${standard.year})` : ""}` : "Chưa gắn phân loại")}</strong>
        </div>
        <div>
          <span>Mã hình thái / Morphology code</span>
          <strong>${escapeHtml(`${icdo.version || "ICD-O-4"} · ${icdo.code}`)}</strong>
          <small>${escapeHtml(icdo.note || "Mã vị trí giải phẫu (topography) phụ thuộc chính xác vào vị trí bệnh phẩm.")}</small>
        </div>
        <div>
          <span>Kiểm định ảnh / Image review</span>
          <strong>${escapeHtml(imageReviewLabel)}</strong>
          <small>${escapeHtml(imageReviewNote)}</small>
        </div>
      </div>
      ${(item.systems || []).map((system) => `
        <a class="system-note" href="${escapeHtml(system.url)}" target="_blank" rel="noreferrer">
          <strong>${escapeHtml(system.label)}</strong>
          <span>${escapeHtml(system.note)}</span>
        </a>
      `).join("")}
      <div class="detail-grid">
        <section>
          <h3>Đặc điểm vi thể <span>/ Microscopic features</span></h3>
          ${bilingualList(item.micro, item.learningEn?.micro)}
        </section>
        <section>
          <h3>Gợi ý báo cáo <span>/ Reporting checklist</span></h3>
          ${bilingualList(item.report, item.learningEn?.report)}
        </section>
        <section>
          <h3>Điểm ghi nhớ <span>/ Memory point</span></h3>
          ${bilingualMemory(item)}
        </section>
      </div>
      <div class="marker-heading">
        <strong>HMMD định hướng / Suggested IHC</strong>
        <span>Chọn panel theo hình thái và chẩn đoán phân biệt; không diễn giải một marker đơn độc.</span>
      </div>
      <div class="tag-row">
        ${item.markers.map((marker) => `<span>${escapeHtml(marker)}</span>`).join("")}
      </div>
      <div class="link-row">
        <a href="${escapeHtml(imageLink)}" target="_blank" rel="noreferrer"><span>Nguồn ảnh / Image source</span>${escapeHtml(imageAction)} ↗</a>
        ${links.map((link) => `<a href="${escapeHtml(link.url)}" target="_blank" rel="noreferrer"><span>Đọc nguồn</span>${escapeHtml(link.label)} ↗</a>`).join("")}
        <button class="btn" type="button" data-edit-image="${escapeHtml(item.id)}">Đổi ảnh này</button>
        ${item.custom ? `<button class="btn danger" type="button" data-delete-custom="${escapeHtml(item.id)}">Xóa thẻ tự thêm</button>` : ""}
      </div>
    </div>
  `;

  const editButton = els.caseDetail.querySelector("[data-edit-image]");
  editButton?.addEventListener("click", () => openImageDialog(item.id));
  const deleteButton = els.caseDetail.querySelector("[data-delete-custom]");
  deleteButton?.addEventListener("click", () => deleteCustomCase(item.id));
}

function renderPoster() {
  const chapter = chapterById(state.chapter);
  const pool = (state.chapter === "all" ? cases : cases.filter((item) => item.chapter === state.chapter)).slice(0, 10);
  els.posterTitle.textContent = state.chapter === "all" ? "10 kiểu cấu trúc nền tảng" : `Atlas ${chapter.name}`;
  els.posterNote.textContent = state.chapter === "thyroid"
    ? "Bố cục mô phỏng poster tuyến giáp: từ lành tính, viêm, u dạng nang đến PTC/MTC/ATC."
    : state.chapter === "lung"
      ? "Bảng ôn nhanh ung thư phổi: phân biệt típ tuyến, tế bào vảy, tế bào nhỏ và dạng nhầy."
      : state.chapter === "colon"
        ? "Bảng ôn nhanh polyp đại tràng: phân biệt polyp tăng sản, tổn thương răng cưa, u tuyến và ung thư biểu mô."
        : "Dùng để ôn nhanh: mỗi thẻ là một hình ảnh, ba dấu hiệu chính và một câu ghi nhớ.";

  els.memoryPoster.innerHTML = pool.map((item, index) => {
    return `
      <article class="memory-card" style="--poster-color:${escapeHtml(chapterById(item.chapter).color)}">
        ${imageMarkup(item, "poster-image")}
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
          ${imageMarkup(item, "gallery-figure")}
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

function openAtlasCaseFromWho(id) {
  const item = cases.find((entry) => entry.id === id);
  if (!item) return;
  state.chapter = item.chapter;
  state.pattern = "all";
  state.query = "";
  state.selectedId = item.id;
  els.searchInput.value = "";
  renderAll();
  els.caseDetail.scrollIntoView({ behavior: "smooth", block: "start" });
}

function renderWhoLibrary() {
  const filtered = filteredWhoEntries();
  const visible = filtered.slice(0, state.whoLimit);
  const linkedCount = new Set([...whoMatches.values()].map((item) => item.id)).size;

  els.whoVolumeCount.textContent = String(whoVolumes.length);
  els.whoEntryCount.textContent = whoEntries.length.toLocaleString("vi-VN");
  els.whoLinkedCount.textContent = linkedCount.toLocaleString("vi-VN");

  const allButton = `
    <button class="who-volume-button ${state.whoVolume === "all" ? "active" : ""}" type="button" data-who-volume="all">
      <i>ALL</i>
      <strong>Tất cả 14 quyển</strong>
      <em>${whoEntries.length.toLocaleString("vi-VN")}</em>
    </button>
  `;
  const volumeButtons = whoVolumes.map((volume) => `
    <button class="who-volume-button ${state.whoVolume === volume.id ? "active" : ""}" type="button" data-who-volume="${escapeHtml(volume.id)}" title="${escapeHtml(volume.nameEn)}">
      <i>${escapeHtml(volume.short)}</i>
      <strong>${escapeHtml(volume.nameVi)}</strong>
      <em>${Number(volume.entryCount).toLocaleString("vi-VN")}</em>
    </button>
  `).join("");
  els.whoVolumeFilters.innerHTML = allButton + volumeButtons;

  els.whoResultSummary.textContent = filtered.length
    ? `${filtered.length.toLocaleString("vi-VN")} mục phù hợp · đang hiển thị ${visible.length.toLocaleString("vi-VN")}`
    : "Không tìm thấy danh pháp phù hợp. Có thể nhập tiếng Việt hoặc tiếng Anh; hãy thử từ khóa ngắn hơn hoặc chọn quyển khác.";

  if (!visible.length) {
    els.whoCatalogGrid.innerHTML = `<div class="empty-state">Không có kết quả trong danh mục WHO với bộ lọc hiện tại.</div>`;
  } else {
    els.whoCatalogGrid.innerHTML = visible.map((entry) => {
      const volume = whoVolumeMap.get(entry.volumeId) || {};
      const linkedCase = whoMatches.get(entry);
      const exactWhoUrl = linkedCase ? verifiedWhoLinks[linkedCase.id] : "";
      const exactPoUrl = linkedCase ? verifiedTopicLinks[linkedCase.id] : "";
      const exactWebPathologyUrl = linkedCase?.webPathologyUrl || "";
      const path = [entry.sectionEn, entry.groupEn, entry.categoryEn]
        .filter(Boolean)
        .filter((value, index, values) => values.indexOf(value) === index)
        .join(" › ");
      return `
        <article class="who-entry-card">
          <div class="who-entry-meta">
            <span>${escapeHtml(volume.nameVi || entry.volumeId)}</span>
            <em>${linkedCase ? "Song ngữ đã liên kết" : escapeHtml(volume.short || "WHO")}</em>
          </div>
          ${linkedCase ? `<p class="who-entry-vi">${escapeHtml(linkedCase.diagnosis)}</p>` : ""}
          <h3>${escapeHtml(entry.nameEn)}</h3>
          ${linkedCase?.icdo?.code ? `<span class="who-icdo">ICD-O-4 ${escapeHtml(linkedCase.icdo.code)}</span>` : ""}
          <p class="who-entry-path">${escapeHtml(path || volume.nameEn || "WHO Classification of Tumours")}</p>
          <div class="who-entry-actions">
            <a href="${escapeHtml(exactWhoUrl || volume.sourceUrl || whoCatalog.source)}" target="_blank" rel="noreferrer">${exactWhoUrl ? "WHO 5th ed · đúng thực thể" : "Danh mục quyển WHO"} ↗</a>
            <a href="${escapeHtml(exactPoUrl || pathologyOutlinesSearchUrl(entry.nameEn))}" target="_blank" rel="noreferrer">${exactPoUrl ? "PathologyOutlines đúng chủ đề" : "Tìm trên PathologyOutlines"} ↗</a>
            <a href="${escapeHtml(linkedCase ? webPathologyUrlFor(linkedCase) : webPathologyEntryUrl(entry))}" target="_blank" rel="noreferrer">${exactWebPathologyUrl ? "WebPathology: gallery trực tiếp" : "WebPathology: tìm đúng tên"} ↗</a>
            ${linkedCase ? `<button type="button" data-who-case="${escapeHtml(linkedCase.id)}">Mở thẻ học song ngữ</button>` : ""}
          </div>
        </article>
      `;
    }).join("");
  }

  els.whoLoadMore.hidden = visible.length >= filtered.length;
  els.whoVolumeFilters.querySelectorAll("[data-who-volume]").forEach((button) => {
    button.addEventListener("click", () => {
      state.whoVolume = button.dataset.whoVolume;
      state.whoLimit = 36;
      renderWhoLibrary();
    });
  });
  els.whoCatalogGrid.querySelectorAll("[data-who-case]").forEach((button) => {
    button.addEventListener("click", () => openAtlasCaseFromWho(button.dataset.whoCase));
  });
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

function splitLines(value) {
  return String(value || "")
    .split(/\n+/)
    .map((line) => line.trim())
    .filter(Boolean);
}

function splitComma(value) {
  return String(value || "")
    .split(/[,;]+/)
    .map((entry) => entry.trim())
    .filter(Boolean);
}

function normalizePattern(raw) {
  const text = normalize(raw).replace(/\s+/g, "-");
  const known = new Set(patterns.map(([id]) => id));
  return known.has(text) ? text : text || "benign";
}

function populateCustomChapterOptions() {
  els.customChapter.innerHTML = chapters
    .filter((chapter) => chapter.id !== "all")
    .map((chapter) => `<option value="${escapeHtml(chapter.id)}">${escapeHtml(chapter.name)}</option>`)
    .join("");
}

function updateCustomCount() {
  els.customCount.textContent = `${customCases.length} thẻ tự thêm`;
}

function clearCustomForm() {
  els.customPattern.value = "";
  els.customDiagnosis.value = "";
  els.customEnglish.value = "";
  els.customImageUrl.value = "";
  els.customSourceUrl.value = "";
  els.customMicro.value = "";
  els.customReport.value = "";
  els.customMemory.value = "";
  els.customPitfall.value = "";
  els.customMarkers.value = "";
}

function openCaseStudio() {
  populateCustomChapterOptions();
  updateCustomCount();
  if (state.chapter !== "all") els.customChapter.value = state.chapter;
  els.caseDialog.showModal();
}

function createCustomCase() {
  const diagnosis = els.customDiagnosis.value.trim();
  const imageUrl = els.customImageUrl.value.trim();
  if (!diagnosis || !imageUrl) {
    els.customJsonBox.value = "Cần nhập tối thiểu chẩn đoán tiếng Việt và URL ảnh.";
    return null;
  }

  const chapter = els.customChapter.value || "thyroid";
  const pattern = splitComma(els.customPattern.value).map(normalizePattern);
  const markers = splitComma(els.customMarkers.value);
  const createdAt = new Date().toISOString();
  const id = `custom-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;

  return {
    id,
    custom: true,
    createdAt,
    chapter,
    diagnosis,
    english: els.customEnglish.value.trim() || diagnosis,
    imageUrl,
    sourceUrl: els.customSourceUrl.value.trim() || imageUrl,
    source: els.customSourceUrl.value.trim() ? "Nguồn tự nhập" : "Ảnh tự thêm",
    file: "",
    pattern: pattern.length ? pattern : ["benign"],
    micro: splitLines(els.customMicro.value).length ? splitLines(els.customMicro.value) : ["Chưa nhập vi thể cần nhìn"],
    report: splitLines(els.customReport.value).length ? splitLines(els.customReport.value) : ["Chưa nhập gợi ý báo cáo"],
    memory: els.customMemory.value.trim() || "Chưa nhập điểm ghi nhớ.",
    pitfall: els.customPitfall.value.trim() || "Chưa nhập bẫy chẩn đoán.",
    markers: markers.length ? markers : ["Chưa nhập dấu ấn"],
  };
}

function saveCustomCaseFromForm() {
  const item = createCustomCase();
  if (!item) return;
  customCases.push(item);
  cases.push(item);
  saveCustomCases();
  state.chapter = item.chapter;
  state.pattern = "all";
  state.query = "";
  state.selectedId = item.id;
  els.searchInput.value = "";
  clearCustomForm();
  updateCustomCount();
  els.caseDialog.close();
  updateStats();
  prepareWhoCatalog();
  renderWhoLibrary();
  renderAll();
  els.caseDetail.scrollIntoView({ behavior: "smooth", block: "start" });
}

function deleteCustomCase(id) {
  customCases = customCases.filter((item) => item.id !== id);
  const index = cases.findIndex((item) => item.id === id);
  if (index >= 0) cases.splice(index, 1);
  saveCustomCases();
  state.selectedId = filteredCases()[0]?.id || cases[0].id;
  updateStats();
  prepareWhoCatalog();
  renderWhoLibrary();
  renderAll();
}

function exportCustomCases() {
  els.customJsonBox.value = JSON.stringify(customCases, null, 2);
  els.customJsonBox.focus();
  els.customJsonBox.select();
}

function importCustomCases() {
  try {
    const incoming = JSON.parse(els.customJsonBox.value || "[]");
    if (!Array.isArray(incoming)) throw new Error("JSON phải là một mảng.");
    const cleaned = incoming
      .filter((item) => item?.diagnosis && (item?.imageUrl || item?.file))
      .map((item) => ({
        ...item,
        id: item.id?.startsWith("custom-") ? item.id : `custom-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`,
        custom: true,
        chapter: chapters.some((chapter) => chapter.id === item.chapter) ? item.chapter : "thyroid",
        pattern: Array.isArray(item.pattern) && item.pattern.length ? item.pattern : ["benign"],
        micro: Array.isArray(item.micro) && item.micro.length ? item.micro : ["Chưa nhập vi thể cần nhìn"],
        report: Array.isArray(item.report) && item.report.length ? item.report : ["Chưa nhập gợi ý báo cáo"],
        markers: Array.isArray(item.markers) && item.markers.length ? item.markers : ["Chưa nhập dấu ấn"],
      }));
    cases.splice(0, cases.length, ...cases.filter((item) => !item.custom), ...cleaned);
    customCases = cleaned;
    saveCustomCases();
    updateCustomCount();
    updateStats();
    prepareWhoCatalog();
    renderWhoLibrary();
    renderAll();
    els.customJsonBox.value = `Đã nhập ${cleaned.length} thẻ tự thêm.`;
  } catch (error) {
    els.customJsonBox.value = `Không nhập được JSON: ${error.message}`;
  }
}

function clearCustomCases() {
  customCases = [];
  for (let index = cases.length - 1; index >= 0; index -= 1) {
    if (cases[index].custom) cases.splice(index, 1);
  }
  saveCustomCases();
  updateCustomCount();
  updateStats();
  prepareWhoCatalog();
  renderWhoLibrary();
  state.selectedId = filteredCases()[0]?.id || cases[0].id;
  renderAll();
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
    state = {
      ...state,
      chapter: "thyroid",
      pattern: "all",
      query: "",
      selectedId: "thyroid-ptc",
    };
    els.searchInput.value = "";
    renderAll();
  });

  els.whoSearchInput.addEventListener("input", () => {
    state.whoQuery = els.whoSearchInput.value;
    state.whoLimit = 36;
    renderWhoLibrary();
  });

  els.whoResetFilters.addEventListener("click", () => {
    state.whoVolume = "all";
    state.whoQuery = "";
    state.whoLimit = 36;
    els.whoSearchInput.value = "";
    renderWhoLibrary();
  });

  els.whoLoadMore.addEventListener("click", () => {
    state.whoLimit += 36;
    renderWhoLibrary();
  });

  els.openImageManager.addEventListener("click", () => openImageDialog(state.selectedId));
  els.openCaseStudio.addEventListener("click", openCaseStudio);

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

  els.saveCustomCase.addEventListener("click", saveCustomCaseFromForm);
  els.exportCustom.addEventListener("click", exportCustomCases);
  els.importCustom.addEventListener("click", importCustomCases);
  els.clearCustom.addEventListener("click", clearCustomCases);
}

function updateStats() {
  els.statOrgans.textContent = String(chapters.length - 1);
  els.statDx.textContent = String(cases.length);
  els.statWho.textContent = whoEntries.length.toLocaleString("vi-VN");
  els.statSources.textContent = String(sourceCards.length);
  els.sideWhoCount.textContent = whoEntries.length.toLocaleString("vi-VN");
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
  prepareWhoCatalog();
  updateStats();
  populateCustomChapterOptions();
  updateCustomCount();
  renderSources();
  renderWhoLibrary();
  renderAll();
  bindEvents();
}

init();
