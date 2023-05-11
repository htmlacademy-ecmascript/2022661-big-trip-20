import { getRandomRoutPoint } from '../mock/route-points';

const POINTS_COUNT = 4;

export default class PointsModel {
  #points = Array.from({length: POINTS_COUNT}, getRandomRoutPoint);

  get points() {
    return this.#points;
  }
}
