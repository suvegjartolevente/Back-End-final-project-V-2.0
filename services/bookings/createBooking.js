import MissingRequiredFieldsError from "../../errors/missingRequiredFieldsError.js";

import { validationError } from "../../errors/validationError.js";
import { valueTypeError } from "../../errors/valueTypeError.js";
import prisma from "../../src/prisma.js";
import InvalidValueTypeError from "../../errors/invalidValueTypeError.js";
import getMissingRequired from "../../errors/getMissingRequired.js";

const requiredFields = [
  "userId",
  "propertyId",
  "checkinDate",
  "checkoutDate",
  "numberOfGuests",
  "totalPrice",
  "bookingStatus",
];
const createBooking = async (data) => {
  const missingFields = getMissingRequired(data, requiredFields);

  const validationIssueList = validationError(data);
  const valueTypeIssueList = valueTypeError(data);
  if (missingFields.length) throw new MissingRequiredFieldsError(missingFields);
  if (validationIssueList.length)
    throw new MissingRequiredFieldsError(validationIssueList);
  else if (valueTypeIssueList.length)
    throw new InvalidValueTypeError(valueTypeIssueList);

  return await prisma.booking.create({
    data,
  });
};

export default createBooking;
