const express = require("express");

const bcrypt=require("bcryptjs");

const jwt=require("jsonwebtoken");

const authconfig=require("../config/auth.json");

const UserModel=require("../Models/User");

const generateToken = (user ={})=>{
    return  jwt.sign({
        id:user.id,
        name:user.name
    }, authconfig.secret ,{
        expiresIn:86400
    });
}
const router = express.Router();

router.post("/register",async(req,res)=>{
    const {email}=req.body;

    if(await UserModel.findOne({email})){
        return res.status(400).json({
            error:true,
            message:"User already exists"
        }) 
    } 

    const user = await UserModel.create(req.body);
    
    user.password= undefined;    

    return res.json({
        user,
        token:generateToken(user)
    });
})

router.post("/authenticate",async(req,res)=>{
    const {email, password}=req.body;
 
    const user = await UserModel.findOne({email}).select("+password");

    if(!user){
        return res.status(400).json({
            error:true,
            message: 'User not found' 
        })

    }
    if(!await bcrypt.compare(password,user.password)){
         return res.status(400).send({
            error:true,
            message:'Inavlida password'
         })   
        
    }
    user.password=undefined;

    return res.json({
        user,
        token:generateToken(user)
    });
})

module.exports=router;