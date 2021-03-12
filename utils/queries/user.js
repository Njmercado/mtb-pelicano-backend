const { NetworkAuthenticationRequire } = require('http-errors')
const mysqlDB = require('../../configs/db')

module.exports = class User {

    constructor() {
        console.log("hi from user ")
    }

    async verify(req, res, next) {
        const {email, password} = req.body
        let query = `select * from user where email = ? and password = ?;`
        const inserts = [email, password]
        query = mysqlDB.format(query, inserts)
        const response = await mysqlDB.query(query)
        if(response[0]) { 
            req.body = {
                email: response[0].email,
                document_number: response[0].document_number,
                password: response[0].password,
                name: response[0].name,
                last_name: response[0].last_name,
                phone: response[0].phone,
                role: response[0].role,
                charge_fulfilled: response[0].charge_fulfilled,
            } 
            next()
        }
        else res.status(400).send({
            message: "Invalid credentials",
            error: true,
            data: null
        })
        // return response
    }

    async verifyIfUserExist(email){
        let query = `select email from user where email = ?;`
        const inserts = [email]
        query = mysqlDB.format(query, inserts)
        const response = await mysqlDB.query(query)
        return response
    }

    createUser(data) {
        const query = `insert into user set ?`
        const response = mysqlDB.query(query, data, function(error, response) {
            if(error) console.error(error)
            console.log(response)
        })
        return response
    }
}
