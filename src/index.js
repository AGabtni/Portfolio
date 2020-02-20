import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Portfolio from './components/Portfolio/Portfolio';
import About from './components/About/About';

import * as serviceWorker from './serviceWorker';


ReactDOM.render(<App />, document.getElementById('app'));
ReactDOM.render(<Portfolio />, document.getElementById('portfolio'));
ReactDOM.render(<About />, document.getElementById('about'));


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
