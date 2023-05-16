import {render, replace, remove} from '../framework/render';
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

    const prevPointComponent = this.#pointComponent;
    const prevPointEditComponent = this.#pointEditComponent;

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

    if(prevPointComponent === null || prevPointEditComponent === null) {
      render(this.#pointComponent, this.#listComponent);
    }

    if(this.#listComponent.contains(prevPointComponent?.element)) {
      replace(this.#pointComponent, prevPointComponent);
    }

    if(this.#listComponent.contains(prevPointEditComponent?.element)) {
      replace(this.#pointComponent, prevPointEditComponent);
    }

    remove(prevPointComponent);
    remove(prevPointEditComponent);
  }

  destroy() {
    remove(this.#pointComponent);
    remove(this.#pointEditComponent);
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
