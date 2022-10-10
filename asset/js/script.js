// THIS IS CONTROLLER FILE (application logic file) TO HANDEL THE MVC (MODEL--VIEW--CONTROLLER) ARCHITECTURE

// FORKIFY APP CODE STARTS HERE -------------------------------------------------------------------------------------------------------------------------------

// API LINK GET FROM HERE -
// https://forkify-api.herokuapp.com/v2


// Adding dependencies named as - - - - "core-js" --version => "^3.25.4" and - - - -  "regenerator-runtime" --version => "^0.13.9" ---- to make sure our application works on all the type of web browsers
import "core-js/stable";
import "regenerator-runtime/runtime";


// IMPORTING NECESSARY MODULE FILES FOR CONTROLLER MANAGEMENT/APPLICATION BUILDING LOGIC

// IMPORTING EVERYTHING USING    *   -- (star) from model.js file
import * as model  from "./model.js";
import recipeView from "./View__JS__Elements/recipeView.js";
import ViewRecipe from "./View__JS__Elements/recipeView.js"; 
import SearchView from "./View__JS__Elements/searchView.js";
import SearchResultsView from "./View__JS__Elements/SearchResultsView.js";
import PaginationView from "./View__JS__Elements/PaginationView.js";
import BookmarkView from "./View__JS__Elements/BookmarkView.js";
import AddRecipesView from "./View__JS__Elements/AddRecipesView.js";
import { async } from "regenerator-runtime";


if(module.hot) {
    module.hot.accept();
}

// APP FUNCTIONALITY CODE STARTS HERE -----------------------------------------------------------------------------------------------------------------------------------------

// Doing AJAX API call to the Forkify API to GET data using async/await function

const RecipeController = async function () {
    try {
        let id = window.location.hash.slice(1);

        // Creating a guard clause ------ if #ID is nit their
        if(!id) return;

        // Adding Humbugger Spinner here for loading time of the API.....
        ViewRecipe.render__Before__Recipe__Load__Humberger__Spinner();

        // [NOTE ---- As loadRecipe is an async function thus, it returns an promise, hence, we must do an await for the promise to give a fullfilled result]
        await model.loadRecipe(id);

        // RENDERING RECIPE SECTION WITH API RECIPE RESULTS ----- recipe is now imported from model.js, thus using model.state.recipe for importing data
        ViewRecipe.renderRecipeData(model.state.recipe);
    }
    catch (err) {
        recipeView.renderErrorMSG(err); 
    }

};

// RecipeController();


const SearchResultsController = async function () {
    try {
        // Adding loading Spinner
        SearchResultsView.render__Before__Search__Result__Load__Humberger__Spinner();
        // console.log(SearchResultsView);

        //1. Get Search Query 
        const searchQuery = SearchView.getSearchQuery();

        // ADDING GUARD CLAUSE HERE--------------------------------------------
        if(!searchQuery) return;

        // 2. Load search results
        await model.loadSearchResults(searchQuery);

        // 3. Render search results
        // console.log(model.state.search.results);
        // SearchResultsView.renderRecipeData(model.state.search.results);
        SearchResultsView.renderRecipeData(model.getSearchResultsPage());

        // 4. Rendering and Implementing Pagination----
        PaginationView.renderRecipeData(model.state.search);
    }
    catch(err) {
        // console.log(err);
        recipeView.renderErrorMSG(err); 
    }
};

// Adding function for pagination
const ControlPagination = (gotoPageNumber) => {
    // console.log(gotoPageNumber);

     // 1. Render New / Next search results
    //  console.log(model.state.search.results);
     // SearchResultsView.renderRecipeData(model.state.search.results);
     SearchResultsView.renderRecipeData(model.getSearchResultsPage(gotoPageNumber));

     // 2. Rendering and Implementing New/Next Pagination buttons----
     PaginationView.renderRecipeData(model.state.search);
};


// Implementing updating servings 
const controlServings = function (newServings) {
    // Updating the servings in the state (model.state)
    model.updateServings(newServings);

    // Updating the recipe view
    ViewRecipe.renderRecipeData(model.state.recipe);
}


// IMPLEMENTING BOOKMARKS---------
const controllerAddBookmark = function () {
    // console.log(model.state.recipe.bookmarked);

    // 1. Add/Remove Bookmark
    if(!model.state.recipe.bookmarked) {
        model.addBookMarks(model.state.recipe);
    }  else {
        model.deleteBookmark(model.state.recipe.id);
    }

    // 2. Update recipe view
    // model.addBookMarks(model.state.recipe);
    // console.log(model.state.recipe);

    // 3. render bookmarks
    BookmarkView.renderRecipeData(model.state.bookmarks);
}


// Implementing Add Recipe controller method here----------------------------
// const controlAddRecipe = async function (newRecipe) {
//     try {
//         // Uploading new recipe data
//         await model.uploadRecipe(newRecipe);
//     }
//     catch(err) {
//         console.error("😀", err);
//         // AddRecipesView.renderErrorMSG(err.message);
//     }
// };

const controlBookmarks = function() {
    BookmarkView.renderRecipeData(model.state.bookmarks);
}

const init = () => {
    BookmarkView.addHandlerRenderBookmarksOnLoad(controlBookmarks);
    recipeView.addHandlerRenderMethod(RecipeController);
    recipeView.addHandlerUpdateServings(controlServings);
    recipeView.addHandlerAddBookmark(controllerAddBookmark);
    SearchView.addSearch__Handler(SearchResultsController);
    PaginationView.addHandlerClick(ControlPagination);
    // AddRecipesView.addHandlerUpload(controlAddRecipe);
};

init();


























// https://forkify-api.herokuapp.com/api/v2/recipes?search=pizza&key=25f00610-df42-4a42-aff4-362097c331b2
