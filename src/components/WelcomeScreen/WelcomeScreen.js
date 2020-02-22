import React from 'react';
import Radium, { StyleRoot } from 'radium';
import {  withStyles, Typography, Paper } from '@material-ui/core';
import { bounceIn, bounceInDown } from 'react-animations'


const useStyles = theme => ({
    container: {
        display: "flex",
        width: "100%",
        padding: "50px",
        flexDirection: "column",
        marginTop: '100px',
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
        if (window.scrollY < window.innerHeight && window.scrollY >= 0  ) {
            this.setState({ "reveal": true });
            document.removeEventListener('scroll', this.trackScrolling);

        }
    };
    render() {

        const { classes } = this.props;
        const { reveal } = this.state;
        console.log(reveal);

        return <StyleRoot className={classes.container}>
             
            <div style={reveal ? animStyles.bounceInDown : animStyles.invisible}>
                <Typography variant="h2" style={{ textAlign: "center", fontWeight: "700" }}>
                    Ahmed Gabtni
                </Typography>
            </div>


        </StyleRoot>

    }
}
export default withStyles(useStyles)(WelcomeScreen);