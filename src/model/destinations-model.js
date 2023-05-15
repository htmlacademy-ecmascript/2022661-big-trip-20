import { mockDestinations } from '../mock/destination';

export default class DestinationsModel {
  #destinations = mockDestinations;
  #destinationById = null;

  get destinations() {
    return this.#destinations;
  }

  getDestinationById(id) {
    this.#destinationById = this.#destinations.find((destination) => destination.id === id);
    return this.#destinationById;
  }
}

