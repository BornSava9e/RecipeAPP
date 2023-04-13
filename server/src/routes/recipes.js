const express = require("express")
const mongoose = require("mongoose")
const RecipeModel = require("../models/Recipes")
const userModel = require("../models/Users")
const { verifyToken } =  require("./middleware")

const router = express.Router()

router.get("/", async function(req,res){
    try{
        const response = await RecipeModel.find({});
        res.json(response)
    }catch(err){
        res.json(err)
    }
})

router.post("/",verifyToken,async function(req,res){
    try{
        const data = req.body
        const recipe = await RecipeModel.create(data)
        res.json(recipe)
    }catch(err){
        res.json(err)
    }
})

router.put("/", verifyToken, async function(req,res){
    try{
        const recipe =  await RecipeModel.findById(req.body.recipeID)
        const user =  await userModel.findById(req.body.userID)
        user.savedRecipes.push(recipe)
        await user.save()
        res.json({savedRecipes : user.savedRecipes})

    }catch(err){
        res.json(err)
    }
})

router.get("/savedRecipes/ids/:userID", async function(req,res){
    try{
       const user = await userModel.findById(req.params.userID)
       res.json({savedRecipes : user.savedRecipes})

    }catch(err){
        res.json(err)
    }
})

router.get("/savedRecipes/:userID", async function(req,res){
    try{
       const user = await userModel.findById(req.params.userID)
       const savedRecipes = await RecipeModel.find({_id : {$in : user.savedRecipes}})
       res.json({savedRecipes : savedRecipes})

    }catch(err){
        res.json(err)
    }
})

module.exports.recipesRouter = router;
