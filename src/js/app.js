/**
 * Created by lewisjames-odwin on 17/08/2017.
 */

import AccordionModule from './modules/accordion/Accordion';
import GridCTAModule from './modules/gridCTA/GridCTA';
import objectFitImages from 'object-fit-images';
import es6promise from 'es6-promise';

//Polyfill for promises
es6promise.polyfill();

//Polyfill for object fit/position
objectFitImages();

//Allows window access to Modules
window.Accordion = AccordionModule;
window.GridCTA = GridCTAModule;

AccordionModule.renderAccordion();
AccordionModule.onKeyPressToggleAll();

GridCTAModule.renderGrid();


