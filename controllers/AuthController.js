const bcrypt = require('bcrypt')
const UserModel = require('../models').user
const { validationResult } = require('express-validator')

const register = async (req, res) => {

    const payload = req.body
    payload.password = await bcrypt.hashSync(payload.password, 10)

    try {
        await UserModel.create(payload)
        return res.status(201).json({
            status: 'success',
            masssage: 'register berhasil',
            data: payload 
        })
    } catch (err) {
        console.log(err);
    }

    res.send(payload)
}

module.exports = { register }