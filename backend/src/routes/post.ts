import { Router } from "express";
import { connection } from "../connection.js";

const postsRouter: Router = Router();

postsRouter.get("/", (req, res) => {
  connection.query(
    `SELECT id, title, authorId, createdAt, lastUpdated FROM Posts WHERE isDeleted = 0`,
    (error, rows) => {
      if (error) res.status(500).send(error);
      else res.send(rows);
    }
  );
});

postsRouter.post("/create", (req, res) => {
  const title: string = req.body["title"];
  const content: string = req.body["content"];
  const authorId: string = req.body["authorId"];
  const tags: string[] = req.body["tags"];

  console.log(title, content, authorId, tags);

  connection.query(
    `INSERT INTO Posts VALUE(NULL, "${title}", "${content}", "${authorId}", DEFAULT, DEFAULT, DEFAULT)`,
    (error, rows) => {
      if (error) res.status(500).send(error);

      const postId = rows["insertId"];

      tags.forEach((tag: string) => {
        connection.query(`INSERT INTO PostTags VALUE(${postId}, "${tag}")`, (error) => {
          if (error) res.status(500).send(error);
        });
      });

      res.sendStatus(200);
    }
  );
});

postsRouter.post("/comment", (req, res) => {
  const postId = req.body["postId"];
  const userId = req.body["userId"];
  const comment = req.body["comment"];
  const parentCommendId: number | null = req.body["parentCommentId"];

  connection.query(
    `INSERT INTO Comments VALUE(NULL, ${postId}, ${userId}, "${comment}", ${parentCommendId})`,
    (error) => {
      if (error) res.status(500).send(error);
      else res.sendStatus(200);
    }
  );
});

export default postsRouter;
