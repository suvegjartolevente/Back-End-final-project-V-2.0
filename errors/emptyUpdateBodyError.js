class EmptyUpdateBodyError extends Error {
  constructor() {
    super(`  Update body is empty !`);
    this.name = "EmptyUpdateBodyError";
  }
}

export default EmptyUpdateBodyError;
