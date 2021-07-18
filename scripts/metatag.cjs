// ! Requires
const path = require("path");
const fs = require("fs");
const chalk = require("chalk");

// ! Imports
const utils = require("./utils.cjs");

// ! Get pages directory
const PAGES_PATH = path.join(__dirname, "../pages/");

function execute_action(answers, NOTEBOOKS, options = {}) {
  // ! Include or remove all meta tags
  const _NOTEBOOKS = utils.filter_notebooks(answers, NOTEBOOKS);
  // * Foreach notebook do ..
  _NOTEBOOKS.forEach((notebook) => {
    const data = NOTEBOOKS[notebook];
    // * Read html file
    let file = path.join(PAGES_PATH, `${notebook}.html`);
    let content = fs.readFileSync(file, "utf8");
    ({ HTML, DOM, window, document } = utils.HTMLtoDOM(content));
    ({ metaData, metaHTML } = utils.scrap_meta(document));

    let head = document.querySelector("head");

    // * Remove comments "custom meta tags"
    utils.remove_all_comments(head, /^\/?! custom meta tags$/);

    // * Remove all favicon
    head.querySelectorAll("link[href*=favicon]").forEach((e) => e.remove());

    // * Remove all titles
    head.querySelectorAll("title").forEach((e) => e.remove());

    // * Remove all meta tags from metaData
    for (meta of metaData) {
      head.removeChild(meta);
    }

    let tags;
    if (answers.action === "Include") {
      // * Includes
      tags = utils.generate_tags(notebook, data);
      tags.splice(0, 0, "<!-- ! custom meta tags -->");
      tags.push("<!-- /! custom meta tags -->");
    } else {
      // * Removes
      tags = [
        "<!-- ! custom meta tags -->",
        `<link rel="shortcut icon" href="../favicon.ico" type="image/x-icon" />`,
        `<title>${data.title} | ${data.section}</title>`,
        "<!-- /! custom meta tags -->",
      ];
    }

    let joined_tags = tags.join(" ");
    let elements = document.createRange().createContextualFragment(joined_tags);
    head.insertBefore(elements, head.childNodes[0]);

    utils.write_file(file, document, notebook, options);
  });
}

function show_action(answers, NOTEBOOKS) {
  // ! Show all meta tags
  // ! If color is green, the meta tag already exists on the page
  // ! If color is red, the meta tag does note exist yet
  const _NOTEBOOKS = utils.filter_notebooks(answers, NOTEBOOKS);
  // * Foreach notebook do ..
  _NOTEBOOKS.forEach((notebook) => {
    const data = NOTEBOOKS[notebook];
    // * Read html file
    let file = path.join(PAGES_PATH, `${notebook}.html`);
    let content = fs.readFileSync(file, "utf8");
    ({ HTML, DOM, window, document } = utils.HTMLtoDOM(content));
    ({ metaData, metaHTML } = utils.scrap_meta(document));

    // * Show the current notebook
    console.log(chalk.bold.blue(`# ${data.title}`));
    for (meta of utils.generate_tags(notebook, bodyData)) {
      let color = metaHTML.includes(meta) ? chalk.bold.green : chalk.bold.red;
      console.log(color(meta));
    }
    console.log(); // ? skip a line
  });
}

function metatag_option(answers, NOTEBOOKS, options = {}) {
  if (answers.action === "Show") {
    show_action(answers, NOTEBOOKS);
  } else {
    execute_action(answers, NOTEBOOKS, options);
  }
}

module.exports = { metatag_option };
