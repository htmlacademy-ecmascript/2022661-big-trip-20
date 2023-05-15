import { PHOTO_URL, DESCRIPTION } from '../const';
import { getRandomArrayElement, getRandomNumber } from '../utils/common';

const mockDestinations = [
  {
    id: '1',
    name: 'Chamonix',
    description: getRandomArrayElement(DESCRIPTION),
    pictures: [
      {
        src: `${PHOTO_URL}${getRandomNumber(1, 10)}`,
        description: getRandomArrayElement(DESCRIPTION)
      }
    ]
  },
  {
    id: '2',
    name: 'Amsterdam',
    description: getRandomArrayElement(DESCRIPTION),
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
    name: 'Geneva',
    description: getRandomArrayElement(DESCRIPTION),
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
    name: 'Rome',
    description: getRandomArrayElement(DESCRIPTION),
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
