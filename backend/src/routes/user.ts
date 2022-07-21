import { Router } from "express";
import sjcl from "sjcl";
import { connection } from "../connection.js";

const userRouter: Router = Router();

userRouter.post("/register", (req, res) => {
  const userName: string = req.body["userName"];
  const password: string = req.body["password"];
  const passwordSHA = sjcl.hash.sha256.hash(password);
  const hashedPassword = sjcl.codec.hex.fromBits(passwordSHA);
  const displayName = req.body["displayName"];

  connection.query(
    `INSERT INTO Users VALUE(NULL, "${userName}", "${hashedPassword}", "${displayName}", DEFAULT, DEFAULT, DEFAULT, DEFAULT, DEFAULT, DEFAULT)`,
    (error) => {
      if (error) res.status(400).send(error);
      else res.sendStatus(200);
    }
  );
});

userRouter.post("/login", (req, res) => {
  const userName: string = req.body["userName"];
  const password: string = req.body["password"];
  const passwordSHA = sjcl.hash.sha256.hash(password);
  const hashedPassword = sjcl.codec.hex.fromBits(passwordSHA);

  connection.query(
    `SELECT id FROM Users WHERE userName = "${userName}" AND hashedPassword = "${hashedPassword}"`,
    (error, rows) => {
      if (error) res.sendStatus(500);
      if (rows.length === 1) res.sendStatus(200);
      else res.sendStatus(404);
    }
  );
});

export default userRouter;
