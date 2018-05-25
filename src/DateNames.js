import React, { Component } from 'react';
import { OverlayTrigger, Button, Popover } from 'react-bootstrap';
import "./DatesSelection.css"
import ColorMap from "./ColorMap.js"
import Availability from "./Availability.js"

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
          availability: false
        };
        this._onButtonClick = this._onButtonClick.bind(this);
        this.handleClick = this.handleClick.bind(this);
      }
    
      _onButtonClick() {
        this.setState(prevState => ({
            showComponent: !prevState.showComponent,
            availability: false
          }));
      }
    
      handleClick() {
        this.setState(oldState => ({
            showComponent: false,
            availability: !oldState.availability
          }));
      }

  render () {
        return (
            <div>
            <p> Let's meet halfway! </p>
            <div class="btn-group-vertical">
            <OverlayTrigger
                trigger={['hover', 'focus']}
                placement="bottom"
                  overlay={popoverHoverFocus}
            >
                 <Button id = "dateone" >FREMONT BREWERY</Button>
            </OverlayTrigger>

            <OverlayTrigger
            trigger={['hover', 'focus']}
            placement="bottom"
            overlay={popoverHoverFocus2}
            >
            <Button id ="datetwo">SCHILLING CIDERHOUSE</Button>
            </OverlayTrigger>


            <OverlayTrigger
            trigger={['hover', 'focus']}
            placement="bottom"
            overlay={popoverHoverFocus3}
            >
            <Button id = "datethree">THE BACKDOOR</Button>
            </OverlayTrigger>

            <OverlayTrigger
            trigger={['hover', 'focus']}
            placement="bottom"
            overlay={popoverHoverFocus}
            >
            <Button id = "datefour">THE BARREL THIEF</Button>
            </OverlayTrigger>

           <Button id ="mapview" onClick={this._onButtonClick}> View on Map </Button>
            {this.state.showComponent ?
               <ColorMap /> :
               null
            }

            <Button id ="next" onClick={this.handleClick}> Next </Button>
            {this.state.availability ?
               <Availability /> :
               null
            }

            </div>
            </div>
        );
    }
}

export default DateNames;