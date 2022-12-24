export const colorsLevel = {
  low: "#7160E8",
  medium: "#60ADE8",
  high: "#60E8B6",
  complete: "#30DB63",
};

export const getColor = (value) => {
  return (
    (value === 0 && null) ||
    (value > 0 && value <= 25 && colorsLevel.low) ||
    (value > 25 && value <= 50 && colorsLevel.medium) ||
    (value > 50 && value < 100 && colorsLevel.high) ||
    (value === 100 && colorsLevel.complete)
  );
};
