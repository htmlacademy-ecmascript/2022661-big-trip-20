// import Observable from '../framework/observable';
// import { UpdateType } from '../const';

export default class OffersModel {
  #service = null;
  #offers = [];

  constructor({service}) {
    this.#service = service;
  }

  get offers() {
    return this.#offers;
  }

  async init() {
    this.#offers = await this.#service.getOffers();
    return this.#offers;
  }

  getOffersByType(type) {
    return this.#offers.find((item) => item.type === type).offers;
  }
}
