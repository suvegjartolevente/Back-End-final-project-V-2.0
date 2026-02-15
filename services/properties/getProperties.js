import prisma from "../../src/prisma.js";

const getProperties = async (location, pricePerNight) => {
  return prisma.property.findMany({
    where: {
      location,
      pricePerNight,
    },
  });
};

export default getProperties;
