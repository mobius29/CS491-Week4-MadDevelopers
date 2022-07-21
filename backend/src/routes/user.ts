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

  console.log(`${req.method} ${req.originalUrl} ${userName} ${hashedPassword} ${displayName}`);

  connection.query(
    `INSERT INTO Users VALUE(NULL, "${userName}", "${hashedPassword}", "${displayName}", DEFAULT, DEFAULT, DEFAULT, DEFAULT, DEFAULT, DEFAULT)`,
    (error) => {
      if (error) res.status(400).send(error);
      else res.status(200).send();
    }
  );
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
      if (error) res.sendStatus(500);
      if (rows.length === 1) {
        console.log(rows[0]["id"]);
        res.status(200).send({ data: `${rows[0]["id"]}` });
      } else res.status(404).send();
    }
  );
});

export default userRouter;
