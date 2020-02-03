import React from 'react';
import logo from '../../logo.svg';
import './NavBar.css';

class NavBar extends React.Component {
    render() {
        return <img src={logo} className="App-logo" alt="logo" />;
    }
}

export default NavBar;
