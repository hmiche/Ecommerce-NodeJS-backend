

const User = require('../modeles/User')

const jwt = require('jsonwebtoken');



exports.singup = (req, res) => {
    


    const user = new User(req.body)

   
    user.save((err , user) => {


        if(err){
            return res.status(400).send(err)
        }

       
        res.send(user)
    })

}



exports.singin = (req, res) => {

    const {email , password} = req.body ;

  

    User.findOne({email} , (err , User) =>{

        if(err || !User){
            return res.status(400).json({
                error :'User not found with this email Please SingUp!'
            })
        }

        if(!User.authenticat(password)){

            return res.status(401).json({
                error :'Error Email and password dont match '
            })

        }else {

              const Token =  jwt.sign({_id:User._id,role:User.role} , process.env.JWT_SECRET)
              res.cookie('token',Token,{expire : new Date() + 800000})
              const{_id, name, email,role} = User
              return res.json({

                    Token,User :{_id, name, email,role}

              })

        }

    })


}


exports.singout = (req, res) => {

    res.clearCookie('token')

    return res.json({

        'MESSAGE' : "Usr Sing Out"

  })


}