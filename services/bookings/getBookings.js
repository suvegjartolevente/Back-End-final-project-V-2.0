import prisma from "../../src/prisma.js";

const getBookings = async () => {
  return prisma.booking.findMany({
    
  });
};

export default getBookings;