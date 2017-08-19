/*jshint browser: true */
/*jshint globalstrict: true*/
'use strict';

import $ from 'jquery';
import HandlebarsHelper from './../helpers/HandlebarsHelper';
import data from './../../data/TestData';

const AccordionModule = (() => {

    const renderAccordion = () => {
        //Created helper to make rendering templates easier
        HandlebarsHelper.render('accordion_hb', data, 'main');
    };
    /* A sub module defining the 3 actions of the accordion */
    const accordionActions = (() => {

        /* The element clicked */
        let $trigger;

        /* Opens/Closes the clicked accordion element */
        const toggleClicked = () => {
            $trigger
                .toggleClass('active')
                .next()
                .slideToggle();
        };

        /* Closes all other parent elements */
        const closeAllOthers = () => {
            $trigger.parent().parent().find('.dropdown').slideUp()
                .prev().removeClass('active')
            ;
        };

        /* Closes clicked */
        const closeClicked = () => {
            $trigger
                .removeClass('active')
                .next()
                .slideUp();
        };

        /* Initalise sub module with clicked element */
        const initClicked = (triggerElement) => {
            $trigger = triggerElement;
        };

        const openAll = () => {
            $('.dropdown').slideDown();
        };

        const closeAll = () => {
            $('.dropdown').slideUp();

        };

        return {
            initClicked: initClicked,
            toggleClicked: toggleClicked,
            closeAllOthers: closeAllOthers,
            closeClicked: closeClicked,
            openAll: openAll,
            closeAll: closeAll
        };

    })();


    const onClickToggle = (e, el) => {
        e.preventDefault();
        const $trigger = $(el);
        accordionActions.initClicked($trigger);
        const isCurrentOpen = $trigger.hasClass('active');

        if (isCurrentOpen) {
            accordionActions.closeClicked();
        } else { /* If clicking on a closed */
            accordionActions.closeAllOthers();
            accordionActions.toggleClicked();
        }
    };

    const onKeyPressToggleAll = () => {
        window.addEventListener('keydown', (e) => {
            if (e.key === "ArrowDown") {
                accordionActions.openAll();
            }
            else if (e.key === "ArrowUp") {
                accordionActions.closeAll();
            }
        });
    };

    return {
        renderAccordion: renderAccordion,
        onClickToggle: onClickToggle,
        onKeyPressToggleAll: onKeyPressToggleAll
    };

})();

export default AccordionModule;