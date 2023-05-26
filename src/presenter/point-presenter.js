import {render, replace, remove} from '../framework/render';
import EditRoutFormView from '../view/edit-rout-form-view';
import RoutPointView from '../view/route-point-view';

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

export default class PointPresenter {
  #listComponent = null;
  #point = null;
  #allOffers = null;
  #allDestinations = null;
  #offersByType = null;
  #destinationById = null;
  #pointComponent = null;
  #pointEditComponent = null;

  #handleDataChange = null;
  #handleModeChange = null;

  #mode = Mode.DEFAULT;

  constructor({listComponent, offersByType, destinationById, allOffers, allDestinations, onDataChange, onModeChange}) {
    this.#listComponent = listComponent;
    this.#offersByType = offersByType;
    this.#destinationById = destinationById;
    this.#allOffers = allOffers;
    this.#allDestinations = allDestinations;
    this.#handleDataChange = onDataChange;
    this.#handleModeChange = onModeChange;
  }

  init(point) {
    this.#point = point;

    const prevPointComponent = this.#pointComponent;
    const prevPointEditComponent = this.#pointEditComponent;

    this.#pointComponent = new RoutPointView({
      point: this.#point,
      offers: this.#offersByType,
      destinations: this.#destinationById,
      onEditClick: this.#handleEditClick,
      onFavoriteClick: this.#handleFavoriteClick,
    });

    this.#pointEditComponent = new EditRoutFormView ({
      point: this.#point,
      allOffers: this.#allOffers,
      allDestinations: this.#allDestinations,
      onFormSubmit: this.#handleSubmitForm,
      onRollUpClick: this.#handleRollDownClick
    });

    if(prevPointComponent === null || prevPointEditComponent === null) {
      render(this.#pointComponent, this.#listComponent);
      return;
    }

    if(this.#mode === Mode.DEFAULT) {
      replace(this.#pointComponent, prevPointComponent);
    }

    if(this.#mode === Mode.EDITING) {
      replace(this.#pointEditComponent, prevPointEditComponent);
    }

    remove(prevPointComponent);
    remove(prevPointEditComponent);
  }

  destroy() {
    remove(this.#pointComponent);
    remove(this.#pointEditComponent);
  }

  resetView () {
    if (this.#mode !== Mode.DEFAULT) {
      this.#pointEditComponent.reset(this.#point);
      this.#replaceEditFormToRoutPoint();
    }
  }

  #escKeyDownHandler = (evt) => {
    if(evt.key === 'Escape') {
      evt.preventDefault();
      this.#pointEditComponent.reset(this.#point);
      this.#replaceEditFormToRoutPoint();
    }
  };

  #replaceRoutPointToEditForm() {
    replace(this.#pointEditComponent, this.#pointComponent);
    document.addEventListener('keydown', this.#escKeyDownHandler);
    this.#handleModeChange();
    this.#mode = Mode.EDITING;
  }

  #replaceEditFormToRoutPoint() {
    replace(this.#pointComponent, this.#pointEditComponent);
    document.removeEventListener('keydown', this.#escKeyDownHandler);
    this.#mode = Mode.DEFAULT;
  }

  #handleRollDownClick = () => {
    this.#pointEditComponent.reset(this.#point);
    this.#replaceEditFormToRoutPoint();
  };

  #handleSubmitForm = (point) => {
    this.#handleDataChange(point);
    this.#replaceEditFormToRoutPoint();
  };

  #handleEditClick = () => {
    this.#replaceRoutPointToEditForm();
  };

  #handleFavoriteClick = () => {
    this.#handleDataChange({...this.#point, isFavorite: !this.#point.isFavorite});
  };
}
