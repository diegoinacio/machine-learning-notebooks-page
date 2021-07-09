const path = require("path");
const fs = require("fs");

const PAGES_PATH = path.join(__dirname, "../pages/");

function get_notebooks() {
  let NOTEBOOKS = new Array();
  // ! Read all files in pages/
  const FILES = fs.readdirSync(PAGES_PATH);
  for (file of FILES) {
    let match = file.match(/(.*\.html)/i);
    if (match) {
      let notebook = file.split(".")[0];
      NOTEBOOKS.push(notebook);
    }
  }
  return NOTEBOOKS;
}

function filter_notebooks(answers, NOTEBOOKS) {
  // ! Filter notebook list based on the flag --all
  const all = answers.notebooks.includes("--all");
  return all
    ? NOTEBOOKS.filter((e) => e !== "--all" && !answers.notebooks.includes(e))
    : answers.notebooks;
}

module.exports = { get_notebooks, filter_notebooks };
