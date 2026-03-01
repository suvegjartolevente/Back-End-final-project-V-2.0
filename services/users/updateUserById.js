import DuplicateUsernameError from "../../errors/duplicateUsernameError.js";
import EmptyUpdateBodyError from "../../errors/emptyUpdateBodyError.js";
import InvalidValueTypeError from "../../errors/invalidValueTypeError.js";
import MissingRequiredFieldsError from "../../errors/missingRequiredFieldsError.js";
import NotFoundError from "../../errors/notFoundError.js";
import { validationError } from "../../errors/validationError.js";
import { valueTypeError } from "../../errors/valueTypeError.js";

import prisma from "../../src/prisma.js";

const updatedUserById = async (id, data) => {
  const validationIssueList = validationError(data);
  const valueTypeIssueList = valueTypeError(data);
  console.log("Ez a data:", data);
  console.log(` na ez mi ?${Object.entries(data).length}`);
  if (Object.entries(data).length === 0) {
    throw new EmptyUpdateBodyError();
  }
   if (validationIssueList.length)
    throw new MissingRequiredFieldsError(validationIssueList);

  if (valueTypeIssueList.length)
    throw new InvalidValueTypeError(valueTypeIssueList);

  try {
    const updatedUser = await prisma.user.update({
      where: { id },
      data,
    });

    console.log("LecsÓ result:", updatedUser);

    return updatedUser;
  } catch (err) {
    if (err?.code === "P2002") {
      throw new DuplicateUsernameError("username");
    }
    if (err?.code === "P2025") {
      throw new NotFoundError("User", id);
    }
    throw err;
  }
};

export default updatedUserById;
