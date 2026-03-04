class HostIdMustBeValidError extends Error {
  constructor(resourceType, id) {
    super(` ${resourceType} must be valid ! this id:  ${id} is invalid !`);
    this.name = "HostIdMustBeValidError";
  }
}

export default HostIdMustBeValidError;
