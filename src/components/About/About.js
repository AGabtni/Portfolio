import React from 'react';
import Radium, { StyleRoot } from 'radium';
import { Grid, Container, withStyles, IconButton, Typography, Button, GridList, GridListTile } from '@material-ui/core';
import { bounceIn } from 'react-animations'


const useStyles = theme => ({
    container: {
        display: "flex",
        flexGrow: 1,
        paddingTop: "150px",
        flexDirection : "column"
    },

    gridList: {
        marginTop : '100px',
        display: "flex",
        flexGrow: 1,
        
    }
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


class About extends React.Component {


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


    isTop(el) {

        return el.getBoundingClientRect().top + 100 <= window.innerHeight;

    }

    trackScrolling = () => {
        const wrappedElement = document.getElementById('about');
        if (this.isTop(wrappedElement)) {
            this.setState({ "reveal": true });
            document.removeEventListener('scroll', this.trackScrolling);

        }
    };
    render() {

        const { classes } = this.props;
        const { reveal } = this.state;
        const { projects } = this.state;
        console.log(projects);

        return <StyleRoot >
            <Container maxWidth="lg" className={classes.container}>
                <div  style={reveal ? animStyles.bounceIn : animStyles.invisible} >
                    <Typography variant="h2" style={{ textAlign: "center", fontWeight: "700" }}>
                        About me
                    </Typography>
                </div>
                
                <Grid justify="center"  container   className={classes.gridList} >



                </Grid>
            </Container>
        </StyleRoot>
    }
}
export default withStyles(useStyles)(About);