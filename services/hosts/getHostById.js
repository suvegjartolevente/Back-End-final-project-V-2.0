import NotFoundError from "../../errors/notFoundError.js";

import prisma from "../../src/prisma.js";

const getHostById = async (id) => {
  const host = await prisma.host.findUnique({
    omit: {
      password: true,
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
