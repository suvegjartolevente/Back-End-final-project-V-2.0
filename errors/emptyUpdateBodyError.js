class EmptyUpdateBodyError extends Error {
  constructor() {
    super(`  Request body is empty !`);
    this.name = "EmptyUpdateBodyError";
  }
}

export default EmptyUpdateBodyError;
