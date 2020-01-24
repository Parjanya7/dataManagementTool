const express = require('express');
const Model = require('../Model/UserModel');

const router = express.Router();

router.post('/getDataByName' , ( req, res ) => {

    Model.findOne( { ID : req.body.ID }, ( err, docs ) => {

        if(!err)
            res.json( docs );
        else
            res.json( err );
    });
});

module.exports = router;