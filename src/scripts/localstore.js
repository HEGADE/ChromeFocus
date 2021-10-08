export default class LocalStore {
  static setItem(value) {
    chrome.storage.local.set({ key: value }, () => {
      console.log("Stored name: " + value);
    });
    return;
  }
  static getItem() {
    let data;
    chrome.storage.local.get("key", (result) => {
      console.log("ddd", result);
    });
    return data;
  }
}
