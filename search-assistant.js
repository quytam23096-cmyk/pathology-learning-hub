(function () {
  "use strict";

  function normalize(value) {
    return String(value || "")
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/đ/g, "d")
      .replace(/[^a-z0-9+.-]+/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  }

  const stopWords = new Set([
    "bao", "bi", "ca", "cai", "can", "chan", "co", "doan", "duoc", "gi", "hinh", "khong",
    "la", "mot", "nay", "nhin", "o", "qua", "te", "thay", "thi", "tren", "va", "voi",
  ]);

  const organOptions = [
    { id: "all", label: "Tất cả cơ quan", group: "Tổng quan", chapters: [], whoVolumes: [], webOrgans: [], terms: [] },
    { id: "thyroid", label: "Tuyến giáp", group: "Nội tiết", chapters: ["thyroid"], whoVolumes: ["book-53"], webOrgans: ["endocrine"], terms: ["thyroid"] },
    { id: "parathyroid", label: "Tuyến cận giáp", group: "Nội tiết", chapters: ["thyroid"], whoVolumes: ["book-53"], webOrgans: ["endocrine"], terms: ["parathyroid"] },
    { id: "pituitary", label: "Tuyến yên", group: "Nội tiết", chapters: ["cns", "thyroid"], whoVolumes: ["book-53", "book-45"], webOrgans: ["endocrine", "neuropath"], terms: ["pituitary", "sellar"] },
    { id: "adrenal", label: "Tuyến thượng thận / cận hạch", group: "Nội tiết", chapters: ["thyroid", "gu"], whoVolumes: ["book-53"], webOrgans: ["endocrine"], terms: ["adrenal", "paraganglia", "paraganglioma", "pheochromocytoma"] },
    { id: "lung", label: "Phổi", group: "Lồng ngực", chapters: ["lung"], whoVolumes: ["book-35", "book-48"], webOrgans: ["pulmonary", "cytopathology"], terms: ["lung", "pulmonary"] },
    { id: "pleura", label: "Màng phổi / màng tim", group: "Lồng ngực", chapters: ["lung"], whoVolumes: ["book-35"], webOrgans: ["pulmonary", "mediastinum"], terms: ["pleura", "pleural", "pericardium", "mesothelioma"] },
    { id: "thymus", label: "Tuyến ức / trung thất", group: "Lồng ngực", chapters: ["lung", "heme"], whoVolumes: ["book-35", "book-49"], webOrgans: ["mediastinum", "hematopathology"], terms: ["thymus", "thymic", "mediastinum", "mediastinal"] },
    { id: "heart", label: "Tim", group: "Lồng ngực", chapters: ["soft"], whoVolumes: ["book-35"], webOrgans: ["cardiovascular"], terms: ["heart", "cardiac"] },
    { id: "oesophagus", label: "Thực quản", group: "Tiêu hóa", chapters: ["uppergi"], whoVolumes: ["book-72", "book-31"], webOrgans: ["gastrointestinal"], terms: ["oesophagus", "oesophageal", "esophagus", "esophageal"] },
    { id: "stomach", label: "Dạ dày", group: "Tiêu hóa", chapters: ["uppergi"], whoVolumes: ["book-72", "book-31"], webOrgans: ["gastrointestinal"], terms: ["stomach", "gastric"] },
    { id: "duodenum-ampulla", label: "Tá tràng / bóng Vater", group: "Tiêu hóa", chapters: ["uppergi", "hpb"], whoVolumes: ["book-72", "book-31"], webOrgans: ["gastrointestinal"], terms: ["duodenum", "duodenal", "ampulla", "ampullary"] },
    { id: "small-intestine", label: "Hỗng tràng / hồi tràng", group: "Tiêu hóa", chapters: ["uppergi", "colon"], whoVolumes: ["book-72", "book-31"], webOrgans: ["gastrointestinal"], terms: ["jejunum", "jejunal", "ileum", "ileal", "small intestine", "small bowel"] },
    { id: "appendix", label: "Ruột thừa", group: "Tiêu hóa", chapters: ["colon"], whoVolumes: ["book-72", "book-31"], webOrgans: ["gastrointestinal"], terms: ["appendix", "appendiceal"] },
    { id: "colon-rectum", label: "Đại tràng / trực tràng", group: "Tiêu hóa", chapters: ["colon"], whoVolumes: ["book-72", "book-31"], webOrgans: ["gastrointestinal"], terms: ["colon", "colonic", "rectum", "rectal", "colorectal"] },
    { id: "anal-canal", label: "Ống hậu môn", group: "Tiêu hóa", chapters: ["colon"], whoVolumes: ["book-72", "book-31"], webOrgans: ["gastrointestinal"], terms: ["anal canal", "anus", "anal"] },
    { id: "liver", label: "Gan / đường mật trong gan", group: "Gan mật tụy", chapters: ["hpb"], whoVolumes: ["book-72", "book-31"], webOrgans: ["gastrointestinal"], terms: ["liver", "hepatic", "intrahepatic", "hepatocellular"] },
    { id: "gallbladder-bile-duct", label: "Túi mật / đường mật ngoài gan", group: "Gan mật tụy", chapters: ["hpb"], whoVolumes: ["book-72", "book-31", "book-50"], webOrgans: ["gastrointestinal", "cytopathology"], terms: ["gallbladder", "bile duct", "biliary", "cholangiocarcinoma"] },
    { id: "pancreas", label: "Tụy", group: "Gan mật tụy", chapters: ["hpb"], whoVolumes: ["book-72", "book-31", "book-50", "book-53"], webOrgans: ["gastrointestinal", "endocrine", "cytopathology"], terms: ["pancreas", "pancreatic", "pancreaticobiliary"] },
    { id: "breast", label: "Vú", group: "Vú", chapters: ["breast"], whoVolumes: ["book-84", "book-32"], webOrgans: ["breast"], terms: ["breast", "mammary"] },
    { id: "cervix", label: "Cổ tử cung", group: "Phụ khoa", chapters: ["gyn"], whoVolumes: ["book-34"], webOrgans: ["gynecologic"], terms: ["uterine cervix", "cervix", "cervical"] },
    { id: "uterine-corpus", label: "Thân tử cung / nội mạc tử cung", group: "Phụ khoa", chapters: ["gyn"], whoVolumes: ["book-34"], webOrgans: ["gynecologic"], terms: ["uterine corpus", "endometrium", "endometrial", "myometrium", "uterine"] },
    { id: "ovary", label: "Buồng trứng", group: "Phụ khoa", chapters: ["gyn"], whoVolumes: ["book-34"], webOrgans: ["gynecologic"], terms: ["ovary", "ovarian"] },
    { id: "fallopian-tube", label: "Vòi tử cung", group: "Phụ khoa", chapters: ["gyn"], whoVolumes: ["book-34"], webOrgans: ["gynecologic"], terms: ["fallopian tube", "tubal"] },
    { id: "vulva-vagina", label: "Âm hộ / âm đạo", group: "Phụ khoa", chapters: ["gyn"], whoVolumes: ["book-34"], webOrgans: ["gynecologic"], terms: ["vulva", "vulvar", "vagina", "vaginal"] },
    { id: "peritoneum", label: "Phúc mạc", group: "Phụ khoa", chapters: ["gyn", "hpb"], whoVolumes: ["book-34", "book-72"], webOrgans: ["peritoneum", "gynecologic"], terms: ["peritoneum", "peritoneal"] },
    { id: "trophoblastic", label: "Nguyên bào nuôi / nhau thai", group: "Phụ khoa", chapters: ["gyn"], whoVolumes: ["book-34"], webOrgans: ["gynecologic"], terms: ["trophoblastic", "placental", "molar pregnancy", "choriocarcinoma"] },
    { id: "kidney", label: "Thận", group: "Tiết niệu - sinh dục nam", chapters: ["gu"], whoVolumes: ["book-36"], webOrgans: ["genitourinary"], terms: ["kidney", "renal"] },
    { id: "urinary-tract", label: "Đường tiết niệu / bàng quang", group: "Tiết niệu - sinh dục nam", chapters: ["gu"], whoVolumes: ["book-36"], webOrgans: ["genitourinary"], terms: ["urinary tract", "bladder", "urothelial", "ureter", "urethra"] },
    { id: "prostate", label: "Tuyến tiền liệt", group: "Tiết niệu - sinh dục nam", chapters: ["gu"], whoVolumes: ["book-36"], webOrgans: ["genitourinary"], terms: ["prostate", "prostatic"] },
    { id: "testis", label: "Tinh hoàn", group: "Tiết niệu - sinh dục nam", chapters: ["gu"], whoVolumes: ["book-36"], webOrgans: ["genitourinary"], terms: ["testis", "testicular", "germ cell tumour"] },
    { id: "paratesticular", label: "Phần phụ tinh hoàn", group: "Tiết niệu - sinh dục nam", chapters: ["gu", "soft"], whoVolumes: ["book-36"], webOrgans: ["genitourinary", "soft-tissue"], terms: ["testicular adnexa", "paratesticular", "epididymis", "spermatic cord"] },
    { id: "penis-scrotum", label: "Dương vật / bìu", group: "Tiết niệu - sinh dục nam", chapters: ["gu", "skin"], whoVolumes: ["book-36"], webOrgans: ["genitourinary", "dermpath"], terms: ["penis", "penile", "scrotum", "scrotal"] },
    { id: "skin", label: "Da / phần phụ da", group: "Da", chapters: ["skin"], whoVolumes: ["book-64"], webOrgans: ["dermpath"], terms: ["skin", "cutaneous", "epidermal", "melanocytic", "appendageal"] },
    { id: "lymphoid", label: "Hạch / u lympho", group: "Huyết học", chapters: ["heme"], whoVolumes: ["book-63", "book-49"], webOrgans: ["hematopathology"], terms: ["lymphoid", "lymphoma", "lymph node", "spleen", "thymus"] },
    { id: "myeloid", label: "Tủy xương / dòng tủy", group: "Huyết học", chapters: ["heme"], whoVolumes: ["book-63"], webOrgans: ["hematopathology"], terms: ["myeloid", "myeloproliferative", "myelodysplastic", "leukaemia", "leukemia"] },
    { id: "histiocytic", label: "Mô bào / tế bào tua", group: "Huyết học", chapters: ["heme", "inflammation"], whoVolumes: ["book-63"], webOrgans: ["hematopathology"], terms: ["histiocytic", "dendritic cell", "langerhans"] },
    { id: "cns", label: "Não / tủy sống", group: "Thần kinh", chapters: ["cns"], whoVolumes: ["book-45"], webOrgans: ["neuropath"], terms: ["cns", "brain", "spinal", "glioma", "neuronal"] },
    { id: "meninges", label: "Màng não", group: "Thần kinh", chapters: ["cns"], whoVolumes: ["book-45"], webOrgans: ["neuropath"], terms: ["meninges", "meningeal", "meningioma"] },
    { id: "peripheral-nerve", label: "Dây thần kinh ngoại biên", group: "Thần kinh", chapters: ["soft", "cns"], whoVolumes: ["book-45", "book-33"], webOrgans: ["neuropath", "soft-tissue"], terms: ["peripheral nerve", "nerve sheath", "schwannoma", "neurofibroma"] },
    { id: "oral-cavity", label: "Khoang miệng / lưỡi", group: "Đầu cổ", chapters: ["headneck"], whoVolumes: ["book-52"], webOrgans: ["head-and-neck"], terms: ["oral cavity", "mobile tongue", "oral", "tongue"] },
    { id: "salivary", label: "Tuyến nước bọt", group: "Đầu cổ", chapters: ["headneck"], whoVolumes: ["book-52"], webOrgans: ["head-and-neck"], terms: ["salivary gland", "salivary"] },
    { id: "sinonasal", label: "Mũi xoang / nền sọ", group: "Đầu cổ", chapters: ["headneck"], whoVolumes: ["book-52"], webOrgans: ["head-and-neck"], terms: ["nasal", "sinonasal", "paranasal", "skull base"] },
    { id: "pharynx-larynx", label: "Hầu / thanh quản", group: "Đầu cổ", chapters: ["headneck"], whoVolumes: ["book-52"], webOrgans: ["head-and-neck"], terms: ["nasopharyngeal", "oropharyngeal", "hypopharyngeal", "laryngeal", "larynx"] },
    { id: "odontogenic", label: "Răng - hàm mặt", group: "Đầu cổ", chapters: ["headneck", "soft"], whoVolumes: ["book-52"], webOrgans: ["head-and-neck", "orthopedic"], terms: ["odontogenic", "maxillofacial", "jaw"] },
    { id: "ear", label: "Tai", group: "Đầu cổ", chapters: ["headneck"], whoVolumes: ["book-52"], webOrgans: ["head-and-neck"], terms: ["ear", "otic", "temporal bone"] },
    { id: "soft-tissue", label: "Mô mềm", group: "Mô mềm - xương", chapters: ["soft"], whoVolumes: ["book-33", "book-51"], webOrgans: ["soft-tissue", "cytopathology"], terms: ["soft tissue", "sarcoma"] },
    { id: "bone", label: "Xương", group: "Mô mềm - xương", chapters: ["soft"], whoVolumes: ["book-33"], webOrgans: ["orthopedic"], terms: ["bone", "osseous", "osteogenic", "chondrogenic"] },
    { id: "eye-orbit", label: "Mắt / hốc mắt", group: "Mắt", chapters: ["eye"], whoVolumes: ["book-65"], webOrgans: ["head-and-neck", "neuropath"], terms: ["eye", "ocular", "orbit", "conjunctiva", "retina", "uveal", "lacrimal"] },
    { id: "paediatric", label: "U trẻ em", group: "Trẻ em", chapters: [], whoVolumes: ["book-44"], webOrgans: [], terms: ["paediatric", "pediatric", "childhood"] },
  ];

  const morphologyClues = [
    {
      id: "glandular",
      label: "Tạo tuyến / lòng tuyến",
      group: "Kiến trúc",
      patterns: ["glandular"],
      terms: ["tao tuyen", "long tuyen", "acinar", "gland formation", "adenocarcinoma"],
      sourceTerms: ["adenocarcinoma", "adenoma", "glandular", "acinar"],
    },
    {
      id: "squamous",
      label: "Sừng hóa / cầu nối gian bào",
      group: "Tế bào",
      patterns: ["squamous"],
      terms: ["sung hoa", "cau sung", "cau noi gian bao", "keratin", "squamous"],
      sourceTerms: ["squamous", "keratinizing", "keratocanthoma"],
    },
    {
      id: "small-cell",
      label: "Tế bào nhỏ / khuôn nhân",
      group: "Tế bào",
      patterns: [],
      terms: ["te bao nho", "khuon nhan", "nuclear molding", "crush artifact", "small cell"],
      sourceTerms: ["small cell", "small round cell", "lymphoblastic"],
    },
    {
      id: "neuroendocrine",
      label: "Nhiễm sắc chất muối tiêu",
      group: "Tế bào",
      patterns: ["neuroendocrine"],
      terms: ["muoi tieu", "salt and pepper", "neuroendocrine", "chromogranin", "synaptophysin", "insm1"],
      sourceTerms: ["neuroendocrine", "carcinoid", "paraganglioma", "pheochromocytoma"],
    },
    {
      id: "papillary",
      label: "Cấu trúc nhú",
      group: "Kiến trúc",
      patterns: [],
      terms: ["cau truc nhu", "nhu phan nhanh", "papillary", "fibrovascular core", "truc mach"],
      sourceTerms: ["papillary", "papilloma"],
    },
    {
      id: "micropapillary",
      label: "Vi nhú / cụm không trục mạch",
      group: "Kiến trúc",
      patterns: [],
      terms: ["vi nhu", "micropapillary", "khong truc mach", "retraction space"],
      sourceTerms: ["micropapillary"],
    },
    {
      id: "cribriform",
      label: "Dạng sàng / cầu nối lòng tuyến",
      group: "Kiến trúc",
      patterns: [],
      terms: ["dang sang", "cribriform", "cau noi long tuyen", "punched out"],
      sourceTerms: ["cribriform"],
    },
    {
      id: "follicular",
      label: "Nang / vi nang",
      group: "Kiến trúc",
      patterns: [],
      terms: ["cau truc nang", "vi nang", "follicular", "microfollicular", "colloid"],
      sourceTerms: ["follicular", "follicle"],
    },
    {
      id: "lepidic",
      label: "Lepidic / phủ vách phế nang",
      group: "Kiến trúc",
      patterns: ["glandular"],
      terms: ["lepidic", "phu vach phe nang", "alveolar wall"],
      sourceTerms: ["lepidic", "adenocarcinoma in situ of the lung", "minimally invasive adenocarcinoma"],
    },
    {
      id: "trabecular",
      label: "Dạng bè / dải tế bào",
      group: "Kiến trúc",
      patterns: [],
      terms: ["dang be", "trabecular", "day te bao", "cords"],
      sourceTerms: ["trabecular"],
    },
    {
      id: "nested",
      label: "Dạng ổ / cơ quan hóa",
      group: "Kiến trúc",
      patterns: [],
      terms: ["dang o", "nested", "organoid", "zellballen"],
      sourceTerms: ["nested", "paraganglioma", "neuroendocrine"],
    },
    {
      id: "fascicular",
      label: "Bó dài / bó giao nhau",
      group: "Kiến trúc",
      patterns: ["spindle"],
      terms: ["bo dai", "bo giao nhau", "fascicular", "fascicle"],
      sourceTerms: ["leiomyoma", "leiomyosarcoma", "fibromatosis", "spindle cell"],
    },
    {
      id: "storiform",
      label: "Dạng bánh xe / storiform",
      group: "Kiến trúc",
      patterns: ["spindle"],
      terms: ["dang banh xe", "storiform", "cartwheel"],
      sourceTerms: ["storiform", "dermatofibrosarcoma", "fibrous histiocytoma"],
    },
    {
      id: "whorled",
      label: "Xoáy / thể cát",
      group: "Kiến trúc",
      patterns: [],
      terms: ["cau truc xoay", "whorl", "the cat", "psammoma"],
      sourceTerms: ["meningioma", "psammoma", "papillary"],
    },
    {
      id: "rosette",
      label: "Hoa hồng / giả hoa hồng",
      group: "Kiến trúc",
      patterns: ["neuroendocrine"],
      terms: ["hoa hong", "rosette", "pseudorosette", "perivascular pseudorosette"],
      sourceTerms: ["neuroblastoma", "ependymoma", "retinoblastoma", "neuroendocrine"],
    },
    {
      id: "mucinous",
      label: "Chất nhầy / hồ nhầy",
      group: "Chất nền",
      patterns: [],
      terms: ["chat nhay", "ho nhay", "mucin", "mucinous", "mucin lake"],
      sourceTerms: ["mucinous", "mucin", "colloid", "signet ring"],
    },
    {
      id: "discohesive",
      label: "Tế bào rời / xếp hàng một",
      group: "Tế bào",
      patterns: [],
      terms: ["te bao roi", "xep hang mot", "single file", "discohesive", "e-cadherin mat"],
      sourceTerms: ["lobular", "discohesive", "signet ring", "plasmacytoid"],
    },
    {
      id: "spindle",
      label: "Tế bào hình thoi",
      group: "Tế bào",
      patterns: ["spindle"],
      terms: ["te bao hinh thoi", "spindle", "bop dai", "fascicle"],
      sourceTerms: ["spindle cell", "sarcoma", "fibroma", "leiomyoma", "schwannoma"],
    },
    {
      id: "clear-cell",
      label: "Bào tương sáng",
      group: "Tế bào",
      patterns: [],
      terms: ["bao tuong sang", "te bao sang", "clear cell", "clear-cell"],
      sourceTerms: ["clear cell"],
    },
    {
      id: "epithelioid",
      label: "Tế bào dạng biểu mô",
      group: "Tế bào",
      patterns: [],
      terms: ["dang bieu mo", "epithelioid", "polygonal cell"],
      sourceTerms: ["epithelioid"],
    },
    {
      id: "oncocytic",
      label: "Bào tương ái toan hạt",
      group: "Tế bào",
      patterns: [],
      terms: ["ai toan hat", "oncocytic", "oncocyte", "hurthle", "eosinophilic granular cytoplasm"],
      sourceTerms: ["oncocytic", "oncocytoma", "hurthle"],
    },
    {
      id: "basaloid",
      label: "Dạng đáy / xếp hàng rào",
      group: "Tế bào",
      patterns: [],
      terms: ["dang day", "basaloid", "xep hang rao", "peripheral palisading"],
      sourceTerms: ["basaloid", "basal cell"],
    },
    {
      id: "plasmacytoid-rhabdoid",
      label: "Dạng tương bào / rhabdoid",
      group: "Tế bào",
      patterns: [],
      terms: ["dang tuong bao", "plasmacytoid", "rhabdoid", "eccentric nucleus"],
      sourceTerms: ["plasmacytoid", "rhabdoid"],
    },
    {
      id: "signet-ring",
      label: "Tế bào nhẫn",
      group: "Tế bào",
      patterns: [],
      terms: ["signet ring", "intracytoplasmic mucin"],
      sourceTerms: ["signet ring", "poorly cohesive"],
      caseIds: ["ovary-krukenberg"],
      rawTriggers: ["tế bào nhẫn", "dạng nhẫn"],
    },
    {
      id: "pleomorphic-giant",
      label: "Đa hình / tế bào khổng lồ u",
      group: "Tế bào",
      patterns: [],
      terms: ["da hinh", "pleomorphic", "te bao khong lo u", "tumour giant cell", "bizarre cell"],
      sourceTerms: ["pleomorphic", "giant cell", "anaplastic"],
    },
    {
      id: "lymphoid",
      label: "Tăng sinh dòng lympho",
      group: "Tế bào",
      patterns: ["lymphoid"],
      terms: ["dong lympho", "lympho", "lymphoid", "lymphoma", "xoa kien truc hach"],
      sourceTerms: ["lymphoma", "lymphoid", "leukaemia", "leukemia"],
    },
    {
      id: "inflammation",
      label: "Viêm / tế bào khổng lồ",
      group: "Chất nền",
      patterns: ["inflammation"],
      terms: ["viem", "te bao khong lo", "granuloma", "dai thuc bao", "inflammation"],
      sourceTerms: ["inflammatory", "granulomatous", "histiocytic", "abscess"],
    },
    {
      id: "myxoid",
      label: "Nền dạng nhầy",
      group: "Chất nền",
      patterns: ["spindle"],
      terms: ["nen dang nhay", "myxoid", "myxoma", "myxochondroid"],
      sourceTerms: ["myxoid", "myxoma", "myxofibrosarcoma"],
    },
    {
      id: "desmoplastic",
      label: "Mô đệm xơ phản ứng",
      group: "Chất nền",
      patterns: [],
      terms: ["mo dem xo phan ung", "desmoplasia", "desmoplastic", "stromal reaction"],
      sourceTerms: ["desmoplastic", "invasive carcinoma"],
    },
    {
      id: "hyaline-amyloid",
      label: "Hyalin / amyloid",
      group: "Chất nền",
      patterns: [],
      terms: ["hyalin", "hyaline", "amyloid", "congo red"],
      sourceTerms: ["amyloid", "hyalinizing", "hyaline"],
    },
    {
      id: "vascular",
      label: "Kênh mạch / khe mạch",
      group: "Chất nền",
      patterns: [],
      terms: ["kenh mach", "khe mach", "vascular channel", "blood filled space", "endothelial"],
      sourceTerms: ["vascular", "haemangioma", "hemangioma", "angiosarcoma"],
    },
    {
      id: "adipocytic",
      label: "Mô mỡ / nguyên bào mỡ",
      group: "Chất nền",
      patterns: [],
      terms: ["mo mo", "nguyen bao mo", "adipocytic", "lipoblast", "fat"],
      sourceTerms: ["lipoma", "liposarcoma", "adipocytic"],
    },
    {
      id: "chondroid-osteoid",
      label: "Sụn / chất dạng xương",
      group: "Chất nền",
      patterns: [],
      terms: ["chat dang xuong", "osteoid", "sun", "chondroid", "cartilage"],
      sourceTerms: ["osteosarcoma", "chondrosarcoma", "chondroid", "osteoid"],
    },
    {
      id: "high-grade",
      label: "Hoại tử / nhiều phân bào",
      group: "Hành vi",
      patterns: [],
      terms: ["hoai tu", "nhieu phan bao", "phan bao cao", "high grade", "mitotic", "necrosis"],
      sourceTerms: ["high grade", "high-grade", "anaplastic", "poorly differentiated"],
    },
    {
      id: "in-situ",
      label: "Tại chỗ / còn màng đáy",
      group: "Hành vi",
      patterns: ["precursor"],
      terms: ["tai cho", "con mang day", "in situ", "intraepithelial", "non-invasive"],
      sourceTerms: ["in situ", "intraepithelial", "non-invasive"],
    },
    {
      id: "invasive",
      label: "Xâm nhập mô đệm",
      group: "Hành vi",
      patterns: ["carcinoma"],
      terms: ["xam nhap mo dem", "invasive", "stromal invasion", "desmoplasia"],
      sourceTerms: ["invasive", "carcinoma", "sarcoma"],
    },
    {
      id: "vascular-perineural",
      label: "Xâm nhập mạch / quanh thần kinh",
      group: "Hành vi",
      patterns: [],
      terms: ["xam nhap mach", "xam nhap quanh than kinh", "lymphovascular invasion", "perineural invasion", "lvi", "pni"],
      sourceTerms: ["invasive carcinoma", "adenoid cystic carcinoma"],
    },
  ];

  // Morphology matching favours precision over recall. Every relation below
  // was reviewed against the positive microscopic description of the atlas
  // case. Names, markers, pitfalls and negative statements cannot create a
  // morphology match.
  const morphologyCaseMatrix = {
    glandular: [
      "thyroid-normal", "thyroid-nodular", "thyroid-follicular-adenoma", "thyroid-niftp", "thyroid-ftc", "thyroid-graves",
      "lung-adeno", "lung-mucinous", "lung-ais", "lung-acinar-pattern", "lung-papillary-pattern", "lung-metastatic-colon",
      "colon-ssl", "colon-adenoma", "colon-adeno", "colon-tsa", "colon-villous", "colon-mucinous-adeno", "colon-high-grade-dysplasia", "colon-signet-ring",
      "breast-idc", "breast-mucinous", "breast-fibroadenoma", "breast-radial-scar", "hpb-ipmn", "hpb-cholangiocarcinoma", "hpb-pdac",
      "endometrium-endometrioid", "gyn-ovarian-serous", "gyn-endometrial-serous", "gyn-ein", "gyn-cervix-adenocarcinoma", "gyn-ovary-mucinous",
      "prostate-adeno", "gu-bph", "gu-hgpin", "headneck-pleomorphic", "headneck-warthin", "headneck-mucoepidermoid-carcinoma",
      "headneck-adenoid-cystic-carcinoma", "headneck-acinic-cell-carcinoma", "soft-synovial-sarcoma", "uppergi-barrett-dysplasia",
      "uppergi-gastric-adeno", "uppergi-esophagus-ogj-adeno", "uppergi-gastric-dysplasia", "uppergi-gastric-neuroendocrine-neoplasms",
      "eye-lacrimal-adenoid-cystic-carcinoma",
    ],
    squamous: [
      "lung-squamous", "cervix-scc", "skin-scc", "skin-actinic-keratosis", "headneck-oral-scc", "uppergi-esophagus-scc", "breast-metaplastic",
    ],
    "small-cell": ["lung-small-cell", "heme-cll-sll", "heme-mantle-cell", "heme-marginal-zone", "eye-retinoblastoma", "cns-medulloblastoma-histologic"],
    neuroendocrine: ["thyroid-medullary", "lung-small-cell", "lung-carcinoid", "lung-large-cell-ne", "uppergi-gastric-neuroendocrine-neoplasms"],
    papillary: [
      "thyroid-ptc", "lung-adeno", "lung-papillary-pattern", "hpb-ipmn", "kidney-papillary1", "colon-adenoma", "colon-tsa",
      "colon-villous", "gyn-ovarian-serous", "gyn-endometrial-serous", "gu-urothelial-low", "headneck-warthin", "headneck-acinic-cell-carcinoma",
    ],
    micropapillary: ["lung-adeno", "breast-adh"],
    cribriform: ["colon-high-grade-dysplasia", "headneck-adenoid-cystic-carcinoma", "eye-lacrimal-adenoid-cystic-carcinoma"],
    follicular: ["thyroid-normal", "thyroid-nodular", "thyroid-follicular-adenoma", "thyroid-niftp", "thyroid-ftc", "thyroid-graves"],
    lepidic: ["lung-adeno", "lung-mucinous", "lung-ais", "lung-papillary-pattern"],
    trabecular: ["hpb-hcc", "thyroid-medullary", "lung-carcinoid", "lung-large-cell-ne", "uppergi-gastric-neuroendocrine-neoplasms"],
    nested: [
      "thyroid-medullary", "lung-carcinoid", "lung-large-cell-ne", "uppergi-gastric-neuroendocrine-neoplasms", "skin-bcc", "skin-scc",
      "cervix-scc", "headneck-oral-scc", "uppergi-esophagus-scc", "kidney-clear-cell", "gu-seminoma",
    ],
    fascicular: ["gyn-leiomyoma", "gyn-leiomyosarcoma", "soft-gist", "soft-synovial-sarcoma", "cns-schwannoma"],
    storiform: ["skin-dermatofibroma"],
    whorled: ["cns-meningioma", "soft-gist"],
    rosette: ["lung-large-cell-ne", "eye-retinoblastoma", "cns-medulloblastoma-histologic"],
    mucinous: [
      "lung-adeno", "lung-mucinous", "lung-acinar-pattern", "breast-mucinous", "breast-ilc", "hpb-ipmn", "colon-mucinous-adeno",
      "colon-signet-ring", "ovary-krukenberg", "gyn-cervix-adenocarcinoma", "gyn-ovary-mucinous", "headneck-mucoepidermoid-carcinoma",
      "uppergi-barrett-dysplasia", "uppergi-gastric-adeno", "uppergi-esophagus-ogj-adeno",
    ],
    discohesive: ["breast-ilc", "breast-lcis", "ovary-krukenberg", "colon-signet-ring", "uppergi-gastric-adeno", "uppergi-esophagus-ogj-adeno"],
    spindle: [
      "thyroid-medullary", "thyroid-anaplastic", "cns-meningioma", "cns-schwannoma", "soft-neurofibroma", "soft-gist", "soft-alt-wdlps",
      "soft-dedifferentiated-liposarcoma", "soft-synovial-sarcoma", "soft-osteosarcoma", "soft-central-chondrosarcoma-grade23",
      "breast-phyllodes", "breast-metaplastic", "breast-radial-scar", "gyn-leiomyoma", "gyn-leiomyosarcoma", "skin-dermatofibroma",
      "eye-iris-melanoma", "eye-conjunctival-melanoma", "headneck-pleomorphic",
    ],
    "clear-cell": ["kidney-clear-cell", "kidney-chromophobe", "gu-seminoma", "headneck-acinic-cell-carcinoma"],
    epithelioid: [
      "inflammation-granuloma", "infection-tb", "infection-fungal-granuloma", "soft-gist", "eye-iris-melanoma", "eye-conjunctival-melanoma",
      "thyroid-medullary", "gu-seminoma",
    ],
    oncocytic: ["thyroid-hashimoto", "headneck-warthin"],
    basaloid: ["skin-bcc", "skin-sebk", "headneck-oropharynx-scc-hpv", "headneck-adenoid-cystic-carcinoma", "eye-lacrimal-adenoid-cystic-carcinoma"],
    "plasmacytoid-rhabdoid": [],
    "signet-ring": ["breast-ilc", "ovary-krukenberg", "colon-mucinous-adeno", "colon-signet-ring", "uppergi-gastric-adeno", "uppergi-esophagus-ogj-adeno"],
    "pleomorphic-giant": [
      "thyroid-anaplastic", "gyn-leiomyosarcoma", "soft-dedifferentiated-liposarcoma",
    ],
    lymphoid: [
      "thyroid-hashimoto", "thyroid-graves", "heme-follicular", "heme-hodgkin", "heme-dlbcl", "heme-cll-sll", "heme-mantle-cell",
      "heme-marginal-zone", "headneck-warthin", "headneck-nasopharyngeal", "headneck-oropharynx-scc-hpv", "gu-seminoma",
    ],
    inflammation: [
      "thyroid-hashimoto", "thyroid-subacute", "thyroid-graves", "heme-hodgkin", "inflammation-granuloma", "colon-inflammatory-polyp",
      "hpb-cirrhosis", "infection-tb", "infection-fungal-granuloma", "hpb-hepatocellular-adenoma",
    ],
    myxoid: ["headneck-pleomorphic", "soft-neurofibroma", "soft-central-chondrosarcoma-grade23"],
    desmoplastic: [
      "colon-adeno", "breast-idc", "lung-acinar-pattern", "skin-scc", "headneck-oral-scc", "cervix-scc", "hpb-cholangiocarcinoma",
      "hpb-pdac", "uppergi-esophagus-scc", "uppergi-gastric-adeno", "uppergi-esophagus-ogj-adeno",
    ],
    "hyaline-amyloid": ["headneck-adenoid-cystic-carcinoma", "eye-lacrimal-adenoid-cystic-carcinoma"],
    vascular: ["kidney-clear-cell", "hpb-hepatocellular-adenoma", "hpb-fnh", "cns-oligodendroglioma-idh-codeleted", "soft-synovial-sarcoma"],
    adipocytic: ["soft-lipoma", "soft-alt-wdlps", "soft-dedifferentiated-liposarcoma"],
    "chondroid-osteoid": [
      "headneck-pleomorphic", "breast-metaplastic", "gyn-mature-teratoma", "soft-dedifferentiated-liposarcoma", "soft-osteosarcoma",
      "soft-central-chondrosarcoma-grade23",
    ],
    "high-grade": [
      "thyroid-anaplastic", "lung-small-cell", "heme-dlbcl", "gyn-ovarian-serous", "gyn-leiomyosarcoma", "cns-glioblastoma",
      "lung-large-cell-ne", "cns-medulloblastoma-histologic", "headneck-oropharynx-scc-hpv", "soft-osteosarcoma",
    ],
    "in-situ": [
      "breast-dcis", "breast-lcis", "breast-adh", "lung-ais", "cervix-hsil", "colon-high-grade-dysplasia", "gyn-ein", "gu-hgpin",
      "uppergi-barrett-dysplasia", "uppergi-gastric-dysplasia",
    ],
    invasive: [
      "thyroid-ftc", "thyroid-tall-cell-ptc", "lung-squamous", "lung-adeno", "lung-mucinous", "lung-acinar-pattern", "lung-papillary-pattern",
      "lung-metastatic-colon", "breast-idc", "breast-ilc", "breast-mucinous", "breast-metaplastic", "colon-adeno", "colon-mucinous-adeno",
      "colon-signet-ring", "cervix-scc", "endometrium-endometrioid", "ovary-krukenberg", "gyn-ovarian-serous", "gyn-leiomyosarcoma",
      "gyn-endometrial-serous", "gyn-cervix-adenocarcinoma", "hpb-hcc", "hpb-cholangiocarcinoma", "hpb-pdac",
      "prostate-adeno", "kidney-clear-cell", "kidney-papillary1", "kidney-chromophobe", "skin-bcc", "skin-scc",
      "skin-melanoma", "headneck-oral-scc", "headneck-nasopharyngeal", "headneck-mucoepidermoid-carcinoma",
      "headneck-adenoid-cystic-carcinoma", "headneck-acinic-cell-carcinoma", "headneck-oropharynx-scc-hpv", "soft-dedifferentiated-liposarcoma",
      "soft-synovial-sarcoma", "soft-osteosarcoma", "soft-central-chondrosarcoma-grade23", "uppergi-esophagus-scc", "uppergi-gastric-adeno",
      "uppergi-esophagus-ogj-adeno", "eye-iris-melanoma", "eye-conjunctival-melanoma", "eye-lacrimal-adenoid-cystic-carcinoma",
    ],
    "vascular-perineural": [
      "thyroid-ftc", "prostate-adeno", "hpb-pdac", "uppergi-esophagus-scc", "uppergi-gastric-adeno", "uppergi-esophagus-ogj-adeno",
      "headneck-adenoid-cystic-carcinoma", "eye-conjunctival-melanoma", "eye-lacrimal-adenoid-cystic-carcinoma",
    ],
  };

  const morphologyOverrides = {
    follicular: {
      label: "Nang tuyến / vi nang",
      terms: ["nang tuyen", "vi nang", "follicular architecture", "microfollicular"],
      sourceTerms: ["follicular thyroid", "microfollicular thyroid"],
      referenceUrl: "https://pubmed.ncbi.nlm.nih.gov/36193717/",
    },
    lepidic: {
      label: "Lepidic / mọc dọc vách phế nang",
      terms: ["lepidic", "moc doc vach phe nang", "alveolar wall growth"],
      sourceTerms: ["lepidic", "adenocarcinoma in situ of the lung", "minimally invasive adenocarcinoma of the lung"],
      allowedChapters: ["lung"],
      referenceUrl: "https://pubmed.ncbi.nlm.nih.gov/21252716/",
    },
    whorled: {
      label: "Dạng xoáy / whorled",
      terms: ["cau truc xoay", "dang xoay", "whorl", "whorled"],
      sourceTerms: ["whorled", "meningioma"],
    },
    inflammation: {
      label: "Nền viêm / thâm nhiễm viêm",
      terms: ["nen viem", "tham nhiem viem", "inflammatory infiltrate", "inflammation"],
      sourceTerms: ["inflammatory", "inflammation", "abscess"],
    },
    "hyaline-amyloid": {
      label: "Chất hyalin / chất màng đáy",
      terms: ["chat hyalin", "hyaline material", "basement membrane material"],
      sourceTerms: ["hyalinizing", "hyaline", "basement membrane material"],
    },
    "plasmacytoid-rhabdoid": {
      label: "Tế bào dạng tương bào",
      terms: ["dang tuong bao", "plasmacytoid", "eccentric nucleus"],
      sourceTerms: ["plasmacytoid"],
    },
    "in-situ": {
      label: "Nội biểu mô / tại chỗ, chưa xâm nhập",
      terms: ["noi bieu mo", "tai cho", "in situ", "intraepithelial", "non-invasive"],
      sourceTerms: ["in situ", "intraepithelial", "non-invasive"],
    },
    "high-grade": {
      label: "Hoại tử u / hoạt động phân bào cao",
      terms: ["hoai tu u", "phan bao cao", "high mitotic activity", "tumour necrosis"],
      sourceTerms: ["high grade", "high-grade", "anaplastic", "poorly differentiated"],
    },
  };

  morphologyClues.forEach((clue) => {
    Object.assign(clue, morphologyOverrides[clue.id] || {});
    clue.caseIds = [...(morphologyCaseMatrix[clue.id] || [])];
    clue.auditStatus = clue.caseIds.length ? "curated-positive" : "source-only";
  });

  morphologyClues.push(
    {
      id: "psammoma",
      label: "Thể cát (psammoma)",
      group: "Chất nền",
      patterns: [],
      terms: ["the cat", "psammoma", "psammoma body"],
      sourceTerms: ["psammoma", "psammoma body"],
      caseIds: ["thyroid-ptc", "cns-meningioma"],
      auditStatus: "curated-positive",
    },
    {
      id: "granulomatous",
      label: "Viêm hạt / tế bào khổng lồ",
      group: "Chất nền",
      patterns: [],
      terms: ["viem hat", "u hat", "te bao khong lo", "granuloma", "giant cell"],
      sourceTerms: ["granulomatous", "granuloma", "giant cell"],
      caseIds: ["thyroid-subacute", "inflammation-granuloma", "infection-tb", "infection-fungal-granuloma", "gu-seminoma"],
      auditStatus: "curated-positive",
    },
    {
      id: "amyloid",
      label: "Amyloid mô đệm",
      group: "Chất nền",
      patterns: [],
      terms: ["amyloid", "congo red"],
      sourceTerms: ["amyloid", "congo red"],
      caseIds: ["thyroid-medullary"],
      auditStatus: "curated-positive",
    },
    {
      id: "rhabdoid",
      label: "Tế bào dạng rhabdoid",
      group: "Tế bào",
      patterns: [],
      terms: ["rhabdoid", "eccentric nucleus", "hyaline cytoplasmic inclusion"],
      sourceTerms: ["rhabdoid"],
      caseIds: [],
      auditStatus: "source-only",
    },
  );

  const semanticConcepts = [
    {
      id: "malignant",
      label: "tổn thương ác tính",
      triggers: ["ung thu", "u ac tinh", "ac tinh", "cancer"],
      patterns: ["carcinoma"],
      terms: ["ung thu", "carcinoma", "sarcoma", "lymphoma", "melanoma", "malignant"],
    },
    ...morphologyClues.map((clue) => ({ ...clue, triggers: clue.terms })),
  ];

  function flatten(values) {
    const output = [];
    const visit = (value) => {
      if (Array.isArray(value)) return value.forEach(visit);
      const text = normalize(value);
      if (text) output.push(text);
    };
    visit(values);
    return output;
  }

  function meaningfulTokens(value) {
    return normalize(value)
      .split(" ")
      .filter((token) => token.length > 1 && !stopWords.has(token));
  }

  function hasToken(text, token) {
    if (!text || !token) return false;
    if (token.length <= 3) return (` ${text} `).includes(` ${token} `);
    return text.includes(token);
  }

  function includesAny(fields, terms) {
    return terms.some((term) => {
      const normalizedTerm = normalize(term);
      return fields.some((field) => field.includes(normalizedTerm));
    });
  }

  function includesAnyWholeTerm(fields, terms) {
    return terms.some((term) => {
      const normalizedTerm = normalize(term);
      if (!normalizedTerm) return false;
      return fields.some((field) => (` ${field} `).includes(` ${normalizedTerm} `));
    });
  }

  function buildIndex(item, chapterName) {
    const names = flatten([item.diagnosis, item.english, item.whoTerms, item.searchTerms]);
    const organ = flatten(chapterName);
    const patterns = flatten(item.pattern);
    const markers = flatten(item.markers);
    const features = flatten([item.micro, item.report, item.memory, item.pitfall]);
    const morphology = flatten(item.micro);
    return {
      id: item.id,
      chapter: item.chapter,
      names,
      organ,
      patterns,
      markers,
      features,
      morphology,
      all: [...names, ...organ, ...patterns, ...markers, ...features],
    };
  }

  function inferredConcepts(query) {
    const normalizedQuery = normalize(query);
    if (!normalizedQuery) return [];
    const rawQuery = String(query || "").toLowerCase();
    return semanticConcepts.filter((concept) => (
      concept.triggers.some((trigger) => normalizedQuery.includes(normalize(trigger)))
      || concept.rawTriggers?.some((trigger) => rawQuery.includes(trigger))
    ));
  }

  function caseMatchesOrgan(item, option, chapterNameFor = () => "") {
    if (!option || option.id === "all") return true;
    if (option.chapters?.length && !option.chapters.includes(item.chapter)) return false;
    const index = buildIndex(item, "");
    if (option.id === item.chapter) {
      const moreSpecificOrgan = organOptions.some((candidate) => (
        candidate.id !== "all"
        && candidate.id !== option.id
        && candidate.chapters?.includes(item.chapter)
        && includesAnyWholeTerm(index.names, candidate.terms || [])
      ));
      return !moreSpecificOrgan;
    }
    if (!option.terms?.length) return true;
    return includesAnyWholeTerm(index.names, option.terms);
  }

  function conceptMatches(index, concept) {
    if (concept.allowedChapters?.length && !concept.allowedChapters.includes(index.chapter)) return false;
    if (Array.isArray(concept.caseIds)) return concept.caseIds.includes(index.id);
    const patternMatch = concept.patterns?.some((pattern) => index.patterns.includes(normalize(pattern)));
    return Boolean(patternMatch || includesAnyWholeTerm(index.morphology, concept.terms || []));
  }

  function bestTokenScore(index, token) {
    if (index.names.some((field) => hasToken(field, token))) return 14;
    if (index.organ.some((field) => hasToken(field, token))) return 12;
    if (index.markers.some((field) => hasToken(field, token))) return 11;
    if (index.patterns.some((field) => hasToken(field, token))) return 9;
    if (index.features.some((field) => hasToken(field, token))) return 7;
    return 0;
  }

  function rankCases(items, options = {}) {
    const rawQuery = String(options.query || "");
    const query = normalize(rawQuery);
    const tokens = meaningfulTokens(query);
    const concepts = inferredConcepts(rawQuery);
    const clueIds = Array.isArray(options.clueIds) ? options.clueIds : [];
    const selectedClues = clueIds
      .map((id) => morphologyClues.find((clue) => clue.id === id))
      .filter(Boolean);
    const markerTokens = meaningfulTokens(options.marker);
    const organ = options.organ || "all";
    const allowedChapters = Array.isArray(options.allowedChapters) ? options.allowedChapters : [];
    const organTerms = flatten(options.organTerms || []);
    const chapterNameFor = options.chapterNameFor || (() => "");
    const recognizedOrganTokens = tokens.filter((token) => items.some((item) => (
      flatten(chapterNameFor(item.chapter)).some((field) => hasToken(field, token))
    )));

    return items.map((item, order) => {
      if (organ !== "all" && item.chapter !== organ) return null;
      if (allowedChapters.length && !allowedChapters.includes(item.chapter)) return null;
      const index = buildIndex(item, chapterNameFor(item.chapter));
      if (organTerms.length && !includesAny(index.all, organTerms)) return null;
      if (recognizedOrganTokens.length && !recognizedOrganTokens.every((token) => (
        index.organ.some((field) => hasToken(field, token))
      ))) return null;
      const reasons = [];
      let score = 0;

      if (query) {
        if (index.names.some((field) => field.includes(query))) {
          score += 90;
          reasons.push("khớp tên chẩn đoán");
        }

        const tokenScores = tokens.map((token) => bestTokenScore(index, token));
        const matchedTokenCount = tokenScores.filter(Boolean).length;
        const requiredRatio = tokens.length <= 2 ? 1 : 0.6;
        const matchedRatio = tokens.length ? matchedTokenCount / tokens.length : 0;
        const conceptHits = concepts.filter((concept) => conceptMatches(index, concept));

        if (concepts.length && !conceptHits.length) return null;
        if (!score && matchedRatio < requiredRatio && !conceptHits.length) return null;
        score += tokenScores.reduce((total, value) => total + value, 0);
        if (matchedTokenCount) reasons.push("khớp từ khóa mô tả");
        if (conceptHits.length) {
          score += conceptHits.length * 22;
          reasons.push(...conceptHits.map((concept) => concept.label));
        }
      }

      let clueMatches = 0;
      selectedClues.forEach((clue) => {
        if (!conceptMatches(index, clue)) return;
        clueMatches += 1;
        score += 34;
        reasons.push(clue.label.toLowerCase());
      });
      if (selectedClues.length && clueMatches !== selectedClues.length) return null;

      const markerMatches = markerTokens.filter((token) => index.markers.some((field) => hasToken(field, token)));
      if (markerTokens.length && markerMatches.length === 0) return null;
      if (markerMatches.length) {
        score += markerMatches.length * 28;
        reasons.push(`marker: ${markerMatches.join(", ")}`);
      }

      if (!query && !selectedClues.length && !markerTokens.length) {
        if (organ === "all") return null;
        score = 1;
        reasons.push(`cơ quan: ${normalize(chapterNameFor(item.chapter))}`);
      }

      if (organ !== "all") score += 8;
      if (!score) return null;
      return { item, score, reasons: [...new Set(reasons)].slice(0, 3), order };
    })
      .filter(Boolean)
      .sort((a, b) => b.score - a.score || a.order - b.order);
  }

  window.ATLAS_SEARCH_ASSISTANT = {
    morphologyClues,
    organOptions,
    caseMatchesOrgan,
    normalize,
    rankCases,
    morphologyAuditVersion: "2026-08-02",
  };
}());
