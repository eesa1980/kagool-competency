import $ from 'jquery';
import * as Helpers from '../../helpers/Helpers';
import * as Constants from '../../constants/Constants';

const AccordionModule = (() => {
    'use strict';
    let _$trigger;

    /* set Clicked trigger element */
    const setTrigger = (triggerElement) => {
        _$trigger = triggerElement;
    };

    /* get Clicked trigger element */
    const getTrigger = () => {
        return _$trigger;
    };

    /* Scrolls to top of trigger, then executes callback */
    const scrollToTopOfTrigger = (callback) => {
        setTimeout(function () {
            $('html, body').animate({
                scrollTop: getTrigger().offset().top
            }, 1000);
        }, 500, callback)
    }

    /* Open or close dropdown when trigger clicked */
    const onClickToggleDropdown = (e, el) => {

        e.preventDefault();

        setTrigger($(el));

        /* Opens/Closes the clicked dropdown on trigger */
        const toggleClicked = () => {
            getTrigger()
                .toggleClass('active')
                .next()
                .slideToggle();
        };

        /* Closes all other parent elements on trigger */
        const closeAllOthers = () => {
            getTrigger()
                .parent().parent()
                .find('.dropdown')
                .slideUp()
                .prev()
                .removeClass('active')
            ;
        };

        /* Closes dropdown on trigger */
        const closeClicked = () => {
            getTrigger()
                .removeClass('active')
                .next()
                .slideUp();
        };

        const isCurrentDropdownOpen = getTrigger().hasClass('active');

        if (isCurrentDropdownOpen) {
            closeClicked();
        } else {
            /* If clicking on a closed dropdown */
            scrollToTopOfTrigger((() => {
                closeAllOthers();
                toggleClicked();
            })());
        }
    };

    /* Open or close all on keypress up/down arrows */
    const onKeyPressToggleAll = () => {
        window.addEventListener('keydown', (e) => {
            if (e.key === "ArrowDown") {
                $('.dropdown').slideDown();
            }
            else if (e.key === "ArrowUp") {
                $('.dropdown').slideUp();
            }
        });
    };

    /* Fetch Data and then render the accordion template */
    const renderAccordion = () => {
        Helpers.FetchHelper.fetchAll(Constants.APIEntryPoint)
            .then((value) => {
                Helpers.HandlebarsHelper.renderElement({
                    handlebarId: 'accordion_hb',
                    data: {beers: value},
                    outputElement: 'main'
                });
            });
    };


//----------------------------------*\
// PUBLIC API
//----------------------------------*/

    return {
        renderAccordion: renderAccordion,
        onClickToggleDropdown: onClickToggleDropdown,
        onKeyPressToggleAll: onKeyPressToggleAll
    };

})();

export default AccordionModule;