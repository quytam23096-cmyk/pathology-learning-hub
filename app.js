const PO = "https://www.pathologyoutlines.com";
const WHO = "https://publications.iarc.who.int/Book-And-Report-Series/Who-Classification-Of-Tumours";
const CAP = "https://www.cap.org/protocols-and-guidelines/cancer-protocols/current-cancer-protocols/";
const NCI_REPORT = "https://www.cancer.gov/about-cancer/diagnosis-staging/diagnosis/pathology-reports-fact-sheet";
const WHO_ONLINE = "https://tumourclassification.iarc.who.int/";

const covers = {
  digestive: "https://iarc-publications-website.s3.eu-west-3.amazonaws.com/media/default/0001/06/thumb_5545_default_publication.jpeg",
  breast: "https://iarc-publications-website.s3.eu-west-3.amazonaws.com/media/default/0001/06/thumb_5564_default_publication.jpeg",
  thoracic: "https://iarc-publications-website.s3.eu-west-3.amazonaws.com/media/default/0001/07/thumb_6113_default_publication.jpeg",
  female: "https://iarc-publications-website.s3.eu-west-3.amazonaws.com/media/default/0001/07/thumb_6061_default_publication.jpeg",
  gu: "https://iarc-publications-website.s3.eu-west-3.amazonaws.com/media/default/0001/07/thumb_6584_default_publication.jpeg",
  cns: "https://iarc-publications-website.s3.eu-west-3.amazonaws.com/media/default/0001/07/thumb_6263_default_publication.jpeg",
  soft: "https://iarc-publications-website.s3.eu-west-3.amazonaws.com/media/default/0001/06/thumb_5942_default_publication.jpeg",
  headneck: "https://iarc-publications-website.s3.eu-west-3.amazonaws.com/media/default/0001/08/thumb_7079_default_publication.jpeg",
  heme: "https://iarc-publications-website.s3.eu-west-3.amazonaws.com/media/default/0001/08/thumb_7168_default_publication.jpeg",
  skin: "https://iarc-publications-website.s3.eu-west-3.amazonaws.com/media/default/0001/08/thumb_7550_default_publication.jpg",
};

const sourceLinks = {
  poHome: { label: "PathologyOutlines", url: `${PO}/`, kind: "Nguồn học hình thái" },
  poColon: { label: "PathologyOutlines - Colon", url: `${PO}/colon.html`, kind: "Trang chuyên mục" },
  poColonAdenoma: { label: "PathologyOutlines - Colon adenoma", url: `${PO}/topic/colontumoradenoma.html`, kind: "Topic" },
  poColonAdenoca: { label: "PathologyOutlines - Colon adenocarcinoma", url: `${PO}/topic/colontumoradenocarcinoma.html`, kind: "Topic" },
  poMMR: { label: "PathologyOutlines - Mismatch repair", url: `${PO}/topic/colonmammalianmismatchrepair.html`, kind: "Topic" },
  poMSI: { label: "PathologyOutlines - Microsatellite instability", url: `${PO}/topic/colonmicrosatellite.html`, kind: "Topic" },
  poBreast: { label: "PathologyOutlines - Breast", url: `${PO}/breast.html`, kind: "Trang chuyên mục" },
  poBreastGrade: { label: "PathologyOutlines - Breast histologic grade", url: `${PO}/topic/breastmalignanthistologic.html`, kind: "Topic" },
  poLung: { label: "PathologyOutlines - Lung", url: `${PO}/lung.html`, kind: "Trang chuyên mục" },
  poLungAdenoca: { label: "PathologyOutlines - Lung adenocarcinoma", url: `${PO}/topic/lungtumoradenocarcinoma.html`, kind: "Topic" },
  poLungScc: { label: "PathologyOutlines - Lung squamous cell carcinoma", url: `${PO}/topic/lungtumorSCC.html`, kind: "Topic" },
  poLungSmallCell: { label: "PathologyOutlines - Small cell lung carcinoma", url: `${PO}/topic/lungtumorsmallcell.html`, kind: "Topic" },
  poLungWho: { label: "PathologyOutlines - WHO lung classification", url: `${PO}/topic/lungtumorWHO.html`, kind: "Topic" },
  poPDL1: { label: "PathologyOutlines - PD-L1", url: `${PO}/topic/stainsPDL1.html`, kind: "Topic" },
  poCervix: { label: "PathologyOutlines - Cervix", url: `${PO}/cervix.html`, kind: "Trang chuyên mục" },
  poFemale: { label: "PathologyOutlines - Female genital", url: `${PO}/femalegenital.html`, kind: "Trang chuyên mục" },
  poGU: { label: "PathologyOutlines - Genitourinary", url: `${PO}/genitourinary.html`, kind: "Trang chuyên mục" },
  poProstate: { label: "PathologyOutlines - Prostate", url: `${PO}/prostate.html`, kind: "Trang chuyên mục" },
  poSkin: { label: "PathologyOutlines - Skin tumors", url: `${PO}/skintumors.html`, kind: "Trang chuyên mục" },
  poHeme: { label: "PathologyOutlines - Hematopathology", url: `${PO}/hematopathology.html`, kind: "Trang chuyên mục" },
  poSoft: { label: "PathologyOutlines - Soft tissue", url: `${PO}/softtissue.html`, kind: "Trang chuyên mục" },
  poHeadNeck: { label: "PathologyOutlines - Head & neck", url: `${PO}/headneck.html`, kind: "Trang chuyên mục" },
  poCns: { label: "PathologyOutlines - CNS tumors", url: `${PO}/Cnstumor.html`, kind: "Trang chuyên mục" },
  whoOnline: { label: "WHO Classification Online", url: WHO_ONLINE, kind: "WHO/IARC" },
  whoDigestive: { label: "WHO Digestive System Tumours 2019", url: `${WHO}/Digestive-System-Tumours-2019`, kind: "WHO/IARC volume" },
  whoBreast: { label: "WHO Breast Tumours 2019", url: `${WHO}/Breast-Tumours-2019`, kind: "WHO/IARC volume" },
  whoThoracic: { label: "WHO Thoracic Tumours 2021", url: `${WHO}/Thoracic-Tumours-2021`, kind: "WHO/IARC volume" },
  whoFemale: { label: "WHO Female Genital Tumours 2020", url: `${WHO}/Female-Genital-Tumours-2020`, kind: "WHO/IARC volume" },
  whoGU: { label: "WHO Urinary and Male Genital Tumours 2022", url: `${WHO}/Urinary-And-Male-Genital-Tumours-2022`, kind: "WHO/IARC volume" },
  whoCNS: { label: "WHO CNS Tumours 2021", url: `${WHO}/Central-Nervous-System-Tumours-2021`, kind: "WHO/IARC volume" },
  whoSoft: { label: "WHO Soft Tissue and Bone Tumours 2020", url: `${WHO}/Soft-Tissue-And-Bone-Tumours-2020`, kind: "WHO/IARC volume" },
  whoHeadNeck: { label: "WHO Head and Neck Tumours 2024", url: `${WHO}/Head-And-Neck-Tumours-2024`, kind: "WHO/IARC volume" },
  whoHeme: { label: "WHO Haematolymphoid Tumours 2024", url: `${WHO}/Haematolymphoid-Tumours-2024`, kind: "WHO/IARC volume" },
  whoSkin: { label: "WHO Skin Tumours 2025", url: `${WHO}/Skin-Tumours-2025`, kind: "WHO/IARC volume" },
  cap: { label: "CAP Current Cancer Protocols", url: CAP, kind: "Checklist báo cáo" },
  nciReport: { label: "NCI - Pathology Reports", url: NCI_REPORT, kind: "Giải thích bệnh nhân/người học" },
};

