import $ from 'jquery';
import app from './app';
import store from './store'


// Render function
const render = (where, what) => {
    $(where).html(what)
    expand()
    app.deleteItem()
}

// handler functions that do not require data from 'store'
const nonDataHandlers = function () {
    showNewForm()
    removeForm()
    expand()
}

// Expands current bookmark
const expand = function () {
    $('.change-view').click(event => {
        let id = $(event.target).parents('li').attr("id")
        // console.log(id)
        let target = $("main").find(`li[id=${id}]`).find(".expanded-view, .delete")
        $(target).toggleClass("hidden");

    })
}

// display new form to the dom
const showNewForm = function () {
    const newButton = $('#new-bookmark');
    newButton.click(event => {
        event.preventDefault()
        // console.log("click button")
        render('#form', formTemplate)
    })
}

// remove form from the dom
const removeForm = function () {
    $('#form').on('click', '#cancel', () => render('#form', ''))
}

// checks to see if descricption has been filled
function descriptionCheck(description) {
    if (description === "") {
        return ''
    }
    else {
        return `<p class="bm-description">${description}<p>`
    }
}

// Templates

// Bookmark Template
let bookmarkTemplate = function () {
    const filteredBookmarks = store.bookmarks.filter(bookmark => bookmark.rating >= store.filter);

    return `<ul>
            ${filteredBookmarks.map((bookmark) => {
        return `<li id=${bookmark.id}>
                <div class="bookmark-default">
                    <p class="bm-tilte">${bookmark.title}</p>
                    <p class="bm-rating">${bookmark.rating} &#11088</p>
                </div>
                <div class="expanded-view hidden">
                    <a href="${bookmark.url}" class="bm-website">Vist Website</a>
                    ${descriptionCheck(bookmark.desc)}
                </div>
                <div class="bookmark-buttons">
                    <button class="change-view">Change View</button>
                    <button class="delete hidden">Delete</button>
                </div>
            </li>`}).join('')}
        </ ul>`
}

// Where all of the created bookmarks will go 
let bookmarkList = function () {
    return `<section id="bookmark-list">
        <h3 class="bm-list-header">Bookmarks<h3>
        <span id="bookmark-temp">
            ${bookmarkTemplate()}
        </span>
    </section>`;
}

// Add bookmark form template
let formTemplate = function () {
    return `<div class="form-card">
    <form>
        <h3>Add New Bookmark</h3>
        <div class="form-title">
            <label for="title">Enter Title: </label>
            <input type="text" name="title" id="title" placeholder="Google" >
        </div>
        <div class="form-url">
            <label for="url">Enter Url: </label>
            <input type="text" name="url" id="website" placeholder="http://google.com" >
        </div>
        <div>
            <textarea name="description" id="form-description" cols="30" rows="10" placeholder="Description (optional)"></textarea>
        </div>
        <div class="form-rating"> 
            <p class="rate-html">Rate <p>
            <select name="form-filter" id="js-form-filter">
            <option value="1" selected>1 &#11088</option>
            <option value="2">2 &#11088</option>
            <option value="3">3 &#11088</option>
            <option value="4">4 &#11088</option>
            <option value="5">5 &#11088</option>
            </select>
        </div>
        <div class="buttons" id="js-buttons">
            <button class="cancel-button" id="cancel";>Cancel</button>
            <button type="sumbit" class="create-button">Create</button>
        </div>
    </form>
</div>`;
}

// Where the bookmark form template will be rendered
let bookmarkForm = function () {
    return `<section id="form"></section>`;
}

// Add new bookmrk and filter list button
const addAndFilter = function () {
    return `<section id="add-and-filter">
        <button id="new-bookmark">New</button>
        <select name="star-filter" id="js-filter">
            <option value="0" selected>Filter</option>
            <option value="1">1 &#11088</option>
            <option value="2">2 &#11088</option>
            <option value="3">3 &#11088</option>
            <option value="4">4 &#11088</option>
            <option value="5">5 &#11088</option>
            </select>
    </section>`;
}


// Main content: consolidation of all of the <main> content to one function 
const mainContent = function () {
    return `<main>
    ${addAndFilter()}
    ${bookmarkForm()}
    ${bookmarkList()}
 </main>`;
}


// Title
const title = function () {
    return '<header><h1>Bookmark App</h1></header>'
}

// What we will see upon entering the website
const defaultHtml = function () {
    $('body').html(`${title()}
    ${mainContent()}`);
}

export default {
    defaultHtml,
    nonDataHandlers,
    formTemplate,
    bookmarkTemplate,
    render

}