const express = require('express');
const router = express.Router()

const{ 
    categoryById,
    create, 
    read, 
    remove, 
    update, 
    list

       } = require( "../controllers/category")
const { requireSignin,
        isAuth,
        isAdmin } = require('../controllers/auth');    
       
const{ userById } = require( "../controllers/user");


//GET single categry
router.get('/category/:categoryId', read)
//DELETE
router.delete("/category/:categoryId/:userId",
 requireSignin,
    isAuth,
    isAdmin, 
    remove);
//UPDATE
router.put("/category/:categoryId/:userId",
    requireSignin,
    isAuth,
    isAdmin, 
    update);
//CREATE CATEGORY
router.post("/category/create/:userId",
 requireSignin,
    isAuth,
    isAdmin, 
    create);

//GET ALL CATEGORIES
router.get('/categories', list)



router.param('userId', userById)
router.param('categoryId', categoryById)

module.exports = router;