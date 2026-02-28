export const valueTypeError = (data) => {
  const missTypeValues = [];

  const stringFields = [
    "propertyId",
    "bookingStatus",
    "username",
    "password",
    "name",
    "email",
    "phoneNumber",
    "pictureUrl",
    "aboutMe",
    "title",
    "description",
    "location",
    "hostId",
    "userId",
    "comment",
    "checkinDate",
    "checkoutDate",
    "bookingStatus",
  ];
  const numberFields = [
    "pricePerNight",
    "bedroomCount",
    "bathRoomCount",
    "maxGuestCount",
    "rating",
    "numberOfGuests",
    "totalPrice",
  ];
  for (const [key, value] of Object.entries(data)) {
    if (stringFields.includes(key) && typeof value !== "string") {
      missTypeValues.push(key);
    }

    if (numberFields.includes(key) && typeof value !== "number") {
      missTypeValues.push(key);
    }
  }
  return missTypeValues;
};
