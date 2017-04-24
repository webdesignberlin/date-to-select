//import { install } from 'source-map-support';

import DateToSelect from './index';

let trigger = document.querySelector('.date-trigger');

let dateToSelect = new DateToSelect(trigger);
dateToSelect.init();
