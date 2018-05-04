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
      name1: this.props.data['0'].restaurant.name
    }
  }

  handleChange(event) {
    this.setState({ data: this.props.locations });
    console.log(this.data)
  }

  render() {
    const { props, state } = this,
      { googleMapsApi, mapStyles, ...otherProps } = props;
    let myComponent;
    const style = {
      width: '500px',
      height: '500px'
    }
    myComponent = <Map google={this.props.google} styles={mapStyles}
      initialCenter={{
        lat: 47.6564,
        lng: -122.3073
      }}
      zoom={12}>
      <Marker
        name={this.state.name1}
        position={{ lat: this.state.latitude1, lng: this.state.longitude1 }} />
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
            "color": "#b9bdff"
          }
        ]
      },
      {
        "featureType": "poi",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#0c4152"
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
            "color": "#000000"
          }
        ]
      },
      {
        "featureType": "road.highway",
        "elementType": "geometry.stroke",
        "stylers": [
          {
            "color": "#d7d9ff"
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
            "color": "#000000"
          }
        ]
      },
      {
        "featureType": "road.arterial",
        "elementType": "geometry.stroke",
        "stylers": [
          {
            "color": "#0b3d51"
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
            "color": "#146474"
          }
        ]
      },
      {
        "featureType": "water",
        "elementType": "all",
        "stylers": [
          {
            "color": "#F5F5F5"
          }
        ]
      }
    ]
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyAyesbQMyKVVbBgKVi2g6VX7mop2z96jBo"
})(MapContainer)

