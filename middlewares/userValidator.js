exports.userSingUpValidator = (req , res, next) => {


            req.check('name','name is required !').notEmpty()
        
            req.check('email','is not an Email !').isEmail()
            req.check('password')
                .notEmpty()
                .isLength({min : 6 , max : 10})
                .withMessage('Password must be between 6 and 10')


const errors = req.validationErrors()
    if(errors){


        return res.status(404).json(errors)
    }

    next()



}