import { POINT_TYPE, MIN_PRICE, MAX_PRICE } from '../const';
import { getRandomNumber } from '../utils';

const mockOffers = [
  {
    type: POINT_TYPE.TAXI,
    offers: [
      {
        id: '1',
        title: 'Order Uber',
        price: getRandomNumber(MIN_PRICE, MAX_PRICE)
      }
    ]
  },
  {
    type: POINT_TYPE.FLIGHT,
    offers: [
      {
        id: '1',
        title: 'Add luggage',
        price: getRandomNumber(MIN_PRICE, MAX_PRICE)
      },
      {
        id: '2',
        title: 'Upgrade to a business class',
        price: getRandomNumber(MIN_PRICE, MAX_PRICE)
      },
      {
        id: '3',
        title: 'Choose seats',
        price: getRandomNumber(MIN_PRICE, MAX_PRICE)
      },
      {
        id: '4',
        title: 'Add meal',
        price: getRandomNumber(MIN_PRICE, MAX_PRICE)
      }
    ]
  },
  {
    type: POINT_TYPE.BUS,
    offers: [
      {
        id: '1',
        title: 'Upgrade to a business class',
        price: getRandomNumber(MIN_PRICE, MAX_PRICE)
      },
      {
        id: '2',
        title: 'Add luggage',
        price: getRandomNumber(MIN_PRICE, MAX_PRICE)
      },
      {
        id: '3',
        title: 'Travel by train',
        price: getRandomNumber(MIN_PRICE, MAX_PRICE)
      }
    ]
  },
  {
    type: POINT_TYPE.TRAIN,
    offers: [
      {
        id: '1',
        title: 'Add meal',
        price: getRandomNumber(MIN_PRICE, MAX_PRICE)
      },
      {
        id: '2',
        title: 'Add luggage',
        price: getRandomNumber(MIN_PRICE, MAX_PRICE)
      },
      {
        id: '3',
        title: 'Choose seats',
        price: getRandomNumber(MIN_PRICE, MAX_PRICE)
      },
      {
        id: '4',
        title: 'Travel by plane',
        price: getRandomNumber(MIN_PRICE, MAX_PRICE)
      }
    ]
  },
  {
    type: POINT_TYPE.SHIP,
    offers: [
      {
        id: '1',
        title: 'Add meal',
        price: getRandomNumber(MIN_PRICE, MAX_PRICE)
      },
      {
        id: '2',
        title: 'Add luggage',
        price: getRandomNumber(MIN_PRICE, MAX_PRICE)
      },
      {
        id: '3',
        title: 'Choose cabin',
        price: getRandomNumber(MIN_PRICE, MAX_PRICE)
      },
      {
        id: '4',
        title: 'Switch to comfort',
        price: getRandomNumber(MIN_PRICE, MAX_PRICE)
      }
    ]
  },
  {
    type: POINT_TYPE.DRIVE,
    offers: [
      {
        id: '1',
        title: 'Rent a car',
        price: getRandomNumber(MIN_PRICE, MAX_PRICE)
      }
    ]
  },
  {
    type: POINT_TYPE.CHECK_IN,
    offers: [
      {
        id: '1',
        title: 'Upgrade to a business class',
        price: getRandomNumber(MIN_PRICE, MAX_PRICE)
      },
      {
        id: '2',
        title: 'Add breakfast',
        price: getRandomNumber(MIN_PRICE, MAX_PRICE)
      },
      {
        id: '3',
        title: 'All-inclusive',
        price: getRandomNumber(MIN_PRICE, MAX_PRICE)
      },
      {
        id: '4',
        title: 'Add lunch',
        price: getRandomNumber(MIN_PRICE, MAX_PRICE)
      }
    ]
  },
  {
    type: POINT_TYPE.SIGHTSEEING,
    offers: [
      {
        id: '1',
        title: 'Book tickets',
        price: getRandomNumber(MIN_PRICE, MAX_PRICE)
      },
      {
        id: '2',
        title: 'Add Lunch in city',
        price: getRandomNumber(MIN_PRICE, MAX_PRICE)
      },
      {
        id: '3',
        title: 'Rent a car',
        price: getRandomNumber(MIN_PRICE, MAX_PRICE)
      },
      {
        id: '4',
        title: 'Visit museum',
        price: getRandomNumber(MIN_PRICE, MAX_PRICE)
      }
    ]
  },
  {
    type: POINT_TYPE.RESTAURANT,
    offers: [
      {
        id: '1',
        title: 'Choose table',
        price: getRandomNumber(MIN_PRICE, MAX_PRICE)
      },
      {
        id: '2',
        title: 'Add dessert from chef',
        price: getRandomNumber(MIN_PRICE, MAX_PRICE)
      },
      {
        id: '3',
        title: 'Choose wine',
        price: getRandomNumber(MIN_PRICE, MAX_PRICE)
      },
      {
        id: '4',
        title: 'Choose cuisine',
        price: getRandomNumber(MIN_PRICE, MAX_PRICE)
      }
    ]
  }
];

export {mockOffers};
