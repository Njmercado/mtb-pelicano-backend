const mysqlDB = require('../../configs/db')

module.exports = class Charge {

    constructor() {
        console.log("hi from charge")
    }

    deleteCharge(chargeId, userEmail) {
        const query = `delete from charge where charge_id=? and user_email=?`
        const response = mysqlDB.query(query, [chargeId, userEmail])
        console.log(response)
        return true
    }

    createCharge(data) {
        const query = `insert into charge set ?`
        const response = mysqlDB.query(query, data, function(error, response) {
            if(error) console.error(error)
            console.log(response)
        })
        return response
    }
}
