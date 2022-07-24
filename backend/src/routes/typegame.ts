import { Router } from "express";
import fs from "fs";

const cppSource = fs.readFileSync("typegame/a.cpp", "utf8");
const pythonSource = fs.readFileSync("typegame/a.py", "utf8");
const javaSource = fs.readFileSync("typegame/a.java", "utf8");
const cSource = fs.readFileSync("typegame/a.c", "utf8");

const cppLines: string[] = cppSource.split("\n");
const pythonLines: string[] = pythonSource.split("\n");
const javaLines: string[] = javaSource.split("\n");
const cLines: string[] = cSource.split("\n");

const linesMap = new Map<string, string[]>([
    ["cpp", cppLines],
    ["python", pythonLines],
    ["java", javaLines],
    ["c", cLines],
]);

const typegameRouter = Router();

typegameRouter.get("/:lang", (req, res) => {
  const lang: string = req.params.lang;

  const allLines: string[] = linesMap.get(lang) as string[];
  const len = allLines.length;
  const start = Math.floor(Math.random() * (len - 100));
  const lines = allLines.slice(start, start + 50);
  res.send( { lines });
});

export default typegameRouter;
