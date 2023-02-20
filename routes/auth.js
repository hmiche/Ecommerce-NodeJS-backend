const  express = require('express')
const {singup,singin,singout} = require('../Controllers/authController')
const {userSingUpValidator} = require('../middlewares/userValidator')
const {requiresingin,} = require('../middlewares/auth')
const router = express()


router.post('/singup',userSingUpValidator,singup)
router.post('/singin',singin)
router.get('/singout',singout)
router.get('/hello',requiresingin,(req,res) => {

    res.send('Hello there')


})
module.exports = router ;

