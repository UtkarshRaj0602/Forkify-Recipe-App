import View from './View.js';
import left__icon from 'url:../../img/left__icon.png';
import right__icon from 'url:../../img/right__icon.png';

class PaginationView extends View{ 
    // Creating protected class variables here......................
    _parentElement = document.querySelector('.pagination');


    // CREATING A HANDLER METHOD FOR NEXT PAGE!!
    addHandlerClick (handler) {
        this._parentElement.addEventListener("click", (event) => {
            // Using closest to search for parent element of the button
            const button = event.target.closest(".btn--inline");

            // Creating a guard clause
            if(!button) return;

            // Creating data-goto function for toggling between pages

            const gotoPageNumber = +button.dataset.goto;
            // console.log(gotoPageNumber);
            handler(gotoPageNumber);
        });
    }

    _renderingRecipeToHTML() {

        const currentPageNumber = this._recipe.page;

        const number__of__Pages = Math.ceil(this._recipe.results.length / this._recipe.ShowResultsPerPage);
        // console.log(number__of__Pages);

        // CASE 1, we are on page 1 and there are other pages ------------- FOR NEXT PAGE
       
        if(currentPageNumber === 1 && number__of__Pages > 1) {
            return `
                <button data-goto="${currentPageNumber + 1}"  class="btn--inline pagination__btn__next">
                    <span class="Page__count">Page ${currentPageNumber + 1}  <img src="${right__icon}" class="search__icon"></span>
                </button>
            `;
        }

        //CASE 3, last page -------------------- FOR LAST PAGE
        
        if(currentPageNumber === number__of__Pages && number__of__Pages > 1) {
            return `
                <button data-goto="${currentPageNumber - 1}" class="btn--inline pagination__btn__prev">
                    <span class="Page__count"><img src="${left__icon}" class="search__icon">  Page ${currentPageNumber - 1}</span>
                </button>
            `;
        }

        // CASE 4, other page ----------------- FOR OTHER PAGES (BOTH NEXT AND PREVIOUS)

        if(currentPageNumber < number__of__Pages) {
            return `
                <button data-goto="${currentPageNumber - 1}" class="btn--inline pagination__btn__prev">
                    <span class="Page__count"><img src="${left__icon}" class="search__icon">  Page ${currentPageNumber - 1}</span>
                </button>

                <button data-goto="${currentPageNumber + 1}" class="btn--inline pagination__btn__next">
                    <span class="Page__count">Page ${currentPageNumber + 1}  <img src="${right__icon}" class="search__icon"></span>
                </button>
            `;
        }

        // CASE 2, we are on page 1 and there are no other pages ------------------ FOR ONLY ONE PAGE
        
        return " ";
    }
}

export default new PaginationView();