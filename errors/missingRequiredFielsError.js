class MissingRequiredFielsError extends Error {
  constructor(fieldName) {
    super(`${fieldName} is undefined !`);
    this.name = "MissingRequiredFielsError";
  }
}

export default MissingRequiredFielsError;
