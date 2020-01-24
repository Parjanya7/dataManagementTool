const express = require('express');
const Model = require('../Model/UserModel');

const router = express.Router();

router.post( '/getDocHolder', ( req, res ) => {
    console.log('the',req.body.ID );
    Model.findOne( { ID : req.body.ID }, { Name : 1, ID : 1, MobileNo : 1, Docs : 1,_id : 0 },( err, docs ) => {

        let temp = [];
        let tempDocsName = [];
        
        if( docs.Docs !== undefined && docs.Docs !== null ){
          
            let j = 0;
            for( let i = 0; i < docs.Docs.length; i++ ) {
                
                console.log( docs.Docs[i] );
                temp[j] = { Name: docs.Docs[i].DocName, Remarks: docs.Docs[i].Remarks, Auth: docs.Docs[i].Authority, repeatVar: docs.Docs[i].repeatVar };
                tempDocsName[j] = docs.Docs[i].DocName;
                j++;
            }
        }
        else { console.log('Documents are not found...') }

        let unique = [... new Set( tempDocsName ) ];

        if(!err)
            res.json({
                ID : docs.ID,
                Docs: temp,
                DocNames: unique,
                Name: docs.Name,
                Mob: docs.MobileNo
            });
        else
            res.json( err );
    });
});

module.exports = router;
