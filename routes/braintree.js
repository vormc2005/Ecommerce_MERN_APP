const express = require('express');
const router = express.Router()


const{ userById } = require( "../controllers/user");

const {generateToken} = require('../controllers/braintree')

const { requireSignin, isAuth } = require('../controllers/auth');



router.get('/braintree/getToken/:userId', requireSignin, isAuth, generateToken)



router.param('userId', userById)

module.exports=router