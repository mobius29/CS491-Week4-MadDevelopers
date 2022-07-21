import express from "express";
import bodyParser from "body-parser";
import userRouter from "./routes/user.js";

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.raw());

app.use("/user", userRouter);

app.listen(80, () => {});
