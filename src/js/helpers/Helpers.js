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



/*! onloadCSS. (onload callback for loadCSS) [c]2017 Filament Group, Inc. MIT License */
/* global navigator */
/* exported onloadCSS */
export const onloadCSS = ( ss, callback ) => {
    "use strict";
    let called;
    function newcb(){
        if( !called && callback ){
            called = true;
            callback.call( ss );
        }
    }
    if( ss.addEventListener ){
        ss.addEventListener( "load", newcb );
    }
    if( ss.attachEvent ){
        ss.attachEvent( "onload", newcb );
    }

    // This code is for browsers that don’t support onload
    // No support for onload (it'll bind but never fire):
    //	* Android 4.3 (Samsung Galaxy S4, Browserstack)
    //	* Android 4.2 Browser (Samsung Galaxy SIII Mini GT-I8200L)
    //	* Android 2.3 (Pantech Burst P9070)

    // Weak inference targets Android < 4.4
    if( "isApplicationInstalled" in navigator && "onloadcssdefined" in ss ) {
        ss.onloadcssdefined( newcb );
    }
};
