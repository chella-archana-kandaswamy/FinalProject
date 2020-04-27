const router = require('express').Router();
const Joi = require('@hapi/joi');
const User = require('../model/user');

router.post('/', async (req, res) => {
    console.log("Inside register");
    var user = req.body;
    const schema = Joi.object({
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        password: Joi.string().min(6).max(1024).required()
    });
    var check = schema.validate(user);
    console.log("Check ",check);
    //If error in validation
    if(check.error){
        res.status(400).send("Enter valid details");
    }
    //No error in validation
    else{
        //check if email exists already
        var isExists = await User.findOne({email : user.email});
        if(isExists == null){
            var newUser = new User({
                name : user.name,
                email : user.email,
                password : user.password
            });
            var isSaved = await newUser.save();
            if(isSaved){
                res.send("User is registered successfully");
            }
        }else{
            res.status(400).send("Email already exists");
        }
    }

});

module.exports = router;