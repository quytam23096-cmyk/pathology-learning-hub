const workflow = [
  ["Xác định bệnh phẩm", "Vị trí lấy mẫu, loại thủ thuật, số mảnh, bên phải/trái và mức độ đủ thông tin lâm sàng."],
  ["Tách đại thể và vi thể", "Đại thể là mô tả bằng mắt thường; vi thể là pattern dưới kính hiển vi."],
  ["Tìm câu kết luận", "Kết luận chốt chẩn đoán. So lại với vi thể để hiểu vì sao có kết luận đó."],
  ["Phân tầng mức độ", "Viêm, lành tính, loạn sản, in situ, xâm nhập, di căn hoặc chưa đủ mô."],
  ["Đánh dấu yếu tố bắt buộc", "Grade, kích thước, diện cắt, LVI/PNI, hạch, hoại tử, biomarker, staging."],
  ["Mở nguồn đúng mục", "PathologyOutlines để học nhanh, WHO để chuẩn hóa phân loại, CAP để kiểm checklist."],
  ["Viết lại bằng lời mình", "Tóm tắt 3 dòng: mẫu gì, chẩn đoán gì, điều gì ảnh hưởng điều trị/theo dõi."],
];

const sampleReport = `Bệnh phẩm: Sinh thiết đại tràng sigma.
Chẩn đoán lâm sàng: U đại tràng sigma, nghi ung thư.
Đại thể: 04 mảnh mô màu trắng xám, kích thước 0,2-0,4 cm, vùi hết.
Vi thể: Các mảnh niêm mạc đại tràng có cấu trúc tuyến tăng sinh phức tạp, tế bào dị dạng, nhân lớn tăng sắc. Một số tuyến xâm nhập mô đệm, kèm phản ứng desmoplasia và hoại tử bẩn.
Kết luận: Adenocarcinoma tuyến đại tràng, biệt hóa vừa, trên mẫu sinh thiết.
HMMD/ghi chú: Nên đánh giá MMR/MSI khi có chỉ định lâm sàng.`;

const featured = [
  ["Adenocarcinoma đại tràng", "Tuyến ác tính + desmoplasia", "https://upload.wikimedia.org/wikipedia/commons/e/e8/Colon_adenocarcinoma_-_biopsy%2C_high_mag.jpg", "#atlas"],
  ["Carcinoma vú xâm nhập", "Grade + ER/PR/HER2", "https://upload.wikimedia.org/wikipedia/commons/e/ef/Histopathology_of_invasive_ductal_carcinoma_of_the_breast.jpg", "#atlas"],
  ["Carcinoma gai phổi", "Sừng hóa, p40/p63", "https://upload.wikimedia.org/wikipedia/commons/6/66/Histopathology_of_squamous-cell_carcinoma_of_the_lung.jpg", "#atlas"],
  ["Lymphoma", "Cần IHC/flow/di truyền", "https://upload.wikimedia.org/wikipedia/commons/a/a4/Histopathology_of_a_centroblast_in_follicular_lymphoma.jpg", "#atlas"],
];

