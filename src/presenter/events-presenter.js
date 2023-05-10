import ListView from '../view/list-view.js';
import SortView from '../view/sort-view.js';
import EditRoutFormView from '../view/edit-rout-form-view.js';
import RoutPointView from '../view/route-point-view.js';
import {render} from '../framework/render';

export default class EventPresenter {
  listComponent = new ListView();

  constructor({eventContainer, pointsModel ,offersModel, destinationsModel}) {
    this.eventContainer = eventContainer;
    this.pointsModel = pointsModel;
    this.destinationsModel = destinationsModel;
    this.offersModel = offersModel;
  }

  init() {
    this.eventPoints = [...this.pointsModel.getPoints()];

    render(new SortView(), this.eventContainer);
    render(this.listComponent, this.eventContainer);

    render(new EditRoutFormView({
      point: this.eventPoints[0],
      offers: this.offersModel.getOffersByType(this.eventPoints[0].type),
      destinations: this.destinationsModel.getDestinationById(this.eventPoints[0].destination)
    }),
    this.listComponent.element);


    for (let i = 1; i < this.eventPoints.length; i++) {
      render(new RoutPointView({
        point: this.eventPoints[i],
        offers: this.offersModel.getOffersByType(this.eventPoints[i].type),
        destinations: this.destinationsModel.getDestinationById(this.eventPoints[i].destination)
      }),
      this.listComponent.element);
    }
  }
}
