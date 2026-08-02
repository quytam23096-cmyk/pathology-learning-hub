const fs = require("fs");
const vm = require("vm");

const files = [
  "app.js",
  "index.html",
  "atlas-curation.js",
  "atlas-expansion.js",
  "interface-demos.js",
  "who-diagnosis-links.js",
];
const source = files.map((file) => fs.readFileSync(file, "utf8")).join("\n");
const failures = [];

if (/google\.com\/cse|cse\.google|pathologyOutlinesSearchUrl|PO_SEARCH/.test(source)) {
  failures.push("Indirect Google/PathologyOutlines search link remains in source");
}
if (/webpathology\.com\/search-result\?query=/.test(source)) {
  failures.push("Indirect WebPathology search-result link remains in source");
}

const context = { window: {} };
vm.createContext(context);
for (const file of ["atlas-curation.js", "atlas-expansion.js"]) {
  vm.runInContext(fs.readFileSync(file, "utf8"), context, { filename: file });
}

const topicLinks = context.window.ATLAS_CURATION?.topicLinks || {};
const topicEntries = Object.entries(topicLinks);
for (const [caseId, url] of topicEntries) {
  if (!/^https:\/\/www\.pathologyoutlines\.com\/topic\/[A-Za-z0-9_-]+\.html$/.test(url)) {
    failures.push(`${caseId}: PathologyOutlines URL is not a direct topic page`);
  }
}

const duplicateUrls = topicEntries
  .map(([, url]) => url.toLowerCase())
  .filter((url, index, values) => values.indexOf(url) !== index);

console.log(JSON.stringify({
  directPathologyOutlinesTopics: topicEntries.length,
  duplicateTopicUrls: [...new Set(duplicateUrls)].length,
  failures,
}, null, 2));

if (failures.length) process.exitCode = 1;
