const  express = require('express')
const {getOneUser}  = require('../Controllers/userControleer')
const {userById}= require('../middlewares/user')
const {requiresingin, isAuth,isAdmin}=require('../middlewares/auth')

const router = express.Router();

router.get('/profile/:userId',requiresingin,isAuth,isAdmin,getOneUser)
router.param('userId',userById)

module.exports =  router ;