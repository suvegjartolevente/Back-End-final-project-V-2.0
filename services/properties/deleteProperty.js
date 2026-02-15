import NotFoundError from "../../errors/notFoundError.js";
import prisma from "../../src/prisma.js";

const deleteProperty = async (id) => {
  const deleteProperty = await prisma.property.deleteMany({
    where: {
      id,
    },
  });
  if (deleteProperty.count === 0) {
    throw new NotFoundError("Property", id);
  }
  return id;
};

export default deleteProperty;
