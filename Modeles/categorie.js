const mongoose = require('mongoose')
const { models } = require('mongoose')


const CategoryScheme = new mongoose.Schema({

        name : {

             type : String ,
             require : true ,
             maxLength : 32 ,   
             trim : true ,   
        }

},{timestamps:true});

module.exports = mongoose.model('CategoryScheme',CategoryScheme) ;