import React, { Component } from 'react';
import { OverlayTrigger, Button, Popover } from 'react-bootstrap';
import "./DatesSelection.css"
import ColorMap from "./ColorMap.js"
import Availability from "./Availability.js"
import Availability2 from './Availability2.js'
import { db } from './FirestoreConfig';

const popoverHoverFocus = (
    <Popover id="freBrew" title="Fremont Brewery">
      <b>0.2 miles from you</b> <br />
      <b>$</b> <br />
      This kid and dog friendly beer hall with bench 
      tables serves up seasonal ales and free pretzels.
    </Popover>
  );

const popoverHoverFocus2 = (
    <Popover id="schilling" title="Schilling Ciderhouse">
      <strong>0.2 miles from you</strong> <br />
      <b>$ </b>
      <br />
      Cozy tasting bar with 30+ craft ciders, on tap and in bottles. 
    </Popover>
  );

  const popoverHoverFocus3 = (
    <Popover id="bakdoor" title="The Backdoor">
      <strong>0.3 miles from you</strong> <br />
      <b>$ </b>
      <br />
      Speakeasy-style lounge behind Roxy's Diner, for cocktails, small plates and occasional live music.
    </Popover>
  );

  const popoverHoverFocus4 = (
    <Popover id="barrel" title="The Barrel Thief">
      <strong>0.3 miles from you</strong> <br />
      <b>$ </b>
      <br />
      Inventive cocktails and small plates in a warm, eco-friendly setting with regular tastings and classes.
    </Popover>
  );
  
class DateNames extends Component {
    constructor(props) {
        super(props);
        this.state = {
          showComponent: false,
          availability: false,
          datesShown: true,
          mapButtonText: "View on Map",
          location: "",
          nextButton: "next",
          nextButtonValue: "Next",
          dateAvailability: this.props.availability
        };
        this._onButtonClick = this._onButtonClick.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.getData = this.getData.bind(this);
        this.buttonOneClick = this.buttonOneClick.bind(this);
        this.buttonTwoClick = this.buttonTwoClick.bind(this);
        this.buttonThreeClick = this.buttonThreeClick.bind(this);
        this.buttonFourClick = this.buttonFourClick.bind(this);
      }

      componentDidMount(){
        console.log("CHECK PROPS", this.props.availability);
      }
    

      componentWillReceiveProps(){
        console.log("CHECK PROPS", this.props.availability);
      }
    
      _onButtonClick() {
        this.setState(prevState => ({
            showComponent: !prevState.showComponent,
            availability: false,
            datesShown: !prevState.datesShown,
            mapButtonText: "Return to List",
            location: prevState.location
          }));
      }
    
      handleClick() {
        this.props.submitDate();
        this.setState(oldState => ({
            showComponent: false,
            availability: true,
            datesShown: false,
            mapButtonText: "",
            location : oldState.location,
            nextButton: "nextClicked",
            nextButtonValue: "",
          }));
      }

      getData(startArr){
        console.log("Start DateNames Array", startArr);
        this.props.sendData(startArr, this.state.location);
      }

      buttonOneClick(){
        console.log("oneclick")
        this.setState({
          location : "Fremont Brewery"
        });
      }

      buttonTwoClick(){
        console.log("twoclick")
        this.setState({
          location : "Schilling Ciderhouse"
        });
      }

      buttonThreeClick(){
        this.setState({
          location : "The Backdoor"
        });
      }

      buttonFourClick(){
        this.setState({
          location : "The Barrel Thief"
        });
      }

  render () {
        return (
            <div id = "datebackground">
            {this.state.datesShown && 
             <div>
             <h3 id = "halfwayText"> Let's meet halfway! </h3>
                <div class="btn-group-vertical">
                <OverlayTrigger
                    trigger={['hover', 'focus']}
                    placement="bottom"
                      overlay={popoverHoverFocus}
                >
                     <Button id = "dateone" onClick={this.buttonOneClick} >FREMONT BREWERY</Button>
                </OverlayTrigger>
    
                <OverlayTrigger
                trigger={['hover', 'focus']}
                placement="bottom"
                overlay={popoverHoverFocus2}
                >
                <Button id ="datetwo" onClick={this.buttonTwoClick}>SCHILLING CIDERHOUSE</Button>
                </OverlayTrigger>
    
    
                <OverlayTrigger
                trigger={['hover', 'focus']}
                placement="bottom"
                overlay={popoverHoverFocus3}
                >
                <Button id = "datethree" onClick={this.buttonThreeClick}>THE BACKDOOR</Button>
                </OverlayTrigger>
    
                <OverlayTrigger
                trigger={['hover', 'focus']}
                placement="bottom"
                overlay={popoverHoverFocus}
                >
                <Button id = "datefour" onClick={this.buttonFourClick}>THE BARREL THIEF</Button>
                </OverlayTrigger>
                </div>
          </div>}

            <div class="btn-group-vertical">
           <Button id ="mapview" onClick={this._onButtonClick}> {this.state.mapButtonText} </Button>
            {this.state.showComponent ?
               <ColorMap /> :
               null
            }

            <Button id ={this.state.nextButton} onClick={this.handleClick} value="Next"> {this.state.nextButtonValue} </Button>
            {this.state.availability ?
               <Availability2 userEmail= {this.props.userEmail} sendData={this.getData} initialStart = {this.state.dateAvailability} currAvailability = {this.state.dateAvailability}/> :
               null
            }
            </div>
            </div>
        );
    }
}

export default DateNames;