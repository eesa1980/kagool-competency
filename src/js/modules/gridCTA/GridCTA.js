/**
 * Created by lewisjames-odwin on 19/08/2017.
 */
import * as Helpers from '../../helpers/Helpers';
import _ from 'lodash';
import LazyLoad from 'vanilla-lazyload/dist/lazyload.min';

const GridCTA = (() => {
    "use strict";

    let data = {};

    const renderGrid = (beersData) => {

        //Set data variable to be used in onChangeABVFilter function if needed
        data = beersData;

        //Use data object to render Handlebar element
        Helpers.HandlebarsHelper.renderElement({
            handlebarId: 'grid_cta_hb',
            data: {beers: data},
            outputElement: '#grid_cta'
        });
    };

    //When the ABV filter is changed
    const onChangeABVFilter = ((event) => {

        const
            LOW_TO_HIGH = "low_to_high",
            HIGH_TO_LOW = "high_to_low",
            selectedOption = event.target.value;

        let order = [];

        //Set 'order' depending upon selected value
        switch (selectedOption) {
            case HIGH_TO_LOW:
                order = ['asc', 'desc']; //Descending
                break;
            case LOW_TO_HIGH:
                order = ['desc', 'asc']; //Ascending
                break;
            default:
                order = ['asc', 'desc'];
        }

        //Re-order data object using Lodash library
        let reorderedData = _.orderBy(data, ['type', 'abv'], order);

        /* Pass in re-ordered data object and then re-render handlebar template */
        Helpers.HandlebarsHelper.renderElement({
            handlebarId: 'grid_cta_hb',
            data: {beers: reorderedData},
            outputElement: '#grid_cta'
        });

        //re-init image lazyload
        const lazyload = new LazyLoad();

    });

//----------------------------------*\
// PUBLIC API
//----------------------------------*/
    return {
        renderGrid: renderGrid,
        onChangeABVFilter: onChangeABVFilter
    };

})();

export default GridCTA;