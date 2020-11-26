import React from 'react';
import Radium, { StyleRoot } from 'radium';
import { AppBar, Toolbar, withStyles, IconButton, Typography, Button, ButtonGroup, Grid, Link } from '@material-ui/core';
import GitHubIcon from '@material-ui/icons/GitHub';
import LinkedInIcon from '@material-ui/icons/LinkedIn';


import MenuIcon from '@material-ui/icons/Menu';
import { bounceInLeft, fadeInDown, fadeOutUp } from 'react-animations'
import './NavBar.css';


const useStyles = theme => ({
    appbar: {
        display: 'flex',
        flexGrow: '1',
        displayFlex: "column",
        position: 'relative',
        //backgroundColor: 'rgba(0,0,0,0.5)'
        backgroundColor: '#2C3E50'
    },
    bar: {
        flexGrow: 1,
        position: 'static',
        textAlign: 'center'
    },
    menu: {
    },
    menuButton: {
        marginLeft: '50px'

    },
    title: {
        flexGrow: 1,
    },

    navItem: {
        padding: '20px',
        width: 'inherit',
        color: "white",
    },
    navItemContent: {
        fontWeight: "700"
    },
    socMediaLink: {
        margin: 10,
        color: "white",

    }



});

const animStyles = {
    bounceInLeft: {
        animation: 'x 0.75s',
        animationName: Radium.keyframes(bounceInLeft, 'bounceInLeft')
    },

    fadeInDown: {

        animation: 'x 1s',
        animationName: Radium.keyframes(fadeInDown, 'fadeInDown'),
        opacity: '1.0',

    },
    fadeOutUp: {

        animation: 'x 1s',
        animationName: Radium.keyframes(fadeOutUp, 'fadeOutUp'),
        opacity: '0.0',

    },

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
        this.resize();
        window.addEventListener('scroll', this.handleScroll);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }

    //Open and close mobile burger menu 
    toggleNavMenu() {

        this.setState(prevState => ({

            listOpen: !prevState.listOpen


        }))

    }

    resize() {
        let mediaQuery = window.matchMedia('(min-width : 768px)')
        //Desktop view : 
        if (mediaQuery.matches) {
            this.setState({ "mobile": false })


        } else {

            this.setState({ "mobile": true })
        }


    }


    //Fix the nav bar when scolling past it :
    handleScroll(event) {


        if (window.scrollY >= window.innerHeight) {

            document.getElementById("appbar").style.position = "fixed"
            document.getElementById("appbar").style.color = "#2C3E50"

        } else {
            document.getElementById("appbar").style.position = "relative"
            document.getElementById("appbar").style.color = "#2C3E50"

        }


    }



    render() {

        const { classes } = this.props;
        const { list } = this.props;
        return <StyleRoot >
            <div  >
                <AppBar id="appbar" className={classes.appbar} >

                    {!this.state.mobile &&
                        <Toolbar className={classes.bar}>

                            <ButtonGroup size="large" className={classes.menu}>

                                {list.map((item) => (
                                    <div className="hvr-grow" key={item.id} >
                                        <Button className={classes.navItem}
                                            key={item.id}
                                            onClick={() => this.props.toggleItem(item.id, item.key)}>

                                            <Typography className={classes.navItemContent}>{item.title}</Typography>

                                        </Button>
                                    </div>
                                ))}
                            </ButtonGroup >

                        </Toolbar>

                    }

                    {   /**mobile dropdown menu*/

                        this.state.mobile &&
                        <>
                            <Toolbar className={classes.bar}>
                                <IconButton onClick={() => this.toggleNavMenu()}
                                    edge="end"
                                    color="inherit"
                                    aria-label="open drawer"
                                    style = {{color:"#FFFFFF"}}>
                                   
                                    <MenuIcon />
                                </IconButton>
                            </Toolbar>

                            { /** MOBILE DROPDOWN MENU */
                                this.state.listOpen &&
                                <div className={classes.bar} >
                                    <ButtonGroup orientation="vertical" variant="text">

                                        {list.map((item) => (
                                            <div className="hvr-pulse">
                                                <Button
                                                    className={classes.navItem}

                                                    key={item.id}
                                                    onClick={() => { this.toggleNavMenu(); this.props.toggleItem(item.id, item.key); }}>

                                                    <Typography className={classes.navItemContent} style={this.state.listOpen ? animStyles.bounceInLeft : null}>
                                                        {item.title}
                                                    </Typography>
                                                </Button>
                                            </div>

                                        ))}


                                    </ButtonGroup>
                                </div>
                            }
                        </>

                    }

                    <Grid item xs={8} style={{ position: "absolute", right: 40, top : 15 }}>
                        <Link href="https://github.com/AGabtni/" 
                             className={classes.socMediaLink}
                             target="_blanck">
                            <GitHubIcon fontSize="large" color="#FFFFFF"/>
                        </Link>
                        <Link 
                            className={classes.socMediaLink}
                            target="_blanck"
                            href="https://www.linkedin.com/in/ahmed-gabtni-7312a41a6/">
                            <LinkedInIcon color="#FFFFFF" fontSize="large" />
                        </Link>

                    </Grid>

                </AppBar>

            </div>
        </StyleRoot>
    }
}
export default withStyles(useStyles)(NavBar);