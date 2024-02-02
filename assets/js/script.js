// Saves the private API Key and API Id for edamam.
const edamamAPIKey = "bcbb167d1766a0e612f1bb055f2ac680";
const edamamAPIId = "dc99804d";

// Fetches data for recipes using the ingredient "apple."
// TODO: Replace "apple" with an array of ingredients entered in by the end user.
fetch ("https://api.edamam.com/api/recipes/v2?type=public&q=apple&app_id=" + edamamAPIId + "&app_key=" + edamamAPIKey

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

