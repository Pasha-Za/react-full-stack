import * as React from 'react';

export interface ButtonProps {
    text: string,
    onClick(): void
}
 
const Button: React.SFC<ButtonProps> = ({text, onClick}) => {
    console.log(typeof text);
    
    return <button onClick={onClick}>{text}</button>
}
 
export default Button;