const mongoose = require('mongoose');

const schema = new mongoose.Schema({
   
    ID : { type : Number, required : true },
    Name : { type : String, required : true },
    Birthdate : { type : String, required : true },
    BloodGroup : { type : String, required : false },
    MobileNo : { type : Number, required : true },
    AadharCardNo : { type : Number, required : true },
    PAN : { type : String, required : true },
    Licence : { type : String, required : true },  
    VotingNo : { type : String, required : true },
    PassportNo : { type : String, required : true },
    Address : { type : String, required : true },
    PostalCode : { type : Number, required : true },
    City : { type : String, required : true },
    Dist : { type : String, required : true },
    State : { type : String, required : true },
    PhoneNo : { type : String, required : true },
    img : { type : Buffer, required : false }, 
    Docs : [{}]

}, { timestamps : true });

module.exports = mongoose.model( 's', schema );