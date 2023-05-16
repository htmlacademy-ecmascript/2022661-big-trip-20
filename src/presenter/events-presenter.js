import {render} from '../framework/render';
import ListView from '../view/list-view';
import SortView from '../view/sort-view';
import EmptyListMessage from '../view/empty-list-view';
import PointPresenter from './point-presenter';

export default class EventPresenter {
  #listComponent = new ListView();
  #eventPoints = [];

  #eventContainer = null;
  #pointsModel = null;
  #destinationsModel = null;
  #offersModel = null;

  constructor({eventContainer, pointsModel ,offersModel, destinationsModel}) {
    this.#eventContainer = eventContainer;
    this.#pointsModel = pointsModel;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
  }

  init() {
    this.#eventPoints = [...this.#pointsModel.points];

    this.#renderEventsBoard();
  }

  #renderPoint({point, offers, destinations}) {
    const pointPresenter = new PointPresenter({
      listComponent: this.#listComponent.element
    });
    pointPresenter.init({point, offers, destinations});
  }

  #renderPoints() {
    for (let i = 0; i < this.#eventPoints.length; i++) {
      this.#renderPoint({point: this.#eventPoints[i],
        offers: this.#offersModel.getOffersByType(this.#eventPoints[i].type),
        destinations: this.#destinationsModel.getDestinationById(this.#eventPoints[i].destination)});
    }
  }

  #renderPointsList() {
    render(this.#listComponent, this.#eventContainer);
    this.#renderPoints();
  }

  #renderEmptyList() {
    render(new EmptyListMessage(), this.#eventContainer);
  }

  #renderEventsBoard() {
    if (!this.#eventPoints.length) {
      this.#renderEmptyList();
    } else {
      render(new SortView(), this.#eventContainer);
      this.#renderPointsList();
    }
  }
}
