// Creating a parent class for all the rendering of the view elements 

import Error_Icon from 'url:../../img/caution__icon.png';

// Importing images and icons 
import Humberger_Spinner from 'url:../../img/hambuger__new__spinner__icon.gif';

export default class view {
    _errorMessage = "Sorry!! No recipes found for your query. Please try something else!!";
    _message = " ";
    _recipe;


    /**
     * Render the received object to the DOM
     * @param {object | object[]} data The data to be rendered (eg: recipe)
     * @param {boolean} [render = true] If false, create markup string instead of rendering to the DOM
     * @returns {undefined | string} A markup string is returned if render = false
     * @this {object} View Instance
     * @author Utkarsh 
     * @todo Implement adding user recipes to the API servers
     */


    // constructor function here
    renderRecipeData (recipe) {
        // Checking if data is null or not and also, if data is an empty array or not!!
        if(!recipe || (Array.isArray(recipe) && recipe.length === 0)) {
            return this.renderErrorMSG();
        }

        this._recipe = recipe;
        const markup = this._renderingRecipeToHTML();
        this._clearHTML();

        // Adding Recipe HERE
        this._parentElement.insertAdjacentHTML('afterbegin', markup);
    }

    // Method for clearing HTML

    _clearHTML() {
        this._parentElement.innerHTML = " ";
    }

     //Creating the Humbugger Spinner Icon for before recipe loading

    render__Before__Recipe__Load__Humberger__Spinner () {
        const HTML = `
            <div class="spinner">
                <img src="${Humberger_Spinner}" class="spinner__icon" alt="spinner">
            </div>
        `;

        this._clearHTML();
        this._parentElement.insertAdjacentHTML('afterbegin', HTML);
    }

    render__Before__Search__Result__Load__Humberger__Spinner () {
        const NEW__HTML = `
            <div class="spinner__new__here">
                <img src="${Humberger_Spinner}" class="spinner__icon" alt="spinner">
            </div>
        `;

        this._clearHTML();
        this._parentElement.insertAdjacentHTML('afterbegin', NEW__HTML);
    }

    renderErrorMSG (message = this._errorMessage) {
        const HTML = `
            <div class="recipe">
                <div class="error">
                     <p class="Error__msg Smiley__message">${message}</p>
                </div>
            </div>
        `;

        this._clearHTML();
        this._parentElement.insertAdjacentHTML('afterbegin', HTML);
    }

    renderSuccessMSG (message = this._message) {
        const HTML = `
            <div class="recipe">
                <div class="error">
                    <div class="Caution__icon smiley__icon">
                        <img src="${Error_Icon}" class="caution__icon nav__icon" alt="Caution">
                    </div>
                     <p class="Error__msg Smiley__message">${message}</p>
                </div>
            </div>
        `;

        this._clearHTML();
        this._parentElement.insertAdjacentHTML('afterbegin', HTML);
    }

    // Error message for recipe search results
    // renderRecipeSearchResultsMessage (message = this._errorMessage) {
    //     const HTML = `
    //         <div class="recipe__error">
    //             <div class="Caution__icon smiley__icon">
    //             <img src="${Error_Icon}" class="caution__icon__new__here" alt="Caution">
    //             </div>
    //             <p class="Error__msg__for__recipe__results Smiley__message">${message}</p>
    //         </div>
    //     `;

    //     this._clearHTML();
    //     this._parentElement.insertAdjacentHTML('afterbegin', HTML);
    // }


    // Creating this update method for updating all the ingredients on servings click

    // update(servingsData) {
    //     if(!servingsData || (Array.isArray(servingsData) && servingsData.length === 0)) {
    //         return this.renderErrorMSG();
    //     }

    //     this.servingsData = servingsData;
    //     const NEWmarkup = this._renderingRecipeToHTML();

    //     // Making a new virtual DOM which is not in the DOM tree but, is in the DOM memory
    //     const newDom = document.createRange().createContextualFragment(NEWmarkup);
    //     const newElements = Array.from(newDom.querySelectorAll("*"));
    //     const currentElements = Array.from(this._parentElement.querySelectorAll("*"));
    //     console.log(newElements);
    //     console.log(currentElements);
    // }
}