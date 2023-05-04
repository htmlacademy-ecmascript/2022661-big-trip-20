import { PHOTO_URL, DESCRIPTION } from '../const';
import { getRandomArrayElement, getRandomNumber } from '../utils';

const mockDestinations = [
  {
    id: '1',
    description: getRandomArrayElement(DESCRIPTION),
    name: 'Chamonix',
    pictures: [
      {
        src: `${PHOTO_URL}${getRandomNumber(1, 10)}`,
        description: getRandomArrayElement(DESCRIPTION)
      }
    ]
  },
  {
    id: '2',
    description: getRandomArrayElement(DESCRIPTION),
    name: 'Amsterdam',
    pictures: [
      {
        src: `${PHOTO_URL}${getRandomNumber(1, 10)}`,
        description: getRandomArrayElement(DESCRIPTION)
      },
      {
        src: `${PHOTO_URL}${getRandomNumber(1, 10)}`,
        description: getRandomArrayElement(DESCRIPTION)
      }
    ]
  },
  {
    id: '3',
    description: getRandomArrayElement(DESCRIPTION),
    name: 'Geneva',
    pictures: [
      {
        src: `${PHOTO_URL}${getRandomNumber(1, 10)}`,
        description: getRandomArrayElement(DESCRIPTION)
      },
      {
        src: `${PHOTO_URL}${getRandomNumber(1, 10)}`,
        description: getRandomArrayElement(DESCRIPTION)
      }
    ]
  },
  {
    id: '4',
    description: getRandomArrayElement(DESCRIPTION),
    name: 'Rome',
    pictures: [
      {
        src: `${PHOTO_URL}${getRandomNumber(1, 10)}`,
        description: getRandomArrayElement(DESCRIPTION)
      },
      {
        src: `${PHOTO_URL}${getRandomNumber(1, 10)}`,
        description: getRandomArrayElement(DESCRIPTION)
      }
    ]
  },
];

export {mockDestinations};
