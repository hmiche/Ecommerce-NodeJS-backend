const Product = require('../Modeles/products');

const formidable = require('formidable');
const _ = require('lodash');
const fs = require('fs');
const Joi =  require('joi');



exports.createproduct = (req,res) =>{


    let form = new formidable.IncomingForm();

    form.keepExtensions = true ;
    form.parse(req ,(err,fields,files)=>{

      

        if(err){

            return res.status(400).json({

                error : 'image could not Uploded'
            })
        }

        let product = new Product(fields)

        console.log(fields)
        if(files.photo){
            

            if(files.photo.size > Math.pow(10,6)){

                return res.status(400).json({

                    Error : 'Image should be less than 1mb '
                })
            }
                
            product.photo.data = fs.readFileSync(files.photo.filepath)
            product.photo.contentType = files.photo.type
        }



        const schema = Joi.object({

            name : Joi.string().required(),
            description : Joi.string().required(),
            price : Joi.required(),
            quantity : Joi.required(),
            category : Joi.required(),

        })

        const {error} = schema.validate(fields) ;
        if(error){

            return res.status(400).json({

                error : error.details[0].message
            })
        }
        product.save((err,product) =>{
            if(err){

            res.status(400).json({

                error : 'product not persist'
            })

            }else {

                res.send(product)

            }
        })
    })



}


exports.productById = (req,res,next,id) =>{

    
    Product.findById(id).exec((err,product)=>{

        if(err){

            res.status(400).json({


                error : 'product not Found'

            })
        }


        console.log(product)
        req.product = product 
        console.log("============")
        console.log(req.product)
       
        next()


    })


}
exports.showProduct = (req,res)=>{
    
    req.product.photo = undefined

    res.json({


        products :req.product


    })


}

exports.deleteProduct = (req,res)=>{



    let product = req.product


   try {


  
    product.remove((err,product) => {


            if(err){


                console.log("Errour")
                return res.status(400).json({


                    Error : 'Could not Delete the product'
                })

            return res.status(204).json({

             
            })


            }



    })
} catch (error)  {

    return res.status(400).json({


        Error : 'Product Not Found'
    })
}



}


exports.updateProduct = (req,res) =>{


    let form = new formidable.IncomingForm();

    form.keepExtensions = true ;
    form.parse(req ,(err,fields,files)=>{

      

        if(err){

            return res.status(400).json({

                error : 'image could not Uploded'
            })
        }

        let product = req.product ;


        console.log(fields)

        product = _.extend(product,fields)
        if(files.photo){
            

            if(files.photo.size > Math.pow(10,6)){

                return res.status(400).json({

                    Error : 'Image should be less than 1mb '
                })
            }
                
            product.photo.data = fs.readFileSync(files.photo.filepath)
            product.photo.contentType = files.photo.type
        }



        const schema = Joi.object({

            name : Joi.string().required(),
            description : Joi.string().required(),
            price : Joi.required(),
            quantity : Joi.required(),
            category : Joi.required(),

        })

        const {error} = schema.validate(fields) ;
        if(error){

            return res.status(400).json({

                error : error.details[0].message
            })
        }
        product.save((err,product) =>{
            if(err){

            res.status(400).json({

                error : 'product not Updated'
            })

            }else {

                res.send(product)

            }
        })
    })



}



exports.allProducts = (req,res) =>{


    let sortBy = req.query.sortBy ? req.query.sortBy : '_id' ;
    let order = req.query.order ? req.query.order : 'asc' ;
    let limit = req.query.limit ? req.query.limit : 6 ;


    Product.find()
                .select("-photo")
                .populate('CategoryScheme')
                .sort([[sortBy,order]])
                .limit(limit)
                .exec((err,product) =>{

                        if(err){


                            return res.status(404).json({

                                    error : 'Products Not found  '+err


                            })
                        }

                        res.status(200).json({

                            product
                        })
                })









}