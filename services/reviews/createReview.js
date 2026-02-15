import prisma from "../../src/prisma.js";

const createReview = async (userId, propertyId, rating, comment) => {
  return await prisma.review.create({
    data: {
      userId,
      propertyId,
      rating,
      comment,
    },
  });
};

export default createReview;
