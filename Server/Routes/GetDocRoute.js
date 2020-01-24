const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const crypto = require('crypto');
const path = require('path');
const Model = require('../Model/UserModel');
                    
const router = express.Router();
                    
// Mongo Connection
const conn = mongoose.createConnection( 'mongodb://localhost:27017/some'); 
                    
// Init gfs
let gfs;
                    
conn.once( 'open', () => {
                    
    gfs = Grid( conn.db, mongoose.mongo );
    gfs.collection('uploadedDocs');
});

router.post('/GetDocs',( req, res ) => {

        console.log( req.body );
        
        Model.findOne({ID: req.body.ID}, async( err, docs )=>{
                        
            let someVar = false;
            let j = 0;

        for( let i = 0; i < docs.Docs.length; i++ ) {

            if( req.body.DocName.toUpperCase() === docs.Docs[i].DocName ){

                someVar = true;
                j = i;
                break;
           }
        }
            console.log( someVar, j );

            if( someVar ){
                console.log( docs.Docs );
                const readStream1 = gfs.createReadStream({filename: docs.Docs[j].one });
                const readStream2 = gfs.createReadStream({ filename: docs.Docs[j].two });
                console.log( readStream1,readStream2 );
                
                let one;
                let two;
                
                readStream1.on('readable',() => {

                    var chunk;
                    while( null !== ( chunk = readStream1.read()) )
                        one = chunk;
 //                   console.log( one );
                    two = one;
                    res.json({ Front: two });
                })
            }
            else {

                console.log('Document not present.');
            }
    });
        
});                    

module.exports = router;