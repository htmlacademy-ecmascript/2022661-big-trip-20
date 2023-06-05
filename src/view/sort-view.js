import AbstractView from '../framework/view/abstract-view';
import { SORT_TYPES } from '../const';

const enebledSortType = {
  [SORT_TYPES.DAY] : true,
  [SORT_TYPES.EVENT]: false,
  [SORT_TYPES.TIME]: true,
  [SORT_TYPES.OFFERS]:false,
  [SORT_TYPES.PRICE]: true,
};

function createSortItemTemplate(sortType, currentSortType) {
  const {type , isDisabled} = sortType;

  return /*html*/ `
    <div class="trip-sort__item  trip-sort__item--${type}">
      <input
        data-sort-type=${type}
        id="sort-${type}"
        class="trip-sort__input  visually-hidden"
        type="radio"
        name="trip-sort"
        value="sort-${type}"
        ${type === currentSortType ? 'checked' : ''}
        ${isDisabled ? 'disabled' : ''}
      >
      <label class="trip-sort__btn" for="sort-${type}">${type}</label>
    </div>
  `;
}

function createSortTemplate(currentSortType) {

  const sortItemTemplate = Object.values(SORT_TYPES)
    .map((type) => createSortItemTemplate({type, isDisabled: !enebledSortType[type]}, currentSortType))
    .join('');


  return /*html*/ `
    <form class="trip-events__trip-sort  trip-sort" action="#" method="get">
      ${sortItemTemplate}
    </form>
  `;
}

export default class SortView extends AbstractView {
  #handleSortTypeChange = null;
  #currentSortType = null;

  constructor({currentSortType, onSortTypeChange}) {
    super();

    this.#currentSortType = currentSortType;
    this.#handleSortTypeChange = onSortTypeChange;

    this.element.addEventListener('change', this.#sortTypeChangeHandler);
  }

  get template() {
    return createSortTemplate(this.#currentSortType);
  }

  #sortTypeChangeHandler = (evt) => {
    evt.preventDefault();
    this.#handleSortTypeChange(evt.target.dataset.sortType);
  };
}
