export const validationError = (datas) => {
  const missingValues = [];
  for (const [key, value] of Object.entries(datas)) {
    if (value === undefined || value === null || value === "") {
      missingValues.push(key);
    }
  }
  return missingValues;
};
