
import React, { useState } from 'react';
import '../Styles/Style.css';
import '../Styles/Button.css';
import {
    Link,
    useHistory       
  } from "react-router-dom";
import axios from 'axios';

const SignUp = ( props ) => {

    const [ userNameVal, setUserNameVal ] = useState('');
    const [ nameVal, setNameVal] = useState( '' );
    const [ emVal, setEVal ]  = useState( '' );
    const [ passVal, setPassVal] = useState( '' );
    const [ mnVal, setMNVal] = useState( '' );

    let history = useHistory();

    const submitFunc = () => {

        alert('something');

        let formDataVar = {
            'UserName': userNameVal,
            'Name': nameVal,
            'Email': emVal,
            'Password': passVal,
            'MobileNo': mnVal
        };

        axios.post('/Auth/SignUp', formDataVar )
            .then( res => {
                if( res.data.entryVar === true ) {
                    alert( res.data.msg );
                    props.updateUser( res.data.user );
                    history.push('/');
                }
                else {
                    alert(res.data.errors.username);
                    alert(res.data.errors.name);
                    alert(res.data.errors.email);
                    alert(res.data.errors.mobile);
                    alert(res.data.errors.password);
                }
            });         
    };

    return (
        <div className='containerSignUp'>
            <h2 className='signup'>Sign up</h2>

            <form>
                
                <input className='input' type = 'text' placeholder = 'Userame ' name = 'username' value = {userNameVal} 
                    onChange = { e => { setUserNameVal( e.target.value ) } } autoFocus 
                /> <br/>
                <input className='input' type = 'text' placeholder = 'Name' name = 'name' value = {nameVal} 
                    onChange = { e => { setNameVal( e.target.value ) } } 
                /> <br/>
                
                <input className='input' type = 'email' placeholder = 'Email' name = 'email' value = {emVal} 
                    onChange = { e => { setEVal( e.target.value ) } }
                /> <br/>
                
                <input className='input' type = 'password' placeholder = 'Password' name = 'password' value = {passVal} 
                    onChange = { e => { setPassVal( e.target.value ) } }
                /> <br/>
                
                <input className='input' type = 'number' placeholder = 'Mobile Number' name = 'number' value = {mnVal} 
                    onChange = { e => { setMNVal( e.target.value ) } }
                /> <br/>

                <div className='button'>
                    <button onClick = { submitFunc } type = "button" name = 'signUpButton'> Sign Up </button>
                </div>
                
            </form>

            <div id = "SignUpToLoginLink">
                <p>Already have an Account ? </p> 
                <Link to = "/" id = "link"> Login </Link>
            </div>

        </div>
    )
}

export default SignUp;
