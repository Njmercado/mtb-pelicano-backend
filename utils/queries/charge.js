const mysqlDB = require('../../configs/db')

module.exports = class Charge {

    constructor() {
        console.log("hi from charge")
    }

    delete(charge_id, email) {
        const query = `delete from charge where charge_id=? and email=?;`
        const response = mysqlDB.query(query, [charge_id, email], function(error, response) {
            if(error) console.error("Error deleting charge: ", error)
            console.log("No error deleting charge: ", response)
        })
        return response
    }

    create(data) {
        const query = `insert into charge set ?`
        const response = mysqlDB.query(query, data, function(error, response) {
            if(error) console.error(error)
            console.log(response)
        })
        return response
    }

    async getAllCharges(email) {
        const query = `select * from charge where email = ?`
        const response = await mysqlDB.query(query, email)
        return response
    }
}
