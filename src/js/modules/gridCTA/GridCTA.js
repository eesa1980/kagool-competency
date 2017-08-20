/**
 * Created by lewisjames-odwin on 19/08/2017.
 */
import * as Helpers from '../../helpers/Helpers';
import _ from 'lodash';
import LazyLoad from 'vanilla-lazyload/dist/lazyload.min';

const GridCTA = (() => {
    "use strict";

    let data = {};

    /* Fetch Data and then render the accordion template */
    const renderGrid = (beersData) => {
        data = beersData;
        Helpers.HandlebarsHelper.renderElement({
            handlebarId: 'grid_cta_hb',
            data: {beers: data},
            outputElement: '#grid_cta'
        });
    };

    const onChangeABVFilter = ((event) => {

        const
            LOW_TO_HIGH = "low_to_high",
            HIGH_TO_LOW = "high_to_low",
            selectedOption = event.target.value;

        let order = [];

        switch (selectedOption) {
            case HIGH_TO_LOW:
                order = ['asc', 'desc'];
                break;
            case LOW_TO_HIGH:
                order = ['desc', 'asc'];
                break;
            default:
        }

        let reorderedData = _.orderBy(data, ['type', 'abv'], order);

        Helpers.HandlebarsHelper.renderElement({
            handlebarId: 'grid_cta_hb',
            data: {beers: reorderedData},
            outputElement: '#grid_cta'
        });

        let myLazyLoad = new LazyLoad();

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