/**
 * Created by lewisjames-odwin on 17/08/2017.
 */
'use strict';
//Polyfill for promises
require('es6-promise').polyfill();

import * as Helpers from './helpers/Helpers';
import * as Constants from './constants/Constants';
import AccordionModule from './modules/accordion/Accordion';
import GridCTAModule from './modules/gridCTA/GridCTA';
import objectFitImages from 'object-fit-images';
import loadCSS from 'fg-loadcss/src/loadCSS';
import $ from 'jquery';

$(() => {

    Helpers.FetchHelper.fetchAll(Constants.APIEntryPoint)
        .then((data) => {

            AccordionModule.renderAccordion(data);
            GridCTAModule.renderGrid(data);

            window.Accordion = AccordionModule;
            window.GridCTA = GridCTAModule;

            AccordionModule.onKeyPressToggleAll();
            Helpers.ImgDefer();

            //Polyfill for object fit/position
            objectFitImages();


        }).then(() => {

        loadCSS.loadCSS("css/style.css");
        // $('#loader').hide();
    });
});


//Allows window access to Modules



