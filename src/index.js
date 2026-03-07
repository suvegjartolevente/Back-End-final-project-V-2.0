import express from "express";
import usersRouter from "../routes/users.js";
import hostsRouter from "../routes/hosts.js";
import reviewsRouter from "../routes/reviews.js";
import propertiesRouter from "../routes/properties.js";
import bookingsRouter from "../routes/bookings.js";
import loginRouter from "../routes/login.js";
import log from "../middleware/logMiddleware.js";
import errorHandler from "../middleware/errorHandler.js";
import "dotenv/config";

const app = express();

app.use(express.json());

app.use(log);
app.use("/login", loginRouter);
app.use("/users", usersRouter);
app.use("/hosts", hostsRouter);
app.use("/reviews", reviewsRouter);
app.use("/properties", propertiesRouter);
app.use("/bookings", bookingsRouter);

app.get("/", (req, res) => {
  res.send("Hello world!");
});

app.use(errorHandler);

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
