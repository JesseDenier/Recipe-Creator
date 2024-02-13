// Initializes empty arrays.
let spoonIngredientArray = [];
let edamamIngredientArray = [];

// Saves personal API info.
const spoonacularAPIKey = "b1e8d5af6d6f4efaaa60746bf1c9cd8c";
const edamamAPIKey = "bcbb167d1766a0e612f1bb055f2ac680";
const edamamAPIId = "dc99804d";

// Functions that show only 1 "side" of the site at a time.
function showModal() {
  $("#spoon-side").hide();
  $("#edamam-side").hide();
  $("#popup").show();
}
function showSpoon() {
  $("#spoon-side").show();
  $("#edamam-side").hide();
  $("#popup").hide();
}
function showEdamam() {
  $("#spoon-side").hide();
  $("#edamam-side").show();
  $("#popup").hide();
}

// Links function that shows/hides HTML elements to page load.
$(document).ready(showModal);
// Links functions that show/hide HTML elements to respective click events.
$("#spoonOptionBtn").on("click", showSpoon);
$("#edamamOptionBtn").on("click", showEdamam);
$("#edamamBackBtn").on("click", showSpoon);
$("#spoonBackBtn").on("click", showEdamam);

// Updates the Spoon dropdown with values from spoonIngredientArray
function updateSpoonDropdown() {
  const dropdown = document.getElementById("ingredientDropdown");
  dropdown.innerHTML = ""; // Clear existing options
  // Re-populate the dropdown
  spoonIngredientArray.forEach((ingredient) => {
    const option = document.createElement("option");
    option.value = ingredient;
    option.textContent = ingredient;
    dropdown.appendChild(option);
  });
}

// Updates the Edamam dropdown with values from edamamIngredientArray
function updateEdamamDropdown() {
  const dropdown = document.getElementById("ingredientShopDropdown");
  dropdown.innerHTML = ""; // Clear existing options
  edamamIngredientArray.forEach((ingredient) => {
    const option = document.createElement("option");
    option.value = ingredient;
    option.textContent = ingredient;
    dropdown.appendChild(option);
  });
}

// Pulls arrays from localStorage on load and then calls the update dropdown functions.
document.addEventListener("DOMContentLoaded", function () {
  spoonIngredientArray =
    JSON.parse(localStorage.getItem("spoonIngredientArray")) || [];
  edamamIngredientArray =
    JSON.parse(localStorage.getItem("edamamIngredientArray")) || [];
  updateSpoonDropdown();
  updateEdamamDropdown();
});

// Removes all recipes from Spoon JSON data that have more than any missing ingredients.
function spoonFilterRecipes(data) {
  return data.filter(function (recipe) {
    return recipe.missedIngredients.length <= 0;
  });
}

// Creates recipe cards based on spoonFetch data.
function spoonCreateCard(recipe) {
  // Creates a div element for the recipe card.
  const card = $("<div>").addClass(
    "recipe-card bg-red-200 rounded-xl p-8 mt-6 mb-12 ml-12 mr-12 text-black"
  );
  // Creates an h2 element with the recipe name.
  const recipeName = $("<h2>")
    .text("Recipe: " + recipe.title)
    .addClass("text-2xl text-center underline");
  // Creates an h3 element with titling the ingredient list to go in recipe card.
  const ingredientListTitle = $("<h3>")
    .text("Ingredients")
    .addClass("text-lg text-pink-500 text-left");
  // Creates a ul element for the ingredients list.
  const ingredientList = $("<ul>").addClass("text-left");
  // Iterates over the ingredients and create li elements for each.
  recipe.usedIngredients.forEach((ingredient) => {
    const ingredientItem = $("<li>").text(ingredient.name);
    ingredientList.append(ingredientItem);
  });
  // Appends the recipe name and ingredients list to the card.
  card.append(recipeName, ingredientListTitle, ingredientList);
  // Appends the card to the HTML.
  $("#spoonRecipes").append(card);
}

// Takes the value created with the spoonSearchBtn click event and fetches the correct data.
function spoonFetch() {
  // Gets new ingredients from the Spoonacular text area input.
  let newIngredients = $("#spoonIngredientInput").val().split(", ");
  // Converts the new ingredients into a string for the API call.
  let spoonIngredientString = newIngredients.map(String).join(",+");
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
      // Removes all content from spoonRecipes so it can be replaced.
      $("#spoonRecipes").empty();
      spoonFilteredRecipes.forEach((recipe) => {
        spoonCreateCard(recipe);
      });
    });
}

