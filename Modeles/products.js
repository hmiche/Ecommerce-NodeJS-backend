const mongoose = require('mongoose')
const { models } = require('mongoose')
const {ObjectId} =  mongoose.Schema

const ProductScheme = new mongoose.Schema({

        name : {

             type : String ,
             require : true ,
             maxLength : 32 ,   
             trim : true ,   
        } ,
        description : {

            type : String ,
            require : true ,
            maxLength : 2000 ,   
           
       },

       price : {

        type : Number ,
        require : true ,
       
   },
   quantity : {

    type : Number ,
   } ,

   photo : {
    data : Buffer ,
    contentType : String,
    
   },


   category : {

    type : ObjectId,
    ref : 'Category' ,
    require : 'true' ,
   
   },
   shipping : {
        require : false ,
        type : Boolean ,
        default : false ,


   }

},{timestamps:true});

module.exports = mongoose.model('Product',ProductScheme) ;