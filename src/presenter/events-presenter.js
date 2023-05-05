import ListView from '../view/list-view.js';
import SortView from '../view/sort-view.js';
import EditRoutFormView from '../view/edit-rout-form-view.js';
import RoutPointView from '../view/route-point-view.js';
import {render} from '../render.js';

export default class EventPresenter {
  listComponent = new ListView();

  constructor({eventContainer, pointsModel}) {
    this.eventContainer = eventContainer;
    this.pointsModel = pointsModel;
  }

  init() {
    this.eventPoints = [...this.pointsModel.getPoints()];
    this.eventOffers = [...this.pointsModel.getOffers()];
    this.eventDestinations = [...this.pointsModel.getDestinations()];

    render(new SortView(), this.eventContainer);
    render(this.listComponent, this.eventContainer);
    render(new EditRoutFormView({point: this.eventPoints[0], offers: this.eventOffers, destinations: this.eventDestinations}), this.listComponent.getElement());

    for (let i = 1; i < this.eventPoints.length; i++) {
      render(new RoutPointView({point: this.eventPoints[i], offers: this.eventOffers, destinations: this.eventDestinations}), this.listComponent.getElement());
    }
  }
}
