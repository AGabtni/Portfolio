import React from 'react';
import Radium, { StyleRoot } from 'radium';
import { Grid, withStyles, Typography, Button, Avatar, Tabs, Tab } from '@material-ui/core';
import SwipeableViews from 'react-swipeable-views';
import { bounceIn, bounceInDown, slideInLeft, flipInX, flipOutX } from 'react-animations';
import SimpleDialog from '../SimpleDialog/SimpleDialog';
import "./About.css";
import { workExperience } from './workExperience';
import { skills } from './skills';

const useStyles = theme => ({
    container: {
        display: "flex",
        padding: "100px",
        flexDirection: "column",
        justifyContent: "center",
        marginTop: 10,
        marginBottom: 100

    },

    gridList: {
        display: "flex",
        flexGrow: 1,
        padding: '20px',


    },

    title: {

        margin: "0 0 100px",
    },
    header: {
        textAlign: "center",
        fontWeight: "700",
        color: "#FFFFFF"
    },
    previewButton: {

        backgroundColor: "#2C3E50",
        color: "#FFFFFF"
    },
    tabs: {

        backgroundColor: "#2C3E50",
        borderRadius: '10px 10px 0 0',
        borderColor: "#1ABC9C"
    },
    tab: {
        fontWeight: '900',
        borderRight: '2px  solid ',
        backgroundColor: '#2C3E50'

    },
    slideContainer: {
        position: 'relative',
        display: 'flex',
        borderRadius: "0 0 10px 10px",
        

    },

    slide: {
        display: "flex",
        height: '100%',
        padding: 10,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",


    },
    skillAvatar: {
        display: 'flex',
        backgroundColor: 'rgba(0,0,0,0)',
        height: '150px',
        width: "150px",


    },
    skillTitle: {

        fontWeight: "700",
        marginTop: 50
    },
    svgContainer: {

        display: 'flex',
        margin: 10,
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'center',


    },
    skillsContainer: {

        display: 'flex',
        flexDirection: 'row',
    },
    logo1: {
        background: "url(../../res/svg/godot.svg)"
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
    slideInLeft: {
        animation: 'x 2s',
        animationName: Radium.keyframes(slideInLeft, 'slideInLeft'),


    },

    visible: {
        animationName: 'visible',
    },
    previewVisible: {
        opacity: '1.0',
        //backgroundColor: 'rgba(203,133,137,0.6)',
        backgroundColor:"#1ABC9C",
        animationName: 'previewVisible'

    },
    invisible: {
        filter: 'blur(8px)',
        animationName: 'invisible',


    },
    flipInX: {
        animation: 'x 2s',
        animationName: Radium.keyframes(flipInX, 'flipInX'),

    },

    flipOutX: {
        animation: 'x 1s',
        animationName: Radium.keyframes(flipOutX, 'flipOutX'),


    },

}


class About extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            "mobile": !window.matchMedia('(min-width : 768px)').matches,
            "reveal": false,
            "onHoverEnter1": false,
            "onHoverEnter2": false,
            "dialog1Open": false,
            "dialog2Open": false,
            index: 0,
            workExperience
        };


    }

    resize() {
        let mediaQuery = window.matchMedia('(min-width : 768px)')
        //Desktop view : 
        if (mediaQuery.matches) {
            this.setState({ "mobile": false })


        } else {

            this.setState({ "mobile": true })
        }


    }


    componentDidMount() {
        document.addEventListener('scroll', this.trackScrolling);
        window.addEventListener("resize", this.resize.bind(this));
    }



    //Is the element's top  visible on the client window
    isTop(el) {

        return el.getBoundingClientRect().top <= window.innerHeight;

    }

    handleChange = (event, value) => {
        this.setState({
            index: value,
        });
    };

    handleChangeIndex = index => {
        this.setState({
            index,
        });
    };
    //Hover handlers for exp 1 
    onHover1 = () => {
        this.setState({ "onHoverEnter1": !this.state.onHoverEnter1 })
    }

    handleClickOpen1 = () => {
        this.setState({ "dialog1Open": true });
    };

    //Hover handlers for exp 2
    onHover2 = () => {
        this.setState({ "onHoverEnter2": !this.state.onHoverEnter2 })
    }

    handleClickOpen2 = () => {
        this.setState({ "dialog2Open": true });
    };

    handleClose = value => {

        this.setState({
            "dialog1Open": false,
            "dialog2Open": false,
            "onHoverEnter1": false,
            "onHoverEnter2": false,
        });
    };

    //Track scrolling to set state reveal to reveal-animate elements in this component
    trackScrolling = () => {
        const wrappedElement = document.getElementById('about');
        if (this.isTop(wrappedElement)) {
            this.setState({ "reveal": true });
            document.removeEventListener('scroll', this.trackScrolling);

        }
    };

    createMarkup = content => {

        return { __html: content };
    }

    render() {

        const { classes } = this.props;
        const { reveal, onHoverEnter1, onHoverEnter2,
            dialog1Open, dialog2Open, workExperience,
            mobile, index } = this.state;


        //Combineclasses with the hover effect  : 
        var tabClass = classes.tab;
        tabClass += " hvr-pulse-shrink";
        return (<StyleRoot className={classes.container}>

            <div style={reveal ? animStyles.bounceInDown : animStyles.invisible}
                className={classes.title}>
                <Typography variant="h1" className={classes.header}>
                    About me
                </Typography>
            </div>

            <Typography variant="h2" className={classes.header}>
                Skills :
            </Typography>
            <div id={index} style={{ display: 'flex', flexDirection: "column", margin: "75px 0 75px" }}>
                <Tabs value={index} fullWidth onChange={this.handleChange} className={classes.tabs}>
                    <Tab style={{ color: "#FFFFFF" }} className={tabClass} label={skills[0].title} ></Tab>
                    <Tab style={{ color: "#FFFFFF" }} className={tabClass} label={skills[1].title} />
                    <Tab style={{ color: "#FFFFFF" }} className={tabClass} label={skills[2].title} />
                </Tabs>

                <SwipeableViews enableMouseEvents
                    index={index}
                    onChangeIndex={this.handleChangeIndex}
                    className={classes.slideContainer}>

                    {
                        skills.map(skill => (
                            <div
                                className={classes.slide} style={{ background: skill.color }}>
                                <div className={classes.skillTitle}>
                                    <Typography style={{ fontWeight: '700' }} variant="h5" >
                                        {skill.title}
                                    </Typography>
                                </div>
                                <Grid container justify="center" className={classes.gridList} spacing={2}>
                                    {
                                        skill.svgElements.map((svgElement, i) => (
                                            <Avatar variant="rounded" className={classes.skillAvatar}>
                                                <div
                                                    className={classes.svgContainer}
                                                    style={index === skill.id ? animStyles.flipInX : animStyles.flipOutX}
                                                    dangerouslySetInnerHTML={this.createMarkup(svgElement)}>

                                                </div>
                                            </Avatar>

                                        ))
                                    }
                                </Grid>
                            </div>
                        ))
                    }

                </SwipeableViews >

            </div>
            <Typography variant="h2" className={classes.header}>
                Working experience :
            </Typography>
            <Grid container justify="center" className={classes.gridList} spacing={2} >


                <div
                    onMouseEnter={this.onHover1}
                    onMouseLeave={this.onHover1}
                    onClick={!onHoverEnter1 && mobile ? this.onHover1 : null}
                    className="experience"
                    id="container"
                    style={reveal ? animStyles.slideInLeft : animStyles.invisible}>

                    <div
                        className="experience-intro"
                        style={onHoverEnter1 ? animStyles.invisible : animStyles.visible}>
                        <Typography variant="h4" style={{ fontWeight: "700" }}>
                            {workExperience[0].title}
                        </Typography>



                    </div>
                    <div className="preview"
                        style={!onHoverEnter1 ? animStyles.invisible : animStyles.previewVisible}>
                        <Button
                            onClick={this.handleClickOpen1}
                            className={classes.previewButton}
                            variant="contained">
                            <Typography>More about it</Typography>
                        </Button>
                    </div>



                </div>


                <div
                    onMouseEnter={this.onHover2}
                    onMouseLeave={this.onHover2}
                    onClick={!onHoverEnter2 && mobile ? this.onHover2 : null}
                    className="experience"
                    id="container2"
                    style={reveal ? animStyles.slideInLeft : animStyles.invisible}>

                    <div
                        style={onHoverEnter2 ? animStyles.invisible : animStyles.visible}
                        className="experience-intro">
                        <Typography variant="h4" style={{ fontWeight: "700" }}>
                            {workExperience[1].title}
                        </Typography>



                    </div>
                    <div className="preview"
                        style={!onHoverEnter2 ? animStyles.invisible : animStyles.previewVisible}>
                        <Button
                            onClick={this.handleClickOpen2}
                            className={classes.previewButton}
                            variant="contained">
                            <Typography>More about it</Typography>
                        </Button>
                    </div>

                </div>

            </Grid>

            <SimpleDialog
                key={workExperience[0].id}
                title={workExperience[0].title}
                description={workExperience[0].description}
                duration={workExperience[0].duration}
                employer={workExperience[0].employer}
                open={dialog1Open}
                onClose={this.handleClose} />
            <SimpleDialog
                key={workExperience[1].id}
                title={workExperience[1].title}
                description={workExperience[1].description}
                duration={workExperience[1].duration}
                employer={workExperience[1].employer}
                open={dialog2Open}
                onClose={this.handleClose} />
        </StyleRoot>)

    }
}
export default withStyles(useStyles)(About);