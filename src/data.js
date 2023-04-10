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
        username:String,
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
    const { username, month, day, question, answer } = req.body;
    try {
        await Answers.create({
            username,
            month,
            day,
            question,
            answer,
        });
        res.send({ status: "ok",data: body});


    } catch (err) {
        res.status(err);
    }
});

app.get("/answers", async (req, res) => {
    try {
      const answers = await Answers.find({});
      res.json({ status: "ok", data: answers });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Internal server error" });
    }
  });
  
const SecretBox = new mongoose.Schema(
    {
        username:String,
        sentences:String,

    },{
        collection:"Secretbox",
    }
);
const Secret = mongoose.model("Secretbox",SecretBox);

app.post("/secret", async (req, res) => {
    const { username, sentences } = req.body;
    try {
        await Secret.create({
            username,
            sentences,
        });
        res.send({ status: "ok" })

    } catch (error) {
        res.send({ status: "error :(" });
    }
});

app.get("/secret", async (req, res) => {
    console.log("req data: ", req);
    try {
      const secrets = await Secret.find({});
      res.json({ status: "ok", data: secrets });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Internal server error" });
    }
  });
  
app.delete("/secret/:id", async (req, res) => {
const { id } = req.params;
try {
    const result = await Secret.deleteOne({ _id: id });
    res.status(200).json({ message: "Secret deleted successfully." });
} catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error occurred while deleting secret." });
}
});

//calendar
const Calendar = new mongoose.Schema(
    {
        username:String,
        etitle:String,
        edate:String,

    },{
        collection:"Calendar",
    }
);
const Calendars = mongoose.model("Calendar",Calendar);

app.post("/calendars", async (req, res) => {
  const { username, etitle, edate } = req.body;
  try {
    await Calendars.create({
      username,
      etitle,
      edate,
    });
    res.send({ status: "ok" });
  } catch (error) {
    console.error(error);
    res.send({ status: "error :(" });
  }
});
app.get("/calendars", async (req, res) => {
    console.log("req data: ", req);
    try {
      const cal = await Calendars.find({});
      res.json({ status: "ok", data: cal });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Internal server error" });
    }
  });

// calender end
  


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
                // res.send({ status: "okay", data: data });
                res.send(JSON.stringify(data));
            })
            .catch((error) => {
                res.send({ status: "error", data: error })
            });
    } catch (error) { }
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

