import MissingRequiredFieldsError from "../../errors/missingRequiredFieldsError.js";
import { validationError } from "../../errors/validationError.js";
import { valueTypeError } from "../../errors/valueTypeError.js";
import prisma from "../../src/prisma.js";
import InvalidValueTypeError from "../../errors/invalidValueTypeError.js";
import getMissingRequired from "../../errors/getMissingRequired.js";

import IdAndTimeError from "../../errors/idAndTimeValidationError.js";


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
  const checkin = new Date(data.checkinDate);
  const checkout = new Date(data.checkoutDate);
  const { id: ignore, ...safeData } = data;
  const missingFields = getMissingRequired(data, requiredFields);

  const validationIssueList = validationError(data);
  const valueTypeIssueList = valueTypeError(data);
  console.log(checkin)
  if (isNaN(checkin) || isNaN(checkout)) {
    throw new IdAndTimeError(" Checkindate and checkoutdate  ");
  }
  if (checkin > checkout) {
    throw new IdAndTimeError(" Checkindate must be before checkoutdate and");
  }
  if (missingFields.length) throw new MissingRequiredFieldsError(missingFields);
  if (validationIssueList.length)
    throw new MissingRequiredFieldsError(validationIssueList);
  else if (valueTypeIssueList.length)
    throw new InvalidValueTypeError(valueTypeIssueList);
  try {
    return await prisma.booking.create({
      data: safeData,
    });
  } catch (err) {
    if (err?.code === "P2003") {
      throw new IdAndTimeError("UserId and propertyId");
    }
    throw err;
  }
};

export default createBooking;
