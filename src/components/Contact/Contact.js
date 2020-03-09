import React from 'react';
import Radium, { StyleRoot } from 'radium';
import { Input, TextField, withStyles, Typography, Paper } from '@material-ui/core';
import { bounceIn, bounceInDown } from 'react-animations';
import "./Contact.css";

const useStyles = theme => ({
    container: {
        display: "flex",
        width: "100%",
        height: "100vh",
        flexDirection: "column",
        marginTop: "100px",
    },

    wrapper: {

        display: "flex",
        flexDirection: "column",

    },

    contactContainer: {
        padding: "50px",
        display: 'flex',
        flexDirection: "row",
        backgroundColor: "rgba(0,0,0,0)",
        alignItems: "start"
    },

    container: {


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
    },



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

        return el.getBoundingClientRect().top <= window.innerHeight;

    }

    //Track scrolling to set state reveal to reveal-animate elements in this component
    trackScrolling = () => {
        const wrappedElement = document.getElementById('contact');
        if (this.isTop(wrappedElement)) {
            this.setState({ "reveal": true });
            document.getElementById('curve').classList.add("curve-animate");
            document.removeEventListener('scroll', this.trackScrolling);

        }
    };
    render() {

        const { classes } = this.props;
        const { reveal } = this.state;
        console.log(reveal);
        var inputField = classes.inputField;
        inputField += " hvr-float-shadow";
        return <StyleRoot className={classes.container}>

            <div style={reveal ? animStyles.bounceInDown : animStyles.invisible}>
                <Typography variant="h2" style={{ textAlign: "center", fontWeight: "700" }}>
                    Contact
                </Typography>
            </div>


            <div className={classes.contactContainer}
                style={reveal ? animStyles.bounceInDown : animStyles.invisible} >
                <div className={classes.wrapper}>
                    <TextField className={inputField}
                        id="outlined-basic"
                        name="name"
                        label="Name"
                        variant="outlined"
                        margin="normal" />
                    <TextField className={inputField}
                        id="outlined-basic"
                        name="email"
                        label="E-mail"
                        variant="outlined"
                        margin="normal" />

                    <TextField
                        className={inputField}
                        id="outlined-multiline-static"
                        label="Message"
                        multiline
                        rows="10"
                        variant="outlined"
                        margin="normal" />
                </div>

            </div>
        </StyleRoot>

    }
}
export default withStyles(useStyles)(Contact);