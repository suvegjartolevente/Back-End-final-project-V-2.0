import InvalidValueTypeError from "../../errors/invalidValueTypeError.js";
import NotFoundError from "../../errors/notFoundError.js";

import prisma from "../../src/prisma.js";
const updateBookingById = async (id, data) => {
  const { id: ignore, ...safeData } = data;
  const updatedBooking = await prisma.booking.updateMany({
    where: { id },
    data: safeData,
  });

  if (updatedBooking.count === 0) {
    throw new NotFoundError("Booking", id);
  }
  return { message: ` Booking with id ${id} was updated` };
};
export default updateBookingById;
