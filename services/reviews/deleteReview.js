import NotFoundError from "../../errors/notFoundError.js";
import prisma from "../../src/prisma.js";

const deleteReview = async (id) => {
  const deleteReview = await prisma.review.deleteMany({
    where: {
      id,
    },
  });
  if (deleteReview.count === 0) {
    throw new NotFoundError("Review", id);
  }
  return id;
};

export default deleteReview;
