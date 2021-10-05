let focusedSiteButton = document.querySelector(".focused_sites");
let functionalButtons = document.getElementsByTagName("button");
let addSiteButton = document.querySelector(".add_site");
let siteContainer = document.querySelector(".add_site_container");
let focusedContainer = document.querySelector(".add_site_focused");
const addSite = "Add site";
Array.from(functionalButtons).forEach((ele) => {
  ele.addEventListener("click", (e) => {
    if (e.currentTarget.innerText === addSite) {
      focusedSiteButton.style.border = "2.3px solid #00a2ff";
      e.currentTarget.style.border = "2.3px solid red";
      showOrHide(show=true);
    } else {
      addSiteButton.style.border = "2.3px solid #00a2ff";
      e.currentTarget.style.border = "2.3px solid red";
      showOrHide(show=false);
    }
  });
});

function showOrHide(determine) { // hoisting 
  siteContainer.style.display = determine ? "none" : "block";
  focusedContainer.style.display = determine ? "block" : "none";
}
 
