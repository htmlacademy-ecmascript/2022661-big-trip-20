import NewRoutPointButtonView from './view/new-rout-point-button-view';
import {render} from './framework/render';

import EventPresenter from './presenter/events-presenter';
import FilterPresenter from './presenter/filter-presenter';
import TripInfoPresenter from './presenter/trip-info-presenter';

import PointsModel from './model/points-model';
import OffersModel from './model/offers-model';
import DestinationsModel from './model/destinations-model';
import FilterModel from './model/filter-model';

import PointApiService from './point-api-service';

const AUTHORIZATION = 'Basic m34s67vywy9381dfj';
const END_POINT = 'https://20.ecmascript.pages.academy/big-trip';

const tripMainElement = document.querySelector('.trip-main');
const filtersMainElement = tripMainElement.querySelector('.trip-controls__filters');
const tripEventElement = document.querySelector('.trip-events');

const pointApiService = new PointApiService(END_POINT, AUTHORIZATION);
const destinationsModel = new DestinationsModel({service: pointApiService});
const offersModel = new OffersModel({service: pointApiService});
const pointsModel = new PointsModel({
  service: pointApiService,
  destinationsModel: destinationsModel,
  offersModel: offersModel
});
const filterModel = new FilterModel();

const eventPresenter = new EventPresenter({
  eventContainer : tripEventElement,
  pointsModel,
  offersModel,
  destinationsModel,
  filterModel,
  onNewRoutPointClose: handleNewPointBtnClose
});

const filterPresenter = new FilterPresenter({
  filterContainer : filtersMainElement,
  filterModel,
  pointsModel
});

const newRoutPointButtonComponent = new NewRoutPointButtonView({
  onClick : handleNewPointBtnClick
});

const tripInfoPresenter = new TripInfoPresenter({
  tripMainElement: tripMainElement,
  pointsModel,
  offersModel,
  destinationsModel,
});


filterPresenter.init();
eventPresenter.init();
tripInfoPresenter.init();
pointsModel.init().finally(() => {
  render(newRoutPointButtonComponent, tripMainElement);
});


function handleNewPointBtnClose () {
  newRoutPointButtonComponent.element.disabled = false;
}

function handleNewPointBtnClick () {
  eventPresenter.createPoint();
  newRoutPointButtonComponent.element.disabled = true;
}