const categories = [
  ["GI", "Tiêu hóa", "67 chủ đề", "Loạn sản, viêm, polyp, carcinoma, MMR/MSI.", "https://upload.wikimedia.org/wikipedia/commons/e/e8/Colon_adenocarcinoma_-_biopsy%2C_high_mag.jpg", "#systems", "#0a7a72"],
  ["BR", "Vú", "45 chủ đề", "DCIS, carcinoma xâm nhập, ER/PR/HER2, Ki-67.", "https://upload.wikimedia.org/wikipedia/commons/e/ef/Histopathology_of_invasive_ductal_carcinoma_of_the_breast.jpg", "#systems", "#eb5148"],
  ["LU", "Phổi", "38 chủ đề", "Adenocarcinoma, squamous, small cell, PD-L1.", "https://upload.wikimedia.org/wikipedia/commons/6/66/Histopathology_of_squamous-cell_carcinoma_of_the_lung.jpg", "#systems", "#318ac4"],
  ["GY", "Phụ khoa", "42 chủ đề", "HSIL, p16, p53, nội mạc, buồng trứng.", "https://upload.wikimedia.org/wikipedia/commons/4/43/Histopathology_of_squamous_cell_carcinoma_of_the_cervix.png", "#systems", "#9251b6"],
  ["GU", "Tiết niệu - nam", "41 chủ đề", "Gleason, urothelial carcinoma, RCC subtype.", "https://upload.wikimedia.org/wikipedia/commons/7/7b/Histopathology_of_prostate_adenocarcinoma_involving_adipose_tissue.jpg", "#systems", "#24b969"],
  ["SK", "Da", "36 chủ đề", "BCC, SCC, melanoma, Breslow, margin.", "https://upload.wikimedia.org/wikipedia/commons/d/d9/Histopathology_of_a_pigmented_basal-cell_carcinoma.jpg", "#systems", "#f59d18"],
  ["HE", "Huyết học", "34 chủ đề", "Lymphoma, CD markers, EBER, FISH, flow.", "https://upload.wikimedia.org/wikipedia/commons/a/a4/Histopathology_of_a_centroblast_in_follicular_lymphoma.jpg", "#systems", "#0f9ab5"],
  ["ST", "Mô mềm - xương", "31 chủ đề", "Sarcoma, FNCLCC, hoại tử, fusion.", "https://upload.wikimedia.org/wikipedia/commons/2/2c/Histopathology_of_a_biopsy_of_a_melanoma_metastasis_to_the_brain.jpg", "#systems", "#c45b8f"],
  ["HN", "Đầu cổ", "30 chủ đề", "p16, EBER, DOI, PNI, hạch cổ.", "https://upload.wikimedia.org/wikipedia/commons/4/43/Histopathology_of_squamous_cell_carcinoma_of_the_cervix.png", "#systems", "#5765c8"],
  ["CN", "Thần kinh", "29 chủ đề", "IDH, ATRX, 1p/19q, WHO grade.", "https://upload.wikimedia.org/wikipedia/commons/2/2c/Histopathology_of_a_biopsy_of_a_melanoma_metastasis_to_the_brain.jpg", "#systems", "#6b5aa9"],
  ["EN", "Nội tiết", "24 chủ đề", "Tuyến giáp, tuyến thượng thận, neuroendocrine.", "https://upload.wikimedia.org/wikipedia/commons/6/6f/Thyroid_papillary_carcinoma_histopathology_%282%29.jpg", "#systems", "#1fa48a"],
  ["IN", "Viêm - nhiễm", "28 chủ đề", "Viêm hạt, nấm, lao, CMV, H. pylori.", "https://upload.wikimedia.org/wikipedia/commons/3/31/Histopathology_of_granuloma_of_colonic_mucosa.jpg", "#systems", "#cc7a1b"],
];

