const jwt = require('jsonwebtoken')
const secretKey = process.env.SECRET_KEY

module.exports = class Token {
    constructor(){}

    create(data){
        const oneDay = 24*60*60
        return jwt.sign(data, secretKey, {expiresIn: `${oneDay}s`})
    }

    async verifyAdmin(req, res, next) {
        const token = req.body.token
        if(token === null) res.status(400).send({
            message: "Given token is empty",
            error: true,
            data: null,
        })

        jwt.verify(token, secretKey, (error, user) => {
            console.error("Error verifying token: ", error)
            if(error) {
                res.status(403).send({ message: error, error: true, data: null })
                return;
            }
            if(user.role !== 'admin') {
                res.status(400).send({
                    message: "You do not have access to this area",
                    error: true,
                    data: null
                })
                return
            }
            req.user = user
            next()
        })
    }

    async verify(req, res, next) {
        const token = req.body.token
        if(token === null) res.status(400).send({
            message: "Given token is empty",
            error: true,
            data: null,
        })

        jwt.verify(token, secretKey, (error, user) => {
            console.error("Error verifying token: ", error)
            if(error) {
                res.status(403).send({ message: error, error: true, data: null })
                return;
            }
            req.user = user
            next()
        })
    }
}