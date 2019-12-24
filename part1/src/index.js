import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';

const App = (props) => {
    const date = Date.now();
    const a = 10;
    const b = 20;

    return (
        <div className="test">
            <h1 className="test__heading">First heading {props.heading}</h1>
            <p>date: {date.toString()}; result of a({a}) + b({b}) = {a + b}</p>
        </div>
    )
}

ReactDOM.render(<App heading="React prop"/>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
