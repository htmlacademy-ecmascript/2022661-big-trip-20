import { mockOffers } from '../mock/offers';

export default class OffersModel {
  offers = mockOffers;

  getOffers() {
    return this.offers;
  }

  getOffersByType(type) {
    const offersByType = this.offers.find((item) => item.type === type).offers;
    return offersByType;
  }
}
