/**
 * Created by lewisjames-odwin on 19/08/2017.
 */
import $ from 'jquery';
import Handlebars from 'handlebars';

//----------------------------------*\
// HELPERS
// Created as these lines of code
// are likely to be duplicated
//----------------------------------*/

export const renderElement = (object) => {
    "use strict";
    const source = document.getElementById(object.handlebarId).innerHTML;
    const template = Handlebars.compile(source);
    const context = object.data;
    const html = template(context);
    $(object.outputElement).html(html);
};


