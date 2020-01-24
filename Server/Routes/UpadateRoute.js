const express = require('express');
const fs = require('fs');
const fileUpload = require('express-fileupload');
const Model = require('../Model/UserModel');

const router = express.Router();

router.use( fileUpload());


//Update

router.post('/update' , ( req, res ) => {

    console.log( req.body.ID );
    console.log( req.files ); 

    if( req.files !== null ) {

        Model.findOne({ ID: req.body.ID }, ( err, docs ) => {
            
            docs.Name = req.body.Name;
            docs.Birthdate = req.body.Bday; 
            docs.BloodGroup = req.body.BG;
            docs.MobileNo = req.body.Mobile;
            docs.AadharCardNo = req.body.Aadhar;
            docs.PAN = req.body.PAN;
            docs.Licence = req.body.Lic;
            docs.VotingNo = req.body.Vot;
            docs.PassportNo = req.body.Pass;
            docs.Address = req.body.Addr;
            docs.PostalCode = req.body.Postal;
            docs.City = req.body.City;
            docs.Dist = req.body.Dist;
            docs.State = req.body.State;
            docs.PhoneNo = req.body.Phone;
    
            let thePath = `G:\\Projects\\Diary\\tempUploads\\${req.files.image.name}`;
            req.files.image.mv( thePath );
        
            fs.readFile( thePath, ( err, data ) => {
                    
                docs.img = data;
                docs.save();
                res.json({ ID : req.body.ID });
            });
        });
    }

    else {

        Model.findOne({ ID: req.body.ID }, ( err, docs ) => {
            
            docs.Name = req.body.Name;
            docs.Birthdate = req.body.Bday; 
            docs.BloodGroup = req.body.BG;
            docs.MobileNo = req.body.Mobile;
            docs.AadharCardNo = req.body.Aadhar;
            docs.PAN = req.body.PAN;
            docs.Licence = req.body.Lic;
            docs.VotingNo = req.body.Vot;
            docs.PassportNo = req.body.Pass;
            docs.Address = req.body.Addr;
            docs.PostalCode = req.body.Postal;
            docs.City = req.body.City;
            docs.Dist = req.body.Dist;
            docs.State = req.body.State;
            docs.PhoneNo = req.body.Phone;
            docs.img = '';
            docs.save();
            res.json({ ID : req.body.ID });
            
        });        
    }
});

module.exports = router;