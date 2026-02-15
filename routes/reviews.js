import { Router } from "express";
import getReviews from "../services/reviews/getReviews.js";

// import notFoundErrorHandler from "../middleware/notFoundErrorHandler.js";

const router = Router();

router.get("/", async (req, res) => {
  const reviews = await getReviews();
  res.status(200).json(reviews);
});

export default router;
