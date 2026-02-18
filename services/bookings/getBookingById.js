import NotFoundError from "../../errors/notFoundError.js";

import prisma from "../../src/prisma.js";

const getBookingById = async (id) => {
  const booking = await prisma.booking.findUnique({
    where: {
      id,
    },
  });

  if (!booking) {
    throw new NotFoundError("booking", id);
  }
  return booking;
};

export default getBookingById;
