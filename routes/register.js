const express = require('express');
const router = express.Router();
const { check, validatorResult } = require('express-validator')
const User = require("../utils/queries/user")
const user = new User()

router
    .post('/', 
    [

    ],
    async (req, res, next) => {
    try{

        const {document_number, email, password, name, last_name, role, phone} = req.body
        const response = await user.verifyIfUserExist(email)
        if(response[0].email) {
            await user.createUser({email, password, name, last_name, role, document_number, phone})
            await res.status(200).json({ message: 'User created successfully', error: false, data: null })
        }
        res.status(200).json({ message: 'This user already exist', error: true, data: null })
    } catch(error) {
        res.status(400).json({ message: `Some error has happend: ${error}`, error: false, data: null })
    }
});

module.exports = router;
