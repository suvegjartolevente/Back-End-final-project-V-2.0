import NotFoundError from "../../errors/notFoundError.js";
import prisma from "../../src/prisma.js";

const getUsers = async (username, email) => {
  const user = await prisma.user.findMany({
    omit: {
      password: true,
    },
    where: {
      username,
      email,
    },
  });
  if (!user.length) {
    throw new NotFoundError("User with parameter");
  }
  return user;
};

export default getUsers;
