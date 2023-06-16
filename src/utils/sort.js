import { SortTypes } from '../const';
import { getDataDifference, getTimeDifference, getPriceDifference } from './points';

if(!Array.prototype.toSorted) {
  Array.prototype.toSorted = function(fn) {
    return [...this].sort(fn);
  };
}

const sort = {
  [SortTypes.DAY]: (points) => points.toSorted(getDataDifference),
  [SortTypes.PRICE]: (points) => points.toSorted(getPriceDifference) ,
  [SortTypes.EVENT]: () => {
    throw new Error (`Sort by ${SortTypes.OFFERS} is not implemented`);
  },
  [SortTypes.OFFERS]:() => {
    throw new Error (`Sort by ${SortTypes.OFFERS} is not implemented`);
  },
  [SortTypes.TIME]: (points) => points.toSorted(getTimeDifference),
};

export {sort};
