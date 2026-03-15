import { Router } from "express";

import notFoundErrorHandler from "../middleware/notFoundErrorHandler.js";
import getUserById from "../services/users/getUserById.js";
import getUsers from "../services/users/getUsers.js";
import createUser from "../services/users/createUser.js";
import deleteUser from "../services/users/deleteUser.js";
import updatedUserById from "../services/users/updateUserById.js";
import MissingIdError from "../errors/missingIdError.js";
import authMiddleware from "../middleware/auth.js";
const router = Router();

router.get(
  "/",
  async (req, res, next) => {
    try {
      const { username, email } = req.query;
      const users = await getUsers(username, email);
      res.status(200).json(users);
    } catch (error) {
      next(error);
    }
  },
  notFoundErrorHandler,
);

router.post("/", authMiddleware, async (req, res, next) => {
  try {
    const data = req.body;

    const newUser = await createUser(data);
    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
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

router.put(
  "/:id",
  authMiddleware,
  async (req, res, next) => {
    try {
      const data = req.body;
      const { id } = req.params;

      const updatedUser = await updatedUserById(id, data);
      res.status(200).json(updatedUser);
    } catch (error) {
      next(error);
    }
  },
  notFoundErrorHandler,
);

router.put("/", async (req, res, next) => {
  try {
    if (!req.params.id) {
      throw new MissingIdError();
    }
  } catch (error) {
    next(error);
  }
});

router.delete(
  "/:id",
  authMiddleware,
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const deletedUserId = await deleteUser(id);
      res.status(200).json({
        message: `User with id${deletedUserId} was deleted !`,
      });
    } catch (error) {
      next(error);
    }
  },
  notFoundErrorHandler,
);

export default router;
