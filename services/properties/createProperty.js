import MissingRequiredFieldsError from "../../errors/missingRequiredFieldsError.js";
import prisma from "../../src/prisma.js";

const createProperty = async (
  title,
  description,
  location,
  pricePerNight,
  bedroomCount,
  bathRoomCount,
  maxGuestCount,
  hostId,
  rating,
) => {
  const missingFields = [];
  if (!title) missingFields.push("title");
  if (!description) missingFields.push("description");
  if (!location) missingFields.push("location");
  if (!pricePerNight) missingFields.push("pricePerNight");
  if (!bedroomCount) missingFields.push("bedroomCount");
  if (!bathRoomCount) missingFields.push("bathRoomCount");
  if (!maxGuestCount) missingFields.push("maxGuestCount");
  if (!hostId) missingFields.push("hostId");
  if (!rating) missingFields.push("rating");

  if (
    !title ||
    !description ||
    !location ||
    !pricePerNight ||
    !bedroomCount ||
    !bathRoomCount ||
    !maxGuestCount ||
    !hostId ||
    !rating
  )
    throw new MissingRequiredFieldsError(missingFields);
  return await prisma.property.create({
    data: {
      title,
      description,
      location,
      pricePerNight,
      bedroomCount,
      bathRoomCount,
      maxGuestCount,
      hostId,
      rating,
    },
  });
};

export default createProperty;
