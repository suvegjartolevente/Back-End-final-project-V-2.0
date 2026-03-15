import NotFoundError from "../../errors/notFoundError.js";
import prisma from "../../src/prisma.js";

const getHosts = async (name) => {
  const host = await prisma.host.findMany({
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
  if (!host.length) {
    throw new NotFoundError("Host with parameter");
  }
  return host;
};

export default getHosts;
