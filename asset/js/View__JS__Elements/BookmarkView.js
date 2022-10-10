import View from './View.js';

class BookmarksView extends View{ 
    // Creating protected class variables here......................
    _parentElement = document.querySelector('.results__modal__here');
    _errorMessage = "No bookmarks yet. Find a nice recipe and bookmark it!!";
    _message = " ";

    _window = document.querySelector(".add-recipe-window__2");
    _overlay = document.querySelector(".overlay");
    _buttonOpen = document.querySelector(".nav__btn--bookmarks");
    _buttonClose = document.querySelector(".btn--close-modal__part__2");

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

    _renderingRecipeToHTML() {
        // Creating return method to preview and loop over the this._recipe search results array
        // Using join(" ") here to join the strings that we got from looping over the _generateMarkupSearchResults method.
        return this._recipe.map(this._generateMarkupSearchResults).join(' ');
    }

    addHandlerRenderBookmarksOnLoad(handler) {
        window.addEventListener("load", handler);
    }

    _generateMarkupSearchResults(result) {
        // console.log(this._recipe);
        return `
            <li class="preview__here">
                <a class="preview__link__here preview__link--active" href="#${result.id}">
                    <figure class="preview__fig__section__here">
                        <img src="${result.imageURL}" alt="${result.title}" class="preview__fig__here"/>
                        <div class="preview__data__here">
                            <h4 class="preview__name__here">${result.title}</h4>
                            <p class="preview__author__here modal__author__here">${result.publisher}</p>
                        </div>
                    </figure>
                </a>    
            </li>
        `;
    }
}

export default new BookmarksView();