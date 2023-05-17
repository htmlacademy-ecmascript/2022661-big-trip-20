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

  #handleDataChange = null;

  constructor({listComponent, offers, destinations, onDataChange}) {
    this.#listComponent = listComponent;
    this.#offers = offers;
    this.#destinations = destinations;
    this.#handleDataChange = onDataChange;
  }

  init(point) {
    this.#point = point;

    const prevPointComponent = this.#pointComponent;
    const prevPointEditComponent = this.#pointEditComponent;

    this.#pointComponent = new RoutPointView({
      point: this.#point,
      offers: this.#offers,
      destinations: this.#destinations,
      onEditClick: this.#handleEditClick,
      onFavoriteClick: this.#handleFavoriteClick,
    });

    this.#pointEditComponent = new EditRoutFormView ({
      point: this.#point,
      offers: this.#offers,
      destinations: this.#destinations,
      onFormSubmit: this.#handleSubmitForm,
      onRollUpClick: this.#handleSubmitForm
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

  #handleSubmitForm = () => {
    this.#replaceEditFormToRoutPoint();
  };

  #handleEditClick = () => {
    this.#replaceRoutPointToEditForm();
  };

  #handleFavoriteClick = () => {
    this.#handleDataChange({...this.#point, isFavorite: !this.#point.isFavorite});
  };
}
