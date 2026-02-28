class InvalidValueTypeError extends Error {
  constructor(fieldValue) {
    super(` The following values have invalid types : ${fieldValue} ! `);
    this.name = "InvalidValueTypeError";
  }
}

export default InvalidValueTypeError;