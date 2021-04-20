// ! Navbar
// * Buttons
const NAVBAR_SL = ".notebook-navbar";
const link_navbar = `
<a class="bt-return" href="http://diegoinacio.github.io/machine-learning-notebooks-page/">
  Return to <span>Machine Learning Notebooks</span>
</a>
`;

document.querySelector(NAVBAR_SL).innerHTML = link_navbar;

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
© ${year_ft} Diego Inácio.
`;

document.querySelector(FOOTER_SL).innerHTML = content_footer;