const workflow = [
  ["Bắt đầu từ cơ quan", "Xác định vị trí bệnh phẩm rồi mở PathologyOutlines đúng chuyên mục."],
  ["Đọc tên u theo WHO", "Dùng WHO/IARC để chuẩn hóa tên, phân loại, grade và tiêu chuẩn chẩn đoán."],
  ["Tách hình thái chính", "Tìm pattern: loạn sản, in situ, xâm nhập, subtype, hoại tử, desmoplasia."],
  ["Rà checklist báo cáo", "Dùng CAP để kiểm kích thước, margin, LVI/PNI, hạch, stage và biomarker."],
  ["Đọc marker theo bối cảnh", "p16, p53, Ki-67, ER/PR/HER2, MMR/MSI chỉ có nghĩa khi gắn với cơ quan và loại u."],
  ["Mở ảnh tại nguồn", "Xem ảnh minh họa ngay trên PathologyOutlines hoặc WHO Online, không lấy ảnh trôi nổi."],
  ["Ghi lại bằng lời mình", "Tóm tắt 3 dòng: bệnh phẩm gì, chẩn đoán gì, yếu tố nào ảnh hưởng điều trị/theo dõi."],
];

const featured = [
  {
    title: "PathologyOutlines",
    subtitle: "Mở nhanh hình thái, IHC, differential",
    image: covers.digestive,
    href: sourceLinks.poHome.url,
  },
  {
    title: "WHO/IARC Blue Books",
    subtitle: "Chuẩn phân loại u theo cơ quan",
    image: covers.skin,
    href: WHO,
  },
  {
    title: "CAP Protocols",
    subtitle: "Checklist báo cáo ung thư hiện hành",
    image: covers.breast,
    href: CAP,
  },
  {
    title: "NCI Pathology Reports",
    subtitle: "Giải thích nền tảng dễ hiểu",
    image: covers.thoracic,
    href: NCI_REPORT,
  },
];

