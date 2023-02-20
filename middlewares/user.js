
const User = require('../modeles/User')



exports.userById = (req,res,next,id) => {




        User.findById(id).exec((err,user) => {

            if(err || !user){


                return res.status(404).json({
                    'Error': err
                })
             
            }
            req.profile = user    
            next();


        })


}