// Links the HTML inputs and buttons to the JS.
const spoonIngredientInput = document.getElementById("spoonIngredientInput");
const spoonSearchBtn = document.getElementById("spoonRecipeSearchBtn");
const edamamIngredientInput = document.getElementById("edamamIngredientInput");
const edamamSearchBtn = document.getElementById("edamamRecipeSearchBtn");

// Initializes empty arrays.
let spoonIngredientArray = [];
let edamamIngredientArray = [];

// Saves personal API info.
const spoonacularAPIKey = "b1e8d5af6d6f4efaaa60746bf1c9cd8c";
const edamamAPIKey = "bcbb167d1766a0e612f1bb055f2ac680";
const edamamAPIId = "dc99804d";

// Removes all recipes from Spoon JSON data that have more than any missing ingredients.
function spoonFilterRecipes(data) {
  return data.filter(function (recipe) {
    return recipe.missedIngredients.length <= 0;
  });
}

// Creates recipe cards based on spoonFetch data.
function spoonCreateCard(recipe) {
  // Create a div element for the recipe card.
  const card = document.createElement("div");
  card.classList.add("recipe-card", "bg-red-200", "rounded-xl", "p-8", "mt-6","mb-12", "ml-12", "mr-12", "text-black");
  // Create an h2 element with the recipe name.
  const recipeName = document.createElement("h2");
  recipeName.textContent = "Recipe: " + recipe.title;
  recipeName.classList.add("text-2xl", "text-center", "underline");

  // Creates an h3 element with titling the ingredient list to go in recipe card.
  const ingredientListTitle = document.createElement("h3");
  ingredientListTitle.textContent = "Ingredients";
  ingredientListTitle.classList.add("text-lg", "text-pink-500", "underline");

  // Create a ul element for the ingredients list.
  const ingredientsList = document.createElement("ul");
  ingredientsList.classList.add("list-disc");

  // Iterate over the ingredients and create li elements for each.
  recipe.usedIngredients.forEach((ingredient) => {
    const ingredientItem = document.createElement("li");
    ingredientItem.textContent = ingredient.name;
    ingredientsList.appendChild(ingredientItem);
  });
  // Appends the recipe name and ingredients list to the card.
  card.appendChild(recipeName);
  card.appendChild(ingredientListTitle);
  card.appendChild(ingredientsList);
  // Append the card to the HTML.
  $("#spoonRecipes").append(card);
}

// Takes the value created with the spoonSearchBtn click event and fetches the correct data.
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
    // Calls "spoonFilterRecipes," then console logs the result, and then calls "spoonCreateCard" for each recipe.
    .then(function (data) {
      let spoonFilteredRecipes = spoonFilterRecipes(data).slice(0, 6);
      if (spoonFilteredRecipes.length === 0) {
        alert(
          "No recipes found. Please make sure each ingredient is spelled correctly and seperated by a comma and space."
        );
      }
      console.log(spoonFilteredRecipes);
      spoonFilteredRecipes.forEach((recipe) => {
        spoonCreateCard(recipe);
      });
    });
}

// Creates recipe cards based on edamamFetch data.
function edamamCreateCard(recipe) {
  // Create a linking anchor element.
  const link = document.createElement("a");
  link.href = recipe.recipe.url;
  link.target = "_blank";
  // Creates a div element for the recipe card to go in the anchor link.
  const card = document.createElement("div");
  card.classList.add("recipe-card", "bg-red-200", "rounded-xl", "p-8", "mt-6","mb-12", "ml-12", "mr-12", "text-black");
  // Creates an h2 element with the recipe name to go in recipe card.
  const recipeName = document.createElement("h2");
  recipeName.textContent = "Recipe: " + recipe.recipe.label;
  recipeName.classList.add("text-2xl", "text-center", "underline");

  // Creates an h3 element with titling the ingredient list to go in recipe card.
  const ingredientListTitle = document.createElement("h3");
  ingredientListTitle.textContent = "Ingredients";
  ingredientListTitle.classList.add("text-lg", "text-pink-500", "underline");

  // Creates a ul element for the ingredients list to get in recipe card.
  const ingredientsList = document.createElement("ul");
  ingredientsList.classList.add("list-disc");

  // Iterates over the ingredients and create li elements for each to get in ingredientsList.
  recipe.recipe.ingredients.forEach((ingredient) => {
    const ingredientItem = document.createElement("li");
    ingredientItem.textContent = ingredient.food;
    ingredientsList.appendChild(ingredientItem);
  });
  // Append the recipe name and ingredients list to the card.
  card.appendChild(recipeName);
  card.appendChild(ingredientListTitle);
  card.appendChild(ingredientsList);
  // Append the card into the anchor element.
  link.appendChild(card);
  // Append the anchor element to the HTML.
  $("#edamamRecipes").append(link);
}

// Takes the value created with the edamamSearchBtn click event and fetches the correct data.
function edamamFetch() {
  // Converts ingredientArray into a single string with the correct punctuation between each ingredient to be inserted as an API fetch parameter.
  let edamamIngredientString = edamamIngredientArray.map(String).join("%2C%20");
  // Fetches data for recipes within the following parameters:
  // Only find public recipes.
  // Recipes need to involve the ingredient user inputed.
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
    //Console logs the result, and then calls "edamamCreateCard" for each recipe.
    .then(function (data) {
      let edamamFilteredRecipes = data.hits.slice(0, 6);
      if (edamamFilteredRecipes.length === 0) {
        alert(
          "No recipes found. Please make sure each ingredient is spelled correctly and seperated by a comma and space."
        );
      }
      console.log(edamamFilteredRecipes);
      edamamFilteredRecipes.forEach((recipe) => {
        edamamCreateCard(recipe);
      });
    });
}

const spoonOptionBtn = document.getElementById("spoonOptionBtn");
const edamamOptionBtn = document.getElementById("edamamOptionBtn");

// Event listeners for selection buttons in the pop-up window
spoonOptionBtn.addEventListener("click", function () {
  document.querySelector("#spoon-side").style.display = "block";
  document.querySelector("#edamam-side").style.display = "none";
  $("#popup").hide(); // This will make the pop-up dissapear after selection
});

edamamOptionBtn.addEventListener("click", function () {
  document.querySelector("#spoon-side").style.display = "none";
  document.querySelector("#edamam-side").style.display = "block";
  $("#popup").hide(); // This will make the pop-up dissapear after selection
});

// Creates an interactive welcome message on page load and offers the user 2 options for the use of the website
$(document).ready(function () {
  $("#popup").show();
  $("#closePopup").click(function () {
    $("#popup").hide();
  });
});

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
