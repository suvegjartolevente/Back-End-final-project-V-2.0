import EmptyUpdateBodyError from "../../errors/emptyUpdateBodyError.js";
import InvalidValueTypeError from "../../errors/invalidValueTypeError.js";
import MissingRequiredFieldsError from "../../errors/missingRequiredFieldsError.js";
import NotFoundError from "../../errors/notFoundError.js";
import { validationError } from "../../errors/validationError.js";
import { valueTypeError } from "../../errors/valueTypeError.js";

import prisma from "../../src/prisma.js";
const updateBookingById = async (id, data) => {
  const { id: ignore, ...safeData } = data;
  const validationIssueList = validationError(data);
  const valueTypeIssueList = valueTypeError(data);

  if (Object.entries(data).length === 0) {
    throw new EmptyUpdateBodyError();
  }
  if (validationIssueList.length)
    throw new MissingRequiredFieldsError(validationIssueList);

  if (valueTypeIssueList.length)
    throw new InvalidValueTypeError(valueTypeIssueList);
  try {
    const updatedBooking = await prisma.booking.update({
      where: { id },
      data: safeData,
    });

    return updatedBooking;
  } catch (err) {
    if (err?.code === "P2025") {
      throw new NotFoundError("User", id);
    }

    throw err;
  }
};
export default updateBookingById;
