const express = require('express');
const AuthModel = require('../Model/AuthModel');
const validator = require('validator');
const isLoggedInValidator = require('../Validation/isLoggedInValidator');
const registerInputValidator = require('../Validation/registerInputValidator');

const router = express.Router();

router.post('/SignUp', ( req, res ) => {

    const data = req.body;
    const errors = {};

    data.UserName = (data.UserName) ? data.UserName : '';
    data.Name = (data.Name) ? data.Name : '';
    data.Email = (data.Email) ? data.Email : '';
    data.Password = (data.Password) ? data.Password : '';
    data.MobileNo = (data.MobileNo) ? data.MobileNo : '';
    

    if (!validator.isLength(data.UserName, { min: 1, max: 50 })) {
        errors.username = 'Username must be between 1 to 50 characters!';
    }

    if (data.UserName === '') {
        errors.username = 'Username field is required!';
    }

    if (!validator.isLength(data.Name, { min: 1, max: 50 })) {
        errors.name = 'Name must be between 1 to 50 characters!';
    }

    if (data.Name === '') {
        errors.name = 'Name field is required!';
    }

    if (!validator.isEmail(data.Email)) {
        errors.email = 'Email is invalid!';
    }

    if (data.Email === '') {
        errors.email = 'Email field is required!';
    }

    if (!validator.isLength(data.Password, { min: 1, max: 50 })) {
        errors.password = 'Password must be between 1 to 50 characters!';
    }

    if (data.Password === '') {
        errors.password = 'Password field is required!';
    }

    if (!validator.isMobilePhone(data.MobileNo)) {
        errors.mobile = 'Please specify a valid mobile number!';
    }

    if (data.MobileNo === '') {
        errors.mobile = 'Please specify a mobile number!';
    }

    if ( Object.keys( errors ).length !== 0 ) {
        
        console.log('err');
        res.json({errors, entryVar: false });
    }
    
    else { 
        
        console.log('hi');
        let insertVar = new AuthModel();

        insertVar.UserName = req.body.UserName;
        insertVar.Name = req.body.Name;
        insertVar.Email = req.body.Email;
        insertVar.PassWord = req.body.Password;
        insertVar.MobileNo = req.body.MobileNo;

        insertVar.save( err => {
            if( !err ){
                console.log('Saved new User');
                res.json({ 
                        msg: 'You are registered Successfully, Please Login Now.', 
                        entryVar: true, user: req.body.UserName 
                    });
            }
        });
    }
    
});

router.post('/Login', ( req, res ) => {

    console.log( req.body );
    const data = req.body;
    const errors = {};

    data.Name = (data.Name) ? data.Name : '';
    data.Password = (data.Password) ? data.Password : '';

    if (data.Name === '' ) {
        errors.Name = 'Username is required!';
    }

    if (!validator.isLength(data.Password, { min: 1, max: 50 })) {
        errors.Password = 'Password must be between 6 to 30 characters!';
    }

    if (data.Password === '') {
        errors.Password = 'Password field is required!';
    }

    if ( Object.keys( errors ).length !== 0 ) {
        
        console.log('err');
        res.json(errors);
    }
    else {

        AuthModel.findOne({UserName: data.Name } , ( err, docs ) => {
            console.log( docs );
            if(!docs) res.json({ entryVar: false, msg: 'User Not Found' });

            else {

                if( data.Password === docs.PassWord ) {
                    res.json( {entryVar: true, msg: 'Welcome', user: docs.UserName});
                }
                else {
                    res.json({ entryVar: false, msg: 'Incorrect Password.'});
                }
            }
        }); 
    }
});

module.exports = router;