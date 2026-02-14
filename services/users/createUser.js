import DuplicateUsernameError from "../../errors/duplicateUsernameError.js";
import prisma from "../../src/prisma.js";

const createUser = async (
  username,
  password,
  name,
  email,
  phoneNumber,
  pictureUrl,
) => {
  try {
    return await prisma.user.create({
      data: { username, password, name, email, phoneNumber, pictureUrl },
    });
  } catch (err) {
    if (err?.code === "P2002") {
      throw new DuplicateUsernameError("username");
    }
    throw err;
  }
};

export default createUser;
