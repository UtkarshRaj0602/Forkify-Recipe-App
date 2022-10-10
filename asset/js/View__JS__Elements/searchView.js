class SearchView {
    _parentElement = document.querySelector('.search');

    getSearchQuery() {
        const get__query = this._parentElement.querySelector('.search__field').value;
        this._clearInput();
        return get__query;
    }

    addSearch__Handler(handler) {
        this._parentElement.addEventListener('submit', (event) => {
            event.preventDefault();
            handler();
        });
    }

    _clearInput() {
        this._parentElement.querySelector('.search__field').value = "";
    }
}

export default new SearchView();