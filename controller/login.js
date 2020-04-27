const router = require('express').Router();
const Joi = require('@hapi/joi');
const User = require('../model/user');
const jwt = require('jsonwebtoken');


router.post('/', async (req, res) => {
    console.log("Inside login");
    var user = req.body;
    console.log(user);
    const schema = Joi.object({
        email: Joi.string().required().email(),
        password: Joi.string().min(6).max(1024).required()
    });
    var check = schema.validate(user);
    //If error in validation
    if(check.error){
        res.status(400).send("Enter valid details");
    }
    
    else{
        console.log(user.email);
        let currentUser = await User.findOne({email : user.email});
        if(currentUser == null){
            res.status(400).send("User not found");
        }
        else if(user.password == currentUser.password){
            jwt.sign({_id:currentUser._id},"secretkey",(err,token)=>{
                console.log(token);
                res.header("auth-token", token).send({"token" : token});
            })

            
        }
        else{
            res.send("Login unsuccessful");
        }

        
    }

});

module.exports = router;