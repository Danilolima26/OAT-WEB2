const express = require('express');
const AuthConrtroller = require("./controllers/AuthController");
const AdminController = require("./controllers/AdminController");

const authenticateMiddlware = require("./middlewares/authenticate")
const app=express();

app.use(express.json());

app.use("/auth",AuthConrtroller);
 
app.use("/admin",authenticateMiddlware ,AdminController);

app.listen(3001,()=>{
    console.log('Server is remaing');
})