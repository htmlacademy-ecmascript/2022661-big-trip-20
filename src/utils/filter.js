import { FilterTypes } from '../const';
import { isPointDateExpired, isPointDateInFuture, isPointDateInPresent } from '../utils/points.js';

const filter = {
  [FilterTypes.EVERYTHING]: (points) => [...points],
  [FilterTypes.FUTURE]: (points) => points.filter((point) => isPointDateInFuture(point.dateFrom)),
  [FilterTypes.PRESENT]: (points) => points.filter((point) => isPointDateInPresent(point.dateFrom, point.dateTo)),
  [FilterTypes.PAST]: (points) => points.filter((point) => isPointDateExpired(point.dateTo)),
};

export {filter};
