const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const app = express();

const  {userRouter} = require("./routes/users")
const { recipesRouter } = require("./routes/recipes")

app.use(express.json())


app.use(cors())

app.use("/auth", userRouter)
app.use("/recipes", recipesRouter)

mongoose.connect("mongodb+srv://Paras_Anand:paras4321@cluster0.3z8igom.mongodb.net/Recipes")

app.listen(3001, () => console.log("Server is Running on port 3001"))
