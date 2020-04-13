import React from 'react';
import  { StyleRoot } from 'radium';
import {  withStyles, Typography } from '@material-ui/core';


const useStyles = theme => ({
    container: {
        display: "flex",
        height : "50px",
        flexDirection: "column",
        justifyContent : 'center',
        color: "#CA6265 ",
        fontWeight : "900"

    },

  
});


class Footer extends React.Component {


    



    componentDidMount() {
    }

    componentWillUnmount() {

    }


    
    
    render() {

        const { classes } = this.props;
        

        return <StyleRoot className={classes.container} >
             
             <Typography variant="h6" style={{margin: 10, fontSize : 15 , fontWeight: 700}}>© 2020 Ahmed Gabtni</Typography>



        </StyleRoot>

    }
}
export default withStyles(useStyles)(Footer);