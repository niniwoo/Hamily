const { default: userEvent } = require('@testing-library/user-event');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
app.use(express.json());
const port = 4000;

const cors = require('cors');
app.use(cors());
const bcrypt = require('bcryptjs'); 

const jwt = require('jsonwebtoken'); 
const JWT_SECRET = "sdfs456gsw51ghw6hehr654wgywrgq/gw/-gw"; 
const mongoUrl = "mongodb+srv://jeonginjoy:RSmmZsbqJg7BdxER@cluster0.aueji3w.mongodb.net/?retryWrites=true&w=majority";
// const mongoUrl = "mongodb+srv://jeonginjoy:LYA1ZTxRCJZGsv4k@cluster0.aueji3w.mongodb.net/?retryWrites=true&w=majority"
;mongoose.set('strictQuery', false);


const User = new mongoose.Schema(
    {
        email:{type: String, unique:true},
        username:{type: String, unique:true},
        password:String,
        password2:String,
    },{
        collection:"UserSignups",
    }
);
const Users = mongoose.model("UserSignups",User);


const UserAnswer = new mongoose.Schema(
    {
        month:String,
        day:String,
        question:String,
        answer:String,

    },{
        collection:"Answer",
    }
);


mongoose.connect(mongoUrl, {
    useNewUrlParser: true
}).then(() => {
    console.log("connected to database");
}).catch((e) => console.log(e));

const Answers = mongoose.model("Answer",UserAnswer);

app.post("/answers", async (req, res) => {
    const { month, day, question, answer } = req.body;
    try {
        await Answers.create({
            month,
            day,
            question,
            answer,
        });
        res.send({ status: "ok" })

    } catch (error) {
        res.send({ status: "error :(" });
    }
});

app.post("/register", async (req, res) => {
    const { email, username, password, password2 } = req.body;
    const encryptedPassword = await bcrypt.hash(password, 10);
    const encryptedPassword2 = await bcrypt.hash(password2, 10);
    try {
        const olduser = await Users.findOne({ email });

        if (olduser) {
            return res.send({ error: "User exists" });
        }
        await Users.create({
            email,
            username,
            password: encryptedPassword, //updated
            password2: encryptedPassword2, //update

        });
        res.send({ status: "ok" })

    } catch (error) {
        res.send({ status: "error :(" });
    }
    res.send("testinggg");
});
//create login api
app.post("/login", async (req, res) => {
    const { email, password } = req.body;
    const user = await Users.findOne({ email });
    if (!user) {
        return res.json({ error: "User not found" });
    }
    if (await bcrypt.compare(password, user.password)) {
        const token = jwt.sign({ email: user.email }, JWT_SECRET);

        //201 means my request has been successfully
        if (res.status(201)) {
            return res.json({ status: "ok", data: token })
        } else {
            return res.json({ error: 'error' });
        }
    }
    alert('Invalid password!'); // need to be fixed.
    res.json({ status: 'error', error: "invalid password" });

});
// app.get("/login", async (req, res) => { 
//     const users = await Users.findOne({username:req.username}); 
//     // res.send(JSON.stringify(users[users.length - 1].username)); 
//     res.json({ username: users.username });
//     console.log("users from the /login route: ", users);
//     console.log(req.params);
     
//     });
app.get("/login",async(req,res)=>{
        console.log(res);
    try{
        const allUser = await Users.find({username:req.username});
        res.send({ status: "ok",data:allUser});

    }catch(error){
        console.log(error);
    }
})

app.post("/question", async (req, res) => {
    const { token } = req.body;
    try {
        const user = jwt.verify(token, JWT_SECRET);
        //console.log(user);
        const useremail = user.email;
        Users.findOne({ email: useremail })
            .then((data) => {
                res.send({ status: "okay", data: data });
            })
            .catch((error) => {
                res.send({ status: "error", data: error })
            });
    } catch (error) { }
})

app.get("/getData",async(req,res)=>{
    console.log(res);
    try{
        const allUser = await Users.findOne({username:"niniwoo"});
        res.send({ status: "ok",data:allUser});

    }catch(error){
        console.log(error);
    }
})

app.post("/userData", async(req, res) => {
    const { token } = req.body;
    try {
        const user = jwt.verify(token,JWT_SECRET);
        console.log(user);
        const useremail = user.email;
        Users.findOne({ email:useremail })
            .then((data) => {
                res.send({ status: "okay", data:data });
            })
            .catch((error) => {
                res.send({ status: "error", data:error })
            });

    } catch (error) {
        res.send({ status: "error", data:error })
    }
})

app.listen(port, () => {
    console.log("port running on: ", port)
    console.log("server started");
})

