import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Portfolio from './components/Portfolio/Portfolio';
import About from './components/About/About';
import Contact from './components/Contact/Contact';
import WelcomeScreen from './components/WelcomeScreen/WelcomeScreen';
import Footer from './components/Footer/Footer';

import 'hover.css';

import * as serviceWorker from './serviceWorker';


ReactDOM.render(<App />, document.getElementById('app'));
ReactDOM.render(<Portfolio />, document.getElementById('portfolio'));
ReactDOM.render(<About />, document.getElementById('about'));
ReactDOM.render(<Contact />, document.getElementById('contact'));
ReactDOM.render(<WelcomeScreen />, document.getElementById('overlay'));
ReactDOM.render(<Footer />, document.getElementById('footer'));


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
