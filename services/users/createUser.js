import prisma from "../../src/prisma.js";

const createUser = async (
  username,
  password,
  name,
  email,
  phoneNumber,
  pictureUrl,
) => {
  return prisma.user.create({
    data: {
      username,
      password,
      name,
      email,
      phoneNumber,
      pictureUrl,
    },
  });
};

export default createUser;