const organSystems = [
  {
    id: "digestive",
    code: "GI",
    name: "Tiêu hóa",
    count: "Colon, rectum, stomach, pancreas",
    accent: "#0a7a72",
    cover: covers.digestive,
    summary: "Ưu tiên đọc vị trí lấy mẫu, mức độ loạn sản, xâm nhập mô đệm, subtype và MMR/MSI khi là carcinoma đại trực tràng.",
    focus: ["Polyp/adenoma: low-grade hay high-grade dysplasia?", "Carcinoma: có xâm nhập, grade, margin, LVI/PNI, hạch?", "Đại trực tràng: có cần MMR/MSI hoặc molecular không?"],
    topicIds: ["colon-adenoma", "colon-adenocarcinoma", "mmr-msi"],
    links: ["poColon", "whoDigestive", "cap"],
  },
  {
    id: "breast",
    code: "BR",
    name: "Vú",
    count: "DCIS, invasive carcinoma, biomarkers",
    accent: "#eb5148",
    cover: covers.breast,
    summary: "Tách tổn thương in situ hay xâm nhập, loại mô học, grade, kích thước, margin, hạch và ER/PR/HER2.",
    focus: ["DCIS hay carcinoma xâm nhập?", "Grade mô học/Nottingham đã đủ thành phần chưa?", "ER, PR, HER2, Ki-67 và tình trạng hạch đã được ghi chưa?"],
    topicIds: ["breast-grade", "breast-carcinoma", "margin"],
    links: ["poBreast", "poBreastGrade", "whoBreast", "cap"],
  },
  {
    id: "thoracic",
    code: "LU",
    name: "Phổi - màng phổi",
    count: "NSCLC, small cell, PD-L1",
    accent: "#318ac4",
    cover: covers.thoracic,
    summary: "Xác định subtype carcinoma, phân biệt nguyên phát/di căn và kiểm biomarker điều trị đích khi phù hợp.",
    focus: ["Adenocarcinoma, squamous, small cell hay carcinoma khác?", "TTF-1, p40, neuroendocrine markers hỗ trợ ra sao?", "PD-L1, EGFR/ALK/ROS1 có được yêu cầu theo bối cảnh không?"],
    topicIds: ["lung-adenocarcinoma", "lung-squamous", "lung-small-cell", "pd-l1"],
    links: ["poLung", "poLungWho", "whoThoracic", "cap"],
  },
  {
    id: "female",
    code: "GYN",
    name: "Phụ khoa",
    count: "Cervix, endometrium, ovary",
    accent: "#9251b6",
    cover: covers.female,
    summary: "Gắn vị trí giải phẫu với HPV/p16, type mô học, độ xâm nhập, LVSI, margin và stage.",
    focus: ["Cổ tử cung, nội mạc tử cung hay buồng trứng?", "Tổn thương tiền ung thư hay xâm nhập?", "p16, p53, ER/PR hoặc MMR có vai trò trong bối cảnh này không?"],
    topicIds: ["p16-cervix", "p53", "stage"],
    links: ["poCervix", "poFemale", "whoFemale", "cap"],
  },
  {
    id: "gu",
    code: "GU",
    name: "Tiết niệu - nam khoa",
    count: "Prostate, bladder, kidney",
    accent: "#24b969",
    cover: covers.gu,
    summary: "Tuyến tiền liệt cần Gleason/Grade Group; bàng quang cần xâm nhập cơ; thận cần subtype và grade.",
    focus: ["Sinh thiết, TUR hay bệnh phẩm phẫu thuật cắt?", "Có xâm nhập cơ, vỏ, mạch máu hoặc margin không?", "Gleason/Grade Group, ISUP grade hoặc subtype đã rõ chưa?"],
    topicIds: ["gleason", "grade", "margin"],
    links: ["poGU", "poProstate", "whoGU", "cap"],
  },
  {
    id: "skin",
    code: "SK",
    name: "Da",
    count: "BCC, SCC, melanoma",
    accent: "#f59d18",
    cover: covers.skin,
    summary: "Da cần đọc loại u, độ sâu xâm nhập, ulceration, margin; melanoma cần Breslow, mitosis và satellitosis.",
    focus: ["U biểu mô, melanocytic hay lymphoid?", "Melanoma: Breslow, ulceration, mitosis, margin có đủ không?", "BCC/SCC: type nguy cơ cao và diện cắt đã rõ chưa?"],
    topicIds: ["breslow", "margin", "mitosis"],
    links: ["poSkin", "whoSkin", "cap"],
  },
  {
    id: "heme",
    code: "HE",
    name: "Huyết học - lympho",
    count: "Lymphoma, leukemia, CD markers",
    accent: "#0f9ab5",
    cover: covers.heme,
    summary: "Ghép hình thái, IHC/flow, di truyền, vị trí hạch và bối cảnh lâm sàng để phân loại lymphoma/leukemia.",
    focus: ["Tổn thương phản ứng hay lymphoma?", "Panel CD markers đủ để phân dòng chưa?", "Có cần flow, FISH, clonality hoặc molecular không?"],
    topicIds: ["ihc", "ki67", "eber"],
    links: ["poHeme", "whoHeme", "cap"],
  },
  {
    id: "cns",
    code: "CNS",
    name: "Thần kinh",
    count: "Glioma, meningioma, molecular",
    accent: "#6b5aa9",
    cover: covers.cns,
    summary: "CNS hiện đại dựa vào chẩn đoán tích hợp: mô học cộng IDH, ATRX, 1p/19q, p53 và các tiêu chuẩn phân tử.",
    focus: ["U thần kinh đệm, màng não, phôi thai hay di căn?", "IDH, ATRX, p53, 1p/19q có định hướng không?", "WHO grade và tiêu chuẩn phân tử đã đủ chưa?"],
    topicIds: ["idh", "1p19q", "grade"],
    links: ["poCns", "whoCNS", "cap"],
  },
  {
    id: "headneck",
    code: "HN",
    name: "Đầu cổ",
    count: "SCC, salivary, thyroid-adjacent",
    accent: "#5765c8",
    cover: covers.headneck,
    summary: "Luôn gắn với vị trí giải phẫu, HPV/EBV khi phù hợp, type mô học, DOI, PNI, margin và hạch cổ.",
    focus: ["Vị trí chính xác là gì?", "HPV/p16 hoặc EBV có liên quan không?", "PNI, LVI, DOI, margin và hạch cổ đã ghi chưa?"],
    topicIds: ["p16-cervix", "eber", "pni"],
    links: ["poHeadNeck", "whoHeadNeck", "cap"],
  },
  {
    id: "soft",
    code: "ST",
    name: "Mô mềm - xương",
    count: "Sarcoma, bone, fusion",
    accent: "#c45b8f",
    cover: covers.soft,
    summary: "Sarcoma cần type mô học, grade, hoại tử, mitosis, margin và đôi khi cần marker/fusion phân tử.",
    focus: ["Tổn thương lành, trung gian hay ác tính?", "Grade, hoại tử, mitosis và margin đã đủ chưa?", "Có cần IHC hoặc xét nghiệm fusion/molecular không?"],
    topicIds: ["grade", "necrosis", "mitosis"],
    links: ["poSoft", "whoSoft", "cap"],
  },
];

