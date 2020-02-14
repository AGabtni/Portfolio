import React from 'react';
import Radium, {StyleRoot} from 'radium';
import { AppBar, Toolbar, makeStyles, Theme } from '@material-ui/core';
import { flash  } from 'react-animations'
import './NavBar.css';

const useStyles = makeStyles(theme => ({
  navbar: {
    flexGrow: 1,
    
  },
  bar:{
    backgroundColor : 'rgba(0,0,0,0.5)'
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },

}));


const animStyles = {
  flash: {
    animation: 'x 1s',
    animationName: Radium.keyframes(flash, 'flash')
  }
}



export default function NavBar() {

  const classes = useStyles();

  return  <StyleRoot >
        <div className={classes.navbar} style={animStyles.flash}>
          <AppBar className={classes.bar} >
            <Toolbar >

            </Toolbar>
          </AppBar>
        </div>
        </StyleRoot>
}

