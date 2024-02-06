// Links the HTML spoon input to the JS.
const spoonIngredientInput = document.getElementById("spoonIngredientInput");
// Links the HTML spoon search button to the JS.
const spoonSearchBtn = document.getElementById("spoonRecipeSearchBtn");
// Links the HTML edamam input to the JS.
const edamamIngredientInput = document.getElementById("edamamIngredientInput");
// Links the HTML edamam search button to the JS.
const edamamSearchBtn = document.getElementById("edamamRecipeSearchBtn");

// Initializes empty arrays.
let spoonIngredientArray = [];
let edamamIngredientArray = [];

// Saves the private API info
const spoonacularAPIKey = "de07b56c97684defbae6bc906f8a5352";
const edamamAPIKey = "bcbb167d1766a0e612f1bb055f2ac680";
const edamamAPIId = "dc99804d";

// Removes all recipes from Spoon JSON data that have more than 1 "missedIngredients."
function spoonFilterRecipes(data) {
  return data.filter(function (recipe) {
    return recipe.missedIngredients.length <= 0;
  });
}

// Take value created with the searchBtn click event and fetches the correct data.
function spoonFetch() {
  // Converts ingredientArray into a single string with the correct punctuation between each ingredient to be inserted as an API fetch parameter.
  let spoonIngredientString = spoonIngredientArray.map(String).join(",+");
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
    // Prints the JSON data to the console after calling the "spoonFilterRecipes" function.
    // TODO: Have the data create HTML elements instead of printing to the console.
    .then(function (data) {
      let spoonFilteredRecipes = spoonFilterRecipes(data);
      console.log(spoonFilteredRecipes);
    });
}

function edamamFetch() {
  let edamamIngredientString = edamamIngredientArray.map(String).join("%2C%20");
  fetch(
    "https://api.edamam.com/api/recipes/v2?type=public&q=" +
      edamamIngredientString +
      "&app_id=" +
      edamamAPIId +
      "&app_key=" +
      edamamAPIKey
  )
    // Converts that data into a JSON file which we can parse.
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
    });
}

// Attaches a click event to Spoon Search Button.
spoonSearchBtn.addEventListener("click", function () {
  // Fills the empty ingredient arrays with the users input.
  spoonIngredientArray = spoonIngredientInput.value.split(", ");
  // Calls the Fetch function.
  spoonFetch();
});

// Attaches a click event to Edamam Search Button.
edamamSearchBtn.addEventListener("click", function () {
  // Fills the empty ingredient arrays with the users input.
  edamamIngredientArray = edamamIngredientInput.value.split(", ");
  // Calls the Fetch function.
  edamamFetch();
});
