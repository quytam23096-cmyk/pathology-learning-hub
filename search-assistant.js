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

  const morphologyClues = [
    {
      id: "glandular",
      label: "Tạo tuyến / lòng tuyến",
      patterns: ["glandular"],
      terms: ["tao tuyen", "long tuyen", "acinar", "gland formation", "adenocarcinoma"],
    },
    {
      id: "squamous",
      label: "Sừng hóa / cầu nối gian bào",
      patterns: ["squamous"],
      terms: ["sung hoa", "cau sung", "cau noi gian bao", "keratin", "squamous"],
    },
    {
      id: "small-cell",
      label: "Tế bào nhỏ / khuôn nhân",
      patterns: [],
      terms: ["te bao nho", "khuon nhan", "nuclear molding", "crush artifact", "small cell"],
    },
    {
      id: "neuroendocrine",
      label: "Nhiễm sắc chất muối tiêu",
      patterns: ["neuroendocrine"],
      terms: ["muoi tieu", "salt and pepper", "neuroendocrine", "chromogranin", "synaptophysin", "insm1"],
    },
    {
      id: "papillary",
      label: "Cấu trúc nhú",
      patterns: [],
      terms: ["cau truc nhu", "nhu phan nhanh", "papillary", "fibrovascular core", "truc mach"],
    },
    {
      id: "mucinous",
      label: "Chất nhầy / hồ nhầy",
      patterns: [],
      terms: ["chat nhay", "ho nhay", "mucin", "mucinous", "te bao nhan"],
    },
    {
      id: "discohesive",
      label: "Tế bào rời / xếp hàng một",
      patterns: [],
      terms: ["te bao roi", "xep hang mot", "single file", "discohesive", "e-cadherin mat"],
    },
    {
      id: "spindle",
      label: "Tế bào hình thoi",
      patterns: ["spindle"],
      terms: ["te bao hinh thoi", "spindle", "bop dai", "fascicle"],
    },
    {
      id: "clear-cell",
      label: "Bào tương sáng",
      patterns: [],
      terms: ["bao tuong sang", "te bao sang", "clear cell", "clear-cell"],
    },
    {
      id: "lymphoid",
      label: "Tăng sinh dòng lympho",
      patterns: ["lymphoid"],
      terms: ["dong lympho", "lympho", "lymphoid", "lymphoma", "xoa kien truc hach"],
    },
    {
      id: "inflammation",
      label: "Viêm / tế bào khổng lồ",
      patterns: ["inflammation"],
      terms: ["viem", "te bao khong lo", "granuloma", "dai thuc bao", "inflammation"],
    },
    {
      id: "high-grade",
      label: "Hoại tử / nhiều phân bào",
      patterns: [],
      terms: ["hoai tu", "nhieu phan bao", "phan bao cao", "high grade", "mitotic", "necrosis"],
    },
  ];

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

  function buildIndex(item, chapterName) {
    const names = flatten([item.diagnosis, item.english, item.whoTerms, item.searchTerms]);
    const organ = flatten(chapterName);
    const patterns = flatten(item.pattern);
    const markers = flatten(item.markers);
    const features = flatten([item.micro, item.report, item.memory, item.pitfall]);
    return {
      names,
      organ,
      patterns,
      markers,
      features,
      all: [...names, ...organ, ...patterns, ...markers, ...features],
    };
  }

  function inferredConcepts(query) {
    const normalizedQuery = normalize(query);
    if (!normalizedQuery) return [];
    return semanticConcepts.filter((concept) => (
      concept.triggers.some((trigger) => normalizedQuery.includes(normalize(trigger)))
    ));
  }

  function conceptMatches(index, concept) {
    const patternMatch = concept.patterns?.some((pattern) => index.patterns.includes(normalize(pattern)));
    return Boolean(patternMatch || includesAny(index.all, concept.terms || []));
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
    const query = normalize(options.query);
    const tokens = meaningfulTokens(query);
    const concepts = inferredConcepts(query);
    const clueIds = Array.isArray(options.clueIds) ? options.clueIds : [];
    const selectedClues = clueIds
      .map((id) => morphologyClues.find((clue) => clue.id === id))
      .filter(Boolean);
    const markerTokens = meaningfulTokens(options.marker);
    const organ = options.organ || "all";
    const chapterNameFor = options.chapterNameFor || (() => "");
    const recognizedOrganTokens = tokens.filter((token) => items.some((item) => (
      flatten(chapterNameFor(item.chapter)).some((field) => hasToken(field, token))
    )));

    return items.map((item, order) => {
      if (organ !== "all" && item.chapter !== organ) return null;
      const index = buildIndex(item, chapterNameFor(item.chapter));
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

        if (concepts.length && !conceptHits.length && matchedRatio < 1) return null;
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
      if (selectedClues.length && clueMatches === 0) return null;

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
    normalize,
    rankCases,
  };
}());
