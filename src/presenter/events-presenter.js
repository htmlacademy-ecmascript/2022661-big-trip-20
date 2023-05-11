import ListView from '../view/list-view.js';
import SortView from '../view/sort-view.js';
import EditRoutFormView from '../view/edit-rout-form-view.js';
import RoutPointView from '../view/route-point-view.js';
import {render, replace} from '../framework/render';

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

    render(new SortView(), this.#eventContainer);
    render(this.#listComponent, this.#eventContainer);

    for (let i = 0; i < this.#eventPoints.length; i++) {
      this.#renderPoint({point: this.#eventPoints[i],
        offers: this.#offersModel.getOffersByType(this.#eventPoints[i].type),
        destinations: this.#destinationsModel.getDestinationById(this.#eventPoints[i].destination)});
    }
  }

  #renderPoint({point, offers, destinations}) {
    const pointComponent = new RoutPointView({
      point,
      offers,
      destinations,
      onEditClick: () => {
        replaceRoutPointToEditForm();
        document.addEventListener('keydown', escKeyDownHandler);
      }
    });

    const pointEditComponent = new EditRoutFormView ({
      point,
      offers,
      destinations,
      onFormSubmit: () => {
        replaceEditFormToRoutPoint();
        document.removeEventListener('keydown', escKeyDownHandler);
      },
      onRollUpClick: () => {
        replaceEditFormToRoutPoint();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    });

    function escKeyDownHandler (evt) {
      if(evt.key === 'Escape') {
        evt.preventDefault();
        replaceEditFormToRoutPoint();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    }

    function replaceRoutPointToEditForm() {
      replace(pointEditComponent, pointComponent);
    }

    function replaceEditFormToRoutPoint() {
      replace(pointComponent, pointEditComponent);
    }

    render (pointComponent, this.#listComponent.element);
  }
}
