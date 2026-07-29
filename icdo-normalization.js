(() => {
  const IARC_ICDO4 = "https://tumourclassification.iarc.who.int/icd-o-4/";
  const RELEASE_DATE = "2026-07-20";
  const WORKBOOK_SHA256 = "280AE87DC8BFEA873A2346E7A5BEE380877DA1C84F8339697155FA5E77F3DEEF";
  const curation = window.ATLAS_CURATION || {};
  const caseMetadata = curation.caseMetadata || {};

  // Preferred terms were extracted from the official ICD-O-4 Morphology table
  // released by WHO/IARC on 20 July 2026. Keep this map local so the static
  // site can validate every displayed code without relying on a live API.
  const officialPreferredTerms = Object.freeze({
    "80130/3": "Large cell neuroendocrine carcinoma, NOS",
    "80202/3": "Anaplastic undifferentiated carcinoma",
    "80410/3": "Small cell carcinoma, NOS",
    "80525/0": "Seborrhoeic keratosis, NOS",
    "80700/0": "Actinic keratosis, NOS",
    "80700/3": "Squamous cell carcinoma, NOS",
    "80708/3": "Nasopharyngeal carcinoma",
    "80770/2": "High-grade squamous intraepithelial lesion, NOS",
    "80850/3": "Squamous cell carcinoma, HPV-associated",
    "80900/3": "Basal cell carcinoma, NOS",
    "81200/2": "Urothelial carcinoma in situ",
    "81200/3": "Urothelial carcinoma, NOS",
    "81301/2": "Non-invasive papillary urothelial carcinoma, low-grade, NOS",
    "81303/2": "Non-invasive papillary urothelial carcinoma, high-grade, NOS",
    "81400/3": "Adenocarcinoma, NOS",
    "81400/6": "Adenocarcinoma, metastatic, NOS",
    "8140A/3": "Acinar adenocarcinoma of prostate",
    "81480/0": "Glandular intraepithelial neoplasia, low-grade",
    "81480/2": "Glandular intraepithelial neoplasia, high-grade",
    "81600/3": "Cholangiocarcinoma, NOS",
    "81700/0": "Liver cell adenoma",
    "81700/3": "Hepatocellular carcinoma, NOS",
    "82000/3": "Adenoid cystic carcinoma, NOS",
    "82102/0": "Conventional adenoma, NOS",
    "82103/2": "Conventional adenoma, high-grade",
    "82130/0": "Sessile serrated lesion, NOS",
    "82131/0": "Traditional serrated adenoma, NOS",
    "82401/3": "Neuroendocrine tumour, grade 1",
    "82490/3": "Neuroendocrine tumour, grade 2",
    "82491/3": "Neuroendocrine tumour, grade 3",
    "82500/2": "Adenocarcinoma in situ of lung, non-mucinous",
    "82530/3": "Adenocarcinoma of lung, mucinous",
    "82600/3": "Papillary adenocarcinoma, NOS",
    "82602/3": "Papillary renal cell carcinoma",
    "82603/3": "Papillary thyroid carcinoma, NOS",
    "82610/0": "Villous adenoma, NOS",
    "83101/3": "Clear cell renal cell carcinoma, NOS",
    "83170/3": "Chromophobe renal cell carcinoma",
    "83300/0": "Follicular adenoma, NOS",
    "83300/3": "Follicular carcinoma, NOS",
    "83440/3": "Papillary carcinoma, tall cell",
    "83450/3": "Medullary thyroid carcinoma",
    "83490/1": "Non-invasive follicular thyroid neoplasm with papillary-like nuclear features (NIFTP), NOS",
    "83800/2": "Endometrial atypical hyperplasia/endometrioid intraepithelial neoplasia",
    "83800/3": "Endometrioid adenocarcinoma, NOS",
    "84300/3": "Mucoepidermoid carcinoma, NOS",
    "84410/3": "Serous carcinoma, NOS",
    "84531/0": "Intraductal papillary mucinous neoplasm with low-grade dysplasia",
    "84531/2": "Intraductal papillary mucinous neoplasm (IPMN) with high-grade dysplasia",
    "84531/3": "Intraductal papillary mucinous neoplasm (IPMN) with an associated invasive carcinoma",
    "84610/3": "High-grade serous carcinoma",
    "84720/1": "Mucinous cystic tumour of borderline malignancy",
    "84800/3": "Mucinous adenocarcinoma, NOS",
    "84830/3": "Adenocarcinoma, HPV-associated",
    "84900/3": "Signet-ring cell carcinoma",
    "84900/6": "Metastatic signet-ring cell carcinoma",
    "85000/2": "Intraductal carcinoma, noninfiltrating, NOS",
    "85000/3": "Infiltrating duct carcinoma, NOS",
    "85200/2": "Lobular carcinoma in situ, NOS",
    "85200/3": "Invasive lobular carcinoma, NOS",
    "85501/3": "Acinic cell carcinoma",
    "85511/3": "Acinar adenocarcinoma of lung",
    "85610/0": "Warthin tumour, NOS",
    "85750/3": "Metaplastic carcinoma, NOS",
    "87200/0": "Pigmented naevus, NOS",
    "87200/3": "Melanoma, NOS",
    "88320/0": "Dermatofibroma, NOS",
    "88500/0": "Lipoma, NOS",
    "88500/1": "Atypical lipomatous tumour",
    "88580/3": "Dedifferentiated liposarcoma",
    "88900/0": "Leiomyoma, NOS",
    "88900/3": "Leiomyosarcoma, NOS",
    "89360/3": "Gastrointestinal stromal tumour",
    "89400/0": "Pleomorphic adenoma, NOS",
    "90100/0": "Fibroadenoma, NOS",
    "90200/0": "Phyllodes tumour, benign",
    "90200/1": "Phyllodes tumour, NOS",
    "90200/3": "Phyllodes tumour, malignant",
    "90400/3": "Synovial sarcoma, NOS",
    "90610/3": "Seminoma, NOS",
    "90800/0": "Teratoma, benign",
    "91800/3": "Osteosarcoma, NOS",
    "92203/3": "Central chondrosarcoma, grade 2",
    "92206/3": "Central chondrosarcoma, grade 3",
    "94007/3": "Astrocytoma, IDH-mutant, NOS",
    "94008/3": "Astrocytoma, IDH-mutant, grade 2",
    "94012/3": "Astrocytoma, IDH-mutant, grade 3",
    "94210/1": "Pilocytic astrocytoma, NOS",
    "94402/3": "Glioblastoma, IDH-wildtype",
    "94450/3": "Astrocytoma, IDH-mutant, grade 4",
    "94501/3": "Oligodendroglioma, IDH-mutant and 1p/19q-codeleted, NOS",
    "94502/3": "Oligodendroglioma, IDH-mutant and 1p/19q-codeleted, grade 2",
    "94511/3": "Oligodendroglioma, IDH-mutant and 1p/19q-codeleted, grade 3",
    "94700/3": "Medulloblastoma, NOS",
    "95100/3": "Retinoblastoma, NOS",
    "95300/0": "Meningioma, NOS",
    "95400/0": "Neurofibroma, NOS",
    "95600/0": "Schwannoma, NOS",
    "96501/3": "Classic Hodgkin lymphoma, NOS",
    "96730/3": "Mantle cell lymphoma, NOS",
    "96800/3": "Diffuse large B-cell lymphoma, NOS",
    "96900/3": "Follicular lymphoma, NOS",
    "96990/3": "Marginal zone lymphoma, NOS",
    "98230/3": "Chronic lymphocytic leukaemia/small lymphocytic lymphoma, NOS",
  });

  const overrides = {
    "thyroid-anaplastic": {
      code: "80202/3",
      note: "ICD-O-4 liệt kê anaplastic thyroid carcinoma là thuật ngữ liên quan của 80202/3; không dùng mã anaplastic carcinoma NOS 80210/3 khi đã biết nguồn gốc tuyến giáp.",
    },
    "lung-ais": {
      code: "82500/2",
      note: "Mã dành riêng cho adenocarcinoma in situ của phổi, không nhầy. Nếu tổn thương nhầy, ICD-O-4 có mã 82530/2 riêng.",
    },
    "lung-mucinous": {
      code: "82530/3",
      note: "Mã đặc hiệu cho adenocarcinoma nhầy của phổi; không dùng mã mucinous adenocarcinoma NOS 84800/3 khi vị trí phổi đã được xác định.",
    },
    "lung-carcinoid": {
      code: "82401/3 · 82490/3",
      note: "Chọn 82401/3 cho carcinoid điển hình (NET grade 1) hoặc 82490/3 cho carcinoid không điển hình (NET grade 2); không gộp dưới mã NET NOS khi đã phân típ.",
    },
    "cervix-scc": {
      code: "80850/3",
      note: "Mã đặc hiệu cho ung thư biểu mô tế bào vảy liên quan HPV. Chỉ dùng 80700/3 khi không xác định được tình trạng liên quan HPV.",
    },
    "colon-high-grade-dysplasia": {
      code: "82103/2",
      note: "Mã chính thức cho conventional adenoma, high-grade. Mã 82102/0 chỉ dùng cho conventional adenoma NOS.",
    },
    "breast-phyllodes": {
      code: "90200/0 · 90200/1 · 90200/3",
      note: "Chọn 90200/0 cho u dạng lá lành tính, 90200/1 cho NOS/giáp biên hoặc 90200/3 cho u dạng lá ác tính.",
    },
    "gu-urothelial-high": {
      code: "81200/2 · 81303/2 · 81200/3",
      note: "Chọn 81200/2 cho carcinoma niệu mạc tại chỗ dạng phẳng, 81303/2 cho u nhú độ cao không xâm nhập hoặc 81200/3 khi đã có xâm nhập.",
    },
    "uppergi-barrett-dysplasia": {
      code: "81480/0 · 81480/2",
      note: "Chọn 81480/0 cho loạn sản Barrett độ thấp hoặc 81480/2 cho loạn sản Barrett độ cao; không mã hóa Barrett không loạn sản như một u.",
    },
    "cns-astrocytoma-idh-mutant": {
      code: "94007/3 · 94008/3 · 94012/3 · 94450/3",
      note: "Chọn 94007/3 cho NOS, 94008/3 cho độ 2, 94012/3 cho độ 3 hoặc 94450/3 cho độ 4.",
    },
    "cns-oligodendroglioma-idh-codeleted": {
      code: "94501/3 · 94502/3 · 94511/3",
      note: "Chọn 94501/3 cho NOS, 94502/3 cho độ 2 hoặc 94511/3 cho độ 3.",
    },
  };

  const noSeparateCodeNotes = {
    "breast-adh": "ICD-O-4 không liệt kê tăng sản ống không điển hình như một thực thể hình thái độc lập. Không mượn mã 85030/0, vì mã này dành cho u nhú trong ống, kể cả u nhú có kèm ADH.",
    "breast-radial-scar": "ICD-O-4 không có mã hình thái riêng cho sẹo tia/tổn thương xơ hóa phức tạp.",
    "colon-hyperplastic": "Polyp tăng sản không có mã hình thái ICD-O-4 riêng; không nhầm với tổn thương răng cưa không cuống 82130/0.",
    "hpb-fnh": "Tăng sản nốt khu trú là tổn thương tăng sản, không có mã hình thái ICD-O-4 riêng.",
  };

  function codeTokens(value) {
    return String(value || "").match(/\b[0-9]{4}[0-9A-Z]\/[0-9]\b/g) || [];
  }

  Object.entries(caseMetadata).forEach(([id, metadata]) => {
    const current = metadata.icdo || {};
    const override = overrides[id] || {};
    const merged = { ...current, ...override };
    const tokens = codeTokens(merged.code);
    const isNoCode = tokens.length === 0;
    const officialTerms = tokens.map((code) => officialPreferredTerms[code]).filter(Boolean);
    const allCodesVerified = tokens.every((code) => Boolean(officialPreferredTerms[code]));
    const status = isNoCode ? "not-coded" : tokens.length > 1 ? "conditional" : "exact";
    const statusLabel = status === "exact"
      ? "Mã thực thể / entity code"
      : status === "conditional"
        ? "Chọn theo phân nhóm / conditional"
        : "Không có mã hình thái riêng / not separately coded";
    const defaultNote = isNoCode
      ? "ICD-O dùng để mã hóa tân sinh. Không gán mã hình thái cho tổn thương không tân sinh hoặc thực thể không được liệt kê riêng trong bảng ICD-O-4."
      : "Mã hình thái đã được đối chiếu với thuật ngữ ưu tiên trong bảng ICD-O-4 chính thức; mã vị trí giải phẫu phải chọn theo đúng bệnh phẩm.";

    metadata.icdo = {
      ...merged,
      code: isNoCode ? "Không có mã hình thái ICD-O-4 riêng" : merged.code,
      version: "ICD-O-4",
      source: IARC_ICDO4,
      releaseDate: RELEASE_DATE,
      verified: isNoCode || allCodesVerified,
      status,
      statusLabel,
      officialTerms,
      note: noSeparateCodeNotes[id] || override.note || merged.note || defaultNote,
    };
  });

  const auditEntries = Object.values(caseMetadata).map((metadata) => metadata.icdo).filter(Boolean);
  window.ICDO4_AUDIT = Object.freeze({
    source: IARC_ICDO4,
    releaseDate: RELEASE_DATE,
    workbookSha256: WORKBOOK_SHA256,
    caseCount: auditEntries.length,
    codedCaseCount: auditEntries.filter((entry) => entry.status !== "not-coded").length,
    conditionalCaseCount: auditEntries.filter((entry) => entry.status === "conditional").length,
    notCodedCaseCount: auditEntries.filter((entry) => entry.status === "not-coded").length,
    officialPreferredTerms,
    terminologyBasis: "WHO/IARC entity names; PathologyOutlines topic names are used as an independent clinical terminology cross-check where a direct topic link is available.",
  });
})();
