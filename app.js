const PO = "https://www.pathologyoutlines.com";
const WHO = "https://publications.iarc.who.int/Book-And-Report-Series/Who-Classification-Of-Tumours";
const CAP = "https://www.cap.org/protocols-and-guidelines/cancer-protocols/current-cancer-protocols/";

function fileImage(file) {
  return `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(file)}?width=900`;
}

function fileSource(file) {
  return `https://commons.wikimedia.org/wiki/File:${encodeURIComponent(file.replaceAll(" ", "_"))}`;
}

const organs = [
  { id: "all", label: "Tất cả", short: "ALL", color: "#24515a", guide: "Xem toàn bộ ảnh, sau đó lọc dần theo pattern hoặc cơ quan." },
  { id: "digestive", label: "Tiêu hóa", short: "GI", color: "#0f766e", guide: "Nhìn kiến trúc tuyến, loạn sản, desmoplasia, hoại tử bẩn và xâm nhập mô đệm." },
  { id: "hepatobiliary", label: "Gan mật - tụy", short: "HPB", color: "#8a6f16", guide: "Tập trung trabeculae, bile, xơ hóa, tuyến quanh tụy và tổn thương tiền ung thư." },
  { id: "breast", label: "Vú", short: "BR", color: "#c2415a", guide: "Tách in situ/xâm nhập, type mô học, grade, ER/PR/HER2 và hạch." },
  { id: "lung", label: "Phổi", short: "LU", color: "#2563eb", guide: "Nhìn tuyến, gai, tế bào nhỏ, necrosis; gắn với TTF-1, p40, neuroendocrine marker khi cần." },
  { id: "gyn", label: "Phụ khoa", short: "GYN", color: "#8b5cf6", guide: "Xác định cổ tử cung/nội mạc/buồng trứng; chú ý p16, p53, LVSI và mức xâm nhập." },
  { id: "gu", label: "Tiết niệu - nam", short: "GU", color: "#16a34a", guide: "Tuyến tiền liệt đọc Gleason; thận đọc subtype; bàng quang đọc xâm nhập cơ." },
  { id: "skin", label: "Da", short: "SK", color: "#ea580c", guide: "Nhìn liên quan thượng bì, palisading, sắc tố, Breslow, ulceration và margin." },
  { id: "heme", label: "Huyết học", short: "HE", color: "#0891b2", guide: "Đọc kiến trúc hạch, tế bào nhỏ/lớn, apoptosis, necrosis và panel CD/EBER." },
  { id: "endocrine", label: "Nội tiết", short: "EN", color: "#0d9488", guide: "Tuyến giáp cần nhìn nhân, rãnh nhân, thể vùi, cấu trúc nhú và xâm nhập." },
  { id: "cns", label: "Thần kinh", short: "CNS", color: "#4f46e5", guide: "Nhìn whorl, psammoma, hoại tử, vi mạch; gắn mô học với marker/phân tử." },
  { id: "headneck", label: "Đầu cổ", short: "HN", color: "#9333ea", guide: "Gắn với vị trí, keratinization, perineural invasion, p16/EBER khi phù hợp." },
  { id: "soft", label: "Mô mềm", short: "ST", color: "#db2777", guide: "Nhìn spindle cells, myxoid/collagen, atypia, mitosis, necrosis và marker phân dòng." },
  { id: "infection", label: "Viêm - nhiễm", short: "INF", color: "#475569", guide: "Nhìn loại viêm: cấp, mạn, hạt, hoại tử, mô bào, ký sinh hoặc virus." },
];

const patterns = [
  { id: "all", label: "Tất cả" },
  { id: "carcinoma", label: "Carcinoma" },
  { id: "glandular", label: "Tuyến" },
  { id: "squamous", label: "Gai" },
  { id: "lymphoid", label: "Lymphoid" },
  { id: "melanocytic", label: "Melanocytic" },
  { id: "spindle", label: "Spindle" },
  { id: "inflammation", label: "Viêm" },
  { id: "necrosis", label: "Hoại tử" },
  { id: "ihc", label: "IHC/marker" },
];

const organLinks = {
  digestive: [`${PO}/gastrointestinal.html`, `${WHO}/Digestive-System-Tumours-2019`],
  hepatobiliary: [`${PO}/liver.html`, `${WHO}/Digestive-System-Tumours-2019`],
  breast: [`${PO}/breast.html`, `${WHO}/Breast-Tumours-2019`],
  lung: [`${PO}/lung.html`, `${WHO}/Thoracic-Tumours-2021`],
  gyn: [`${PO}/femalegenital.html`, `${WHO}/Female-Genital-Tumours-2020`],
  gu: [`${PO}/genitourinary.html`, `${WHO}/Urinary-And-Male-Genital-Tumours-2022`],
  skin: [`${PO}/skintumors.html`, `${WHO}/Skin-Tumours-2025`],
  heme: [`${PO}/hematopathology.html`, `${WHO}/Haematolymphoid-Tumours-2024`],
  endocrine: [`${PO}/thyroid.html`, `${WHO}/Endocrine-And-Neuroendocrine-Tumours-2022`],
  cns: [`${PO}/Cnstumor.html`, `${WHO}/Central-Nervous-System-Tumours-2021`],
  headneck: [`${PO}/headneck.html`, `${WHO}/Head-And-Neck-Tumours-2024`],
  soft: [`${PO}/softtissue.html`, `${WHO}/Soft-Tissue-And-Bone-Tumours-2020`],
  infection: [`${PO}/infectiousdisease.html`, CAP],
};

