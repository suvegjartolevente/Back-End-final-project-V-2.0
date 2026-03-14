import { Router } from "express";
import getBookings from "../services/bookings/getBookings.js";
import notFoundErrorHandler from "../middleware/notFoundErrorHandler.js";
import getBookingById from "../services/bookings/getBookingById.js";
import createBooking from "../services/bookings/createBooking.js";
import updateBookingById from "../services/bookings/updateBookingById.js";
import deleteBooking from "../services/bookings/deleteBooking.js";
import MissingIdError from "../errors/missingIdError.js";
import authMiddleware from "../middleware/auth.js";

const router = Router();

router.get("/", async (req, res) => {
  
  const { userId } = req.query;
  const bookings = await getBookings(userId);
   
  res.status(200).json(bookings);
});

router.post("/",authMiddleware, async (req, res, next) => {
  try {
    const data = req.body;

    const newBooking = await createBooking(data);
    res.status(201).json(newBooking);
  } catch (error) {
    next(error);
  }
});

router.get(
  "/:id",
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const booking = await getBookingById(id);
      res.status(200).json(booking);
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
      const updatedBooking = await updateBookingById(id, data);
      res.status(200).json(updatedBooking);
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
      const deletedBookingId = await deleteBooking(id);
      res.status(200).json({
        message: `Booking with id${deletedBookingId} was deleted !`,
      });
    } catch (error) {
      next(error);
    }
  },
  notFoundErrorHandler,
);

export default router;
