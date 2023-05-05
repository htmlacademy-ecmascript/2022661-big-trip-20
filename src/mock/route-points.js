import { POINT_TYPES, MIN_PRICE, MAX_PRICE, MIN_DESTINATION_ID,MAX_DESTINATION_ID } from '../const';
import { getRandomArrayElement, getRandomNumber } from '../utils';


const mockRoutPoints = [
  {
    id: '1',
    basePrice: getRandomNumber(MIN_PRICE, MAX_PRICE),
    dateFrom: '2023-05-10T22:55:56.845Z',
    dateTo: '2023-05-10T23:23:13.375Z',
    destination: getRandomNumber(MIN_DESTINATION_ID, MAX_DESTINATION_ID),
    isFavorite: true,
    offers: ['2'],
    type: POINT_TYPES.FLIGHT,
  },
  {
    id: '2',
    basePrice: getRandomNumber(MIN_PRICE, MAX_PRICE),
    dateFrom: '2023-06-15T15:20:13.375Z',
    dateTo: '2023-06-15T16:15:13.375Z',
    destination: getRandomNumber(MIN_DESTINATION_ID, MAX_DESTINATION_ID),
    isFavorite: true,
    offers: ['1'],
    type: POINT_TYPES.TAXI,
  },
  {
    id: '3',
    basePrice: getRandomNumber(MIN_PRICE, MAX_PRICE),
    dateFrom: '2023-07-11T14:20:13.375Z',
    dateTo: '2023-07-17T22:50:13.375Z',
    destination: getRandomNumber(MIN_DESTINATION_ID, MAX_DESTINATION_ID),
    isFavorite: false,
    offers: ['2', '4'],
    type: POINT_TYPES.CHECK_IN,
  },
  {
    id: '4',
    basePrice: getRandomNumber(MIN_PRICE, MAX_PRICE),
    dateFrom: '2023-08-17T16:40:13.375Z',
    dateTo: '2023-08-18T20:55:13.375Z',
    destination: getRandomNumber(MIN_DESTINATION_ID, MAX_DESTINATION_ID),
    isFavorite: false,
    offers: ['1', '3'],
    type: POINT_TYPES.BUS,
  },
  {
    id: '5',
    basePrice: getRandomNumber(MIN_PRICE, MAX_PRICE),
    dateFrom: '2023-09-19T13:30:13.375Z',
    dateTo: '2023-09-19T15:30:13.375Z',
    destination: getRandomNumber(MIN_DESTINATION_ID, MAX_DESTINATION_ID),
    isFavorite: true,
    offers: ['1', '2', '4'],
    type: POINT_TYPES.RESTAURANT,
  },
];

const getRandomRoutPoint = () => getRandomArrayElement(mockRoutPoints);

export {getRandomRoutPoint};
