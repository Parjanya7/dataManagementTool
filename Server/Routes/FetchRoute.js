const express = require('express');
const Model = require('../Model/UserModel');

const router = express.Router();

// Fetch

router.post('/data', ( req, res ) => {

    Model.findOne( { ID : req.body.Id }, ( err, docs ) => {

        if(!err)
            res.json( docs );
        else 
            res.json( err );
    });
});

module.exports = router;