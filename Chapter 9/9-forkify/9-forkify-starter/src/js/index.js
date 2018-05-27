//this file is the Controller
/*import str from './models/Search';
//import { add as a, multiply as m, ID } from './views/searchView'; 
import * as searchView from './views/searchView'; 

//console.log(`Using imported functions! ${a(ID, 2)} and ${m(3, 6)}, ${str}`);

console.log(`Using imported functions! ${searchView.add(searchView.ID, 2)} and ${searchView.multiply(3, 6)}, ${str}`);
*/

//function to experiment and try out the API

/*import axios from 'axios'; //no path required for NPM modules

async function getResults(query) {
    //AJAX call, eg fetch but fetch doesn't work in all browsers, so use AXIOS, and AXIOS returns JSON
    const proxy = 'https://cors-anywhere.herokuapp.com';
    const key = 'eb04bc3d9359981318733dd5b811c05c';
    try {
        const res = await axios(`${proxy}/http://food2fork.com/api/search?key=${key}&q=${query}`);
        const recipes = res.data.recipes;
        console.log(recipes);    
    } catch (error) {
        alert(error);
    }
}
getResults('pizza');

// food2fork api key eb04bc3d9359981318733dd5b811c05c 
// http://food2fork.com/api/search
*/

//REDAX and REACT state libraries can be used

// pagination lecture: learning .closest method for easier event handling; and how and why to use data-* attributed in HTML5: Lecture 134

import Search from './models/Search';
import Recipe from './models/Recipe';
import List from './models/List';
import Likes from './models/Likes';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import * as listView from './views/listView';
import * as likesView from './views/likesView';
import { elements, renderLoader, clearLoader } from './views/base';

//global state of the app
// Search Object
// Current recipe object
// Shopping List object
// Liked Recipes
const state = {}; // start with an empty object; and then later we can persist the object
window.state = state; //this give us access in the console to see what's happening TESTING

/**
 * SEARCH CONTROLLER 
*/
const controlSearch = async () => { // a function without any parameters
    // 1) Get query from view
    //const query = 'pizza'; //TODO - a function in the view - test the query - and whilst TESTING
    const query = searchView.getInput(); // use the input field on the form
    //console.log(query);

    if (query) {
        // 2) new search object and add to state
        state.search = new Search(query);

        // 3) Prepare UI for results (eg loading spinner)
        searchView.clearInput();
        searchView.clearResults();
        renderLoader(elements.searchRes);

        try {
            // 4) Search for recipes
            await state.search.getResults();

            // 5) Render results on UI - only to happen after we receive the results, so we must use an await on the promise in step 4
            //console.log(state.search.result); //which is in the model (Search.js in this case)
            clearLoader();
            //searchView.renderResults(state.search.result); //this was our initial renderResults with only a single parameter, being the recipes
            searchView.renderResults(state.search.result);
        } catch (err) {
            alert('Something wrong with the search...');
            clearLoader();            
        }
    }
}

// first line without base.js
//document.querySelector('.search').addEventListener('submit', e => {
elements.searchForm.addEventListener('submit', e => { // this line using base.js
    e.preventDefault();
    controlSearch();
});

//for testing, so that we don't have to type pizza all the time
/*window.addEventListener('load', e => { // this line using base.js
    e.preventDefault();
    controlSearch();
});*/

// if we need to add an event handler (listener) to a button (for example) that isn't on the page yet, then we need event delegation, Section 9, Lecture 134 , so results__pages already exists, so that is where we need to put our event handler
elements.searchResPages.addEventListener('click', e => {
    //console.log(e.target); //ie find out exactly where this happens, but it can happen in more than one place, so use .closest to find the closest class (parent)
    const btn = e.target.closest('.btn-inline');
    //console.log(btn);
    if (btn) { // ie if there is a button
        const goToPage = parseInt(btn.dataset.goto, 10); //using the dataset : access to data (10 for base 10)
        searchView.clearResults();
        searchView.renderResults(state.search.result, goToPage);
        //console.log(goToPage);
    }
});

/*this was here at the beginning for testing
const search = new Search('avocado ice-cream');
//console.log(search);
const res = search.getResults();
*/

/**
 * RECIPE CONTROLLER 
*/

//for testing
/*const r = new Recipe(46956);
r.getRecipe();
console.log(r);*/

// lecture 136: how to read data from the page URL; how to respons to the hashchange event; how to add the same event listener to multiple events: we are adding the hash # in our URL. See searchView.js <a class="results__link" href="#${recipe.recipe_id}">, eg: http://localhost:8080/#303436
// lecture 137: use array methods like map, slide, findIndex and includes; how and why to use eval();

