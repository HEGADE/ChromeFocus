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
const addSite = "Add site";
chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
  let url = tabs[0].url;
  siteUrl.value = url.split("/")[2];
});
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
      chrome.storage.local.get("key", function (result) {
        if (!result?.key) {
          sitesToDisplay.innerHTML=`<h3 style="display:block;text-align:center;margin-left:-3rem">Nothing is here</h3>`
          return
        };
        result.key.forEach((site) => {
          let li = document.createElement("li");
          li.innerText = site;
          sitesToDisplay.append(li);
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
    if (result?.key) {
      siteUrlArray.push(...result?.key);
    }
    console.log("before", siteUrlArray);
    if (!siteUrl.value.includes("www")) {
      siteUrlArray.push("www." + siteUrl.value);
    } else {
      siteUrlArray.push(siteUrl.value);
    }

    if (confirm("Do you really wanna block this site")) {
      LocalStore.setItem(siteUrlArray);
      alert("Added site to focused list");
    }
    // for page refreshing page
    chrome.tabs.query(
      { active: true, currentWindow: true },
      function (arrayOfTabs) {
        chrome.tabs.reload(arrayOfTabs[0].id);
      }
    );
    return;
  });
});