const atlasItems = [
  {
    id: "colon-adeno",
    organ: "digestive",
    pattern: ["carcinoma", "glandular"],
    file: "Colon adenocarcinoma - biopsy, high mag.jpg",
    diagnosis: "Adenocarcinoma đại tràng",
    english: "Colon adenocarcinoma",
    stain: "H&E",
    clues: ["Tuyến góc cạnh bất thường", "Mô đệm desmoplastic", "Tế bào dị dạng và xâm nhập"],
    learn: "Tìm bằng chứng xâm nhập trước, sau đó đọc grade, LVI/PNI, margin, hạch và MMR/MSI.",
    pitfall: "Sinh thiết nhỏ có thể khó tách loạn sản cao độ với xâm nhập thật sự.",
    source: "Wikimedia Commons",
  },
  {
    id: "colon-granuloma",
    organ: "digestive",
    pattern: ["inflammation"],
    file: "Histopathology of granuloma of colonic mucosa.jpg",
    diagnosis: "Viêm hạt niêm mạc đại tràng",
    english: "Colonic mucosal granuloma",
    stain: "H&E",
    clues: ["Cụm mô bào dạng biểu mô", "Có/không hoại tử", "Đặt trong bối cảnh Crohn, lao, nấm, dị vật"],
    learn: "Khi thấy granuloma, đừng chốt nguyên nhân vội: cần vị trí, hoại tử, nhuộm đặc biệt và lâm sàng.",
    pitfall: "Granuloma nhỏ cạnh tuyến vỡ có thể là phản ứng dị vật.",
    source: "Wikimedia Commons",
  },
  {
    id: "pancreas-ipmn",
    organ: "hepatobiliary",
    pattern: ["glandular"],
    file: "Histopathology of pancreatobiliary intraductal papillary mucinous neoplasm in the pancreas.jpg",
    diagnosis: "IPMN tụy, kiểu pancreatobiliary",
    english: "Pancreatobiliary-type IPMN",
    stain: "H&E",
    clues: ["Cấu trúc nhú trong ống", "Biểu mô tiết nhầy", "Đánh giá mức độ loạn sản"],
    learn: "Tập nhìn tổn thương trong ống và mức độ atypia để tách low-grade, high-grade và carcinoma xâm nhập.",
    pitfall: "Đừng nhầm biểu mô nhú trong ống với carcinoma xâm nhập nếu chưa thấy mô đệm xâm nhập.",
    source: "Wikimedia Commons",
  },
  {
    id: "pancreas-adenosq",
    organ: "hepatobiliary",
    pattern: ["carcinoma", "glandular", "squamous"],
    file: "Histopathology of adenosquamous carcinoma of the pancreas.jpg",
    diagnosis: "Carcinoma tuyến-gai tụy",
    english: "Pancreatic adenosquamous carcinoma",
    stain: "H&E",
    clues: ["Thành phần tuyến ác tính", "Thành phần gai ác tính", "Hoại tử và mô đệm phản ứng"],
    learn: "Khi một u có hai hướng biệt hóa, hãy mô tả rõ từng thành phần và nghĩ đến panel IHC hỗ trợ.",
    pitfall: "Mẫu nhỏ có thể chỉ bắt được một thành phần, làm lệch chẩn đoán subtype.",
    source: "Wikimedia Commons",
  },
  {
    id: "hcc",
    organ: "hepatobiliary",
    pattern: ["carcinoma"],
    file: "Hepatocellular carcinoma histopathology (1).jpg",
    diagnosis: "Carcinoma tế bào gan",
    english: "Hepatocellular carcinoma",
    stain: "H&E",
    clues: ["Bè tế bào gan dày", "Tế bào đa dạng, bào tương ái toan", "Có thể thấy sắc tố mật"],
    learn: "So với gan nền: mất cấu trúc bè bình thường, tăng mật độ tế bào và bất thường nhân.",
    pitfall: "U biệt hóa cao có thể giống nốt tái tạo/dysplastic nodule, cần reticulin và marker khi cần.",
    source: "Wikimedia Commons",
  },
  {
    id: "shock-liver",
    organ: "hepatobiliary",
    pattern: ["necrosis", "inflammation"],
    file: "Histopathology of shock liver.jpg",
    diagnosis: "Hoại tử trung tâm tiểu thùy gan",
    english: "Centrilobular necrosis / shock liver",
    stain: "H&E",
    clues: ["Hoại tử quanh tĩnh mạch trung tâm", "Tế bào gan ái toan, rời rạc", "Vùng cửa còn tương đối bảo tồn"],
    learn: "Đây là pattern tổn thương, không phải tên bệnh đơn độc; phải gắn với thiếu máu, sốc, độc chất.",
    pitfall: "Đừng gọi là viêm gan đặc hiệu nếu chỉ có hoại tử do thiếu máu.",
    source: "Wikimedia Commons",
  },
  {
    id: "breast-idc",
    organ: "breast",
    pattern: ["carcinoma", "glandular"],
    file: "Histopathology of invasive ductal carcinoma of the breast.jpg",
    diagnosis: "Carcinoma tuyến vú xâm nhập",
    english: "Invasive ductal carcinoma / NST",
    stain: "H&E",
    clues: ["Đám tế bào u trong mô đệm/mỡ", "Không còn giới hạn trong ống", "Nhân dị dạng, tạo tuyến thay đổi"],
    learn: "Luôn đọc type, grade Nottingham, kích thước, margin, hạch và ER/PR/HER2.",
    pitfall: "Đừng nhầm DCIS lan trong ống với xâm nhập nếu chưa thấy u trong mô đệm.",
    source: "Wikimedia Commons",
  },
  {
    id: "breast-dcis",
    organ: "breast",
    pattern: ["carcinoma", "glandular"],
    file: "Breast DCIS histopathology (1).jpg",
    diagnosis: "DCIS vú",
    english: "Ductal carcinoma in situ",
    stain: "H&E",
    clues: ["Tế bào ác tính trong ống tuyến", "Màng đáy còn giới hạn", "Có thể có hoại tử comedo"],
    learn: "Học cách tìm myoepithelial/basement membrane để phân biệt in situ với xâm nhập.",
    pitfall: "Sinh thiết lõi có thể bỏ sót ổ xâm nhập cạnh DCIS.",
    source: "Wikimedia Commons",
  },
  {
    id: "breast-mucinous",
    organ: "breast",
    pattern: ["carcinoma", "glandular"],
    file: "Histopathology of mucinous invasive ductal carcinoma of the breast.jpg",
    diagnosis: "Carcinoma vú dạng nhầy",
    english: "Mucinous breast carcinoma",
    stain: "H&E",
    clues: ["Hồ chất nhầy ngoại bào", "Đảo tế bào u trôi trong mucin", "Đánh giá thành phần thuần/tạp"],
    learn: "Nhìn lượng mucin và thành phần carcinoma thông thường đi kèm để hiểu tiên lượng.",
    pitfall: "Mucin có thể thấy ở tổn thương khác; phải xác định tế bào u xâm nhập.",
    source: "Wikimedia Commons",
  },
  {
    id: "breast-idc-10x",
    organ: "breast",
    pattern: ["carcinoma"],
    file: "Infiltrating ductal carcinoma 10X.jpg",
    diagnosis: "Carcinoma ống tuyến vú xâm nhập, 10X",
    english: "Infiltrating ductal carcinoma",
    stain: "H&E",
    clues: ["Đám tế bào u không đều", "Mô đệm xơ", "Kiểu xâm nhập vào mô quanh ống"],
    learn: "Ở độ phóng đại thấp, hãy xác định ranh giới u và pattern xâm nhập trước khi soi chi tiết nhân.",
    pitfall: "Đừng chỉ nhìn tế bào; kiến trúc xâm nhập thường là manh mối mạnh nhất.",
    source: "Wikimedia Commons",
  },
  {
    id: "lung-scc",
    organ: "lung",
    pattern: ["carcinoma", "squamous"],
    file: "Histopathology of squamous-cell carcinoma of the lung.jpg",
    diagnosis: "Carcinoma tế bào gai phổi",
    english: "Lung squamous cell carcinoma",
    stain: "H&E",
    clues: ["Ổ tế bào dạng gai", "Có thể có sừng hóa/cầu sừng", "p40/p63/CK5/6 hỗ trợ khi kém biệt hóa"],
    learn: "Tách squamous với adenocarcinoma vì panel marker và điều trị có thể khác.",
    pitfall: "Carcinoma gai di căn đến phổi có thể giống nguyên phát phổi.",
    source: "Wikimedia Commons",
  },
  {
    id: "lung-scc-pearl",
    organ: "lung",
    pattern: ["carcinoma", "squamous"],
    file: "Squamous Cell Carcinoma Lung 40x.jpg",
    diagnosis: "Carcinoma gai phổi có cầu sừng",
    english: "Keratinizing lung squamous carcinoma",
    stain: "H&E",
    clues: ["Cầu sừng trung tâm", "Bào tương ái toan", "Nhân tăng sắc, dị dạng"],
    learn: "Cầu sừng là pattern kinh điển giúp nhận diện biệt hóa gai.",
    pitfall: "Mẫu nhỏ hoại tử nhiều có thể che mất dấu hiệu sừng hóa.",
    source: "Wikimedia Commons",
  },
  {
    id: "lung-congestion",
    organ: "lung",
    pattern: ["inflammation"],
    file: "Hemosiderin laden macrophages in chronic venous congestion of lung 40X.jpg",
    diagnosis: "Đại thực bào chứa hemosiderin ở phổi",
    english: "Heart failure cells / chronic venous congestion",
    stain: "H&E",
    clues: ["Đại thực bào nâu trong phế nang", "Sung huyết mao mạch", "Gợi ý ứ huyết mạn"],
    learn: "Không phải mọi sắc tố nâu là melanin; đặt vị trí phổi và bối cảnh tim mạch vào trước.",
    pitfall: "Có thể cần nhuộm sắt nếu cần xác nhận hemosiderin.",
    source: "Wikimedia Commons",
  },
  {
    id: "cervix-scc",
    organ: "gyn",
    pattern: ["carcinoma", "squamous"],
    file: "Histopathology of squamous cell carcinoma of the cervix.png",
    diagnosis: "Carcinoma tế bào gai cổ tử cung",
    english: "Cervical squamous cell carcinoma",
    stain: "H&E",
    clues: ["Đảo tế bào gai xâm nhập", "Cầu sừng hoặc biệt hóa gai", "Đọc LVSI và độ sâu xâm nhập"],
    learn: "So sánh với HSIL/CIN3: dấu xâm nhập mô đệm là mấu chốt.",
    pitfall: "p16 hỗ trợ bối cảnh HPV nhưng không thay thế đánh giá xâm nhập.",
    source: "Wikimedia Commons",
  },
  {
    id: "cervix-cis",
    organ: "gyn",
    pattern: ["squamous"],
    file: "Ca in situ, cervix 2.jpg",
    diagnosis: "Carcinoma in situ/HSIL cổ tử cung",
    english: "Cervical carcinoma in situ / HSIL",
    stain: "H&E",
    clues: ["Dày toàn bộ biểu mô", "Mất trưởng thành", "Chưa thấy xâm nhập mô đệm"],
    learn: "Tập nhận ranh giới màng đáy và sự lan vào tuyến cổ tử cung.",
    pitfall: "Lan vào tuyến có thể làm tưởng là xâm nhập nếu không nhìn cấu trúc tuyến.",
    source: "Wikimedia Commons",
  },
  {
    id: "endometrioid",
    organ: "gyn",
    pattern: ["carcinoma", "glandular"],
    file: "Histopathology of endometrial adenocarcinoma, endometrioid type.jpg",
    diagnosis: "Adenocarcinoma nội mạc tử cung dạng endometrioid",
    english: "Endometrioid endometrial carcinoma",
    stain: "H&E",
    clues: ["Tuyến chen chúc, back-to-back", "Đánh giá thành phần đặc", "Đọc grade FIGO"],
    learn: "Grade dựa nhiều vào kiến trúc đặc; sau đó đọc xâm nhập cơ và LVSI.",
    pitfall: "Tăng sản không điển hình có thể rất sát carcinoma trên mẫu nhỏ.",
    source: "Wikimedia Commons",
  },
  {
    id: "krukenberg",
    organ: "gyn",
    pattern: ["carcinoma", "glandular"],
    file: "Gross pathology and histopathology of signet ring cell carcinoma metastasis to the ovary.jpg",
    diagnosis: "U Krukenberg",
    english: "Signet-ring cell carcinoma metastasis to ovary",
    stain: "H&E",
    clues: ["Tế bào nhẫn", "Mô đệm phản ứng", "Thường là di căn, cần tìm nguồn tiêu hóa"],
    learn: "Ở buồng trứng, tế bào nhẫn hai bên gợi ý di căn hơn nguyên phát.",
    pitfall: "Không vội gọi carcinoma buồng trứng nguyên phát khi chưa loại di căn.",
    source: "Wikimedia Commons",
  },
  {
    id: "prostate-adeno",
    organ: "gu",
    pattern: ["carcinoma", "glandular"],
    file: "Histopathology of prostate adenocarcinoma involving adipose tissue.jpg",
    diagnosis: "Adenocarcinoma tuyến tiền liệt",
    english: "Prostate adenocarcinoma",
    stain: "H&E",
    clues: ["Tuyến nhỏ xâm nhập", "Thiếu lớp basal", "Có thể xâm nhập mỡ/quanh thần kinh"],
    learn: "Đọc Gleason pattern/Grade Group, số core dương tính và extent.",
    pitfall: "Atrophy/adenosis có thể bắt chước carcinoma trên sinh thiết nhỏ.",
    source: "Wikimedia Commons",
  },
  {
    id: "pap-rcc1",
    organ: "gu",
    pattern: ["carcinoma"],
    file: "Histopathology of papillary renal cell carcinoma type 1.jpg",
    diagnosis: "Carcinoma tế bào thận dạng nhú type 1",
    english: "Papillary renal cell carcinoma type 1",
    stain: "H&E",
    clues: ["Cấu trúc nhú/ống-nhú", "Đại thực bào bọt trong trục nhú", "Tế bào thường nhỏ, ít bào tương"],
    learn: "Tập nhìn lõi nhú có mô bào bọt và phân biệt với clear cell RCC.",
    pitfall: "RCC dạng nhú có nhiều biến thể; cần đọc grade và type cẩn thận.",
    source: "Wikimedia Commons",
  },
  {
    id: "pap-rcc2",
    organ: "gu",
    pattern: ["carcinoma"],
    file: "Histopathology of papillary renal cell carcinoma type 2.jpg",
    diagnosis: "Carcinoma tế bào thận dạng nhú type 2",
    english: "Papillary renal cell carcinoma type 2",
    stain: "H&E",
    clues: ["Tế bào lớn hơn type 1", "Nhân grade cao hơn", "Kiến trúc nhú rõ"],
    learn: "So sánh type 1 và type 2 bằng tế bào học, không chỉ kiến trúc nhú.",
    pitfall: "Phân loại RCC hiện đại thay đổi theo WHO; cần đối chiếu nguồn mới.",
    source: "Wikimedia Commons",
  },
  {
    id: "renal-infarct",
    organ: "gu",
    pattern: ["necrosis"],
    file: "Renal cortical infarction showing coagulative necrosis 40X.jpg",
    diagnosis: "Nhồi máu vỏ thận",
    english: "Renal cortical infarction",
    stain: "H&E",
    clues: ["Hoại tử đông", "Bóng tế bào còn khung", "Mất nhân rõ"],
    learn: "Hoại tử đông giữ kiến trúc mô trong giai đoạn đầu, khác hoại tử hóa lỏng.",
    pitfall: "Không nhầm vùng cố định kém với hoại tử bệnh lý thật.",
    source: "Wikimedia Commons",
  },
  {
    id: "bcc",
    organ: "skin",
    pattern: ["carcinoma"],
    file: "Histopathology of a pigmented basal-cell carcinoma.jpg",
    diagnosis: "Carcinoma tế bào đáy sắc tố",
    english: "Pigmented basal cell carcinoma",
    stain: "H&E",
    clues: ["Đám tế bào basaloid", "Palisading ngoại vi", "Khoảng tách mô đệm và sắc tố"],
    learn: "Đây là card kinh điển để học palisading và retraction artifact.",
    pitfall: "BCC sắc tố có thể lâm sàng giống melanoma; mô học giúp tách.",
    source: "Wikimedia Commons",
  },
  {
    id: "melanoma-node",
    organ: "skin",
    pattern: ["melanocytic", "carcinoma"],
    file: "Histopathology of a metastatic melanoma to a lymph node.jpg",
    diagnosis: "Melanoma di căn hạch",
    english: "Metastatic melanoma to lymph node",
    stain: "H&E",
    clues: ["Tế bào dị dạng cao", "Có thể ít sắc tố", "Cần SOX10/S100/Melan-A khi khó"],
    learn: "Melanoma có thể rất đa dạng; đừng dựa vào sắc tố đơn độc.",
    pitfall: "Melanoma mất sắc tố có thể giống carcinoma hoặc lymphoma.",
    source: "Wikimedia Commons",
  },
  {
    id: "malignant-melanoma",
    organ: "skin",
    pattern: ["melanocytic"],
    file: "Histopathology of Malignant melanoma.jpg",
    diagnosis: "Melanoma ác tính",
    english: "Malignant melanoma",
    stain: "H&E",
    clues: ["Tế bào hắc tố dị dạng", "Mất trưởng thành", "Tăng mitosis, có thể xâm nhập sâu"],
    learn: "Đọc Breslow, ulceration, mitosis, regression, satellitosis và margin.",
    pitfall: "Nevus kích thích hoặc Spitz lesion có thể gây khó trên mẫu nhỏ.",
    source: "Wikimedia Commons",
  },
  {
    id: "molluscum",
    organ: "skin",
    pattern: ["inflammation"],
    file: "Histopathology of molluscum contagiosum.jpg",
    diagnosis: "Molluscum contagiosum",
    english: "Molluscum contagiosum",
    stain: "H&E",
    clues: ["Tăng sản biểu mô dạng lõm", "Thể vùi molluscum", "Tổn thương virus da"],
    learn: "Tập nhận thể vùi nội bào lớn trong bệnh da do virus.",
    pitfall: "Mẫu nông có thể chỉ thấy viêm/keratin, dễ bỏ sót thể vùi.",
    source: "Wikimedia Commons",
  },
  {
    id: "follicular-lymphoma",
    organ: "heme",
    pattern: ["lymphoid"],
    file: "Histopathology of a centroblast in follicular lymphoma.jpg",
    diagnosis: "Follicular lymphoma",
    english: "Follicular lymphoma",
    stain: "H&E",
    clues: ["Nang lympho bất thường", "Centrocyte/centroblast", "Đọc grade bằng số centroblast"],
    learn: "Hãy học tế bào centrocyte và centroblast trước khi đọc grade lymphoma nang.",
    pitfall: "Reactive follicular hyperplasia có thể giống lymphoma nếu không dùng IHC/flow khi cần.",
    source: "Wikimedia Commons",
  },
  {
    id: "nkt",
    organ: "heme",
    pattern: ["lymphoid", "necrosis", "ihc"],
    file: "Histopathology of extranodal NK-T cell lymphoma, nasal type.png",
    diagnosis: "Lymphoma NK/T ngoại hạch, type mũi",
    english: "Extranodal NK/T-cell lymphoma, nasal type",
    stain: "H&E",
    clues: ["Tế bào lymphoid đơn dạng", "Hoại tử/angiodestruction", "EBER thường quan trọng"],
    learn: "Với tổn thương vùng mũi hoại tử, nghĩ đến EBER và panel T/NK.",
    pitfall: "Viêm hoại tử hoặc nhiễm trùng có thể che lấp lymphoma.",
    source: "Wikimedia Commons",
  },
  {
    id: "abscess",
    organ: "infection",
    pattern: ["inflammation", "necrosis"],
    file: "Histopathology of abscess.jpg",
    diagnosis: "Áp xe",
    english: "Abscess",
    stain: "H&E",
    clues: ["Nhiều bạch cầu đa nhân trung tính", "Hoại tử hóa lỏng", "Mảnh vụn tế bào"],
    learn: "Viêm cấp giàu neutrophil khác với viêm mạn lympho/plasma và viêm hạt mô bào.",
    pitfall: "Trong u hoại tử cũng có neutrophil; cần tìm tế bào u còn sống ở rìa.",
    source: "Wikimedia Commons",
  },
  {
    id: "acute-exudate",
    organ: "infection",
    pattern: ["inflammation"],
    file: "Histopathology of acute inflammatory exudate.jpg",
    diagnosis: "Dịch rỉ viêm cấp",
    english: "Acute inflammatory exudate",
    stain: "H&E",
    clues: ["Neutrophil ưu thế", "Fibrin/mảnh vụn", "Tổn thương mô cấp"],
    learn: "Tập phân biệt neutrophil, lymphocyte, plasma cell và histiocyte.",
    pitfall: "Mảnh vụn hoại tử có thể làm khó nhận diện tế bào viêm.",
    source: "Wikimedia Commons",
  },
  {
    id: "thyroid-ptc",
    organ: "endocrine",
    pattern: ["carcinoma", "glandular"],
    file: "Thyroid papillary carcinoma histopathology (2).jpg",
    diagnosis: "Carcinoma tuyến giáp thể nhú",
    english: "Papillary thyroid carcinoma",
    stain: "H&E",
    clues: ["Nhân sáng", "Rãnh nhân/thể vùi", "Cấu trúc nhú hoặc follicular variant"],
    learn: "Trong PTC, đặc điểm nhân quan trọng hơn chỉ nhìn cấu trúc nhú.",
    pitfall: "Reactive nuclear clearing có thể gây nhầm nếu không đủ bộ đặc điểm nhân.",
    source: "Wikimedia Commons",
  },
  {
    id: "thyroid-ptc-4",
    organ: "endocrine",
    pattern: ["carcinoma"],
    file: "Thyroid papillary carcinoma histopathology (4).jpg",
    diagnosis: "Carcinoma tuyến giáp thể nhú, phóng đại khác",
    english: "Papillary thyroid carcinoma",
    stain: "H&E",
    clues: ["Nhân chồng lấp", "Rãnh nhân", "Cấu trúc nhú/vi nhú"],
    learn: "Xem nhiều độ phóng đại để không bỏ lỡ đặc điểm nhân.",
    pitfall: "Một số biến thể PTC cần tiêu chuẩn riêng và marker bổ sung.",
    source: "Wikimedia Commons",
  },
  {
    id: "meningioma",
    organ: "cns",
    pattern: ["spindle"],
    file: "Histopathology of meningioma.jpg",
    diagnosis: "Meningioma grade 1",
    english: "Meningioma",
    stain: "H&E",
    clues: ["Whorl", "Tế bào đồng dạng", "Psammoma bodies có thể gặp"],
    learn: "Tập nhận whorl và psammoma body trước khi học grading meningioma.",
    pitfall: "Meningioma dạng spindle có thể nhầm schwannoma/fibrous lesion.",
    source: "Wikimedia Commons",
  },
  {
    id: "meningioma-psammoma",
    organ: "cns",
    pattern: ["spindle"],
    file: "Meningioma showing Psammoma body.jpg",
    diagnosis: "Meningioma có thể psammoma",
    english: "Meningioma with psammoma body",
    stain: "H&E",
    clues: ["Cấu trúc vôi hóa đồng tâm", "Nền tế bào màng não", "Whorl quanh psammoma"],
    learn: "Psammoma body là dấu hình thái lặp lại ở nhiều u; luôn gắn với bối cảnh cơ quan.",
    pitfall: "Psammoma body không đặc hiệu riêng cho meningioma.",
    source: "Wikimedia Commons",
  },
  {
    id: "oral-scc",
    organ: "headneck",
    pattern: ["carcinoma", "squamous"],
    file: "Oral cancer (1) squamous cell carcinoma histopathology.jpg",
    diagnosis: "Carcinoma tế bào gai khoang miệng",
    english: "Oral squamous cell carcinoma",
    stain: "H&E",
    clues: ["Đảo tế bào gai xâm nhập", "Sừng hóa", "Mô đệm phản ứng"],
    learn: "Ở đầu cổ, đọc thêm độ sâu xâm nhập, PNI, LVI, margin và hạch.",
    pitfall: "Pseudoepitheliomatous hyperplasia có thể bắt chước SCC trên mẫu nông.",
    source: "Wikimedia Commons",
  },
  {
    id: "pleomorphic-adenoma",
    organ: "headneck",
    pattern: ["glandular", "spindle"],
    file: "Pleomorphic adenoma.jpg",
    diagnosis: "U tuyến đa dạng tuyến nước bọt",
    english: "Pleomorphic adenoma",
    stain: "H&E",
    clues: ["Thành phần biểu mô và myoepithelial", "Nền myxoid/chondroid", "Giới hạn tương đối rõ"],
    learn: "Đây là ca tốt để học u tuyến nước bọt có hai pha tế bào và nền mô đệm đặc trưng.",
    pitfall: "Sinh thiết nhỏ có thể nhầm với u ác tính tuyến nước bọt nếu chỉ thấy một vùng.",
    source: "Wikimedia Commons",
  },
  {
    id: "neurofibroma",
    organ: "soft",
    pattern: ["spindle"],
    file: "Neurofibroma -1.jpg",
    diagnosis: "Neurofibroma",
    english: "Neurofibroma",
    stain: "H&E",
    clues: ["Tế bào thoi lượn sóng", "Nền collagen/myxoid", "Ít atypia"],
    learn: "Tập phân biệt spindle lesion lành với sarcoma bằng atypia, mitosis, necrosis và ranh giới.",
    pitfall: "Schwannoma, perineurioma và scar có thể giống nhau nếu mẫu nhỏ.",
    source: "Wikimedia Commons",
  },
  {
    id: "clear-cell-pap-rcc",
    organ: "gu",
    pattern: ["carcinoma"],
    file: "Clear cell papillary renal cell carcinoma - high mag.jpg",
    diagnosis: "Clear cell papillary renal cell carcinoma",
    english: "Clear cell papillary RCC",
    stain: "H&E",
    clues: ["Tế bào sáng", "Kiến trúc tuyến/nhú", "Nhân có thể xếp cực về phía lòng tuyến"],
    learn: "So sánh với clear cell RCC và papillary RCC để học subtype thận.",
    pitfall: "Subtype RCC cần IHC và tiêu chuẩn WHO, không chỉ một ảnh H&E.",
    source: "Wikimedia Commons",
  },
  {
    id: "xp11-rcc",
    organ: "gu",
    pattern: ["carcinoma", "ihc"],
    file: "Xp11.2 translocation renal cell carcinoma - very high mag.jpg",
    diagnosis: "RCC chuyển đoạn Xp11.2",
    english: "Xp11.2 translocation RCC",
    stain: "H&E",
    clues: ["Kiến trúc nhú/ổ", "Tế bào sáng/eosinophilic", "Có thể cần TFE3"],
    learn: "Một số subtype thận không thể học bằng hình H&E đơn độc, phải gắn với marker/phân tử.",
    pitfall: "Dễ nhầm với papillary RCC hoặc clear cell RCC nếu không làm xét nghiệm hỗ trợ.",
    source: "Wikimedia Commons",
  },
];

