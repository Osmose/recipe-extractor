const {rule, ruleset, dom, out, and, atMost, conserveScore, max, note, props, score, type, typeIn} = fathom;

function getFirstText(element) {
  return element.textContent.toLowerCase().trim().split(' ', 1)[0];
}

function isInteger(string) {
  return Number.parseInt(string) !== NaN;
}

function containsWords(sentence, words) {
  const sentenceWords = sentence.toLowerCase().split(' ');
  return sentenceWords.some(word => words.includes(word));
}

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
function elementsStartWithRecipeVerbs(fnode) {
  const lis = fnode.element.querySelectorAll(':scope > li');
  return Array.from(lis).some(li => recipeVerbs.includes(getFirstText(li)));
}

function elementsStartWithAmounts(fnode) {
  const lis = fnode.element.querySelectorAll(':scope > li');
  return Array.from(lis).some(li => {
    const first = getFirstText(li);
    if (first.includes('/')) {
      const [numerator, denominator] = first.split('/', 1);
      return isInteger(numerator) && isInteger(denominator);
    } else {
      return isInteger(first);
    }
  });
}

const units = [
  'lbs',
  'oz',
  'tsp',
  'tbsp',
  'quart',
  'gallon',
  'pint',
  'tablespoon',
  'teaspoon',
  'ounce',
  'pound',
  'cup'
];
function elementsContainIngredientUnits(fnode) {
  const lis = fnode.element.querySelectorAll(':scope > li');
  return Array.from(lis).some(li => {
    return containsWords(li.textContent, units);
  });
}

const rules = ruleset(
  rule(dom('ul'), type('steps').score(1)),
  rule(dom('ol'), type('steps').score(2)),
  rule(type('steps'), score(fnode => elementsStartWithRecipeVerbs(fnode) ? 2 : 1)),

  rule(dom('ul'), type('ingredients').score(2)),
  rule(dom('ol'), type('ingredients').score(1)),
  rule(type('ingredients'), score(fnode => elementsStartWithAmounts(fnode) ? 2 : 1)),
  rule(type('ingredients'), score(fnode => elementsContainIngredientUnits(fnode) ? 3 : 1)),

  rule(type('steps').max(), out('steps')),
  rule(type('ingredients').max(), out('ingredients')),
);

const facts = rules.against(document);
const returnVal = {
  steps: null,
  ingredients: null,
};

for (const outName of ['steps', 'ingredients']) {
  const fact = facts.get(outName);
  if (fact.length) {
    returnVal[outName] = fact[0].element.parentNode.innerHTML;
  }
}

returnVal;
