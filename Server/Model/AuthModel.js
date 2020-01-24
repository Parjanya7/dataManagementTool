const mongoose = require('mongoose');

const schema = new mongoose.Schema({
   
    //ID : { type : Number, required : true },
    UserName: { type: String, required: true },
    Name: { type: String, required: true },
    Email: { type: String, required: true },
    PassWord: { type: String, required: true },
    MobileNo: { type: Number, required: true }

}, { timestamps : true });

module.exports = mongoose.model( 'UsersData', schema );