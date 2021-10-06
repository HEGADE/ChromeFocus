let siteUrl=location.href.split("/")[2]
chrome.storage.local.get({key:[]}, (result) => {
  console.log("Retrieved name: " , result);
  if(result?.key){
    result.key.forEach(site => {
      if(site.includes(siteUrl)){
        document.body.innerHTML = '<h1 style="display:block;color:red;text-align:center">Site is blocked</h1>';
      }
    });
  }
  
});


