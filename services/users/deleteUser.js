import NotFoundError from "../../errors/notFoundError.js";
import prisma from "../../src/prisma.js";

const deleteUser = async (id) => {
  const deleteUser = await prisma.user.deleteMany({
    where: {
      id,
    },
  });
  if ( deleteUser.count === 0) {
    throw new NotFoundError("User", id);
  }
  return id;
};

export default deleteUser;
