const CategoryScheme = require('../Modeles/categorie')

exports.createCategory = (req,res) =>{


    const category = new CategoryScheme(req.body)
    category.save((err , date) =>{

        if(err){
            return res.status(404).json({

                'error':'Bad request !'
            })
        }
        res.json({

            'category': category
        })
    })
}


exports.categoryById = (req,res,next,id) =>{

    
    CategoryScheme.findById(id).exec((err,category)=>{

        if(err){

            res.status(400).json({


                error : 'category not Found'

            })
        }


        console.log(category)
        req.category = category 
        console.log("============")
        console.log(req.category)
       
        next()


    })
}


exports.showCategory = (req,res)=>{
    
  

    res.status(200).json({


        category :req.category


    })


}


exports.updateCategory = (req,res)=> {


    let category = req.category
    console.log(category.name)

    category.name = req.body.name

    category.save((err,category)=>{


            if(err){


               return   res.status(400).json({



                    Error : "could not update ressource"
                })
            }

            res.json({
                category ,
                message :"Category Updated"
            })

    })



}


exports.deleteCategory = (req,res)=> {


    let category = req.category

    
    console.log(category)

    category.remove((err,category)=>{


            if(err){


               return   res.status(404).json({



                    Error : "category not found"
                })
            }

            res.status(204).json({
               
                message :"Category deleted"
            })

    })



}

exports.allCategories = (req,res)=> {


    CategoryScheme.find().exec((err,categories)=>{


        if(err){


           return  res.status(400).json({


                    Error : 'there is an error'    


            })

        }
        return res.status(200).json({

            data : categories

        })


    })

}