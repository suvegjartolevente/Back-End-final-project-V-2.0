import express from "express";
import usersRouter from "../routes/users.js"
import log from "../middleware/logMiddleware.js";


const app = express();

app.use(express.json());

app.use(log);
app.use("/users", usersRouter);

app.get("/", (req, res) => {
  res.send("Hello world!");
});

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
