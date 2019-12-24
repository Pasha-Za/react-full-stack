import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';

const App = (props) => {
    return (
        <div className="test">
            <h1 className="test__heading">First heading {props.heading}</h1>
        </div>
    )
}

ReactDOM.render(<App heading="React prop"/>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
