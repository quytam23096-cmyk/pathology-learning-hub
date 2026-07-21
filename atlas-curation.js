(function () {
  "use strict";

  const PO = "https://www.pathologyoutlines.com";
  const IARC = "https://tumourclassification.iarc.who.int";
  const COMMONS = "https://commons.wikimedia.org/wiki/File:";

  function commonsSource(file) {
    return `${COMMONS}${encodeURIComponent(file.replaceAll(" ", "_"))}`;
  }

  const topicLinks = {
    "thyroid-nodular": `${PO}/topic/thyroidnodular.html`,
    "thyroid-hashimoto": `${PO}/topic/thyroidhashimotosthyroiditis.html`,
    "thyroid-subacute": `${PO}/topic/thyroidgranuloma.html`,
    "thyroid-graves": `${PO}/topic/thyroidgraves.html`,
    "thyroid-follicular-adenoma": `${PO}/topic/thyroidfollicularadenoma.html`,
    "thyroid-niftp": `${PO}/topic/thyroidfollicularneoplasm.html`,
    "thyroid-ptc": `${PO}/topic/thyroidpapillaryclassic.html`,
    "thyroid-tall-cell-ptc": `${PO}/topic/thyroidpapillary.html`,
    "thyroid-ftc": `${PO}/topic/thyroidfollicular.html`,
    "thyroid-medullary": `${PO}/topic/thyroidmedullary.html`,
    "thyroid-anaplastic": `${PO}/topic/thyroidUndiff.html`,
    "lung-adeno": `${PO}/topic/lungtumoradenocarcinoma.html`,
    "lung-squamous": `${PO}/topic/lungtumorSCC.html`,
    "lung-small-cell": `${PO}/topic/lungtumorsmallcell.html`,
    "lung-mucinous": `${PO}/topic/lungtumorinvmucadenocarcinoma.html`,
    "lung-ais": `${PO}/topic/lungtumoradenoinsitu.html`,
    "lung-large-cell-ne": `${PO}/topic/lungtumorlargecellNE.html`,
    "colon-hyperplastic": `${PO}/topic/colontumorhyperplastic.html`,
    "colon-ssl": `${PO}/topic/colontumorsessileserrated.html`,
    "colon-adenoma": `${PO}/topic/colontumoradenoma.html`,
    "colon-high-grade-dysplasia": `${PO}/topic/colontumoradenoma.html`,
    "colon-tsa": `${PO}/topic/colontumortraditionalserratedadenoma.html`,
    "colon-villous": `${PO}/topic/colontumortvadenoma.html`,
    "colon-inflammatory-polyp": `${PO}/topic/colontumorinflammatory.html`,
    "colon-adeno": `${PO}/topic/colontumoradenocarcinoma.html`,
    "colon-mucinous-adeno": `${PO}/topic/colontumorcolloid.html`,
    "colon-signet-ring": `${PO}/topic/colontumorsignetring.html`,
    "breast-dcis": `${PO}/topic/breastmalignantdcis.html`,
    "breast-idc": `${PO}/topic/breastmalignantductalNOS.html`,
    "breast-ilc": `${PO}/topic/breastmalignantlobularclassic.html`,
    "breast-mucinous": `${PO}/topic/breastmalignantmucinous.html`,
    "breast-fibroadenoma": `${PO}/topic/breastfibroadenoma.html`,
    "breast-phyllodes": `${PO}/topic/breastphyllodesgeneral.html`,
    "breast-lcis": `${PO}/topic/breastmalignantlcis.html`,
    "breast-metaplastic": `${PO}/topic/breastmalignantmetaplastic.html`,
    "breast-adh": `${PO}/topic/breastadh.html`,
    "breast-radial-scar": `${PO}/topic/breastradialscar.html`,
    "hpb-hcc": `${PO}/topic/livertumorHCC.html`,
    "hpb-cholangiocarcinoma": `${PO}/topic/livertumorcholangiocarcinoma.html`,
    "hpb-cirrhosis": `${PO}/topic/livercirrhosis.html`,
    "hpb-hepatocellular-adenoma": `${PO}/topic/livertumorhepatocellularadenoma.html`,
    "hpb-fnh": `${PO}/topic/livertumorFNH.html`,
    "cervix-scc": `${PO}/topic/cervixSCC.html`,
    "gyn-cervix-adenocarcinoma": `${PO}/topic/cervixhpvadenocarcinoma.html`,
    "gyn-ovarian-serous": `${PO}/topic/ovarytumorserouscarcinomahg.html`,
    "gyn-ovary-mucinous": `${PO}/topic/ovarytumorborderlinemucinous.html`,
    "gyn-mature-teratoma": `${PO}/topic/ovarytumorteratomamature.html`,
    "ovary-krukenberg": `${PO}/topic/ovarytumormetastatic.html`,
    "prostate-adeno": `${PO}/topic/prostateadenoNOS.html`,
    "kidney-clear-cell": `${PO}/topic/kidneytumormalignantrccclear.html`,
    "kidney-chromophobe": `${PO}/topic/kidneytumormalignantrccchromo.html`,
    "gu-urothelial-low": `${PO}/topic/bladderLGpap.html`,
    "gu-bph": `${PO}/topic/prostatenodhyper.html`,
    "gu-hgpin": `${PO}/topic/prostateHGPIN.html`,
    "gu-seminoma": `${PO}/topic/testisseminomas.html`,
    "heme-hodgkin": `${PO}/topic/lymphomanonBclassic.html`,
    "cns-meningioma": `${PO}/topic/cnstumormeningiomageneral.html`,
    "cns-glioblastoma": `${PO}/topic/CNStumorgliomasglioblastomasIDHwildtype.html`,
    "cns-schwannoma": `${PO}/topic/cnstumorschwannoma.html`,
    "headneck-warthin": `${PO}/topic/salivaryglandswarthin.html`,
    "headneck-pleomorphic": `${PO}/topic/salivaryglandspleomorphicadenoma.html`,
    "soft-neurofibroma": `${PO}/topic/softtissueneurofibroma.html`,
    "soft-gist": `${PO}/topic/softtissueGIST.html`,
    "soft-lipoma": `${PO}/topic/softtissueadiposelipoma.html`,
  };

  const chapterStandards = {
    thyroid: { label: "WHO Classification of Endocrine and Neuroendocrine Tumours", edition: "5th edition", year: "2025", url: `${IARC}/chapters/53` },
    lung: { label: "WHO Classification of Thoracic Tumours", edition: "5th edition", year: "2021", url: "https://whobluebooks.iarc.fr/structures/thoracic-tumours/" },
    colon: { label: "WHO Classification of Digestive System Tumours", edition: "5th edition", year: "2019", url: "https://whobluebooks.iarc.fr/structures/digestive-system-tumours/" },
    breast: { label: "WHO Classification of Breast Tumours", edition: "5th edition", year: "2019", url: "https://whobluebooks.iarc.fr/structures/breast-tumours/" },
    hpb: { label: "WHO Classification of Digestive System Tumours", edition: "5th edition", year: "2019", url: "https://whobluebooks.iarc.fr/structures/digestive-system-tumours/" },
    gyn: { label: "WHO Classification of Female Genital Tumours", edition: "5th edition", year: "2020", url: "https://whobluebooks.iarc.fr/structures/female-genital-tumours/" },
    gu: { label: "WHO Classification of Urinary and Male Genital Tumours", edition: "5th edition", year: "2022", url: "https://whobluebooks.iarc.fr/structures/urinary-and-male-genital-tumours/" },
    skin: { label: "WHO Classification of Skin Tumours", edition: "5th edition", year: "2025", url: "https://whobluebooks.iarc.who.int/structures/skintumours/" },
    heme: { label: "WHO Classification of Haematolymphoid Tumours", edition: "5th edition", year: "2024", url: "https://whobluebooks.iarc.fr/structures/haematolymphoid/" },
    cns: { label: "WHO Classification of Tumours of the Central Nervous System", edition: "5th edition", year: "2021", url: "https://whobluebooks.iarc.fr/structures/central-nervous-system-tumours/" },
    headneck: { label: "WHO Classification of Head and Neck Tumours", edition: "5th edition", year: "2024", url: "https://whobluebooks.iarc.fr/structures/head-and-neck-tumours/" },
    soft: { label: "WHO Classification of Soft Tissue and Bone Tumours", edition: "5th edition", year: "2020", url: "https://whobluebooks.iarc.fr/structures/soft-tissue-and-bone-tumours/" },
    inflammation: { label: "Không phải nhóm phân loại u WHO", edition: "Not applicable", year: "", url: "https://www.pathologyoutlines.com/infectiousdisease.html" },
  };

  const verifiedLegacyImages = {
    "thyroid-normal": { kind: "Hiển vi điện tử quét (SEM)", note: "Ảnh một tế bào tuyến giáp bình thường bám trên bề mặt vàng; không phải tiêu bản mô học H&E." },
    "thyroid-hashimoto": { kind: "Vi thể H&E" },
    "thyroid-follicular-adenoma": { kind: "Vi thể H&E" },
    "thyroid-ptc": { kind: "Vi thể H&E" },
    "thyroid-medullary": { kind: "Vi thể H&E" },
    "thyroid-anaplastic": { kind: "Vi thể H&E" },
    "lung-adeno": { kind: "Vi thể H&E", note: "Ảnh minh họa kiểu phát triển lepidic của ung thư biểu mô tuyến phổi." },
    "lung-squamous": { kind: "Vi thể H&E" },
    "colon-adeno": { kind: "Vi thể H&E" },
    "breast-dcis": { kind: "Vi thể H&E" },
    "breast-idc": { kind: "Vi thể H&E" },
    "breast-mucinous": { kind: "Vi thể H&E" },
    "hpb-hcc": { kind: "Vi thể H&E" },
    "hpb-ipmn": { kind: "Vi thể H&E" },
    "hpb-shock-liver": { kind: "Vi thể H&E" },
    "cervix-hsil": { kind: "Vi thể H&E" },
    "cervix-scc": { kind: "Vi thể H&E" },
    "endometrium-endometrioid": { kind: "Vi thể H&E" },
    "ovary-krukenberg": { kind: "Đại thể và vi thể H&E" },
    "prostate-adeno": { kind: "Vi thể H&E" },
    "kidney-papillary1": { kind: "Vi thể H&E" },
    "cns-meningioma": { kind: "Vi thể H&E" },
    "headneck-oral-scc": { kind: "Vi thể H&E" },
    "headneck-pleomorphic": { kind: "Đại thể", note: "Ảnh đại thể u tuyến đa hình; dùng để định hướng hình thái chung, không thay thế vi thể H&E." },
    "soft-neurofibroma": { kind: "Đại thể", note: "Ảnh đại thể u xơ thần kinh; chưa có ảnh vi thể mở đã xác minh trong atlas." },
    "inflammation-granuloma": { kind: "Vi thể H&E" },
  };

  const replacementFiles = {
    "thyroid-niftp": ["Histopathology of NIFTP.png", "Vi thể H&E"],
    "thyroid-ftc": ["Histopathology of follicular thyroid carcinoma.png", "Vi thể H&E"],
    "lung-mucinous": ["Invasive mucinous adenocarcinoma (8207250938).jpg", "Vi thể H&E"],
    "lung-carcinoid": ["Typical carcinoid tumor (5020216730).jpg", "Vi thể H&E"],
    "colon-hyperplastic": ["Histopathology of hyperplastic polyp, tangential section.jpg", "Vi thể H&E"],
    "colon-ssl": ["Histopathology of heterogenous sessile serrated adenoma.jpg", "Vi thể H&E"],
    "colon-tsa": ["Histopathology of traditional serrated adenoma, low magnification.jpg", "Vi thể H&E"],
    "colon-inflammatory-polyp": ["Inflammatory polyp -- intermed mag.jpg", "Vi thể H&E"],
    "colon-signet-ring": ["Signet Ring Cells (4435095173).jpg", "Vi thể H&E"],
    "breast-ilc": ["Classic Invasive Lobular Carcinoma of the Breast (6959258451).jpg", "Vi thể H&E"],
    "breast-fibroadenoma": ["Histopathology of fibroadenoma with variable gland compression.jpg", "Vi thể H&E"],
    "breast-phyllodes": ["Phyllodes tumour.jpg", "Vi thể H&E"],
    "breast-lcis": ["Histopathology of lobular carcinoma in situ.jpg", "Vi thể H&E"],
    "breast-metaplastic": ["Breast metaplastic carcinoma.jpg", "Vi thể H&E"],
    "breast-radial-scar": ["Histopathology of a radial scar of the breast.jpg", "Vi thể H&E"],
    "hpb-pdac": ["Histopathology of pancreatic ductal adenocarcinoma.jpg", "Vi thể H&E"],
    "hpb-cirrhosis": ["Histopathology of chronic alcoholic cirrhosis.jpg", "Vi thể H&E", "Ảnh minh họa xơ gan do rượu; không đại diện cho mọi căn nguyên xơ gan."],
    "gyn-ovarian-serous": ["Histopathology of a high-grade serous carcinoma arising from a serous borderline tumor.jpg", "Vi thể H&E", "Ảnh HGSC phát sinh trên nền u thanh dịch giáp biên; đọc đúng bối cảnh của tệp gốc."],
    "gyn-leiomyoma": ["Histopathology of uterine leiomyoma.jpg", "Vi thể H&E"],
    "gyn-leiomyosarcoma": ["Uterine leiomyosarcoma (1).jpg", "Vi thể H&E"],
    "gyn-endometrial-serous": ["Histopathology of papillary serous carcinoma of the endometrium.jpg", "Vi thể H&E"],
    "gyn-mature-teratoma": ["Mature Cystic Teratoma of the Ovary (3776273154).jpg", "Vi thể H&E"],
    "gu-bph": ["Benign prostate hyperplasia.jpg", "Vi thể H&E"],
    "gu-hgpin": ["Histopathology of high-grade prostatic intraepithelial neoplasia (HGPIN), original.jpg", "Vi thể H&E"],
    "gu-seminoma": ["Histopathology of seminoma, intermediate magnification.jpg", "Vi thể H&E"],
    "kidney-clear-cell": ["Histopathology of clear cell renal cell carcinoma, grade 1, intermediate magnification.jpg", "Vi thể H&E"],
    "kidney-chromophobe": ["Histopathology of classic chromophobe renal cell carcinoma with pale cells.jpg", "Vi thể H&E"],
    "skin-actinic-keratosis": ["Histopathology of actinic keratosis.jpg", "Vi thể H&E"],
    "skin-sebk": ["Histopathology of seborrheic keratosis, low magnification.jpg", "Vi thể H&E"],
    "skin-bcc": ["Basal cell carcinoma - high mag.jpg", "Vi thể H&E"],
    "skin-scc": ["Micrograph of invasive squamous cell carcinoma - 150x.jpg", "Vi thể H&E", "Ảnh ung thư biểu mô tế bào vảy xâm nhập nông của da."],
    "skin-melanoma": ["Histopathology of invasive melanoma, high magnification.jpg", "Vi thể H&E"],
    "skin-dermatofibroma": ["Histopathology of dermatofibroma.jpg", "Vi thể H&E"],
    "heme-follicular": ["Follicular lymphoma -- intermed mag.jpg", "Vi thể H&E"],
    "heme-dlbcl": ["Diffuse large B-cell lymphoma (DLBCL), intermed. mag.jpg", "Vi thể H&E"],
    "heme-cll-sll": ["Chronic lymphocytic leukemia - intermed mag.jpg", "Vi thể H&E"],
    "heme-mantle-cell": ["Mantle cell lymphoma - intermed mag.jpg", "Vi thể H&E"],
    "heme-marginal-zone": ["Marginal zone lymphoma - kidney -- intermed mag.jpg", "Vi thể H&E", "Ảnh u lympho vùng rìa tại thận; vị trí của ảnh không đại diện cho mọi ca."],
    "cns-glioblastoma": ["AFIP-00405564-Glioblastoma-Micro.jpg", "Vi thể H&E"],
    "cns-schwannoma": ["Schwannoma with Antoni A and Antoni B areas.jpg", "Vi thể H&E"],
    "headneck-warthin": ["Warthin tumor (0).jpg", "Vi thể H&E"],
    "headneck-nasopharyngeal": ["Nasopharyngeal carcinoma -- high mag.jpg", "Vi thể H&E"],
    "soft-gist": ["Gastrointestinal stromal tumor (GIST), intermed. mag.1.jpg", "Vi thể H&E"],
    "soft-lipoma": ["Histopathology of lipoma.jpg", "Vi thể H&E"],
  };

  const imageReplacements = Object.fromEntries(Object.entries(replacementFiles).map(([id, value]) => {
    const [file, kind, note = ""] = value;
    return [id, { file, kind, note, source: "Wikimedia Commons", sourceUrl: commonsSource(file), verified: true }];
  }));

  const icdoCodes = {
    "thyroid-follicular-adenoma": "83300/0",
    "thyroid-niftp": "83490/1",
    "thyroid-ptc": "82603/3",
    "thyroid-tall-cell-ptc": "83440/3",
    "thyroid-ftc": "83300/3",
    "thyroid-medullary": "83450/3",
    "thyroid-anaplastic": "80210/3",
    "lung-adeno": "81400/3",
    "lung-squamous": "80700/3",
    "lung-small-cell": "80410/3",
    "lung-mucinous": "84800/3",
    "lung-ais": "81400/2",
    "lung-acinar-pattern": "85511/3",
    "lung-papillary-pattern": "82600/3",
    "lung-carcinoid": "82400/3",
    "lung-large-cell-ne": "80130/3",
    "lung-metastatic-colon": "81400/6",
    "colon-ssl": "82130/0",
    "colon-adenoma": "82102/0",
    "colon-tsa": "82131/0",
    "colon-villous": "82610/0",
    "colon-adeno": "81400/3",
    "colon-mucinous-adeno": "84800/3",
    "colon-signet-ring": "84900/3",
    "colon-high-grade-dysplasia": "82102/0",
    "breast-dcis": "85000/2",
    "breast-idc": "85000/3",
    "breast-ilc": "85200/3",
    "breast-mucinous": "84800/3",
    "breast-fibroadenoma": "90100/0",
    "breast-phyllodes": "90200/1",
    "breast-lcis": "85200/2",
    "breast-metaplastic": "85750/3",
    "hpb-hcc": "81700/3",
    "hpb-cholangiocarcinoma": "81600/3",
    "hpb-pdac": "85000/3",
    "hpb-hepatocellular-adenoma": "81700/0",
    "cervix-hsil": "80770/2",
    "cervix-scc": "80700/3",
    "endometrium-endometrioid": "83800/3",
    "gyn-ovarian-serous": "84610/3",
    "gyn-leiomyoma": "88900/0",
    "gyn-leiomyosarcoma": "88900/3",
    "gyn-endometrial-serous": "84410/3",
    "gyn-ein": "83800/2",
    "gyn-mature-teratoma": "90800/0",
    "gyn-cervix-adenocarcinoma": "84830/3",
    "gyn-ovary-mucinous": "84720/1",
    "ovary-krukenberg": "84900/6",
    "prostate-adeno": "8140A/3",
    "kidney-clear-cell": "83101/3",
    "kidney-papillary1": "82602/3",
    "kidney-chromophobe": "83170/3",
    "gu-urothelial-low": "81301/2",
    "gu-urothelial-high": "81200/3",
    "gu-seminoma": "90610/3",
    "gu-hgpin": "81480/2",
    "skin-bcc": "80900/3",
    "skin-scc": "80700/3",
    "skin-melanoma": "87200/3",
    "skin-actinic-keratosis": "80700/0",
    "skin-sebk": "80525/0",
    "skin-nevus": "87200/0",
    "skin-dermatofibroma": "88320/0",
    "heme-follicular": "96900/3",
    "heme-hodgkin": "96501/3",
    "heme-dlbcl": "96800/3",
    "heme-cll-sll": "98230/3",
    "heme-mantle-cell": "96730/3",
    "heme-marginal-zone": "96990/3",
    "cns-meningioma": "95300/0",
    "cns-glioblastoma": "94402/3",
    "cns-schwannoma": "95600/0",
    "headneck-pleomorphic": "89400/0",
    "headneck-warthin": "85610/0",
    "headneck-nasopharyngeal": "80708/3",
    "headneck-oral-scc": "80700/3",
    "soft-neurofibroma": "95400/0",
    "soft-gist": "89360/3",
    "soft-lipoma": "88500/0",
  };

  const notApplicableIcdo = new Set([
    "thyroid-normal", "thyroid-nodular", "thyroid-hashimoto", "thyroid-subacute", "thyroid-graves",
    "colon-hyperplastic", "colon-inflammatory-polyp", "hpb-shock-liver", "hpb-cirrhosis", "hpb-fnh",
    "breast-adh", "breast-radial-scar", "gu-bph", "infection-tb", "infection-fungal-granuloma", "inflammation-granuloma",
  ]);

  const caseMetadata = {};
  Object.entries(icdoCodes).forEach(([id, code]) => {
    caseMetadata[id] = {
      icdo: { code, version: "ICD-O-4", source: `${IARC}/icd-o-4/`, verified: true },
    };
  });
  notApplicableIcdo.forEach((id) => {
    caseMetadata[id] = {
      ...(caseMetadata[id] || {}),
      icdo: { code: "Không áp dụng", version: "ICD-O-4", source: `${IARC}/icd-o-4/`, verified: true, note: "ICD-O dùng để mã hóa u; không gán mã hình thái cho tổn thương không tân sinh này." },
    };
  });

  caseMetadata["hpb-ipmn"] = {
    ...(caseMetadata["hpb-ipmn"] || {}),
    icdo: {
      code: "84531/0 · 84531/2 · 84531/3",
      version: "ICD-O-4",
      source: `${IARC}/icd-o-4/`,
      verified: true,
      note: "Chọn mã theo mức độ: loạn sản độ thấp /0, loạn sản độ cao /2, hoặc có ung thư biểu mô xâm nhập đi kèm /3.",
    },
  };

  caseMetadata["colon-high-grade-dysplasia"] = {
    ...(caseMetadata["colon-high-grade-dysplasia"] || {}),
    icdo: {
      ...(caseMetadata["colon-high-grade-dysplasia"]?.icdo || {}),
      note: "Mã hình thái của u tuyến đại trực tràng thông thường; mức độ loạn sản phải được ghi riêng trong chẩn đoán.",
    },
  };

  caseMetadata["gyn-ovary-mucinous"] = {
    ...(caseMetadata["gyn-ovary-mucinous"] || {}),
    diagnosis: "U nhầy giáp biên của buồng trứng",
    english: "Mucinous borderline tumour of the ovary",
    pattern: ["precursor", "glandular"],
    micro: [
      "Nang và tuyến lót bởi biểu mô nhầy kiểu đường tiêu hóa, có tăng sinh và phân tầng",
      "Có nhú hoặc cấu trúc tuyến phức tạp nhưng không có xâm nhập mô đệm phá hủy",
      "Phải lấy mẫu rộng để loại trừ ổ ung thư biểu mô xâm nhập và u di căn",
    ],
    report: ["Kích thước và bên tổn thương", "Mức độ lấy mẫu", "Không có xâm nhập mô đệm phá hủy", "Đánh giá khả năng di căn đường tiêu hóa"],
    memory: "U nhầy giáp biên có tăng sinh biểu mô rõ nhưng chưa có xâm nhập mô đệm phá hủy.",
    pitfall: "U nhầy buồng trứng không đồng nhất; lấy mẫu thiếu có thể bỏ sót ung thư biểu mô xâm nhập hoặc nhầm di căn đường tiêu hóa.",
    markers: ["CK7", "CK20", "CDX2", "SATB2 - diễn giải theo panel và bối cảnh"],
    icdo: {
      ...(caseMetadata["gyn-ovary-mucinous"]?.icdo || {}),
      note: "ICD-O-4 liệt kê mucinous borderline tumour là thuật ngữ đồng nghĩa của 84720/1.",
    },
  };

  caseMetadata["ovary-krukenberg"] = {
    ...(caseMetadata["ovary-krukenberg"] || {}),
    icdo: {
      ...(caseMetadata["ovary-krukenberg"]?.icdo || {}),
      note: "Mã /6 biểu thị ung thư biểu mô tế bào nhẫn di căn; cần xác định và mã hóa vị trí u nguyên phát khi biết.",
    },
  };

  caseMetadata["lung-metastatic-colon"] = {
    ...(caseMetadata["lung-metastatic-colon"] || {}),
    icdo: {
      ...(caseMetadata["lung-metastatic-colon"]?.icdo || {}),
      note: "Mã /6 biểu thị ung thư biểu mô tuyến di căn; nguồn nguyên phát đại trực tràng phải được xác nhận bằng lâm sàng, hình thái và panel HMMD.",
    },
  };

  const whoAliases = {
    "thyroid-follicular-adenoma": ["Follicular thyroid adenoma"],
    "thyroid-ptc": ["Papillary thyroid carcinoma"],
    "thyroid-ftc": ["Follicular thyroid carcinoma"],
    "lung-squamous": ["Squamous cell carcinoma of the lung"],
    "lung-mucinous": ["Invasive mucinous adenocarcinoma of the lung"],
    "lung-ais": ["Adenocarcinoma in situ of the lung"],
    "lung-large-cell-ne": ["Large cell neuroendocrine carcinoma of the lung"],
    "colon-adenoma": ["Conventional colorectal adenoma"],
    "hpb-ipmn": ["Pancreatic intraductal papillary mucinous neoplasm"],
    "hpb-fnh": ["Focal nodular hyperplasia of the liver"],
    "breast-lcis": ["Lobular carcinoma in situ"],
    "breast-mucinous": ["Mucinous carcinoma"],
    "breast-metaplastic": ["Metaplastic carcinoma"],
    "gyn-ovarian-serous": ["High grade serous carcinoma of the ovary"],
    "gyn-ein": ["Endometrial atypical hyperplasia / endometrioid intraepithelial neoplasia"],
    "gyn-mature-teratoma": ["Mature teratoma of the ovary"],
    "prostate-adeno": ["Prostatic acinar adenocarcinoma"],
    "gu-urothelial-low": ["Non-invasive papillary urothelial carcinoma, low-grade"],
    "kidney-chromophobe": ["Chromophobe renal cell carcinoma"],
    "skin-sebk": ["Seborrhoeic keratosis"],
    "skin-dermatofibroma": ["Dermatofibroma (fibrous histiocytoma) and variants"],
    "cns-glioblastoma": ["Glioblastoma, IDH-wildtype"],
    "headneck-nasopharyngeal": ["Nasopharyngeal carcinoma"],
  };
  Object.entries(whoAliases).forEach(([id, terms]) => {
    caseMetadata[id] = { ...(caseMetadata[id] || {}), whoTerms: terms };
  });

  const webPathologyLinks = {
    "thyroid-ptc": "https://www.webpathology.com/images/endocrine/thyroid/papillary-carcinoma",
  };
  Object.entries(webPathologyLinks).forEach(([id, url]) => {
    caseMetadata[id] = { ...(caseMetadata[id] || {}), webPathologyUrl: url };
  });

  const systemNotes = {
    "thyroid-normal": [{ label: "Bethesda 2023", note: "Chỉ áp dụng cho tế bào học FNA tuyến giáp; không dùng để phân loại tiêu bản mô học.", url: "https://journals.sagepub.com/doi/10.1089/thy.2023.0141" }],
    "thyroid-nodular": [{ label: "Bethesda 2023", note: "Chỉ áp dụng khi đây là mẫu FNA tuyến giáp; phân nhóm phải dựa trên toàn bộ tiêu bản tế bào học.", url: "https://journals.sagepub.com/doi/10.1089/thy.2023.0141" }],
    "endometrium-endometrioid": [{ label: "FIGO 2023", note: "Phân giai đoạn ung thư nội mạc tử cung cần dữ liệu mô bệnh học, phân tử và lâm sàng/phẫu thuật đầy đủ.", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC10482588/" }],
    "gyn-endometrial-serous": [{ label: "FIGO 2023", note: "Áp dụng hệ thống phân giai đoạn ung thư nội mạc tử cung FIGO 2023 khi đủ dữ liệu.", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC10482588/" }],
  };
  Object.entries(systemNotes).forEach(([id, systems]) => {
    caseMetadata[id] = { ...(caseMetadata[id] || {}), systems };
  });

  const vietnameseWhoQueryMap = {
    "ung thư biểu mô": ["carcinoma"],
    "ung thư biểu mô tuyến": ["adenocarcinoma"],
    "tuyến giáp": ["thyroid"],
    "thể nhú": ["papillary"],
    "thể nang": ["follicular"],
    "thể tủy": ["medullary"],
    "không biệt hóa": ["anaplastic", "undifferentiated"],
    "phổi": ["lung", "thoracic"],
    "tế bào vảy": ["squamous cell"],
    "tế bào nhỏ": ["small cell"],
    "dạng nhầy": ["mucinous"],
    "đại trực tràng": ["colorectal", "colon", "rectum"],
    "vú": ["breast"],
    "tiểu thùy": ["lobular"],
    "gan": ["liver", "hepatic"],
    "tụy": ["pancreatic", "pancreas"],
    "cổ tử cung": ["cervix", "cervical"],
    "nội mạc tử cung": ["endometrial", "endometrium"],
    "buồng trứng": ["ovary", "ovarian"],
    "tuyến tiền liệt": ["prostate", "prostatic"],
    "thận": ["renal", "kidney"],
    "bàng quang": ["bladder", "urothelial"],
    "da": ["skin", "cutaneous"],
    "u hắc tố": ["melanoma"],
    "u lympho": ["lymphoma"],
    "màng não": ["meningioma"],
    "mô mềm": ["soft tissue"],
    "lành tính": ["benign"],
    "ác tính": ["malignant"],
    "độ cao": ["high grade"],
    "độ thấp": ["low grade"],
  };

  window.ATLAS_CURATION = {
    reviewedAt: "2026-07-21",
    topicLinks,
    chapterStandards,
    verifiedLegacyImages,
    imageReplacements,
    caseMetadata,
    vietnameseWhoQueryMap,
    sources: {
      icdo4: `${IARC}/icd-o-4/`,
      who: `${IARC}/welcome/`,
      bethesda2023: "https://journals.sagepub.com/doi/10.1089/thy.2023.0141",
      figo2023Endometrium: "https://pmc.ncbi.nlm.nih.gov/articles/PMC10482588/",
    },
  };
}());
