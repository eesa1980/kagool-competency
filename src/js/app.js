/**
 * Created by lewisjames-odwin on 17/08/2017.
 */
/*jshint browser: true */
/*jshint globalstrict: true*/
'use strict';
import AccordionModule from './accordion/Accordion';
import $ from 'jquery';

//Allows window access to AccordionModule
window.Accordion = AccordionModule;
AccordionModule.renderAccordion();
AccordionModule.onKeyPressToggleAll();
