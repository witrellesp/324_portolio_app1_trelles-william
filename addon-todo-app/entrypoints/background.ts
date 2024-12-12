
export default defineBackground(() => {
  browser.runtime.onInstalled.addListener(() => {
    console.log("Extension installed");
  });
});
