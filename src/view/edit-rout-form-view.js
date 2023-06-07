import AbstractStatefulView from '../framework/view/abstract-stateful-view';
import { POINT_TYPES } from '../const';
import {humanizeEventDate, FULL_DATE_FORMAT } from '../utils/points';

import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';


const BLANK_POINT = {
  basePrice: '',
  dateFrom: '',
  dateTo: '',
  offers: [1],
  type: POINT_TYPES.TAXI,
  destination: '1'
};

function createTypesChooserTemplate(pointTypes) {
  return Object.values(pointTypes)
    .map((item) => /*html*/ `
      <div class="event__type-item">
        <input id="event-type-${item.toLowerCase()}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${item.toLowerCase()}">
        <label class="event__type-label  event__type-label--${item.toLowerCase()}" for="event-type-${item.toLowerCase()}-1" data-type=${item}>${item}</label>
      </div>
    `)
    .join('');
}

function createDestinationDescriptionTemplate(myDestination) {
  const { pictures, description } = myDestination;

  const destinationPictures = pictures
    .map((picture) => /*html*/ `
      <img class="event__photo" src="${picture.src}" alt="${picture.alt}">
    `)
    .join('');

  return /*html*/ `
    <p class="event__destination-description">${description}</p>

    <div class="event__photos-container">
      <div class="event__photos-tape">
        ${destinationPictures}
      </div>
    </div>
  `;
}

function createEditRoutFormTemplate (point, allOffers, allDestinations) {
  const {basePrice, dateFrom, dateTo, offers, type, destination} = point;

  const timeFrom = humanizeEventDate(dateFrom, FULL_DATE_FORMAT);
  const timeTo = humanizeEventDate(dateTo, FULL_DATE_FORMAT);

  const offersByType = allOffers.find((item) => item.type === type).offers;
  const destinationById = allDestinations.find((itemDestination) => itemDestination.id === destination);

  function createOffersTemplate() {
    return offersByType
      .map((offer) => {
        const checked = offers.includes(offer.id) ? 'checked' : '';

        return /*html*/ `
          <div class="event__offer-selector">
            <input class="event__offer-checkbox  visually-hidden" id="event-offer-${offer.title}-${offer.id}" data-offer-id="${offer.id}" type="checkbox" name="event-offer-${offer.title}" ${checked}>
            <label class="event__offer-label" for="event-offer-${offer.title}-${offer.id}">
              <span class="event__offer-title">${offer.title}</span>
              &plus;&euro;&nbsp;
              <span class="event__offer-price">${offer.price}</span>
            </label>
          </div>
        `;
      })
      .join('');
  }

  function createDestinationsListTemplate() {
    return allDestinations
      .map((item) => `
        <option value="${item.name}" data-destination-id="${item.id}"></option>`
      )
      .join('');
  }

  return /*html*/`
    <li class="trip-events__item">
      <form class="event event--edit" action="#" method="post">
        <header class="event__header">
          <div class="event__type-wrapper">
            <label class="event__type  event__type-btn" for="event-type-toggle-1">
              <span class="visually-hidden">Choose event type</span>
              <img class="event__type-icon" width="17" height="17" src="img/icons/${type.toLowerCase()}.png" alt="Event type icon">
            </label>
            <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

            <div class="event__type-list">
              <fieldset class="event__type-group">
                <legend class="visually-hidden">Event type</legend>
                  ${createTypesChooserTemplate(POINT_TYPES)}
              </fieldset>
            </div>
          </div>

          <div class="event__field-group  event__field-group--destination">
            <label class="event__label  event__type-output" for="event-destination-1">
              ${type}
            </label>
            <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${destinationById.name}" list="destination-list-1">
            <datalist id="destination-list-1">
              ${createDestinationsListTemplate()}
             </datalist>
          </div>

          <div class="event__field-group  event__field-group--time">
            <label class="visually-hidden" for="event-start-time-1">From</label>
            <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${timeFrom}">
            &mdash;
            <label class="visually-hidden" for="event-end-time-1">To</label>
            <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${timeTo}">
          </div>

          <div class="event__field-group  event__field-group--price">
            <label class="event__label" for="event-price-1">
              <span class="visually-hidden">Price</span>
              &euro;
            </label>
            <input class="event__input  event__input--price" id="event-price-1" type="number" min="0" name="event-price" value="${basePrice}">
          </div>

          <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
          <button class="event__reset-btn" type="reset">Delete</button>
          <button class="event__rollup-btn" type="button">
            <span class="visually-hidden">Open event</span>
          </button>
        </header>
        <section class="event__details">
          <section class="event__section  event__section--offers">
            <h3 class="event__section-title  event__section-title--offers">Offers</h3>
            <div class="event__available-offers">
              ${createOffersTemplate(type)}
            </div>
          </section>

          <section class="event__section  event__section--destination">
            <h3 class="event__section-title  event__section-title--destination">Destination</h3>
            ${createDestinationDescriptionTemplate(destinationById)}
          </section>
        </section>
      </form>
    </li>
  `;
}

