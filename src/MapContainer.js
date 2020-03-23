import React, { Component } from 'react';
import { GoogleMap, withGoogleMap, withScriptjs, Marker, Polyline } from 'react-google-maps'


class Map extends React.Component {

    state = {
      rendered: false
    }
    
    constructor(props){
      super(props);

      this.path = []
    }

    getData () {
      //Start Fetching JSON
      fetch("https://api.myjson.com/bins/16vrrc").then(response => response.json()
      ).then( async body => {
          this.path = body;
          this.setState({rendered: true})
      }).catch(err => alert(err))  
      //End Fetching JSON
    }

    execute = () => {

      console.log("path --> " ,this.path)
    }

    componentDidMount() {

      this.getData();
      console.log("check ", this.state.rendered);
      this.execute();
    
    }

    render = () => {
      return (
        <GoogleMap
          defaultZoom={16}
          defaultCenter={{ lat: 18.559008, lng: -68.388881 }}
          >
            
           <Polyline path={this.path} options={{ strokeColor: "#FF0000 " }} />
           <Marker position={this.path[this.path.length-1]} />

        </GoogleMap>

      )
    }
  }
  
  
  
  const MapComponent = withScriptjs(withGoogleMap(Map))
  
  export default () => (
    <MapComponent
        googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyCJhPWoDj2nUJkp_HgpDMDx2lOnS03PGJc&v=3.exp&libraries=geometry,drawing,places"
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `90vh`, width: '100%' }} />}
        mapElement={<div style={{ height: `100%` }} />}
    />
  )