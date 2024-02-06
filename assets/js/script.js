// References the button that had the ID recipeSearchBtn.
const searchBtn = document.getElementById("recipeSearchBtn");
// References the input that had the ID ingredientInput.
const userIngredientInput = document.getElementById("ingredientInput");
// Initializes an empty array.
let ingredientArray = [];

// Saves the private API Key for spoonacular. Saves the private API Key and API Id for edamam.

const spoonacularAPIKey = "de07b56c97684defbae6bc906f8a5352";
const edamamAPIKey = "bcbb167d1766a0e612f1bb055f2ac680";
const edamamAPIId = "dc99804d";

// Removes all recipes from Spoon JSON data that have more than 1 "missedIngredients."
function spoonFilterRecipes(data) {
  return data.filter(function (recipe) {
    return recipe.missedIngredients.length <= 1;
  });
}

// Take value created with the searchBtn click event and fetches the correct data.
function spoonFetch() {
  // Converts ingredientArray into a single string with the correct punctuation between each ingredient to be inserted as an API fetch parameter.
  let spoonIngredientString = ingredientArray.map(String).join(",+");
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

function edamamFetch(){
  let edamamIngredientString = ingredientArray.map(String).join("%2C%20");
  fetch("https://api.edamam.com/api/recipes/v2?type=public&q=" + edamamIngredientString + "&app_id=" +
 edamamAPIId +
 "&app_key=" +
 edamamAPIKey
)
.then(response => response.json())
.then(function (data) {
  console.log(data);
})}

// Attaches a click event to searchBtn.
searchBtn.addEventListener("click", function () {
  // Fills the empty ingredientArray with the users input.
  ingredientArray = userIngredientInput.value.split(", ");
  // Calls the Fetch functions.
  spoonFetch();
  edamamFetch();
});