const atlasItems = [
  ["Adenocarcinoma đại tràng", "Tiêu hóa", "Tuyến bất thường, mô đệm phản ứng, dấu hiệu xâm nhập.", "https://upload.wikimedia.org/wikipedia/commons/e/e8/Colon_adenocarcinoma_-_biopsy%2C_high_mag.jpg", "https://commons.wikimedia.org/wiki/File:Colon_adenocarcinoma_-_biopsy,_high_mag.jpg"],
  ["Carcinoma tuyến vú xâm nhập", "Vú", "Ổ tế bào u xâm nhập mô đệm/mỡ; đọc thêm grade và ER/PR/HER2.", "https://upload.wikimedia.org/wikipedia/commons/e/ef/Histopathology_of_invasive_ductal_carcinoma_of_the_breast.jpg", "https://commons.wikimedia.org/wiki/File:Histopathology_of_invasive_ductal_carcinoma_of_the_breast.jpg"],
  ["Carcinoma tế bào gai phổi", "Phổi", "Tế bào dạng gai, sừng hóa hoặc cầu sừng; thường hỗ trợ bằng p40/p63.", "https://upload.wikimedia.org/wikipedia/commons/6/66/Histopathology_of_squamous-cell_carcinoma_of_the_lung.jpg", "https://commons.wikimedia.org/wiki/File:Histopathology_of_squamous-cell_carcinoma_of_the_lung.jpg"],
  ["Carcinoma gai cổ tử cung", "Phụ khoa", "Biểu mô gai ác tính xâm nhập; liên quan bối cảnh HPV/p16 tùy trường hợp.", "https://upload.wikimedia.org/wikipedia/commons/4/43/Histopathology_of_squamous_cell_carcinoma_of_the_cervix.png", "https://commons.wikimedia.org/wiki/File:Histopathology_of_squamous_cell_carcinoma_of_the_cervix.png"],
  ["Papillary thyroid carcinoma", "Nội tiết", "Nhân sáng, rãnh nhân, thể vùi; cần đối chiếu biến thể và xâm nhập.", "https://upload.wikimedia.org/wikipedia/commons/6/6f/Thyroid_papillary_carcinoma_histopathology_%282%29.jpg", "https://commons.wikimedia.org/wiki/File:Thyroid_papillary_carcinoma_histopathology_(2).jpg"],
  ["Adenocarcinoma tuyến tiền liệt", "GU", "Tuyến nhỏ xâm nhập, thiếu lớp basal; đọc Gleason/Grade Group.", "https://upload.wikimedia.org/wikipedia/commons/7/7b/Histopathology_of_prostate_adenocarcinoma_involving_adipose_tissue.jpg", "https://commons.wikimedia.org/wiki/File:Histopathology_of_prostate_adenocarcinoma_involving_adipose_tissue.jpg"],
  ["Basal-cell carcinoma", "Da", "Đám tế bào dạng basal, palisading ngoại vi, khoảng tách mô đệm.", "https://upload.wikimedia.org/wikipedia/commons/d/d9/Histopathology_of_a_pigmented_basal-cell_carcinoma.jpg", "https://commons.wikimedia.org/wiki/File:Histopathology_of_a_pigmented_basal-cell_carcinoma.jpg"],
  ["Melanoma di căn hạch", "Da", "Tế bào hắc tố ác tính; cần S100/SOX10/Melan-A/HMB45 theo bối cảnh.", "https://upload.wikimedia.org/wikipedia/commons/8/87/Histopathology_of_a_metastatic_melanoma_to_a_lymph_node.jpg", "https://commons.wikimedia.org/wiki/File:Histopathology_of_a_metastatic_melanoma_to_a_lymph_node.jpg"],
  ["Follicular lymphoma", "Huyết học", "Đọc kiến trúc hạch, centrocyte/centroblast; cần panel CD và Ki-67.", "https://upload.wikimedia.org/wikipedia/commons/a/a4/Histopathology_of_a_centroblast_in_follicular_lymphoma.jpg", "https://commons.wikimedia.org/wiki/File:Histopathology_of_a_centroblast_in_follicular_lymphoma.jpg"],
  ["Viêm hạt niêm mạc đại tràng", "Viêm", "Cụm mô bào, có/không hoại tử; nghĩ nhiễm trùng, Crohn, dị vật.", "https://upload.wikimedia.org/wikipedia/commons/3/31/Histopathology_of_granuloma_of_colonic_mucosa.jpg", "https://commons.wikimedia.org/wiki/File:Histopathology_of_granuloma_of_colonic_mucosa.jpg"],
  ["Papillary renal cell carcinoma", "Thận", "Cấu trúc nhú, đại thực bào bọt, hemosiderin; cần subtype và grade.", "https://upload.wikimedia.org/wikipedia/commons/8/8e/Histopathology_of_papillary_renal_cell_carcinoma_type_2.jpg", "https://commons.wikimedia.org/wiki/File:Histopathology_of_papillary_renal_cell_carcinoma_type_2.jpg"],
  ["NK/T-cell lymphoma", "Huyết học", "Tổn thương lymphoid ác tính; cần CD markers, EBER và bối cảnh vị trí.", "https://upload.wikimedia.org/wikipedia/commons/c/c4/Histopathology_of_extranodal_NK-T_cell_lymphoma%2C_nasal_type.png", "https://commons.wikimedia.org/wiki/File:Histopathology_of_extranodal_NK-T_cell_lymphoma,_nasal_type.png"],
];

