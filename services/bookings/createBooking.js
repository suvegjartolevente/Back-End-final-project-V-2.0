import MissingRequiredFieldsError from "../../errors/missingRequiredFieldsError.js";
import prisma from "../../src/prisma.js";

const createBooking = async (
  userId,
  propertyId,
  checkinDate,
  checkoutDate,
  numberOfGuests,
  totalPrice,
  bookingStatus,
) => {
  const missingFields = [];
  if (!userId) missingFields.push("userId");
  if (!propertyId) missingFields.push("propertyId");
  if (!checkinDate) missingFields.push("checkinDate");
  if (!checkoutDate) missingFields.push("checkoutDate");
  if (!numberOfGuests) missingFields.push("numberOfGuests");
  if (!totalPrice) missingFields.push("totalPrice");
  if (!bookingStatus) missingFields.push("bookingStatus");

  if (
    !userId ||
    !propertyId ||
    !checkinDate ||
    !checkoutDate ||
    !numberOfGuests ||
    !totalPrice ||
    !bookingStatus
  ) 
    throw new MissingRequiredFieldsError(missingFields);
  return await prisma.booking.create({
    data: {
      userId,
      propertyId,
      checkinDate,
      checkoutDate,
      numberOfGuests,
      totalPrice,
      bookingStatus,
    },
  });
};

export default createBooking;
