const express = require('express');
const fs = require('fs');
const fileUpload = require('express-fileupload');
const Model = require('../Model/UserModel');

const router = express.Router();

router.use( fileUpload());

// Insert

router.post( '/insert', ( req, res ) => {
    
    let insertVar = new Model();

    console.log( req.files );

    insertVar.ID = req.body.ID;
    insertVar.Name = req.body.Name;
    insertVar.Birthdate = req.body.Bday;
    insertVar.BloodGroup = req.body.BG;
    insertVar.MobileNo = req.body.Mobile;
    insertVar.AadharCardNo = req.body.Aadhar;
    insertVar.PAN = req.body.PAN;    
    insertVar.Licence = req.body.Lic;
    insertVar.VotingNo = req.body.Vot;
    insertVar.PassportNo = req.body.Pass;
    insertVar.Address = req.body.Addr;
    insertVar.PostalCode = req.body.Postal;
    insertVar.City = req.body.City;
    insertVar.Dist = req.body.Dist;
    insertVar.State = req.body.State;
    insertVar.PhoneNo = req.body.Phone;

    if( req.files !== null ) {

        console.log( req.files );
        let thePath = `G:\\Projects\\PersonalDiary\\tempUploads\\${req.files.image.name}`;
        req.files.image.mv( thePath );

        fs.readFile( thePath, ( err, data ) => {
                
            if(!err)
                insertVar.img = data;
            
            insertVar.save( err => {

                if( err ) 
                    res.json( err );
                else{
                    res.json({ ID : req.body.ID, Name: req.body.Name });
                    console.log( `New Record Created.`);
                };
            });
        });
    }
    else 
        insertVar.save();
});

module.exports = router;