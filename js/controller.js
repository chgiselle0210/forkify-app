import 'core-js/stable';
import 'regenerator-runtime/runtime';
import * as model from './model.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import recipeView from './views/recipeView.js';
import paginationView from './views/paginationView.js';


const controlRecipes = async function () {
  const id = window.location.hash.slice(1);
  if (!id) return;

  recipeView.renderSpinner();
  await model.loadRecipe(id);
  recipeView.render(model.state.recipe);
};

const controlSearchResults = async function () {
  const query = searchView.getQuery();
  if (!query) return;

  resultsView.renderSpinner();

  await model.loadSearchResults(query);

  resultsView.render(model.getSearchResultsPage(1));

  paginationView.render(model.state.search);
};

const controlPagination = function (goToPage) {
  resultsView.render(model.getSearchResultsPage(goToPage));
  paginationView.render(model.state.search);
};

const init = function () {
  searchView.addHandlerSearch(controlSearchResults);
  recipeView.addHandlerRender(controlRecipes);
  paginationView.addHandlerClick(controlPagination);
};

init();