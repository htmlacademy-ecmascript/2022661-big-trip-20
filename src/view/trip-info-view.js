import AbstractView from '../framework/view/abstract-view';
import { getDataDifference } from '../utils/points';
import {humanizeEventDate, DATE_FORMAT } from '../utils/points.js';

function findDestinationById (allDestinations, point) {
  const destination = allDestinations.find((item) => item.id === point.destination);
  return destination.name;
}

function createTripInfoTemplate (points, destinations) {

  const dayFilteredPoints = points.length ? points.toSorted(getDataDifference) : '';
  const FIRST_POINT = 0;
  const LAST_POINT = dayFilteredPoints.length - 1;

  function getTripDuration() {
    const firstPointDay = humanizeEventDate(dayFilteredPoints[FIRST_POINT].dateFrom, DATE_FORMAT);
    const lastPointDay = humanizeEventDate(dayFilteredPoints[LAST_POINT].dateTo, DATE_FORMAT);
    return `${firstPointDay}&nbsp;&mdash;&nbsp;${lastPointDay}`;
  }

  function getTripDestination() {
    const firsDestination = findDestinationById(destinations, dayFilteredPoints[FIRST_POINT]);
    const secondDestination = findDestinationById(destinations, dayFilteredPoints[1]);
    const lastDestination = findDestinationById(destinations, dayFilteredPoints[LAST_POINT]);

    if (dayFilteredPoints.length === 1) {
      return firsDestination;
    } else if (dayFilteredPoints.length === 2) {
      return `${firsDestination} &mdash; ${lastDestination}`;
    } else if (dayFilteredPoints.length === 3) {
      return `${firsDestination} &mdash; ${secondDestination} &mdash; ${lastDestination}`;
    } else if (dayFilteredPoints.length > 3) {
      return `${firsDestination} &mdash; ... &mdash; ${lastDestination}`;
    }
  }

  return /*html*/ `
    <section class="trip-main__trip-info trip-info">
      <div class="trip-info__main">
        <h1 class="trip-info__title">${points.length ? getTripDestination() : ''}</h1>

        <p class="trip-info__dates">${points.length ? getTripDuration() : ''}</p>
      </div>

      <p class="trip-info__cost">
        Total: &euro;&nbsp;<span class="trip-info__cost-value">1230</span>
      </p>
    </section>
  `;
}

export default class TripInfoView extends AbstractView {
  #points = [];
  #destinations = [];

  constructor({points, destinations}) {
    super();
    this.#points = points;
    this.#destinations = destinations;
  }

  get template() {
    return createTripInfoTemplate(this.#points, this.#destinations);
  }
}
