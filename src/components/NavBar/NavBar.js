import React from 'react';
import Radium, { StyleRoot } from 'radium';
import { AppBar, Toolbar, withStyles, IconButton, Typography } from '@material-ui/core';
import MenuIcon  from '@material-ui/icons/Menu';
import { flash } from 'react-animations'
import './NavBar.css';
const useStyles = theme => ({
    navbar: {
        flexGrow: 1,

    },
    bar: {
        flexGrow: 1,
        position : 'static',
        backgroundColor: 'rgba(0,0,0,0.5)'
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },

    navItem :{
        margin : '20px'

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
        this.state = {"mobile": !window.matchMedia('(min-width : 768px)').matches}
    }


    componentWillMount(){

        

        window.addEventListener("resize",this.resize.bind(this));

    }  
    resize(){
        let mediaQuery = window.matchMedia('(min-width : 768px)')
        //Desktop view : 
        if(mediaQuery.matches){
            this.setState({"mobile": false})
            

        }else{

            this.setState({"mobile": true})
        }
        console.log(this.state.mobile)
        
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
                        { this.state.mobile ?

                            <IconButton edge="end" className={classes.menuButton} color="inherit" aria-label="open drawer">
                                <MenuIcon />
                            </IconButton>

                            :
                            <Typography variant="h6" color="inherit"
                              className={classes.title}>
                                <nav style ={{display : "flex"}}>
                                  <div className={classes.navItem} > Home </div>
                                  <div className={classes.navItem}> Portfolio </div>
                                  <div className={classes.navItem} > About </div>
                                  <div className={classes.navItem} > Contact </div>
                                </nav>   
                              </Typography>
                        }
                        

                    </Toolbar>
                    {   /**mobile dropdown menu*/

                        this.state.mobile  &&
                            
                            <ul>
                                <li>Home</li>
                                <li>Portfolio</li>
                                <li>About</li>
                                <li>Contact</li>

                            </ul>
                            
                    }
                </AppBar>
            </div>
        </StyleRoot>
    }
}
export default withStyles(useStyles)(NavBar);