const express = require('express')
const userRouter = express.Router()
const { check } = require('express-validator')
const UserModel = require('../models').user
const validationMiddleware = require('../middleware/ValidationMiddleware')
const { 
    index, 
    detailedById, 
    detailedByEmail, 
    update,
    destroy,
    multiDestroy
} 
    = require('../controllers/UserController')


userRouter.get('/', index)
userRouter.get('/:id', detailedById)
userRouter.get('/email/:email', detailedByEmail)
userRouter.put('/:id/update', check("name").isLength({ min: 1 }).withMessage('name wajib diisi'),
    check("email").isEmail().withMessage('gunakan email').custom((value, {req}) => {
        return UserModel.findOne({ where: { email: value } }).then((user) => {
            if (user) {
                if(req.params.id != user.id) {
                    return Promise.reject('email sudah digunakan')
                }
            }
        })
    }),
    validationMiddleware,
    update
)
userRouter.delete('/:id/delete', destroy)
userRouter.delete('/delete', multiDestroy)


module.exports = { userRouter }