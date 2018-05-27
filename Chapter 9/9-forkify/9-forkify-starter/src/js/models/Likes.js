export default class Likes {
    constructor() {
        this.likes = [];
    }

    addLike(id, title, author, img) {
        //this id is the recipe id
        const like = { id, title, author, img };
        this.likes.push(like);

        // Persist the like array in localStorage
        this.persistData();

        return like; //which returns the newly created like
    }

    deleteLike(id) {
        const index = this.likes.findIndex(el => el.id === id);
        this.likes.splice(index, 1);        

        // Persist the like array in localStorage
        this.persistData();
    }

    isLiked(id) {
        return this.likes.findIndex(el => el.id === id) !== -1;
    }

    getNumLikes() {
        return this.likes.length;
    }

    persistData() {
        //we have to convert the array into a string
        localStorage.setItem('likes', JSON.stringify(this.likes));
    }

    readStorage() {
        const storage = JSON.parse(localStorage.getItem('likes')); //also localStorage.likes works
        //console.log(storage);

        // Restore all the likes into the likes array from the localStorage
        if (storage) this.likes = storage;
    }
}