import {remove, render} from '../framework/render';
import { sort } from '../utils/sort';
import { SORT_TYPES, UpdateType, UserAction } from '../const';
import ListView from '../view/list-view';
import SortView from '../view/sort-view';
import EmptyListMessage from '../view/empty-list-view';
import PointPresenter from './point-presenter';
import NewPointPresenter from './new-point-presenter';
import { filter } from '../utils/filter';
import { FILTER_TYPES } from '../const';

export default class EventPresenter {
  #listComponent = new ListView();
  #emptyListComponent = null;
  #sortComponent = null;

  #pointPresenters = new Map();
  #newPointPresenter = null;

  #eventContainer = null;
  #pointsModel = null;
  #destinationsModel = null;
  #offersModel = null;
  #filterModel = null;

  #currentSortType = SORT_TYPES.DAY;
  #filterType = FILTER_TYPES.EVERYTHING;
  #isCreating = false;

  #onNewRoutPointClose = null;

  constructor({eventContainer, pointsModel ,offersModel, destinationsModel, filterModel, onNewRoutPointClose}) {
    this.#eventContainer = eventContainer;
    this.#pointsModel = pointsModel;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
    this.#filterModel = filterModel;
    this.#onNewRoutPointClose = onNewRoutPointClose;

    this.#newPointPresenter = new NewPointPresenter({
      offersModel: this.#offersModel,
      destinationModel: this.#destinationsModel,
      listComponent: this.#listComponent.element,
      onClose: this.#closeNewPoint,
      onDataChange: this.#handleViewAction,

    });

    this.#pointsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get points() {
    this.#filterType = this.#filterModel.filter;
    const points = this.#pointsModel.points;

    const filteredPoints = filter[this.#filterType](points);

    return sort[this.#currentSortType](filteredPoints);
  }

  init() {
    this.#renderEventsBoard();
  }

  createPoint() {
    this.#isCreating = true;
    this.#currentSortType = SORT_TYPES.DAY;
    this.#filterModel.setFilter(UpdateType.MAJOR, FILTER_TYPES.EVERYTHING);

    this.#handleModeChange();
    this.#newPointPresenter.init();
  }

  #closeNewPoint = () => {
    this.#isCreating = false;
    this.#onNewRoutPointClose();
    if(!this.points.length) {
      this.#renderEmptyList();
      remove(this.#sortComponent);
      this.#sortComponent = null;
    }
  };

  #renderPoint(point, offersModel, destinationModel) {
    const pointPresenter = new PointPresenter({
      listComponent: this.#listComponent.element,
      offersModel: offersModel,
      destinationModel: destinationModel,
      onDataChange: this.#handleViewAction,
      onModeChange: this.#handleModeChange
    });
    pointPresenter.init(point);
    this.#pointPresenters.set(point.id, pointPresenter);
  }

  #renderPoints(points) {
    points.forEach((point) => {
      this.#renderPoint(
        point,
        this.#offersModel,
        this.#destinationsModel,
      );
    });
  }

  #renderPointsList() {
    render(this.#listComponent, this.#eventContainer);
    this.#renderPoints(this.points);
  }

  #renderEmptyList() {
    this.#emptyListComponent = new EmptyListMessage({
      filterType : this.#filterType,
    });
    render(this.#emptyListComponent, this.#eventContainer);
  }

  #renderSortList() {
    this.#sortComponent = new SortView({
      currentSortType: this.#currentSortType,
      onSortTypeChange: this.#handleSortTypeChange,
    });
    render(this.#sortComponent, this.#eventContainer);
  }

  #renderEventsBoard() {
    if (!this.points.length && !this.#isCreating) {
      this.#renderEmptyList();
    } else {
      this.#renderSortList();
      this.#renderPointsList();
    }
  }

  #clearBoard({resetSortType = false} = {}) {
    this.#newPointPresenter.destroy();
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();

    remove(this.#sortComponent);

    if (this.#emptyListComponent) {
      remove(this.#emptyListComponent);
    }

    if(resetSortType) {
      this.#currentSortType = SORT_TYPES.DAY;
    }
  }

  #handleModeChange = () => {
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
    if(this.#newPointPresenter) {
      this.#newPointPresenter.destroy();
    }
  };

  #handleViewAction = (actionType, updateType, update) => {
    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this.#pointsModel.updatePoint(updateType, update);
        break;
      case UserAction.ADD_POINT:
        this.#pointsModel.addPoint(updateType, update);
        break;
      case UserAction.DELETE_POINT:
        this.#pointsModel.deletePoint(updateType, update);
        break;
    }
  };

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#pointPresenters.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        this.#clearBoard();
        this.#renderEventsBoard();
        break;
      case UpdateType.MAJOR:
        this.#clearBoard({resetSortType: true});
        this.#renderEventsBoard();
        break;
    }
  };

  #handleSortTypeChange = (sortType) => {
    if(this.#currentSortType === sortType) {
      return;
    }

    this.#currentSortType = sortType;
    this.#clearBoard();
    this.#renderEventsBoard();
  };
}
