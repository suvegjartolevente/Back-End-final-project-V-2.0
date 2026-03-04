import { Router } from "express";
import getReviews from "../services/reviews/getReviews.js";

import notFoundErrorHandler from "../middleware/notFoundErrorHandler.js";
import getReviewById from "../services/reviews/getReviewById.js";
import updateReviewById from "../services/reviews/updateReviewById.js";
import createReview from "../services/reviews/createReview.js";
import deleteReview from "../services/reviews/deleteReview.js";

const router = Router();

router.get("/", async (req, res) => {
  const reviews = await getReviews();
  res.status(200).json(reviews);
});

router.post("/", async (req, res, next) => {
  try {
    const data = req.body;
    const newReview = await createReview(data);
    res.status(201).json(newReview);
  } catch (error) {
    next(error);
  }
});

router.put(
  "/:id",
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const data = req.body;
      const updatedReview = await updateReviewById(id, data);
      res.status(200).json(updatedReview);
    } catch (error) {
      next(error);
    }
  },
  notFoundErrorHandler,
);

router.get(
  "/:id",
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const review = await getReviewById(id);
      res.status(200).json(review);
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
      const deletedReviewId = await deleteReview(id);
      res.status(200).json({
        message: `Review with id${deletedReviewId} was deleted !`,
      });
    } catch (error) {
      next(error);
    }
  },
  notFoundErrorHandler,
);
export default router;
