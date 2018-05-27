//base for styles, DOM elements, etc. essentially like utils.pas

//create an object that contains all the elements from our DOM and export it

// it is a named export because there will be other exports in this file
// a property called searchInput

//put all DOM elements into this object
export const elements = {
    searchForm: document.querySelector('.search'),
    searchInput: document.querySelector('.search__field'), // a dDOM element
    searchRes: document.querySelector('.results'),
    searchResList: document.querySelector('.results__list'),
    searchResPages: document.querySelector('.results__pages'),
    recipe: document.querySelector('.recipe')
};

export const elementStrings = {
    loader: 'loader' //loader has the classname of loader
}

//svg is for an icon library, in this case called icons.svg and the icon we want is icon-cw
export const renderLoader = parent => { // parent is an argument
    const loader = `
        <div class="${elementStrings.loader}">
            <svg>
                <use href="img/icons.svg#icon-cw"></use>
            </svg>
        </div>
    `;
    parent.insertAdjacentHTML('afterbegin', loader);
};

export const clearLoader = () => {
    const loader = document.querySelector(`.${elementStrings.loader}`);
    if (loader) loader.parentElement.removeChild(loader);
}