const mongoose = require('mongoose')
const { v4: uuidv4 } = require('uuid');
const crypto = require('crypto')
const { models } = require('mongoose')

const userSchema =new  mongoose.Schema({

        name : {
            type : String, 
            trim : true ,
            maxlenght : 50 ,
            required : true
        },
        email : {

                type : String ,
                trim : true ,
                maxlenght : 50 ,
                required : true,
                unique : true
        },

        hashed_password : {

            type : String ,
            required : true    


        },

        salt : {

                type : String 

        },
        about : {

                type : String ,
               
        },
        role : {

            type :  Number ,
            default : 0
        } , 
        history : {
                type : Array ,
                default : []


        }


},{timestmaps : true })

userSchema.virtual('password')
.set(function(password){

        this._password = password ;
        this.salt = uuidv4();
        this.hashed_password = this.CryptPassword(password)


})

.get( function(){

        return this._password;


})
userSchema.methods = {

        authenticat : function(plainText){

                console.log(plainText)

                return this.CryptPassword(plainText) === this.hashed_password


        },

        CryptPassword : function(password) {

                if(!password) return "" ;

                try {

                return crypto 
                .createHmac('sha1',this.salt)
                .update(password)
                .digest('hex');


                }catch (error){

                        return ''
                }
        }

}

module.exports = mongoose.model('User',userSchema);