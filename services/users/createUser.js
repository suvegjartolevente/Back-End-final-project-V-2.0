import DuplicateUsernameError from "../../errors/duplicateUsernameError.js";
import MissingRequiredFieldsError from "../../errors/missingRequiredFieldsError.js";
import prisma from "../../src/prisma.js";

const createUser = async (
  username,
  password,
  name,
  email,
  phoneNumber,
  pictureUrl,
) => {
  const missingFields = [];
  if (!username) missingFields.push("username");
  if (!name) missingFields.push("name");
  if (!email) missingFields.push("email");
  if (!phoneNumber) missingFields.push("phoneNumber");
  if (!pictureUrl) missingFields.push("pictureUrl");
  if (!password) missingFields.push("password");
  if (
    !username ||
    !name ||
    !email ||
    !phoneNumber ||
    !pictureUrl ||
    !password
  ) {
    throw new MissingRequiredFieldsError(missingFields);
  }
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
