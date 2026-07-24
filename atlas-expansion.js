(function () {
  "use strict";

  const IARC = "https://tumourclassification.iarc.who.int";
  const COMMONS = "https://commons.wikimedia.org/wiki/File:";
  const commonsSource = (file) => `${COMMONS}${encodeURIComponent(file.replaceAll(" ", "_"))}`;
  const entry = (item, learningEn) => ({ ...item, learningEn });

  const expansionCases = [
    entry({
      id: "cns-astrocytoma-idh-mutant",
      chapter: "cns",
      diagnosis: "U sao bào, đột biến IDH",
      english: "Astrocytoma, IDH-mutant",
      pattern: ["ihc"],
      micro: [
        "U thần kinh đệm lan tỏa, thường gồm tế bào dạng sao với mức độ không điển hình và mật độ tế bào thay đổi theo độ mô học",
        "Hoại tử và/hoặc tăng sinh vi mạch gợi độ cao; mất đồng hợp tử CDKN2A/B đủ để xếp CNS WHO độ 4 ngay cả khi thiếu hai đặc điểm này",
        "Chẩn đoán tích hợp cần chứng minh đột biến IDH và loại trừ đồng mất đoạn toàn nhánh 1p/19q",
      ],
      report: [
        "Chẩn đoán tích hợp và CNS WHO grade",
        "IDH1/IDH2; ATRX và p53; tình trạng CDKN2A/B khi cần phân độ",
        "Hoại tử, tăng sinh vi mạch, hoạt động phân bào và phương pháp xét nghiệm phân tử",
      ],
      memory: "IDH đột biến + mất ATRX/p53 bất thường + không đồng mất đoạn 1p/19q hướng tới u sao bào, đột biến IDH.",
      pitfall: "Không chẩn đoán chỉ từ hình thái dạng ít nhánh; trạng thái IDH và 1p/19q là thành phần bắt buộc của chẩn đoán tích hợp.",
      markers: ["IDH1 R132H", "ATRX", "p53", "1p/19q", "CDKN2A/B", "GFAP", "OLIG2"],
    }, {
      micro: [
        "A diffusely infiltrating astrocytic glioma with cellularity and atypia varying by grade",
        "Necrosis and/or microvascular proliferation support high grade; homozygous CDKN2A/B deletion is sufficient for CNS WHO grade 4",
        "Integrated diagnosis requires an IDH mutation and exclusion of whole-arm 1p/19q codeletion",
      ],
      report: ["Integrated diagnosis and CNS WHO grade", "IDH1/IDH2, ATRX, p53 and CDKN2A/B where required", "Necrosis, microvascular proliferation, mitotic activity and testing method"],
      memory: "IDH mutation with ATRX loss or abnormal p53 and no 1p/19q codeletion supports astrocytoma, IDH-mutant.",
      pitfall: "Oligodendroglial-like morphology is not sufficient; IDH and 1p/19q status are required for classification.",
    }),
    entry({
      id: "cns-oligodendroglioma-idh-codeleted",
      chapter: "cns",
      diagnosis: "U tế bào ít nhánh, đột biến IDH và đồng mất đoạn 1p/19q",
      english: "Oligodendroglioma, IDH-mutant and 1p/19q-codeleted",
      pattern: ["ihc"],
      micro: [
        "Tế bào u đơn dạng, nhân tròn; quầng sáng quanh nhân thường là giả ảnh do cố định",
        "Mạng mao mạch phân nhánh mảnh và vi vôi hóa có thể nổi bật",
        "Định nghĩa bằng đột biến IDH kết hợp đồng mất đoạn toàn nhánh 1p và 19q; hình thái đơn thuần không đủ",
      ],
      report: [
        "Chẩn đoán tích hợp và CNS WHO grade 2 hoặc 3",
        "Phương pháp xác định IDH1/IDH2 và đồng mất đoạn toàn nhánh 1p/19q",
        "Hoạt động phân bào, tăng sinh vi mạch, hoại tử và chỉ số Ki-67 trong bối cảnh phù hợp",
      ],
      memory: "IDH đột biến + đồng mất đoạn toàn nhánh 1p/19q là cặp tiêu chuẩn định danh u tế bào ít nhánh.",
      pitfall: "FISH mất từng locus đơn lẻ có thể không chứng minh đồng mất đoạn toàn nhánh; cần phương pháp được thẩm định phù hợp.",
      markers: ["IDH1 R132H", "1p/19q", "ATRX bảo tồn", "p53", "OLIG2", "Ki-67"],
    }, {
      micro: ["Monomorphic round nuclei with fixation-related perinuclear halos", "A delicate branching capillary network and calcification may be conspicuous", "Defined by an IDH mutation plus whole-arm 1p/19q codeletion; morphology alone is insufficient"],
      report: ["Integrated diagnosis and CNS WHO grade 2 or 3", "Method used to establish IDH status and whole-arm 1p/19q codeletion", "Mitotic activity, microvascular proliferation, necrosis and contextual Ki-67"],
      memory: "An IDH mutation plus whole-arm 1p/19q codeletion defines oligodendroglioma.",
      pitfall: "Single-locus FISH losses may not establish whole-arm codeletion; use a validated method and interpret in context.",
    }),
    entry({
      id: "cns-pilocytic-astrocytoma",
      chapter: "cns",
      diagnosis: "U sao bào dạng lông",
      english: "Pilocytic astrocytoma",
      pattern: ["ihc"],
      micro: [
        "Cấu trúc hai pha gồm vùng đặc với tế bào dạng lông và vùng thưa, vi nang",
        "Sợi Rosenthal và thể hạt ưa eosin là dấu hiệu hỗ trợ điển hình nhưng không bắt buộc",
        "Mạch dạng cuộn và thoái hóa có thể gặp; dị dạng nhân đơn thuần không đồng nghĩa ác tính",
      ],
      report: ["Vị trí, kích thước và mức độ cắt bỏ", "Đặc điểm không điển hình như phân bào tăng, hoại tử hoặc tăng sinh vi mạch", "BRAF/MAPK khi hình thái hoặc vị trí cần xác nhận"],
      memory: "Hai pha + sợi Rosenthal + thể hạt ưa eosin là bộ ba gợi ý u sao bào dạng lông.",
      pitfall: "Thoái hóa nhân có thể rất rõ nhưng không tự động đồng nghĩa mất biệt hóa; phải đánh giá toàn bộ tiêu bản.",
      markers: ["GFAP", "OLIG2", "BRAF alteration", "Ki-67", "ATRX bảo tồn"],
    }, {
      micro: ["A biphasic pattern with compact piloid and loose microcystic areas", "Rosenthal fibres and eosinophilic granular bodies are characteristic supportive findings", "Glomeruloid vessels and degenerative atypia may occur; atypia alone does not establish aggressive behaviour"],
      report: ["Site, size and extent of resection", "Any increased mitoses, necrosis or microvascular proliferation", "BRAF/MAPK testing when morphology or location warrants confirmation"],
      memory: "Biphasic architecture, Rosenthal fibres and eosinophilic granular bodies form the classic pattern.",
      pitfall: "Marked degenerative atypia must not be equated with anaplasia without corroborating features.",
    }),
    entry({
      id: "cns-medulloblastoma-histologic",
      chapter: "cns",
      diagnosis: "U nguyên bào tủy, xác định bằng mô học",
      english: "Medulloblastoma, histologically defined",
      pattern: ["ihc"],
      micro: [
        "U tế bào tròn nhỏ, giàu tế bào, tỷ lệ nhân/bào tương cao, nhiều phân bào và thể chết theo chương trình",
        "Hoa hồng Homer Wright có thể hiện diện; cần mô tả kiểu cổ điển, dạng nốt/mất mô đệm hoặc tế bào lớn/không biệt hóa",
        "Phân nhóm phân tử WNT, SHH hoặc non-WNT/non-SHH được ưu tiên khi có điều kiện vì có ý nghĩa phân loại và tiên lượng",
      ],
      report: ["Chẩn đoán tích hợp và kiểu mô học", "Nhóm phân tử và phương pháp xét nghiệm nếu có", "Mức độ cắt bỏ, gieo rắc và dữ liệu dịch não tủy/hình ảnh học theo nhóm điều trị"],
      memory: "U tế bào tròn nhỏ ở tiểu não + hoạt động phân bào/chết theo chương trình cao; sau đó phải hướng tới phân nhóm phân tử.",
      pitfall: "Không dùng HMMD thay thế hoàn toàn phân nhóm phân tử khi kết quả sẽ quyết định phân loại hoặc xử trí.",
      markers: ["Synaptophysin", "INSM1", "NeuN", "β-catenin", "YAP1", "GAB1", "OTX2"],
    }, {
      micro: ["A densely cellular small round blue cell tumour with brisk mitoses and apoptosis", "Homer Wright rosettes may occur; record classic, desmoplastic/nodular or large cell/anaplastic morphology", "WNT, SHH and non-WNT/non-SHH molecular assignment is preferred whenever available"],
      report: ["Integrated diagnosis and histological pattern", "Molecular group and testing method, when available", "Extent of resection and dissemination data according to the treatment protocol"],
      memory: "A cerebellar small round blue cell tumour with brisk turnover should trigger molecular subgrouping after morphology.",
      pitfall: "Immunohistochemical surrogates do not replace validated molecular classification when management depends on the result.",
    }),

    entry({
      id: "headneck-mucoepidermoid-carcinoma",
      chapter: "headneck",
      diagnosis: "Ung thư biểu mô nhầy bì",
      english: "Mucoepidermoid carcinoma",
      pattern: ["carcinoma", "glandular", "squamous", "ihc"],
      micro: [
        "Hỗn hợp tế bào tiết nhầy, tế bào trung gian và tế bào dạng biểu bì với tỷ lệ thay đổi",
        "U độ thấp thường ưu thế nang; u độ cao đặc hơn, có không điển hình, hoại tử và phân bào tăng",
        "Dung hợp CRTC1/3::MAML2 hỗ trợ trong ca khó nhưng không thay thế hình thái và phân độ",
      ],
      report: ["Vị trí, kích thước, độ mô học và hệ thống phân độ sử dụng", "Xâm nhập ngoài tuyến, LVI/PNI và diện cắt", "Tình trạng hạch; kết quả MAML2 nếu đã xét nghiệm"],
      memory: "Nhầy + trung gian + dạng biểu bì là ba quần thể phải chủ động tìm.",
      pitfall: "U độ cao có thể rất ít tế bào nhầy và nhầm với SCC; nên tìm ổ nang, nhuộm nhầy và cân nhắc MAML2.",
      markers: ["p40", "p63", "CK5/6", "Mucicarmine/PAS-D", "MAML2 rearrangement"],
    }, {
      micro: ["A variable mixture of mucous, intermediate and epidermoid cells", "Low-grade tumours are often cystic, whereas high-grade tumours are more solid with atypia, necrosis and mitoses", "CRTC1/3::MAML2 fusion supports difficult cases but does not replace morphology and grading"],
      report: ["Site, size, grade and grading system", "Extraglandular extension, LVI/PNI and margins", "Nodal status and MAML2 result if tested"],
      memory: "Actively seek the triad of mucous, intermediate and epidermoid cells.",
      pitfall: "High-grade tumours may contain very few mucous cells and mimic squamous carcinoma.",
    }),
    entry({
      id: "headneck-adenoid-cystic-carcinoma",
      chapter: "headneck",
      diagnosis: "Ung thư biểu mô dạng tuyến nang",
      english: "Adenoid cystic carcinoma",
      pattern: ["carcinoma", "glandular", "ihc"],
      micro: [
        "Cấu trúc sàng, ống hoặc đặc tạo bởi hai quần thể tế bào ống và cơ biểu mô/đáy",
        "Các khoang giả tuyến chứa chất màng đáy hyalin; xâm nhập quanh thần kinh rất thường gặp",
        "Thành phần đặc và chuyển dạng độ cao phải được ghi nhận vì liên quan hành vi xấu hơn",
      ],
      report: ["Típ cấu trúc và tỷ lệ thành phần đặc", "PNI, LVI, xâm nhập ngoài tuyến và diện cắt", "Tình trạng hạch và chuyển dạng độ cao nếu có"],
      memory: "Kiểu sàng như tổ ong + chất hyalin + ái tính quanh thần kinh là hình ảnh kinh điển.",
      pitfall: "Không nhầm với u tuyến đa hình, ung thư biểu mô biểu mô-cơ biểu mô hoặc ung thư biểu mô tiết; đọc panel theo hai khoang tế bào.",
      markers: ["MYB", "SOX10", "CD117", "p63/p40 theo khoang", "S100", "MYB::NFIB"],
    }, {
      micro: ["Cribriform, tubular or solid growth formed by ductal and myoepithelial/basal cell populations", "Pseudolumina contain hyaline basement-membrane material; perineural invasion is common", "Record a solid component and high-grade transformation because they carry adverse significance"],
      report: ["Architectural pattern and proportion of solid growth", "PNI, LVI, extraglandular extension and margins", "Nodal status and high-grade transformation"],
      memory: "Cribriform honeycomb spaces, hyaline material and perineural tropism form the classic triad.",
      pitfall: "Separate it from pleomorphic adenoma, epithelial-myoepithelial carcinoma and secretory carcinoma using architecture and compartmental staining.",
    }),
    entry({
      id: "headneck-acinic-cell-carcinoma",
      chapter: "headneck",
      diagnosis: "Ung thư biểu mô tế bào nang tuyến nước bọt",
      english: "Acinic cell carcinoma",
      pattern: ["carcinoma", "glandular", "ihc"],
      micro: [
        "Biệt hóa nang thanh dịch với bào tương hạt ưa kiềm chứa hạt zymogen PAS dương tính, kháng diastase",
        "Có thể gặp kiểu đặc, vi nang, nang-nhú hoặc dạng tuyến; tế bào sáng và tế bào không đặc hiệu có thể làm lu mờ biệt hóa nang",
        "HMMD nhân NR4A3 hỗ trợ mạnh trong bối cảnh thích hợp",
      ],
      report: ["Vị trí, kích thước và kiểu cấu trúc", "Xâm nhập ngoài tuyến, LVI/PNI, diện cắt và hạch", "Biến đổi độ cao và hoại tử/phân bào nếu có"],
      memory: "Hạt zymogen PAS-D + NR4A3 nhân là cặp gợi ý mạnh cho biệt hóa nang thanh dịch.",
      pitfall: "Ung thư biểu mô tiết có thể giống về cấu trúc nhưng thường S100/mammaglobin dương tính và mang ETV6::NTRK3.",
      markers: ["NR4A3", "DOG1", "SOX10", "PAS-D", "S100/mammaglobin để phân biệt"],
    }, {
      micro: ["Serous acinar differentiation with basophilic PAS-positive, diastase-resistant zymogen granules", "Solid, microcystic, papillary-cystic and glandular patterns may occur", "Nuclear NR4A3 staining is a strong supportive finding in the appropriate setting"],
      report: ["Site, size and architectural pattern", "Extraglandular extension, LVI/PNI, margins and nodes", "High-grade transformation, necrosis and mitotic activity when present"],
      memory: "PAS-D-positive zymogen granules plus nuclear NR4A3 strongly support serous acinar differentiation.",
      pitfall: "Secretory carcinoma may mimic this tumour but commonly expresses S100/mammaglobin and harbours ETV6::NTRK3.",
    }),
    entry({
      id: "headneck-oropharynx-scc-hpv",
      chapter: "headneck",
      diagnosis: "Ung thư biểu mô tế bào vảy hầu miệng liên quan HPV",
      english: "Squamous cell carcinoma, HPV-associated",
      pattern: ["carcinoma", "squamous", "ihc"],
      micro: [
        "Các bè hoặc đám tế bào dạng đáy không sừng hóa, bờ tiểu thùy khá rõ, thường kèm mô đệm giàu lympho",
        "Hoại tử dạng trứng cá và tế bào u phân bào nhiều có thể gặp; sừng hóa không loại trừ liên quan HPV",
        "p16 dương tính kiểu khối là dấu ấn thay thế được thẩm định cho SCC hầu miệng; vị trí khác cần xét nghiệm HPV đặc hiệu theo hướng dẫn",
      ],
      report: ["Xác nhận vị trí hầu miệng và típ mô học", "Kết quả p16 với tiêu chí diễn giải; HPV đặc hiệu nếu được chỉ định", "Kích thước, diện cắt, LVI/PNI và tình trạng hạch"],
      memory: "SCC không sừng hóa vùng hầu miệng + nền lympho: nghĩ HPV và đọc p16 đúng tiêu chí.",
      pitfall: "Không ngoại suy p16 dương tính thành HPV-driven ở mọi vị trí đầu cổ; ý nghĩa phụ thuộc vị trí và hướng dẫn xét nghiệm.",
      markers: ["p16", "HPV ISH/PCR", "p40", "CK5/6"],
    }, {
      micro: ["Lobulated nests of non-keratinizing basaloid cells, often in a lymphoid-rich stroma", "Comedo-type necrosis and brisk mitotic activity may occur; keratinization does not exclude HPV association", "Block-positive p16 is a validated surrogate in the oropharynx; other sites require site-appropriate HPV-specific testing"],
      report: ["Confirm the oropharyngeal site and histological type", "Report p16 with the interpretation criteria and HPV-specific testing when indicated", "Size, margins, LVI/PNI and nodal status"],
      memory: "A non-keratinizing oropharyngeal SCC in lymphoid stroma should prompt correctly interpreted p16 testing.",
      pitfall: "Do not equate p16 positivity with HPV-driven disease at every head and neck site.",
    }),

    entry({
      id: "soft-alt-wdlps",
      chapter: "soft",
      diagnosis: "U mỡ không điển hình / sarcoma mỡ biệt hóa rõ",
      english: "Atypical lipomatous tumour / well-differentiated liposarcoma",
      pattern: ["spindle", "ihc"],
      micro: [
        "Mô mỡ trưởng thành với chênh lệch kích thước tế bào mỡ và các vách xơ không đều",
        "Tế bào mô đệm tăng sắc, nhân lớn rải rác trong vách; lipoblast có thể có nhưng không bắt buộc",
        "Khuếch đại MDM2 là đặc điểm phân tử chủ đạo; tên ALT hay WDLPS phụ thuộc vị trí và khả năng cắt bỏ hoàn toàn",
      ],
      report: ["Vị trí giải phẫu, kích thước, độ sâu và tình trạng diện cắt", "Không có/có vùng mất biệt hóa sau lấy mẫu rộng", "Phương pháp xác nhận MDM2 khi đã thực hiện"],
      memory: "Đừng chỉ tìm lipoblast: tế bào mô đệm tăng sắc trong vách + MDM2 khuếch đại mới là trọng tâm.",
      pitfall: "Mô mỡ phản ứng hoặc lipoma tế bào thoi có thể gây nhầm; HMMD MDM2/CDK4 không đặc hiệu tuyệt đối và cần đối chiếu khuếch đại khi ca khó.",
      markers: ["MDM2 amplification", "CDK4", "MDM2 IHC", "p16"],
    }, {
      micro: ["Mature adipose tissue with adipocyte size variation and irregular fibrous septa", "Scattered enlarged hyperchromatic stromal cells are key; lipoblasts may be absent", "MDM2 amplification is characteristic, while the ALT versus WDLPS terminology depends on site and resectability"],
      report: ["Anatomic site, size, depth and margins", "Presence or absence of dedifferentiation after adequate sampling", "Method used to establish MDM2 amplification"],
      memory: "Do not rely on lipoblasts alone: atypical septal stromal cells plus MDM2 amplification are central.",
      pitfall: "Reactive fat and spindle cell lipoma can mimic this lesion; MDM2/CDK4 IHC must be interpreted cautiously.",
    }),
    entry({
      id: "soft-dedifferentiated-liposarcoma",
      chapter: "soft",
      diagnosis: "Sarcoma mỡ mất biệt hóa",
      english: "Dedifferentiated liposarcoma",
      pattern: ["spindle", "ihc"],
      micro: [
        "Vùng sarcoma không sinh mỡ, thường tế bào hình thoi đa hình, chuyển tiếp đột ngột hoặc từ từ với thành phần ALT/WDLPS",
        "Có thể có biệt hóa dị loại như cơ, xương hoặc mạch; thành phần mỡ biệt hóa rõ đôi khi rất ít",
        "Khuếch đại MDM2/CDK4 giúp xác nhận, đặc biệt ở khối sau phúc mạc dạng sarcoma không biệt hóa",
      ],
      report: ["Vị trí, kích thước, diện cắt và tỷ lệ/vị trí mất biệt hóa", "Độ mô học theo hệ thống phù hợp và hoại tử/phân bào", "LVI, biệt hóa dị loại và kết quả MDM2"],
      memory: "Sarcoma sau phúc mạc + MDM2 khuếch đại: phải chủ động tìm thành phần WDLPS và nghĩ DDLPS.",
      pitfall: "Lấy mẫu thiếu có thể chỉ thấy vùng mất biệt hóa và bị gọi là sarcoma đa hình không biệt hóa.",
      markers: ["MDM2 amplification", "CDK4", "MDM2 IHC", "p16", "Panel theo biệt hóa dị loại"],
    }, {
      micro: ["A non-lipogenic spindle or pleomorphic sarcoma transitioning abruptly or gradually from an ALT/WDLPS component", "Heterologous myogenic, osteogenic or vascular differentiation may occur", "MDM2/CDK4 amplification is particularly useful in a retroperitoneal undifferentiated-appearing sarcoma"],
      report: ["Site, size, margins and extent of dedifferentiation", "Appropriate histological grade, necrosis and mitotic activity", "LVI, heterologous differentiation and MDM2 result"],
      memory: "An MDM2-amplified retroperitoneal sarcoma should trigger a search for WDLPS and a diagnosis of DDLPS.",
      pitfall: "Limited sampling may capture only the dedifferentiated component and lead to an undifferentiated pleomorphic sarcoma label.",
    }),
    entry({
      id: "soft-synovial-sarcoma",
      chapter: "soft",
      diagnosis: "Sarcoma hoạt dịch",
      english: "Synovial sarcoma",
      pattern: ["spindle", "ihc"],
      micro: [
        "Típ một pha gồm tế bào hình thoi đơn dạng xếp thành bó; típ hai pha có thêm cấu trúc tuyến biểu mô",
        "Mạch mảnh phân nhánh, vôi hóa và dưỡng bào có thể gặp; típ biệt hóa kém làm rộng chẩn đoán phân biệt",
        "Tái sắp xếp SS18 tạo dung hợp SS18::SSX là tiêu chuẩn xác nhận phân tử",
      ],
      report: ["Vị trí, kích thước, độ sâu, độ mô học, hoại tử và phân bào", "Diện cắt, LVI và tình trạng hạch khi có chỉ định", "Phương pháp chứng minh SS18::SSX"],
      memory: "U tế bào hình thoi đơn dạng quanh khớp không phải nguồn gốc hoạt dịch; SS18::SSX mới là dấu ấn định danh.",
      pitfall: "TLE1 nhạy nhưng không đặc hiệu; không chẩn đoán chỉ dựa trên TLE1 mà thiếu xác nhận SS18.",
      markers: ["SS18 rearrangement", "SS18-SSX IHC", "TLE1", "EMA", "Pan-CK"],
    }, {
      micro: ["Monophasic tumours show uniform spindle cells, while biphasic tumours add epithelial glands", "Delicate branching vessels, calcification and mast cells may occur", "An SS18 rearrangement producing SS18::SSX is the defining molecular event"],
      report: ["Site, size, depth, grade, necrosis and mitotic activity", "Margins, LVI and nodal status when indicated", "Method used to demonstrate SS18::SSX"],
      memory: "Despite its name, synovial sarcoma does not require synovial origin; SS18::SSX defines the entity.",
      pitfall: "TLE1 is sensitive but not specific and should not replace SS18 confirmation.",
    }),
    entry({
      id: "soft-osteosarcoma",
      chapter: "soft",
      diagnosis: "Sarcoma xương",
      english: "Osteosarcoma",
      pattern: ["spindle", "ihc"],
      micro: [
        "Tiêu chuẩn cốt lõi là chất dạng xương ác tính được tạo trực tiếp bởi tế bào u",
        "Nền có thể ưu thế nguyên bào xương, nguyên bào sụn hoặc nguyên bào sợi; phải tìm vùng tạo chất dạng xương thật sự",
        "Chẩn đoán luôn cần đối chiếu vị trí, tuổi và hình ảnh học để loại trừ tạo xương phản ứng hoặc ung thư biểu mô/sarcoma khác tạo xương",
      ],
      report: ["Típ, độ mô học, kích thước và vị trí trong xương", "Đáp ứng hóa trị theo tỷ lệ hoại tử nếu là bệnh phẩm sau điều trị", "Diện cắt, xâm nhập mạch và tổn thương vệ tinh"],
      memory: "Không phải tế bào đa hình mà chính chất dạng xương do tế bào ác tính tạo ra xác lập osteosarcoma.",
      pitfall: "SATB2 chỉ hỗ trợ biệt hóa tạo xương và không đặc hiệu; hình ảnh học là một phần bắt buộc của chẩn đoán.",
      markers: ["SATB2 hỗ trợ", "Ki-67", "Panel loại trừ theo hình thái", "Tương quan X-quang/MRI"],
    }, {
      micro: ["The defining feature is malignant osteoid produced directly by tumour cells", "Osteoblastic, chondroblastic or fibroblastic areas may predominate, but true tumour osteoid must be identified", "Always correlate with age, site and imaging to exclude reactive bone and other bone-forming malignancies"],
      report: ["Subtype, grade, size and bone compartment", "Treatment response by percentage necrosis in post-therapy resections", "Margins, vascular invasion and skip lesions"],
      memory: "Malignant tumour osteoid, not pleomorphism alone, establishes osteosarcoma.",
      pitfall: "SATB2 supports osteoblastic differentiation but is not specific; radiological correlation is mandatory.",
    }),
    entry({
      id: "soft-central-chondrosarcoma-grade23",
      chapter: "soft",
      diagnosis: "Sarcoma sụn trung tâm, độ 2 và 3",
      english: "Central chondrosarcoma, grades 2 and 3",
      pattern: ["spindle", "ihc"],
      micro: [
        "Các tiểu thùy sụn hyalin tăng tế bào, có biến đổi dạng nhầy và tế bào sụn không điển hình",
        "Dấu hiệu xâm nhập quan trọng là bao bọc và phá hủy các bè xương chủ; độ 3 có tế bào dày đặc, dị dạng và phân bào rõ hơn",
        "Đột biến IDH1/IDH2 thường gặp ở sarcoma sụn trung tâm nhưng không thay thế tương quan hình ảnh học",
      ],
      report: ["Vị trí, kích thước, độ mô học và mức lan trong mô mềm", "Diện cắt và phá vỏ xương", "Hoại tử, phân bào và thành phần mất biệt hóa nếu có"],
      memory: "Permeation bao quanh bè xương chủ là dấu hiệu xâm nhập đáng tin cậy hơn dị dạng nhân đơn độc.",
      pitfall: "Phân biệt với enchondroma cần tích hợp đau, kích thước, vị trí và hình ảnh học; sinh thiết nhỏ có thể đánh giá thấp độ.",
      markers: ["S100", "SOX9", "IDH1/IDH2", "Panel loại trừ chordoma khi cần"],
    }, {
      micro: ["Hypercellular lobules of hyaline cartilage with myxoid change and cytological atypia", "Permeation and entrapment of host bone are important evidence of invasion; grade 3 shows greater cellularity, atypia and mitotic activity", "IDH1/IDH2 mutations are frequent but do not replace clinicoradiological integration"],
      report: ["Site, size, grade and soft tissue extension", "Margins and cortical breakthrough", "Necrosis, mitoses and any dedifferentiated component"],
      memory: "Permeation around host bony trabeculae is more reliable evidence of invasion than nuclear atypia alone.",
      pitfall: "Distinction from enchondroma requires symptoms, site and imaging; a small biopsy may underestimate grade.",
    }),

    entry({
      id: "uppergi-esophagus-ogj-adeno",
      chapter: "uppergi",
      diagnosis: "Ung thư biểu mô tuyến thực quản và chỗ nối thực quản-dạ dày",
      english: "Adenocarcinoma of the oesophagus and oesophagogastric junction",
      pattern: ["carcinoma", "glandular", "ihc"],
      micro: [
        "Tuyến ác tính hoặc tế bào u rời rạc xâm nhập qua màng đáy, thường kèm mô đệm xơ phản ứng",
        "Có thể liên quan Barrett; cần ghi nhận thành phần nhầy, tế bào nhẫn, độ biệt hóa và mức xâm nhập",
        "Xác định tâm u và mối liên quan với chỗ nối thực quản-dạ dày để phân loại vị trí và giai đoạn đúng",
      ],
      report: ["Tâm u, kích thước, típ mô học, độ biệt hóa và pT", "LVI/PNI, diện cắt và hạch", "MMR/MSI, HER2, PD-L1 và dấu ấn dự báo khác theo chỉ định hiện hành"],
      memory: "Tạo tuyến ác tính xâm nhập trên nền Barrett là chuỗi hình thái điển hình, nhưng vị trí tâm u quyết định cách phân giai đoạn.",
      pitfall: "Tuyến dưới niêm mạc thực quản và viêm tái tạo có thể gây khó; phải chứng minh xâm nhập và đối chiếu nội soi.",
      markers: ["Pan-CK", "CK7", "CDX2", "MMR", "HER2", "PD-L1"],
    }, {
      micro: ["Malignant glands or discohesive tumour cells invade beyond the basement membrane, often with desmoplasia", "Barrett mucosa may be present; record mucinous or signet-ring morphology, grade and depth", "Establish the tumour epicentre and relationship to the oesophagogastric junction for correct site classification and staging"],
      report: ["Tumour epicentre, size, histological type, grade and pT", "LVI/PNI, margins and nodes", "MMR/MSI, HER2, PD-L1 and other predictive biomarkers as currently indicated"],
      memory: "Invasive malignant glands in Barrett mucosa form a classic sequence, but the tumour epicentre determines staging.",
      pitfall: "Oesophageal submucosal glands and reactive atypia may mimic neoplasia; demonstrate invasion and correlate with endoscopy.",
    }),
    entry({
      id: "uppergi-gastric-dysplasia",
      chapter: "uppergi",
      diagnosis: "Loạn sản dạ dày",
      english: "Gastric dysplasia",
      pattern: ["precursor", "glandular"],
      micro: [
        "Tân sinh biểu mô khu trú trong niêm mạc với tuyến chen chúc, mất trưởng thành bề mặt và bất thường nhân",
        "Phân độ thấp hoặc cao dựa trên phức tạp cấu trúc và mức độ không điển hình; chưa có xâm nhập mô đệm",
        "Đánh giá nền chuyển sản ruột, viêm teo và H. pylori; ca khó cần phân biệt với thay đổi tái tạo",
      ],
      report: ["Vị trí, loại bệnh phẩm và mức độ loạn sản", "Có/không nghi ngờ xâm nhập hoặc ung thư biểu mô trong mẫu", "Tình trạng nền niêm mạc và khuyến nghị lấy mẫu thêm khi chưa đủ"],
      memory: "Loạn sản thật vừa bất thường nhân vừa mất trưởng thành bề mặt; tái tạo thường giữ trục trưởng thành từ đáy lên.",
      pitfall: "Viêm, trợt và tái tạo có thể giả loạn sản; p53/Ki-67 chỉ hỗ trợ và không thay thế hình thái.",
      markers: ["p53 hỗ trợ", "Ki-67 hỗ trợ", "H. pylori theo bối cảnh", "MMR trong ca chọn lọc"],
    }, {
      micro: ["Intraepithelial neoplasia with crowded glands, loss of surface maturation and nuclear atypia", "Grade as low or high according to architectural complexity and cytological atypia; stromal invasion is absent", "Assess background intestinal metaplasia, atrophy and H. pylori and distinguish from regenerative change"],
      report: ["Site, specimen type and grade of dysplasia", "Presence or absence of suspected invasion/carcinoma in the sample", "Background mucosal findings and need for further sampling"],
      memory: "True dysplasia combines nuclear atypia with loss of surface maturation; regeneration usually retains maturation toward the surface.",
      pitfall: "Inflammation and erosion can mimic dysplasia; p53 and Ki-67 are adjuncts, not substitutes for morphology.",
    }),
    entry({
      id: "uppergi-gastric-neuroendocrine-neoplasms",
      chapter: "uppergi",
      diagnosis: "Tân sinh thần kinh nội tiết dạ dày",
      english: "Gastric neuroendocrine neoplasms",
      pattern: ["neuroendocrine", "ihc"],
      micro: [
        "U thần kinh nội tiết biệt hóa rõ tạo bè, ổ hoặc tuyến giả, tế bào đơn dạng với nhiễm sắc kiểu muối tiêu",
        "Phải tách NET biệt hóa rõ khỏi NEC biệt hóa kém; xếp độ NET dựa trên phân bào và Ki-67 theo tiêu chuẩn hiện hành",
        "Đánh giá nền teo niêm mạc thân vị, tăng sản tế bào ECL và bối cảnh tăng gastrin để phân típ lâm sàng-bệnh học",
      ],
      report: ["NET hay NEC, độ mô học, kích thước, số ổ và mức xâm nhập", "Phân bào, Ki-67, hoại tử, LVI và diện cắt", "Nền niêm mạc, gastrin và tình trạng hạch/di căn"],
      memory: "Hình thái thần kinh nội tiết chỉ là bước đầu: phải chốt biệt hóa, grade và bối cảnh gastrin/niêm mạc.",
      pitfall: "Ki-67 phải đếm ở vùng nóng; không dùng synaptophysin dương tính đơn độc để gọi một carcinoma là NEC.",
      markers: ["Synaptophysin", "Chromogranin A", "INSM1", "Ki-67", "p53/RB1 khi nghi NEC", "Gastrin theo bối cảnh"],
    }, {
      micro: ["Well-differentiated NETs form nests, trabeculae or pseudoglands of uniform salt-and-pepper cells", "Separate well-differentiated NET from poorly differentiated NEC and grade NET by mitoses and Ki-67 using current criteria", "Assess corpus atrophy, ECL-cell hyperplasia and the hypergastrinaemic context"],
      report: ["NET versus NEC, grade, size, multiplicity and depth", "Mitotic count, Ki-67, necrosis, LVI and margins", "Background mucosa, gastrin context and nodal/metastatic status"],
      memory: "Neuroendocrine morphology is only the first step: establish differentiation, grade and the gastrin/mucosal context.",
      pitfall: "Count Ki-67 in the hotspot and do not diagnose NEC from synaptophysin positivity alone.",
    }),

    entry({
      id: "eye-conjunctival-melanoma",
      chapter: "eye",
      diagnosis: "U hắc tố ác tính kết mạc",
      english: "Conjunctival melanoma",
      pattern: ["ihc"],
      micro: [
        "Tế bào hắc tố không điển hình lan dọc vùng nối và/hoặc xâm nhập mô đệm kết mạc; có thể lan kiểu Paget",
        "Tế bào dạng biểu mô hoặc hình thoi, sắc tố thay đổi; cần đánh giá phân bào, loét và xâm nhập mạch",
        "Có thể phát sinh trên tổn thương melanocytic nội biểu mô hoặc nốt ruồi; định vị giải phẫu ảnh hưởng nguy cơ và phân giai đoạn",
      ],
      report: ["Vị trí kết mạc, kích thước và bề dày xâm nhập", "Loét, phân bào, LVI, xâm nhập cấu trúc lân cận và diện cắt", "Thành phần nội biểu mô và dữ liệu phân tử khi có"],
      memory: "Tổn thương hắc tố kết mạc phải đọc cả thành phần nội biểu mô, độ sâu xâm nhập và vị trí giải phẫu.",
      pitfall: "Nốt ruồi viêm ở người trẻ và melanosis có thể gây nhầm; không dùng HMB45 đơn độc để quyết định ác tính.",
      markers: ["SOX10", "S100", "Melan-A", "HMB45", "PRAME hỗ trợ", "BRAF/NRAS theo chỉ định"],
    }, {
      micro: ["Atypical melanocytes show junctional and/or stromal invasion, sometimes with pagetoid spread", "Epithelioid or spindle cells may contain variable pigment; assess mitoses, ulceration and vascular invasion", "The tumour may arise in an intraepithelial melanocytic lesion or naevus, and anatomic location affects risk and staging"],
      report: ["Conjunctival site, size and invasive thickness", "Ulceration, mitoses, LVI, adjacent-structure involvement and margins", "Intraepithelial component and molecular data when available"],
      memory: "Read the intraepithelial component, invasive thickness and precise conjunctival site together.",
      pitfall: "Inflamed juvenile naevi and melanosis can mimic melanoma; HMB45 alone does not establish malignancy.",
    }),
    entry({
      id: "eye-lacrimal-adenoid-cystic-carcinoma",
      chapter: "eye",
      diagnosis: "Ung thư biểu mô dạng tuyến nang của tuyến lệ",
      english: "Adenoid cystic carcinoma of the lacrimal gland",
      pattern: ["carcinoma", "glandular", "ihc"],
      micro: [
        "Kiểu sàng, ống hoặc đặc với hai quần thể tế bào ống và cơ biểu mô/đáy",
        "Khoang giả tuyến chứa chất màng đáy hyalin; xâm nhập quanh thần kinh và lan theo xương hốc mắt cần được tìm kỹ",
        "Thành phần đặc và chuyển dạng độ cao có ý nghĩa tiên lượng bất lợi",
      ],
      report: ["Kích thước, mức lan trong hốc mắt/xương và kiểu cấu trúc", "PNI, LVI, diện cắt và thành phần đặc", "Tình trạng hạch/di căn và chuyển dạng độ cao"],
      memory: "Tuyến lệ + kiểu sàng hyalin + PNI mạnh: nghĩ ung thư biểu mô dạng tuyến nang.",
      pitfall: "Không dùng ảnh ung thư biểu mô dạng tuyến nang tuyến nước bọt thay cho ảnh tuyến lệ nếu nguồn không ghi rõ vị trí.",
      markers: ["MYB", "SOX10", "CD117", "p63/p40 theo khoang", "MYB::NFIB"],
    }, {
      micro: ["Cribriform, tubular or solid growth with ductal and myoepithelial/basal cell populations", "Pseudolumina contain hyaline basement-membrane material; actively seek perineural and orbital bone spread", "A solid component and high-grade transformation carry adverse significance"],
      report: ["Size, orbital/bone extension and architectural pattern", "PNI, LVI, margins and solid component", "Nodal/metastatic status and high-grade transformation"],
      memory: "A lacrimal gland tumour with hyaline cribriform architecture and marked PNI strongly suggests adenoid cystic carcinoma.",
      pitfall: "Do not substitute a salivary-gland image unless the source explicitly documents the lacrimal site.",
    }),
  ];

  const whoLinks = {
    "cns-astrocytoma-idh-mutant": { bookId: 45, chapterId: 5, edition: "5th ed.", entityEn: "Astrocytoma, IDH-mutant", relation: "exact" },
    "cns-oligodendroglioma-idh-codeleted": { bookId: 45, chapterId: 6, edition: "5th ed.", entityEn: "Oligodendroglioma, IDH-mutant and 1p/19q-codeleted", relation: "exact" },
    "cns-pilocytic-astrocytoma": { bookId: 45, chapterId: 19, edition: "5th ed.", entityEn: "Pilocytic astrocytoma", relation: "exact" },
    "cns-medulloblastoma-histologic": { bookId: 45, chapterId: 67, edition: "5th ed.", entityEn: "Medulloblastoma, histologically defined", relation: "exact" },
    "headneck-mucoepidermoid-carcinoma": { bookId: 52, chapterId: 77, edition: "5th ed.", entityEn: "Mucoepidermoid carcinoma", relation: "exact" },
    "headneck-adenoid-cystic-carcinoma": { bookId: 52, chapterId: 78, edition: "5th ed.", entityEn: "Adenoid cystic carcinoma", relation: "exact" },
    "headneck-acinic-cell-carcinoma": { bookId: 52, chapterId: 79, edition: "5th ed.", entityEn: "Acinic cell carcinoma", relation: "exact" },
    "headneck-oropharynx-scc-hpv": { bookId: 52, chapterId: 118, edition: "5th ed.", entityEn: "Squamous cell carcinoma, HPV-associated", relation: "exact" },
    "soft-alt-wdlps": { bookId: 33, chapterId: 12, edition: "5th ed.", entityEn: "Atypical lipomatous tumour / well-differentiated liposarcoma", relation: "exact" },
    "soft-dedifferentiated-liposarcoma": { bookId: 33, chapterId: 14, edition: "5th ed.", entityEn: "Dedifferentiated liposarcoma", relation: "exact" },
    "soft-synovial-sarcoma": { bookId: 33, chapterId: 121, edition: "5th ed.", entityEn: "Synovial sarcoma", relation: "exact" },
    "soft-osteosarcoma": { bookId: 33, chapterId: 153, edition: "5th ed.", entityEn: "Osteosarcoma", relation: "exact" },
    "soft-central-chondrosarcoma-grade23": { bookId: 33, chapterId: 143, edition: "5th ed.", entityEn: "Central chondrosarcoma, grades 2 and 3", relation: "exact" },
    "uppergi-esophagus-ogj-adeno": { bookId: 72, chapterId: 11, edition: "6th ed. beta", entityEn: "Adenocarcinoma of the oesophagus and oesophagogastric junction", relation: "exact" },
    "uppergi-gastric-dysplasia": { bookId: 72, chapterId: 21, edition: "6th ed. beta", entityEn: "Gastric dysplasia", relation: "exact" },
    "uppergi-gastric-neuroendocrine-neoplasms": { bookId: 72, chapterId: 204, edition: "6th ed. beta", entityEn: "Gastric neuroendocrine neoplasms", relation: "exact" },
    "eye-conjunctival-melanoma": { bookId: 65, chapterId: 32, edition: "5th ed.", entityEn: "Conjunctival melanoma", relation: "exact" },
    "eye-lacrimal-adenoid-cystic-carcinoma": { bookId: 65, chapterId: 139, edition: "5th ed.", entityEn: "Adenoid cystic carcinoma of the lacrimal gland", relation: "exact" },
  };
  Object.values(whoLinks).forEach((item) => {
    item.url = `${IARC}/chaptercontent/${item.bookId}/${item.chapterId}`;
  });

  const icdoSource = `${IARC}/icd-o-4/`;
  const metadata = {
    "cns-astrocytoma-idh-mutant": { icdo: { code: "94007/3 · grade-specific", version: "ICD-O-4", source: icdoSource, verified: true, note: "NOS 94007/3; grade 2: 94008/3; grade 3: 94012/3; grade 4: 94450/3." } },
    "cns-oligodendroglioma-idh-codeleted": { icdo: { code: "94501/3 · grade-specific", version: "ICD-O-4", source: icdoSource, verified: true, note: "NOS 94501/3; grade 2: 94502/3; grade 3: 94511/3." } },
    "cns-pilocytic-astrocytoma": { icdo: { code: "94210/1", version: "ICD-O-4", source: icdoSource, verified: true } },
    "cns-medulloblastoma-histologic": { icdo: { code: "94700/3", version: "ICD-O-4", source: icdoSource, verified: true, note: "Mã NOS; ICD-O-4 có các mã riêng cho một số nhóm phân tử và biến thể mô học." } },
    "headneck-mucoepidermoid-carcinoma": { icdo: { code: "84300/3", version: "ICD-O-4", source: icdoSource, verified: true } },
    "headneck-adenoid-cystic-carcinoma": { icdo: { code: "82000/3", version: "ICD-O-4", source: icdoSource, verified: true } },
    "headneck-acinic-cell-carcinoma": { icdo: { code: "85501/3", version: "ICD-O-4", source: icdoSource, verified: true } },
    "headneck-oropharynx-scc-hpv": { icdo: { code: "80850/3", version: "ICD-O-4", source: icdoSource, verified: true } },
    "soft-alt-wdlps": { icdo: { code: "88500/1 · phụ thuộc vị trí", version: "ICD-O-4", source: icdoSource, verified: true, note: "ICD-O-4 gán 88500/1 cho atypical lipomatous tumour và well-differentiated liposarcoma nông. Không tự gán mã liposarcoma NOS /3 cho khối sâu nếu chưa đối chiếu quy tắc đăng ký và vị trí." } },
    "soft-dedifferentiated-liposarcoma": { icdo: { code: "88580/3", version: "ICD-O-4", source: icdoSource, verified: true } },
    "soft-synovial-sarcoma": { icdo: { code: "90400/3", version: "ICD-O-4", source: icdoSource, verified: true, note: "Mã NOS; ICD-O-4 có mã chi tiết cho típ một pha, hai pha và biệt hóa kém." } },
    "soft-osteosarcoma": { icdo: { code: "91800/3", version: "ICD-O-4", source: icdoSource, verified: true, note: "Mã NOS; chọn mã chi tiết khi xác định đúng típ mô học." } },
    "soft-central-chondrosarcoma-grade23": { icdo: { code: "92203/3 · 92206/3", version: "ICD-O-4", source: icdoSource, verified: true, note: "92203/3 cho độ 2; 92206/3 cho độ 3." } },
    "uppergi-esophagus-ogj-adeno": { icdo: { code: "81400/3", version: "ICD-O-4", source: icdoSource, verified: true } },
    "uppergi-gastric-dysplasia": { icdo: { code: "81480/0 · 81480/2", version: "ICD-O-4", source: icdoSource, verified: true, note: "81480/0 cho loạn sản độ thấp; 81480/2 cho loạn sản độ cao." } },
    "uppergi-gastric-neuroendocrine-neoplasms": { icdo: { code: "82401/3 · 82490/3 · 82491/3", version: "ICD-O-4", source: icdoSource, verified: true, note: "Mã NET biệt hóa rõ lần lượt cho grade 1, 2 và 3; NEC cần mã theo típ tế bào nhỏ/lớn hoặc NOS." } },
    "eye-conjunctival-melanoma": { icdo: { code: "87200/3", version: "ICD-O-4", source: icdoSource, verified: true, note: "Mã melanoma NOS; vị trí kết mạc được mã hóa riêng bằng topography C69.0." } },
    "eye-lacrimal-adenoid-cystic-carcinoma": { icdo: { code: "82000/3", version: "ICD-O-4", source: icdoSource, verified: true } },
  };

  Object.entries(metadata).forEach(([id, value]) => {
    value.whoTerms = [whoLinks[id].entityEn];
  });
  ["cns-astrocytoma-idh-mutant", "cns-oligodendroglioma-idh-codeleted", "cns-pilocytic-astrocytoma", "cns-medulloblastoma-histologic"].forEach((id) => {
    metadata[id].searchTerms = ["thần kinh trung ương", "não", "central nervous system", "brain", "CNS"];
  });
  ["headneck-mucoepidermoid-carcinoma", "headneck-adenoid-cystic-carcinoma", "headneck-acinic-cell-carcinoma"].forEach((id) => {
    metadata[id].searchTerms = ["tuyến nước bọt", "salivary gland", "salivary"];
  });
  metadata["headneck-oropharynx-scc-hpv"].searchTerms = ["hầu miệng", "oropharynx", "oropharyngeal", "HPV"];
  ["soft-alt-wdlps", "soft-dedifferentiated-liposarcoma", "soft-synovial-sarcoma", "soft-osteosarcoma", "soft-central-chondrosarcoma-grade23"].forEach((id) => {
    metadata[id].searchTerms = ["mô mềm", "xương", "soft tissue", "bone", "sarcoma"];
  });
  ["uppergi-esophagus-ogj-adeno", "uppergi-gastric-dysplasia", "uppergi-gastric-neuroendocrine-neoplasms"].forEach((id) => {
    metadata[id].searchTerms = ["thực quản", "dạ dày", "oesophagus", "esophagus", "stomach", "gastric"];
  });
  ["eye-conjunctival-melanoma", "eye-lacrimal-adenoid-cystic-carcinoma"].forEach((id) => {
    metadata[id].searchTerms = ["mắt", "hốc mắt", "eye", "ocular", "orbit"];
  });
  metadata["cns-pilocytic-astrocytoma"].webPathologyUrl = "https://www.webpathology.com/images/neuropath/glial-tumors/pilocytic-astrocytoma";
  metadata["soft-synovial-sarcoma"].webPathologyUrl = "https://www.webpathology.com/images/soft-tissue/uncertain-histogenesis/synovial-sarcoma";
  metadata["soft-osteosarcoma"].webPathologyUrl = "https://www.webpathology.com/images/orthopedic/bone-tumors---ii/osteosarcoma";

  const topicLinks = {
    "cns-pilocytic-astrocytoma": "https://www.pathologyoutlines.com/topic/cnstumorpilocyticastrocytoma.html",
    "cns-medulloblastoma-histologic": "https://www.pathologyoutlines.com/topic/cnstumormedulloblastoma.html",
    "headneck-mucoepidermoid-carcinoma": "https://www.pathologyoutlines.com/topic/salivaryglandsMEC.html",
    "headneck-adenoid-cystic-carcinoma": "https://www.pathologyoutlines.com/topic/salivaryglandsadenoidcystic.html",
    "headneck-acinic-cell-carcinoma": "https://www.pathologyoutlines.com/topic/salivaryglandsaciniccell.html",
  };

  const image = (file, kind = "Vi thể H&E", note = "") => ({
    file,
    kind,
    note,
    source: "Wikimedia Commons",
    sourceUrl: commonsSource(file),
    verified: true,
  });
  const imageReplacements = {
    "cns-astrocytoma-idh-mutant": image("Astrocytoma grades 2, 3, 4.png", "Vi thể H&E", "Hình ghép minh họa các độ của u sao bào; chú thích tệp gốc nêu rõ trạng thái IDH và tiêu chí mô học."),
    "cns-pilocytic-astrocytoma": image("Cerebellar pilocytic astrocytoma HE.jpg", "Vi thể H&E", "U sao bào dạng lông tiểu não có xâm nhập màng mềm; không đại diện cho mọi vị trí hay kiểu phát triển."),
    "cns-medulloblastoma-histologic": image("Medulloblastoma_with_rosettes.jpg", "Vi thể H&E", "Hình minh họa medulloblastoma có hoa hồng; phân nhóm phân tử không thể suy ra từ ảnh này."),
    "headneck-mucoepidermoid-carcinoma": image("Mucoepidermoid carcinoma - high mag.jpg"),
    "headneck-adenoid-cystic-carcinoma": image("Adenoid cystic carcinoma - high mag.jpg"),
    "headneck-acinic-cell-carcinoma": image("Acinic cell carcinoma -- high mag.jpg"),
    "soft-alt-wdlps": image("Histopathology of an atypical lipomatous tumor or well-differentiated liposarcoma, lipoma-like subtype.jpg", "Vi thể H&E", "Típ giống lipoma; vùng phóng đại cho thấy tế bào mô đệm tăng sắc trong vách xơ."),
    "soft-dedifferentiated-liposarcoma": image("Histopathology of dedifferentiated liposarcoma.png", "Vi thể H&E và HMMD", "Hình ghép cho thấy chuyển tiếp ALT/WDLPS sang vùng mất biệt hóa và biểu hiện MDM2."),
    "soft-synovial-sarcoma": image("Synovial Sarcoma Biphasic High Power.jpg", "Vi thể H&E", "Hình minh họa típ hai pha; chẩn đoán thực hành vẫn cần xác nhận SS18::SSX."),
    "soft-osteosarcoma": image("Histopathology of osteosarcoma, high mag.jpg", "Vi thể H&E", "Hình cho thấy tế bào u đa hình và chất dạng xương tân sinh."),
    "uppergi-esophagus-ogj-adeno": image("Esophageal adenocarcinoma - low mag.jpg", "Vi thể H&E", "Ung thư biểu mô tuyến nội niêm mạc trên bệnh phẩm cắt niêm mạc nội soi; không đại diện cho mọi độ sâu xâm nhập."),
    "uppergi-gastric-dysplasia": image("Low-grade gastric dysplasia, interm. mag.jpg", "Vi thể PAS", "Loạn sản dạ dày độ thấp trên nền chuyển sản ruột và bệnh dạ dày phản ứng; ảnh nhuộm PAS."),
    "uppergi-gastric-neuroendocrine-neoplasms": image("Gastric neuroendocrine tumor - synaptophysin, high mag.jpg", "HMMD synaptophysin", "U thần kinh nội tiết dạ dày biệt hóa rõ nhuộm synaptophysin; không thay thế ảnh H&E để phân độ."),
    "eye-conjunctival-melanoma": image("Conjunctival Melanoma.jpg", "Đại thể", "Bệnh phẩm vét tổ chức hốc mắt do u hắc tố kết mạc; đây là ảnh đại thể, không phải vi thể H&E."),
  };

  const curation = window.ATLAS_CURATION || (window.ATLAS_CURATION = {});
  curation.topicLinks ||= {};
  curation.caseMetadata ||= {};
  curation.imageReplacements ||= {};
  Object.assign(curation.topicLinks, topicLinks);
  Object.assign(curation.imageReplacements, imageReplacements);
  Object.entries(metadata).forEach(([id, value]) => {
    curation.caseMetadata[id] = { ...(curation.caseMetadata[id] || {}), ...value };
  });

  const bilingual = window.ATLAS_BILINGUAL || (window.ATLAS_BILINGUAL = {});
  expansionCases.forEach((item) => {
    bilingual[item.id] = item.learningEn;
  });

  const diagnosisLinks = window.WHO_DIAGNOSIS_LINKS || (window.WHO_DIAGNOSIS_LINKS = { links: {} });
  diagnosisLinks.links ||= {};
  Object.assign(diagnosisLinks.links, whoLinks);

  window.ATLAS_EXPANSION_CASES = expansionCases;
}());
