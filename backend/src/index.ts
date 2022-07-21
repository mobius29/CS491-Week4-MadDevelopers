import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import userRouter from "./routes/user.js";
import postsRouter from "./routes/post.js";

const app = express();

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.raw());

app.use("/user", userRouter);
app.use("/posts", postsRouter);

app.listen(80, () => {});
