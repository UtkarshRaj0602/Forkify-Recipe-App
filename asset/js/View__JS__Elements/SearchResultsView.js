import View from './View.js';

class SearchResultView extends View{ 
    // Creating protected class variables here......................
    _parentElement = document.querySelector('.results');
    _errorMessage = "Sorry!! No recipes found for your query. Please try something else!!";
    _message = " ";

    _renderingRecipeToHTML() {
        // Creating return method to preview and loop over the this._recipe search results array
        // Using join(" ") here to join the strings that we got from looping over the _generateMarkupSearchResults method.
        return this._recipe.map(this._generateMarkupSearchResults).join(' ');
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
                            <p class="preview__author__here">${result.publisher}</p>
                        </div>
                    </figure>
                </a>    
            </li>
        `;
    }
}

export default new SearchResultView();