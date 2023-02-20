const  express = require('express')
const {requiresingin, isAuth,isAdmin}=require('../middlewares/auth')
const router = express.Router();
const {userById}= require('../middlewares/user')
const {createCategory,
    categoryById,
    showCategory,
    updateCategory,
    deleteCategory,
    allCategories
                    } = require('../Controllers/CategorieController')


router.post('/create/:userId',[requiresingin,isAuth,isAdmin],createCategory)

router.get('/:categoryId',showCategory)

router.get('/',allCategories)

router.put('/:categoryId/:userId',[requiresingin,isAuth,isAdmin],updateCategory)


router.delete('/:categoryId/:userId',[requiresingin,isAuth,isAdmin],deleteCategory)



router.param('userId',userById)
router.param('categoryId',categoryById)

module.exports = router ;