const patternGuides = [
  ["Tuyến ác tính", "Tìm tuyến méo mó, back-to-back, tế bào dị dạng và dấu xâm nhập mô đệm."],
  ["Biệt hóa gai", "Tìm bào tương hồng, cầu sừng, intercellular bridges và p40/p63 khi cần."],
  ["Viêm hạt", "Tìm cụm mô bào, tế bào khổng lồ, hoại tử bã đậu hay dị vật."],
  ["Lymphoid", "Đọc kiến trúc trước: còn nang phản ứng hay bị xóa? Sau đó mới đến CD markers."],
  ["Melanocytic", "Không dựa vào sắc tố đơn độc; cần SOX10/S100/Melan-A/HMB45 trong ca khó."],
  ["Spindle cell", "Đặt câu hỏi: tế bào thoi lành hay ác, có necrosis/mitosis/atypia không, marker nào phù hợp?"],
];

const sourceCards = [
  ["Wikimedia Commons", "Nguồn ảnh mở", "Ảnh atlas được nhúng qua Special:FilePath và luôn có link về trang File gốc để xem tác giả/giấy phép.", "https://commons.wikimedia.org/wiki/Category:Histopathology"],
  ["PathologyOutlines", "Đọc sâu từng bệnh", "Dùng để học thêm clinical, gross, microscopic, IHC và differential diagnosis.", `${PO}/`],
  ["WHO/IARC Blue Books", "Chuẩn phân loại", "Dùng để đối chiếu tên u, tiêu chuẩn phân loại và các cập nhật theo cơ quan.", WHO],
  ["CAP Cancer Protocols", "Checklist báo cáo", "Dùng khi cần biết báo cáo ung thư cần đủ những yếu tố nào.", CAP],
];

