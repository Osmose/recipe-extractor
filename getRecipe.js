const {rule, ruleset, dom, out, and, atMost, conserveScore, max, note, props, score, type, typeIn} = fathom;

const recipeVerbs = [
  'preheat',
  'mix',
  'melt',
  'remove',
  'bake',
  'fry',
  'sear',
  'warm',
  'heat',
];
function elementsStartWithRecipeVerbs(element) {
  const lis = element.querySelectorAll(':scope > li');
  return Array.from(lis).some(li => {
    const first = li.textContent.toLowerCase().trim().split(' ', 1)[0];
    return recipeVerbs.includes(first);
  });
}

const rules = ruleset(
  rule(dom('ul'), type('recipe').score(1)),
  rule(dom('ol'), type('recipe').score(2)),

  rule(type('recipe'), score(fnode => elementsStartWithRecipeVerbs(fnode.element) ? 2 : 1)),

  rule(type('recipe').max(), out('recipe'))
);

const facts = rules.against(document);
const recipe = facts.get('recipe');
let returnVal = null;
if (recipe.length) {
  returnVal = recipe[0].element.parentNode.innerHTML;
}

returnVal;
