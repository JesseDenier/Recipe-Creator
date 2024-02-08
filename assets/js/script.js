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
const spoonacularAPIKey = "b1e8d5af6d6f4efaaa60746bf1c9cd8c";
const edamamAPIKey = "bcbb167d1766a0e612f1bb055f2ac680";
const edamamAPIId = "dc99804d";

// Removes all recipes from Spoon JSON data that have more than 1 "missedIngredients."
function spoonFilterRecipes(data) {
  return data.filter(function (recipe) {
    return recipe.missedIngredients.length <= 0;
  });
}

// Creates a recipe card based on spoonFetch data.
function spoonCreateCard(recipe) {
  // Create a div element for the recipe card
  const card = document.createElement("div");
  card.classList.add("recipe-card");
  // Create an h2 element for the recipe name
  const recipeName = document.createElement("h2");
  recipeName.textContent = recipe.title; // not a name variable in JSON
  // Create a ul element for the ingredients list
  const ingredientsList = document.createElement("ul");
  // Iterate over the ingredients and create li elements for each
  recipe.usedIngredients.forEach((ingredient) => {
    const ingredientItem = document.createElement("li");
    ingredientItem.textContent = ingredient.name; // Assuming the ingredient object has a 'name' property
    ingredientsList.appendChild(ingredientItem);
  });
  // Append the recipe name and ingredients list to the card
  card.appendChild(recipeName);
  card.appendChild(ingredientsList);
  // Append the card to the document or a specific container
  document.body.appendChild(card); // Adjust this line based on where you want to append the cards
}

// Take value created with the spoonSearchBtn click event and fetches the correct data.
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
      spoonFilteredRecipes.forEach((recipe) => {
        spoonCreateCard(recipe);
      });
    });
}

// This function creates a recipe card
function edamamCreateCard(recipe) {
  // Create a div element for the recipe card
  const card = document.createElement("div");
  card.classList.add("recipe-card");
  // Create an h2 element for the recipe name
  const recipeName = document.createElement("h2");
  recipeName.textContent = recipe.recipe.label; // not a name variable in JSON
  // Create a ul element for the ingredients list
  const ingredientsList = document.createElement("ul");
  // Iterate over the ingredients and create li elements for each
  recipe.recipe.ingredients.forEach((ingredient) => {
    const ingredientItem = document.createElement("li");
    ingredientItem.textContent = ingredient.food;
    ingredientsList.appendChild(ingredientItem);
  });
  // Append the recipe name and ingredients list to the card
  card.appendChild(recipeName);
  card.appendChild(ingredientsList);
  // Append the card to the document or a specific container
  document.body.appendChild(card); // Adjust this line based on where you want to append the cards
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
      let edamamFilteredRecipes = data.hits;
      console.log(edamamFilteredRecipes);
      edamamFilteredRecipes.forEach((recipe) => {
        edamamCreateCard(recipe);
      }); // Close the forEach function
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
