import { mockDestinations } from '../mock/destination';

export default class DestinationsModel {
  destinations = mockDestinations;

  getDestinations() {
    return this.destinations;
  }

  getDestinationById(id) {
    const destinationById = this.destinations.find((destination) => destination.id === id);
    return destinationById;
  }
}
