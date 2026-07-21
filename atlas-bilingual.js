(function () {
  "use strict";

  const d = (micro, report, memory, pitfall) => ({ micro, report, memory, pitfall });

  window.ATLAS_BILINGUAL = {
    "thyroid-normal": d(
      ["Relatively uniform follicles", "Pink colloid within follicular lumina", "Low cuboidal follicular epithelium with bland nuclei"],
      ["Use as the reference pattern when assessing goitre, thyroiditis and follicular neoplasms."],
      "Uniform follicles, pink colloid and low epithelium form the normal reference pattern.",
      "Processing-related follicular distortion may create false architectural irregularity."
    ),
    "thyroid-nodular": d(
      ["Variably sized colloid-filled follicles", "Fibrosis, haemorrhage and cystic degeneration may be present", "No defining papillary thyroid carcinoma-type nuclear features"],
      ["Assess encapsulation and capsular or vascular invasion when a follicular neoplasm is considered."],
      "Heterogeneous follicles with abundant colloid and bland nuclei favour nodular hyperplasia.",
      "FNA cannot reliably distinguish nodular hyperplasia from a follicular neoplasm when the sample is microfollicular."
    ),
    "thyroid-hashimoto": d(
      ["Diffuse lymphoplasmacytic inflammation", "Lymphoid follicles with germinal centres", "Oncocytic (Hurthle cell) change of follicular cells"],
      ["Document chronic autoimmune thyroiditis and separately evaluate any dominant or suspicious nodule."],
      "Lymphocytes, germinal centres and Hurthle cells are the classic triad.",
      "Marked oncocytic change may mimic an oncocytic neoplasm."
    ),
    "thyroid-subacute": d(
      ["Granulomatous inflammation centred on disrupted follicles", "Multinucleated giant cells surrounding extravasated colloid", "Mixed inflammation with evolving fibrosis"],
      ["Correlate with neck pain, inflammatory markers and the clinical phase of disease."],
      "Giant cells around spilled colloid strongly support subacute granulomatous thyroiditis.",
      "Do not interpret reactive follicular atypia as malignancy."
    ),
    "thyroid-follicular-adenoma": d(
      ["Encapsulated follicular-patterned neoplasm", "Relatively uniform follicles and cytologically bland cells", "No capsular or vascular invasion after adequate sampling"],
      ["Submit the tumour-capsule interface extensively and report the absence of invasion."],
      "A follicular adenoma is defined by encapsulation without capsular or vascular invasion.",
      "FNA cannot separate follicular adenoma from follicular carcinoma because invasion must be assessed histologically."
    ),
    "thyroid-niftp": d(
      ["Encapsulated or sharply demarcated follicular-patterned tumour", "Papillary thyroid carcinoma-type nuclear features", "No true papillae, tumour necrosis, increased mitoses or capsular/vascular invasion within accepted criteria"],
      ["Diagnosis requires complete capsule-interface evaluation and strict exclusion criteria."],
      "NIFTP combines a follicular growth pattern with PTC-type nuclei but lacks invasion and exclusionary high-risk features.",
      "Do not diagnose NIFTP on FNA or an incompletely sampled excision."
    ),
    "thyroid-ptc": d(
      ["Papillae with fibrovascular cores may be present", "Enlarged optically clear nuclei with grooves", "Intranuclear cytoplasmic pseudoinclusions and psammoma bodies may occur"],
      ["Report subtype, tumour size, extrathyroidal extension, margins, lymphovascular invasion and nodal disease."],
      "Papillary thyroid carcinoma is primarily a diagnosis of nuclear morphology.",
      "Papillary architecture alone is insufficient; confirm the characteristic nuclear features."
    ),
    "thyroid-ftc": d(
      ["Encapsulated follicular-patterned tumour", "Capsular penetration and/or unequivocal vascular invasion", "PTC-type nuclear features are absent"],
      ["Record the extent of capsular and vascular invasion and classify the tumour according to current WHO criteria."],
      "Follicular carcinoma is established by invasion, not by cytologic atypia alone.",
      "Capsular entrapment or tangential sectioning must not be overcalled as invasion."
    ),
    "thyroid-medullary": d(
      ["Nests, trabeculae or sheets of neuroendocrine cells", "Salt-and-pepper chromatin", "Stromal amyloid may be present"],
      ["Confirm C-cell differentiation and report size, margins, extrathyroidal extension and nodal status."],
      "Neuroendocrine morphology plus amyloid should prompt calcitonin testing.",
      "Distinguish medullary carcinoma from metastatic neuroendocrine tumour and other thyroid neoplasms."
    ),
    "thyroid-anaplastic": d(
      ["Markedly pleomorphic spindle, giant or epithelioid tumour cells", "Brisk mitotic activity and extensive necrosis", "A differentiated thyroid carcinoma component may coexist"],
      ["Document anaplastic morphology and use a focused panel to support thyroid origin and exclude mimics."],
      "Extreme pleomorphism, necrosis and rapid destructive growth define this high-grade tumour.",
      "Exclude sarcoma, melanoma, lymphoma and metastatic carcinoma with morphology and an appropriate panel."
    ),
    "thyroid-graves": d(
      ["Diffuse follicular hyperplasia with tall crowded epithelium", "Scalloped pale colloid", "Papillary infoldings lack true fibrovascular cores"],
      ["Correlate with biochemical hyperthyroidism and separately assess any dominant nodule."],
      "Tall active epithelium and scalloped colloid reflect diffuse thyroid stimulation.",
      "Hyperplastic infoldings and reactive nuclear change should not be mistaken for papillary carcinoma."
    ),
    "thyroid-tall-cell-ptc": d(
      ["Tall eosinophilic tumour cells at least two to three times as tall as wide", "Characteristic PTC nuclear features", "The tall-cell component must meet the current required proportion"],
      ["State the tall-cell subtype and report invasion, margins and nodal disease."],
      "Tall-cell PTC retains PTC nuclei but shows a substantial population of tall eosinophilic cells.",
      "Scattered tall cells are insufficient for this subtype designation."
    ),

    "lung-adeno": d(
      ["Gland formation and/or mucin production", "Lepidic, acinar, papillary, micropapillary or solid patterns may coexist", "Assess stromal, vascular and pleural invasion"],
      ["Report predominant pattern, grade, invasive size, STAS, pleural invasion, margins and required biomarkers."],
      "Identify architecture first, then quantify the component patterns and invasion.",
      "Metastatic adenocarcinoma must be excluded using clinical context, morphology and a targeted panel."
    ),
    "lung-squamous": d(
      ["Keratinization and/or intercellular bridges", "Nests or sheets of malignant squamous cells", "Non-keratinizing tumours require supportive squamous markers"],
      ["Report size, invasion, pleural involvement, margins, nodes and relevant predictive testing."],
      "Keratinization or intercellular bridges establish squamous differentiation.",
      "Avoid overclassifying a poorly differentiated small biopsy without adequate morphology or immunophenotype."
    ),
    "lung-small-cell": d(
      ["Small cells with scant cytoplasm and finely granular chromatin", "Nuclear moulding and crush artefact", "Very high mitotic rate and extensive necrosis"],
      ["Confirm high-grade neuroendocrine differentiation and correlate with clinical staging."],
      "Moulding, crush artefact, necrosis and brisk mitoses are the core pattern.",
      "Separate small cell carcinoma from lymphoma, basaloid carcinoma and other small round-cell tumours."
    ),
    "lung-mucinous": d(
      ["Goblet or columnar tumour cells with abundant mucin", "Lepidic growth commonly accompanies invasive areas", "TTF-1 and Napsin A are often negative or only focal"],
      ["Record invasive size and patterns and exclude metastasis from gastrointestinal or pancreatobiliary sites."],
      "Mucinous cells growing along alveolar septa suggest invasive mucinous adenocarcinoma.",
      "Clinical and immunophenotypic correlation is essential because metastases can look identical."
    ),
    "lung-ais": d(
      ["Pure lepidic growth along pre-existing alveolar septa", "Tumour size no greater than 30 mm", "No stromal, vascular, air-space or pleural invasion"],
      ["Diagnosis requires complete tumour sampling and documentation of size and absence of invasion."],
      "AIS is a small, purely lepidic and completely non-invasive adenocarcinoma.",
      "Do not diagnose AIS on a small biopsy or incompletely sampled lesion."
    ),
    "lung-acinar-pattern": d(
      ["Round to oval glands with central lumina", "Malignant epithelial cells line true glandular spaces", "Other adenocarcinoma patterns should be quantified"],
      ["Report the predominant and secondary patterns, grade and invasive size."],
      "True tumour glands with central lumina define the acinar pattern.",
      "Entrapped benign glands and tangentially sectioned papillae may mimic acinar structures."
    ),
    "lung-papillary-pattern": d(
      ["Tumour cells cover fibrovascular cores", "Papillae replace the normal alveolar architecture", "Micropapillary tufts lack fibrovascular cores and must be separated"],
      ["Quantify papillary and any higher-grade patterns and report invasive size."],
      "A true fibrovascular core distinguishes papillary from micropapillary growth.",
      "Do not call lepidic growth papillary merely because alveolar septa appear folded."
    ),
    "lung-carcinoid": d(
      ["Organoid nests, trabeculae or rosettes", "Uniform cells with salt-and-pepper chromatin", "Classification depends on mitotic count and necrosis"],
      ["Report tumour size, mitotic count per 2 square mm, necrosis, margins and nodes."],
      "Well-differentiated neuroendocrine architecture plus low proliferative activity supports carcinoid tumour.",
      "Crush artefact may mimic small cell carcinoma; evaluate preserved areas and proliferation carefully."
    ),
    "lung-large-cell-ne": d(
      ["Large polygonal tumour cells with neuroendocrine architecture", "Prominent nucleoli, brisk mitoses and geographic necrosis", "Diffuse neuroendocrine marker expression supports the diagnosis"],
      ["Document high-grade neuroendocrine morphology and distinguish it from small cell carcinoma and poorly differentiated NSCLC."],
      "LCNEC is a high-grade neuroendocrine carcinoma composed of large cells.",
      "A small biopsy may not permit reliable separation from other high-grade carcinomas."
    ),
    "lung-metastatic-colon": d(
      ["Colorectal-type glands, often with dirty necrosis", "Lepidic growth is usually absent", "CDX2 and SATB2 support colorectal origin in the correct context"],
      ["Compare with the prior primary tumour and state that metastatic origin requires clinicopathologic correlation."],
      "A lung glandular tumour with dirty necrosis and a colorectal immunophenotype should raise metastasis first.",
      "Pulmonary enteric adenocarcinoma can mimic colorectal metastasis."
    ),

    "colon-hyperplastic": d(
      ["Mature goblet and absorptive cells", "Superficial serration without basal crypt distortion", "Straight crypt bases with normal maturation"],
      ["Record polyp type and site, especially when proximal or unusually large."],
      "Serration limited to the upper crypt with straight bases favours a hyperplastic polyp.",
      "Tangential sectioning can mimic basal serration or crypt distortion."
    ),
    "colon-ssl": d(
      ["Basally dilated and horizontally growing crypts", "L-shaped or boot-shaped crypt bases", "Serration extends to the crypt base"],
      ["Report sessile serrated lesion and separately state whether dysplasia is present."],
      "Basal crypt distortion, not surface serration alone, is the key feature.",
      "Poor orientation may obscure the diagnostic crypt bases."
    ),
    "colon-adenoma": d(
      ["Dysplastic elongated hyperchromatic nuclei", "Reduced goblet-cell mucin and nuclear stratification", "Tubular, tubulovillous or villous architecture"],
      ["Report size, architecture, dysplasia grade and margin when assessable."],
      "Conventional adenoma combines epithelial dysplasia with a characteristic glandular architecture.",
      "Regenerative atypia in inflamed mucosa should not be overcalled as adenomatous dysplasia."
    ),
    "colon-high-grade-dysplasia": d(
      ["Complex crowded or cribriform glands", "Marked loss of polarity and cytologic atypia", "No unequivocal invasion into submucosal stroma"],
      ["Report adenoma type, high-grade dysplasia, size and margin; search carefully for invasion."],
      "High-grade dysplasia is architecturally severe but remains non-invasive.",
      "Tangential sectioning and epithelial misplacement may mimic invasive carcinoma."
    ),
    "colon-tsa": d(
      ["Villiform serrated architecture", "Ectopic crypt formation", "Cytologic dysplasia with eosinophilic cells"],
      ["Report traditional serrated adenoma, size, dysplasia and margin."],
      "Villiform serration plus ectopic crypts is the practical recognition pattern.",
      "Distinguish TSA from a conventional villous adenoma and an SSL with dysplasia."
    ),
    "colon-villous": d(
      ["Long finger-like fronds with fibrovascular cores", "Dysplastic epithelium lines the villi", "The villous proportion affects architectural classification"],
      ["Report size, villous component, dysplasia grade and margin."],
      "Long dysplastic villi with fibrovascular cores define villous architecture.",
      "Tangentially sectioned tubular glands may appear falsely villous."
    ),
    "colon-inflammatory-polyp": d(
      ["Inflamed granulation tissue", "Distorted or regenerating crypts", "Ulceration and fibrin may be present"],
      ["Describe the inflammatory polyp and the background mucosal disease when identifiable."],
      "Inflammation, repair and granulation tissue dominate rather than true epithelial dysplasia.",
      "Reactive atypia near ulceration may mimic dysplasia."
    ),
    "colon-adeno": d(
      ["Irregular infiltrative glands within desmoplastic stroma", "Dirty luminal necrosis is common", "Assess lymphovascular and perineural invasion"],
      ["Report site, size, grade, depth, margins, nodes, deposits, LVI/PNI and MMR status according to protocol."],
      "Angulated glands in desmoplastic stroma establish invasive colorectal adenocarcinoma.",
      "Epithelial misplacement in a polyp can mimic invasion; look for desmoplasia and destructive growth."
    ),
    "colon-mucinous-adeno": d(
      ["Extracellular mucin comprises more than half of the tumour", "Malignant glands or tumour cells float in mucin pools", "Signet-ring cells may be present but are not required"],
      ["Report the mucinous type and all standard colorectal cancer parameters, including MMR status."],
      "The diagnosis depends on abundant extracellular mucin, not intracellular mucin alone.",
      "Exclude a metastasis and distinguish mucinous carcinoma from conventional carcinoma with focal mucin."
    ),
    "colon-signet-ring": d(
      ["Discohesive cells with intracytoplasmic mucin displacing the nucleus", "Diffuse or infiltrative growth", "Mucin pools may accompany the signet-ring cells"],
      ["Report the signet-ring component and standard staging parameters and investigate a possible non-colorectal primary."],
      "Intracytoplasmic mucin pushes the nucleus to the edge, creating the signet-ring shape.",
      "Exclude gastric and lobular breast carcinoma metastases when the clinical origin is uncertain."
    ),

    "breast-dcis": d(
      ["A clonal atypical epithelial proliferation confined to ducts", "Myoepithelial cells remain around involved ducts", "Solid, cribriform, papillary or comedo patterns may occur"],
      ["Report nuclear grade, necrosis, size/extent, calcification and margins."],
      "DCIS fills ducts but does not breach the myoepithelial boundary.",
      "Cancerization of lobules and tangential sections may simulate invasion."
    ),
    "breast-idc": d(
      ["Infiltrative malignant glands, nests or cords in desmoplastic stroma", "No defining morphology of a special type", "Assess tubule formation, pleomorphism and mitotic activity for Nottingham grade"],
      ["Report size, type, Nottingham grade, LVI, margins, nodes and ER/PR/HER2 status."],
      "Invasive breast carcinoma NST is used when no special-type pattern predominates.",
      "Confirm invasion with morphology and myoepithelial markers only when genuinely needed."
    ),
    "breast-ilc": d(
      ["Discohesive small cells infiltrate in single files", "Targetoid growth around ducts may occur", "E-cadherin loss or aberrant expression supports lobular differentiation"],
      ["Report type, size, grade, margins, nodes and predictive biomarkers."],
      "Single-file discohesive infiltration is the classic lobular pattern.",
      "Low cellularity and subtle infiltration can lead to underestimation of tumour extent."
    ),
    "breast-mucinous": d(
      ["Clusters of bland malignant cells floating in extracellular mucin", "Delicate capillaries may traverse mucin pools", "Pure and mixed forms must be distinguished"],
      ["Report the mucinous type, pure versus mixed status and standard breast cancer parameters."],
      "Tumour cell islands floating in abundant mucin create the characteristic pattern.",
      "Do not classify a tumour as pure mucinous carcinoma when a substantial conventional invasive component is present."
    ),
    "breast-fibroadenoma": d(
      ["Biphasic proliferation of benign glands and stroma", "Pericanalicular and intracanalicular patterns", "Stroma is usually bland and of low cellularity"],
      ["State fibroadenoma and document atypical epithelial or stromal features if present."],
      "A bland biphasic lesion with compressed ducts strongly supports fibroadenoma.",
      "Increased stromal cellularity or leaf-like architecture should prompt consideration of phyllodes tumour."
    ),
    "breast-phyllodes": d(
      ["Leaf-like architecture with epithelial-lined clefts", "Hypercellular stroma condenses beneath the epithelium", "Grade depends on stromal atypia, mitoses, overgrowth and tumour border"],
      ["Report benign, borderline or malignant category, size, stromal features and margin status."],
      "Leaf-like architecture plus a true stromal proliferation separates phyllodes tumour from fibroadenoma.",
      "Core biopsy may under-sample the most cellular or atypical stromal area."
    ),
    "breast-lcis": d(
      ["Lobules are expanded by discohesive monotonous cells", "Acini remain recognizable", "E-cadherin is typically lost or aberrant"],
      ["Classify classic versus non-classic LCIS and document necrosis, marked distension and margins when relevant."],
      "LCIS expands lobules with discohesive cells but lacks stromal invasion.",
      "Distinguish LCIS from solid low-grade DCIS using morphology and E-cadherin when necessary."
    ),
    "breast-metaplastic": d(
      ["Malignant epithelial tumour with squamous and/or mesenchymal differentiation", "Spindle, chondroid or osseous components may occur", "Conventional invasive carcinoma may coexist"],
      ["State the metaplastic subtype and report standard breast carcinoma parameters."],
      "Recognize the epithelial malignancy even when spindle or matrix-producing areas dominate.",
      "Exclude a primary sarcoma and a malignant phyllodes tumour with adequate sampling."
    ),
    "breast-adh": d(
      ["Monomorphic intraductal proliferation", "Architectural features resemble low-grade DCIS", "Extent is quantitatively limited"],
      ["Report ADH on core biopsy and correlate with imaging because adjacent DCIS may be under-sampled."],
      "ADH has the quality of low-grade DCIS but not the required extent.",
      "Limited sampling is the central pitfall on core biopsy."
    ),
    "breast-radial-scar": d(
      ["Central fibroelastotic core with radiating distorted glands", "Entrapped glands retain myoepithelial cells", "Associated proliferative or atypical lesions may occur"],
      ["Correlate with imaging and report any associated atypia or malignancy."],
      "Radiating glands around a scar-like centre can look infiltrative while retaining myoepithelial cells.",
      "Do not miss a small invasive carcinoma at the edge of the lesion."
    ),

    "hpb-hcc": d(
      ["Trabecular, pseudoglandular or solid growth", "Unpaired arteries and loss of normal portal tracts", "Bile production and endothelial wrapping may support hepatocellular differentiation"],
      ["Report size, differentiation, vascular invasion, satellite nodules, margins and background liver disease."],
      "A hepatocellular growth pattern with unpaired arteries and vascular invasion supports HCC.",
      "Distinguish well-differentiated HCC from hepatocellular adenoma and regenerative nodules."
    ),
    "hpb-ipmn": d(
      ["Mucin-producing papillary epithelium within dilated pancreatic ducts", "Gastric, intestinal or pancreatobiliary differentiation may be present", "Grade dysplasia and search for an associated invasive carcinoma"],
      ["Report duct involvement, epithelial subtype when relevant, dysplasia grade and any associated invasive carcinoma."],
      "IPMN is an intraductal mucinous papillary neoplasm whose grade and invasion determine risk.",
      "Do not call invasion unless neoplastic glands extend destructively beyond the duct."
    ),
    "hpb-shock-liver": d(
      ["Centrilobular hepatocyte necrosis", "Sinusoidal congestion and haemorrhage", "Periportal hepatocytes are relatively preserved early"],
      ["Describe the zonal injury and correlate with hypotension, hypoxia, drug exposure and laboratory findings."],
      "Zone 3 necrosis is the classic pattern of hypoxic-ischaemic liver injury.",
      "Drug injury and venous outflow obstruction can produce a similar centrilobular pattern."
    ),
    "hpb-cholangiocarcinoma": d(
      ["Infiltrative malignant glands in dense desmoplastic stroma", "Cuboidal or columnar cells may contain mucin", "Perineural and vascular invasion are common"],
      ["Report site, size, growth pattern, grade, invasion, margins and nodes using the site-specific protocol."],
      "Desmoplastic infiltrative glands within liver support intrahepatic cholangiocarcinoma after excluding metastasis.",
      "Metastatic pancreatobiliary or gastrointestinal adenocarcinoma may be morphologically indistinguishable."
    ),
    "hpb-pdac": d(
      ["Haphazard infiltrative glands in desmoplastic pancreatic stroma", "Marked variation in gland size and contour", "Perineural and vascular invasion are frequent"],
      ["Report size, grade, local extension, margins, nodes, LVI and PNI according to protocol."],
      "Irregular glands embedded in desmoplasia and tracking along nerves are highly characteristic.",
      "Reactive ducts in chronic pancreatitis can mimic well-differentiated adenocarcinoma."
    ),
    "hpb-cirrhosis": d(
      ["Regenerative nodules surrounded by bridging fibrous septa", "Distortion of normal vascular and lobular architecture", "Variable inflammation, steatosis or cholestasis reflects aetiology"],
      ["Describe cirrhosis and any aetiologic clues and carefully evaluate all nodules for malignancy."],
      "Diffuse nodularity plus bridging fibrosis defines cirrhosis.",
      "A limited biopsy may not show the full architectural distortion."
    ),
    "hpb-hepatocellular-adenoma": d(
      ["Bland hepatocellular plates without normal portal tracts", "Unpaired arteries and sinusoidal dilatation", "Steatosis, inflammation or beta-catenin pathway changes vary by subtype"],
      ["Classify subtype when supported and report size, haemorrhage, necrosis and atypical features."],
      "A benign hepatocellular nodule lacking true portal tracts suggests hepatocellular adenoma.",
      "Distinguish from focal nodular hyperplasia and well-differentiated HCC using architecture, reticulin and a focused panel."
    ),
    "hpb-fnh": d(
      ["Nodular hepatocellular hyperplasia around a central stellate scar", "Fibrous septa contain ductular reaction and abnormal vessels", "Hepatocytes are cytologically bland"],
      ["Correlate morphology and map-like glutamine synthetase staining with imaging."],
      "A central scar, ductular reaction and map-like GS pattern support FNH.",
      "Small biopsies may be difficult to separate from hepatocellular adenoma."
    ),

    "cervix-hsil": d(
      ["Immature atypical squamous cells extend through most or all epithelial thickness", "High nuclear-to-cytoplasmic ratio and mitoses above the basal layers", "The basement membrane remains intact"],
      ["Report HSIL and assess gland involvement, margins and any evidence of invasion."],
      "Full-thickness squamous atypia without stromal invasion is HSIL.",
      "Tangential sections and immature metaplasia can mimic high-grade disease."
    ),
    "cervix-scc": d(
      ["Invasive nests, cords or single malignant squamous cells in cervical stroma", "Desmoplastic or inflammatory stromal response", "Keratinizing and non-keratinizing patterns may occur"],
      ["Report tumour dimensions, depth, LVSI, margins and nodal findings using the cervical protocol."],
      "Stromal invasion converts an intraepithelial squamous lesion into carcinoma.",
      "Distinguish true invasion from gland involvement and tangentially sectioned HSIL."
    ),
    "endometrium-endometrioid": d(
      ["Crowded endometrioid glands with reduced intervening stroma", "Squamous differentiation may occur", "Grade and invasion pattern must be assessed"],
      ["Report histotype, grade, myometrial invasion, LVSI, cervical/adnexal involvement, nodes and molecular class when available."],
      "Confluent endometrioid glands and destructive myometrial invasion are the central findings.",
      "EIN and complex benign glandular patterns can mimic low-grade carcinoma."
    ),
    "ovary-krukenberg": d(
      ["Signet-ring cells infiltrate ovarian stroma", "Stroma may be cellular or oedematous", "Bilateral involvement supports metastasis"],
      ["Document metastatic signet-ring carcinoma and investigate the gastrointestinal primary site."],
      "Signet-ring cells in the ovary should be considered metastatic until proven otherwise.",
      "A primary ovarian mucinous tumour must be separated using distribution, morphology and clinical findings."
    ),
    "gyn-ovarian-serous": d(
      ["Complex papillary, slit-like or solid architecture", "Marked nuclear atypia and brisk mitotic activity", "Abnormal p53 expression and WT1 positivity support the diagnosis"],
      ["Report site assignment, tumour spread, response score when applicable and stage-related findings."],
      "Severe atypia with complex serous architecture strongly supports high-grade serous carcinoma.",
      "Exclude metastatic serous carcinoma and consider the tubo-ovarian primary-site assignment criteria."
    ),
    "gyn-leiomyoma": d(
      ["Intersecting fascicles of uniform smooth-muscle cells", "Cigar-shaped nuclei and eosinophilic cytoplasm", "No coagulative tumour-cell necrosis and low mitotic activity"],
      ["Document variant morphology and any atypia, necrosis or increased mitotic activity."],
      "Bland fascicles without coagulative tumour-cell necrosis support leiomyoma.",
      "Hydropic change and infarct-type necrosis should not be mistaken for sarcomatous features."
    ),
    "gyn-leiomyosarcoma": d(
      ["Significant cytologic atypia", "Coagulative tumour-cell necrosis", "High mitotic activity; diagnostic combinations depend on tumour context"],
      ["Report size, atypia, mitotic count, necrosis, margins and extrauterine spread."],
      "Atypia, tumour-cell necrosis and mitotic activity form the diagnostic triad.",
      "Distinguish true coagulative tumour-cell necrosis from infarct-type necrosis in leiomyoma."
    ),
    "gyn-endometrial-serous": d(
      ["Papillary, glandular or solid high-grade architecture", "Marked nuclear pleomorphism, prominent nucleoli and brisk mitoses", "Aberrant p53 expression is typical"],
      ["Report histotype, myometrial invasion, LVSI, extrauterine spread, nodes and molecular findings."],
      "High-grade nuclei with serous architecture and abnormal p53 support serous carcinoma.",
      "High-grade endometrioid carcinoma and metastatic tubo-ovarian serous carcinoma are important mimics."
    ),
    "gyn-ein": d(
      ["Crowded glands with reduced intervening stroma", "Cytology differs from the background endometrium", "No destructive stromal invasion"],
      ["Report EIN/atypical hyperplasia and search for concurrent carcinoma in an adequate specimen."],
      "EIN requires gland crowding plus cytologic demarcation from the background.",
      "Polyps, secretory change and disordered proliferative endometrium may mimic EIN."
    ),
    "gyn-cervix-adenocarcinoma": d(
      ["Malignant endocervical glands with pseudostratified nuclei", "Apoptotic bodies and mitoses are conspicuous", "Block-type p16 expression supports HPV association"],
      ["Report size, depth, LVSI, margins and stage-related parameters."],
      "Apoptosis, mitoses and block-type p16 in malignant endocervical glands support an HPV-associated tumour.",
      "Distinguish from endometrial carcinoma extending into the cervix and from HPV-independent cervical adenocarcinoma."
    ),
    "gyn-ovary-mucinous": d(
      ["Mucinous gastrointestinal-type epithelium with stratification and proliferation", "Papillary or complex glands without destructive stromal invasion", "Extensive sampling is required"],
      ["Report size, laterality, sampling extent and absence of destructive invasion; assess for a gastrointestinal metastasis."],
      "Mucinous borderline tumour shows epithelial proliferation without destructive stromal invasion.",
      "Under-sampling may miss invasive carcinoma, and metastases may closely mimic a primary ovarian tumour."
    ),
    "gyn-mature-teratoma": d(
      ["Mature tissues derived from one or more germ layers", "Skin, adnexa, neural tissue, cartilage and respiratory or gastrointestinal epithelium may occur", "No immature neuroepithelium in a mature teratoma"],
      ["Document the tissue components and any immature or malignant transformation."],
      "A mixture of mature somatic tissues is the defining pattern.",
      "Sample solid or suspicious areas thoroughly to exclude immature elements or malignant transformation."
    ),

    "prostate-adeno": d(
      ["Infiltrative small glands lacking a basal-cell layer", "Nuclear enlargement and prominent nucleoli", "Perineural invasion and other malignant patterns may support the diagnosis"],
      ["Report Gleason patterns, Grade Group, tumour extent, perineural invasion and required specimen-specific parameters."],
      "Infiltrative glands without basal cells form the basis of prostatic acinar adenocarcinoma diagnosis.",
      "Benign mimics require attention to architecture, cytology and a properly interpreted basal-cell/AMACR panel."
    ),
    "kidney-clear-cell": d(
      ["Nests and acini of cells with clear or eosinophilic cytoplasm", "Delicate branching vasculature", "WHO/ISUP grade is based on nucleolar prominence and extreme anaplasia"],
      ["Report size, grade, necrosis, renal sinus/vein invasion, margins and stage."],
      "Clear cells in a rich delicate vascular network are characteristic.",
      "Separate from clear-cell papillary renal tumour and other clear-cell neoplasms using morphology and a focused panel."
    ),
    "kidney-papillary1": d(
      ["Papillary or tubulopapillary architecture", "Fibrovascular cores often contain foamy macrophages", "Tumour cells may be basophilic or eosinophilic"],
      ["Use the current WHO entity name and report size, grade, necrosis, invasion and stage."],
      "True papillae with foamy macrophages support papillary renal cell carcinoma.",
      "The former type 1/type 2 split is not a complete current WHO classification; exclude molecularly defined mimics."
    ),
    "gu-urothelial-low": d(
      ["Delicate branching papillae with fibrovascular cores", "Orderly urothelium with mild atypia", "Polarity is largely preserved"],
      ["Report low grade, invasion status, muscularis propria presence and specimen adequacy."],
      "Orderly papillae with mild atypia favour low-grade papillary urothelial carcinoma.",
      "Do not infer invasion from tangentially sectioned or cauterized papillae."
    ),
    "gu-urothelial-high": d(
      ["Marked loss of polarity and nuclear pleomorphism", "Frequent mitoses at multiple epithelial levels", "Search carefully for lamina propria and muscularis propria invasion"],
      ["Report grade, invasion depth, muscularis propria status, LVI and variant morphology."],
      "In high-grade urothelial carcinoma, the decisive next question is whether muscularis propria is invaded.",
      "Fragmented TUR specimens and cautery may make true muscle invasion difficult to assess."
    ),
    "kidney-chromophobe": d(
      ["Large polygonal cells with prominent cell borders", "Pale reticulated or eosinophilic cytoplasm", "Irregular raisinoid nuclei with perinuclear halos"],
      ["Report size, necrosis, sarcomatoid change, invasion, margins and stage."],
      "Plant-like cell borders, perinuclear halos and raisinoid nuclei form the classic pattern.",
      "Oncocytoma and eosinophilic renal tumours can overlap and require integrated assessment."
    ),
    "gu-bph": d(
      ["Nodular glandular and stromal hyperplasia", "Benign glands retain inner secretory and outer basal cells", "Corpora amylacea may be present"],
      ["Describe BPH and separately report any incidental carcinoma or other significant lesion."],
      "BPH forms nodules and retains the basal-cell layer.",
      "Small crowded benign glands can mimic carcinoma, particularly in limited or cauterized tissue."
    ),
    "gu-hgpin": d(
      ["Pre-existing large glands lined by cytologically atypical secretory cells", "Prominent nucleoli", "Basal cells remain but may be discontinuous"],
      ["Report HGPIN according to specimen type and do not diagnose invasive carcinoma without infiltrative architecture."],
      "HGPIN has carcinoma-like cytology within a pre-existing gland that retains basal cells.",
      "Distinguish HGPIN from intraductal carcinoma and small acinar adenocarcinoma."
    ),
    "gu-seminoma": d(
      ["Sheets or nests of uniform large germ cells", "Clear glycogen-rich cytoplasm and central nuclei", "Fibrous septa contain lymphocytes"],
      ["Report tumour size, rete/hilar structures, lymphovascular invasion, margins and stage-related findings."],
      "Clear uniform cells separated by lymphocyte-rich septa are classic for seminoma.",
      "Embryonal carcinoma, lymphoma and solid yolk sac tumour are major mimics."
    ),

    "skin-bcc": d(
      ["Basaloid nests connected to or near the epidermis", "Peripheral palisading", "Retraction clefts between tumour and mucinous stroma"],
      ["Report subtype, depth or high-risk features, perineural invasion and margins when required."],
      "Palisading basaloid nests with stromal retraction are the classic pattern.",
      "Trichoblastoma and other follicular tumours can closely mimic BCC."
    ),
    "skin-scc": d(
      ["Invasive nests and cords of atypical keratinocytes", "Keratin pearls and intercellular bridges may be present", "Assess depth, differentiation and perineural invasion"],
      ["Report tumour thickness/depth, differentiation, perineural or lymphovascular invasion and margins."],
      "Invasive atypical keratinocytes with squamous maturation establish cutaneous SCC.",
      "Pseudoepitheliomatous hyperplasia may mimic a well-differentiated SCC."
    ),
    "skin-melanoma": d(
      ["Atypical melanocytes show pagetoid spread and/or confluent junctional growth", "Dermal invasion is measured as Breslow thickness", "Ulceration and mitotic activity affect reporting"],
      ["Report Breslow thickness, ulceration, mitoses where required, margins, microsatellites and nodal findings."],
      "Asymmetry, poor circumscription and disordered melanocytic maturation are central clues.",
      "Spitz, blue and dysplastic naevi may mimic melanoma; integrate architecture and cytology."
    ),
    "skin-actinic-keratosis": d(
      ["Atypia of basal epidermal keratinocytes", "Parakeratosis and solar elastosis", "Adnexal ostia may show relative sparing"],
      ["Report actinic keratosis and note full-thickness atypia or invasion if present."],
      "Basal keratinocyte atypia on sun-damaged skin is the key pattern.",
      "Exclude squamous cell carcinoma in situ when atypia is full thickness."
    ),
    "skin-sebk": d(
      ["Acanthotic proliferation of basaloid keratinocytes", "Horn cysts and pseudohorn cysts", "Sharp circumscription from adjacent epidermis"],
      ["Report seborrhoeic keratosis and document irritation or atypical features if present."],
      "A sharply circumscribed basaloid lesion with horn cysts is typical.",
      "Irritated lesions may mimic squamous neoplasia."
    ),
    "skin-nevus": d(
      ["Symmetric and well-circumscribed melanocytic proliferation", "Orderly maturation with dermal descent", "No destructive growth or significant pagetoid spread"],
      ["Classify the naevus when possible and report margins only when clinically relevant."],
      "Symmetry, circumscription and maturation favour a benign melanocytic naevus.",
      "Special-site and traumatized naevi can show alarming atypia."
    ),
    "skin-dermatofibroma": d(
      ["Bland spindle-cell proliferation in the dermis", "Storiform growth and collagen entrapment at the periphery", "Epidermal hyperplasia and basal pigmentation may overlie the lesion"],
      ["Report variant features and margin status when clinically relevant."],
      "Peripheral collagen entrapment and overlying epidermal hyperplasia strongly support dermatofibroma.",
      "Dermatofibrosarcoma protuberans is typically more infiltrative and diffusely CD34 positive."
    ),

    "heme-follicular": d(
      ["Effacement by crowded, back-to-back neoplastic follicles", "Follicles lack polarization and tingible-body macrophages", "Centrocytes predominate with variable centroblasts"],
      ["Integrate architecture, cytology, flow cytometry, immunophenotype and genetics; grade according to current criteria."],
      "Monotonous unpolarized follicles without tingible-body macrophages suggest follicular lymphoma.",
      "Reactive follicular hyperplasia can mimic lymphoma; architecture and the full immunophenotype are essential."
    ),
    "heme-hodgkin": d(
      ["Scattered Hodgkin/Reed-Sternberg cells", "Mixed inflammatory background", "Tumour cells usually express CD30 with characteristic variable expression of other markers"],
      ["Classify the subtype using morphology and immunophenotype and assess EBV when appropriate."],
      "Rare diagnostic large cells in the correct inflammatory background are more important than their absolute number.",
      "EBV-positive large B-cell proliferations and other CD30-positive lymphomas may mimic classic Hodgkin lymphoma."
    ),
    "heme-dlbcl": d(
      ["Diffuse growth of large atypical lymphoid cells", "Nuclei are at least twice the size of small lymphocytes", "Brisk mitoses and apoptosis are common"],
      ["Integrate morphology, lineage, cell-of-origin panel, MYC/BCL2 expression and required genetic studies."],
      "A diffuse sheet of large B cells defines the basic morphologic pattern.",
      "Exclude other large B-cell lymphoma entities before using the NOS category."
    ),
    "heme-cll-sll": d(
      ["Small mature lymphocytes with clumped chromatin", "Paler proliferation centres", "Prolymphocytes and paraimmunoblasts concentrate in proliferation centres"],
      ["Correlate tissue morphology with blood counts, flow cytometry and clinical distribution."],
      "Small lymphocytes plus proliferation centres are characteristic of SLL/CLL.",
      "Mantle cell lymphoma and other small B-cell lymphomas must be excluded."
    ),
    "heme-mantle-cell": d(
      ["Monomorphic small to medium lymphoid cells", "Mantle-zone, nodular or diffuse architecture", "Cyclin D1 and/or SOX11 with CCND-family alteration supports the diagnosis"],
      ["Document morphology, Ki-67 proliferation index and relevant immunophenotypic/genetic findings."],
      "A monotonous small B-cell lymphoma with cyclin D1 expression strongly suggests mantle cell lymphoma.",
      "Cyclin D1-negative mantle cell lymphoma and cyclin D1-positive mimics require genetic and phenotypic correlation."
    ),
    "heme-marginal-zone": d(
      ["Heterogeneous small B cells expand marginal zones", "Monocytoid cells and plasmacytic differentiation may occur", "Reactive follicles may be colonized"],
      ["Assign nodal, extranodal or splenic category using site, morphology, phenotype and clinical findings."],
      "Marginal-zone expansion with heterogeneous small B cells is the practical pattern.",
      "Other small B-cell lymphomas and reactive hyperplasia must be excluded with an integrated work-up."
    ),

    "cns-meningioma": d(
      ["Syncytial meningothelial cells form whorls", "Intranuclear pseudoinclusions may be present", "Psammoma bodies are common in some variants"],
      ["Report WHO type and grade and specifically assess mitoses, brain invasion and grade-defining features."],
      "Whorls and psammoma bodies are classic, but grading requires a broader checklist.",
      "Do not grade from a single feature without applying current CNS WHO criteria."
    ),
    "cns-glioblastoma": d(
      ["Diffuse infiltrating astrocytic glioma", "Microvascular proliferation and/or palisading necrosis", "Diagnosis of IDH-wildtype glioblastoma integrates molecular criteria"],
      ["Report integrated diagnosis, CNS WHO grade and required molecular findings."],
      "Necrosis and microvascular proliferation are classic high-grade features in the proper molecular context.",
      "Treatment effect and metastatic carcinoma can mimic necrosis-rich glioblastoma."
    ),
    "cns-schwannoma": d(
      ["Alternating Antoni A and Antoni B areas", "Nuclear palisading and Verocay bodies", "Hyalinized vessels and degenerative change may occur"],
      ["Report schwannoma and document atypical or malignant features when present."],
      "Antoni A/B zonation and Verocay bodies are the signature pattern.",
      "Cellular schwannoma may mimic a malignant peripheral nerve sheath tumour."
    ),

    "headneck-oral-scc": d(
      ["Invasive nests and cords of malignant squamous cells", "Keratinization and intercellular bridges may occur", "Assess depth of invasion and perineural/lymphovascular invasion"],
      ["Report site, size, depth of invasion, grade, margins, PNI/LVI and nodes using the oral cavity protocol."],
      "Depth of invasion is a major reporting parameter in oral cavity SCC.",
      "Pseudoepitheliomatous hyperplasia and verrucous lesions may be difficult on superficial biopsy."
    ),
    "headneck-pleomorphic": d(
      ["Biphasic epithelial and myoepithelial proliferation", "Chondromyxoid or hyalinized stroma", "Architecture is variable but cytology is usually bland"],
      ["Report pleomorphic adenoma and document capsule status, margins and any malignant transformation."],
      "Epithelial and myoepithelial elements in chondromyxoid stroma form the classic mixed pattern.",
      "Limited biopsy may miss carcinoma ex pleomorphic adenoma."
    ),
    "headneck-warthin": d(
      ["Papillary cystic architecture", "Bilayered oncocytic epithelium", "Dense lymphoid stroma with germinal centres"],
      ["Report Warthin tumour and document infarction, metaplasia or unusual atypia if present."],
      "Oncocytic bilayered epithelium over lymphoid stroma is diagnostic.",
      "Infarcted or metaplastic Warthin tumour may mimic squamous malignancy."
    ),
    "headneck-nasopharyngeal": d(
      ["Syncytial nests of non-keratinizing malignant epithelial cells", "Prominent lymphoplasmacytic infiltrate", "EBER positivity supports EBV association in the appropriate subtype and setting"],
      ["Report histologic type, EBV testing and required staging parameters."],
      "A syncytial non-keratinizing carcinoma in lymphoid stroma is the classic pattern.",
      "Lymphoma and metastatic carcinoma are key mimics."
    ),

    "soft-neurofibroma": d(
      ["Bland spindle cells with wavy nuclei", "Shredded-carrot collagen in a variably myxoid background", "Mast cells are often present"],
      ["Report type and assess atypia, cellularity, mitotic activity and necrosis when concerning."],
      "Wavy nuclei in a loose collagenous or myxoid stroma favour neurofibroma.",
      "Marked atypia, necrosis or increased mitoses raise concern for malignant transformation."
    ),
    "soft-gist": d(
      ["Spindle, epithelioid or mixed tumour cells", "Fascicular, whorled or nested architecture", "Risk assessment requires site, size and mitotic rate"],
      ["Report site, size, histologic type, mitotic rate, necrosis, rupture and margins; use DOG1/CD117 appropriately."],
      "For GIST, site, size and mitotic rate drive risk assessment.",
      "Smooth-muscle tumours, schwannoma and other spindle-cell neoplasms require exclusion."
    ),
    "soft-lipoma": d(
      ["Lobules of mature adipocytes", "Minimal variation in adipocyte size", "No atypical stromal cells or lipoblast-driven atypia"],
      ["Report lipoma and investigate atypical or deep large lesions for an alternative diagnosis."],
      "Uniform mature fat without atypical stromal cells supports lipoma.",
      "Atypical lipomatous tumour may be under-sampled in a small biopsy."
    ),

    "inflammation-granuloma": d(
      ["Aggregates of epithelioid histiocytes", "Multinucleated giant cells may be present", "Necrosis may be absent or present depending on cause"],
      ["Describe granuloma type and select organism stains, cultures or molecular tests according to the clinical setting."],
      "Granulomatous inflammation is a reaction pattern, not an aetiologic diagnosis.",
      "A negative special stain does not by itself exclude infection."
    ),
    "infection-tb": d(
      ["Necrotizing epithelioid granulomas", "Caseous-type central necrosis", "Langhans-type giant cells may occur"],
      ["Perform acid-fast studies and pursue culture or molecular testing when tuberculosis is clinically suspected."],
      "Caseating granulomas raise tuberculosis, but the organism should be demonstrated whenever possible.",
      "Fungal infection can produce an identical necrotizing granulomatous pattern."
    ),
    "infection-fungal-granuloma": d(
      ["Necrotizing or non-necrotizing granulomas", "Yeast or hyphal forms may be visible on H&E", "GMS and PAS improve organism detection"],
      ["Describe organism morphology and correlate special stains with culture, antigen testing or PCR."],
      "Granulomas require a fungal search as well as an acid-fast search when clinically appropriate.",
      "Morphology alone may not reliably identify the fungal species."
    ),
  };
}());
