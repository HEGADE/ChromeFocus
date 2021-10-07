import LocalStore from "./localstore.js";

// Dom elements
let focusedSiteButton = document.querySelector(".focused_sites");
let functionalButtons = document.getElementsByTagName("button");
let addSiteButton = document.querySelector(".add_site");
let siteContainer = document.querySelector(".add_site_container");
let focusedContainer = document.querySelector(".add_site_focused");
let addButton = document.getElementById("addSiteButton");
let siteUrl = document.getElementById("siteUrl");
let sitesToDisplay = document.getElementById("site_list");

// Helper variables
let siteUrlArray = [];
const blueBorder = "2.3px solid #00a2ff";
const redBorder = "2.3px solid red";
const info = `<h3 style="display:block;text-align:center;margin-left:-3rem">Nothing is here</h3>`;
const addSite = "Add site";

// Getting current tab url
chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
  let url = tabs[0].url;
  siteUrl.value = url.split("/")[2];
});

// Buttons logic goes here
Array.from(functionalButtons).forEach((ele) => {
  ele.addEventListener("click", (e) => {
    if (e.currentTarget.innerText === addSite) {
      focusedSiteButton.style.border = blueBorder;
      e.currentTarget.style.border = redBorder;
      showOrHide(false);
    } else {
      sitesToDisplay.innerHTML = "";
      addSiteButton.style.border = blueBorder;
      e.currentTarget.style.border = redBorder;
      showOrHide(true);
      chrome.storage.local.get("key", function (result) {
        if (!result?.key?.length > 0) {
          alert(result?.key?.length);
          alert(result?.key);
          sitesToDisplay.innerHTML = info;
          return;
        }

        result.key.forEach((site) => {
          let li = document.createElement("li");
          li.innerText = site;
          sitesToDisplay.append(li);
          li.addEventListener("click", removeSite);
        });
      });
    }
  });
});

// For removing sites
function removeSite(e) {
  let siteToRemove = e.currentTarget.innerText;
  e.currentTarget.style.display = "none";
  chrome.storage.local.get({ key: [] }, (result) => {
    LocalStore.setItem(result.key.filter((e) => e !== siteToRemove));
  });
}
function showOrHide(determine) {
  siteContainer.style.display = determine ? "none" : "flex";
  focusedContainer.style.display = determine ? "flex" : "none";
}

//Blocking sites logic goes here
addButton.addEventListener("click", (e) => {
  chrome.storage.local.get("key", async function (result) {
    if (result?.key) siteUrlArray.push(...result?.key);
    if (!siteUrl.value.includes("www"))
      siteUrlArray.push("www." + siteUrl.value);
    else siteUrlArray.push(siteUrl.value);

    if (confirm("Do you really wanna block this site")) {
      LocalStore.setItem(siteUrlArray);
      alert("Added site to focused list");
    }

    // For page refreshing page
    chrome.tabs.query(
      { active: true, currentWindow: true },
      function (arrayOfTabs) {
        chrome.tabs.reload(arrayOfTabs[0].id);
      }
    );
    return;
  });
});
