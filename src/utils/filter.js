import { FilterType } from '../const';
import { isPointDateExpired, isPointDateInFuture, isPointDateInPresent } from '../utils/points.js';

const filter = {
  [FilterType.EVERYTHING]: (points) => [...points],
  [FilterType.FUTURE]: (points) => points.filter((point) => isPointDateInFuture(point.dateFrom)),
  [FilterType.PRESENT]: (points) => points.filter((point) => isPointDateInPresent(point.dateFrom, point.dateTo)),
  [FilterType.PAST]: (points) => points.filter((point) => isPointDateExpired(point.dateTo)),
};

export {filter};
