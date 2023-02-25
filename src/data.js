const { default: userEvent } = require('@testing-library/user-event');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
app.use(express.json());

const cors = require('cors');
app.use(cors());
const bcrypt = require('bcryptjs'); //add

const jwt = require('jsonwebtoken'); // add
const { useReducer } = require('react');
const JWT_SECRET = "sdfs456gsw51ghw6hehr654wgywrgq/gw/-gw"; //ad 

const mongoUrl = "mongodb+srv://jeonginjoy:RSmmZsbqJg7BdxER@cluster0.aueji3w.mongodb.net/?retryWrites=true&w=majority";
mongoose.set('strictQuery', false);

mongoose.connect(mongoUrl,{
    useNewUrlParser:true
}).then(()=>{
    console.log("connected to database");
}).catch((e)=>console.log(e));

require("./userData");
const User = mongoose.model("UserInfo");

app.post("/register",async(req,res)=>{
const {email,password,password2} = req.body;
const encryptedPassword = await bcrypt.hash(password,10);
const encryptedPassword2 = await bcrypt.hash(password2,10); //add
    try {

        const olduser= await User.findOne({email});

        if(olduser){
            return res.send({error:"User exists"});
        }
        await User.create({
            email,
            password : encryptedPassword, //updated
            password2: encryptedPassword2, //update
    
        });
        res.send({status:"ok"})

    } catch (error) {
        res.send({status:"error :("});
    }
});
//create login api
app.post("/login",async(req,res)=>{
    const {email,password} = req.body;
    const user = await User.findOne({ email });
    if(!user){
        return res.json({error: "User not found"});
    }
    if(await bcrypt.compare(password,user.password)){
        const token = jwt.sign({ email:user.email },JWT_SECRET);

        //201 means my request has been successfully
        if(res.status(201)){
        return res.json({status:"ok",data: token })
        }else{
            return res.json({error:'error'});
        }
    }
    res.json({status: 'error', error:"invalid password"});

});

app.post("/question",async(req,res)=>{
    const { token } = req.body;
    try {
        const user = jwt.verify(token,JWT_SECRET);
        //console.log(user);
        const useremail = user.email;
        User.findOne({email:useremail})
        .then((data) =>{
            res.send({status:"okay", data:data});
        })
        .catch((error) =>{
            res.send({status:"error",data:error})
        });
    } catch (error) {}
})

app.listen(3000,()=>{
    console.log("server started");
})

