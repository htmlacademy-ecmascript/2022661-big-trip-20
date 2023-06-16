import TripInfoView from '../view/trip-info-view';
import { RenderPosition } from '../framework/render';
import { render, remove, replace } from '../framework/render';


export default class TripInfoPresenter {
  #tripMainElement = null;
  #tripInfoComponent = null;
  #pointsModel = null;
  #destinationsModel = null;
  #offersModel = null;
  #points = [];
  #destinations = [];
  #offers = [];

  constructor({tripMainElement, pointsModel, offersModel, destinationsModel}) {
    this.#tripMainElement = tripMainElement;
    this.#pointsModel = pointsModel;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;

    this.#pointsModel.addObserver(this.#handleModelEvent);
  }

  async init() {

    const prevInfoComponent = this.#tripInfoComponent;

    await Promise.all([
      this.#points = this.#pointsModel.points,
      this.#offers = this.#offersModel.offers,
      this.#destinations = this.#destinationsModel.destinations,
    ]);

    this.#tripInfoComponent = new TripInfoView({points: this.#points, destinations: this.#destinations, offers: this.#offers});

    if (prevInfoComponent === null) {
      render(this.#tripInfoComponent, this.#tripMainElement, RenderPosition.AFTERBEGIN);
      return;
    }

    replace(this.#tripInfoComponent, prevInfoComponent);
    remove(prevInfoComponent);

  }

  #handleModelEvent = () => {
    this.init();
  };
}
