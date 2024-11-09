const theme1 = document.querySelector("#theme-1");
const theme2 = document.querySelector("#theme-2");
const theme3 = document.querySelector("#theme-3");
const themeChange = document.querySelector(".theme--slider");
const body = document.querySelector("body");

themeChange.addEventListener("click", themeswitch);

function themeswitch(e) {
  if (e.target === theme1) {
    // console.log('theme one changed');
    body.classList.remove("theme--2", "theme--3");
    body.classList.add("theme--1");
  } else if (e.target === theme2) {
    // console.log('theme two changed');
    body.classList.remove("theme--1", "theme--3");
    body.classList.add("theme--2");
  } else if (e.target === theme3) {
    // console.log('theme three changed')
    body.classList.remove("theme--1", "theme--2");
    body.classList.add("theme--3");
  }
}