const topics = [
  {
    id: "colon-adenocarcinoma",
    organ: "digestive",
    titleVi: "Adenocarcinoma đại trực tràng",
    titleEn: "Colorectal adenocarcinoma",
    keywords: ["ung thư đại tràng", "ung thư trực tràng", "adenocarcinoma đại tràng", "colorectal cancer", "colon adenocarcinoma", "rectal adenocarcinoma", "desmoplasia", "dirty necrosis"],
    summary: "Khi đọc báo cáo, hãy xác định có xâm nhập thật sự không, grade/subtype, độ lan tại chỗ, margin, LVI/PNI, hạch và chỉ định MMR/MSI.",
    links: ["poColonAdenoca", "poColon", "whoDigestive", "cap"],
    imageLinks: ["poColonAdenoca", "whoOnline"],
  },
  {
    id: "colon-adenoma",
    organ: "digestive",
    titleVi: "Adenoma/loạn sản đại trực tràng",
    titleEn: "Colorectal adenoma and dysplasia",
    keywords: ["adenoma", "polyp", "loạn sản", "dysplasia", "low grade", "high grade", "đại tràng", "colon polyp"],
    summary: "Điểm cần bám là type polyp, mức độ loạn sản, có nghi xâm nhập không và tình trạng cắt trọn khi là polypectomy.",
    links: ["poColonAdenoma", "poColon", "whoDigestive"],
    imageLinks: ["poColonAdenoma"],
  },
  {
    id: "mmr-msi",
    organ: "digestive",
    titleVi: "MMR/MSI trong carcinoma đại trực tràng",
    titleEn: "Mismatch repair and microsatellite instability",
    keywords: ["MMR", "MSI", "MLH1", "MSH2", "MSH6", "PMS2", "Lynch", "microsatellite", "mismatch repair", "đại trực tràng"],
    summary: "MMR/MSI là nhóm thông tin biomarker cần đọc theo bối cảnh carcinoma, có thể ảnh hưởng sàng lọc Lynch và điều trị miễn dịch.",
    links: ["poMMR", "poMSI", "whoDigestive", "cap"],
    imageLinks: ["poMMR", "poMSI"],
  },
  {
    id: "lung-adenocarcinoma",
    organ: "thoracic",
    titleVi: "Adenocarcinoma phổi",
    titleEn: "Lung adenocarcinoma",
    keywords: ["adenocarcinoma phổi", "lung adenocarcinoma", "TTF-1", "Napsin A", "lepidic", "acinar", "papillary", "solid"],
    summary: "Cần xác định subtype/pattern, phân biệt nguyên phát hay di căn, và kiểm biomarker điều trị đích khi phù hợp.",
    links: ["poLungAdenoca", "poLung", "poLungWho", "whoThoracic", "cap"],
    imageLinks: ["poLungAdenoca", "whoOnline"],
  },
  {
    id: "lung-squamous",
    organ: "thoracic",
    titleVi: "Carcinoma tế bào gai phổi",
    titleEn: "Lung squamous cell carcinoma",
    keywords: ["carcinoma gai phổi", "lung squamous", "squamous cell carcinoma", "p40", "p63", "CK5/6", "keratinization"],
    summary: "Đọc hình thái gai/sừng hóa khi có, đối chiếu p40/p63/CK5/6 và phân biệt với adenocarcinoma hoặc di căn.",
    links: ["poLungScc", "poLung", "poLungWho", "whoThoracic", "cap"],
    imageLinks: ["poLungScc"],
  },
  {
    id: "lung-small-cell",
    organ: "thoracic",
    titleVi: "Carcinoma tế bào nhỏ phổi",
    titleEn: "Small cell lung carcinoma",
    keywords: ["small cell", "tế bào nhỏ", "neuroendocrine", "synaptophysin", "chromogranin", "INSM1", "phổi"],
    summary: "Tập trung vào hình thái tế bào nhỏ, necrosis/mitosis cao và marker neuroendocrine trong bối cảnh phù hợp.",
    links: ["poLungSmallCell", "poLung", "whoThoracic", "cap"],
    imageLinks: ["poLungSmallCell"],
  },
  {
    id: "pd-l1",
    organ: "thoracic",
    titleVi: "PD-L1 trong ung thư phổi",
    titleEn: "PD-L1 immunohistochemistry",
    keywords: ["PD-L1", "PDL1", "22C3", "SP263", "SP142", "TPS", "CPS", "lung biomarker", "miễn dịch trị liệu"],
    summary: "PD-L1 cần đọc theo clone, cách chấm điểm và loại u; không tách khỏi bối cảnh điều trị và hướng dẫn xét nghiệm.",
    links: ["poPDL1", "poLung", "whoThoracic", "cap"],
    imageLinks: ["poPDL1"],
  },
  {
    id: "breast-grade",
    organ: "breast",
    titleVi: "Grade mô học ung thư vú",
    titleEn: "Breast histologic grade",
    keywords: ["breast grade", "Nottingham", "Elston Ellis", "tubule", "pleomorphism", "mitosis", "grade vú"],
    summary: "Grade vú thường dựa trên tạo ống, đa hình nhân và mitosis; cần đọc cùng type, kích thước, margin, hạch và biomarker.",
    links: ["poBreastGrade", "poBreast", "whoBreast", "cap"],
    imageLinks: ["poBreastGrade", "whoOnline"],
  },
  {
    id: "breast-carcinoma",
    organ: "breast",
    titleVi: "Carcinoma vú và biomarker",
    titleEn: "Breast carcinoma and biomarkers",
    keywords: ["carcinoma vú", "breast carcinoma", "DCIS", "IDC", "ILC", "ER", "PR", "HER2", "Ki-67", "sentinel lymph node"],
    summary: "Tách in situ/xâm nhập, type mô học, grade, kích thước, margin, hạch; ER/PR/HER2 là bộ thông tin cốt lõi.",
    links: ["poBreast", "whoBreast", "cap"],
    imageLinks: ["poBreast", "whoOnline"],
  },
  {
    id: "p16-cervix",
    organ: "female",
    titleVi: "p16/HPV trong cổ tử cung và đầu cổ",
    titleEn: "p16 and HPV-associated lesions",
    keywords: ["p16", "HPV", "HSIL", "CIN", "cổ tử cung", "oropharynx", "đầu cổ", "squamous"],
    summary: "p16 là marker rất phụ thuộc bối cảnh: thường quan trọng trong tổn thương liên quan HPV, nhưng không được diễn giải giống nhau ở mọi cơ quan.",
    links: ["poCervix", "poHeadNeck", "whoFemale", "whoHeadNeck", "cap"],
    imageLinks: ["poCervix", "poHeadNeck"],
  },
  {
    id: "gleason",
    organ: "gu",
    titleVi: "Gleason/Grade Group tuyến tiền liệt",
    titleEn: "Prostate Gleason score and Grade Group",
    keywords: ["Gleason", "Grade Group", "prostate", "tuyến tiền liệt", "acinus", "cribriform", "ISUP"],
    summary: "Với ung thư tuyến tiền liệt, cần đọc pattern Gleason, Grade Group, số core dương tính, tỷ lệ u và các yếu tố xâm nhập/margin khi là bệnh phẩm cắt.",
    links: ["poProstate", "poGU", "whoGU", "cap"],
    imageLinks: ["poProstate", "whoOnline"],
  },
  {
    id: "breslow",
    organ: "skin",
    titleVi: "Breslow trong melanoma",
    titleEn: "Breslow thickness in melanoma",
    keywords: ["Breslow", "melanoma", "hắc tố", "ulceration", "mitosis", "satellitosis", "Clark"],
    summary: "Breslow là độ dày u tính bằng mm trong melanoma; cần đọc cùng ulceration, mitosis, margin và các yếu tố staging khác.",
    links: ["poSkin", "whoSkin", "cap"],
    imageLinks: ["poSkin", "whoOnline"],
  },
  {
    id: "ihc",
    organ: "heme",
    titleVi: "HMMD/IHC",
    titleEn: "Immunohistochemistry",
    keywords: ["HMMD", "hóa mô miễn dịch", "IHC", "immunohistochemistry", "CD", "marker", "kháng thể"],
    summary: "IHC dùng kháng thể để hỗ trợ phân dòng, xác định nguồn gốc hoặc biomarker; ý nghĩa luôn phụ thuộc panel và hình thái.",
    links: ["poHome", "cap", "nciReport"],
    imageLinks: ["poHome"],
  },
  {
    id: "ki67",
    organ: "heme",
    titleVi: "Ki-67",
    titleEn: "Ki-67 proliferation index",
    keywords: ["Ki-67", "ki67", "proliferation", "tăng sinh", "mitotic", "lymphoma", "breast"],
    summary: "Ki-67 phản ánh hoạt tính tăng sinh nhưng ngưỡng và ý nghĩa khác nhau theo loại u; không dùng một mình để kết luận.",
    links: ["poBreast", "poHeme", "whoHeme", "cap"],
    imageLinks: ["poBreast", "poHeme"],
  },
  {
    id: "eber",
    organ: "headneck",
    titleVi: "EBER/EBV",
    titleEn: "EBER in situ hybridization",
    keywords: ["EBER", "EBV", "nasopharyngeal carcinoma", "NK/T", "lymphoma", "vòm", "đầu cổ"],
    summary: "EBER hỗ trợ phát hiện EBV trong một số carcinoma đầu cổ và lymphoma; đọc cùng hình thái và panel marker.",
    links: ["poHeadNeck", "poHeme", "whoHeadNeck", "whoHeme"],
    imageLinks: ["poHeadNeck", "poHeme"],
  },
  {
    id: "idh",
    organ: "cns",
    titleVi: "IDH trong u thần kinh đệm",
    titleEn: "IDH in gliomas",
    keywords: ["IDH", "glioma", "astrocytoma", "oligodendroglioma", "CNS", "u thần kinh đệm"],
    summary: "IDH là thông tin phân tử cốt lõi trong nhiều u thần kinh đệm; cần đọc cùng 1p/19q, ATRX, p53 và WHO grade.",
    links: ["poCns", "whoCNS", "cap"],
    imageLinks: ["poCns", "whoOnline"],
  },
  {
    id: "1p19q",
    organ: "cns",
    titleVi: "1p/19q",
    titleEn: "1p/19q codeletion",
    keywords: ["1p/19q", "1p19q", "oligodendroglioma", "codeletion", "CNS"],
    summary: "Đồng mất đoạn 1p/19q là tiêu chí quan trọng trong chẩn đoán oligodendroglioma khi đi cùng IDH-mutant.",
    links: ["poCns", "whoCNS"],
    imageLinks: ["poCns", "whoOnline"],
  },
  {
    id: "margin",
    organ: "general",
    titleVi: "Margin/diện cắt",
    titleEn: "Surgical margin",
    keywords: ["margin", "diện cắt", "bờ cắt", "positive margin", "negative margin", "inked margin"],
    summary: "Margin cho biết u còn sát hoặc chạm bờ phẫu thuật hay không; đây là mục CAP thường yêu cầu trong nhiều protocol ung thư.",
    links: ["cap", "nciReport"],
    imageLinks: ["cap"],
  },
  {
    id: "grade",
    organ: "general",
    titleVi: "Grade",
    titleEn: "Histologic grade",
    keywords: ["grade", "độ mô học", "độ biệt hóa", "histologic grade", "well differentiated", "poorly differentiated"],
    summary: "Grade nói về mức độ ác tính/biệt hóa của u, khác với stage; cách chấm grade thay đổi theo từng loại u.",
    links: ["poBreastGrade", "cap", "nciReport"],
    imageLinks: ["poBreastGrade"],
  },
  {
    id: "stage",
    organ: "general",
    titleVi: "Stage/TNM",
    titleEn: "Stage and TNM",
    keywords: ["stage", "TNM", "pT", "pN", "pM", "giai đoạn", "staging", "hạch", "di căn"],
    summary: "Stage mô tả mức độ lan của bệnh, thường dựa trên u nguyên phát, hạch vùng và di căn xa; cần bệnh phẩm/Thông tin đủ.",
    links: ["cap", "nciReport"],
    imageLinks: ["cap"],
  },
  {
    id: "pni",
    organ: "general",
    titleVi: "PNI",
    titleEn: "Perineural invasion",
    keywords: ["PNI", "xâm nhập thần kinh", "perineural", "nerve invasion"],
    summary: "PNI là xâm nhập quanh hoặc trong dây thần kinh; có ý nghĩa nguy cơ trong nhiều ung thư, đặc biệt khi protocol yêu cầu báo cáo.",
    links: ["cap", "poHeadNeck", "poProstate"],
    imageLinks: ["poHeadNeck", "poProstate"],
  },
  {
    id: "lvi",
    organ: "general",
    titleVi: "LVI",
    titleEn: "Lymphovascular invasion",
    keywords: ["LVI", "lymphovascular", "xâm nhập mạch", "mạch máu", "mạch bạch huyết", "vascular invasion"],
    summary: "LVI là u trong mạch máu hoặc mạch bạch huyết; thường liên quan nguy cơ hạch/di căn và có mặt trong nhiều checklist CAP.",
    links: ["cap", "nciReport"],
    imageLinks: ["cap"],
  },
  {
    id: "necrosis",
    organ: "general",
    titleVi: "Hoại tử",
    titleEn: "Tumour necrosis",
    keywords: ["hoại tử", "necrosis", "dirty necrosis", "comedonecrosis", "tumor necrosis"],
    summary: "Hoại tử là vùng mô chết trong u; ý nghĩa khác nhau theo loại u, có thể tham gia grade hoặc gợi ý pattern.",
    links: ["poColonAdenoca", "poBreast", "poSoft", "cap"],
    imageLinks: ["poColonAdenoca", "poBreast", "poSoft"],
  },
  {
    id: "mitosis",
    organ: "general",
    titleVi: "Mitosis/phân bào",
    titleEn: "Mitotic activity",
    keywords: ["mitosis", "mitotic", "phân bào", "HPF", "mm2", "mitotic rate"],
    summary: "Số phân bào phản ánh hoạt động tăng sinh; đơn vị đếm và vai trò khác nhau giữa breast, melanoma, sarcoma, GIST và lymphoma.",
    links: ["poBreastGrade", "poSkin", "poSoft", "cap"],
    imageLinks: ["poBreastGrade", "poSkin", "poSoft"],
  },
  {
    id: "p53",
    organ: "general",
    titleVi: "p53",
    titleEn: "p53 immunohistochemistry",
    keywords: ["p53", "TP53", "aberrant", "wild-type", "serous", "endometrial", "ovarian"],
    summary: "p53 có kiểu biểu hiện hỗ trợ định hướng bất thường TP53 trong một số u, nhưng cách diễn giải phụ thuộc cơ quan và pattern nhuộm.",
    links: ["poFemale", "whoFemale", "cap"],
    imageLinks: ["poFemale", "whoOnline"],
  },
];

