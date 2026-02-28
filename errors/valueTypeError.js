export const valueTypeError = (datas) => {
  const missTypeValues = [];
  for (const [key, value] of Object.entries(datas)) {
    if (key === "propertyId" && typeof value !== "string") {
      missTypeValues.push(key);
    }

    if (key === "numberOfGuests" && typeof value !== "number") {
      missTypeValues.push(key);
    }
  }
  return missTypeValues;
};
