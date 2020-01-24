const express = require('express');
const Model = require('../Model/UserModel');

const router = express.Router();

router.get('/DocsData', ( req, res ) => {

    Model.find( {}, { Docs: 1 }, ( err, docs ) => {

        if(err) res.json({err: err });
        else {

            let tempArr = [];
            let k = 0;
            for( let i = 0; i < docs.length; i++ ) {
                
                if( !(docs[i].Docs === null || docs[i].Docs === undefined || docs[i].Docs.length === 0) ) {
                    for( let j = 0; j < docs[i].Docs.length; j++ ) {
    
                        tempArr[k] = docs[i].Docs[j].DocName;
                        k++;
                    }
                } 
            }
            let unique = [...new Set( tempArr )];
            res.json({ Docs: unique });
        }
    });
});

module.exports = router;