const controlRecipe = async () => {
    // Get ID from the url, and remove the # at the beginning. We can use replace, because the ...hash is a string, and so we can do all the string methods on this string
    //window.location is the entire URL
    const id = window.location.hash.replace('#','');
    console.log(id);

    if (id) {
        // Prepare UI for changes
        recipeView.clearRecipe();
        renderLoader(elements.recipe); //pass in the parent so that the loader knows where to render itself

        // Highlight selected search item
        if (state.search) {
            searchView.highlightSelected(id);
        }

        // Create new recipe object based on the model in the last lecture and save in the state that we can access from anywhere
        state.recipe = new Recipe(id);

        //TESTING : so that we can have access to the recipe object, put it onto the global window object
        //window.r = state.recipe;

        try {
            // Get recipe data (from the server) and parse ingredients
            await state.recipe.getRecipe(); //load recipe data in the background, and wait for the promise to get a value
            //console.log(state.recipe.ingredients);
            state.recipe.parseIngredients();

            // Calculate servings and time
            state.recipe.calcTime();
            state.recipe.calcServings();

            // Render recipe
            // console.log(state.recipe); // for testing
            clearLoader();
            recipeView.renderRecipe(
                state.recipe,
                state.likes.isLiked(id)
            );
        } catch (err) {
            console.log(err);
            alert('Error processing recipe!');
        }
    }
};

// window.addEventListener('hashchange', controlRecipe);
// window.addEventListener('load', controlRecipe);

// put both of these into a single statement, bearing in mind that both call controlRecipe
['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe));

/**
 * LIST CONTROLLER 
*/

const controlList = () => {
    // Create a new list IF there is none yet
    if (!state.list) state.list = new List(); // initialise an empty object

    // Add each ingredient to the list and UI
    state.recipe.ingredients.forEach(el => { // el is one unit of the ingredients
        const item = state.list.addItem(el.count, el.unit, el.ingredient);
        // and add the item to the user interface
        listView.renderItem(item);
    });
}

// Handle delete and update list item events
elements.shopping.addEventListener('click', e => {
    const id = e.target.closest('.shopping__item').dataset.itemid;

    // handle the delete event (button)
    if (e.target.matches('.shopping__delete, .shopping__delete *')) {
        // Delete from state
        state.list.deleteItem(id);

        // Delete from UI
        listView.deleteItem(id);

    // Handle the count update
    } else if (e.target.matches('.shopping__count-value')) {
        const val = parseFloat(e.target.value, 10); //target is our current element
        state.list.updateCount(id, val);
    };
});

/**
 * LIKE CONTROLLER 
*/
//FOR TESTING, before "window.addEventListener('load', () => {"" existed
//state.likes = new Likes();
//likesView.toggleLikeMenu(state.likes.getNumLikes());

const controlLike = () => {
    //we need a new Likes object if it isn't there
    if (!state.likes) state.likes = new Likes();
    const currentID = state.recipe.id;

    // User has NOT yet liked current recipe
    if (!state.likes.isLiked(currentID)) {
        // Add like to the state
        //console.log(state.recipe);
        const newLike = state.likes.addLike(
            currentID,
            state.recipe.title,
            state.recipe.author,
            state.recipe.img
        );

        // Toggle the like button
        likesView.toggleLikeBtn(true);

        // Add like to UI list
        //console.log(state.likes); - during testing
        likesView.renderLike(newLike);

    // User HAS liked current recipe
    } else {
        // Remove like from the state
        state.likes.deleteLike(currentID);

        // Toggle the like button
        likesView.toggleLikeBtn(false);

        // Remove like from UI list
        //console.log(state.likes); - during testing
        likesView.deleteLike(currentID);
    };
    likesView.toggleLikeMenu(state.likes.getNumLikes());
};

// what we want to do each time the page loads
// Restore liked recipes on page load
window.addEventListener('load', () => {
    state.likes = new Likes();

    // Restore likes
    state.likes.readStorage();

    // Toggle the love button on the top right hand side of the screen, ie the like menu button
    likesView.toggleLikeMenu(state.likes.getNumLikes());    

    // Render all liked recipes in the menu
    state.likes.likes.forEach(like => likesView.renderLike(like));
});



//  because we need to use the target property of the event
// Handling receipe button clicks : deal with increasing and decreasing the servings
elements.recipe.addEventListener('click', e => {
    if (e.target.matches('.btn-decrease, .btn-decrease *')) { //btn-decrease or anything inside it
        // Decrease button is clicked
        if (state.recipe.servings > 1) {
            state.recipe.updateServings('dec');
            recipeView.updateServingsIngredients(state.recipe);
        }
    } else if (e.target.matches('.btn-increase, .btn-increase *')) { //btn-decrease or anything inside it
        // Increase button is clicked
        state.recipe.updateServings('inc');
        recipeView.updateServingsIngredients(state.recipe);
    } else if (e.target.matches('.recipe__btn--add, .recipe__btn--add *')) {
        // call our control list function (controller)
        // Add ingredients to shopping list
        controlList();
    } else if (e.target.matches('.recipe__love, .recipe__love *')) {
        // call the like controller
        controlLike();
    };
    //console.log(state.recipe);
});

// lecture 141: how and why to create uniqueIDs using an external package
// difference between Array.slice and Array.splice
// More uses cases for Array.findIndex and Array.find.
//  See the List Model which uses https://github.com/adamhalasz/uniqid

//Test out the new List() functionality
//const l = new List();
// THE MODELS ARE ALSO THE FOUNDATION OF APIs.
window.l = new List();

//lecture 147 : PERSISTING that data between sessions
// how to use localStorageAPI
//  allows us to save key,value pairs in the browser
// use localStorage:. addey, getkey, removekey, length

