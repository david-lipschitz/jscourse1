/*export const add = (a, b) => a + b;
export const multiply = (a, b) => a * b;
export const ID = 23;*/

import { elements } from './base';

//a function to return the input value of the field
export const getInput = () => elements.searchInput.value; // one line is an implicit return

export const clearInput = () => {
    elements.searchInput.value = '';
};

export const clearResults = () => {
    elements.searchResList.innerHTML = '';
    elements.searchResPages.innerHTML = '';
}

// 'Pasta with tomato and spinach' *1
// what we want to do here is keep adding words to an empty string until we have less than or equal to "limit" characters and then put ... afterwards, so 'Pasta with tomato and spinach' becomes 'Pasta with tomato ...'
/* acc = total accumulated characters
acc: 0  / acc + cur.length = 5 / newTitle = ['Pasta']
acc: 5  / acc + cur.length = 9 / newTitle = ['Pasta','with']
acc: 9  / acc + cur.length = 15 / newTitle = ['Pasta',with','tomato']
acc: 15  / acc + cur.length = 18 / newTitle = ['Pasta',with','tomato']
acc: 18  / acc + cur.length = 25 / newTitle = ['Pasta',with','tomato']
*/
const limitRecipeTitle = (title, limit = 17) => { //17 is the default
    const newTitle = []; // a new array; this can be a const, if it is empty and if we are only adding to it
    if (title.length > limit) {
        // instead of assigning title.split('') to a value and then applying reduce to that value, we do it in a single statement (powerful!!)
        title.split(' ').reduce((acc, cur) => { // eg an array with 5 elements using our example in *1 (reduce contains a callback function and then the initial value of the accumulator, ie acc:=0. In this case the callback function has an accumulator (a number) and then the current value that has been split. The callback function is everything inside these quotes "(acc,cur) => {}"
            if (acc + cur.length <= limit) {
                newTitle.push(cur); // so we get an array with each word "pushed" (added) to the array
            }
            return acc + cur.length; // this returns in each iteration of the loop
        }, 0); 

        //return the result, using the join method, joining the elements of a string, with the separator
        return `${newTitle.join(' ')} ...`; //returning here means that the function ends here
    };
    return title;
}

const renderRecipe = recipe => { //this one receives one recipe and it isn't exported, so it is private
    //with template strings using ``, its very easy: no need to layout this Markup without carriage returns and other formatting
    const markup = ` 
        <li>
        <a class="results__link" href="#${recipe.recipe_id}">
            <figure class="results__fig">
                <img src="${recipe.image_url}" alt="${recipe.title}">
            </figure>
            <div class="results__data">
                <h4 class="results__name">${limitRecipeTitle(recipe.title)}</h4>
                <p class="results__author">${recipe.publisher}</p>
            </div>
        </a>    
    </li>
    `; //"it looks a bit like React"
    //  insertAdjacentElement mdn
    elements.searchResList.insertAdjacentHTML('beforeend', markup); // be careful of InsertAdjacentElement
};

/* this was our initial renderResults function with only recipes as a parameter
export const renderResults = recipes => { //we receive an array of 30 recipes
    //recipes.array.forEach(element => { - this was generated automatically by VS Code
    //    
    //});

    //recipes.foreach(el => renderRecipe(el)) - don't need to do this as only one parameter so use next line
    recipes.forEach(renderRecipe);
};*/

// no need for {} in the next function as it will only return the HTML
// parameters:
//   page: page number
//   type: 'prev' or 'next'
// use turnary operator for if else statement in a single line
// data- allows us to store data "goto" is a variable that Jonas used to store the page we want to go to: it is something available in HTML5
//  button class is the ELEMENT
const createButton = (page, type) => `
    <button class="btn-inline results__btn--${type}" data-goto=${type === 'prev' ? page -1 : page + 1}>
        <span>Page ${type === 'prev' ? page -1 : page + 1}</span>
        <svg class="search__icon">
            <use href="img/icons.svg#icon-triangle-${type === 'prev' ? 'left' : 'right'}"></use>
        </svg>
    </button>
`;

const renderButtons = (page, numResults, resPerPage) => { //resPerPage = results per page
    //render the buttons that are applicable
    const pages = Math.ceil(numResults / resPerPage); // 4.3 rounded up to 5

    let button; //define it, but don't assign it; button will be assigned the HTML from createButton

    if (page === 1 && pages > 1) {
        // Only button to go to next page
        button = createButton(page, 'next');
    } else if (page < pages) {
        // We want both buttons
        button = `
            ${createButton(page, 'prev')}
            ${createButton(page, 'next')}
        `;
    } else if (page === pages && pages > 1) {
        // Only button to go to prev page
        button = createButton(page, 'prev');
    }

    //insert the element into the DOM, into results_pages
    elements.searchResPages.insertAdjacentHTML('afterbegin', button);
};

export const renderResults = (recipes, page = 1, resPerPage = 10) => { 
    //only display the number of results per page
    // render results of current page
    const start = (page - 1) * resPerPage;
    const end = page * resPerPage;

    //recipes.forEach(renderRecipe); //recipes is an array of 30 recipes
    recipes.slice(start, end).forEach(renderRecipe);

    // render the pagination buttons
    renderButtons(page, recipes.length, resPerPage);
};