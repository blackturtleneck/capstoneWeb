import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import React from 'react';

export class MapContainer extends React.Component {
render() {
    const style = {
        width: '400px',
        height: '400px'
      }
    return (
       <div style={{height: '400px', width: '400px'}}>
      <Map google={this.props.google}   style={style}
      initialCenter={{
        lat: 40.854885,
        lng: -88.081807
      }}
      zoom={15}>
        <Marker
    title={'The marker`s title will appear as a tooltip.'}
    name={'SOMA'}
    position={{lat: 40.854885, lng: -88.081807}} />
      </Map>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyAyesbQMyKVVbBgKVi2g6VX7mop2z96jBo"
})(MapContainer)