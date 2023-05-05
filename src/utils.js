import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import duration from 'dayjs/plugin/duration';

const FULL_DATE_FORMAT = 'YY/MM/DD HH:mm';
const DATE_FORMAT = 'MMM D';
const TIME_FORMAT = 'HH:mm';

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
  return dayjs.duration(difference).format('HH[h] mm[m]');
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
