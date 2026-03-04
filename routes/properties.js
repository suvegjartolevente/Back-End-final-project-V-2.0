import { Router } from "express";

import notFoundErrorHandler from "../middleware/notFoundErrorHandler.js";

import getProperties from "../services/properties/getProperties.js";
import createProperty from "../services/properties/createProperty.js";
import getPropertyById from "../services/properties/getPropertyById.js";
import deleteProperty from "../services/properties/deleteProperty.js";
import updatePropertyById from "../services/properties/updatePropertyById.js";
const router = Router();

router.get("/", async (req, res) => {
  const { location, pricePerNight } = req.query;
  const propreties = await getProperties(location, pricePerNight);
  res.status(200).json(propreties);
});

router.post("/", async (req, res, next) => {
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

router.delete(
  "/:id",
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
