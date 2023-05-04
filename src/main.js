import FiltersView from './view/filters-view';
import TripInfoView from './view/trip-info-view';
import {render, RenderPosition} from './render';
import EventPresenter from './presenter/events-presenter';
import PointsModel from './model/points-model';

const filtersMainElement = document.querySelector('.trip-controls__filters');
const tripMainElement = document.querySelector('.trip-main');
const tripEventElement = document.querySelector('.trip-events');
const pointsModel = new PointsModel();

const eventPresenter = new EventPresenter({
  eventContainer : tripEventElement,
  pointsModel,
});

render(new TripInfoView(), tripMainElement, RenderPosition.AFTERBEGIN);
render(new FiltersView(), filtersMainElement);

eventPresenter.init();
