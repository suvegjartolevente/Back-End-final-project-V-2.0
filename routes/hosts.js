import { Router } from "express";
import getHosts from "../services/hosts/getHosts.js";
import createHost from "../services/hosts/createHosts.js";
import deleteHost from "../services/hosts/deleteHost.js";
import notFoundErrorHandler from "../middleware/notFoundErrorHandler.js";
import updateHostById from "../services/hosts/updateHostById.js";
import getHostById from "../services/hosts/getHostById.js";
import authMiddleware from "../middleware/auth.js";
import MissingIdError from "../errors/missingIdError.js";
const router = Router();

router.get("/", async (req, res) => {
  const { name } = req.query;
  const hosts = await getHosts(name);
  res.status(200).json(hosts);
});

router.post("/",authMiddleware, async (req, res, next) => {
  try {
    const data = req.body;
    const newHost = await createHost(data);
    res.status(201).json(newHost);
  } catch (error) {
    next(error);
  }
});

router.get(
  "/:id",
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const host = await getHostById(id);
      res.status(200).json(host);
    } catch (error) {
      next(error);
    }
  },
  notFoundErrorHandler,
);

router.put(
  "/:id",authMiddleware,
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const data = req.body;

      const updatedHost = await updateHostById(id, data);
      res.status(200).json(updatedHost);
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
  "/:id",authMiddleware,
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const deletedHostId = await deleteHost(id);
      res.status(200).json({
        message: `Host with id${deletedHostId} was deleted !`,
      });
    } catch (error) {
      next(error);
    }
  },
  notFoundErrorHandler,
);

export default router;
