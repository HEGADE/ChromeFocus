import LocalStore from "./localstore.js";

let focusedSiteButton = document.querySelector(".focused_sites");
let functionalButtons = document.getElementsByTagName("button");
let addSiteButton = document.querySelector(".add_site");
let siteContainer = document.querySelector(".add_site_container");
let focusedContainer = document.querySelector(".add_site_focused");
let addButton = document.getElementById("addSiteButton");
let siteUrl = document.getElementById("siteUrl");
let siteUrlArray = [];

let siteDataObj = {};
const addSite = "Add site";
const key = "ninja";
const value = "ninja1";
let so=  LocalStore.getItem()

  
Array.from(functionalButtons).forEach((ele) => {
  ele.addEventListener("click", (e) => {
    if (e.currentTarget.innerText === addSite) {
      focusedSiteButton.style.border = "2.3px solid #00a2ff";
      e.currentTarget.style.border = "2.3px solid red";
      showOrHide(false);
    } else {
      addSiteButton.style.border = "2.3px solid #00a2ff";
      e.currentTarget.style.border = "2.3px solid red";
      showOrHide(true);
      let content = LocalStore.getItem();
    }
  });
});

function showOrHide(determine) {
  siteContainer.style.display = determine ? "none" : "flex";
  focusedContainer.style.display = determine ? "flex" : "none";
}
addButton.addEventListener ("click", (e) => {
  // siteUrlArray.push(LocalStore.getItem());
  // siteUrlArray.push(siteUrl.value);

  // LocalStore.setItem(siteUrlArray);
   chrome.storage.sync.get("key", async function (result) {
//  console.log(result)
    siteUrlArray.push(...result.key)
    // console.log("my arr",siteUrlArray)
    // siteUrlArray.push(siteUrl.value);
    // siteUrlArray=[...result.key];
    // siteUrlArray.push(siteUrl.value);

  });
  console.log("my arr1",siteUrlArray)
  siteUrlArray.push(siteUrl.value)
  console.log("my arr2",siteUrlArray)

  LocalStore.setItem(siteUrlArray);
});
