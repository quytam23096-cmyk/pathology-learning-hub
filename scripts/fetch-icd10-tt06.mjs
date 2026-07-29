import { writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const API_BASE = "https://ccs.whiteneuron.com/api/ICD10_TT06";
const SOURCE_URL = "https://icd.kcb.vn/icd-10-tt06/icd10-tt06";
const OUTPUT_FILE = resolve(dirname(fileURLToPath(import.meta.url)), "..", "icd10-tt06-data.js");
const TARGET_CHAPTERS = new Set(["II"]);
const MAX_CONCURRENCY = 8;

async function getJson(url, attempt = 1) {
  const response = await fetch(url, {
    headers: {
      Accept: "application/json",
      Origin: "https://icd.kcb.vn",
      Referer: "https://icd.kcb.vn/",
    },
  });
  if (!response.ok) {
    if (attempt < 4) {
      await new Promise((resolveDelay) => setTimeout(resolveDelay, attempt * 400));
      return getJson(url, attempt + 1);
    }
    throw new Error(`${response.status} ${response.statusText}: ${url}`);
  }
  return response.json();
}

function compactNode(node, parent = null) {
  return {
    code: String(node.data?.code || node.id || "").trim(),
    name: String(node.data?.name || "").trim(),
    model: String(node.model || "").trim(),
    id: String(node.id || node.data?.id || "").trim(),
    parentCode: parent?.code || "",
    parentModel: parent?.model || "",
    leaf: Boolean(node.is_leaf),
  };
}

const rootResponse = await getJson(`${API_BASE}/root?lang=vi`);
const roots = (rootResponse.data || []).filter((node) => TARGET_CHAPTERS.has(node.id));
const entries = roots.map((node) => compactNode(node));
const queue = roots.map((node) => ({ node, parent: null }));
const seen = new Set(entries.map((entry) => `${entry.model}:${entry.id}`));

async function processNode(task) {
  const { node } = task;
  if (node.is_leaf) return [];
  const url = `${API_BASE}/childs/${encodeURIComponent(node.model)}?id=${encodeURIComponent(node.id)}&lang=vi`;
  const response = await getJson(url);
  return (response.data || []).map((child) => ({ child, parent: compactNode(node, task.parent) }));
}

while (queue.length) {
  const batch = queue.splice(0, MAX_CONCURRENCY);
  const results = await Promise.all(batch.map(processNode));
  for (const children of results) {
    for (const { child, parent } of children) {
      const key = `${child.model}:${child.id}`;
      if (seen.has(key)) continue;
      seen.add(key);
      entries.push(compactNode(child, parent));
      if (!child.is_leaf) queue.push({ node: child, parent });
    }
  }
  if (entries.length % 100 < MAX_CONCURRENCY) process.stdout.write(`Fetched ${entries.length} ICD entries\r`);
}

entries.sort((a, b) => a.code.localeCompare(b.code, "vi", { numeric: true }) || a.model.localeCompare(b.model));
const generatedAt = new Date().toISOString();
const payload = {
  meta: {
    title: "ICD-10 theo Thông tư 06/2026/TT-BYT",
    scope: "Chương II — U tân sinh",
    source: SOURCE_URL,
    sourceApi: `${API_BASE}/`,
    generatedAt,
    entryCount: entries.length,
  },
  entries,
};
const output = `window.ICD10_TT06_DATA = ${JSON.stringify(payload)};\n`;
await writeFile(OUTPUT_FILE, output, "utf8");
console.log(`\nWrote ${entries.length} entries to ${OUTPUT_FILE}`);
