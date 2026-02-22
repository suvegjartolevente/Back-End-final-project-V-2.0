import DuplicateUsernameError from "../../errors/duplicateUsernameError.js";
import MissingRequiredFieldsError from "../../errors/missingRequiredFieldsError.js";
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
  const missingFields = [];
  if (!username) missingFields.push("username");
  if (!password) missingFields.push("password");
  if (!name) missingFields.push("name");
  if (!email) missingFields.push("email");
  if (!phoneNumber) missingFields.push("phoneNumber");
  if (!pictureUrl) missingFields.push("pictureUrl");
  if (!aboutMe) missingFields.push("aboutMe");

  if (
    !username ||
    !password ||
    !name ||
    !email ||
    !phoneNumber ||
    !pictureUrl ||
    !aboutMe
  )
    throw new MissingRequiredFieldsError(missingFields);
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
