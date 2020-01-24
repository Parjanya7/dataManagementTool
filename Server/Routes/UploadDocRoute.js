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

//Create storage engine
const storage = new GridFsStorage({

    url: 'mongodb://localhost:27017/some',
    file: ( req, file ) => {

        return new Promise( ( resolve, reject ) => {

            crypto.randomBytes( 16, ( err, buf ) => {

                if( err )
                    return reject( err );

                const filename = buf.toString('hex') + path.extname( file.originalname );
                const fileInfo = {

                    filename : filename,
                    bucketName : 'uploadedDocs'
                };
                resolve( fileInfo );
            });
        });
    }
});

const upload = multer({ storage });

router.post('/uploadDocs', upload.array( 'files', 2 ), ( req, res ) => {

    console.log( req.body );
    console.log( req.files );

    Model.findOne( {ID: req.body.ID }, ( err, docs ) => {

        console.log( `Docs : `,docs.Docs );

        if( docs.Docs === null || docs.Docs === undefined || docs.Docs.length === 0 ) {
            
            if( req.files.length === 1 ) {

                let temp = {
                    DocName: req.body.DocName.toUpperCase(),
                    one: req.files[0].filename,
                    impDate: req.body.impDate,
                    Remarks: req.body.Remarks,
                    Authority: req.body.Authority,
                    repeatVar: 1
                };
                console.log(temp);
                docs.Docs.push(temp);        
                docs.save( err => {
                    
                    if(err)console.log(err)
                    else
                        res.json({ msg: 'SuccesFully Uploaded' });
                });
            }   
            else {
                
                let temp = {
                    DocName: req.body.DocName.toUpperCase(),
                    one: req.files[0].filename,
                    two: req.files[1].filename,
                    impDate: req.body.impDate,
                    Remarks: req.body.Remarks,
                    Authority: req.body.Authority,
                    repeatVar: 1
                };
                console.log(temp);
                docs.Docs.push(temp);        
                docs.save( err => {
                    
                    if(err)console.log(err)
                    else
                        res.json({ msg: 'SuccesFully Uploaded' });
                });
            } 
        } 
        else {
        
            let someVar = false;
            let j = 0;

            for( let i = 0; i < docs.Docs.length; i++ ) {

                if( req.body.DocName.toUpperCase() === docs.Docs[i].DocName ){

                    someVar = true;
                    j = i;
                }
            }
            console.log( someVar, j );
            if( someVar ) { // Updation 

                if( req.files.length === 2 ) {

                    // First Delete docs.Docs[j].one and two files ...

//                    console.log(temp);
/*                    docs.Docs[j].one = req.files[0].filename;
                    docs.Docs[j].two = req.files[1].filename;

                    if( req.body.impDate !== '' )
                        docs.Docs[j].impDate = req.body.impDate;
                    if( req.body.Remarks !== '' )
                        docs.Docs[j].Remarks = req.body.Remarks;
                    if( req.body.Authority !== '' )
                        docs.Docs[j].Authority = req.body.Authority;
 */
                    let temp = {
                        DocName: req.body.DocName.toUpperCase(),
                        one: req.files[0].filename,
                        two: req.files[1].filename,
                        impDate: req.body.impDate,
                        Remarks: req.body.Remarks,
                        Authority: req.body.Authority,
                        repeatVar: docs.Docs[j].repeatVar + 1
                    };
                    docs.Docs.push( temp );
                    docs.save( err => {
                        
                        if(err)console.log(err)
                        else
                            res.json({ msg: 'SuccesFully Updated' });
                    });
                }
                else if( req.files.length === 1 ){

                    let temp = {
                        DocName: req.body.DocName.toUpperCase(),
                        one: req.files[0].filename,
//                        two: req.files[1].filename,
                        impDate: req.body.impDate,
                        Remarks: req.body.Remarks,
                        Authority: req.body.Authority,
                        repeatVar: docs.Docs[j].repeatVar + 1
                    };
                    docs.Docs.push( temp );
                    docs.save( err => {
                        
                        if(err)console.log(err)
                        else
                            res.json({ msg: 'SuccesFully Updated' });
                    });                    
/*                    if( docs.Docs[j].length === 2 ) {

                        docs.Docs[j].one = req.files[0].filename;
                            
                        if( req.body.impDate !== '' )
                            docs.Docs[j].impDate = req.body.impDate;
                        if( req.body.Remarks !== '' )
                            docs.Docs[j].Remarks = req.body.Remarks;
                        if( req.body.Authority !== '' )
                            docs.Docs[j].Authority = req.body.Authority;
                        docs.save( err => { if(!err)console.log('Sucessfully Updated..')});
                    }
                    else {

                        if( req.body.Front === 'true' ){

                            docs.Docs[j].one = req.files[0].filename;
                                    
                            if( req.body.impDate !== '' )
                                docs.Docs[j].impDate = req.body.impDate;
                            if( req.body.Remarks !== '' )
                                docs.Docs[j].Remarks = req.body.Remarks;
                            if( req.body.Authority !== '' )
                                docs.Docs[j].Authority = req.body.Authority;
                            docs.save( err => { if(!err)console.log('Sucessfully Updated.. Front')});
                        }
                        else if( req.body.Back === 'true' ) {
                        
                            docs.Docs[j].two = req.files[0].filename;
                            
                            if( req.body.impDate !== '' )
                                docs.Docs[j].impDate = req.body.impDate;
                            if( req.body.Remarks !== '' )
                                docs.Docs[j].Remarks = req.body.Remarks;
                            if( req.body.Authority !== '' )
                                docs.Docs[j].Authority = req.body.Authority;

                            docs.save( err => { if(!err)console.log('Sucessfully Updated..Back')});
                        }
                        else { console.log('some Error'); }
                    } */
                }
                else {
                    /*
                    if( req.body.impDate !== '' )
                        docs.Docs[j].impDate = req.body.impDate;
                    if( req.body.Remarks !== '' )
                        docs.Docs[j].Remarks = req.body.Remarks;
                    if( req.body.Authority !== '' )
                        docs.Docs[j].Authority = req.body.Authority;
                    */
                    console.log('No Files to update..');
                } 
            }
            else {

                if( req.files.length === 1 ) {

                    let temp = {
                        DocName: req.body.DocName.toUpperCase(),
                        one: req.files[0].filename,
                        impDate: req.body.impDate,
                        Remarks: req.body.Remarks,
                        Authority: req.body.Authority,
                        repeatVar: 1
                    };
                    console.log(temp);
                    docs.Docs.push(temp);        
                    docs.save( err => {
                        
                        if(err)console.log(err)
                        else
                            res.json({ msg: 'SuccesFully Uploaded' });
                    });
                }   
                else {
                    
                    let temp = {
                        DocName: req.body.DocName.toUpperCase(),
                        one: req.files[0].filename,
                        two: req.files[1].filename,
                        impDate: req.body.impDate,
                        Remarks: req.body.Remarks,
                        Authority: req.body.Authority,
                        repeatVar: 1
                    };
                    console.log(temp);
                    docs.Docs.push(temp);        
                    docs.save( err => {
                        
                        if(err)console.log(err)
                        else
                            res.json({ msg: 'SuccesFully Uploaded' });
                    });
                }           
            }
        }  
    }); 
}); 


module.exports = router;
