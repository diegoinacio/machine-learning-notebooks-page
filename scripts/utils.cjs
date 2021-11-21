// ! Requires
const fs = require("fs");
const jsdom = require("jsdom");
const css = require("css");
const chalk = require("chalk");
const prettier = require("prettier");
const minify = require("html-minifier").minify;

// ! Init DOM parser
const DomParser = require("dom-parser");
const parser = new DomParser();

// ! ****** //
// ! Common //
// ! ****** //

function HTMLtoDOM(content) {
  // ! Parse raw HTML to DOM
  let HTML = parser.parseFromString(content, "text/html");
  let DOM = new jsdom.JSDOM(HTML.rawHTML);
  let window = DOM.window;
  let document = window.document;

  return { HTML, DOM, window, document };
}

function write_file(file, document, notebook, options = {}) {
  // ! Write file from document
  let documentHTML = "<!DOCTYPE html>";
  documentHTML += document.documentElement.outerHTML;
  if (options.format) {
    if (options.prettier) {
      documentHTML = prettier.format(documentHTML, {
        parser: "html",
        tabWidth: 2,
      });
    } else {
      documentHTML = minify(documentHTML, {
        collapseWhitespace: true,
      });
    }
  }
  fs.writeFileSync(file, documentHTML);
  console.log(chalk.bold.green(`${notebook} was saved!`));
}

function remove_all_comments(element, regex) {
  // ! Remove all comments inside element based on regex pattern
  for (node of element.childNodes) {
    // ? Comment type or Node.COMMENT_NODE is 8
    if (node.nodeType === 8) {
      let comment = node.nodeValue.trim();
      if (comment.match(regex)) {
        element.removeChild(node);
      }
    }
  }
}

function deep_property_remove(obj, property) {
  // ! Remove property from object recursively
  delete obj[property];
  for (item in obj) {
    if (typeof obj[item] === "object")
      deep_property_remove(obj[item], property);
  }
}

function contains(document, selector, text) {
  // ! Gets all elements based on its text content
  var elements = document.querySelectorAll(selector);
  return Array.prototype.filter.call(elements, function (element) {
    return RegExp(text).test(element.textContent);
  });
}

function index_info(INDEX) {
  // ! Build notebooks info based on INDEX metadata
  const NOTEBOOKS_INFO = {};
  for (const [i, s] of INDEX.entries()) {
    const notebooks = s.notebooks.sort((a, b) => (a.name > b.name && 1) || -1);
    for (const [j, n] of notebooks.entries()) {
      NOTEBOOKS_INFO[n.id] = {};
      NOTEBOOKS_INFO[n.id].section = s.name;
      NOTEBOOKS_INFO[n.id].section_id = s.id;
      NOTEBOOKS_INFO[n.id].title = n.name;
      NOTEBOOKS_INFO[n.id].description = n.description;
      const before = j ? j - 1 : notebooks.length - 1;
      NOTEBOOKS_INFO[n.id].before = notebooks[before].id;
      const after = (j + 1) % notebooks.length;
      NOTEBOOKS_INFO[n.id].after = notebooks[after].id;
    }
  }
  return NOTEBOOKS_INFO;
}

function filter_notebooks(answers, NOTEBOOKS) {
  // ! Filter notebook list based on the flag --all
  const all = answers.notebooks.includes("--all");
  return all ? Object.keys(NOTEBOOKS) : answers.notebooks;
}

// ! ********* //
// ! Meta tags //
// ! ********* //

function generate_tags(notebook, data) {
  // ! Generate all default meta tags
  return [
    `<link rel="icon" type="image/svg+xml" href="../favicon.svg" />`,
    `<link rel="alternate icon" href="../favicon.ico" />`,
    `<title>${data.title} | ${data.section}</title>`,
    `<meta charset="utf-8">`,
    `<meta name="viewport" content="width=device-width,initial-scale=1">`,
    `<meta name="author" content="Diego Inácio">`,
    `<meta property="og:url" content="https://diegoinacio.github.io/machine-learning-notebooks-page/pages/${notebook}.html">`,
    `<meta name="title" property="og:title" content="${data.title} >> Machine Learning Notebooks | Diego Inácio">`,
    `<meta name="description" property="og:description" content="${data.description}">`,
    `<meta name="image" property="og:image" content="https://diegoinacio.github.io/machine-learning-notebooks-page/images/thumb_${notebook}.jpg">`,
    `<meta property="og:image:type" content="image/jpeg">`,
    `<meta property="og:type" content="article">`,
    `<meta property="article:author" content="Diego Inácio">`,
    `<meta property="article:section" content="Machine Learning Notebooks">`,
  ];
}

function scrap_meta(document) {
  // ! Collect all meta tags
  let head = document.querySelector("head");

  let metaData = head.querySelectorAll(":scope meta");
  let metaHTML = Array.from(metaData).map((meta) => {
    return meta.outerHTML;
  });

  return { metaData, metaHTML };
}

// ! ***** //
// ! Style //
// ! ***** //

function check_imported_style(LINKS) {
  // ! Check if any link tag is importing notebook.css
  for (link of LINKS) {
    if (
      link.rel === "stylesheet" &&
      (link.href === "../assets/css/notebook-standard.css" ||
        link.href === "../assets/css/notebook-custom.css")
    ) {
      return true;
    }
  }
  return false;
}

function parseCSS(content) {
  // ! Parse content css to object
  let obj = css.parse(content);
  deep_property_remove(obj, "position");
  return obj;
}

function deep_included(rule, CSS_BASE) {
  // ! Check if rule is included in the CSS_BASE
  let s_rule = css.stringify({ stylesheet: { rules: [rule] } });
  for (b_rule of CSS_BASE) {
    let sb_rule = css.stringify({ stylesheet: { rules: [b_rule] } });
    if (
      s_rule.replace(/(\s+|\t+|\n+|\r+)/g, " ") ===
      sb_rule.replace(/(\s+|\t+|\n+|\r+)/g, " ")
    )
      return true;
  }
  return false;
}

// ! ******** //
// ! Template //
// ! ******** //

function check_imported_scripts(SCRIPTS) {
  // ! Check if any script tag is the necessary
  for (script of SCRIPTS) {
    if (script.src === "../assets/template/notebook.js") {
      return true;
    }
  }
  return false;
}

module.exports = {
  HTMLtoDOM,
  write_file,
  remove_all_comments,
  contains,
  index_info,
  filter_notebooks,
  generate_tags,
  scrap_meta,
  check_imported_style,
  parseCSS,
  deep_included,
  check_imported_scripts,
};
