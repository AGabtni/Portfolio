import React from 'react';
import { StyleRoot } from 'radium';
import {  ListItem, withStyles, Typography, 
        Dialog, DialogTitle, Icon, DialogContent,Paper,DialogContentText  } from '@material-ui/core';
//import { bounceIn } from 'react-animations'



const useStyles = theme => ({


    dialogContainer: {

        display: "flex",
        flexDirection : "column",
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "#2C3E50",
        border: "10px solid #2C3E50",
        color: "white"


    },

    dialogTitle: {

        justifyContent: "center",
        textAlign: "center",
        fontWeight: "700",

    },
    employer:{
        marginTop : 20,
        color: "white",
        fontStyle: "italic"


    },
    timeStamp: {

        marginTop : 20,
        fontWeight : "700",
        color: "white"

    },
    listItemText : {
        color: "white",

    },

});




class SimpleDialog extends React.Component {


    


    componentDidMount() {

    }

    componentWillUnmount() {

    }
    handleClose = () => {
        const { selectedValue, onClose } = this.props;
        onClose(selectedValue);
    };

    render() {

        const { classes, open, title, description, duration, employer } = this.props;

        return (<StyleRoot>
            <Dialog       
                aria-labelledby="responsive-dialog-title"
                aria-describedby="responsive-dialog-description"
                onClose={this.handleClose}
                open={open}
                >
                <Paper className={classes.dialogContainer}>
                <DialogTitle  id="responsive-dialog-title" >
                        <Typography className={classes.dialogTitle} variant="h5">{title}</Typography>
                    </DialogTitle>
                <DialogContent   id="responsive-dialog-description">
                    <DialogContentText>
                        <Typography className={classes.employer} variant="body1">{employer}</Typography>
                        <Typography className={classes.timeStamp} variant="body1">{duration}</Typography>

                    </DialogContentText>    
                    <DialogContentText style={{color: "white"}}>
                        {   
                            description.map(desc => (
                                <ListItem>
                                    <Icon className={classes.listItemText}>label_important</Icon>
                                    <Typography variant="body1"> {desc} </Typography>
                                </ListItem>
                            ))
                        }
                    </DialogContentText>

                </DialogContent>
                </Paper>
            </Dialog>
        </StyleRoot>
        )
    }
}
export default withStyles(useStyles)(SimpleDialog);