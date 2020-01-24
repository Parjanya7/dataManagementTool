const express = require('express');
const Model = require('../Model/UserModel');
const Grid = require('gridfs-stream');
const mongoose = require('mongoose');

const router = express.Router();

const conn = mongoose.createConnection( 'mongodb://localhost:27017/some'); 

let gfs;

conn.once( 'open', () => {

    gfs = Grid( conn.db, mongoose.mongo );
    gfs.collection('uploadedDocs');
});

router.post('/DocPic', ( req, res ) => {

    console.log( req.body.data );
    let tempArr = req.body.data.split('+');
    console.log( tempArr );
    let imgArr = [];

    Model.findOne({ ID: tempArr[0]}, { Docs: 1, ID: 1, _id: 0 }, ( err, docs ) => {
    
        if( !(docs.Docs === null || docs.Docs === undefined || docs.Docs.length === 0) ) {
            
            for( let i = 0; i < docs.Docs.length; i++ ){
                
                if( !(docs.Docs[i].repeatVar === null || docs.Docs[i].repeatVar === undefined) ) {

                    if( docs.Docs[i].DocName === tempArr[1] ){
                        if( `${docs.Docs[i].repeatVar}` === tempArr[2] ) {
                            if( docs.Docs[i].one && docs.Docs[i].two ) {
                                console.log('one');
                                imgArr[0] = docs.Docs[i].one;
                                imgArr[1] = docs.Docs[i].two;
                            }
                            else{
                                console.log('two');
                                imgArr[0] = docs.Docs[i].one;
                            }
                        }
                    }
                }
            }   
        }
        console.log( imgArr );
        if( imgArr.length === 2 ) {
            
            let someData = 'data:image/jpeg;base64,';
            const readStream = gfs.createReadStream({ filename: imgArr[0] });
            
            readStream.on('data', (chunk) => {
                someData += chunk.toString('base64'); 
            });
            readStream.on('end', () => {

                res.json({ ImageOne: someData, nextImageVar: true });
            });
            
            router.get('/DocPic2', ( req, res ) => {
                
                let someOtherData = 'data:image/jpeg;base64,';
                const readStream2 = gfs.createReadStream({ filename: imgArr[1] });

                readStream2.on('data', (chunks) => {

                    someOtherData += chunks.toString('base64'); 
                });
                readStream2.on('end', () => {

                    res.json({ ImageTwo: someOtherData });
                });
            }); 
        }

        else {
                
            let someData = 'data:image/jpeg;base64,';
            const readStream = gfs.createReadStream({ filename: imgArr[0] });
            
            readStream.on('data', (chunk) => {
                someData += chunk.toString('base64');
            });
            readStream.on('end',() => {

                res.json({ ImageOne: someData });
            });
        }
    });
});

module.exports = router;