const express = require('express');
const Model = require('../Model/UserModel');

const router = express.Router();

router.post('/Details', ( req, res) => {

    console.log( req.body );
    Model.findOne({ ID: req.body.ID }, { ID: 1, Name: 1, Docs: 1, _id: 0}, ( err, docs ) => {

        let temp = [];
        let tempDocsName = [];
        
        if( docs.Docs !== undefined && docs.Docs !== null ){
          
            let j = 0;
            for( let i = 0; i < docs.Docs.length; i++ ) {
                
                if( req.body.DocName === docs.Docs[i].DocName ) {
                    
                    temp[j] = { Name: docs.Docs[i].DocName, Remarks: docs.Docs[i].Remarks, Auth: docs.Docs[i].Authority, repeatVar: docs.Docs[i].repeatVar };
                    //tempDocsName[j] = docs.Docs[i].DocName;
                    j++;
                }
            }
        }

        if(!err){

            res.json({
                ID: docs.ID,
                Name: docs.Name,
                Docs : temp
            });
        }
    });
});

module.exports = router;