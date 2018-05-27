import axios from 'axios';
import { key, proxy } from '../config';

export default class Recipe {
    constructor(id) {
        this.id = id;
    }

    async getRecipe() {
        try {
            //remember that the axios call returns a promise that we can then await which happens in the async and await process
            const res = await axios(`${proxy}/http://food2fork.com/api/get?key=${key}&rId=${this.id}`);
            //console.log(res);
            this.title = res.data.recipe.title;
            this.author = res.data.recipe.publisher;
            this.img = res.data.recipe.image_url;
            this.url = res.data.recipe.source_url;
            this.ingredients = res.data.recipe.ingredients; //this is an array because res.data...ingredients is an array
            //console.log('testing ' + this.ingredients);
        } catch (error) {
            console.log(error);
            alert('Something went wrong :(');
        }
    }

    calcTime() {
        //assume that for every 3 ingredients we need 15 minutes
        const numIng = this.ingredients.length;
        const periods = Math.ceil(numIng / 3);
        this.time = periods * 15;
    }

    calcServings() {
        this.servings = 4; //no calc now
    }

    parseIngredients() {
        const unitsLong = ['tablespoons', 'tablespoon', 'ounces', 'ounce', 'teaspoons', 'teaspoon', 'cups', 'pounds'];
        const unitsShort = ['tbsp', 'tbsp', 'oz', 'oz', 'tsp', 'tsp', 'cup', 'pound'];
        const units = [...unitsShort, 'kg', 'g']; // using ES6 Destructuring on unitsShort, so that we don't have an array inside an array, rather we have just the elements in a new array called units

        //console.log('I am here: ' + this.ingredients);

        const newIngredients = this.ingredients.map(el => {
            //console.log('I am here ' + el);
            // 1) Uniform units
            let ingredient = el.toLowerCase();
            //console.log('I am here ' + el);
            //loop over each element in unitsLong and do something
            //in this callback function, unit is the current element and ix is the current index; these are variables!!
            unitsLong.forEach((unit, ix) => { 
                ingredient = ingredient.replace(unit, unitsShort[ix]);
            });

            // 2) Remove paretheses: google for regular expressions, eg for phone numbers, or email addresses, etc: this removes all the text inside the parenthesis
            //ingredient = 'a ';
            ingredient = ingredient.replace(/ *\([^)]*\) */g, ' ');

            // 3) Parse ingredients into count, unit and ingredient
            //  is there a unit in the string
            //  convert the unit into an array, splitting by spaces
            const arrIng = ingredient.split(' ');
            // for each element in the array, get the index of the word from unitsShort, and it will stop when its true
            //const unitIndex = arrIng.findIndex(el2 => unitsShort.includes(el2));
            const unitIndex = arrIng.findIndex(el2 => units.includes(el2));

            let objIng; //object Ingredient
            if (unitIndex > -1) {
                // There is a unit
                // example 4 1/2 cups, arrCount is [4, 1/2] --> eval("4+1/2") --> 4.5
                // example 4 cups, arrCount is [4]
                const arrCount = arrIng.slice(0, unitIndex); 
                let count;
                if (arrCount.length === 1) {
                    count = eval(arrIng[0].replace('-', '+'));
                } else {
                    count = eval(arrIng.slice(0, unitIndex).join('+'));
                }

                objIng = {
                    count, //the same as count: count
                    unit: arrIng[unitIndex],
                    ingredient: arrIng.slice(unitIndex+1).join(' ')  // second element to the end; and join it into a string
                };
            } else if (parseInt(arrIng[0], 10)) {
                // There is NO unit, but the first element is a number
                objIng = {
                    count: parseInt(arrIng[0], 10),
                    unit: '',
                    ingredient: arrIng.slice(1).join(' ') //array and then put into a string with a join
                }
            } else if (unitIndex === -1) {
                // There is NO unit and NO number in first position
                objIng = {
                    count: 1,
                    unit: '',
                    ingredient
                }
            }

            //return ingredient; //for each element that has been selected in the loop
            return objIng;
        });
        this.ingredients = newIngredients;
    }
}