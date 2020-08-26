const User = require('../models/user')
//get id middleware
exports.userById = (req, res, next, id)=>{
    User.findById(id).exec((err, user)=>{
            if(err || !user){
                return res.status(400).json({
                    error: 'User not found'
                })
            }
            req.profile = user
            next()
    })
}
//return one user to view profile
exports.read =(req, res)=>{
    req.profile.hashed_password = undefined;
    req.profile.salt = undefined
    return res.json(req.profile)
}
//Update user
exports.update = (req, res)=>{
    User.findOneAndUpdate({_id: req.profile._id}, {$set: req.body}, {new: true}, (err, user)=>{
        if(err){
            return res.status(400),json({
                error: 'You are not authorized to perorm this action'
            })
        }
        req.profile.hashed_password = undefined;
        req.profile.salt = undefined
        res.json(user);
    })
}