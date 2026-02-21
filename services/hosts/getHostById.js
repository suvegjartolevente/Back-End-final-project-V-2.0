import NotFoundError from "../../errors/notFoundError.js";

import prisma from "../../src/prisma.js";

const getHostById = async (id) => {
  const host = await prisma.host.findUnique({
    select: {
      id: true,
      username: true,
      password: false,
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
    where: {
      id,
    },
  });

  if (!host) {
    throw new NotFoundError("host", id);
  }
  return host;
};

export default getHostById;
