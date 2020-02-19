import React from 'react';
import Radium, { StyleRoot } from 'radium';
import { AppBar, Toolbar, withStyles, IconButton, Typography } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { flash, fadeInDown, fadeOutUp } from 'react-animations'
import './NavBar.css';
const useStyles = theme => ({
    navbar: {
        flexGrow: 1,

    },
    bar: {
        flexGrow: 1,
        position: 'static',
        backgroundColor: 'rgba(0,0,0,0.5)'
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },

    navItem: {
        margin: '20px'

    },

});

const animStyles = {
    flash: {
        animation: 'x 1s',
        animationName: Radium.keyframes(flash, 'flash')
    },
    fadeInDown: {
        animation: 'x 1s',
        animationName: Radium.keyframes(fadeInDown, 'fadeInDown')
    },
    fadeOutUp: {

        animation: 'x 1s',
        animationName: Radium.keyframes(fadeOutUp, 'fadeOutUp'),
        opacity: '0.0'
    }
}


class NavBar extends React.Component {


    constructor(props) {
        super(props);
        this.state = { "mobile": !window.matchMedia('(min-width : 768px)').matches }
        this.state = { "listOpen": false };
    }


    componentWillMount() {



        window.addEventListener("resize", this.resize.bind(this));

    }

    componentDidMount() {

        window.addEventListener('scroll', this.handleScroll);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }


    toggleNavMenu() {

        this.setState(prevState => ({

            listOpen: !prevState.listOpen


        }))

        console.log("ejfznl")
    }

    resize() {
        let mediaQuery = window.matchMedia('(min-width : 768px)')
        //Desktop view : 
        if (mediaQuery.matches) {
            this.setState({ "mobile": false })


        } else {

            this.setState({ "mobile": true })
        }
        console.log(this.state.mobile)

    }

    handleScroll(event) {


        if (window.scrollY >= window.innerHeight) {

            document.getElementById("appbar").style.position = "fixed"
        } else {
            document.getElementById("appbar").style.position = "relative"
        }


    }



    render() {

        const { classes } = this.props;
        return <StyleRoot >
            <div style={animStyles.flash}>
            <AppBar id="appbar" className={classes.bar}   >

                {!this.state.mobile &&
                        <Toolbar >
                            <Typography variant="h6" color="inherit"
                                className={classes.title}>
                                <nav style={{ display: "flex" }}>
                                    <div className={classes.navItem} > Home </div>
                                    <div className={classes.navItem}> Portfolio </div>
                                    <div className={classes.navItem} > About </div>
                                    <div className={classes.navItem} > Contact </div>
                                </nav>
                            </Typography>

                        </Toolbar>

                }

                {   /**mobile dropdown menu*/

                    this.state.mobile &&
                    <div >
                        <div className={classes.bar}>
                            <IconButton onClick={() => this.toggleNavMenu()}
                                edge="end"
                                className={classes.menuButton}
                                color="inherit"
                                aria-label="open drawer">

                                <MenuIcon />
                            </IconButton>
                        </div>
                        { this.state.listOpen &&
                            <div className={classes.bar} style={this.state.listOpen ? animStyles.fadeInDown : animStyles.fadeOutUp}>
                            <ul >
                                <li>Home</li>
                                <li>Portfolio</li>
                                <li>About</li>
                                <li>Contact</li>

                            </ul>
                        </div>}
                    </div>
                }
            </AppBar>

            </div>
        </StyleRoot>
    }
}
export default withStyles(useStyles)(NavBar);