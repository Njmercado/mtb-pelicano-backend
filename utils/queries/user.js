const mysqlDB = require('../../configs/db')

module.exports = class User {

    constructor() {
        console.log("hi from user ")
    }

    async verifyIfUserExist(user_email){
        let query = `select email from user where email = ?;`
        const inserts = [user_email]
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
