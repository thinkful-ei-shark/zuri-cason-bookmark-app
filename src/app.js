import $ from 'jquery';
import ui from './ui';
import api from './api'
import store from './store'

// class for bookmark proerties and methods
class Bookmark {

    constructor(title, url, desc, rating, expanded) {
        this.title = title
        this.url = url
        this.desc = desc
        this.rating = rating
    };

    // add method that creates new bookmark
    async addItem(newBookmark) {
        // call api post request
        try {
            await api.createBookmark(newBookmark);
            api.readBookmarks()
                .then(() => ui.render('#bookmark-temp', ui.bookmarkTemplate()))
        } catch (error) {
            return console.log(error.message);
        }
    }
}


// Submit a form to add new bookmark 
const submitForm = function () {
    $('main').on('submit', '.form-card',
        (event) => {
            event.preventDefault()
            let title = $('main').find("#title").val();
            let url = $('main').find("#website").val();
            let desc = $('main').find("#form-description").val();
            let rating = $('main').find("#js-form-filter").val();

            if (!title || title.trim() === "") {
                alert("Needs Title");
            }
            else if (!url || url.trim() === "" || url === undefined) {
                alert("Needs Url");
            }
            else {
                const currentBookmark = new Bookmark(title, url, desc, rating)
                currentBookmark.addItem(currentBookmark)
            }
            console.log(store.bookmarks)
            ui.render("#form", '')
        })
}

// delete function that deletes new bookmark 
const deleteItem = function () {
    $('.delete').click(event => {
        let id = $(event.target).parents('li').attr("id")
        api.deleteBookmark(id)
            .then(() => ui.render('#bookmark-temp', ui.bookmarkTemplate()))
            .catch(error => console.log(error.message))
    })
}


// function that filters the bookmark list 
const filter = function () {
    $('#js-filter').on('change', function () {
        store.filter = $('#js-filter option:selected').val()
        ui.render('#bookmark-temp', ui.bookmarkTemplate())
        // console.log(store.filter)
    })
}

// data driven event handlers
function dataEventHandlers() {
    submitForm()
    deleteItem()
    filter()
}


export default {
    dataEventHandlers,
    deleteItem
}