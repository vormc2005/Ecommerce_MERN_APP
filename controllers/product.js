const Product = require('../models/product')
const formidable = require('formidable')
const _ = require('lodash')
const fs =require('fs')
const { errorHandler } = require('../helpers/dbErrorHandler')



exports.productById = (req, res, next, id)=>{
    Product.findById(id).exec((err, product)=>{
        if(err || !product){
            return res.status(400).json({
                error:"Product not found"
            })
        }
        req.product = product
        next()
    })
}


exports.read=(req, res)=>{
    req.product.photo = undefined
    return res.json(req.product)
}


exports.create = (req, res)=>{
    //Because we have image, we need to use form data and formidable
    let form = new formidable.IncomingForm()
    form.keepExtensions=true
    form.parse(req, (err, fields, files)=>{
        if(err){
            return res.status(400).json({
                error:"Image could not be uploaded"
            })
        }


        //check for all fields

        const{name, description, price, category, quantity, shipping} = fields
        if(     
                !name ||
                !description ||
                !price ||
                !category ||
                !quantity ||
                !shipping){
            return res.status(400).json({
                error:"All fields are required!"
            })
        }

        let product = new Product(fields)
        if(files.photo){                     //photo is coming form client side
            // console.log(files.photo)         //1kb =1000 files.photo.size
            if(files.photo.size > 1000000){
                return res.status(400).json({
                    error:"Image is too large. Only images less than 1MB are accepted"
                })
            }
            product.photo.data = fs.readFileSync(files.photo.path)
            product.photo.contentType = files.photo.type
        }
        product.save((err, result)=>{
            if(err){
                return res.status(400).json({
                error:errorHandler(error)
                })
            }
            res.json(result)
        })
    })
}


