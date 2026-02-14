import NotFoundError from "../../errors/notFoundError.js";

import prisma from "../../src/prisma.js";

const getUserById = async (id) => {
  const user = await prisma.user.findUnique({
    omit: {
      password: true,
    },
    where: {
      id,
    },
  });

  if (!user) {
    throw new NotFoundError("User", id);
  }
  return user;
};

export default getUserById;
