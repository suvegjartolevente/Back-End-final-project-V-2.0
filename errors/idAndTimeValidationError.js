class IdAndTimeError extends Error {
  constructor(resourcetype) {
    super(`${resourcetype} must be valid ! `);
    this.name = "HostIdMustBeValidError";
  }
}

export default IdAndTimeError;
