import DuplicateUsernameError from "../../errors/duplicateUsernameError.js";
import NotFoundError from "../../errors/notFoundError.js";

import prisma from "../../src/prisma.js";
const updatedUserById = async (
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
  try {
    return { message: ` User with id ${id} was updated` };
  } catch (err) {
    if (err?.code === "P2002") {
      throw new DuplicateUsernameError("username");
    }
    throw err;
  }
};
export default updatedUserById;
