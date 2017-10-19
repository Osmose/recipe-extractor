let recipeHtml = null;

browser.browserAction.onClicked.addListener(() => {
  browser.tabs.executeScript({
    file: 'fathom.js',
  }).then(() => {
    return browser.tabs.executeScript({
      file: 'getRecipe.js',
    });
  }).then(([newRecipeHtml]) => {
    recipeHtml = newRecipeHtml;
    browser.tabs.create({
      url: '/showRecipe.html',
    }).then(tab => {
      browser.tabs.sendMessage(tab.id, {recipeHtml});
    });
  });
});

browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
  sendResponse({recipeHtml});
});