// Attaches a click event to Spoon Search Button.
$("#spoonSearchBtn").on("click", function () {
  // Retrieve or initialize the array from local storage.
  spoonIngredientArray =
    JSON.parse(localStorage.getItem("spoonIngredientArray")) || [];
  // Get new ingredients from input.
  let newIngredients = $("#spoonIngredientInput").val().split(", ");
  // Add new ingredients to the array and remove duplicates.
  spoonIngredientArray = [
    ...new Set(spoonIngredientArray.concat(newIngredients)),
  ];
  // Update local storage.
  localStorage.setItem(
    "spoonIngredientArray",
    JSON.stringify(spoonIngredientArray)
  );
  // Update dropdown with new values.
  updateSpoonDropdown();
  // Call the Fetch function.
  spoonFetch();
});

// Creates recipe cards based on edamamFetch data.
function edamamCreateCard(recipe) {
  // Create a linking anchor element.
  const link = $("<a>").attr({
    href: recipe.recipe.url,
    target: "_blank",
  });
  // Creates a div element for the recipe card to go in the anchor link.
  const card = $("<div>").addClass(
    "recipe-card bg-red-200 rounded-xl p-8 mt-6 mb-12 ml-12 mr-12 text-black"
  );
  // Creates an h2 element with the recipe name to go in recipe card.
  const recipeName = $("<h2>")
    .text("Recipe: " + recipe.recipe.label)
    .addClass("text-2xl text-center underline");
  // Creates an h3 element with titling the ingredient list to go in recipe card.
  const ingredientListTitle = $("<h3>")
    .text("Ingredients")
    .addClass("text-lg text-pink-500 text-left");
  // Creates a ul element for the ingredients list to get in recipe card.
  const ingredientList = $("<ul>").addClass("text-left");
  // Iterates over the ingredients and create li elements for each to get in ingredientList.
  recipe.recipe.ingredients.forEach((ingredient) => {
    const ingredientItem = $("<li>").text(ingredient.food);
    ingredientList.append(ingredientItem);
  });
  // Appends the recipe name and ingredients list to the card.
  card.append(recipeName, ingredientListTitle, ingredientList);
  // Appends the card into the anchor element.
  link.append(card);
  // Appends the anchor element to the HTML.
  $("#edamamRecipes").append(link);
}

// Takes the value created with the edamamSearchBtn click event and fetches the correct data.
function edamamFetch() {
  // Get new ingredients from the Edamam text area input.
  let newIngredients = $("#edamamIngredientInput").val().split(", ");
  // Convert the new ingredients into a string for the API call.
  let edamamIngredientString = newIngredients.map(String).join("%2C%20");
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
      // Removes all content from edamamRecipes so it can be replaced.
      $("#edamamRecipes").empty();
      edamamFilteredRecipes.forEach((recipe) => {
        edamamCreateCard(recipe);
      });
    });
}

$("#edamamSearchBtn").on("click", function () {
  edamamIngredientArray =
    JSON.parse(localStorage.getItem("edamamIngredientArray")) || [];
  let newIngredients = $("#edamamIngredientInput").val().split(", ");
  edamamIngredientArray = [
    ...new Set(edamamIngredientArray.concat(newIngredients)),
  ];
  localStorage.setItem(
    "edamamIngredientArray",
    JSON.stringify(edamamIngredientArray)
  );
  updateEdamamDropdown();
  edamamFetch();
});

// Attaches a change event listener to both dropdowns.
document
  .getElementById("ingredientDropdown")
  .addEventListener("change", function () {
    // Get the selected value
    var selectedIngredient = this.value;
    // Get the current content of the textarea
    var currentText = document.getElementById("spoonIngredientInput").value;
    // Append the selected ingredient to the textarea content
    // You can modify the format of how it's appended as needed
    if (currentText.length > 0) {
      currentText += ", ";
    }
    currentText += selectedIngredient;
    // Update the textarea with the new content
    document.getElementById("spoonIngredientInput").value = currentText;
  });
document
  .getElementById("ingredientShopDropdown")
  .addEventListener("change", function () {
    // Get the selected value
    var selectedIngredient = this.value;
    // Get the current content of the Edamam textarea
    var currentText = document.getElementById("edamamIngredientInput").value;
    // Append the selected ingredient to the textarea content
    if (currentText.length > 0) {
      currentText += ", ";
    }
    currentText += selectedIngredient;
    // Update the textarea with the new content
    document.getElementById("edamamIngredientInput").value = currentText;
  });
