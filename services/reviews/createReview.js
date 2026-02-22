import MissingRequiredFieldsError from "../../errors/missingRequiredFieldsError.js";
import prisma from "../../src/prisma.js";

const createReview = async (userId, propertyId, rating, comment) => {
  const missingFields = [];
  if (!userId) missingFields.push("userId");
  if (!propertyId) missingFields.push("propertyId");
  if (!rating) missingFields.push("rating");
  if (!comment) missingFields.push("comment");

  if (!userId || !propertyId || !rating || !comment)
    throw new MissingRequiredFieldsError(missingFields);
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