const systems = [
  {
    name: "Tiêu hóa",
    tag: "GI",
    summary: "Tập trung vào vị trí lấy mẫu, mức độ loạn sản, có xâm nhập hay không, subtype và MMR/MSI khi là carcinoma đại trực tràng.",
    questions: ["Sinh thiết hay bệnh phẩm cắt?", "Loạn sản cao độ hay xâm nhập mô đệm?", "Có margin, hạch, LVI/PNI, pT/pN không?"],
    keys: ["Adenoma", "Dysplasia", "Adenocarcinoma", "MMR/MSI", "pTNM"],
    links: [["PathologyOutlines GI", "https://www.pathologyoutlines.com/gastrointestinal.html"], ["WHO Digestive", "https://publications.iarc.who.int/Book-And-Report-Series/Who-Classification-Of-Tumours/Digestive-System-Tumours-2019"]],
  },
  {
    name: "Vú",
    tag: "Breast",
    summary: "Đọc in situ hay xâm nhập, grade, ER/PR/HER2, Ki-67, diện cắt và hạch nách.",
    questions: ["DCIS hay carcinoma xâm nhập?", "Grade mô học và kích thước u?", "ER, PR, HER2, Ki-67 đã có chưa?"],
    keys: ["DCIS", "IDC/ILC", "ER/PR", "HER2", "Margin"],
    links: [["PathologyOutlines Breast", "https://www.pathologyoutlines.com/breast.html"], ["WHO Breast", "https://publications.iarc.who.int/Book-And-Report-Series/Who-Classification-Of-Tumours/Breast-Tumours-2019"]],
  },
  {
    name: "Phổi - màng phổi",
    tag: "Thoracic",
    summary: "Xác định subtype carcinoma, phân biệt nguyên phát/di căn, và tìm biomarker điều trị đích khi là NSCLC.",
    questions: ["Adenocarcinoma, squamous, small cell hay loại khác?", "TTF-1, p40, synaptophysin/chromogranin có hỗ trợ không?", "EGFR/ALK/ROS1/PD-L1 có được yêu cầu không?"],
    keys: ["TTF-1", "p40", "Small cell", "PD-L1", "EGFR/ALK"],
    links: [["PathologyOutlines Lung", "https://www.pathologyoutlines.com/lung.html"], ["WHO Thoracic", "https://publications.iarc.who.int/Book-And-Report-Series/Who-Classification-Of-Tumours/Thoracic-Tumours-2021"]],
  },
  {
    name: "Phụ khoa",
    tag: "Gyn",
    summary: "Gắn vị trí giải phẫu với HPV/p16, type mô học, độ xâm nhập, LVSI, diện cắt và giai đoạn.",
    questions: ["Cổ tử cung, nội mạc tử cung hay buồng trứng?", "Tổn thương tiền ung thư hay xâm nhập?", "p16, p53, ER/PR hoặc MMR có cần không?"],
    keys: ["CIN/HSIL", "Endometrioid", "Serous", "p16", "p53"],
    links: [["PathologyOutlines Female Genital", "https://www.pathologyoutlines.com/femalegenital.html"], ["WHO Female Genital", "https://publications.iarc.who.int/Book-And-Report-Series/Who-Classification-Of-Tumours/Female-Genital-Tumours-2020"]],
  },
  {
    name: "Tiết niệu - nam khoa",
    tag: "GU",
    summary: "Tuyến tiền liệt cần Gleason/Grade Group; bàng quang cần xâm nhập cơ; thận cần subtype và grade.",
    questions: ["Mẫu sinh thiết, TUR hay phẫu thuật cắt?", "Có xâm nhập cơ, vỏ, mạch máu hoặc diện cắt?", "Grade Group, ISUP grade hoặc subtype đã rõ chưa?"],
    keys: ["Gleason", "Grade Group", "Urothelial", "Muscle invasion", "Renal subtype"],
    links: [["PathologyOutlines GU", "https://www.pathologyoutlines.com/genitourinary.html"], ["WHO Urinary and Male Genital", "https://publications.iarc.who.int/Book-And-Report-Series/Who-Classification-Of-Tumours/Urinary-And-Male-Genital-Tumours-2022"]],
  },
  {
    name: "Da",
    tag: "Skin",
    summary: "Da cần đọc loại u, độ sâu xâm nhập, ulceration, margin; melanoma có Breslow, mitosis và satellitosis.",
    questions: ["U biểu mô, melanocytic hay lymphoid?", "Breslow/Clark, ulceration, mitosis có ghi không?", "Diện cắt sâu và bên còn u không?"],
    keys: ["BCC", "SCC", "Melanoma", "Breslow", "Margin"],
    links: [["PathologyOutlines Skin", "https://www.pathologyoutlines.com/skintumors.html"], ["WHO Skin", "https://publications.iarc.who.int/Book-And-Report-Series/Who-Classification-Of-Tumours/Skin-Tumours-2025"]],
  },
  {
    name: "Huyết học - lympho",
    tag: "Heme",
    summary: "Ghép hình thái, flow/IHC, di truyền, vị trí hạch và bối cảnh lâm sàng.",
    questions: ["Tổn thương phản ứng hay lymphoma?", "Panel CD markers có đủ để phân dòng?", "Có cần FISH, clonality hoặc molecular không?"],
    keys: ["CD20/CD3", "Ki-67", "EBER", "Flow", "FISH"],
    links: [["PathologyOutlines Hematopathology", "https://www.pathologyoutlines.com/hematopathology.html"], ["WHO Haematolymphoid", "https://publications.iarc.who.int/Book-And-Report-Series/Who-Classification-Of-Tumours/Haematolymphoid-Tumours-2024"]],
  },
  {
    name: "CNS",
    tag: "CNS",
    summary: "CNS hiện đại dựa vào tích hợp mô học và phân tử: IDH, 1p/19q, ATRX, p53, methylation.",
    questions: ["U thần kinh đệm, màng não, phôi thai hay di căn?", "IDH, ATRX, p53, 1p/19q có định hướng không?", "WHO grade và tiêu chuẩn phân tử đã rõ chưa?"],
    keys: ["IDH", "1p/19q", "ATRX", "WHO grade", "Methylation"],
    links: [["PathologyOutlines CNS", "https://www.pathologyoutlines.com/cnstumors.html"], ["WHO CNS", "https://publications.iarc.who.int/Book-And-Report-Series/Who-Classification-Of-Tumours/Central-Nervous-System-Tumours-2021"]],
  },
  {
    name: "Đầu cổ",
    tag: "H&N",
    summary: "Cần gắn với vị trí, HPV/EBV khi phù hợp, type mô học, DOI, PNI, margin và hạch cổ.",
    questions: ["Vị trí chính xác là gì?", "HPV/p16 hoặc EBV có liên quan không?", "PNI, LVI, DOI, margin đã ghi chưa?"],
    keys: ["SCC", "p16", "EBER", "DOI", "PNI"],
    links: [["PathologyOutlines Head & Neck", "https://www.pathologyoutlines.com/headneck.html"], ["WHO Head and Neck", "https://publications.iarc.who.int/Book-And-Report-Series/Who-Classification-Of-Tumours/Head-And-Neck-Tumours-2024"]],
  },
];

