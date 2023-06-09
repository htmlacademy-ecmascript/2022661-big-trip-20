import AbstractView from '../framework/view/abstract-view';
import { FILTER_TYPES } from '../const';

const LIST_EMPTY_TEXT = {
  [FILTER_TYPES.EVERYTHING]: 'Click New Event to create your first point',
  [FILTER_TYPES.PAST] : 'There are no past events now',
  [FILTER_TYPES.PRESENT] : 'There are no present events now',
  [FILTER_TYPES.FUTURE] : 'There are no future events now',
};

function createEmptyListMessageView ({filterType}) {
  const filterText = LIST_EMPTY_TEXT[filterType];

  return /*html*/ `
    <p class="trip-events__msg">${filterText}</p>
  `;
}

export default class EmptyListMessage extends AbstractView {
  #filterType = null;

  constructor (filterType) {
    super();

    this.#filterType = filterType;
  }

  get template () {
    return createEmptyListMessageView(this.#filterType);
  }
}
