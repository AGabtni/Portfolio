import React from 'react';
import Radium, { StyleRoot } from 'radium';
import {Input , TextField , withStyles, Typography, Paper } from '@material-ui/core';
import { bounceIn, bounceInDown } from 'react-animations';
import "./Contact.css";

const useStyles = theme => ({
    container: {
        display: "flex",
        width: "100%",
        padding: "50px",
        flexDirection: "column",
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
        animation: 'x 2s',
        animationName: Radium.keyframes(bounceInDown, 'bounceInDown'),


    },

    invisible: {

        opacity: '0.0',

        animationName: 'invisible'
    }

}


class Contact extends React.Component {


    constructor(props) {
        super(props);
        this.state = { "reveal": false };


    }



    componentDidMount() {
        document.addEventListener('scroll', this.trackScrolling);
    }

    componentWillUnmount() {
        document.removeEventListener('scroll', this.s);

    }

    //Is the element's top  visible on the client window
    isTop(el) {

        return el.getBoundingClientRect().top  <= window.innerHeight;

    }

    //Track scrolling to set state reveal to reveal-animate elements in this component
    trackScrolling = () => {
        const wrappedElement = document.getElementById('contact');
        if (this.isTop(wrappedElement)) {
            this.setState({ "reveal": true });
            document.removeEventListener('scroll', this.trackScrolling);

        }
    };
    render() {

        const { classes } = this.props;
        const { reveal } = this.state;
        console.log(reveal);

        return <StyleRoot  className={classes.container}>
             
            <div  style={reveal ? animStyles.bounceInDown : animStyles.invisible}>
                <Typography variant="h2" style={{ textAlign: "center", fontWeight: "700" }}>
                    Contact
                </Typography>
            </div>


            <div 
                style={reveal ? animStyles.bounceIn : animStyles.invisible}>
                <Paper  className={classes.experience}>

                    


                </Paper>
            </div>
        </StyleRoot>

    }
}
export default withStyles(useStyles)(Contact);