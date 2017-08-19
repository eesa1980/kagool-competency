/**
 * Created by lewisjames-odwin on 17/08/2017.
 */

import AccordionModule from './modules/accordion/Accordion';

//Allows window access to AccordionModule
window.Accordion = AccordionModule;
AccordionModule.renderAccordion();
AccordionModule.onKeyPressToggleAll();
