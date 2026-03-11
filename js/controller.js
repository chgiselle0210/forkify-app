const recipeContainer = document.querySelector('.recipe');

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const generateMarkupIngredient = function (ingredient) {
  return `
    <li class="recipe__ingredient">
      <svg class="recipe__icon">
        <use href="./img/icons.svg#icon-check"></use>
      </svg>
      <div class="recipe__quantity">${ingredient.quantity ?? ''}</div>
      <div class="recipe__description">
        <span class="recipe__unit">${ingredient.unit ?? ''}</span>
        ${ingredient.description}
      </div>
    </li>
  `;
};

const showRecipe = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;

    recipeContainer.innerHTML = `
      <div class="spinner">
        <svg>
          <use href="./img/icons.svg#icon-loader"></use>
        </svg>
      </div>
    `;

    const res = await Promise.race([
      fetch(`https://forkify-api.herokuapp.com/api/v2/recipes/${id}`),
      timeout(10),
    ]);

    if (!res.ok) throw new Error('Recipe not found');

    const data = await res.json();
    const { recipe } = data.data;

    const recipeData = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
    };

    console.log(recipeData);

    recipeContainer.innerHTML = `
      <figure class="recipe__fig">
        <img src="${recipeData.image}" alt="${recipeData.title}" class="recipe__img" />
        <h1 class="recipe__title">
          <span>${recipeData.title}</span>
        </h1>
      </figure>

      <div class="recipe__details">
        <div class="recipe__info">
          <svg class="recipe__info-icon">
            <use href="./img/icons.svg#icon-clock"></use>
          </svg>
          <span class="recipe__info-data recipe__info-data--minutes">${recipeData.cookingTime}</span>
          <span class="recipe__info-text">minutes</span>
        </div>

        <div class="recipe__info">
          <svg class="recipe__info-icon">
            <use href="./img/icons.svg#icon-users"></use>
          </svg>
          <span class="recipe__info-data recipe__info-data--people">${recipeData.servings}</span>
          <span class="recipe__info-text">servings</span>
        </div>
      </div>

      <div class="recipe__ingredients">
        <h2 class="heading--2">Recipe ingredients</h2>
        <ul class="recipe__ingredient-list">
          ${recipeData.ingredients.map(generateMarkupIngredient).join('')}
        </ul>
      </div>

      <div class="recipe__directions">
        <h2 class="heading--2">How to cook it</h2>
        <p class="recipe__directions-text">
          This recipe was carefully designed and tested by
          <span class="recipe__publisher">${recipeData.publisher}</span>. Please check out
          directions at their website.
        </p>
        <a
          class="btn--small recipe__btn"
          href="${recipeData.sourceUrl}"
          target="_blank"
        >
          <span>Directions</span>
          <svg class="search__icon">
            <use href="./img/icons.svg#icon-arrow-right"></use>
          </svg>
        </a>
      </div>
    `;
  } catch (err) {
    console.error(err);

    recipeContainer.innerHTML = `
      <div class="error">
        <div>
          <svg>
            <use href="./img/icons.svg#icon-alert-triangle"></use>
          </svg>
        </div>
        <p>Could not load the recipe. Please try again.</p>
      </div>
    `;
  }
};

window.addEventListener('hashchange', showRecipe);
window.addEventListener('load', showRecipe);