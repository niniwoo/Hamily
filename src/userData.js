
const express = require('express');
const app = express();
const mongoose = require('mongoose');
app.use(express.json());

const cors = require('cors');
app.use(cors());

const mongoUrl = "mongodb+srv://jeonginjoy:RSmmZsbqJg7BdxER@cluster0.aueji3w.mongodb.net/?retryWrites=true&w=majority";
mongoose.set('strictQuery', false);

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

app.post("/answer", async (req, res) => {
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


app.listen(3000, () => {
    console.log("server started");
})

