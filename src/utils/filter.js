import { FILTER_TYPES } from '../const';
import { isPointDateExpired, isPointDateInFuture, isPointDateInPresent } from '../utils/points.js';

const filter = {
  [FILTER_TYPES.EVERYTHING]: (points) => [...points],
  [FILTER_TYPES.FUTURE]: (points) => points.filter((point) => isPointDateInFuture(point.dateFrom)),
  [FILTER_TYPES.PRESENT]: (points) => points.filter((point) => isPointDateInPresent(point.dateFrom, point.dateTo)),
  [FILTER_TYPES.PAST]: (points) => points.filter((point) => isPointDateExpired(point.dateTo)),
};

function generateFilter(routePoints) {
  return Object.entries(filter).map(
    ([filterType, filterPoints]) => ({
      type: filterType,
      hasPoints: filterPoints(routePoints).length > 0
    }),
  );
}

export {generateFilter};
