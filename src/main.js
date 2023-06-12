import TripInfoView from './view/trip-info-view';
import NewRoutPointButtonView from './view/new-rout-point-button-view';
import {render, RenderPosition} from './framework/render';
import EventPresenter from './presenter/events-presenter';
import FilterPresenter from './presenter/filter-presenter';
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

const pointsModel = new PointsModel({
  pointApiService: new PointApiService(END_POINT, AUTHORIZATION)
});
const destinationsModel = new DestinationsModel();
const offersModel = new OffersModel();
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

render(newRoutPointButtonComponent, tripMainElement);

filterPresenter.init();
eventPresenter.init();
pointsModel.init().finally(() => {
  render(new TripInfoView(), tripMainElement, RenderPosition.AFTERBEGIN);
});


function handleNewPointBtnClose () {
  newRoutPointButtonComponent.element.disabled = false;
}

function handleNewPointBtnClick () {
  eventPresenter.createPoint();
  newRoutPointButtonComponent.element.disabled = true;
}
