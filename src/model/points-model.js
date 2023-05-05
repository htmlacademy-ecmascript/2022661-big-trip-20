import { mockDestinations } from '../mock/destination';
import { getRandomRoutPoint } from '../mock/route-points';
import { mockOffers } from '../mock/offers';

const POINTS_COUNT = 4;

export default class PointsModel {
  points = Array.from({length: POINTS_COUNT}, getRandomRoutPoint);
  destinations = mockDestinations;
  offers = mockOffers;

  getPoints() {
    return this.points;
  }

  getDestinations() {
    return this.destinations;
  }

  getOffers() {
    return this.offers;
  }
}
