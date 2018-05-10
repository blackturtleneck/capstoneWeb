import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import React from 'react';
import Dates from './Dates';


export class MapContainer extends React.Component {
  constructor(props) {
    super(props);
    console.log(this.props.data['0'].restaurant.name)
    this.state = {
      latitude1: this.props.data['0'].restaurant.location.latitude,
      longitude1: this.props.data['0'].restaurant.location.longitude,
      name1: this.props.data['0'].restaurant.name,
      lat: props.lat, lon: props.lon,
      data: props.data
    }
  }

  handleChange(event) {
    this.setState({ data: this.props.locations });
    console.log(this.data)
  }

  render() {
    console.log("MAP TEST", this.state.data)
    const { props, state } = this,
      { googleMapsApi, mapStyles, ...otherProps } = props;
    let myComponent;
    const style = {
      width: '500px',
      height: '500px'
    }
    myComponent = <Map google={this.props.google} styles={mapStyles}
      initialCenter={{
        lat: this.state.lat,
        lng: this.state.lon
      }}
      zoom={12}>
      <Marker
        name={this.state.name1}
        position={{ lat: this.state.data['0'].restaurant.location.latitude, lng: this.state.data['0'].restaurant.location.longitude}} />
      <Marker />

            <Marker
        name={this.state.data['1'].restaurant.name}
        position={{ lat: this.state.data['1'].restaurant.location.latitude, lng: this.state.data['1'].restaurant.location.longitude}} />
      <Marker />
    </Map>
    //  }
    return (
      <div style={{ height: '400px', width: '400px' }}>
        {myComponent}
      </div>
    );
  }
}


MapContainer.defaultProps = {
  mapStyles:
    [
      {
        "featureType": "all",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#ffffff"
          }
        ]
      },
      {
        "featureType": "all",
        "elementType": "labels.text.stroke",
        "stylers": [
          {
            "color": "#000000"
          },
          {
            "lightness": 13
          }
        ]
      },
      {
        "featureType": "administrative",
        "elementType": "geometry.fill",
        "stylers": [
          {
            "color": "#000000"
          }
        ]
      },
      {
        "featureType": "administrative",
        "elementType": "geometry.stroke",
        "stylers": [
          {
            "color": "#144b53"
          },
          {
            "lightness": 14
          },
          {
            "weight": 1.4
          }
        ]
      },
      {
        "featureType": "landscape",
        "elementType": "all",
        "stylers": [
          {
            "color": "#D1C4E9"
          }
        ]
      },
      {
        "featureType": "poi",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#e3dbf1"
          },
          {
            "lightness": 5
          }
        ]
      },
      {
        "featureType": "road.highway",
        "elementType": "geometry.fill",
        "stylers": [
          {
            "color": "#bcb0d1"
          }
        ]
      },
      {
        "featureType": "road.highway",
        "elementType": "geometry.stroke",
        "stylers": [
          {
            "color": "#686274"
          },
          {
            "lightness": 25
          }
        ]
      },
      {
        "featureType": "road.arterial",
        "elementType": "geometry.fill",
        "stylers": [
          {
            "color": "#534e5d"
          }
        ]
      },
      {
        "featureType": "road.arterial",
        "elementType": "geometry.stroke",
        "stylers": [
          {
            "color": "#534e5d"
          },
          {
            "lightness": 16
          }
        ]
      },
      {
        "featureType": "road.local",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#000000"
          }
        ]
      },
      {
        "featureType": "transit",
        "elementType": "all",
        "stylers": [
          {
            "color": "#a79cba"
          }
        ]
      },
      {
        "featureType": "water",
        "elementType": "all",
        "stylers": [
          {
            "color": "#d3eafc"
          }
        ]
      }
    ]
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyAyesbQMyKVVbBgKVi2g6VX7mop2z96jBo"
})(MapContainer)

