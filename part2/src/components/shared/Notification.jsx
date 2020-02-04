import React from 'react';

const Notification = ({type, isShown, text}) => {
    if (!isShown) {
      return false;  
    }
    const colorStyle = {
      color: type === "success" ? "green" : "red"
    };
    
    return <p style={colorStyle}>{text}</p>;
}
 
export default Notification;