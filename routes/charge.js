const express = require('express');
const router = express.Router();
const { check, validatorResult } = require('express-validator')
const Token = require("../middlewares/token")
const token = new Token()
const Charge = require('../utils/queries/charge')
const charge = new Charge()
const User = require("../utils/queries/user")
const user = new User()

router
    .post('/', 
    token.verify,
    async (req, res, next) => {
        try{
            const { email, charge_type, description, charge_receipt } = req.body
            const response = charge.create({email, charge_type, description, charge_receipt})
            console.log(response)
            res.status(200).send({
                message: "Charge created correctly",
                error: false,
                data: null,
            })
        } catch(error) {
            res.status(400).json({ message: `Some error has happend: ${error}`, error: false, data: null })
        }
    }
);

router.
    delete(
        '/', 
        token.verifyAdmin,
        (req, res, next) => {
            try{
                const {charge_id} = req.body
                const response = charge.delete(charge_id, req.user.email)
                res.status(200).send({
                    message: "Charge deleted correctly",
                    error: false,
                    data: null,
                })
            } catch(error) {
                res.status(400).json({ message: `Some error has happend: ${error}`, error: false, data: null })
            }
        }
    )

module.exports = router;
