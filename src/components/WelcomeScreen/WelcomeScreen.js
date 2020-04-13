import React from 'react';
import Radium, { StyleRoot } from 'radium';
import { withStyles, Typography, Button } from '@material-ui/core';
import { bounceIn, bounceInDown } from 'react-animations'
import './WelcomeScreen.css';


const useStyles = theme => ({
    container: {
        display: "flex",
        width: "100%",
        padding: "50px",
        flexDirection: "column",
        textAlign: "center",
        marginTop: '100px',
    },

    buttonContainer: {
        
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        height: "100%"  

    },

    buttonContent:{
        fontWeight : "700",
        fontSize: "x-large"

    },

    gridList: {
        marginTop: '100px',
        display: "flex",
        flexGrow: 1,

    },

    experience: {
        padding: "30px",
        marginTop: '100px',
        marginBottom: '100px',
        flexDirection: "row",


    }
});

const animStyles = {

    bounceIn: {
        animation: 'x 3s',
        animationName: Radium.keyframes(bounceIn, 'bounceIn'),

    },
    bounceInDown: {
        animation: 'x 1s',
        animationName: Radium.keyframes(bounceInDown, 'bounceInDown'),


    },

    invisible: {

        opacity: '0.0',

        animationName: 'invisible'
    }

}


class WelcomeScreen extends React.Component {


    constructor(props) {
        super(props);
        this.state = { "reveal": false };


    }



    componentDidMount() {
        document.addEventListener('scroll', this.trackScrolling);
    }

    componentWillUnmount() {
        document.removeEventListener('scroll', this.trackScrolling);

    }



    //Track scrolling to set state reveal to reveal-animate elements in this component
    trackScrolling = () => {
        if (window.scrollY < window.innerHeight && window.scrollY >= 0) {
            this.setState({ "reveal": true });
            document.removeEventListener('scroll', this.trackScrolling);

        }
    };

    toggleButton = () => {

        document.querySelector("#portfolio").scrollIntoView({ behavior: 'smooth' });
    };

    render() {

        const { classes } = this.props;

        return <StyleRoot className={classes.container}>

            <div style={animStyles.bounceInDown}>
                <Typography variant="h2" style={{ textAlign: "center", fontWeight: "900" }}>
                    Ahmed Gabtni
                </Typography>

            </div>
            <div className={classes.buttonContainer}>
                <Button className="nav-button draw"
                    onClick={this.toggleButton}
                    size="large">
                    <Typography className={classes.buttonContent} >
                        view my resume
                    </Typography>
                </Button>
            </div>

        </StyleRoot>
    
    }
}
export default withStyles(useStyles)(WelcomeScreen);