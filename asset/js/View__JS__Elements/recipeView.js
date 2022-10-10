// Making classes for implementing a structured method to make the view recipe function and method and exporting it

// IMPORTING LIBRARIES
// import {Fraction} from "fractional";
import fracty from "fracty";
import View from "./View.js";

// Importing images and icons 

import Clock_Icon from 'url:../../img/clock__icon.png';
import User_Icon from 'url:../../img/user__icon.png';
import Plus_Icon from 'url:../../img/Plus__icon.png';
import Minus_Icon from 'url:../../img/minus__icon.png';
import Bookmark_Icon from 'url:../../img/bookmark__icon.png';
import Bookmark_Icon_part_2 from  'url:../../img/bookmark__icon__part2.png';
import Tick_Icon from 'url:../../img/checked__icon.png'; 
import Right_Arrow_Icon from 'url:../../img/right__icon.png';
// import Error_Icon from 'url:../../img/caution__icon.png';

// Importing images and icons 

// import Humberger_Spinner from 'url:../../img/hambuger__new__spinner__icon.gif';

class ViewRecipe extends View {

    // Creating a private parent class for ".recipe" HTML class element
    _parentElement = document.querySelector('.recipe');
    _errorMessage = "Sorry!! No recipes found for your query. Please try something else!!";
    _message = " ";
  

    //Creating event listeners and Listening to the search results for "RECIPE -- ID" changes and changing on load event as well

    addHandlerRenderMethod(handler) {
        ['hashchange', 'load'].forEach(event => {
            window.addEventListener(event, handler);
        });
    }

    // Implementing servings changes
    addHandlerUpdateServings(handler) {
        this._parentElement.addEventListener("click", (e) => {
            const button = e.target.closest(".btn--increase-servings");

            // Adding guard clause
            if(!button) return;

            // Adding + sign in front for converting into a number----
            const updateTo = +button.dataset.updateTo;
            // console.log(updateTo);
            // console.log("Button clicked", button);
            if(updateTo > 0) {
                handler(updateTo);
            }
        })
    }

    // Implementing Bookmarks 
    addHandlerAddBookmark (handler) {
        this._parentElement.addEventListener("click", (e) => {
            
            // Adding event delegation here----
            const button = e.target.closest(".btn-bookmark");
            if(!button) return;
            // else => call handler();
            handler();
        } )
    }

    // Method for rendering Recipe to HTML

    _renderingRecipeToHTML() {

        // Rendering -- html -- markup
        return ( `
            <figure class="recipe__fig">
                <img src="${this._recipe.imageURL}" alt="${this._recipe.title}" class="recipe__img">
                <h1 class="recipe__title"><span class="recipe__title__span">${this._recipe.title ? this._recipe.title : ""}</span></h1>
            </figure> 

            <div class="recipe__details">
                <div class="recipe__info recipe__timer__here contents__part__1" title="Estimated time taken for this recipe">
                    <img src="${Clock_Icon}" class="recipe__info-icon recipe__details__icon" alt="Clock">
                    <span class="recipe__info-data recipe__info-data--minutes">${this._recipe.cookingTime ? this._recipe.cookingTime : ""}</span>
                    <span class="recipe__info-text">minutes</span>
                </div>

                <div class="recipe__info gap__inBetween servings__here contents__part__2" title="Total number of servings">
                    <img src="${User_Icon}" class="recipe__info-icon recipe__details__icon" alt="User">
                    <span class="recipe__info-data recipe__info-data--people">${this._recipe.servings ? this._recipe.servings : ""}</span>
                    <span class="recipe__info-text">servings</span>
                </div>

                <div class="recipe__info-buttons gap__inBetween cursor increase__decrease__servings__here contents__part__1">
                    <img src="${Plus_Icon}" class="recipe__details__icon img-fluid  btn--tiny btn--increase-servings" alt="Plus" title="Click to increase servings" data-update-to="${this._recipe.servings + 1}" >
                    <img src="${Minus_Icon}" class="recipe__details__icon img-fluid  btn--tiny btn--increase-servings" alt="MInus" title="Click to decrease servings" data-update-to="${this._recipe.servings - 1}">
                </div>

                <div class="Bookmark__icon gap__inBetween cursor bookmark__icon__here contents__part__2">
                    <img src="${Bookmark_Icon}" class="recipe__details__icon btn--round btn-bookmark" alt="Bookmark" title="${"Click to bookmark this recipe"}">
                </div>
            </div>

            <div class="recipe__ingredients">
                <h2 class="heading--2">Recipe ingredients</h2>
                <ul class="recipe__ingredient-list">

                    ${this._recipe.ingredients.map(this._generateRecipeIngredients).join(' ')}
                
                </ul>
            </div>

            <div class="recipe__directions">
                <h2 class="heading--2">How to cook this recipe?</h2>
                <p class="recipe__directions-text">This recipe was carefully designed and tested by <span class="recipe__publisher"> ${this._recipe.publisher ? this._recipe.publisher : ""} </span>. Please check out the directions to make this recipe from their website.</p>
                <a class="btn--small recipe__btn" href="${this._recipe.sourceURL ? this._recipe.sourceURL : ""}" target="_blank"><span class="website__link__span">Directions <img src="${Right_Arrow_Icon}" class="search__icon"></span></a>
            </div>
        `);  
    }

    _generateRecipeIngredients(element) {
        return `
            <li class="recipe__ingredient">
                <img src="${Tick_Icon}" class="recipe__icon" alt="Tick">
                <div class="recipe__quantity">${element.quantity ? fracty(element.quantity) : ""}</div>
                <div class="recipe__description">
                    <span class="recipe__unit">${element.unit ? element.unit : ""}</span>
                    <span class="recipe__unit__part__2">${element.description ? element.description : ""}</span>
                </div>
            </li>
        `;
    }

   
}

export default new ViewRecipe();

