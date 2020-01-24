import React from 'react';
import '../Styles/Button.css';

const Button = ( props ) => {

    return (
        <div>
            <button className='Button'
                type = { props.type }
                name = { props.name }
            > 
                { props.says } 
            </button>
        </div>
    )
}

export default Button;
