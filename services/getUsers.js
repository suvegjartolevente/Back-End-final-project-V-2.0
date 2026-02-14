import prisma from "../src/prisma";

const getUsers = async (username, email) => {
  return prisma.user.findMany({
    where: {
      username,
      available,
    },
  });
};

export default getUsers;
