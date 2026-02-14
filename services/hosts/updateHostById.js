import NotFoundError from "../../errors/notFoundError.js";

import prisma from "../../src/prisma.js";
const updateHostById = async (
  id,
  username,
  password,
  name,
  email,
  phoneNumber,
  pictureUrl,
) => {
  const updatedHost = await prisma.host.updateMany({
    where: { id },
    data: {
      username,
      password,
      name,
      email,
      phoneNumber,
      pictureUrl,
    },
  });

  if (updatedHost.count === 0) {
    throw new NotFoundError("Host", id);
  }
  return { message: ` Host with id ${id} was updated` };
};
export default updateHostById;