const terms = [
  ["Đại thể", "Mô tả bệnh phẩm bằng mắt thường: kích thước, màu sắc, số mảnh, vị trí u, diện cắt và cách lấy mẫu."],
  ["Vi thể", "Mô tả hình ảnh dưới kính hiển vi, là phần giải thích cơ sở của kết luận."],
  ["H&E", "Nhuộm nền tảng: hematoxylin làm nhân xanh tím, eosin làm bào tương/mô đệm hồng."],
  ["Loạn sản", "Biến đổi tiền ung thư của biểu mô; cần chú ý mức độ thấp/cao và có xâm nhập hay không."],
  ["Carcinoma in situ", "Tế bào ác tính còn trong lớp biểu mô, chưa vượt màng đáy để xâm nhập mô đệm."],
  ["Xâm nhập", "U vượt cấu trúc giới hạn bình thường vào mô xung quanh; thường làm thay đổi điều trị và staging."],
  ["Grade", "Độ biệt hóa/độ ác tính mô học. Grade khác stage."],
  ["Stage/TNM", "Giai đoạn dựa trên u nguyên phát, hạch vùng và di căn xa."],
  ["Margin/diện cắt", "Bờ phẫu thuật còn u hay không. Margin dương tính thường tăng nguy cơ tái phát tại chỗ."],
  ["LVI", "Xâm nhập mạch máu hoặc mạch bạch huyết."],
  ["PNI", "Xâm nhập quanh dây thần kinh, quan trọng ở đầu cổ, tụy, tiền liệt tuyến và nhiều u khác."],
  ["Hoại tử", "Vùng mô chết trong u; có thể liên quan grade hoặc đáp ứng điều trị."],
  ["Mitosis", "Số phân bào; cách tính và ý nghĩa tùy loại u."],
  ["HMMD/IHC", "Hóa mô miễn dịch dùng kháng thể để nhận diện dòng biệt hóa hoặc biomarker điều trị."],
  ["Ki-67", "Marker tăng sinh tế bào; đọc theo bối cảnh loại u, không dùng đơn độc."],
  ["p16", "Có thể liên quan HPV trong một số bối cảnh, nhưng ý nghĩa khác nhau theo cơ quan."],
  ["p53", "Kiểu biểu hiện hỗ trợ định hướng bất thường TP53 ở một số u."],
  ["MMR/MSI", "Hệ sửa lỗi bắt cặp DNA; mất MMR có thể gợi ý MSI-high và liên quan Lynch/miễn dịch trị liệu."],
  ["ER/PR/HER2", "Bộ biomarker then chốt trong ung thư vú."],
  ["Gleason/Grade Group", "Hệ thống grade của ung thư tuyến tiền liệt."],
  ["Breslow", "Độ dày melanoma tính bằng mm, yếu tố staging quan trọng."],
  ["Synoptic report", "Báo cáo dạng checklist giúp không bỏ sót yếu tố quan trọng."],
  ["Desmoplasia", "Phản ứng mô đệm xơ quanh u xâm nhập, hay gặp trong carcinoma tuyến."],
  ["Necrosis bẩn", "Hoại tử trong lòng tuyến, gợi ý thường gặp ở adenocarcinoma đại trực tràng."],
  ["TTF-1", "Marker hỗ trợ nguồn gốc phổi/tuyến giáp tùy bối cảnh."],
  ["p40", "Marker hỗ trợ biệt hóa gai, thường dùng trong carcinoma phổi."],
  ["EBER", "ISH phát hiện EBV, hữu ích trong một số lymphoma và carcinoma vòm."],
  ["SOX10", "Marker hỗ trợ melanocytic và một số u nguồn gốc thần kinh."],
  ["1p/19q", "Đồng mất đoạn quan trọng trong phân loại oligodendroglioma."],
  ["IDH", "Marker/phân tử quan trọng trong u thần kinh đệm và một số bối cảnh khác."],
];

