import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import duration from 'dayjs/plugin/duration';

const FULL_DATE_FORMAT = 'YY/MM/DD HH:mm';
const DATE_FORMAT = 'MMM D';
const TIME_FORMAT = 'HH:mm';

const TIME_DIFFERENCE_MIN = 'mm[m]';
const TIME_DIFFERENCE_HOUR_MIN = 'HH[h] mm[m]';
const TIME_DIFFERENCE_DAY_HOUR_MIN = 'DD[d] HH[h] mm[m]';

const MS_IN_HOUR = 3600000;
const MS_IN_DAY = 86400000;

dayjs.extend(utc);
dayjs.extend(duration);


function getRandomArrayElement(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function humanizeEventDate(time, format) {
  return time ? dayjs(time).utc().format(format) : '';
}

function countTimeDuration(startDate, endDate) {
  const difference = dayjs(endDate).diff(startDate);

  const timeDiffInMs = dayjs.duration(difference).$ms;
  let pointDuration = 0;

  switch (true) {
    case timeDiffInMs >= MS_IN_DAY :
      pointDuration = dayjs.duration(difference).format(TIME_DIFFERENCE_DAY_HOUR_MIN);
      break;
    case timeDiffInMs >= MS_IN_HOUR :
      pointDuration = dayjs.duration(difference).format(TIME_DIFFERENCE_HOUR_MIN);
      break;
    case timeDiffInMs < MS_IN_HOUR :
      pointDuration = dayjs.duration(difference).format(TIME_DIFFERENCE_MIN);
      break;
  }

  return pointDuration;
}

function getRandomNumber(min, max, decimalCount = 0) {
  let result;
  try {
    if (min === max) {
      return min;
    }
    if (min > max) {
      const tmp = max;
      max = min;
      min = tmp;
    }
    if (min < 0) {
      min = min * -1;
    }
    if (max < 0) {
      max = max * -1;
    }

    const randomNumber = Math.random() * (max - min) + min;
    result = randomNumber.toFixed(decimalCount);
  } catch (error) {
    result = 'Диапозон или количество знаков после запятой указаны некорректно';
  }
  return result;
}

export {getRandomArrayElement, humanizeEventDate, FULL_DATE_FORMAT, DATE_FORMAT, TIME_FORMAT, getRandomNumber, countTimeDuration };
