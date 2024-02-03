// Saves the private API Key for spoonacular.
const spoonacularAPIKey = "de07b56c97684defbae6bc906f8a5352";

// ! This is only here for testing purposes until ingredientArray is populated by script.js.
const ingredientArray = [
  "apple",
  "banana",
  "garlic",
  "balsamic vinegar",
  "kale",
  "onion",
  "bread",
  "figs",
  "goat cheese",
  "pesto",
];

// Converts ingredientArray into a single string with the correct punctuation between each ingredient to be inserted as an API fetch parameter.
const spoonIngredientString = ingredientArray.map(String).join(",+");

// Fetches data for recipes within the following parameters:
// List up to 100 recipes.
// Order them by least amount of "missing ingredients."
// Ignore pantry items like water, flour, salt in ingredient check.
// Ingredients = What is in ingredientArray
fetch(
  "https://api.spoonacular.com/recipes/findByIngredients?number=100&ranking=2&ignorePantry=true&ingredients=" +
    spoonIngredientString +
    "&apiKey=" +
    spoonacularAPIKey
)
  // Converts that data into a JSON file which we can parse.
  .then(function (response) {
    return response.json();
  })
  // Prints the JSON data to the console.
  // TODO: Create a function that checks if there are any "missedIngredients" objects in the returned recipe and remove those recipes from the array.
  // TODO: Have the data create HTML elements instead of printing to the console.
  .then(function (data) {
    console.log(data);
  });
