import getMissingRequired from "../../errors/getMissingRequired.js";
import InvalidValueTypeError from "../../errors/invalidValueTypeError.js";
import MissingRequiredFieldsError from "../../errors/missingRequiredFieldsError.js";
import { validationError } from "../../errors/validationError.js";
import { valueTypeError } from "../../errors/valueTypeError.js";
import prisma from "../../src/prisma.js";
const requiredFields = ["userId", "propertyId", "rating", "comment"];
const createReview = async (data) => {
  const { id: ignore, ...safeData } = data;
  const missingFields = getMissingRequired(data, requiredFields);

  const validationIssueList = validationError(data);
  const valueTypeIssueList = valueTypeError(data);
  if (missingFields.length) throw new MissingRequiredFieldsError(missingFields);
  if (validationIssueList.length)
    throw new MissingRequiredFieldsError(validationIssueList);
  else if (valueTypeIssueList.length)
    throw new InvalidValueTypeError(valueTypeIssueList);
  return await prisma.review.create({
    data: safeData,
  });
};

export default createReview;
