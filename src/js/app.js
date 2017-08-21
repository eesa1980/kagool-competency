/**
 * Created by lewisjames-odwin on 17/08/2017.
 */
import $ from 'jquery';
import AccordionModule from './modules/accordion/Accordion';
import CarouselModule from './modules/carousel/Carousel';
import {APIEntryPoint} from './constants/Constants';
import {polyfill} from 'es6-promise';
import fetch from 'isomorphic-fetch';
import GridCTAModule from './modules/gridCTA/GridCTA';
import LazyLoad from 'vanilla-lazyload/dist/lazyload.min';
import objectFitImages from 'object-fit-images';

//Polyfill for ES6 Promises, needed particularly for IE11 and lower
polyfill();


$(function () {
    'use strict';
    //Async fetch data needed via Promise and return as JSON object
    fetch(APIEntryPoint)
        .then((response) => {
            if (response.status >= 400) {
                throw new Error("Bad response from server");
            }
            return response.json();
        })

        //When successful
        .then((data) => {
            //Pass data into the modules then render content
            AccordionModule.renderAccordion(data);
            GridCTAModule.renderGrid(data);
            CarouselModule.renderCarousel();

            //Make modules API available to the window (for click / change events)
            window.Accordion = AccordionModule;
            window.GridCTA = GridCTAModule;

            //Polyfill for object fit/position
            objectFitImages();

            //Lazy load images from faster load times
            const lazyload = new LazyLoad();

        })

        .catch((err) => {
            window.console.log(err);
        });

});



