import { CookieOptions, Router, Request, Response } from "express";
import sjcl from "sjcl";
import { connection } from "../connection.js";
import { v4 as uuidv4 } from "uuid";
import fileUpload from "express-fileupload";
import multer from "multer";
import fs from "fs";
import path from "path";

const userRouter: Router = Router();

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, done) {
      console.log("fucking destination!!!!!!!!");
      done(null, "uploads/");
    },
    filename(req, file, done) {
      console.log("fucking filename!!!!!!!!");
      const ext = path.extname(file.originalname);
      const fileName: string = uuidv4() + ext;
      console.log(fileName);
      done(null, uuidv4() + ext);
    }
  })
});

userRouter.post("/register", (req: Request, res: Response) => {
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

  console.log(req.method, req.originalUrl, `id = ${id}`);

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
  console.log(displayName, selfInformation);

  connection.query(
    `UPDATE Users SET displayName = "${displayName}", selfInformation = "${selfInformation}" WHERE id = ${id}`,
    (error) => {
      if (error)
        res.sendStatus(500);
      else
        res.sendStatus(200);
    }
  );
});

userRouter.put("/upload/:id", upload.single("file"), (req, res) => {
  console.log(req.method, req.originalUrl, req.file, req.body);
  res.sendStatus(200);
})

/*
userRouter.put("/upload/:id", (req: Request, res: Response) => {
  console.log(req.method, req.originalUrl, req.body, req.files);
  if (req.files) {
    const id = parseInt(req.params.id);

    const file = req.files.file as fileUpload.UploadedFile;
    const ext = file.name.slice(file.name.lastIndexOf("."));
    const uuid = uuidv4();
    const fileName = `./uploads/${uuid}${ext}`;

    console.log(req.method, req.originalUrl, fileName);

    file.mv(fileName, (err) => {
      if (err) {
        res.status(500).send(err);
      }
      else {
        connection.query(`UPDATE Users SET profileImage = "${uuid}${ext}" WHERE id = ${id}`, (error) => {
          if (error)
            res.status(500).send(error);
          else
            res.sendStatus(200);
        });
      }
    });
  }
  else {
    res.sendStatus(400);
  }
});
*/

export default userRouter;