const termCards = [
  ["Đại thể", "gross", "Mô tả bệnh phẩm bằng mắt thường: kích thước, số mảnh, vị trí u, diện cắt và cách lấy mẫu.", ["nciReport", "cap"]],
  ["Vi thể", "microscopic", "Mô tả hình ảnh dưới kính hiển vi, là phần giải thích cơ sở của kết luận.", ["nciReport", "poHome"]],
  ["H&E", "hematoxylin eosin", "Nhuộm nền tảng để quan sát cấu trúc mô, nhân tế bào và mô đệm.", ["poHome"]],
  ["Loạn sản", "dysplasia", "Biến đổi tiền ung thư của biểu mô; đọc mức độ thấp/cao và có xâm nhập hay chưa.", ["poColonAdenoma", "poCervix", "whoDigestive"]],
  ["Carcinoma in situ", "in situ", "Tế bào ác tính còn khu trú trong biểu mô, chưa xâm nhập mô đệm.", ["poBreast", "poCervix", "cap"]],
  ["Xâm nhập", "invasion invasive", "U vượt cấu trúc giới hạn bình thường vào mô xung quanh, thường ảnh hưởng điều trị và staging.", ["cap", "nciReport"]],
  ["Grade", "histologic grade độ mô học", "Độ biệt hóa/độ ác tính mô học; cách chấm khác nhau theo từng loại u.", ["poBreastGrade", "cap"]],
  ["Stage/TNM", "pT pN pM staging", "Giai đoạn dựa trên u nguyên phát, hạch vùng và di căn xa.", ["cap", "nciReport"]],
  ["Margin/diện cắt", "bờ cắt surgical margin", "Bờ phẫu thuật còn u hay không; đọc cùng loại phẫu thuật và mực đánh dấu.", ["cap", "nciReport"]],
  ["LVI", "lymphovascular invasion", "Xâm nhập mạch máu hoặc mạch bạch huyết.", ["cap"]],
  ["PNI", "perineural invasion", "Xâm nhập quanh dây thần kinh, quan trọng trong nhiều ung thư đầu cổ, tụy, tiền liệt tuyến.", ["cap", "poHeadNeck"]],
  ["Hoại tử", "necrosis", "Vùng mô chết trong u; có thể liên quan grade, type u hoặc đáp ứng điều trị.", ["poColonAdenoca", "poSoft", "cap"]],
  ["Mitosis", "mitotic activity phân bào", "Số phân bào; cách đếm và ý nghĩa phụ thuộc loại u.", ["poBreastGrade", "poSkin", "cap"]],
  ["HMMD/IHC", "immunohistochemistry", "Dùng kháng thể để hỗ trợ phân dòng, nguồn gốc hoặc biomarker điều trị.", ["poHome", "cap"]],
  ["Ki-67", "ki67 proliferation", "Marker tăng sinh; đọc theo bối cảnh, không dùng đơn độc.", ["poBreast", "poHeme", "cap"]],
  ["p16", "HPV CIN HSIL oropharynx", "Marker phụ thuộc bối cảnh, thường liên quan HPV ở một số vị trí.", ["poCervix", "poHeadNeck", "whoFemale"]],
  ["p53", "TP53", "Kiểu biểu hiện hỗ trợ định hướng bất thường TP53 trong một số u.", ["poFemale", "whoFemale"]],
  ["MMR/MSI", "MLH1 MSH2 MSH6 PMS2 microsatellite", "Hệ sửa lỗi bắt cặp DNA; quan trọng trong đại trực tràng và một số nhóm u khác.", ["poMMR", "poMSI", "whoDigestive"]],
  ["ER/PR/HER2", "breast biomarkers", "Bộ biomarker then chốt trong carcinoma vú.", ["poBreast", "whoBreast", "cap"]],
  ["Gleason/Grade Group", "prostate", "Hệ thống grade của ung thư tuyến tiền liệt.", ["poProstate", "whoGU", "cap"]],
  ["Breslow", "melanoma thickness", "Độ dày melanoma tính bằng mm, yếu tố staging quan trọng.", ["poSkin", "whoSkin", "cap"]],
  ["Synoptic report", "checklist protocol", "Báo cáo dạng checklist giúp không bỏ sót yếu tố quan trọng.", ["cap"]],
  ["Desmoplasia", "stromal reaction", "Phản ứng mô đệm xơ quanh u xâm nhập, hay gặp trong carcinoma.", ["poColonAdenoca"]],
  ["Dirty necrosis", "necrosis colon", "Hoại tử bẩn trong lòng tuyến là pattern thường gặp khi học adenocarcinoma đại trực tràng.", ["poColonAdenoca"]],
  ["TTF-1", "lung thyroid marker", "Marker hỗ trợ nguồn gốc phổi/tuyến giáp tùy bối cảnh.", ["poLungAdenoca", "poLung"]],
  ["p40", "squamous marker", "Marker hỗ trợ biệt hóa gai, thường dùng trong carcinoma phổi.", ["poLungScc"]],
  ["EBER", "EBV ISH", "ISH phát hiện EBV, hữu ích trong một số lymphoma và carcinoma đầu cổ.", ["poHeadNeck", "poHeme", "whoHeme"]],
  ["SOX10", "melanocytic neural crest", "Marker hỗ trợ melanocytic và một số u nguồn gốc thần kinh.", ["poSkin"]],
  ["1p/19q", "oligodendroglioma codeletion", "Đồng mất đoạn quan trọng trong phân loại oligodendroglioma.", ["poCns", "whoCNS"]],
  ["IDH", "glioma", "Marker/phân tử quan trọng trong u thần kinh đệm.", ["poCns", "whoCNS"]],
].map(([title, aliases, explanation, links]) => ({
  title,
  aliases: String(aliases).split(" "),
  explanation,
  links,
}));

