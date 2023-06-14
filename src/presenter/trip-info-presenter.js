import TripInfoView from '../view/trip-info-view';
import { RenderPosition } from '../framework/render';
import { render } from '../framework/render';


export default class TripInfoPresenter {
  #tripMainElement = null;
  #tripInfoComponent = null;
  #pointsModel = null;
  #destinationsModel = null;
  #points = [];
  #destinations = [];

  constructor({tripMainElement, pointsModel, destinationsModel}) {
    this.#tripMainElement = tripMainElement;
    this.#pointsModel = pointsModel;
    this.#destinationsModel = destinationsModel;
  }

  async init() {

    await Promise.all([
      this.#points = this.#pointsModel.points,
      this.#destinations = this.#destinationsModel.destinations
    ]);

    this.#tripInfoComponent = new TripInfoView({points: this.#points, destinations: this.#destinations});

    render(this.#tripInfoComponent, this.#tripMainElement, RenderPosition.AFTERBEGIN);
  }
}
