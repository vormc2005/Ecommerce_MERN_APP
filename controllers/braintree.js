const User = require('../models/user')
const braintree =require('braintree')
require('dotenv').config()

// BRAINTREE_MERCHANT_ID=8t9hhxkg5w32dmhk
// BRAINTREE_PUBLIC_KEY=qrb88frzhvkg3w8r
// BRAINTREE_PRIVATE_KEY=114d86fb8c9445c650e6762d043a329a


const gateway = braintree.connect({
    environment: braintree.Environment.Sandbox,
    merchantId: process.env.BRAINTREE_MERCHANT_ID,
    publicKey: process.env.BRAINTREE_PUBLIC_KEY,
    privateKey: process.env.BRAINTREE_PRIVATE_KEY,

})

exports.generateToken =(req, res)=>{
    gateway.clientToken.generate({}, function(err, response){
        if(err){
            res.status(500).send(err)

        }else{
            res.send(response)
        }
    })
}

exports.processPayment = (req, res)=>{
    let nonceFromTheClient = req.body.paymentMethodNonce
    let amountFromTheClient =req.body.amount
    //ccharge
    let newTransaction = gateway.transaction.sale(
        {
        amount: amountFromTheClient,
        paymentMethodNonce: nonceFromTheClient,
        options:{
            submitForSettlement:true
            }
            
        }, (error, result)=>{
            if (error){
                res.status(500).json(error);
            }else{
                res.json(result)
            }        

        }
    )
}
