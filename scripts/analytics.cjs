// ! Requires
const path = require("path");
const fs = require("fs");
const chalk = require("chalk");

// ! Imports
const search = require("./search.cjs");
const utils = require("./utils.cjs");

// ! Get pages directory
const PAGES_PATH = path.join(__dirname, "../pages/");

// ! Google Analytics Measurement ID
const MEASUREMENT_ID = "G-W05JEEX90Q";

function execute_action(answers, NOTEBOOKS, options = {}) {
  // ! Include or remove all analytics
  const _NOTEBOOKS = search.filter_notebooks(answers, NOTEBOOKS);
  // * Foreach notebook do ..
  _NOTEBOOKS.forEach((notebook) => {
    // * Read html file
    let file = path.join(PAGES_PATH, `${notebook}.html`);
    let content = fs.readFileSync(file, "utf8");
    ({ HTML, DOM, window, document } = utils.HTMLtoDOM(content));
    ({ title, titleHTML, bodyData, metaData, metaHTML } = utils.scrap_data(
      document
    ));

    let head = document.querySelector("head");

    // * Remove comments for analytics
    utils.remove_all_comments(head, /^\/?! google analytics$/);

    // * Remove all scripts
    head
      .querySelectorAll(`script[src*=${MEASUREMENT_ID}]`)
      .forEach((e) => e.remove());
    utils.contains(head, "script", MEASUREMENT_ID).forEach((e) => e.remove());

    if (answers.action === "Include") {
      const analytics_tags = `
      <!-- ! google analytics -->
      <script async src="https://www.googletagmanager.com/gtag/js?id=${MEASUREMENT_ID}"></script>
      <script>
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', '${MEASUREMENT_ID}');
      </script>
      <!-- /! google analytics -->
      `;

      const elements = document
        .createRange()
        .createContextualFragment(analytics_tags);
      head.insertBefore(elements, head.childNodes[0]);
    }

    utils.write_file(file, document, notebook, options);
  });
}

function show_action(answers, NOTEBOOKS) {
  // ! Show if notebook has analytics
  // ! If color is green, the div already was included
  // ! If color is red, the div does not exist yet
  const _NOTEBOOKS = search.filter_notebooks(answers, NOTEBOOKS);
  _NOTEBOOKS.forEach((notebook) => {
    // * Read html file
    let file = path.join(PAGES_PATH, `${notebook}.html`);
    let content = fs.readFileSync(file, "utf8");
    ({ HTML, DOM, window, document } = utils.HTMLtoDOM(content));

    let head = document.querySelector("head");

    // * Show the current notebook
    console.log(chalk.bold.blue(`# ${notebook}`));
    // ? Global site tag scripts
    let color = head.querySelectorAll(`script[src*=${MEASUREMENT_ID}]`).length
      ? chalk.bold.green
      : chalk.bold.red;
    console.log(
      color(
        `<script async src="https://www.googletagmanager.com/gtag/js?id=${MEASUREMENT_ID}"></script>`
      )
    );
    color = utils.contains(head, "script", MEASUREMENT_ID).length
      ? chalk.bold.green
      : chalk.bold.red;
    console.log(
      color(`<script>...gtag('config', '${MEASUREMENT_ID}')</script>`)
    );

    console.log(); // ? skip a line
  });
}

function analytics_option(answers, NOTEBOOKS, options = {}) {
  if (answers.action === "Show") {
    show_action(answers, NOTEBOOKS);
  } else {
    execute_action(answers, NOTEBOOKS, options);
  }
}

module.exports = { analytics_option };
