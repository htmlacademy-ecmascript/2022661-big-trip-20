import AbstractView from '../framework/view/abstract-view';

function createFilterItemTemplate(filter, isChecked) {
  const {type, hasPoints} = filter;

  return /*html*/ `
    <div class="trip-filters__filter">
      <input
        id="filter-${(type).toLowerCase()}"
        class="trip-filters__filter-input  visually-hidden" type="radio"
        name="trip-filter"
        value="${(type).toLowerCase()}"
        ${isChecked ? 'checked' : ''}
        ${ hasPoints ? '' : 'disabled'}
      >
      <label class="trip-filters__filter-label" for="filter-${(type).toLowerCase()}">${type}</label>
    </div>
  `;
}

function createFiltersTemplate(filters) {
  const filterItemsTemplate = filters
    .map((filter, index) => createFilterItemTemplate(filter, index === 0))
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

  constructor({filters}) {
    super();

    this.#filters = filters;
  }

  get template() {
    return createFiltersTemplate(this.#filters);
  }
}