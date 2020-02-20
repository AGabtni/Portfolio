import React from 'react';
import Radium, { StyleRoot } from 'radium';
import { Grid, Container, withStyles, IconButton, Typography, Button, GridList, GridListTile } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { bounceIn } from 'react-animations'
import './Portfolio.css';

import ProjectCard from '../ProjectCard/ProjectCard';
import { projects } from './projects';

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


    isTop(el) {

        return el.getBoundingClientRect().top + 100 <= window.innerHeight;

    }

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
        console.log(projects);

        return <StyleRoot >
            <Container maxWidth="lg" className={classes.container}>
                <div  style={reveal ? animStyles.bounceIn : animStyles.invisible} >
                    <Typography variant="h2" style={{ textAlign: "center", fontWeight: "700" }}>
                        Portfolio
                    </Typography>
                </div>
                
                <Grid justify="center"  container   className={classes.gridList} >



                        {projects.map((item) => (

                            <ProjectCard
                                key={item.id}
                                title={item.title}
                            >

                            </ProjectCard>


                        ))}
                </Grid>
            </Container>
        </StyleRoot>
    }
}
export default withStyles(useStyles)(Portfolio);