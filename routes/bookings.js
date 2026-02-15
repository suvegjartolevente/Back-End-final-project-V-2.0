import { Router } from "express";
import getBookings from "../services/bookings/getBookings.js";

const router = Router();

router.get("/", async (req, res) => {
  const bookings = await getBookings();
  res.status(200).json(bookings);
});

// import notFoundErrorHandler from "../middleware/notFoundErrorHandler.js";


export default router;