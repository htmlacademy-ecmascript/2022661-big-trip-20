import ListView from '../view/list-view.js';
import SortView from '../view/sort-view.js';
import EditRoutFormView from '../view/edit-rout-form-view.js';
import RoutPointView from '../view/route-point-view.js';
import {render} from '../render.js';

export default class BoardPresenter {
  listComponent = new ListView();

  constructor({boardContainer}) {
    this.boardContainer = boardContainer;
  }

  init() {
    render(new SortView(), this.boardContainer);
    render(this.listComponent, this.boardContainer);
    render(new EditRoutFormView(), this.listComponent.getElement());

    for (let i = 0; i < 3; i++) {
      render(new RoutPointView(), this.listComponent.getElement());
    }
  }
}
