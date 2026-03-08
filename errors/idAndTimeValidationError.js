class IdAndTimeError extends Error {
  constructor(resourcetype) {
    super(`${resourcetype} must be valid ! `);
    this.name = "IdAndTimeError";
  }
}

export default IdAndTimeError;
