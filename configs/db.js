const mysql = require("mysql")
const { promisify } = require("util")
const usersTable = require("../models/users")
const chargesTable = require("../models/charges")
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: "root",
    password: process.env.DB_ROOT_PASSWORD,
    database: process.env.DB,
})

connection.connect(function(error) {
    if(error) {
        console.log("Some error has happend trying to connect to MySql DB: "+error.stack)
        return;
    }
    console.log("Connected as id: "+connection.threadId)

    //TODO: Está comentado mientras se esté en etapa de desarrollo, para evitar excesos de logs en la consola.
    //Creating tables
    //users
    connection.query(usersTable, (error, result) => {
        if(error) throw error;
        console.log("Users Table created")
    })

    //charges
     connection.query(chargesTable, (error, result) => {
        if(error) throw error;
        console.log("Charges Table created")
    })

    //others
})

//Callback to async await
connection.query = promisify(connection.query)

module.exports = connection
