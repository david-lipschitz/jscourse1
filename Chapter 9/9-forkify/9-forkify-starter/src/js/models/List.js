// use the External Package https://github.com/adamhalasz/uniqid for generating unique ids
import uniqid from 'uniqid';

export default class List {
    constructor() {
        this.items = []; //this.items is an empty array
    }

    addItem (count, unit, ingredient) {
        //an erray where each of the objects have count, unit and ingredient
        const item = {
            id: uniqid(),
            count, //=this.count ...
            unit,
            ingredient
        }
        this.items.push(item);
        return item;
    }

    deleteItem (id) {
        //find the index where the item is located
        const index = this.items.findIndex(el => el.id === id);

        // [2,4,8] splice(1,1) -> returns 4 and original array is [2,8]
        // [2,4,8] splice(1,2) -> returns [4,8] and original array is [2]
        // [2,4,8] slice(1,2) -> returns 4 and original array is [2,4,8]
        //return this.items.splice(index, 1); //will delete the element from the array and return the deleted item
        this.items.splice(index, 1); // we don't want to return anything
    }

    updateCount(id, newCount) {
        //this.items.find(el => el.id === id); //return the element with the id we passed in
        this.items.find(el => el.id === id).count = newCount;
    }

}