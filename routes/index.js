const express = require('express')
const router = express.Router()
const { register } = require('../controllers/AuthController')
const { check } = require('express-validator')
const UserModel = require('../models').user
const validationMiddleware = require('../middleware/ValidationMiddleware')
const { userRouter } = require('./userRoute')


router.get('/', (req, res) => {
    res.send('ok')
})

router.post(
    '/register',
    check("name").isLength({ min: 1 }).withMessage('name wajib diisi'),
    check("email").custom((value) => {
        return UserModel.findOne({ where: { email: value } }).then((user) => {
            if (user) {
                return Promise.reject('email sudah digunakan')
            }
        })
    }),
    check("password")
        .isLength({ min: 8 })
        .withMessage('password wajib minimal 8 karakter'),
    check('passwordConfirmation').custom((value, { req }) => {
        if (value !== req.body.password) {
            return Promise.reject('konfirmasi password tidak sesuai')
        }
        return true
    }),
    validationMiddleware,
    register
)

router.use('/user', userRouter)

module.exports = router