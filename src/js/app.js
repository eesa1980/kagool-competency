/**
 * Created by lewisjames-odwin on 17/08/2017.
 */
import $ from 'jquery';
import AccordionModule from './modules/accordion/Accordion';
import Carousel from './modules/carousel/Carousel';
import * as Constants from './constants/Constants';
import es6Promise from 'es6-promise';
import fetch from 'isomorphic-fetch';
import GridCTAModule from './modules/gridCTA/GridCTA';
import LazyLoad from 'vanilla-lazyload/dist/lazyload.min';
import objectFitImages from 'object-fit-images';

//Polyfill for ES6 Promises, needed particularly for IE11 and lower
es6Promise.polyfill();

$(function () {
    'use strict';
    //Async fetch data needed via Promise and return as JSON object
    fetch(Constants.APIEntryPoint)
        .then((response) => {
            if (response.status >= 400) {
                throw new Error("Bad response from server");
            }
            return response.json();
        })

        //When successful
        .then((data) => {

            try {
                //Pass data as a parameter into the modules then render content
                AccordionModule.renderAccordion(data);
                GridCTAModule.renderGrid(data);
                Carousel.renderCarousel(data);

                //Make modules API available to the window (for click / change events)
                window.Accordion = AccordionModule;
                window.GridCTA = GridCTAModule;

            } catch (err) {
                // Catch errors without page stopping
                window.console.log(err);
            } finally {

                //Polyfill for object fit/position
                objectFitImages();

                //Lazy load images from faster load times
                const lazyload = new LazyLoad();

            }
        });

});



