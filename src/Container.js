// Disable undeclared variable check on 'exports'
/* global google:true */

import React from "react";
import Map from "./Map";
import { Marker, GoogleApiWrapper } from "google-maps-react";

export class Container extends React.Component {
    render() {
        if (!this.props.loaded) {
            return <div>Loading...</div>;
        }
        const { compose, withProps, withStateHandlers } = require("recompose"); // eslint-disable-line no-use-before-define
        const {
            withScriptjs,
            withGoogleMap,
            GoogleMap
        } = require("react-google-maps"); // eslint-disable-line no-use-before-define
        const {
            InfoBox
        } = require("react-google-maps/lib/components/addons/InfoBox"); // eslint-disable-line no-use-before-define
        const demoFancyMapStyles = require("./demoFancyMapStyles.json"); // eslint-disable-line no-use-before-define

        const StyledMapWithAnInfoBox = compose(
            withProps({
                googleMapURL:
                    "https://maps.googleapis.com/maps/api/js?key=AIzaSyC4R6AN7SmujjPUIGKdyao2Kqitzr1kiRg&v=3.exp&libraries=geometry,drawing,places",
                loadingElement: <div style={{ height: "100%" }} />,
                containerElement: <div style={{ height: "400px" }} />,
                mapElement: <div style={{ height: "100%" }} />,
                center: { lat: 25.03, lng: 121.6 }
            }),
            withStateHandlers(
                () => ({
                    isOpen: false
                }),
                {
                    onToggleOpen: ({ isOpen }) => () => ({
                        isOpen: !isOpen
                    })
                }
            ),
            withScriptjs,
            withGoogleMap
        )(props => (
            <GoogleMap
                defaultZoom={5}
                defaultCenter={props.center}
                defaultOptions={{ styles: demoFancyMapStyles }}
            >
                <InfoBox
                    defaultPosition={
                        new google.maps.LatLng(
                            props.center.lat,
                            props.center.lng
                        )
                    }
                    options={{ closeBoxURL: "", enableEventPropagation: true }}
                >
                    <div
                        style={{
                            backgroundColor: "yellow",
                            opacity: 0.75,
                            padding: "12px"
                        }}
                    >
                        <div style={{ fontSize: "16px", fontColor: "#08233B" }}>
                            Hello, Taipei!
                        </div>
                    </div>
                </InfoBox>
                <Marker
                    position={{ lat: 22.6273, lng: 120.3014 }}
                    onClick={props.onToggleOpen}
                >
                    {props.isOpen && (
                        <InfoBox
                            onCloseClick={props.onToggleOpen}
                            options={{
                                closeBoxURL: "",
                                enableEventPropagation: true
                            }}
                        >
                            <div
                                style={{
                                    backgroundColor: "yellow",
                                    opacity: 0.75,
                                    padding: "12px"
                                }}
                            >
                                <div
                                    style={{
                                        fontSize: "16px",
                                        fontColor: "#08233B"
                                    }}
                                >
                                    Hello, Kaohsiung!
                                </div>
                            </div>
                        </InfoBox>
                    )}
                </Marker>
            </GoogleMap>
        ));
        return (
            <div>
                <StyledMapWithAnInfoBox />
            </div>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: "AIzaSyAyesbQMyKVVbBgKVi2g6VX7mop2z96jBo"
})(Container);
