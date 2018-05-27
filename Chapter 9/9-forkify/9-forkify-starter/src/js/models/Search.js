//export default 'I am an exported string.';

//we use ES6 classes to define the data module for this api

import axios from 'axios'; //no path required for NPM modules
import { key, proxy } from '../config'; // a Named import

export default class Search {
    constructor(query) {
        this.query = query;
    }

    //every Async function returns a promise
    async getResults() {
        //AJAX call, eg fetch but fetch doesn't work in all browsers, so use AXIOS, and AXIOS returns JSON
        try {
            const res = await axios(`${proxy}/http://food2fork.com/api/search?key=${key}&q=${this.query}`);
            this.result = res.data.recipes;
            //console.log(this.result);    
        } catch (error) {
            alert(error);
        }
    }
}
