import fs from "fs";

export default function handleError(err, req, res, next) {
const time = new Date();
const environment = process.env.environment
fs.writeFileSync("logs/log.txt", `${time}: ${err}`);

  res.status(500);
  return res.json({
    error: environment === "development" ? err.toString(): "SERVER ERROR",
    message: "Errore interno del server",
  });
}

