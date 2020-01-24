const express = require('express');
const Model = require('../Model/UserModel');

const router = express.Router();

router.get( '/connect', ( req, res ) => {

    Model.findOne({}).sort({_id:-1}).limit(1).exec( ( err , docs ) => {
        
        if(err) 
            console.log(err);
        else{
            
            if( docs == null || docs.ID === undefined ) 
                res.json({ ID : 1});
            else 
                res.json({ ID : (docs.ID + 1) });
        }
    });
});

module.exports = router;
