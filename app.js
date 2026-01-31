import express from "express"
// import connection from "./database/dbConnection.js" 
import handleError from "./middlewares/handleError.js";

const app = express();
const port = 3000;

app.use(express.static("public"));

app.get("/", (req, es) => {
    res.send("Rotta di prova")
})

app.use(handleError)

app.listen(port, () => {
    console.log(`Server in ascolto alla porta ${port}`)
})