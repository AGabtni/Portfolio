import React from 'react';
import Radium, { StyleRoot } from 'radium';
import { Grid, Container, withStyles, Typography } from '@material-ui/core';
import { bounceIn, bounceInDown } from 'react-animations'
import './Portfolio.css';

import ProjectCard from '../ProjectCard/ProjectCard';
import { projects } from './projects';

const useStyles = theme => ({
    container: {
        display: "flex",
        flexGrow: 1,
        margin: "100px 0 50px 0 ",
        flexDirection: "column",
        color: "#2C3E50",

    },

    gridList: {
        marginTop: '100px',
        display: "flex",
        flexGrow: 1,
        padding: '20px'

    },

    header:{
        textAlign: "center", 
        fontWeight: "700",
        color: "#2C3E50",

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
    }


}


class Portfolio extends React.Component {


    constructor(props) {
        super(props);
        this.state = { "reveal": false, projects };


    }



    componentDidMount() {
        document.addEventListener('scroll', this.trackScrolling);
    }

    componentWillUnmount() {
        document.removeEventListener('scroll', this.trackScrolling);

    }

    //Is the element's top  visible on the client window
    isTop(el) {

        return el.getBoundingClientRect().top <= window.innerHeight;

    }

    //Track scrolling to set state reveal to reveal-animate elements in this component
    trackScrolling = () => {
        const wrappedElement = document.getElementById('portfolio');
        if (this.isTop(wrappedElement)) {
            this.setState({ "reveal": true });
            document.removeEventListener('scroll', this.trackScrolling);

        }
    };
    render() {

        const { classes } = this.props;
        const { reveal } = this.state;
        const { projects } = this.state;

        return <StyleRoot>
            <Container maxWidth="lg" className={classes.container} >



                <div style={reveal ? animStyles.bounceInDown : animStyles.invisible} >
                    <Typography variant="h1" className={classes.header}>
                        Projects
                    </Typography>
                </div>

                <Grid container justify="center" className={classes.gridList} spacing={2} >



                    {projects.map((item) => (

                        <ProjectCard
                            key={item.id}
                            title={item.title}
                            img={item.img}
                            link={item.link}
                            repo={item.repo}
                        >

                        </ProjectCard>


                    ))}
                </Grid>
            </Container>
        </StyleRoot>
    }
}
export default withStyles(useStyles)(Portfolio);