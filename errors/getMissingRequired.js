export const getMissingRequired = (data, requiredFields) => {
  const missingFields = [];
  const keys = Object.keys(data);
  for (const field of requiredFields) {
    if (!keys.includes(field)) {
      missingFields.push(field);
    }
  }
  return missingFields;
};
export default getMissingRequired;
