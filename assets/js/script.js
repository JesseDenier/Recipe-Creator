// TODO: Create a function that starts on search button click, and turns the user input into an array, which can be referenced by edamam and spoonacular js.
let submitB = document.getElementById("recipeSearchBtn")
let inputB = document.getElementById("ingredientInput")
let arrayB = []
submitB.addEventListener("click",function(){
    
    let inputValue = inputB.value
    let inputValueB = inputValue.split(" ")
    console.log("hello",inputValueB)
})