import NotFoundError from "../../errors/notFoundError.js";

import prisma from "../../src/prisma.js";
const updateUserById = async (
  id,
  username,
  password,
  name,
  email,
  phoneNumber,
  pictureUrl,
) => {
  const updatedUser = await prisma.user.updateMany({
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

  if (updatedUser.count === 0) {
    throw new NotFoundError("User", id);
  }
  return { message: ` User with id ${id} was updated` };
};
export default updateUserById;
