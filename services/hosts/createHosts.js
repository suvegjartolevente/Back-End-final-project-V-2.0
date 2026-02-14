import DuplicateUsernameError from "../../errors/duplicateUsernameError.js";
import prisma from "../../src/prisma.js";

const createHost = async (
  username,
  password,
  name,
  email,
  phoneNumber,
  pictureUrl,
  aboutMe,
) => {
  try {
    return await prisma.host.create({
      data: {
        username,
        password,
        name,
        email,
        phoneNumber,
        pictureUrl,
        aboutMe,
      },
    });
  } catch (err) {
    if (err?.code === "P2002") {
      throw new DuplicateUsernameError("username");
    }
    throw err;
  }
};

export default createHost;
