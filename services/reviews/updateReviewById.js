import NotFoundError from "../../errors/notFoundError.js";

import prisma from "../../src/prisma.js";
const updateReviewById = async (id, userId, propertyId, rating, comment) => {
  const updatedReview = await prisma.review.updateMany({
    where: { id },
    data: {
      userId,
      propertyId,
      rating,
      comment,
    },
  });

  if (updatedReview.count === 0) {
    throw new NotFoundError("Review", id);
  }
  return { message: ` Review with id ${id} was updated` };
};
export default updateReviewById;
