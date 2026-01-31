import mysql from "mysql2"

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "12345",
    database: "film_db"
})

connection.connect((err) => {
    if(err) {
        console.log(err);
        throw err;
    }
    console.log("Connected to mySQL")
}) 

export default connection