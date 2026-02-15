import NotFoundError from "../../errors/notFoundError.js";

import prisma from "../../src/prisma.js";

const getReviewById = async (id) => {
  const review = await prisma.review.findUnique({
    where: {
      id,
    },
  });

  if (!review) {
    throw new NotFoundError("review", id);
  }
  return review;
};

export default getReviewById;
