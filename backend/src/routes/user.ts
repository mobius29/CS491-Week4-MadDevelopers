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

userRouter.get("/check", (req, res) => {
  if (req.cookies["id"]) {
    res.status(200).send(req.cookies["id"]);
  } else {
    res.status(404).send("-1");
  }
});

userRouter.post("/login", (req, res) => {
  const userName: string = req.body["userName"];
  const password: string = req.body["password"];
  const passwordSHA = sjcl.hash.sha256.hash(password);
  const hashedPassword = sjcl.codec.hex.fromBits(passwordSHA);

  console.log(`${req.method} ${req.originalUrl} ${userName} ${hashedPassword}`);

  connection.query(
    `SELECT id FROM Users WHERE userName = "${userName}" AND hashedPassword = "${hashedPassword}"`,
    (error, rows) => {
      if (error)
        res.sendStatus(500);

      if (rows.length === 1) {
        const userId = rows[0]["id"];
        res.cookie("id", userId, {});
        res.status(200).send({ data: `${userId}` });
      }
      else {
        res.status(404).send();
      }
    }
  );
});

userRouter.get("/logout", (req, res) => {
  console.log(req.method, req.originalUrl);
  res.clearCookie("id");
  res.sendStatus(200);
})

userRouter.post("/star", (req, res) => {
  if (!req.cookies["id"]) res.send(400);

  const followerId = req.cookies["id"];
  const followingId = req.body["followingId"];

  console.log(`${req.method} ${req.originalUrl} ${followerId} ${followingId}`);

  connection.query(`INSERT INTO Stars VALUE(${followerId}, ${followingId})`, (error) => {
    if (error)
      res.status(500).send(error);

    connection.query(`UPDATE Users SET starCount = starCount + 1 WHERE id = ${followingId}`, (error) => {
      if (error)
        res.status(500).send(error);
      else
        res.sendStatus(200);
    });
  });
});

userRouter.get("/:id", (req, res) => {
  const myId: number = req.cookies["id"] ?? -1;
  const id: number = parseInt(req.params.id);
  let starred: boolean = false;

  console.log(req.method, req.originalUrl);

  if (id.toString() === "NaN")
    res.sendStatus(400);

  connection.query(
    `SELECT displayName, selfInformation, profileImage, starCount FROM Users WHERE id = ${id} AND isDeleted = 0`,
    (error, rows) => {
      if (rows.length === 1) {
        const displayName = rows[0]["displayName"];
        const selfInformation = rows[0]["selfInformation"];
        const profileImage = rows[0]["profileImage"];
        const starCount = rows[0]["startCount"];

        if (myId !== -1) {
          connection.query(`SELECT * FROM Stars WHERE followerId = ${myId} AND followingId = ${id}`, (error) => {
            if (error) {
              res.status(500).send(error);
            }
            else {
              starred = rows.length === 1;
            }
          });
        }
        res.send({ user: { displayName, selfInformation, profileImage, starCount, star: starred } });
      }
      else {
        res.sendStatus(404);
      }
    }
  );
});

userRouter.put("/update/:id", (req, res) => {
  const id: number = parseInt(req.params.id);
  const displayName: string = req.body["displayName"];
  let selfInformation: string = req.body["selfInformation"];

  console.log(req.method, req.originalUrl);

  if (selfInformation.length === 0) {
    connection.query(`UPDATE Users SET displayName = "${displayName}", selfInformation = NULL WHERE id = ${id}`);
  }
  else {
    connection.query(`UPDATE Users SET displayName = "${displayName}", selfInformation = "${selfInformation}" WHERE id = ${id}`);
  }

  res.sendStatus(200);
});

export default userRouter;
