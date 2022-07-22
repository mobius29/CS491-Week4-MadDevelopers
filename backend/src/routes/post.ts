import { Router } from "express";
import { connection } from "../connection.js";

const postsRouter: Router = Router();

postsRouter.get("/", (req, res) => {
  console.log(req.method, req.originalUrl);
  connection.query(
    `SELECT Posts.id as postId, Users.id as authorId, title, displayName, Posts.createdAt FROM Users INNER JOIN Posts ON Users.id = Posts.authorId`,
    (error, rows) => {
      if (error)
        res.status(500).send(error);
      else
        res.send({ posts: rows });
    }
  )
});

postsRouter.get("/:id", (req, res) => {
  // TODO: Implement Me!!!!
})

postsRouter.post("/create", (req, res) => {
  const title: string = req.body["title"];
  const content: string = req.body["content"];
  const authorId: string = req.body["authorId"];
  const tags: string[] = req.body["tags"];

  console.log(req.method, req.baseUrl, title, content, authorId, tags);

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

      res.status(200).send({ id: postId });
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
