/**
 * Created by lewisjames-odwin on 19/08/2017.
 */
import Handlebars from 'handlebars';
import $ from 'jquery';

const HandlebarsHelper = (() => {
    "use strict";
    const render = (wrapperId, contentObject, appendToElement) => {
        const source = document.getElementById(wrapperId).innerHTML;
        const template = Handlebars.compile(source);
        const context = contentObject;
        const html = template(context);
        $(appendToElement).append(html);
    };

    return {
        render : render
    };
})();

export default HandlebarsHelper;