const express = require('express');
const router = express.Router();
const User = require('../utils/queries/user')
const user = new User()
const Token = require('../middlewares/token');
const token = new Token()

router.get('/', user.verify, (req, res, next) => {
    try{
        const {email, password} = req.body
        const newToken = token.create({email, password})
        res.status(200).send({
            message: "token created",
            error: false,
            data: {
                token: newToken
            }
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
