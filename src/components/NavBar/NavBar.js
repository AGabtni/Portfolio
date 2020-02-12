import React from 'react';
import { AppBar, Toolbar, makeStyles  } from '@material-ui/core';
import logo from '../../logo.svg';
import './NavBar.css';
const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
}));


class NavBar extends React.Component {
    render() {
        return <AppBar position="static">
                    <Toolbar></Toolbar>
                </AppBar>;
    }
}

export default NavBar;
