export const colorsLevel = {
  low: "#7160E8",
  medium: "#60ADE8",
  high: "#60E8B6",
  complete: "#30DB63",
};

export const getColor = (value) => {
  if (value === 0) {
    return null;
  } else if (value <= 25) {
    return colorsLevel.low;
  } else if (value <= 50) {
    return colorsLevel.medium;
  } else if (value <= 75) {
    return colorsLevel.high;
  } else if (value === 100) {
    return colorsLevel.complete;
  }
};
