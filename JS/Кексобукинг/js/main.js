/* global _:readonly */

import './validation.js';
import {getData, renderMarker, setMarkerTypeClick, setMarkerPriceClick, setMarkerRoomsClick, setMarkerGuestsClick,setMarkerFeaturesClick, count} from './map.js';
import {setFormSubmit} from './form.js'
import './avatar.js';
const RERENDER_DELAY = 500;
setFormSubmit();
getData((data, count)=> {renderMarker(data, count);
  setMarkerTypeClick(_.debounce(() => renderMarker(data),RERENDER_DELAY));
  setMarkerPriceClick(_.debounce(() => renderMarker(data),RERENDER_DELAY));
  setMarkerRoomsClick(_.debounce(() => renderMarker(data),RERENDER_DELAY));
  setMarkerGuestsClick(_.debounce(() => renderMarker(data),RERENDER_DELAY));
  setMarkerFeaturesClick(_.debounce(() => renderMarker(data),RERENDER_DELAY));
})
















