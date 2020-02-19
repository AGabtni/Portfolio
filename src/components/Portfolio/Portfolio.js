import React from 'react';
import Radium, { StyleRoot } from 'radium';
import { Container , withStyles, IconButton, Typography, Button  } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { bounceIn } from 'react-animations'
import './Portfolio.css';


const useStyles = theme => ({
    container: {
        
        margin : "10px",

    },
    


});

const animStyles = {
    
    bounceIn: {
        animation: 'x 3s',
        animationName: Radium.keyframes(bounceIn, 'bounceIn'),

    },

    invisible : {

        opacity : '0.0',
    }
    
    
}


class Portfolio extends React.Component {


    constructor(props) {
        super(props);
        this.state = {"reveal":  false};
        
    }



    componentDidMount() {
        document.addEventListener('scroll', this.trackScrolling);

    }

    componentWillUnmount() {
        document.removeEventListener('scroll', this.trackScrolling);

    }


    isTop(el){

        return el.getBoundingClientRect().top + 100 <= window.innerHeight;
      
      }

      trackScrolling = () => {
        const wrappedElement = document.getElementById('portfolio');
        if (this.isTop(wrappedElement)) {
            this.setState({"reveal" : true});
            document.removeEventListener('scroll', this.trackScrolling);
          
        }
      };
    render() {

       const {classes} = this.props;
       const {reveal} = this.state;
        return <StyleRoot >
                  <Container id="portfolio"  maxWidth="lg" className={classes.container}>
                    <Typography component="div" 
                               
                                style={{ backgroundColor: 'white', height: '200vh' }} >
                        <Typography  variant="h2" style={{ textAlign: "center", fontWeight : "700"}}>                    
                            <div style={reveal ? animStyles.bounceIn : animStyles.invisible} >
                                Portfolio

                            </div>

                        </Typography>

                    </Typography>
                </Container>
    </StyleRoot>
    }
}
export default withStyles(useStyles)(Portfolio);