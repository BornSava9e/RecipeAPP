const express = require('express')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const userModel = require('../models/Users')
const router = express.Router()

router.post('/register', async(req,res) =>{
    try{   
    const {username, password} = req.body
    const user = await userModel.findOne({username : username})

    if(user){
        return res.json({message : "User already exists!"})
    }else{

    const hashedPassword = await bcrypt.hash(password, 10)

    const newUser = await userModel.create({username : username, password : hashedPassword})

    res.json({message : "user created sucessfully"});
    }
    
    }catch(err){

        res.send(err)
    }
});

router.post('/login', async(req,res) =>{
    try{  
    const {username , password} = req.body
    const user = await userModel.findOne({username : username})

    if(!user){
        return res.json({ message : "User doesn't exist!" , status : false})
    }else{
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if(!isPasswordValid){
        return res.json({message : "Username or password is incorrect" , status : false});
    }

    const token = jwt.sign({id : user._id}, "Recipes");
    res.json({token : token ,userID : user._id , status : true})
    }
    }catch(err){
        res.send(err)
    }
})

module.exports.userRouter =router


