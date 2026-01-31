import express from "express"
import connection from "./database/dbConnection.js";

const app = express();
const port = 3000;

app.use(express.static("public"));

app.listen(port, () => {
    console.log(`Server in ascolto alla porta ${port}`)
})