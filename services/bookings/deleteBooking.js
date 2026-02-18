import NotFoundError from "../../errors/notFoundError.js";
import prisma from "../../src/prisma.js";

const deleteBooking = async (id) => {
  const deleteBooking = await prisma.booking.deleteMany({
    where: {
      id,
    },
  });
  if (deleteBooking.count === 0) {
    throw new NotFoundError("Booking", id);
  }
  return id;
};

export default deleteBooking;
