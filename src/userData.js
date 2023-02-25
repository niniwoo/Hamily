const mongoose = require('mongoose');

const User = new mongoose.Schema(
    {
        email:{type: String, unique:true},
        password:String,
        password2:String,
    },{
        collection:"UserInfo",
    }
);

mongoose.model('UserInfo',User);