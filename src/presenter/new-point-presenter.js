// import NewRouteCreationFormView from '../view/new-route-creation-form-view';
import EditRoutFormView from '../view/edit-rout-form-view';
import { remove, render, RenderPosition } from '../framework/render';
import { UserAction, UpdateType } from '../const';
import { PointCreationMode } from '../const';

export default class NewPointPresenter {
  #listComponent = null;
  #newPointComponent = null;

  #offersModel = null;
  #destinationModel = null;

  #handleClose = null;
  #handleDataChange = null;


  constructor({listComponent, offersModel, destinationModel, onClose, onDataChange}) {
    this.#offersModel = offersModel;
    this.#destinationModel = destinationModel;
    this.#listComponent = listComponent;
    this.#handleClose = onClose;
    this.#handleDataChange = onDataChange;
  }

  init() {
    if (this.#newPointComponent !== null) {
      return;
    }


    this.#newPointComponent = new EditRoutFormView({
      allOffers: this.#offersModel.offers,
      allDestinations: this.#destinationModel.destinations,
      onDeleteClick: this.#handleDeleteClick,
      onFormSubmit: this.#handleSubmitForm,
      creationMode: PointCreationMode.CREATING
    });

    render(this.#newPointComponent, this.#listComponent, RenderPosition.AFTERBEGIN);
    document.addEventListener('keydown', this.#escKeyDownHandler);
  }

  destroy() {
    if(this.#newPointComponent === null) {
      return;
    }

    this.#handleClose();

    remove(this.#newPointComponent);
    this.#newPointComponent = null;

    document.removeEventListener('keydown', this.#escKeyDownHandler);
  }

  setSaving() {
    this.#newPointComponent.updateElement({
      isDisabled: true,
      isSaving: true,
    });
  }

  setDeleting() {
    this.#newPointComponent.updateElement({
      isDisabled: true,
      isDeleting: true,
    });
  }

  setAborting() {
    const resetFormState = () => {
      this.#newPointComponent.updateElement({
        isDisabled: false,
        isSaving: false,
        isDeleting: false,
      });
    };

    this.#newPointComponent.shake(resetFormState);
  }

  #handleDeleteClick = () => {
    this.destroy();
  };

  #handleSubmitForm = (point) => {
    this.#handleDataChange(
      UserAction.ADD_POINT,
      UpdateType.MINOR,
      point
    );
  };

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.destroy();
    }
  };

}
