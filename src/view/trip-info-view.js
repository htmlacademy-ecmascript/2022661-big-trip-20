import AbstractView from '../framework/view/abstract-view';
import { getDataDifference } from '../utils/points';
import {humanizeEventDate, DATE_FORMAT } from '../utils/points.js';

import he from 'he';

function createTripInfoTemplate (points, destinations, offers) {

  const dayFilteredPoints = points.length ? points.toSorted(getDataDifference) : '';
  const FIRST_POINT = 0;
  const LAST_POINT = dayFilteredPoints.length - 1;
  const DESTINATION_TITLE_LENGTH = 3;

  function getTripDuration() {
    const firstPointDay = humanizeEventDate(dayFilteredPoints[FIRST_POINT].dateFrom, DATE_FORMAT);
    const lastPointDay = humanizeEventDate(dayFilteredPoints[LAST_POINT].dateTo, DATE_FORMAT);
    return `${firstPointDay}&nbsp;&mdash;&nbsp;${lastPointDay}`;
  }

  function getTripDestination() {
    const destinationsNames = dayFilteredPoints.map((point) => destinations.find((item) => item.id === point.destination).name);

    return destinationsNames.length <= DESTINATION_TITLE_LENGTH
      ? destinationsNames.join('&nbsp;&mdash;&nbsp;')
      : `${he.encode(`${destinationsNames[FIRST_POINT]}`)}&nbsp;&mdash;&nbsp;...&nbsp;&mdash;&nbsp;${he.encode(`${destinationsNames[LAST_POINT]}`)}`;
  }

  function getOffersCost(offersIds, allOffers) {
    return offersIds.reduce(
      (result, id) => result + (allOffers.find((offer) => offer.id === id)?.price ?? 0),
      0
    );
  }

  function getTripCost() {
    const price = points?.reduce(
      (result, point) => result + point.basePrice + getOffersCost(point.offers, offers.find((offer) => point.type === offer.type)?.offers),
      0
    );
    return price;
  }

  return /*html*/ `
    <section class="trip-main__trip-info trip-info">
      <div class="trip-info__main">
        <h1 class="trip-info__title">${points.length ? getTripDestination() : ''}</h1>

        <p class="trip-info__dates">${points.length ? getTripDuration() : ''}</p>
      </div>
      <p class="trip-info__cost">
        Total: &euro;&nbsp;<span class="trip-info__cost-value">${points.length ? getTripCost() : ''}</span>
      </p>

    </section>
  `;

}

export default class TripInfoView extends AbstractView {
  #points = [];
  #destinations = [];
  #offers = [];

  constructor({points, destinations, offers}) {
    super();
    this.#points = points;
    this.#destinations = destinations;
    this.#offers = offers;
  }

  get template() {
    return createTripInfoTemplate(this.#points, this.#destinations, this.#offers);
  }
}
