import NotFoundError from "../../errors/notFoundError.js";

import prisma from "../../src/prisma.js";
const updateHostById = async (id, data) => {
  const { id: ignore, ...safeData } = data;
  const updatedHost = await prisma.host.updateMany({
    where: { id },
    data: safeData,
  });

  if (updatedHost.count === 0) {
    throw new NotFoundError("Host", id);
  }
  return { message: ` Host with id ${id} was updated` };
};
export default updateHostById;
