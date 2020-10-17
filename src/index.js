import $ from 'jquery';
import ui from './ui';
import './style.css';
import app from './app';
import api from './api';



const main = function () {
    api.readBookmarks()
        .then(() => {
            ui.defaultHtml()
            ui.nonDataHandlers()
            app.dataEventHandlers()
        })

}

$(main);