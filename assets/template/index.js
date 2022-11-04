import { HEADER, INDEX } from "../../metadata.mjs";

// ! Build header
const header = document.querySelector("header#header");
header.innerHTML = `<h1 class="title">${HEADER.title}</h1>`;
header.innerHTML += `<div class="description">${HEADER.description}</div>`;
header.innerHTML += `
  <div class="signature">
    Created with ❤️ by <a href="https://diegoinacio.github.io/" class="name" target="_blank" title="personal website">
      Diego Inácio
    </a>
  </div>
`;

// ! Build navigation bar and main sections
// * Init navigation bar
const nav = document.querySelector("#nav");
nav.innerHTML = "";
const nav_ul = document.createElement("ul");
nav.appendChild(nav_ul);

// * Init main content
const main = document.querySelector("#main");
main.innerHTML = "";

for (const [i, s] of INDEX.entries()) {
  // * Include section to navigation bar
  const active = !i ? "class=active" : "";
  const index = `<span class="index">${i + 1}.</span>`;
  const title = `${index} ${s.name}`;
  const link = `<a href="#${s.id}"${active}>${title}</a>`;
  nav_ul.innerHTML += `<li>${link}</li>`;

  // ! Build section
  const section = document.createElement("section");
  section.id = s.id;
  section.className = "main";
  main.appendChild(section);

  // * Section header
  const header = document.createElement("header");
  header.className = "major";
  section.appendChild(header);

  header.innerHTML += `<h2>${title}</h2>`;
  header.innerHTML += `<p>${s.description}</p>`;

  // * Include notebooks
  const ul = document.createElement("ul");
  ul.className = "features";
  section.appendChild(ul);

  const notebooks = s.notebooks.sort((a, b) => (a.name > b.name && 1) || -1);
  for (const [j, n] of notebooks.entries()) {
    const li = document.createElement("li");
    li.innerHTML += `<img src="images/thumb_${n.id}.jpg" alt="${n.name}" />`;
    li.innerHTML += `<h3>${n.name}</h3>`;
    li.innerHTML += `<p>${n.description}</p>`;
    li.innerHTML += `
      <a href="pages/${n.id}.html" target="_blank" class="button primary fit">
        view notebook
      </a>
    `;
    ul.appendChild(li);
  }
}

// ! Build footer
const YEAR_FOOTER = new Date().getFullYear();
const PAGE_LINK = "diegoinacio.github.io";
const GH_LINK = "github.com/diegoinacio";

document.querySelector("footer#footer").innerHTML = `
  <p class="copyright">
    © ${YEAR_FOOTER} Diego Inácio. <br/><br/>
    <a href="https://${PAGE_LINK}/" target="_blank" title="personal website">${PAGE_LINK}</a> <br/>
    <a href="https://${GH_LINK}/" target="_blank" title="GitHub">${GH_LINK}</a>
  </p>
`;