const sourceCards = [
  {
    title: "PathologyOutlines",
    kind: "Official pathology reference",
    note: "Dùng để đọc nhanh từng bệnh, hình thái vi thể, IHC, differential diagnosis và hình minh họa ngay trong topic.",
    link: sourceLinks.poHome.url,
  },
  {
    title: "WHO Classification of Tumours Online",
    kind: "WHO/IARC",
    note: "Nguồn phân loại u theo WHO. Nội dung đăng nhập có bản quyền nên website này chỉ dẫn link, không sao chép.",
    link: WHO_ONLINE,
  },
  {
    title: "IARC WHO Blue Books",
    kind: "Public volume pages",
    note: "Trang công khai của từng volume WHO, dùng để chọn đúng hệ cơ quan và năm xuất bản.",
    link: WHO,
  },
  {
    title: "CAP Current Cancer Protocols",
    kind: "Reporting checklists",
    note: "Nguồn để rà các yếu tố bắt buộc trong báo cáo ung thư theo protocol hiện hành.",
    link: CAP,
  },
  {
    title: "NCI Pathology Reports",
    kind: "Patient/learner guide",
    note: "Nguồn dễ đọc để hiểu báo cáo GPB gồm những phần gì và vì sao báo cáo quan trọng.",
    link: NCI_REPORT,
  },
];

