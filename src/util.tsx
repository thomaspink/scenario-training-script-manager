export function isObject(obj: any): boolean {
  return obj !== null && typeof obj === 'object' && !Array.isArray(obj);
}

function formatNumber(value: number) {
  return value.toLocaleString('de-AT', {
    minimumIntegerDigits: 2,
  });
}

/** Formats a timestamp to a human readable time 00:00:00 */
// export function formatTime(time: number) {
//   const date = new Date(time);
//   return `${formatNumber(date.getMinutes())}:${formatNumber(date.getSeconds())}`;
// }

export function diffTime(t1: number, t2: number) {
  let diffInMilliSeconds = Math.abs(t1 - t2) / 1000;

  // calculate days
  const days = Math.floor(diffInMilliSeconds / 86400);
  diffInMilliSeconds -= days * 86400;

  // calculate hours
  const hours = Math.floor(diffInMilliSeconds / 3600) % 24;
  diffInMilliSeconds -= hours * 3600;

  // calculate minutes
  const minutes = Math.floor(diffInMilliSeconds / 60) % 60;
  diffInMilliSeconds -= minutes * 60;

  let difference = '';
  if (days > 0) {
    difference += days === 1 ? `${days} Tag, ` : `${days} Tage, `;
  }

  if (hours > 0) {
    difference +=
      hours === 1 ? `${formatNumber(hours)} Stunde, ` : `${formatNumber(hours)} Stunden, `;
  }

  difference += minutes === 1 ? `${minutes} Minute` : `${minutes} Minuten`;

  return difference;
}
