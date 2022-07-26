import { Router } from "express";
import fs from "fs";

const curlSource = fs.readFileSync("typegame/curl.c", "utf8");
const flaskSource = fs.readFileSync("typegame/flask.py", "utf8");
const springSource = fs.readFileSync("typegame/spring.java", "utf8");
const dotnetGCSource = fs.readFileSync("typegame/dotnetgc.cpp", "utf8");

const curlLines: string[] = curlSource.split("\n");
const flaskLines: string[] = flaskSource.split("\n");
const springLines: string[] = springSource.split("\n");
const dotnetGCLines: string[] = dotnetGCSource.split("\n");

const linesMap = new Map<string, string[]>([
  ["curl", curlLines],
  ["spring", springLines],
  ["flask", flaskLines],
  ["dotnetgc", dotnetGCLines],
]);

const typegameRouter = Router();

typegameRouter.get("/:src", (req, res) => {
  const src: string = req.params.src;

  const allLines: string[] = linesMap.get(src) as string[];
  const len = allLines.length;
  const start = Math.floor(Math.random() * (len - 100));
  const lines = allLines.slice(start, start + 50);
  res.send({ lines });
});

export default typegameRouter;
