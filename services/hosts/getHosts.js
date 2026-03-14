
import prisma from "../../src/prisma.js";

const getHosts = async (name) => {
  return prisma.host.findMany({
    where: {
      name,
    },
    select: {
      id: true,
      username: true,
      password: false,
      aboutMe: true,
      name: true,
      email: true,
      phoneNumber: true,
      pictureUrl: true,
      listings: {
        select: {
          id: true,
          title: true,
          description: true,
          location: true,
          pricePerNight: true,
        },
      },
    },
  });
};

export default getHosts;
