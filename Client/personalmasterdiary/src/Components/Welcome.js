import React from 'react';

const Welcome = ( props ) => {
    return (
        <div id = "about">
            Welcome to Your Personal Information and Document Diary <h1> {props.user} </h1>
        </div>
    )
}

export default Welcome
