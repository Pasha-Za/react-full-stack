import React from 'react';
import { useState, useImperativeHandle } from 'react';
import PropTypes from 'prop-types'

const Togglable = React.forwardRef((props, ref) => {
    const [visible, setVisible] = useState(false);

    const hideWhileVisible = { display: visible ? '' : 'none' };
    const showWhileVisible = { display: visible ? 'none' : '' };

    const toggleVisibility = () => {
        setVisible(!visible)
    }

    useImperativeHandle(ref, () => {
        return {
            toggleVisibility
        }
    })

    return (
        <div className="togglable">
            <button style={showWhileVisible} onClick={toggleVisibility}>{props.openText}</button>

            <div style={hideWhileVisible}>
                {props.children}
                <button onClick={toggleVisibility}>cancle</button>
            </div>
        </div>
    );
})

Togglable.propTypes = {
    openText: PropTypes.string.isRequired
}

export default Togglable;