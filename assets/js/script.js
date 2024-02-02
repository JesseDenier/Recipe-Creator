// Saves the private API Key for spoonacular.
const spoonacularAPIKey = "de07b56c97684defbae6bc906f8a5352";

// Fetches data for recipes using the ingredient "apple."
// TODO: Replace "apple" with an array of ingredients entered in by the end user.
fetch(
  "https://api.spoonacular.com/recipes/findByIngredients?ingredients=apples&apiKey=" +
    spoonacularAPIKey
)
  // Converts that data into a JSON file which we can parse.
  .then(function (response) {
    return response.json();
  })
  // Prints the JSON data to the console.
  // TODO: Have the data create HTML elements instead of printing to the console.
  .then(function (data) {
    console.log(data);
  });
