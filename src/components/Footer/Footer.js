import React from 'react';
import { StyleRoot } from 'radium';
import { withStyles, Typography } from '@material-ui/core';


const useStyles = theme => ({
    container: {
        display: "flex",
        height: "50px",
        flexDirection: "column",
        justifyContent: 'center',
        fontWeight: "900",
        justifyContent : "center"

    },

    text:{
        margin: 10, 
        fontSize: 15, 
        fontWeight: 700 ,
        color : "#FFFFFF"
    }
});


class Footer extends React.Component {






    componentDidMount() {}

    componentWillUnmount() {

    }




    render() {

        const { classes } = this.props;


        return <StyleRoot className = { classes.container } >

            <Typography variant = "h6" className={ classes.text } > ©2020 Ahmed Gabtni </Typography>



        </StyleRoot>

    }
}
export default withStyles(useStyles)(Footer);