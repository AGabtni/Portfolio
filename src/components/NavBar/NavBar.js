import React from 'react';
import Radium, { StyleRoot } from 'radium';
import { AppBar, Toolbar, withStyles, Theme } from '@material-ui/core';
import { flash } from 'react-animations'
import './NavBar.css';
const useStyles = theme => ({
    navbar: {
        flexGrow: 1,

    },
    bar: {
        position : 'static',
        backgroundColor: 'rgba(0,0,0,0.5)'
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },

});

const animStyles = {
    flash: {
        animation: 'x 1s',
        animationName: Radium.keyframes(flash, 'flash')
    }
}


class NavBar extends React.Component {


    constructor(props) {
        super(props);
         
      }

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll);
    }
    
    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }
    
    handleScroll(event) {


        if(window.scrollY >= window.innerHeight){
            
            document.getElementById("navbar").style.position = "fixed"
        }else{
            document.getElementById("navbar").style.position = "relative"
        }

    
    }
    render() {

        const { classes } = this.props;
        return <StyleRoot >
            <div className={classes.navbar} style={animStyles.flash}>
                <AppBar id="navbar" className={classes.bar}  >
                    <Toolbar >

                    </Toolbar>
                </AppBar>
            </div>
        </StyleRoot>
    }
}
export default withStyles(useStyles)(NavBar);