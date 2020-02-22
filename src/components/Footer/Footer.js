import React from 'react';
import Radium, { StyleRoot } from 'radium';
import {  withStyles, Typography, Paper } from '@material-ui/core';
import { bounceIn, bounceInDown } from 'react-animations'


const useStyles = theme => ({
    container: {
        display: "flex",
        width: "100%",
        flexDirection: "column",
        alignItems : 'center',
        backgroundColor: "white"
    },

  
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

    scaleDown: {

        transform: "scale(0,0)",
        animationName: "scaleDown",
        transition: 'transform 500ms'
    },
    scaleUp: {

        transform: "scale(1,1)",
        animationName: "scaleUp",
        transition: 'transform 500ms'
    }   

}


class Footer extends React.Component {


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


    //Is the element's top  visible on the client window
    isAtBottomDocument() {

        return window.scrollY+window.innerHeight >= document.body.scrollHeight-10;

    }
    //Track scrolling to set state reveal to reveal-animate elements in this component
    trackScrolling = () => {

        if (this.isAtBottomDocument()) {

            this.setState({ "reveal": true });
            const wrappedElement = document.getElementById('footer');

            if(wrappedElement.classList.contains("footer-hide")){
                wrappedElement.classList.remove("footer-hide")
                wrappedElement.classList.add("footer-reveal")
                document.removeEventListener('scroll', this.trackScrolling);
                console.log(wrappedElement.classList)

            }

        }
    };
    render() {

        const { classes } = this.props;
        const { reveal } = this.state;
        
        console.log(reveal);

        return <StyleRoot className={classes.container} >
             
             <p>© 2018 Gandalf</p>



        </StyleRoot>

    }
}
export default withStyles(useStyles)(Footer);