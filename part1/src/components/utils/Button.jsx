import React from 'react';

const Button = ({text, onClick}) => {    
    console.log('re-render');
    return <button onClick={onClick}>{text}</button>
}
 
export default Button;