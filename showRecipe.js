browser.runtime.sendMessage({action: "getRecipe"}).then(message => {
  document.getElementById('recipe').innerHTML = message.recipeHtml;
});
