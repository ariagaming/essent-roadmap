export const months = [
  "Januari",
  "Februari",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

export const getMinMax = events => {
  const result = events.reduce(
    (acc, event) => {
      if (event.from < acc.min) acc.min = event.from;
      if (event.from + event.to > acc.max) acc.max = event.from + event.to;
      return acc;
    },
    { min: 1000, max: -1 }
  );
  return { ...result, months: ((result.max / 4) | 0) + 1 };
};

export const px = n => n + "px";

export const id = (length = 7) =>
  Math.random()
    .toString(36)
    .substring(length);