const els = {
  featuredGrid: document.getElementById("featuredGrid"),
  categoryGrid: document.getElementById("categoryGrid"),
  organDetail: document.getElementById("organDetail"),
  workflowList: document.getElementById("workflowList"),
  sourceSearch: document.getElementById("sourceSearch"),
  runSourceSearch: document.getElementById("runSourceSearch"),
  clearSourceSearch: document.getElementById("clearSourceSearch"),
  quickSearches: document.getElementById("quickSearches"),
  sourceResults: document.getElementById("sourceResults"),
  atlasGrid: document.getElementById("atlasGrid"),
  atlasSearch: document.getElementById("atlasSearch"),
  systemGrid: document.getElementById("systemGrid"),
  systemSearch: document.getElementById("systemSearch"),
  termGrid: document.getElementById("termGrid"),
  termSearch: document.getElementById("termSearch"),
  termDetail: document.getElementById("termDetail"),
  sourceGrid: document.getElementById("sourceGrid"),
  statCategories: document.getElementById("statCategories"),
  statAtlas: document.getElementById("statAtlas"),
  statTerms: document.getElementById("statTerms"),
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

function linkObject(key) {
  return sourceLinks[key] || key;
}

function renderLinks(keys, className = "link-row") {
  return `<div class="${className}">${keys
    .map((key) => {
      const item = linkObject(key);
      return `<a href="${escapeHtml(item.url)}" target="_blank" rel="noreferrer"><span>${escapeHtml(item.kind)}</span>${escapeHtml(item.label)} ↗</a>`;
    })
    .join("")}</div>`;
}

function topicSearchText(topic) {
  const organ = organSystems.find((item) => item.id === topic.organ);
  return normalize([
    topic.titleVi,
    topic.titleEn,
    topic.summary,
    topic.keywords.join(" "),
    organ?.name,
    organ?.code,
  ].join(" "));
}

function getTopics(query = "") {
  const q = normalize(query).trim();
  if (!q) return topics.slice(0, 8);
  return topics.filter((topic) => topicSearchText(topic).includes(q));
}

function renderFeatured() {
  els.featuredGrid.innerHTML = featured
    .map((item) => `
      <a class="featured-card" href="${escapeHtml(item.href)}" target="_blank" rel="noreferrer" style="--image:url('${escapeHtml(item.image)}')">
        <strong>${escapeHtml(item.title)}</strong>
        <span>${escapeHtml(item.subtitle)} ↗</span>
      </a>
    `)
    .join("");
}

function renderCategories(activeId = organSystems[0].id) {
  els.categoryGrid.innerHTML = organSystems
    .map((item) => `
      <button class="category-card ${item.id === activeId ? "active" : ""}" type="button" data-organ="${escapeHtml(item.id)}" style="--image:url('${escapeHtml(item.cover)}'); --accent:${escapeHtml(item.accent)}; --accent-soft:${escapeHtml(item.accent)}55">
        <span class="category-icon">${escapeHtml(item.code)}</span>
        <div>
          <h3>${escapeHtml(item.name)}</h3>
          <p>${escapeHtml(item.summary)}</p>
        </div>
        <div class="category-meta">
          <span>${escapeHtml(item.count)}</span>
          <span>Xem nguồn →</span>
        </div>
      </button>
    `)
    .join("");

  document.querySelectorAll("[data-organ]").forEach((button) => {
    button.addEventListener("click", () => renderOrganDetail(button.dataset.organ));
  });

  renderOrganDetail(activeId);
}

function renderOrganDetail(id) {
  const item = organSystems.find((organ) => organ.id === id) || organSystems[0];
  document.querySelectorAll("[data-organ]").forEach((button) => {
    button.classList.toggle("active", button.dataset.organ === item.id);
  });

  const related = topics.filter((topic) => item.topicIds.includes(topic.id));
  els.organDetail.innerHTML = `
    <div class="detail-visual" style="--image:url('${escapeHtml(item.cover)}')">
      <span>${escapeHtml(item.code)}</span>
    </div>
    <div class="detail-copy">
      <span class="eyebrow">Đang học: ${escapeHtml(item.name)}</span>
      <h3>${escapeHtml(item.name)}</h3>
      <p>${escapeHtml(item.summary)}</p>
      <ul class="mini-list">${item.focus.map((focus) => `<li>${escapeHtml(focus)}</li>`).join("")}</ul>
      <div class="chip-row">${related.map((topic) => `<button class="mini-chip" type="button" data-topic="${escapeHtml(topic.id)}">${escapeHtml(topic.titleVi)}</button>`).join("")}</div>
      ${renderLinks(item.links)}
    </div>
  `;

  els.organDetail.querySelectorAll("[data-topic]").forEach((button) => {
    button.addEventListener("click", () => {
      els.sourceSearch.value = topics.find((topic) => topic.id === button.dataset.topic)?.titleVi || "";
      renderSourceResults();
      document.getElementById("reader").scrollIntoView({ behavior: "smooth" });
    });
  });
}

function renderWorkflow() {
  els.workflowList.innerHTML = workflow
    .map(([title, detail]) => `<li><strong>${escapeHtml(title)}</strong><span>${escapeHtml(detail)}</span></li>`)
    .join("");
}

function renderQuickSearches() {
  const quick = ["adenocarcinoma đại tràng", "MMR MSI", "lung squamous", "PD-L1", "breast grade", "p16", "Gleason", "Breslow", "IDH 1p/19q", "margin"];
  els.quickSearches.innerHTML = quick
    .map((term) => `<button type="button" class="mini-chip" data-query="${escapeHtml(term)}">${escapeHtml(term)}</button>`)
    .join("");
  els.quickSearches.querySelectorAll("[data-query]").forEach((button) => {
    button.addEventListener("click", () => {
      els.sourceSearch.value = button.dataset.query;
      renderSourceResults();
    });
  });
}

function renderSourceResults() {
  const query = els.sourceSearch.value;
  const matches = getTopics(query);

  if (!matches.length) {
    els.sourceResults.innerHTML = `
      <div class="empty-state">
        Chưa có mục khớp trong thư viện link đã xác minh. Hãy thử từ khóa rộng hơn như tên cơ quan
        hoặc mở trực tiếp PathologyOutlines/WHO bằng các nguồn ở cuối trang.
      </div>
    `;
    return;
  }

  els.sourceResults.innerHTML = matches
    .map((topic) => {
      const organ = organSystems.find((item) => item.id === topic.organ);
      return `
        <article class="result-card">
          <div>
            <span class="tag">${escapeHtml(organ?.name || "Tổng quát")}</span>
            <h3>${escapeHtml(topic.titleVi)}</h3>
            <p class="english-title">${escapeHtml(topic.titleEn)}</p>
            <p>${escapeHtml(topic.summary)}</p>
          </div>
          <div class="keyword-row">${topic.keywords.slice(0, 8).map((word) => `<span>${escapeHtml(word)}</span>`).join("")}</div>
          <h4>Nguồn chính thức</h4>
          ${renderLinks(topic.links)}
          <h4>Nơi mở ảnh/hình minh họa</h4>
          ${renderLinks(topic.imageLinks, "link-row image-links")}
        </article>
      `;
    })
    .join("");
}

function renderAtlas() {
  const query = normalize(els.atlasSearch.value);
  const atlasItems = topics.filter((topic) => topic.imageLinks?.length);
  const filtered = atlasItems.filter((topic) => {
    const organ = organSystems.find((item) => item.id === topic.organ);
    return normalize([topic.titleVi, topic.titleEn, topic.keywords.join(" "), organ?.name].join(" ")).includes(query);
  });

  if (!filtered.length) {
    els.atlasGrid.innerHTML = `<div class="empty-state">Không thấy nguồn ảnh phù hợp. Thử từ khóa rộng hơn: colon, breast, lung, skin, lymphoma.</div>`;
    return;
  }

  els.atlasGrid.innerHTML = filtered
    .map((topic) => {
      const organ = organSystems.find((item) => item.id === topic.organ) || organSystems[0];
      return `
        <article class="atlas-card atlas-source-card">
          <img src="${escapeHtml(organ.cover)}" alt="${escapeHtml(organ.name)} WHO cover" loading="lazy" />
          <div class="atlas-body">
            <span class="tag">${escapeHtml(organ.name)}</span>
            <h3>${escapeHtml(topic.titleVi)}</h3>
            <p>${escapeHtml(topic.summary)}</p>
            ${renderLinks(topic.imageLinks, "link-row compact-links")}
          </div>
        </article>
      `;
    })
    .join("");
}

function renderSystems() {
  const query = normalize(els.systemSearch.value);
  const filtered = topics.filter((topic) => topicSearchText(topic).includes(query));

  if (!filtered.length) {
    els.systemGrid.innerHTML = `<div class="empty-state">Không thấy topic phù hợp. Thử từ khóa như MMR, p16, margin, carcinoma, breast.</div>`;
    return;
  }

  els.systemGrid.innerHTML = filtered
    .map((topic) => {
      const organ = organSystems.find((item) => item.id === topic.organ);
      return `
        <article class="system-card">
          <div>
            <span class="tag">${escapeHtml(organ?.code || "GEN")}</span>
            <h3>${escapeHtml(topic.titleVi)}</h3>
            <p class="english-title">${escapeHtml(topic.titleEn)}</p>
            <p>${escapeHtml(topic.summary)}</p>
          </div>
          <div class="chip-row">${topic.keywords.slice(0, 6).map((key) => `<span class="tag">${escapeHtml(key)}</span>`).join("")}</div>
          ${renderLinks(topic.links)}
        </article>
      `;
    })
    .join("");
}

function renderTerms(activeTitle = "Margin/diện cắt") {
  const query = normalize(els.termSearch.value);
  const filtered = termCards.filter((term) => normalize([term.title, term.aliases.join(" "), term.explanation].join(" ")).includes(query));

  if (!filtered.length) {
    els.termGrid.innerHTML = `<div class="empty-state">Không có thuật ngữ phù hợp.</div>`;
    els.termDetail.innerHTML = "";
    return;
  }

  els.termGrid.innerHTML = filtered
    .map((term) => `
      <button class="term-card ${term.title === activeTitle ? "active" : ""}" type="button" data-term="${escapeHtml(term.title)}">
        <strong>${escapeHtml(term.title)}</strong>
        <p>${escapeHtml(term.explanation)}</p>
      </button>
    `)
    .join("");

  const selected = filtered.find((term) => term.title === activeTitle) || filtered[0];
  renderTermDetail(selected);

  els.termGrid.querySelectorAll("[data-term]").forEach((button) => {
    button.addEventListener("click", () => {
      const term = termCards.find((item) => item.title === button.dataset.term);
      renderTermDetail(term);
      els.termGrid.querySelectorAll(".term-card").forEach((card) => card.classList.toggle("active", card === button));
    });
  });
}

function renderTermDetail(term) {
  if (!term) return;
  const aliases = term.aliases.filter(Boolean);
  els.termDetail.innerHTML = `
    <div class="detail-copy">
      <span class="eyebrow">Thuật ngữ đang mở</span>
      <h3>${escapeHtml(term.title)}</h3>
      <p>${escapeHtml(term.explanation)}</p>
      <div class="keyword-row">${aliases.map((alias) => `<span>${escapeHtml(alias)}</span>`).join("")}</div>
      <h4>Nguồn trích dẫn/đối chiếu</h4>
      ${renderLinks(term.links)}
      <p class="source-note">Mở các link trên để xem định nghĩa, checklist hoặc hình minh họa tại nguồn chính thức.</p>
    </div>
  `;
}

function renderSources() {
  els.sourceGrid.innerHTML = sourceCards
    .map((item) => `
      <article class="source-card">
        <span class="tag">${escapeHtml(item.kind)}</span>
        <h3>${escapeHtml(item.title)}</h3>
        <p>${escapeHtml(item.note)}</p>
        <a href="${escapeHtml(item.link)}" target="_blank" rel="noreferrer">Mở nguồn ↗</a>
      </article>
    `)
    .join("");
}

function bindEvents() {
  els.runSourceSearch.addEventListener("click", renderSourceResults);
  els.clearSourceSearch.addEventListener("click", () => {
    els.sourceSearch.value = "";
    renderSourceResults();
    els.sourceSearch.focus();
  });
  els.sourceSearch.addEventListener("input", renderSourceResults);
  els.atlasSearch.addEventListener("input", renderAtlas);
  els.systemSearch.addEventListener("input", renderSystems);
  els.termSearch.addEventListener("input", () => renderTerms());
}

function initStats() {
  els.statCategories.textContent = String(organSystems.length);
  els.statAtlas.textContent = String(topics.filter((topic) => topic.imageLinks?.length).length);
  els.statTerms.textContent = `${termCards.length}+`;
}

function init() {
  initStats();
  renderFeatured();
  renderCategories();
  renderWorkflow();
  renderQuickSearches();
  renderSourceResults();
  renderAtlas();
  renderSystems();
  renderTerms();
  renderSources();
  bindEvents();
}

init();
