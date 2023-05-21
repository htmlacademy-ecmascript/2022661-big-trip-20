import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import duration from 'dayjs/plugin/duration';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';


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
dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);


function humanizeEventDate(time, format) {
  return time ? dayjs(time).format(format) : '';
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

function isPointDateExpired(endDate) {
  return endDate && dayjs().isAfter(endDate, 'D');
}

function isPointDateInFuture(startDate) {
  return startDate && dayjs().isBefore(startDate, 'D');
}

function isPointDateInPresent(startDate, endDate) {
  const startIsSameOrBeforeToday = dayjs().isSameOrAfter(dayjs(startDate), 'day');
  const endIsSameOrAfterToday = dayjs().isSameOrBefore(dayjs(endDate).format(), 'D');

  return startIsSameOrBeforeToday && endIsSameOrAfterToday;
}

function getDataDifference(pointA, pointB) {
  return dayjs(pointA.dateFrom).diff(dayjs(pointB.dateFrom));
}

function getTimeDifference(pointA, pointB) {
  const pointAdifference = dayjs(pointA.dateTo).diff(pointA.dateFrom);
  const pointBdifference = dayjs(pointB.dateTo).diff(pointB.dateFrom);

  const difference = pointBdifference - pointAdifference;

  return difference;
}

function getPriceDifference(pointA, pointB) {
  return pointB.basePrice - pointA.basePrice;
}

export { humanizeEventDate, countTimeDuration, isPointDateExpired, isPointDateInFuture, isPointDateInPresent, FULL_DATE_FORMAT, DATE_FORMAT, TIME_FORMAT, getDataDifference, getTimeDifference, getPriceDifference };