let state = {
  organ: "all",
  pattern: "all",
  query: "",
  selectedId: atlasItems[0].id,
};

const els = {
  organNav: document.getElementById("organNav"),
  organGrid: document.getElementById("organGrid"),
  patternFilters: document.getElementById("patternFilters"),
  patternGrid: document.getElementById("patternGrid"),
  atlasSearch: document.getElementById("atlasSearch"),
  atlasGrid: document.getElementById("atlasGrid"),
  spotlightGrid: document.getElementById("spotlightGrid"),
  caseDetail: document.getElementById("caseDetail"),
  galleryTitle: document.getElementById("galleryTitle"),
  galleryCount: document.getElementById("galleryCount"),
  resetFilters: document.getElementById("resetFilters"),
  sourceGrid: document.getElementById("sourceGrid"),
  statImages: document.getElementById("statImages"),
  statOrgans: document.getElementById("statOrgans"),
  statDiagnoses: document.getElementById("statDiagnoses"),
  organSummary: document.getElementById("organSummary"),
  diagnosisTitle: document.getElementById("diagnosisTitle"),
  diagnosisCount: document.getElementById("diagnosisCount"),
  diagnosisGrid: document.getElementById("diagnosisGrid"),
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

function organById(id) {
  return organs.find((organ) => organ.id === id) || organs[0];
}

function itemText(item) {
  const organ = organById(item.organ);
  return normalize([
    item.diagnosis,
    item.english,
    organ.label,
    item.pattern.join(" "),
    item.clues.join(" "),
    item.learn,
    item.pitfall,
    item.stain,
  ].join(" "));
}

function filteredItems() {
  const query = normalize(state.query.trim());
  return atlasItems.filter((item) => {
    const matchesOrgan = state.organ === "all" || item.organ === state.organ;
    const matchesPattern = state.pattern === "all" || item.pattern.includes(state.pattern);
    const matchesQuery = !query || itemText(item).includes(query);
    return matchesOrgan && matchesPattern && matchesQuery;
  });
}

function renderOrganNav() {
  els.organNav.innerHTML = organs
    .map((organ) => {
      const count = organ.id === "all" ? atlasItems.length : atlasItems.filter((item) => item.organ === organ.id).length;
      return `
        <button class="nav-pill ${state.organ === organ.id ? "active" : ""}" type="button" data-organ="${escapeHtml(organ.id)}">
          <span style="--dot:${escapeHtml(organ.color)}"></span>
          <strong>${escapeHtml(organ.label)}</strong>
          <em>${count}</em>
        </button>
      `;
    })
    .join("");

  els.organNav.querySelectorAll("[data-organ]").forEach((button) => {
    button.addEventListener("click", () => {
      state.organ = button.dataset.organ;
      renderAll();
    });
  });
}

function renderPatternFilters() {
  els.patternFilters.innerHTML = patterns
    .map((pattern) => `
      <button class="filter-chip ${state.pattern === pattern.id ? "active" : ""}" type="button" data-pattern="${escapeHtml(pattern.id)}">
        ${escapeHtml(pattern.label)}
      </button>
    `)
    .join("");

  els.patternFilters.querySelectorAll("[data-pattern]").forEach((button) => {
    button.addEventListener("click", () => {
      state.pattern = button.dataset.pattern;
      renderAll();
    });
  });
}

function renderDiagnosisBrowser() {
  const organ = organById(state.organ);
  const items = filteredItems();
  const organItems = state.organ === "all" ? atlasItems : atlasItems.filter((item) => item.organ === state.organ);
  const patternNames = Array.from(new Set(organItems.flatMap((item) => item.pattern)))
    .map((id) => patterns.find((pattern) => pattern.id === id)?.label || id)
    .slice(0, 6);

  els.organSummary.innerHTML = `
    <span class="organ-code" style="--organ:${escapeHtml(organ.color)}">${escapeHtml(organ.short)}</span>
    <div>
      <span class="eyebrow">${state.organ === "all" ? "Tổng quan atlas" : "Cơ quan đang chọn"}</span>
      <h2>${escapeHtml(organ.label)}</h2>
      <p>${escapeHtml(organ.guide)}</p>
    </div>
    <div class="summary-metrics">
      <div><strong>${state.organ === "all" ? organs.length - 1 : 1}</strong><span>cơ quan</span></div>
      <div><strong>${items.length}</strong><span>chẩn đoán hiện</span></div>
      <div><strong>${patternNames.length || patterns.length - 1}</strong><span>pattern</span></div>
    </div>
    <div class="summary-patterns">
      ${(patternNames.length ? patternNames : patterns.filter((item) => item.id !== "all").map((item) => item.label).slice(0, 6))
        .map((label) => `<span>${escapeHtml(label)}</span>`)
        .join("")}
    </div>
  `;

  els.diagnosisTitle.textContent = state.organ === "all" ? "Tất cả chẩn đoán trong atlas" : `Chẩn đoán ${organ.label}`;
  els.diagnosisCount.textContent = `${items.length} chẩn đoán đang khớp bộ lọc`;

  if (!items.length) {
    els.diagnosisGrid.innerHTML = `<div class="empty-state">Không có chẩn đoán phù hợp trong cơ quan/pattern/từ khóa này.</div>`;
    return;
  }

  els.diagnosisGrid.innerHTML = items.map((item) => renderDiagnosisCard(item)).join("");
  els.diagnosisGrid.querySelectorAll("[data-diagnosis]").forEach((button) => {
    button.addEventListener("click", () => {
      const item = atlasItems.find((entry) => entry.id === button.dataset.diagnosis);
      if (!item) return;
      state.selectedId = item.id;
      state.organ = item.organ;
      renderAll();
      document.getElementById("caseDetail").scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });
}

function renderDiagnosisCard(item) {
  const organ = organById(item.organ);
  const active = item.id === state.selectedId ? "active" : "";
  return `
    <button class="diagnosis-card ${active}" type="button" data-diagnosis="${escapeHtml(item.id)}">
      <img src="${escapeHtml(fileImage(item.file))}" alt="${escapeHtml(item.diagnosis)}" loading="lazy" />
      <span class="organ-badge inline" style="--badge:${escapeHtml(organ.color)}">${escapeHtml(organ.label)}</span>
      <strong>${escapeHtml(item.diagnosis)}</strong>
      <em>${escapeHtml(item.english)}</em>
      <p>${escapeHtml(item.clues.slice(0, 2).join(" · "))}</p>
      <small>${escapeHtml(item.pattern.map((id) => patterns.find((pattern) => pattern.id === id)?.label || id).slice(0, 3).join(" / "))}</small>
    </button>
  `;
}

function renderSpotlight() {
  const ids = ["colon-adeno", "lung-scc", "follicular-lymphoma", "colon-granuloma"];
  els.spotlightGrid.innerHTML = ids
    .map((id) => atlasItems.find((item) => item.id === id))
    .filter(Boolean)
    .map((item) => renderAtlasCard(item, true))
    .join("");
  bindCardClicks(els.spotlightGrid);
}

function renderAtlasCard(item, compact = false) {
  const organ = organById(item.organ);
  return `
    <article class="atlas-card ${compact ? "compact" : ""}" data-case="${escapeHtml(item.id)}">
      <div class="image-wrap">
        <img src="${escapeHtml(fileImage(item.file))}" alt="${escapeHtml(item.diagnosis)}" loading="lazy" />
        <span class="organ-badge" style="--badge:${escapeHtml(organ.color)}">${escapeHtml(organ.label)}</span>
      </div>
      <div class="atlas-body">
        <div class="card-meta">
          <span>${escapeHtml(item.stain)}</span>
          <span>${escapeHtml(item.pattern.slice(0, 2).join(" · "))}</span>
        </div>
        <h3>${escapeHtml(item.diagnosis)}</h3>
        <p class="english">${escapeHtml(item.english)}</p>
        <ul>${item.clues.slice(0, 3).map((clue) => `<li>${escapeHtml(clue)}</li>`).join("")}</ul>
        <button type="button" class="text-link">Mở ca học</button>
      </div>
    </article>
  `;
}

function bindCardClicks(scope) {
  scope.querySelectorAll("[data-case]").forEach((card) => {
    card.addEventListener("click", () => {
      state.selectedId = card.dataset.case;
      renderCaseDetail();
      document.getElementById("caseDetail").scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });
}

function renderGallery() {
  const items = filteredItems();
  const organ = organById(state.organ);
  const pattern = patterns.find((item) => item.id === state.pattern);
  els.galleryTitle.textContent = state.organ === "all" ? "Tất cả ảnh atlas" : `Atlas ${organ.label}`;
  els.galleryCount.textContent = `${items.length} ảnh đang hiển thị${pattern && pattern.id !== "all" ? ` · ${pattern.label}` : ""}`;

  if (!items.length) {
    els.atlasGrid.innerHTML = `<div class="empty-state">Không có ảnh phù hợp. Hãy thử từ khóa rộng hơn hoặc bấm “Hiện tất cả”.</div>`;
    return;
  }

  els.atlasGrid.innerHTML = items.map((item) => renderAtlasCard(item)).join("");
  bindCardClicks(els.atlasGrid);
}

function renderCaseDetail() {
  const visible = filteredItems();
  if (!visible.length) {
    els.caseDetail.innerHTML = "";
    return;
  }

  const item = visible.find((entry) => entry.id === state.selectedId) || visible[0];
  state.selectedId = item.id;
  const organ = organById(item.organ);
  const links = organLinks[item.organ] || [];

  els.caseDetail.innerHTML = `
    <div class="detail-image">
      <img src="${escapeHtml(fileImage(item.file))}" alt="${escapeHtml(item.diagnosis)}" loading="lazy" />
    </div>
    <div class="detail-copy">
      <span class="eyebrow">${escapeHtml(organ.label)} · ${escapeHtml(item.stain)}</span>
      <h2>${escapeHtml(item.diagnosis)}</h2>
      <p class="english">${escapeHtml(item.english)}</p>
      <div class="detail-grid">
        <section>
          <h3>Điểm cần nhìn</h3>
          <ul>${item.clues.map((clue) => `<li>${escapeHtml(clue)}</li>`).join("")}</ul>
        </section>
        <section>
          <h3>Gợi ý học</h3>
          <p>${escapeHtml(item.learn)}</p>
        </section>
        <section>
          <h3>Dễ nhầm</h3>
          <p>${escapeHtml(item.pitfall)}</p>
        </section>
      </div>
      <div class="link-row">
        <a href="${escapeHtml(fileSource(item.file))}" target="_blank" rel="noreferrer"><span>Nguồn ảnh</span>${escapeHtml(item.source)} ↗</a>
        ${links.map((link, index) => `<a href="${escapeHtml(link)}" target="_blank" rel="noreferrer"><span>${index === 0 ? "Đọc thêm" : "Phân loại/checklist"}</span>${index === 0 ? "PathologyOutlines" : link.includes("cap.org") ? "CAP" : "WHO/IARC"} ↗</a>`).join("")}
      </div>
    </div>
  `;
}

function renderOrganGrid() {
  els.organGrid.innerHTML = organs
    .filter((organ) => organ.id !== "all")
    .map((organ) => {
      const count = atlasItems.filter((item) => item.organ === organ.id).length;
      return `
        <button class="organ-card" type="button" data-organ-card="${escapeHtml(organ.id)}" style="--accent:${escapeHtml(organ.color)}">
          <span>${escapeHtml(organ.short)}</span>
          <h3>${escapeHtml(organ.label)}</h3>
          <p>${escapeHtml(organ.guide)}</p>
          <strong>${count} ảnh</strong>
        </button>
      `;
    })
    .join("");

  els.organGrid.querySelectorAll("[data-organ-card]").forEach((button) => {
    button.addEventListener("click", () => {
      state.organ = button.dataset.organCard;
      state.pattern = "all";
      renderAll();
      document.getElementById("atlas").scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });
}

function renderPatternGrid() {
  els.patternGrid.innerHTML = patternGuides
    .map(([title, detail]) => `
      <article class="pattern-card">
        <h3>${escapeHtml(title)}</h3>
        <p>${escapeHtml(detail)}</p>
      </article>
    `)
    .join("");
}

function renderSources() {
  els.sourceGrid.innerHTML = sourceCards
    .map(([title, kind, note, url]) => `
      <article class="source-card">
        <span class="eyebrow">${escapeHtml(kind)}</span>
        <h3>${escapeHtml(title)}</h3>
        <p>${escapeHtml(note)}</p>
        <a href="${escapeHtml(url)}" target="_blank" rel="noreferrer">Mở nguồn ↗</a>
      </article>
    `)
    .join("");
}

function updateStats() {
  els.statImages.textContent = String(atlasItems.length);
  els.statOrgans.textContent = String(organs.length - 1);
  els.statDiagnoses.textContent = String(atlasItems.length);
}

function renderAll() {
  const visible = filteredItems();
  if (visible.length && !visible.some((item) => item.id === state.selectedId)) {
    state.selectedId = visible[0].id;
  }
  renderOrganNav();
  renderPatternFilters();
  renderDiagnosisBrowser();
  renderGallery();
  renderCaseDetail();
}

function bindEvents() {
  els.atlasSearch.addEventListener("input", () => {
    state.query = els.atlasSearch.value;
    state.organ = "all";
    renderAll();
  });

  els.resetFilters.addEventListener("click", () => {
    state = { ...state, organ: "all", pattern: "all", query: "", selectedId: atlasItems[0].id };
    els.atlasSearch.value = "";
    renderAll();
  });
}

function init() {
  updateStats();
  renderOrganGrid();
  renderPatternGrid();
  renderSources();
  renderSpotlight();
  renderAll();
  bindEvents();
}

init();
