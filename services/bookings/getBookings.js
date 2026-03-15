import NotFoundError from "../../errors/notFoundError.js";

import prisma from "../../src/prisma.js";

const getBookings = async (userId) => {
  const booking = await prisma.booking.findMany({
    where: { userId },
  });
  
  if (!booking.length) {
    throw new NotFoundError("Booking with parameter");
  }
  return booking;
};

export default getBookings;
