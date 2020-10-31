import $ from 'jquery';
import ui from './ui';
import './style.css';
import app from './app';
import api from './api';
import store from './store'



const main = function () {
    api.readBookmarks()
        .then(data => {
            store.bookmarks = data
            // adds a key "expaded upon intial rendering"
            store.bookmarks.forEach(bookmark => bookmark.expanded = false);
            ui.defaultHtml();
            ui.nonDataHandlers();
            app.dataEventHandlers();
        })

}

$(main);