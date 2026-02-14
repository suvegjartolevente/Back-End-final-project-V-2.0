import DuplicateUsernameError from "../errors/duplicateUsernameError.js";

const errorHandler = (err, req, res, next) => {
  console.error(err);
  if (err instanceof  DuplicateUsernameError) return res.status(409).json({ message: err.message });
   res.status(500).json({ message: "Something went wrong!" });
};

export default errorHandler;
