import AbstractView from '../framework/view/abstract-view';

function createFilterItemTemplate(filter, currentFilterType) {
  const {type, hasPoints} = filter;

  return /*html*/ `
    <div class="trip-filters__filter">
      <input
        id="filter-${(type).toLowerCase()}"
        class="trip-filters__filter-input  visually-hidden" type="radio"
        name="trip-filter"
        value="${(type).toLowerCase()}"
        ${type === currentFilterType ? 'checked' : ''}
        ${ hasPoints ? '' : 'disabled'}
      >
      <label class="trip-filters__filter-label" for="filter-${(type).toLowerCase()}">${type}</label>
    </div>
  `;
}

function createFiltersTemplate(filters, currentFilterType) {
  const filterItemsTemplate = filters
    .map((filter) => createFilterItemTemplate(filter, currentFilterType))
    .join('');

  return (
    `<form class="trip-filters" action="#" method="get">
        ${filterItemsTemplate}
        <button class="visually-hidden" type="submit">Accept filter</button>
    </form>`
  );
}

export default class FiltersView extends AbstractView {
  #filters = null;
  #currentFilterType = null;
  #handleFilterTypeChange = null;

  constructor({filters, currentFilterType, onFilterTypeChange}) {
    super();

    this.#filters = filters;
    this.#currentFilterType = currentFilterType;
    this.#handleFilterTypeChange = onFilterTypeChange;

    this.element.addEventListener('change', this.#filterTypeChangeHandler);
  }

  get template() {
    return createFiltersTemplate(this.#filters, this.#currentFilterType);
  }

  #filterTypeChangeHandler = (evt) => {
    evt.preventDefault();
    this.#handleFilterTypeChange(evt.target.value);
  };
}
