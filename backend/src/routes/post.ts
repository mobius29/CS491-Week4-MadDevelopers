import { Router } from "express";
import { connection } from "../connection.js";

const postsRouter: Router = Router();

postsRouter.get("/", (req, res) => {
  res.send(req.url);
});

postsRouter.post("/create", (req, res) => {
  const title = req.body["title"];
  const content = req.body["content"];
  const authorId = req.body["authorId"];
  const tags = req.body["tags"];

  console.log(title, content, authorId, tags);

  res.send("HI");

  connection.query(
    `INSERT INTO Posts VALUE(NULL, "${title}", "${content}", "${authorId}", DEFAULT, DEFAULT, DEFAULT)`,
    (error, rows) => {
      res.sendStatus(200);
    }
  );
});

export default postsRouter;
