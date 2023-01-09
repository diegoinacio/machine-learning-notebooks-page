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
const div_buttons = document.createElement("div");
div_buttons.className = "navbar-buttons";
document.querySelector(NAVBAR_SL).appendChild(div_buttons);

let a_button;

// * View Notebooks
a_button = document.createElement("a");
a_button.href = NOTEBOOK_URL;
a_button.innerHTML = `
  <i class="fas fa-book-open"></i>
  <span class="tooltip">
    View <b>Notebook</b>
  </span>`;
div_buttons.appendChild(a_button);

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

a_button = document.createElement("a");
a_button.target = "_blank";
a_button.href = ISSUE_URL;
a_button.innerHTML = `
  <i class="fas fa-comment-dots"></i>
  <span class="tooltip">
    Report an <b>Issue</b>
  </span>`;
div_buttons.appendChild(a_button);

// * Suggest and idea
// ? Build url
let IDEA_URL = `${REPO_URL}/discussions/new`;
IDEA_URL += `?category=Ideas`;
IDEA_URL += `&labels=${SC_NAME},idea,from+page`;
IDEA_URL += `&title=[${NB_NAME}]+Idea+title..`;
IDEA_URL += "&body=Put+your+comment+here..";

a_button = document.createElement("a");
a_button.target = "_blank";
a_button.href = IDEA_URL;
a_button.innerHTML = `
  <i class="fas fa-lightbulb"></i>
  <span class="tooltip">
    Suggest an <b>Idea</b>
  </span>`;
div_buttons.appendChild(a_button);

// * Return to index page
a_button = document.createElement("a");
a_button.href = `${INDEX_PAGE_URL}#${SECTION_ID}`;
a_button.innerHTML = `
  <i class="fas fa-robot"></i>
  <span class="tooltip">
    Return to <b>${REPO_NAME}</b>
  </span>`;
div_buttons.appendChild(a_button);

// * Go to Python Notebooks
a_button = document.createElement("a");
a_button.href = PN_URL;
a_button.innerHTML = `
  <i class="fas fa-swatchbook"></i>
  <span class="tooltip">
    Go to <b>Python Notebooks</b>
  </span>`;
div_buttons.appendChild(a_button);

// * Support this project
a_button = document.createElement("a");
a_button.href = "https://ko-fi.com/diegoinacio";
a_button.innerHTML = `
  <i class="fas fa-heart"></i>
  <span class="tooltip">
    <b>Support</b> this project
  </span>`;
div_buttons.appendChild(a_button);

// ! Headings
const Hs = document.querySelectorAll("h2,h3,h4,h5");

let h2_count, h3_count, h4_count, h5_count;
h2_count = h3_count = h4_count = h5_count = 0;

for (const e of Hs) {
  let index = "";

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
  e.innerHTML = `${index} ${e.innerText}`;
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
