import View from './View.js';

class AddRecipeView extends View{ 
    // Creating protected class variables here......................
    _parentElement = document.querySelector('.upload');

    _window = document.querySelector(".add-recipe-window");
    _overlay = document.querySelector(".overlay");
    _buttonOpen = document.querySelector(".nav__btn--add-recipe");
    _buttonClose = document.querySelector(".btn--close-modal");

    constructor() {
        super(); 
        this._addHandlerShowWindow();
        this._addHandlerHideWindow();
    }

    toggleWindow() {
        this._overlay.classList.toggle('hidden');
        this._window.classList.toggle("hidden");
    }

    _addHandlerShowWindow() {
        this._buttonOpen.addEventListener("click", this.toggleWindow.bind(this));
    }

    _addHandlerHideWindow() {
        this._buttonClose.addEventListener("click", this.toggleWindow.bind(this));
        this._overlay.addEventListener("click", this.toggleWindow.bind(this));
    }

    addHandlerUpload(handler) {
        // this._parentElement.addEventListener("submit", function(event) {
        //     event.preventDefault();
            
        //     // Adding up the form element here and using FormData method here to submit forms
        //     const dataArray = [...new FormData(this)];
        //     const data = Object.fromEntries(dataArray);
        //     handler(data);
        // });
    }

    _renderingRecipeToHTML() {


    }
}

export default new AddRecipeView();