const express = require('express');
const Model = require('../Model/UserModel');

const router = express.Router();

router.post( '/findByName', ( req, res ) => {

    let pattern = `/^${req.body.keyWord}/`;

    Model.find({ Name : { $regex: req.body.keyWord, $options : 'i' } }, { Name : 1, ID : 1, _id : 0 },( err, docs) =>{
        
        if(!err)
            res.json( docs );
        else 
            res.json( err );
    });
});

module.exports = router;