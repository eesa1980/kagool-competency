import $ from 'jquery';
import {renderElement} from '../../helpers/Helpers';

const AccordionModule = (() => {
    'use strict';

    /*
    I find it's easy for me to get carried away with jQuery code so I've used a lot of functions to help me
    understand what's going on.  Probably not the best thing as it creates extra lines of code!
    */

    // The clicked trigger
    let $trigger;

    // Open or close dropdown when trigger clicked
    const onClickToggleDropdown = (e, el) => {

        // Stop anchor from trying to navigate
        e.preventDefault();

        // Set trigger with 'this' returned from clicked trigger.
        $trigger = $(el);

        // Opens/Closes the clicked dropdown on trigger
        const toggleClicked = () => {
            $trigger
                .toggleClass('active')
                .next()
                .slideToggle();
        };

        // Closes all other parent elements on trigger
        const closeAllOthers = () => {
            $trigger
                .parent().parent()
                .find('.dropdown')
                .slideUp()
                .prev()
                .removeClass('active')
            ;
        };

        // Closes dropdown on trigger
        const closeClicked = () => {
            $trigger
                .removeClass('active')
                .next()
                .slideUp();
        };

        // Scrolls to top of trigger, then executes callback
        const scrollToTopOfTrigger = (callback) => {
            setTimeout(() => {
                $('html, body').animate({
                    scrollTop: $trigger.offset().top
                }, 1000);
            }, 500, callback);
        };

        // Execute appropriate functions depending upon whether dropdown opened or closed */
        const isCurrentDropdownOpen = $trigger.hasClass('active');
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

    // Open or close all on keypress up/down arrows
    const onKeyPressToggleAll = () => {
        window.addEventListener('keydown', (e) => {
            let $dropdown = $('.dropdown');
            if (e.key === "ArrowDown") {
                $dropdown.slideDown();
            }
            else if (e.key === "ArrowUp") {
                $dropdown.slideUp();
            }
        });
    };


    // Pass in data and then render the accordion template
    const renderAccordion = (data) => {
        renderElement({
            handlebarId: 'accordion_hb',
            data: {beers: data},
            outputElement: '#accordion'
        });

        onKeyPressToggleAll();
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