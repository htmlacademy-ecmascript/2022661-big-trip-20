import { SortType } from '../const';
import { getDataDifference, getTimeDifference, getPriceDifference } from './points';

if(!Array.prototype.toSorted) {
  Array.prototype.toSorted = function(fn) {
    return [...this].sort(fn);
  };
}

const sort = {
  [SortType.DAY]: (points) => points.toSorted(getDataDifference),
  [SortType.PRICE]: (points) => points.toSorted(getPriceDifference) ,
  [SortType.EVENT]: () => {
    throw new Error (`Sort by ${SortType.OFFERS} is not implemented`);
  },
  [SortType.OFFERS]:() => {
    throw new Error (`Sort by ${SortType.OFFERS} is not implemented`);
  },
  [SortType.TIME]: (points) => points.toSorted(getTimeDifference),
};

export {sort};
