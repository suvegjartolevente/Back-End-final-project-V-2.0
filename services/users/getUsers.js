import prisma from "../../src/prisma.js";

const getUsers = async (username, email) => {
  return prisma.user.findMany({
    omit: {
      password: true,
    },
    where: {
      username,
      email,
    },
  });
};

export default getUsers;
