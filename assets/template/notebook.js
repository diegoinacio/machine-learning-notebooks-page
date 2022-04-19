// ! Navbar
// * Buttons
const NAVBAR_SL = ".notebook-navbar";

const div_buttons = document.createElement("div");
div_buttons.className = "navbar-buttons";
document.querySelector(NAVBAR_SL).appendChild(div_buttons);

let a_button;

// * View Notebooks
a_button = document.createElement("a");

// ? Find the link of the notebook in the first cell
const first_cell = document.querySelector("h1").parentNode;
const notebook_link = first_cell.querySelector("a[href*=\\.ipynb]");

if (notebook_link) {
  a_button.href = notebook_link.href;
  a_button.innerHTML = `
  <i class="fas fa-book-open"></i>
  <span class="tooltip">
    View <b>Notebook</b>
  </span>`;
  div_buttons.appendChild(a_button);
}

// * Report an Issue
// ? URL Encoding for Special Characters
const URL_ENCODING = {
  " ": "%20",
  "#": "%23",
  "&": "%26",
  "+": "%2B",
  ".": "%2E",
};

// ? Get notebook title and section
let [NB_TITLE, NB_SECTION] = document.head
  .querySelector("title")
  .innerText.split(" | ");

NB_TITLE = NB_TITLE.split("");
NB_TITLE = NB_TITLE.map((e) =>
  Object.keys(URL_ENCODING).includes(e) ? URL_ENCODING[e] : e
);
NB_TITLE = NB_TITLE.join("");

NB_SECTION = NB_SECTION.split("");
NB_SECTION = NB_SECTION.map((e) =>
  Object.keys(URL_ENCODING).includes(e) ? URL_ENCODING[e] : e
);
NB_SECTION = NB_SECTION.join("");

// ? Build url to issue page
let ISSUE_URL =
  "https://github.com/diegoinacio/machine-learning-notebooks/issues/new";
ISSUE_URL += `?labels=${NB_SECTION},from+page`;
ISSUE_URL += `&title=[${NB_TITLE}]+Issue+title..`;
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

// * Return to Machine Learning Notebooks
a_button = document.createElement("a");
a_button.href =
  "https://diegoinacio.github.io/machine-learning-notebooks-page/";
a_button.innerHTML = `
  <i class="fas fa-robot"></i>
  <span class="tooltip">
    Return to <b>Machine Learning Notebooks</b>
  </span>`;
div_buttons.appendChild(a_button);

// * Go to Python Notebooks
a_button = document.createElement("a");
a_button.href = "https://diegoinacio.github.io/python-notebooks/";
a_button.innerHTML = `
  <i class="fab fa-python"></i>
  <span class="tooltip">
    Go to <b>Python Notebooks</b>
  </span>`;
div_buttons.appendChild(a_button);

// * Visit my personal website
a_button = document.createElement("a");
a_button.href = "https://diegoinacio.github.io/";
a_button.innerHTML = `
  <i class="fas fa-home"></i>
  <span class="tooltip">
    Visit <b>my personal website</b>
  </span>`;
div_buttons.appendChild(a_button);

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
<p>© ${year_ft} Diego Inácio.</p>
<a href="https://diegoinacio.github.io/" target="_blank">diegoinacio.github.io</a>
`;

document.querySelector(FOOTER_SL).innerHTML = content_footer;
