// ! Requires
const path = require("path");
const fs = require("fs");
const chalk = require("chalk");

// ! Imports
const search = require("./search.cjs");
const utils = require("./utils.cjs");

// ! Get pages directory
const PAGES_PATH = path.join(__dirname, "../pages/");

function execute_action(answers, NOTEBOOKS, options = {}) {
  // ! Include or remove navbar
  const _NOTEBOOKS = search.filter_notebooks(answers, NOTEBOOKS);
  // * Foreach notebook do ..
  _NOTEBOOKS.forEach((notebook) => {
    let file = path.join(PAGES_PATH, `${notebook}.html`);
    let content = fs.readFileSync(file, "utf8");
    ({ HTML, DOM, window, document } = utils.HTMLtoDOM(content));

    let body = document.querySelector("body");

    // * Remove custom comments
    utils.remove_all_comments(body, /^\/?! custom navbar/);
    utils.remove_all_comments(body, /^\/?! custom footer/);
    utils.remove_all_comments(body, /^\/?! custom scripts/);

    let NAVBARS = body.querySelectorAll(".notebook-navbar");
    let FOOTERS = body.querySelectorAll(".notebook-footer");
    let SCRIPTS = body.querySelectorAll(`script[src$="template/notebook.js"]`);

    // * Remove all
    for (navbar of NAVBARS) {
      body.removeChild(navbar);
    }

    for (footer of FOOTERS) {
      body.removeChild(footer);
    }

    for (script of SCRIPTS) {
      body.removeChild(script);
    }

    if (answers.action === "Include") {
      // * Includes
      // ? Navbar
      let navbar_tags = [
        "<!-- ! custom navbar -->",
        `<div class="notebook-navbar"></div>`,
        "<!-- /! custom navbar -->",
      ];
      let joined_navbar_tags = navbar_tags.join(" ");
      let navbar_elements = document
        .createRange()
        .createContextualFragment(joined_navbar_tags);
      body.insertBefore(navbar_elements, body.childNodes[0]);
      // ? Footer
      let year_ft = new Date().getFullYear();
      let footer_tags = [
        "<!-- ! custom footer -->",
        `<footer class="notebook-footer"></footer>`,
        "<!-- /! custom footer -->",
      ];
      let joined_footer_tags = footer_tags.join(" ");
      let footer_elements = document
        .createRange()
        .createContextualFragment(joined_footer_tags);
      body.appendChild(footer_elements);
      // ? Scripts
      let scripts_tags = [
        "<!-- ! custom scripts -->",
        `<script src="../assets/template/notebook.js"></script>`,
        "<!-- /! custom scripts -->",
      ];
      let joined_scripts_tags = scripts_tags.join(" ");
      let scripts_elements = document
        .createRange()
        .createContextualFragment(joined_scripts_tags);
      body.appendChild(scripts_elements);
    }

    utils.write_file(file, document, notebook, options);
  });
}

function show_action(answers, NOTEBOOKS) {
  // ! Show if notebook has notebook-navbar div
  // ! If color is green, the div already was included
  // ! If color is red, the div does not exist yet
  const _NOTEBOOKS = search.filter_notebooks(answers, NOTEBOOKS);
  _NOTEBOOKS.forEach((notebook) => {
    // * Read html file
    let file = path.join(PAGES_PATH, `${notebook}.html`);
    let content = fs.readFileSync(file, "utf8");
    ({ HTML, DOM, window, document } = utils.HTMLtoDOM(content));

    let body = document.querySelector("body");

    // * Show the current notebook
    console.log(chalk.bold.blue(`# ${notebook}`));
    // ? Navbar
    let navbar = body.querySelector(".notebook-navbar");
    let color = navbar ? chalk.bold.green : chalk.bold.red;
    console.log(color(`<div class="notebook-navbar"></div>`));
    // ? Footer
    let footer = body.querySelector(".notebook-footer");
    color = footer ? chalk.bold.green : chalk.bold.red;
    console.log(color(`<footer class="notebook-footer"></footer>`));
    // ? Scripts
    let SCRIPTS = body.querySelectorAll(":scope script");
    color = utils.check_imported_scripts(SCRIPTS)
      ? chalk.bold.green
      : chalk.bold.red;
    console.log(
      color(`<script src="../assets/template/notebook.js"></script>`)
    );

    console.log(); // ? skip a line
  });
}

function template_option(answers, NOTEBOOKS, options = {}) {
  if (answers.action === "Show") {
    show_action(answers, NOTEBOOKS);
  } else {
    execute_action(answers, NOTEBOOKS, options);
  }
}

module.exports = { template_option };
