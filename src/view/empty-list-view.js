import AbstractView from '../framework/view/abstract-view';
import { FilterTypes } from '../const';

const LIST_EMPTY_TEXT = {
  [FilterTypes.EVERYTHING]: 'Click New Event to create your first point',
  [FilterTypes.PAST] : 'There are no past events now',
  [FilterTypes.PRESENT] : 'There are no present events now',
  [FilterTypes.FUTURE] : 'There are no future events now',
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
