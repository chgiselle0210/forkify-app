export const state = {
  recipe: {},
};

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

export const loadRecipe = async function (id) {
  try {
    const res = await Promise.race([
      fetch(`https://forkify-api.herokuapp.com/api/v2/recipes/${id}`),
      timeout(10),
    ]);

    if (!res.ok) throw new Error('Recipe not found');

    const data = await res.json();
    const { recipe } = data.data;

    state.recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
    };

    console.log(state.recipe);
  } catch (err) {
    throw err;
  }
};