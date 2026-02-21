import prisma from "../../src/prisma.js";

const getProperties = async (location, pricePerNight) => {
  return prisma.property.findMany({
    include: {
      reviews: {
        select: {
          comment: true,
          rating: true,
        },
      },
    },

    where: {
      location,
      pricePerNight,
    },
  });
};

export default getProperties;
