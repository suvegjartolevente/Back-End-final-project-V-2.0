import prisma from "../../src/prisma.js";

const getBookings = async (userId) => {
  
  return prisma.booking.findMany({
    
    where: { userId },
  });
};

export default getBookings;
