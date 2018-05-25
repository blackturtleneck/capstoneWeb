import React, { Component } from 'react';
import { withGoogleMap, GoogleMap, Marker } from 'react-google-maps';

class ColorMap extends Component {
    render() {

        const mapStyles2 =
        [{
          height: '200px',
          border: '5px solid pink'
        },
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
                "color": "#f1f8fe"
              }
            ]
          }
        ]
        const GoogleMapExample = withGoogleMap(props => (
           <GoogleMap
             defaultCenter = { { lat: 47.651974, lng: -122.350093 } }
             defaultZoom = { 15 }
             defaultOptions={{styles: mapStyles2}}
           >
           <Marker
                position={{ lat: 47.650779, lng: -122.34609 }}
                onClick={props.onToggleOpen}
            > </Marker>

            <Marker
                position={{ lat: 47.652207, lng: -122.352702 }}
                onClick={props.onToggleOpen}
            > </Marker>

            <Marker
                position={{ lat: 47.649653, lng: -122.349199 }}
                onClick={props.onToggleOpen}
            > </Marker>

            <Marker
                position={{ lat: 47.650648, lng: -122.351541 }}
                onClick={props.onToggleOpen}
            > </Marker>

           </GoogleMap>
        ));
        return(
           <div>
             <GoogleMapExample
               containerElement={ <div style={{ height: `500px`, width: '500px' }} /> }
               mapElement={ <div style={{ height: `100%` }} /> }
             />
           </div>
        );
        }
     };



ColorMap.defaultProps = {
    mapStyles:
      [{
        height: '200px',
        border: '5px solid pink'
      },
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
              "color": "#f1f8fe"
            }
          ]
        }
      ]
  }
export default ColorMap;