const express = require('express');
const app = express();
const mongoose = require('mongoose');
const expressValidator = require('express-validator');
const cookieParser = require('cookie-parser');



//import Routes
const  authRoutes = require('./routes/auth')
const  userRoutes = require('./routes/users')
const  categoryroute = require('./routes/categorie')
const  productroute = require('./routes/products')



//App Config
require('dotenv').config();

//routes midllerwer 
app.use(express.json())
app.use(expressValidator())


////routes  
app.use(cookieParser())
app.use('/api/auth',authRoutes)
app.use('/api/user',userRoutes)
app.use('/api/category',categoryroute)
app.use('/api/product',productroute)



//Database Config
const database = process.env.DATABASE
mongoose.connect(database , {

    useNewUrlParser : true ,
    
    useUnifiedTopology : true





})
    .then(()=> console.log('Databse Connected ................'))
    .catch(err => console.error(`Databse Not Connected ................. ${err}`))







const port = process.env.PORT
app.listen(port, ()=>console.log(`apps is running on port : ${port}`))