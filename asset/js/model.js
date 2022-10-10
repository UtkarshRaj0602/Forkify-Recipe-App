// HERE IN THE MODEL.JS FILE WE ARE CREATING THE BUSINESS LOGIC, STATE (for managing data storage and management), HTTP LIBRARY (fetch API, etc.).

import { async } from "regenerator-runtime"

import {Get_Recipe_API_URL, ShowSearchResultsPerPage, KEY} from './configure.js';

import {getJSON, sendJSON} from "./helperScript.js";

// EXPORTING STATE (for state management ---- data storage)

export const state = {
    recipe: {},
    search: {
        Recipe__Search__Query__Data: " ",
        results: [],
        // Setting page number 1 by default
        page: 1,
        ShowResultsPerPage: ShowSearchResultsPerPage,
    },
    bookmarks: [],
}

//EXPORTING LOAD RECIPE (for http library ----- fetching data from API's)

export const loadRecipe = async (id) => {
    try{
            const DATA = await getJSON(`${Get_Recipe_API_URL}${id}`);

            // Creating a destructing in order to unpack the recipe object received from the API, so that it can create a [key = value] pair.
            let {recipe} = DATA.data;
            state.recipe = {
                id: recipe.id,
                title: recipe.title,
                publisher: recipe.publisher,
                imageURL: recipe.image_url,
                servings: recipe.servings,
                sourceURL: recipe.source_url,
                ingredients: recipe.ingredients, 
                cookingTime: recipe.cooking_time
            };

            // Setting bookmarks to either true or false for future use
            if(state.bookmarks.some(bookmark => bookmark.id === id)){
                state.recipe.bookmarked = true;
            }
            else{
                state.recipe.bookmarked = false;
            }

            // console.log(state.recipe);
        }
    catch (error) {
        // HANDLING ALL THE ERRORS HERE OF THE WHOLE APP.............
        throw error;
    }
};


// Making Search Results Section Here................................

export const loadSearchResults = async function(Search__Query) {
    try {
        //Seeing which recipe item is searched highest
        state.search.Search__Query = Search__Query;
        const Recipe__Search__Query__Data = await getJSON(`${Get_Recipe_API_URL}?search=${Search__Query}`);

        state.search.results = Recipe__Search__Query__Data.data.recipes.map(RecipeQuery => {
            return {
                id: RecipeQuery.id,
                title: RecipeQuery.title, 
                imageURL: RecipeQuery.image_url,
                publisher: RecipeQuery.publisher,
            };
        });

        state.search.page = 1;
    }
    catch (error) {
        // HANDLING ALL THE ERRORS HERE OF THE WHOLE APP.............
        console.error(`${error} 😀😀`);
        throw error;
    }
};

// IMPLEMENTING PAGINATION HERE -------------------------------------------------------------------------------------------------------------------------

export const getSearchResultsPage = (page = state.search.page) => {

    // For remembering which page number this is currently..................
    state.search.page = page;

    const start__page_count = (page - 1) * state.search.ShowResultsPerPage;               //Search Result at 0
    const end__page__count = page * state.search.ShowResultsPerPage;                     //Search Result at 12

    return state.search.results.slice(start__page_count, end__page__count);
}


// Implementing update servings functions

export const updateServings = (newServings) => {
    state.recipe.ingredients.forEach(element => {
        // NewQuantity = (oldQuantity * newQuantity) / oldServings -------------------- FORMULA
        element.quantity = (element.quantity * newServings) / state.recipe.servings;
    });

    state.recipe.servings = newServings;
} 


// Implementing Adding Bookmarks
export const addBookMarks = function (recipe) {

    // Pushing the current recipe to bookmark it-----
    state.bookmarks.push(recipe);

    // Mark current recipe as bookmark
    if(recipe.id === state.recipe.id) {
        state.recipe.bookmarked = true;
    }

    persistBookmarks();
};


// Adding Delete bookmark
export const deleteBookmark = function (id) {
    
    // Popping/removing the current recipe
    const index = state.bookmarks.findIndex(element => element.id === id);
    state.bookmarks.splice(index, 1);
    
    // Mark current recipe as bookmark
    if(id === state.recipe.id) {
        state.recipe.bookmarked = false;
    }

    persistBookmarks();
}

// export const uploadRecipe = async function(newRecipe) {
//     try{
//         // console.log(Object.entries(newRecipe));
//         const ingredients = Object.entries(newRecipe).filter(entry => entry[0].startsWith('ingredient') && entry[1] !== " ").map(ingredients => {
//             const ingredientArray = ingredients[1].replaceAll(" ", "").split(",");
//             // if(ingredientArray !== 3) throw new Error("Wrong Ingredient Format");
//             const [quantity, unit, description] = ingredientArray;
//             return {quantity : quantity ? +quantity : null, unit, description};
//         });
//         console.log(ingredients);

//         const recipe = {
//             title: newRecipe.title,
//             source_url: newRecipe.source_url,
//             image_url: newRecipe.image,
//             publisher: newRecipe.publisher,
//             cooking_time: +newRecipe.cookingTime,
//             servings: +newRecipe.servings,
//             ingredients,
//         }

//         // console.log(recipe);

        
//        const data = sendJSON(`${Get_Recipe_API_URL}?key=${KEY}`, recipe);
//        console.log(data);
//     }
//     catch(err){
//         throw err;
//     }
// } 


// Storing bookmarks to local storage and loading bookmarks to local storage
const persistBookmarks = function () {
    localStorage.setItem("bookmarks", JSON.stringify(state.bookmarks));
};

const init = function () {
    // Getting item from local storage 
    const storage = localStorage.getItem("bookmarks");
    // Checking if there is any bookmarks items in the local storage and if yes then converting it back to normal format by parsing it....
    if(storage) {
        state.bookmarks = JSON.parse(storage);
    }
};

init();
// console.log(state.bookmarks);


// CLEARING BOOKMARKS ---- FOR DEVELOPMENT USE ONLY 
// const clearBookmarks = function () {
//     localStorage.clear("bookmarks");
// };

// clearBookmarks();