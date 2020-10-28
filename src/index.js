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
            ui.defaultHtml()
            ui.nonDataHandlers()
            app.dataEventHandlers()
        })

}

$(main);