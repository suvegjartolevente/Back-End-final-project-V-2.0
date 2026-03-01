import DuplicateUsernameError from "../errors/duplicateUsernameError.js";
import MissingRequiredFieldsError from "../errors/missingRequiredFieldsError.js";

import InvalidValueTypeError from "../errors/invalidValueTypeError.js";
import EmptyUpdateBodyError from "../errors/emptyUpdateBodyError.js";

const errorHandler = (err, req, res, next) => {
  console.error(err);
  if (err instanceof DuplicateUsernameError)
    return res.status(409).json({ message: err.message });
  else if (err instanceof MissingRequiredFieldsError)
    return res.status(400).json({ message: err.message });
  else if (err instanceof InvalidValueTypeError)
    return res.status(400).json({ message: err.message });
  else if (err instanceof EmptyUpdateBodyError)
    return res.status(400).json({ message: err.message });
  res.status(500).json({ message: "Something went wrong!" });
};

export default errorHandler;