const sourceCards = [
  ["PathologyOutlines", "Textbook online", "Học nhanh từng bệnh: clinical, gross, microscopic, IHC, differential diagnosis và references.", "https://www.pathologyoutlines.com/"],
  ["WHO Classification of Tumours", "Phân loại u", "Chuẩn hóa tên u, tiêu chuẩn phân loại, grade và thay đổi mới theo hệ cơ quan.", "https://tumourclassification.iarc.who.int/"],
  ["IARC WHO Blue Books", "Danh mục sách", "Trang công khai để xem các volume WHO theo năm và hệ cơ quan.", "https://publications.iarc.who.int/Book-And-Report-Series/Who-Classification-Of-Tumours"],
  ["CAP Cancer Protocols", "Checklist báo cáo", "Kiểm tra các yếu tố bắt buộc trong báo cáo ung thư chuẩn hóa.", "https://www.cap.org/protocols-and-guidelines/cancer-protocols/current-cancer-protocols/"],
  ["NCI Pathology Reports", "Giải thích dễ đọc", "Nguồn nền tảng về vai trò báo cáo GPB và các phần thường gặp.", "https://www.cancer.gov/about-cancer/diagnosis-staging/diagnosis/pathology-reports-fact-sheet"],
  ["Wikimedia Commons", "Ảnh minh họa mở", "Nguồn ảnh atlas có dẫn trang file; kiểm tra giấy phép từng ảnh khi tái sử dụng chính thức.", "https://commons.wikimedia.org/wiki/Category:Histopathology"],
];

