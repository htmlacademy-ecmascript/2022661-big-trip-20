import { POINT_TYPES, MIN_PRICE, MAX_PRICE, MIN_DESTINATION_ID,MAX_DESTINATION_ID } from '../const';
import { getRandomArrayElement, getRandomNumber } from '../utils/common';
import { nanoid } from 'nanoid';

const mockRoutPoints = [
  {
    basePrice: getRandomNumber(MIN_PRICE, MAX_PRICE),
    dateFrom: '2023-05-12T22:55:56.845Z',
    dateTo: '2023-05-12T23:23:13.375Z',
    destination: getRandomNumber(MIN_DESTINATION_ID, MAX_DESTINATION_ID),
    isFavorite: true,
    offers: ['2'],
    type: POINT_TYPES.FLIGHT,
  },
  {
    basePrice: getRandomNumber(MIN_PRICE, MAX_PRICE),
    dateFrom: '2023-06-15T15:20:13.375Z',
    dateTo: '2023-06-15T16:15:13.375Z',
    destination: getRandomNumber(MIN_DESTINATION_ID, MAX_DESTINATION_ID),
    isFavorite: true,
    offers: ['1'],
    type: POINT_TYPES.TAXI,
  },
  {
    basePrice: getRandomNumber(MIN_PRICE, MAX_PRICE),
    dateFrom: '2023-05-11T14:20:13.375Z',
    dateTo: '2023-05-17T22:50:13.375Z',
    destination: getRandomNumber(MIN_DESTINATION_ID, MAX_DESTINATION_ID),
    isFavorite: false,
    offers: ['2', '4'],
    type: POINT_TYPES.CHECK_IN,
  },
  {
    basePrice: getRandomNumber(MIN_PRICE, MAX_PRICE),
    dateFrom: '2023-08-17T16:40:13.375Z',
    dateTo: '2023-08-18T20:55:13.375Z',
    destination: getRandomNumber(MIN_DESTINATION_ID, MAX_DESTINATION_ID),
    isFavorite: false,
    offers: ['1', '3'],
    type: POINT_TYPES.BUS,
  },
  {
    basePrice: getRandomNumber(MIN_PRICE, MAX_PRICE),
    dateFrom: '2023-09-19T13:30:13.375Z',
    dateTo: '2023-09-19T15:30:13.375Z',
    destination: getRandomNumber(MIN_DESTINATION_ID, MAX_DESTINATION_ID),
    isFavorite: true,
    offers: ['1', '2', '4'],
    type: POINT_TYPES.RESTAURANT,
  },
];

function getRandomRoutPoint() {
  return {
    id: nanoid(),
    ...getRandomArrayElement(mockRoutPoints),
  };
}

export {getRandomRoutPoint};
