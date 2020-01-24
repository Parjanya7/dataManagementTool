const express = require('express');
const Model = require('../Model/UserModel');

const router = express.Router();

//Delete

router.post( '/delete', ( req, res ) => {

    console.log( req.body.Id );


    Model.deleteOne( { ID : req.body.Id } , ( err, docs ) => {

        if(!err) {
            console.log( docs );
            res.json( req.body.Id );
        }
        else
            res.json( err );
    });
});

module.exports = router;
