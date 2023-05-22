const POINT_TYPES = {
  TAXI: 'Taxi',
  BUS: 'Bus',
  TRAIN: 'Train',
  SHIP: 'Ship',
  DRIVE: 'Drive',
  FLIGHT: 'Flight',
  CHECK_IN: 'Check-in',
  SIGHTSEEING: 'Sightseeing',
  RESTAURANT: 'Restaurant',
};

const FILTER_TYPES = {
  EVERYTHING: 'Everything',
  FUTURE: 'Future',
  PRESENT: 'Present',
  PAST: 'Past',
};

const SORT_TYPES = {
  DAY: 'day',
  EVENT: 'event',
  TIME: 'time',
  PRICE: 'price',
  OFFERS: 'offers',
};

const DESCRIPTION = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  'Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra.',
  'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.',
  'Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.',
  'Sed sed nisi sed augue convallis suscipit in sed felis.'
];

const PHOTO_URL = 'https://loremflickr.com/248/152?random=';

const MIN_PRICE = 5;
const MAX_PRICE = 5000;

const MIN_DESTINATION_ID = 1;
const MAX_DESTINATION_ID = 4;

export {POINT_TYPES, DESCRIPTION, PHOTO_URL, MIN_PRICE, MAX_PRICE, MIN_DESTINATION_ID, MAX_DESTINATION_ID, FILTER_TYPES, SORT_TYPES};
