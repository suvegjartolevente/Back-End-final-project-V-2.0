import prisma from "../../src/prisma.js";

const getHosts = async (username, email) => {
  return prisma.host.findMany({
    omit: {
      password: true,
    },
    where: {
      username,
      email,
    },
  });
};

export default getHosts;
