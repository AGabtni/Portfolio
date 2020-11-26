import React from 'react';
import Radium, { StyleRoot } from 'radium';
import {  withStyles, Typography, Button } from '@material-ui/core';
import { bounceIn, bounceInDown, bounceOutDown } from 'react-animations';
import { env } from "../../config";
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
const useStyles = theme => ({
    container: {
        display: "flex",
        flexDirection: "column",
        marginTop: "100px",
        backgroundColor: "#2C3E50",
    },

    wrapper: {

        display: "flex",
        flexDirection: "column",

    },

    contactContainer: {

        padding: "100px",
        display: "flex",

        flexDirection: "column",
        backgroundColor: "rgba(0,0,0,0)",
        alignItems: "center"

    },

    overlayContainer : {

        position: "absolute",
        left: "0",
        top: "0",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection : "column",
        justifyContent: "center",
        textAlign : "center",
        
    },


    inputField: {
        marginTop: "50px",
        minWidth: "300px",
        color : "#FFFFFF",
        backgroundColor: "#2C3E50"

    },

    submitButton: {
        marginTop: "50px",
        minWidth: "150px",
        backgroundColor : "#1ABC9C",
        color : "#FFFFFF"

    },


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

    bounceOutDown: {

        animation: 'x 2.5s',
        animationName: Radium.keyframes(bounceOutDown, 'bounceOutDown'),
        opacity: '0.01',
        scale : '0.01',
        transition: ' opacity  1.5s  0.5s ease-in, scale  2s  0.5s ease-in',
    },



}


class Contact extends React.Component {
   
  

    constructor(props) {
        super(props);
        this.state = { "reveal": false };
        this.state = {"senderEmail": ''};
        this.state = {"senderName" : ''};
        this.state = {"message": ''};
        this.state = {"formSubmitted": false};

    }

    
    //Message submission handlers : 
    handleCancel = () =>{
        
        this.setState({
            "message": ''            
        });
    }

    handleChange = (event) =>{
        this.setState({
            "message": event.target.value
          });

    }

    //Email submission handlers : 
    handleEmailCancel = () =>{
        
        this.setState({
            "senderEmail": ''            
        });
    }

    handleEmailChange = (event) =>{
        this.setState({
            "senderEmail": event.target.value
          });

    }
    //Name submission handlers : 
    
    handleNameCancel = () =>{
        
        this.setState({
            "senderName": ''            
        });
    }

    handleNameChange = (event) =>{
        this.setState({
            "senderName": event.target.value
          });

    }
    



    handleSubmit=(event)=> {
        event.preventDefault();
        const {
            REACT_APP_EMAILJS_SERVICEID : service,
            REACT_APP_EMAILJS_TEMPLATEID: template,
            REACT_APP_EMAILJS_USERID: user,
          } = env;

  
        this.sendmessage(
            service,
            template,
            this.state.senderEmail,
            this.state.senderName,
            this.state.message,
            user
        )

        
    }

    sendmessage(service,templateId, senderEmail,senderName, senderMessage, user) {

        
        window.emailjs.send(
            service, 
            templateId,
            {
                senderEmail,
                senderName,
                senderMessage
            },
            user
        )
            .then(res => {

                this.setState({ 
                    "senderEmail": '' ,
                    "senderName": '' ,
                    "message": '',
                    "formSubmitted": true
                })


            })
            // Handle errors here however you like, or use a React error boundary
            .catch(err => console.error('Failed to send message. Error: ', err))
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
        const { formSubmitted} = this.state;
        var inputField = classes.inputField;
        inputField += " hvr-float-shadow";
        return <StyleRoot className={classes.container}>

            <div style={reveal ? animStyles.bounceInDown : animStyles.bounceOutDown}>
                <Typography variant="h1" style={{ textAlign: "center", fontWeight: "700" }}>
                    Contact
                </Typography>
            </div>

            <ValidatorForm 
                className={classes.contactContainer}
                style={ !formSubmitted ? animStyles.bounceInDown : animStyles.bounceOutDown}
                onSubmit={this.handleSubmit} >
                <TextValidator className={inputField}
                    multiline
                    id="outlined-multiline-static"
                    name="name"
                    label="Name"
                    variant="outlined"
                    margin="normal"
                    validators={['required']}
                    errorMessages={['this field is required']}
                    value= {this.state.senderName}
                    onChange = {this.handleNameChange}
                    onClick = {this.handleNameCancel} />

                <TextValidator
                    multiline
                    className={inputField}
                    id="outlined-multiline-static"
                    label="E-mail"
                    variant="outlined"
                    margin="normal"
                    validators={['required', 'isEmail']}
                    errorMessages={['this field is required', 'email is not valid']}
                    value={this.state.senderEmail}
                    onChange={this.handleEmailChange}
                    onClick={this.handleEmailCancel} />


                <TextValidator
                    className={inputField}
                    id="outlined-multiline-static"
                    label="Message"
                    multiline
                    rows="10"
                    variant="outlined"
                    margin="normal"
                    validators={['required']}
                    errorMessages={['this field is required']}
                    onChange={this.handleChange}
                    onClick={this.handleCancel}
                    value={this.state.message} />

                
                <Button variant="contained"
                    type = "submit"
                    className={classes.submitButton}>
                        <Typography variant="h6"> Submit </Typography>
                </Button>

            </ValidatorForm>

            <div 
                className={classes.overlayContainer}
                style={formSubmitted ? animStyles.bounceInDown : animStyles.bounceOutDown }>
                <Typography variant="h1">Message received</Typography>
            </div>
        </StyleRoot>

    }
}
export default withStyles(useStyles)(Contact);