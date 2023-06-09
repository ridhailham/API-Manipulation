const { validationResult } = require('express-validator')


const validationMiddleware = (req, res, next) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()) {
        res.status(422).json({
            errors: errors.mapped()
        })
    }

    next()
}

module.exports = validationMiddleware