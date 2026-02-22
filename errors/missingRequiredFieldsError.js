class MissingRequiredFieldsError extends Error {
  constructor(fieldValue) {
    super(` The following values are missing : ${fieldValue} ! `);
    this.name = "MissingRequiredFielsError";
  }
}

export default MissingRequiredFieldsError;
