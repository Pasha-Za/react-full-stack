import React from 'react';
import { useStateValue } from '../context/contextState'

const ThemeToggler = () => {
    const [{ theme:{theme}}, dispatch] = useStateValue();

    const toggleTheme = (e) => {
        e.preventDefault();

        dispatch({
            type: 'setTheme',
            payload: theme === 'white' ? 'black' : 'white' 
        });
    }

    return (<button onClick={(e) => toggleTheme(e)}>toggle theme to: {theme === 'white' ? 'black' : 'white' }</button>);
}
 
export default ThemeToggler;