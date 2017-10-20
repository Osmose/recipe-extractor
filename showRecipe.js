browser.runtime.sendMessage({action: "getRecipe"}).then(recipe => {
  document.getElementById('ingredients').innerHTML = recipe.ingredients;
  document.getElementById('steps').innerHTML = recipe.steps;
});
