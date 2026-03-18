import { Router } from "express";

import notFoundErrorHandler from "../middleware/notFoundErrorHandler.js";
import authMiddleware from "../middleware/auth.js";
import getProperties from "../services/properties/getProperties.js";
import createProperty from "../services/properties/createProperty.js";
import getPropertyById from "../services/properties/getPropertyById.js";
import deleteProperty from "../services/properties/deleteProperty.js";
import updatePropertyById from "../services/properties/updatePropertyById.js";
import MissingIdError from "../errors/missingIdError.js";
import InvalidQueryParameter from "../errors/InvalidQueryParameterError.js";

const router = Router();

router.get(
  "/",
  async (req, res, next) => {
    try {
      const { location } = req.query;

      const price = req.query.pricePerNight
        ? parseFloat(req.query.pricePerNight)
        : undefined;

      const queryKeys = Object.keys(req.query);

      console.log("inculdes location", !queryKeys.includes("location"));
      console.log(
        "inculdes pricePerNight",
        !queryKeys.includes("pricePerNight"),
      );

      if (
        queryKeys.length === 1 &&
        !queryKeys.includes("location") &&
        !queryKeys.includes("pricePerNight")
      ) {
        throw new InvalidQueryParameter();
      }

      if (
        (queryKeys.length === 2 && !queryKeys.includes("location")) ||
        (queryKeys.length === 2 && !queryKeys.includes("pricePerNight"))
      ) {
        throw new InvalidQueryParameter();
      }

      const propreties = await getProperties(location, price);
      res.status(200).json(propreties);
    } catch (error) {
      next(error);
    }
  },
  notFoundErrorHandler,
);

router.post("/", authMiddleware, async (req, res, next) => {
  try {
    const data = req.body;
    const newProperty = await createProperty(data);
    res.status(201).json(newProperty);
  } catch (error) {
    next(error);
  }
});

router.get(
  "/:id",
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const property = await getPropertyById(id);
      res.status(200).json(property);
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
      const { id } = req.params;
      const data = req.body;
      const updatedProperty = await updatePropertyById(id, data);
      res.status(200).json(updatedProperty);
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
      const deletedPropertyId = await deleteProperty(id);
      res.status(200).json({
        message: `Property with id${deletedPropertyId} was deleted !`,
      });
    } catch (error) {
      next(error);
    }
  },
  notFoundErrorHandler,
);
export default router;
