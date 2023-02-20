const  express = require('express')
const {requiresingin, isAuth,isAdmin}=require('../middlewares/auth')
const router = express.Router();
const {userById}= require('../middlewares/user')
const {createproduct,
      productById,
      showProduct,
      deleteProduct,
      updateProduct,
      allProducts} = require('../Controllers/productController')


router.get('/:productId',showProduct)

router.get('/',allProducts)

router.delete('/delete/:productId/:userId',[requiresingin,isAuth,isAdmin],deleteProduct)

router.put('/update/:productId/:userId',[requiresingin,isAuth,isAdmin],updateProduct)

router.post('/create/:userId',[requiresingin,isAuth,isAdmin],createproduct)

router.param('userId',userById)

router.param('productId',productById)

module.exports = router ;