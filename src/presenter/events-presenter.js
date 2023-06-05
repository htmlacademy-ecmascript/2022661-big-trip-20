import {remove, render} from '../framework/render';
import { sort } from '../utils/sort';
import { SORT_TYPES, UpdateType, UserAction } from '../const';
import ListView from '../view/list-view';
import SortView from '../view/sort-view';
import EmptyListMessage from '../view/empty-list-view';
import PointPresenter from './point-presenter';

export default class EventPresenter {
  #listComponent = new ListView();
  #pointPresenters = new Map();

  #eventContainer = null;
  #pointsModel = null;
  #destinationsModel = null;
  #offersModel = null;

  #emptyListComponent = null;

  #sortComponent = null;
  #currentSortType = SORT_TYPES.DAY;

  constructor({eventContainer, pointsModel ,offersModel, destinationsModel}) {
    this.#eventContainer = eventContainer;
    this.#pointsModel = pointsModel;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;

    this.#pointsModel.addObserver(this.#handleModelEvent);
  }

  get points() {
    return sort[this.#currentSortType]([...this.#pointsModel.points]);
  }

  init() {
    this.#renderEventsBoard();
  }

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
    this.#emptyListComponent = new EmptyListMessage();
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
    if (!this.points.length) {
      this.#renderEmptyList();
    } else {
      this.#renderSortList();
      this.#renderPointsList();
    }
  }

  #clearBoard({resetSortType = false} = {}) {
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();

    remove(this.#sortComponent);
    remove(this.#emptyListComponent);

    if(resetSortType) {
      this.#currentSortType = SORT_TYPES.DAY;
    }
  }


  #handleModeChange = () => {
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
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
