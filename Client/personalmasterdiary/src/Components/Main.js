import React from 'react';
import {
    Route,
    NavLink,
  } from "react-router-dom";
import Welcome from './Welcome';
import PersonalData from './PersonalData';
import Docs from './Docs';
import Login from './Login';
import GetDocs from './GetDocs';

const Main = ( props ) => {

    let match = props.match;

    const style = {          
        
        fontSize: 'larger',
        display: 'block',
        padding: '40px 16px',
        margin: '0rem',
        color: 'inherit', 
        textDecoration: 'inherit' 
    };

    const active = { backgroundColor : 'royalblue'};

    const updateUserFunc = () => {
        alert('clicked');
        props.updateUser('');
    };

    return (
         
    <div className = 'container' >
    <div className = "navDiv">
                <ul id = "ul">
                    <h3> Navigation Bar </h3>
                    <li><NavLink to = { `${match.url}` } style = { style } > About </NavLink></li>
                    <li><NavLink to = {`${match.url}/PersonalData`} style = { style } activeStyle = {active}> Personal Information </NavLink></li>
                    <li><NavLink to = {`${match.url}/UploadDocuments`} style = { style } activeStyle = {active}> Documents </NavLink></li>
                    <li><NavLink to = {`${match.url}/SearchDocuments`} style = { style } activeStyle = { active} > Search Documents </NavLink></li>
                    <NavLink to ='/' id = "LogOutId" onClick = { updateUserFunc }> LogOut </NavLink>
                </ul>
            </div>
            <div>
                < Route exact path = {match.url} component = {() => <Welcome user = {props.user} />} />
                < Route path = {`${match.url}/PersonalData`}  component = { PersonalData} />
                < Route path = {`${match.url}/UploadDocuments`} component = { Docs } />
                < Route path = {`${match.url}/SearchDocuments`} component = { GetDocs } />
                < Route exact path = '/' component = {() => <Login/>} />
            </div>        
    </div>     
        
    )
}

export default Main;

/*

*/