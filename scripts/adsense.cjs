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

    let body = document.querySelector("body");

    // * Remove comments for analytics
    utils.remove_all_comments(body, /^\/?! google adsense$/);

    // * Remove all scripts
    body
      .querySelectorAll("script[src*=adsbygoogle]")
      .forEach((e) => e.remove());
    body.querySelectorAll("ins.adsbygoogle").forEach((e) => e.remove());
    utils.contains(body, "script", "adsbygoogle").forEach((e) => e.remove());

    if (answers.action === "Include") {
      const adsense_tags = `
      <!-- ! google adsense -->
      <script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
      ></script>
      <ins
        class="adsbygoogle"
        style="display: block; text-align: center"
        data-ad-layout="in-article"
        data-ad-format="fluid"
        data-ad-client="ca-pub-4737780736418859"
        data-ad-slot="3299263090"
      ></ins>
      <script>
        (adsbygoogle = window.adsbygoogle || []).push({});
      </script>
      <!-- /! google adsense -->
      `;

      const headings = body.querySelectorAll("h2,h3,h4");
      for (const [i, e] of headings.entries()) {
        if (!(i % 2)) {
          const elements = document
            .createRange()
            .createContextualFragment(adsense_tags);
          e.parentElement.insertBefore(elements, e);
        }
      }
    }

    utils.write_file(file, document, notebook, options);
  });
}

function show_action(answers, NOTEBOOKS) {
  // ! Show if notebook has adsense
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
    // ? Global site adsense tags
    let color = body.querySelectorAll("script[src*=adsbygoogle]").length
      ? chalk.bold.green
      : chalk.bold.red;
    console.log(
      color(
        `<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>`
      )
    );
    color = body.querySelectorAll("ins.adsbygoogle").length
      ? chalk.bold.green
      : chalk.bold.red;
    console.log(color(`<ins class="adsbygoogle" ...></ins>`));
    color = utils.contains(body, "script", "adsbygoogle").length
      ? chalk.bold.green
      : chalk.bold.red;
    console.log(
      color(
        `<script>(adsbygoogle = window.adsbygoogle || []).push({});</script>`
      )
    );

    console.log(); // ? skip a line
  });
}

function adsense_option(answers, NOTEBOOKS, options = {}) {
  if (answers.action === "Show") {
    show_action(answers, NOTEBOOKS);
  } else {
    execute_action(answers, NOTEBOOKS, options);
  }
}

module.exports = { adsense_option };
