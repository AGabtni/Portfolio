import React from 'react';
import Radium, { StyleRoot } from 'radium';
import { Paper, withStyles, Typography, Button } from '@material-ui/core';
import { bounceIn } from 'react-animations'

import './ProjectCard.css';


const useStyles = theme => ({
    container: {

        minHeight: '300px',
        minWidth: '300px',
        textAlign: 'center',
        alignItems : 'center',
        justifyContent: 'center',
        padding: '10px'
    },



});

const animStyles = {

    bounceIn: {
        animation: 'x 3s',
        animationName: Radium.keyframes(bounceIn, 'bounceIn'),

    },

    invisible: {

        opacity: '0.0',
    }


}


class ProjectCard extends React.Component {




    componentDidMount() {

    }

    componentWillUnmount() {

    }


    render() {

        const { classes } = this.props;
        const { title } = this.props;
        return <StyleRoot >
            <Paper className={classes.container}>

                <Typography variant="h2" style={{ textAlign: "center", fontWeight: "700" }}>
                    <div>
                        {title}

                    </div>
                    <Button>
                        <Typography variant="h5">
                            hello
                        </Typography>
                    </Button>
                </Typography>

            </Paper>
        </StyleRoot>
    }
}
export default withStyles(useStyles)(ProjectCard);