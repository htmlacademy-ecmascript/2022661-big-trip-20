import FiltersView from './view/filters-view';
import TripInfoView from './view/trip-info-view';
import {render} from './render.js';
import {RenderPosition} from './render.js';
import EventPresenter from './presenter/events-presenter';

const filtersMainElement = document.querySelector('.trip-controls__filters');
const tripMainElement = document.querySelector('.trip-main');
const tripEventElement = document.querySelector('.trip-events');

const eventPresenter = new EventPresenter({eventContainer : tripEventElement});

render(new TripInfoView(), tripMainElement, RenderPosition.AFTERBEGIN);
render(new FiltersView(), filtersMainElement);

eventPresenter.init();
