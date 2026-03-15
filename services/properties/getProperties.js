import NotFoundError from "../../errors/notFoundError.js";
import prisma from "../../src/prisma.js";

const getProperties = async (location, pricePerNight) => {
  const property = await prisma.property.findMany({
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
   if (!property.length) {
    throw new NotFoundError("Property with parameter");
  }
  return property;
};

export default getProperties;
