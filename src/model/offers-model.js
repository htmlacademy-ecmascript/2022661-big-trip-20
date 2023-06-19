export default class OffersModel {
  #service = null;
  #offers = [];

  constructor({service}) {
    this.#service = service;
  }

  async init() {
    this.#offers = await this.#service.getOffers();
    return this.#offers;
  }

  get offers() {
    return this.#offers;
  }

  getOffersByType(type) {
    return this.#offers.find((item) => item.type === type).offers;
  }
}
