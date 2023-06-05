import TripInfoView from './view/trip-info-view';
import {render, RenderPosition} from './framework/render';
import EventPresenter from './presenter/events-presenter';
import FilterPresenter from './presenter/filter-presenter';
import PointsModel from './model/points-model';
import OffersModel from './model/offers-model';
import DestinationsModel from './model/destinations-model';
import FilterModel from './model/filter-model';

const filtersMainElement = document.querySelector('.trip-controls__filters');
const tripMainElement = document.querySelector('.trip-main');
const tripEventElement = document.querySelector('.trip-events');

const pointsModel = new PointsModel();
const destinationsModel = new DestinationsModel();
const offersModel = new OffersModel();
const filterModel = new FilterModel();

const eventPresenter = new EventPresenter({
  eventContainer : tripEventElement,
  pointsModel,
  offersModel,
  destinationsModel
});

const filterPresenter = new FilterPresenter({
  filterContainer : filtersMainElement,
  filterModel,
  pointsModel
});

render(new TripInfoView(), tripMainElement, RenderPosition.AFTERBEGIN);

filterPresenter.init();
eventPresenter.init();
