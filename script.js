import LocalStore from "./localstore.js";

let focusedSiteButton = document.querySelector(".focused_sites");
let functionalButtons = document.getElementsByTagName("button");
let addSiteButton = document.querySelector(".add_site");
let siteContainer = document.querySelector(".add_site_container");
let focusedContainer = document.querySelector(".add_site_focused");
let addButton = document.getElementById("addSiteButton");
let siteUrl = document.getElementById("siteUrl");
let sitesToDisplay = document.getElementById("site_list");
let siteUrlArray = [];

let siteDataObj = {};
const addSite = "Add site";
const key = "ninja";
const value = "ninja1";
let so = LocalStore.getItem();

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
      chrome.storage.local.get("key",  function (result) {
        console.log("mmere", result);
        result.key.forEach((site) => {
          let li = document.createElement("li");
          li.innerText = site;
          sitesToDisplay.append(li);
          console.log("lolol",site);
        });
      });
    }
  });
});

function showOrHide(determine) {
  siteContainer.style.display = determine ? "none" : "flex";
  focusedContainer.style.display = determine ? "flex" : "none";
}
addButton.addEventListener("click", (e) => {
  chrome.storage.local.get("key", async function (result) {

    if(result?.key){
      alert("ha",result.key)

      console.log(result.key,"hello mother")

      siteUrlArray.push(...result?.key);
    }
    console.log("before", siteUrlArray);
    siteUrlArray.push(siteUrl.value);
    console.log("after", siteUrlArray);
  
    LocalStore.setItem(siteUrlArray);
    return
  });
  
});
