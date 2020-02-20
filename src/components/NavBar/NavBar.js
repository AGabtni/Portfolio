import React from 'react';
import Radium, { StyleRoot } from 'radium';
import { AppBar, Toolbar, withStyles, IconButton, Typography, Button, ButtonGroup } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { bounceInLeft, fadeInDown, fadeOutUp } from 'react-animations'
import './NavBar.css';


const useStyles = theme => ({
    appbar: {
        display: 'flex',
        flexGrow :'1',
        position : 'relative',
        backgroundColor: 'rgba(0,0,0,0.5)'

    },
    bar: {
        flexGrow: 1,
        position: 'static',
        textAlign: 'center'
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },

    navItem: {
        padding: '20px'

    },

});

const animStyles = {
    bounceInLeft: {
        animation: 'x 1s',
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

        window.addEventListener('scroll', this.handleScroll);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }


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
        const { list } = this.props;
        return <StyleRoot >
            <div  >
                <AppBar id="appbar" className={classes.appbar} >

                    {!this.state.mobile &&
                        <Toolbar className={classes.bar}>

                            <ButtonGroup size="large" variant="text" >

                                {list.map((item) => (

                                    <Button className={classes.navItem}
                                        key={item.id}
                                        onClick={() => this.props.toggleItem(item.id, item.key)}>

                                        {item.title}

                                    </Button>

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
                                    className={classes.menuButton}
                                    color="inherit"
                                    aria-label="open drawer">

                                    <MenuIcon />
                                </IconButton>
                            </Toolbar>

                            { /** MOBILE DROPDOWN MENU */
                                this.state.listOpen &&
                                <div className={classes.bar} >
                                    <ButtonGroup orientation="vertical" variant="text">

                                        {list.map((item) => (

                                            <Typography
                                                className={classes.navItem}
                                                key={item.id}
                                                onClick={() => { this.toggleNavMenu(); this.props.toggleItem(item.id, item.key); }}>
                                                <span style={this.state.listOpen ? animStyles.bounceInLeft : null}>
                                                    {item.title}
                                                </span>
                                            </Typography>

                                        ))}


                                    </ButtonGroup>
                                </div>
                            }
                        </>

                    }
                </AppBar>

            </div>
        </StyleRoot>
    }
}
export default withStyles(useStyles)(NavBar);