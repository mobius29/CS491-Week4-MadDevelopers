import express from "express";
import cors from "cors";
import userRouter from "./routes/user.js";
import postsRouter from "./routes/post.js";
import cookieParser from "cookie-parser";

const app = express();

app.use(cors());

app.use(cookieParser());

app.use(express.json());
app.use(express.raw());

app.use("/user", userRouter);
app.use("/posts", postsRouter);

app.listen(80, () => {});
