import ListView from '../view/list-view.js';
import SortView from '../view/sort-view.js';
import EditRoutFormView from '../view/edit-rout-form-view.js';
import RoutPointView from '../view/route-point-view.js';
import {render} from '../render.js';

export default class EventPresenter {
  listComponent = new ListView();

  constructor({eventContainer}) {
    this.eventContainer = eventContainer;
  }

  init() {
    render(new SortView(), this.eventContainer);
    render(this.listComponent, this.eventContainer);
    render(new EditRoutFormView(), this.listComponent.getElement());

    for (let i = 0; i < 3; i++) {
      render(new RoutPointView(), this.listComponent.getElement());
    }
  }
}
