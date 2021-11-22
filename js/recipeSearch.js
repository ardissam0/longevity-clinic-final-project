const searchForm = document.querySelector(".search-form-recipe");
const searchResultDiv = document.querySelector(".search-result");
const container = document.querySelector(".search-container");
let searchQuery = "";
const APP_ID = "068048f9";
const APP_key = "32548c97588dabacac6841f3df1e5690";
searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  searchQuery = e.target.querySelector("input").value;
  fetchAPI();
});

async function fetchAPI() {
    const baseURL = `https://api.edamam.com/search?q=${searchQuery}&app_id=${APP_ID}&app_key=${APP_key}&from=0&to=20`;
    const response = await fetch(baseURL);
    const data = await response.json();
    generateHTML(data.hits);
    console.log(data);
  }
  
  function generateHTML(results) {
    container.classList.remove("initial");
    let generatedHTML = "";
    results.map((result) => {
      generatedHTML += `
        <div class="item">
          <img src="${result.recipe.image}" alt="img">
          <div class="flex-container">
            <h1 class="title">${result.recipe.label}</h1>
            <a class="view-btn" target="_blank" href="${
              result.recipe.url
            }">View Recipe</a>
            <p class="item-data-calories">${result.recipe.calories.toFixed(0)} calories</p>
          </div>
          <div class="recipe-data-div">
          <ul class="nutrient-list"> 
            <li>Carbs: ${result.recipe.totalNutrients.CHOCDF.quantity.toFixed(1)}${result.recipe.totalNutrients.CHOCDF.unit}</li>
            <li>Fat: ${result.recipe.totalNutrients.FAT.quantity.toFixed(1)}${result.recipe.totalNutrients.FAT.unit}</li>
            <li>Protein: ${result.recipe.totalNutrients.PROCNT.quantity.toFixed(1)}${result.recipe.totalNutrients.PROCNT.unit}</li>
            <li>Sodium: ${result.recipe.totalNutrients.NA.quantity.toFixed(1)}${result.recipe.totalNutrients.NA.unit}</li>
            <li>Sugar: ${result.recipe.totalNutrients.SUGAR.quantity.toFixed(1)}${result.recipe.totalNutrients.SUGAR.unit}</li>
            <li>Fiber: ${result.recipe.totalNutrients.FIBTG.quantity.toFixed(1)}${result.recipe.totalNutrients.FIBTG.unit}</li>
            <li>Iron: ${result.recipe.totalNutrients.FE.quantity.toFixed(1)}${result.recipe.totalNutrients.FE.unit}</li>
            <li>CA: ${result.recipe.totalNutrients.CA.quantity.toFixed(1)}${result.recipe.totalNutrients.CA.unit}</li>
            <li>Vitamin A: ${result.recipe.totalNutrients.VITA_RAE.quantity.toFixed(1)}${result.recipe.totalNutrients.VITA_RAE.unit}</li>
            <li>Vitamin C: ${result.recipe.totalNutrients.VITC.quantity.toFixed(1)}${result.recipe.totalNutrients.VITC.unit}</li>
            <li>Vitamin D: ${result.recipe.totalNutrients.VITD.quantity.toFixed(1)}${result.recipe.totalNutrients.VITD.unit}</li>
            <li>Zinc: ${result.recipe.totalNutrients.ZN.quantity.toFixed(1)}${result.recipe.totalNutrients.ZN.unit}</li>
          </ul>
          <hr>
          <p class="item-data">Health labels: ${result.recipe.healthLabels.join(", ")}</p>
          </div>
        </div>
      `;
    });
    searchResultDiv.innerHTML = generatedHTML;
}