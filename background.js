let recipe = null;

browser.browserAction.onClicked.addListener(() => {
  browser.tabs.executeScript({
    file: 'fathom.js',
  }).then(() => {
    return browser.tabs.executeScript({
      file: 'getRecipe.js',
    });
  }).then(([newRecipe]) => {
    recipe = newRecipe;
    browser.tabs.create({
      url: '/showRecipe.html',
    });
  });
});

browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
  sendResponse(recipe);
});
