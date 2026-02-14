import { Router } from "express";

import notFoundErrorHandler from "../middleware/notFoundErrorHandler.js";
import getUserById from "../services/users/getUserById.js";
import getUsers from "../services/users/getUsers.js";
import createUser from "../services/users/createUser.js";

const router = Router();

router.get("/", async (req, res) => {
  const { username, email } = req.query;
  const users = await getUsers(username, email);
  res.status(200).json(users);
});

router.post("/", async (req, res) => {
  const { username, password, name, email, phoneNumber, pictureUrl } = req.body;
  const newUser = await createUser(
    username,
    password,
    name,
    email,
    phoneNumber,
    pictureUrl,
  );
  res.status(201).json(newUser);
});

router.get(
  "/:id",
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const user = await getUserById(id);
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  },
  notFoundErrorHandler,
);

export default router;
