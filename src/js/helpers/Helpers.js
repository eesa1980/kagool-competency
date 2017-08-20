/**
 * Created by lewisjames-odwin on 19/08/2017.
 */
import $ from 'jquery';
import Handlebars from 'handlebars';

//----------------------------------*\
// HELPER FILES
// Created this as these lines of code
// Are likely to be duplicated
//----------------------------------*/

export const HandlebarsHelper = (() => {
    "use strict";
    const renderElement = (object) => {
        const source = document.getElementById(object.handlebarId).innerHTML;
        const template = Handlebars.compile(source);
        const context = object.data;
        const html = template(context);
        $(object.outputElement).html(html);
    };

    return {
        renderElement: renderElement
    };
})();

export const FetchHelper = (() => {
    "use strict";
    let fetchAll = function (URL) {
        return (
            fetch(URL)
                .then((response) => {
                    if (response.status >= 400) {
                        throw new Error("Bad response from server");
                    }
                    return response.json();
                })
        );
    };
    return {
        fetchAll: fetchAll
    };

})();

export const ImgDefer = (() =>{
    let imgDefer = document.getElementsByTagName('img');
    for (let i = 0; i < imgDefer.length; i++) {
        if (imgDefer[i].getAttribute('data-src')) {
            imgDefer[i].setAttribute('src',imgDefer[i].getAttribute('data-src'));
        }
    }
});