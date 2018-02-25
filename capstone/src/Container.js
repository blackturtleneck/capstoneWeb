import React from 'react';
import Map from './Map';
import {GoogleApiWrapper}  from 'google-maps-react'

export class Container extends React.Component {
  render() {
    if (!this.props.loaded) {
      return <div>Loading...</div>
    }
    const style = {
        width: '100vw',
        height: '100vh'
    }
    return (
      <div>
           <Map google={this.props.google} />
      </div>
    )
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyAyesbQMyKVVbBgKVi2g6VX7mop2z96jBo"
})(Container)