import React, { useState } from 'react';
import '../Styles/login.css';
//import '../Styles/Style.scss';
import '../Styles/Button.css'
import {
    Link,
    useHistory
  } from "react-router-dom";
import axios from 'axios';
import ReCAPTCHA from 'react-google-recaptcha';

const LoginForm = ( props ) => {

    let history = useHistory();

    const [ userVal, setUserVal ] = useState( props.user );
    const [ passVal, setPassVal ] = useState('');
    const recaptchaRef = React.createRef();
    
    const someFunc = () => { 

        console.log( recaptchaRef.current.getValue() );
        axios.post('/Auth/Login', { Name: userVal, Password: passVal })
            .then( res => {

                console.log( res.data );
                if( res.data.entryVar ) {

                    alert(res.data.msg);
                    props.updateUser( res.data.user );
                    alert( props.user );
                    history.push('/Main');
                }
            });
    };

    return (

        <div className='containerLogin'>
            <h1 className='login'> Login </h1>

            <form>

                <input className='input' 
                type = "text" 
                name = "username" 
                value = { userVal } 
                placeholder = "Username" 
                autoFocus
                id = 'UserName'
                    onChange = { e => { setUserVal( e.target.value ) } }
                />

                <br/>

                <input className='input' type = "password" name = "password" value = { passVal } placeholder = "Password" 
                    onChange = { e => { setPassVal( e.target.value ) } }
                />
                <p className="forgotPassword"> Forgot Password ? </p> 
                <br/>
                <ReCAPTCHA
                    ref = { recaptchaRef }
                    sitekey = '6LetxNEUAAAAANCY9krZJpgw1KLnP2Gd6o-hEj9-'
                    onChange = { () => console.log('Captch Clicked') }
                />
                <br/>
                <div className='button'>
                    <button type = "button" onClick = {someFunc} > Login </button>
                </div>

            </form>

            <div id = "linkToSignUp">
                <p> Don't have an Account ?</p> <Link to = "/SignUp" id = "link"> SignUp </Link>
            </div>
        </div>
    )
}

export default LoginForm;
