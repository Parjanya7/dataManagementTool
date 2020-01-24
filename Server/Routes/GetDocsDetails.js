const express = require('express');
const Model = require('../Model/UserModel');

const router = express.Router();

router.post('/DocDetails', ( req, res ) => {

    console.log( req.body.DocName );

    Model.find( {}, { Name: 1, Docs: 1, ID: 1 }, ( err, docs ) => {

        let k = 0;
        let temp = [];

        for( let i = 0; i < docs.length; i++ ) {

            if( !(docs[i].Docs === null || docs[i].Docs === undefined || docs[i].Docs.length === 0) ) {
              
                for( let j = 0; j < docs[i].Docs.length; j++ ) {

//                    console.log( docs[i].Docs[j].DocName );
                    if( req.body.DocName === docs[i].Docs[j].DocName ) {
//                        console.log('something');
                        temp[k] = {
                            ID: docs[i].ID,                 
                            Name: docs[i].Name,
                            DocName: docs[i].Docs[j].DocName, 
                            Remarks: docs[i].Docs[j].Remarks,
                            Auth: docs[i].Docs[j].Authority,
                            repeatVar: docs[i].Docs[j].repeatVar
                        };  
//                        console.log( temp[k] );                  
                        k++;
                    }
                }
            }
        }
        res.json({ SomeData: temp });
    }); 
});

module.exports = router;