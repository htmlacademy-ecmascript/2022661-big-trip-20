import {render, replace} from '../framework/render';
import EditRoutFormView from '../view/edit-rout-form-view';
import RoutPointView from '../view/route-point-view';

export default class PointPresenter {
  #listComponent = null;
  #point = null;
  #offers = null;
  #destinations = null;
  #pointComponent = null;
  #pointEditComponent = null;

  constructor({listComponent}) {
    this.#listComponent = listComponent;
  }

  init({point, offers, destinations}) {
    this.#point = point;
    this.#offers = offers;
    this.#destinations = destinations;

    this.#pointComponent = new RoutPointView({
      point: this.#point,
      offers: this.#offers,
      destinations: this.#destinations,
      onEditClick: () => {
        this.#replaceRoutPointToEditForm();
      }
    });

    this.#pointEditComponent = new EditRoutFormView ({
      point: this.#point,
      offers: this.#offers,
      destinations: this.#destinations,
      onFormSubmit: () => {
        this.#replaceEditFormToRoutPoint();

      },
      onRollUpClick: () => {
        this.#replaceEditFormToRoutPoint();
      }
    });

    render(this.#pointComponent, this.#listComponent);
  }


  #escKeyDownHandler (evt) {
    if(evt.key === 'Escape') {
      evt.preventDefault();
      this.#replaceEditFormToRoutPoint();
      document.removeEventListener('keydown', this.#escKeyDownHandler);
    }
  }

  #replaceRoutPointToEditForm() {
    replace(this.#pointEditComponent, this.#pointComponent);
    document.addEventListener('keydown', this.#escKeyDownHandler);
  }

  #replaceEditFormToRoutPoint() {
    replace(this.#pointComponent, this.#pointEditComponent);
    document.removeEventListener('keydown', this.#escKeyDownHandler);
  }
}
