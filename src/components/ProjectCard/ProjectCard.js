import React from 'react';
import { StyleRoot } from 'radium';
import { Paper, withStyles, Typography, Button } from '@material-ui/core';
//import { bounceIn } from 'react-animations'

import './ProjectCard.css';


const useStyles = theme => ({
    container: {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '300px',
        minWidth: '300px',
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '10px',
        margin: "10px",
        backgroundColor: "#1ABC9C",

    },

    header: {
        color: "#FFFFFF",
        textAlign: "center", 
        fontWeight: "700", 
        margin: 10
    },

    button:{
        display: "flex", 
        margin: '20px',
        color: "#FFFFFF",
        backgroundColor: "#2C3E50",
    }



});




class ProjectCard extends React.Component {




    constructor(props) {

        super(props);

        const { link, repo } = props
        this.state = { "link": link, "repo": repo };


        this.handleClickLink = this.handleClickLink.bind(this);
        this.handleClickRepo = this.handleClickRepo.bind(this);

    }


    handleClickLink() {
        window.open(this.state.link, "Project", "menubar=yes,location=yes,resizable=yes,scrollbars=yes,status=yes");
    }

    handleClickRepo() {
        window.open(this.state.repo, "Repository", "menubar=yes,location=yes,resizable=yes,scrollbars=yes,status=yes");
    }

    componentDidMount() {


    }

    componentWillUnmount() {

    }


    render() {

        const { classes, title, link, repo } = this.props;


        return <StyleRoot className="project-card hvr-bob">

            {title.length > 0 &&
                <Paper className={classes.container}>
                    <Typography variant="h2" className={classes.header}>
                        <div>{title}</div>
                    </Typography>
                    {link.length > 0 &&
                        <>
                            <Button
                                variant="contained"
                                onClick={this.handleClickLink}
                                className={classes.button}>

                                <Typography variant="h6" style={{ fontWeight: "700" }}>live demo</Typography>

                            </Button>
                        </>




                    }
                    {
                        repo.length > 0 &&
                        <>
                            <Button

                                variant="contained"
                                onClick={this.handleClickRepo}
                                className={classes.button}>

                                <Typography variant="h6" style={{ fontWeight: "700" }}>github repository</Typography>

                            </Button>
                        </>



                    }
                </Paper>

            }
        </StyleRoot>
    }
}
export default withStyles(useStyles)(ProjectCard);