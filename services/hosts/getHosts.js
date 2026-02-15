import prisma from "../../src/prisma.js";

const getHosts = async (name) => {
  return prisma.host.findMany({
    omit: {
      password: true,
    },
    where: {
      name
      
    },
  });
};

export default getHosts;
