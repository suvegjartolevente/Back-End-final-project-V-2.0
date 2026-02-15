import NotFoundError from "../../errors/notFoundError.js";

import prisma from "../../src/prisma.js";

const getPropertyById = async (id) => {
  const property = await prisma.property.findUnique({
    where: {
      id,
    },
  });

  if (!property) {
    throw new NotFoundError("property", id);
  }
  return property;
};

export default getPropertyById;
