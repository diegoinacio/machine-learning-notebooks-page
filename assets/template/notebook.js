// prettier-ignore
// ! Declare global variables
// ! and read custom meta tags
{
  var REPO_NAME = "Machine Learning Notebooks";
  var REPO_ID = "machine-learning-notebooks";
  var PAGE_ID = `${REPO_ID}-page`;
  var SECTION_NAME = document.querySelector("meta[name='section_name']").content;
  var SECTION_ID = document.querySelector("meta[name='section_id']").content;
  var NOTEBOOK_NAME = document.querySelector("meta[name='notebook_name']").content;
  var NOTEBOOK_ID = document.querySelector("meta[name='notebook_id']").content;
}

// prettier-ignore
// ! Build URLs
{
  var WEBSITE_URL = "https://diegoinacio.github.io";
  var GITHUB_URL = "https://github.com/diegoinacio";
  var PN_URL = `${WEBSITE_URL}/python-notebooks/`;
  var INDEX_PAGE_URL = `${WEBSITE_URL}/${PAGE_ID}/`;
  var REPO_URL = `${GITHUB_URL}/${REPO_ID}`;
  var NOTEBOOK_URL = `${REPO_URL}/blob/master/${SECTION_ID}/${NOTEBOOK_ID}.ipynb`;
}

// ! Navbar buttons
const NAVBAR_SL = ".notebook-navbar";
const navbar_div = document.querySelector(NAVBAR_SL);

const div_buttons = document.createElement("div");
div_buttons.className = "navbar-buttons";
navbar_div.appendChild(div_buttons);

let div_button;

// * View Notebooks
div_button = document.createElement("div");
div_button.className = "div-button";
div_button.innerHTML = `
<a href="${NOTEBOOK_URL}">
  <i class="fas fa-book-open"></i>
  <span class="tooltip">
    View <b>Notebook</b>
  </span>
</a>`;
div_buttons.appendChild(div_button);

// * Issue and idea
// ? URL Encoding for Special Characters
const URL_ENCODING = {
  " ": "%20",
  "#": "%23",
  "&": "%26",
  "+": "%2B",
  ".": "%2E",
};

// ? Get notebook title and section
let NB_NAME = NOTEBOOK_NAME.split("");
NB_NAME = NB_NAME.map((e) =>
  Object.keys(URL_ENCODING).includes(e) ? URL_ENCODING[e] : e
);
NB_NAME = NB_NAME.join("");

let SC_NAME = SECTION_NAME.split("");
SC_NAME = SC_NAME.map((e) =>
  Object.keys(URL_ENCODING).includes(e) ? URL_ENCODING[e] : e
);
SC_NAME = SC_NAME.join("");

// * Report an issue
// ? Build url
let ISSUE_URL = `${REPO_URL}/discussions/new`;
ISSUE_URL += `?category=Issues`;
ISSUE_URL += `&labels=${SC_NAME},from+page`;
ISSUE_URL += `&title=[${NB_NAME}]+Issue+title..`;
ISSUE_URL += "&body=Put+your+comment+here..";

div_button = document.createElement("div");
div_button.className = "div-button";
div_button.innerHTML = `
<a href="${ISSUE_URL}" target="_blank">
  <i class="fas fa-comment-dots"></i>
  <span class="tooltip">
    Report an <b>Issue</b>
  </span>
</a>`;
div_buttons.appendChild(div_button);

// * Suggest an idea
// ? Build url
let IDEA_URL = `${REPO_URL}/discussions/new`;
IDEA_URL += `?category=Ideas`;
IDEA_URL += `&labels=${SC_NAME},idea,from+page`;
IDEA_URL += `&title=[${NB_NAME}]+Idea+title..`;
IDEA_URL += "&body=Put+your+comment+here..";

div_button = document.createElement("div");
div_button.className = "div-button";
div_button.innerHTML = `
<a href="${IDEA_URL}" target="_blank">
  <i class="fas fa-lightbulb"></i>
  <span class="tooltip">
    Suggest an <b>Idea</b>
  </span>
</a>`;
div_buttons.appendChild(div_button);

// * Return to index page
div_button = document.createElement("div");
div_button.className = "div-button";
div_button.innerHTML = `
<a href="${INDEX_PAGE_URL}#${SECTION_ID}">
  <i class="fas fa-laptop-code"></i>
  <span class="tooltip">
    Return to <b>${REPO_NAME}</b>
  </span>
</a>`;
div_buttons.appendChild(div_button);

// * Go to Python Notebooks
div_button = document.createElement("div");
div_button.className = "div-button";
div_button.innerHTML = `
<a href="${PN_URL}">
  <i class="fas fa-swatchbook"></i>
  <span class="tooltip">
    Go to <b>Python Notebooks</b>
  </span>
</a>`;
div_buttons.appendChild(div_button);

// * Support this project
div_button = document.createElement("div");
div_button.className = "div-button";
div_button.innerHTML = `
<a href="https://ko-fi.com/diegoinacio">
  <i class="fas fa-heart"></i>
  <span class="tooltip">
    <b>Support</b> this project
  </span>
</a>`;
div_buttons.appendChild(div_button);

// ! Headings
const Hs = document.querySelectorAll("h2,h3,h4,h5");

let h2_count, h3_count, h4_count, h5_count;
h2_count = h3_count = h4_count = h5_count = 0;

for (const e of Hs) {
  let index = "",
    text = "";

  if (e.nodeName === "H2") {
    h2_count++;
    index = `${h2_count}.`;
    h3_count = h4_count = h5_count = 0;
  }

  if (e.nodeName === "H3") {
    h3_count++;
    index = `${h2_count}.${h3_count}.`;
    h4_count = h5_count = 0;
  }

  if (e.nodeName === "H4") {
    h4_count++;
    index = `${h2_count}.${h3_count}.${h4_count}.`;
    h5_count = 0;
  }

  if (e.nodeName === "H5") {
    h5_count++;
    index = `${h2_count}.${h3_count}.${h4_count}.${h5_count}.`;
  }

  index = `<span class="INDEX-${e.nodeName}">${index}</span>`;
  text = e.innerText;
  e.innerHTML = `${index} ${text}`;
}

// ! Cells
// * Copy button
const PY_CELL_SL = ".highlight.hl-ipython3 pre";
const PRE = document.querySelectorAll(PY_CELL_SL);
PRE.forEach((pre) => {
  let button = document.createElement("button");
  button.className = "fa regular fa-copy";
  button.id = "bt-cell-copy";
  button.title = "copy";
  button.addEventListener("click", () => {
    let dummy = document.createElement("textarea");
    document.body.appendChild(dummy);
    dummy.value = pre.innerText;
    dummy.select();
    document.execCommand("copy");
    document.body.removeChild(dummy);
  });
  pre.appendChild(button);
});

// ! Footer
const FOOTER_SL = ".notebook-footer";
let year_ft = new Date().getFullYear();
let content_footer = `
<hr>
Created with ❤️ by
<a href="${WEBSITE_URL}" target="_blank" title="personal website">Diego Inácio</a>
<br><br><p>© ${year_ft} Diego Inácio.</p>
`;

document.querySelector(FOOTER_SL).innerHTML = content_footer;
