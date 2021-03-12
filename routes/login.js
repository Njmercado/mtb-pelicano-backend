const express = require('express');
const router = express.Router();
const Charge = require('../utils/queries/charge')
const charge = new Charge()
const User = require('../utils/queries/user')
const user = new User()
const Token = require('../middlewares/token');
const token = new Token()

router.get('/', user.verify, async (req, res, next) => {
    try{
        const newToken = token.create(req.body)
        charge.getAllCharges(req.body.email).then((data) => {
            console.log("data after much",data)
            res.status(200).send({
                message: "token created",
                error: false,
                data: {
                    token: newToken,
                    charges: data 
                }
            })
        })
        
    }catch(error) {
        res.status(500).send({
            message: `Some error has happend: ${error}`,
            error: true,
            data: null
        })
    }
});

module.exports = router;
