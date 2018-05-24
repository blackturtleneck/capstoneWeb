import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';
import React from 'react';
// import Dates from './Dates';

export class MapContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            latitude1: this.props.data['0'].restaurant.location.latitude,
            longitude1: this.props.data['0'].restaurant.location.longitude,
            name1: this.props.data['0'].restaurant.name
        };
    }

    handleChange(event) {
        this.setState({ data: this.props.locations });
    }

    render() {
        let myComponent;
        const style = {
            width: '400px',
            height: '400px'
        };
        myComponent = (
            <Map
                google={this.props.google}
                style={style}
                initialCenter={{
                    lat: 47.6564,
                    lng: -122.3073
                }}
                zoom={12}
            >
                <Marker
                    name={this.state.name1}
                    position={{
                        lat: this.state.latitude1,
                        lng: this.state.longitude1
                    }}
                />
                <Marker />
            </Map>
        );
        //  }
        return (
            <div style={{ height: '400px', width: '400px' }}>{myComponent}</div>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyAyesbQMyKVVbBgKVi2g6VX7mop2z96jBo'
})(MapContainer);
