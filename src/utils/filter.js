import { FILTER_TYPES } from '../const';
import { isPointDateExpired, isPointDateInFuture, isPointDateInPresent } from '../utils/points.js';

const filter = {
  [FILTER_TYPES.EVERYTHING]: (points) => [...points],
  [FILTER_TYPES.FUTURE]: (points) => points.filter((point) => isPointDateInFuture(point.dateFrom)),
  [FILTER_TYPES.PRESENT]: (points) => points.filter((point) => isPointDateInPresent(point.dateFrom, point.dateTo)),
  [FILTER_TYPES.PAST]: (points) => points.filter((point) => isPointDateExpired(point.dateTo)),
};

export {filter};
