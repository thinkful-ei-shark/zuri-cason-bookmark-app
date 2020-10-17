import store from './store'
const URL = 'https://thinkful-list-api.herokuapp.com/zuri/bookmarks';


// executes a post request for the new object
const createBookmark = async function (bookmark) {
    const response = await fetch(URL, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(bookmark)
    });
    const newBookmark = await response.json();
    return store.bookmarks.push(newBookmark);
}


// executes a get request for the object(may not need it)
const readBookmarks = async () => {
    const response = await fetch(URL);
    const data = await response.json();
    store.bookmarks = data;
    return store.bookmarks;
}

// executes a delete request for the current object
const deleteBookmark = async (id) => {
    const response = await fetch(`${URL}/${id}`, {
        method: 'DELETE',
    });
    // const result = response.json;
    return store.bookmarks = store.bookmarks.filter(currentItem => currentItem.id !== id)
}


export default {
    createBookmark,
    readBookmarks,
    deleteBookmark
}