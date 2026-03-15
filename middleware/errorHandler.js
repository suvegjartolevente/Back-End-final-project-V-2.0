import DuplicateUsernameError from "../errors/duplicateUsernameError.js";
import MissingRequiredFieldsError from "../errors/missingRequiredFieldsError.js";

import InvalidValueTypeError from "../errors/invalidValueTypeError.js";
import EmptyUpdateBodyError from "../errors/emptyUpdateBodyError.js";
import HostIdMustBeValidError from "../errors/hostIdMustBeValidError.js";
import MissingIdError from "../errors/missingIdError.js";

import IdAndTimeError from "../errors/idAndTimeValidationError.js";
import InvalidQueryParameter from "../errors/InvalidQueryParameterError.js";

const errorHandler = (err, req, res, next) => {
  if (err instanceof DuplicateUsernameError)
    return res.status(409).json({ message: err.message });
  else if (err instanceof MissingRequiredFieldsError)
    return res.status(400).json({ message: err.message });
  else if (err instanceof InvalidValueTypeError)
    return res.status(400).json({ message: err.message });
  else if (err instanceof EmptyUpdateBodyError)
    return res.status(400).json({ message: err.message });
  else if (err instanceof HostIdMustBeValidError)
    return res.status(400).json({ message: err.message });
  else if (err instanceof MissingIdError)
    return res.status(400).json({ message: err.message });
  else if (err instanceof IdAndTimeError)
    return res.status(400).json({ message: err.message });
  else if (err instanceof InvalidQueryParameter)
    return res.status(400).json({ message: err.message });
  res.status(500).json({ message: "Something went wrong!" });
};

export default errorHandler;
