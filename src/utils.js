import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import duration from 'dayjs/plugin/duration';

const DATE_FORMAT = 'MMM D';
const TIME_FORMAT = 'HH:mm';

dayjs.extend(utc);
dayjs.extend(duration);


function getRandomArrayElement(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function humanizeEventDate(date) {
  return date ? dayjs(date).utc().format(DATE_FORMAT) : '';
}

function humanizeEventTime(time) {
  return time ? dayjs(time).utc().format(TIME_FORMAT) : '';
}

function countTimeDuration(startDate, endDate) {
  const difference = (dayjs(endDate).diff(startDate));
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

export {getRandomArrayElement, humanizeEventDate, humanizeEventTime, getRandomNumber, countTimeDuration };
