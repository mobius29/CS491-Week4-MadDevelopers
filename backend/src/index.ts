import express from "express";
import cors from "cors";
import userRouter from "./routes/user.js";
import postsRouter from "./routes/post.js";
import typegameRouter from "./routes/typegame.js";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";

const app = express();

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.raw());
app.use(fileUpload());

app.use("/images", express.static("uploads"));

app.use("/user", userRouter);
app.use("/posts", postsRouter);
app.use("/game", typegameRouter);

app.listen(80, () => {
  console.log("Server running...")
});
