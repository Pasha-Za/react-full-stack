import React from 'react';
import ReactDOM from 'react-dom';
// import PhoneApp from './components/PhoneApp';
import CounrtyApp from './components/country/CounrtyApp';
import * as serviceWorker from './serviceWorker';

/* notes App code */
// import NoteApp from './NoteApp';

// ReactDOM.render(<NoteApp/>, document.getElementById('root'));
/* notes App code end*/

// ReactDOM.render(<PhoneApp />, document.getElementById('root'));
ReactDOM.render(<CounrtyApp />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
