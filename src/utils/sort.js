import { SORT_TYPES } from '../const';
import { getDataDifference, getTimeDifference, getPriceDifference } from './points';

if(!Array.prototype.toSorted) {
  Array.prototype.toSorted = function(fn) {
    return [...this].sort(fn);
  };
}

const sort = {
  [SORT_TYPES.DAY]: (points) => points.toSorted(getDataDifference),
  [SORT_TYPES.PRICE]: (points) => points.toSorted(getPriceDifference) ,
  [SORT_TYPES.EVENT]: () => {
    throw new Error (`Sort by ${SORT_TYPES.OFFERS} is not implemented`);
  },
  [SORT_TYPES.OFFERS]:() => {
    throw new Error (`Sort by ${SORT_TYPES.OFFERS} is not implemented`);
  },
  [SORT_TYPES.TIME]: (points) => points.toSorted(getTimeDifference),
};

export {sort};
