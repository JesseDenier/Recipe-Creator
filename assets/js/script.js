// TODO: Create a function that starts on search button click, and turns the user input into an array, which can be referenced by edamam and spoonacular js.

// Refrence the button that had the ID recipeSearchBtn
let searchBtn = document.getElementById("recipeSearchBtn")
// Refrence the input that had the ID ingredientInput
let userIngredientInput = document.getElementById("ingredientInput")
// Initialized an empty array
let ingredientArray = []

// Attached a click event to searchBtn
searchBtn.addEventListener("click",function(){
    // Saved the value of the input to the variable inputValue
    let inputValue = userIngredientInput.value
    // Converted the string inputValue to an array; ingredientArray
    ingredientArray = inputValue.split(", ")
    console.log("hello",ingredientArray)
})