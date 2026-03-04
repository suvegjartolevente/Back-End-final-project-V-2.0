class MissingIdError extends Error {
  constructor() {
    super(` The request must contain the id ! `);
    this.name = "MissingIdError";
  }
}

export default MissingIdError;
