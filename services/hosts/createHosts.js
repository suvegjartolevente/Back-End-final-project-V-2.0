import DuplicateUsernameError from "../../errors/duplicateUsernameError.js";
import getMissingRequired from "../../errors/getMissingRequired.js";
import InvalidValueTypeError from "../../errors/invalidValueTypeError.js";
import MissingRequiredFieldsError from "../../errors/missingRequiredFieldsError.js";
import { validationError } from "../../errors/validationError.js";
import { valueTypeError } from "../../errors/valueTypeError.js";
import prisma from "../../src/prisma.js";

const requiredFields = [
  "username",
  "password",
  "name",
  "email",
  "phoneNumber",
  "pictureUrl",
  "aboutMe",
];

const createHost = async (data) => {
  const { id: ignore, ...safeData } = data;
  const missingFields = getMissingRequired(data, requiredFields);

  const validationIssueList = validationError(data);
  const valueTypeIssueList = valueTypeError(data);
  if (missingFields.length) throw new MissingRequiredFieldsError(missingFields);
  if (validationIssueList.length)
    throw new MissingRequiredFieldsError(validationIssueList);
  else if (valueTypeIssueList.length)
    throw new InvalidValueTypeError(valueTypeIssueList);
  try {
    return await prisma.host.create({
      data:safeData,
    });
  } catch (err) {
    if (err?.code === "P2002") {
      throw new DuplicateUsernameError("username");
    }
    throw err;
  }
};

export default createHost;
