import NewRouteCreationFormView from '../view/new-route-creation-form-view';
import { render, RenderPosition } from '../framework/render';

export default class NewPointPresenter {
  #listComponent = null;

  #newPointComponent = null;

  constructor({listComponent}) {
    this.#listComponent = listComponent;
  }

  init() {
    if (this.#newPointComponent !== null) {
      return;
    }

    this.#newPointComponent = new NewRouteCreationFormView();

    render(this.#newPointComponent, this.#listComponent, RenderPosition.AFTERBEGIN);

  }
}