export default class EditRoutFormView extends AbstractStatefulView {
  #allOffers = null;
  #allDestinations = null;
  #handleFormSubmit = null;
  #handleRollUpClick = null;
  #handleDeleteClick = null;
  #datePickerFrom = null;
  #datePickerTo = null;

  constructor({point = BLANK_POINT, allOffers, allDestinations, onFormSubmit, onDeleteClick, onRollUpClick}) {
    super();

    this._setState(EditRoutFormView.parsePointToState(point));
    this.#allOffers = allOffers;
    this.#allDestinations = allDestinations;
    this.#handleFormSubmit = onFormSubmit;
    this.#handleDeleteClick = onDeleteClick;
    this.#handleRollUpClick = onRollUpClick;

    this._restoreHandlers();
  }

  get template() {
    return createEditRoutFormTemplate(this._state, this.#allOffers, this.#allDestinations);
  }

  removeElement() {
    super.removeElement();

    if(this.#datePickerFrom) {
      this.#datePickerFrom.destroy();
      this.#datePickerFrom = null;
    }

    if(this.#datePickerTo) {
      this.#datePickerTo.destroy();
      this.#datePickerTo = null;
    }
  }

  reset(point) {
    this.updateElement(
      EditRoutFormView.parsePointToState(point),
    );
  }

  _restoreHandlers() {
    this.element.querySelector('form')
      .addEventListener('submit', this.#formSubmitHandler);

    this.element.querySelector('.event__reset-btn')
      .addEventListener('click', this.#deleteClick);

    this.element.querySelector('.event__rollup-btn')
      .addEventListener('click', this.#rollUpButtonClick);

    this.element.querySelector('.event__type-group')
      .addEventListener('click', this.#chooseTypeHandler);

    this.element.querySelector('.event__available-offers')
      .addEventListener('click', this.#offersClickHandler);

    this.element.querySelector('.event__input--destination')
      .addEventListener('change', this.#chooseDestinationHandler);

    this.element.querySelector('.event__input--price')
      .addEventListener('change', this.#inputPriceHandler);

    this.#setDatePicker();
  }

  #setDatePicker() {

    const [dateFromElement, dateToElement] = this.element.querySelectorAll('.event__input--time');

    this.#datePickerFrom = flatpickr(
      dateFromElement,
      {
        dateFormat: 'd/m/y H:i',
        defaultDate: this._state.dateFrom,
        maxDate: this._state.dateTo,
        onChange: this.#dateFromChangeHandler,
        enableTime: true,
        locale: {
          firstDayOfWeek: 1,
        },
        'time_24hr': true
      }
    );

    this.#datePickerTo = flatpickr(
      dateToElement,
      {
        dateFormat: 'd/m/y H:i',
        defaultDate: this._state.dateTo,
        onChange: this.#dateToChangeHandler,
        enableTime: true,
        minDate: this._state.dateFrom,
        locale: {
          firstDayOfWeek: 1,
        },
        'time_24hr': true
      }
    );
  }

  #dateFromChangeHandler = ([userDate]) => {
    this._setState({
      dateFrom: userDate
    });
    this.#datePickerTo.set('minDate', this._state.dateFrom);
  };

  #dateToChangeHandler = ([userDate]) => {
    this._setState({
      dateTo: userDate
    });
    this.#datePickerFrom.set('maxDate', this._state.dateTo);
  };

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this.#handleFormSubmit(EditRoutFormView.parseStateToPoint(this._state));
  };

  #deleteClick = (evt) => {
    evt.preventDefault();
    this.#handleDeleteClick(EditRoutFormView.parseStateToPoint(this._state));
  };

  #rollUpButtonClick = (evt) => {
    evt.preventDefault();
    this.#handleRollUpClick();
  };

  #chooseTypeHandler = (evt) => {
    evt.preventDefault();
    this.updateElement({
      type : evt.target.dataset.type,
      offers: []
    });
  };

  #chooseDestinationHandler = (evt) => {
    const newDestinationName = evt.target.value;
    const newDestination = this.#allDestinations.find((item) => item.name === newDestinationName);

    if(newDestination) {
      this.updateElement({
        destination: newDestination.id,
      });
    }
  };

  #offersClickHandler = () => {
    const choosenOffers = Array.from(this.element.querySelectorAll('.event__offer-checkbox:checked'));

    const offersId = choosenOffers.map((offer) => offer.dataset.offerId);

    this._setState({
      offers: offersId,
    });
  };

  #inputPriceHandler = (evt) => {
    this._setState({
      basePrice: evt.target.value,
    });
  };

  static parsePointToState(point) {
    return {...point};
  }

  static parseStateToPoint(state) {
    return {...state};
  }
}