const els = {
  featuredGrid: document.getElementById("featuredGrid"),
  categoryGrid: document.getElementById("categoryGrid"),
  workflowList: document.getElementById("workflowList"),
  reportInput: document.getElementById("reportInput"),
  analyzeReport: document.getElementById("analyzeReport"),
  loadSample: document.getElementById("loadSample"),
  clearReport: document.getElementById("clearReport"),
  reportFindings: document.getElementById("reportFindings"),
  atlasGrid: document.getElementById("atlasGrid"),
  atlasSearch: document.getElementById("atlasSearch"),
  systemGrid: document.getElementById("systemGrid"),
  systemSearch: document.getElementById("systemSearch"),
  termGrid: document.getElementById("termGrid"),
  termSearch: document.getElementById("termSearch"),
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

function escapeRegExp(value) {
  return String(value).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function containsTerm(text, term) {
  const normalizedTerm = normalize(term);
  const compactTerm = normalizedTerm.replace(/[^a-z0-9]/g, "");
  if (compactTerm.length <= 4 && /^[a-z0-9]+$/.test(compactTerm)) {
    return new RegExp(`(^|[^a-z0-9])${escapeRegExp(normalizedTerm)}([^a-z0-9]|$)`, "i").test(text);
  }
  return text.includes(normalizedTerm);
}

function renderFeatured() {
  els.featuredGrid.innerHTML = featured
    .map(([title, subtitle, image, href]) => `
      <a class="featured-card" href="${escapeHtml(href)}" style="--image:url('${escapeHtml(image)}')">
        <strong>${escapeHtml(title)}</strong>
        <span>${escapeHtml(subtitle)}</span>
      </a>
    `)
    .join("");
}

function renderCategories() {
  els.categoryGrid.innerHTML = categories
    .map(([icon, name, count, summary, image, href, color]) => `
      <a class="category-card" href="${escapeHtml(href)}" style="--image:url('${escapeHtml(image)}'); --accent:${escapeHtml(color)}; --accent-soft:${escapeHtml(color)}55">
        <span class="category-icon">${escapeHtml(icon)}</span>
        <div>
          <h3>${escapeHtml(name)}</h3>
          <p>${escapeHtml(summary)}</p>
        </div>
        <div class="category-meta">
          <span>${escapeHtml(count)}</span>
          <span>Khám phá →</span>
        </div>
      </a>
    `)
    .join("");
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
    ["Bệnh phẩm/vị trí", ["bệnh phẩm", "sinh thiết", "phẫu thuật", "mẫu", "vị trí"]],
    ["Chẩn đoán lâm sàng", ["chẩn đoán lâm sàng", "lâm sàng"]],
    ["Đại thể", ["đại thể", "macroscopic", "gross"]],
    ["Vi thể", ["vi thể", "microscopic", "mô học"]],
    ["Kết luận", ["kết luận", "diagnosis"]],
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
  if (riskSignals.includes("Ác tính/xâm nhập")) questions.push("Nếu là u ác tính: kiểm tra grade, xâm nhập, diện cắt, LVI/PNI, hạch và biomarker.");
  if (riskSignals.includes("Dấu ấn điều trị")) questions.push("Đọc biomarker theo đúng loại u; không diễn giải Ki-67/p53/p16 đơn độc.");
  if (!questions.length) questions.push("Tóm tắt lại: bệnh phẩm gì, pattern chính là gì, kết luận thuộc nhóm nào?");

  return { sections, missing, riskSignals, questions };
}

function renderReportFindings() {
  const text = els.reportInput.value.trim();
  if (!text) {
    els.reportFindings.innerHTML = `<div class="empty-state">Dán báo cáo vào ô bên trái hoặc bấm “Nạp ca mẫu” để bắt đầu luyện đọc.</div>`;
    return;
  }

  const result = detectReport(text);
  const sections = result.sections.length ? result.sections.join(", ") : "Chưa nhận diện rõ";
  const missing = result.missing.slice(0, 4).join(", ") || "Không có mục lớn bị thiếu rõ ràng";
  const risks = result.riskSignals.length ? result.riskSignals.join(", ") : "Chưa thấy tín hiệu nguy cơ cao trong từ khóa";

  els.reportFindings.innerHTML = `
    <article class="finding-card"><strong>Mục đã thấy</strong><p>${escapeHtml(sections)}</p></article>
    <article class="finding-card"><strong>Cần kiểm tra thêm</strong><p>${escapeHtml(missing)}</p></article>
    <article class="finding-card"><strong>Tín hiệu cần chú ý</strong><p>${escapeHtml(risks)}</p></article>
    <article class="finding-card"><strong>Câu hỏi đọc tiếp</strong><ul>${result.questions.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul></article>
  `;
}

function renderAtlas() {
  const query = normalize(els.atlasSearch.value);
  const filtered = atlasItems.filter((item) => normalize(item.join(" ")).includes(query));
  if (!filtered.length) {
    els.atlasGrid.innerHTML = `<div class="empty-state">Không thấy ảnh phù hợp. Thử từ khóa rộng hơn như carcinoma, viêm, vú, phổi.</div>`;
    return;
  }

  els.atlasGrid.innerHTML = filtered
    .map(([title, tag, note, image, source]) => `
      <article class="atlas-card">
        <img src="${escapeHtml(image)}" alt="${escapeHtml(title)}" loading="lazy" />
        <div class="atlas-body">
          <span class="tag">${escapeHtml(tag)}</span>
          <h3>${escapeHtml(title)}</h3>
          <p>${escapeHtml(note)}</p>
          <a class="caption-link" href="${escapeHtml(source)}" target="_blank" rel="noreferrer">Nguồn ảnh ↗</a>
        </div>
      </article>
    `)
    .join("");
}

function renderSystems() {
  const query = normalize(els.systemSearch.value);
  const filtered = systems.filter((item) => normalize([item.name, item.tag, item.summary, item.keys.join(" "), item.questions.join(" ")].join(" ")).includes(query));
  if (!filtered.length) {
    els.systemGrid.innerHTML = `<div class="empty-state">Không thấy chuyên khoa phù hợp. Thử từ khóa như marker, hạch, margin, carcinoma.</div>`;
    return;
  }

  els.systemGrid.innerHTML = filtered
    .map((item) => `
      <article class="system-card">
        <div>
          <span class="tag">${escapeHtml(item.tag)}</span>
          <h3>${escapeHtml(item.name)}</h3>
          <p>${escapeHtml(item.summary)}</p>
        </div>
        <div class="chip-row">${item.keys.map((key) => `<span class="tag">${escapeHtml(key)}</span>`).join("")}</div>
        <ul class="mini-list">${item.questions.map((question) => `<li>${escapeHtml(question)}</li>`).join("")}</ul>
        <div class="link-row">${item.links.map(([label, href]) => `<a href="${escapeHtml(href)}" target="_blank" rel="noreferrer">${escapeHtml(label)} ↗</a>`).join("")}</div>
      </article>
    `)
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
    .map(([title, detail]) => `<article class="term-card"><strong>${escapeHtml(title)}</strong><p>${escapeHtml(detail)}</p></article>`)
    .join("");
}

function renderSources() {
  els.sourceGrid.innerHTML = sourceCards
    .map(([title, kind, note, link]) => `
      <article class="source-card">
        <span class="tag">${escapeHtml(kind)}</span>
        <h3>${escapeHtml(title)}</h3>
        <p>${escapeHtml(note)}</p>
        <a href="${escapeHtml(link)}" target="_blank" rel="noreferrer">Mở nguồn ↗</a>
      </article>
    `)
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
  els.atlasSearch.addEventListener("input", renderAtlas);
  els.systemSearch.addEventListener("input", renderSystems);
  els.termSearch.addEventListener("input", renderTerms);
}

function initStats() {
  els.statCategories.textContent = String(categories.length);
  els.statAtlas.textContent = String(atlasItems.length);
  els.statTerms.textContent = `${terms.length}+`;
}

function init() {
  initStats();
  renderFeatured();
  renderCategories();
  renderWorkflow();
  renderReportFindings();
  renderAtlas();
  renderSystems();
  renderTerms();
  renderSources();
  bindEvents();
}

init();
