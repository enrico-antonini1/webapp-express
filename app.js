import express from "express"
// import connection from "./database/dbConnection.js" 
import handleError from "./middlewares/handleError.js";
import filmRouter from "./routers/film.js"
import routeNotFound from "./middlewares/routeNotFound.js";

const app = express();
const port = 3000;

app.use(express.static("public"));

app.use("/api/film", filmRouter)

app.get("/", (req, res) => {
    res.send("Rotta di prova")
})

app.use(routeNotFound)

app.use(handleError)

app.listen(port, () => {
    console.log(`Server in ascolto alla porta ${port}`)
})