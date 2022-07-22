import { CookieOptions, Router } from "express";
import sjcl from "sjcl";
import { connection } from "../connection.js";

const userRouter: Router = Router();

userRouter.post("/register", (req, res) => {
  const userName: string = req.body["userName"];
  const password: string = req.body["password"];
  const passwordSHA = sjcl.hash.sha256.hash(password);
  const hashedPassword = sjcl.codec.hex.fromBits(passwordSHA);
  const displayName = req.body["displayName"];

  console.log(`${req.method} ${req.originalUrl} ${userName} ${hashedPassword} ${displayName}`);

  connection.query(
    `INSERT INTO Users VALUE(NULL, "${userName}", "${hashedPassword}", "${displayName}", DEFAULT, DEFAULT, DEFAULT, DEFAULT, DEFAULT, DEFAULT)`,
    (error) => {
      if (error) res.status(400).send(error);
      else res.status(200).send();
    }
  );
});

userRouter.get("/login", (req, res) => {
  if (req.cookies["id"]) {
    res.status(400).send(req.cookies["id"]);
  } else {
    res.sendStatus(200);
  }
});

userRouter.post("/login", (req, res) => {
  console.log(req.cookies);

  const userName: string = req.body["userName"];
  const password: string = req.body["password"];
  const passwordSHA = sjcl.hash.sha256.hash(password);
  const hashedPassword = sjcl.codec.hex.fromBits(passwordSHA);

  console.log(`${req.method} ${req.originalUrl} ${userName} ${hashedPassword}`);

  connection.query(
    `SELECT id FROM Users WHERE userName = "${userName}" AND hashedPassword = "${hashedPassword}"`,
    (error, rows) => {
      if (error) res.sendStatus(500);
      if (rows.length === 1) {
        const userId = rows[0]["id"];
        console.log(userId);

        res.cookie("id", userId, { expires: new Date(Date.now() + 1000 * 60 * 60) });

        res.status(200).send({ data: `${userId}` });
      } else {
        res.status(404).send();
      }
    }
  );
});

userRouter.post("/star", (req, res) => {
  if (!req.cookies["id"]) res.send(400);

  const followerId = req.cookies["id"];
  const followingId = req.body["followingId"];

  console.log(`${req.method} ${req.originalUrl} ${followerId} ${followingId}`);

  connection.query(`INSERT INTO Stars VALUE(${followerId}, ${followingId})`, (error) => {
    if (error) res.status(500).send(error);
    else res.sendStatus(200);
  });
});

userRouter.get("/:id", (req, res) => {
  const myId: number = req.cookies["id"] ?? -1;
  const id: number = parseInt(req.params.id);
  let starred: boolean = false;

  connection.query(
    `SELECT displayName, selfInformation, profileImage FROM Users WHERE id = ${id} AND isDeleted = 0`,
    (error, rows) => {
      const displayName = rows[0]["displayName"];
      const selfInformation = rows[0]["selfInformation"];
      const profileImage = rows[0]["profileImage"];

      if (myId !== -1) {
        connection.query(`SELECT * FROM Stars WHERE followerId = ${myId} AND followingId = ${id}`, (error) => {
          if (error) {
            res.status(500).send(error);
          } else {
            starred = rows.length === 1;
            res.send({ displayName, selfInformation, profileImage, star: starred });
          }
        });
      } else {
        res.send({ displayName, selfInformation, profileImage, star: starred });
      }
    }
  );
});

export default userRouter;
