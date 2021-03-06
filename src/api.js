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
    return response.json();
}


// executes a get request for the object(may not need it)
const readBookmarks = async () => {
    const response = await fetch(URL);
    const data = await response.json();
    return data;
}

// executes a delete request for the current object
const deleteBookmark = async (id) => {
    const response = await fetch(`${URL}/${id}`, {
        method: 'DELETE',
    });
    // const result = response.json;
}


export default {
    createBookmark,
    readBookmarks,
    deleteBookmark
}