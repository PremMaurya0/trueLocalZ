/* global google */
import React, {Fragment} from "react";
import {
  withGoogleMap,
  GoogleMap,
  withScriptjs,
  Marker,
  Circle
} from "react-google-maps";


const Map =(props) => {
    const map = React.createRef();
    const circle = React.createRef();
 
    const onMarkerDragEnd = (coord) => {
        const bounds = circle.current.getBounds();
        const { latLng } = coord;
        const lat = latLng.lat();
        const lng = latLng.lng();
        if(bounds.contains(new window.google.maps.LatLng(lat, lng))==true){
            // console.log(marker.latLng.lat(), marker.latLng.lng());
            // lat=marker.latLng.lat();
            // lng=marker.latLng.lng();
            console.log("Inside");
          }else{
            console.log("Outside");
            //console.log(marker.latLng.lat(), marker.latLng.lng());
          
          }
    
      };
  
    

    return (
      <GoogleMap  ref={map} key={new Date().getTime()}
        defaultZoom={props.zoom}
        defaultCenter={props.center}
        
      >


        {props.places.map(place => {
          return (
            <Fragment key={place.id}>
              <Marker
                position={{
                  lat: parseFloat(place.latitude),
                  lng: parseFloat(place.longitude)
                }} 
                draggable={true}
                onDragEnd={onMarkerDragEnd}
              />
              {place.circle && <Circle ref={circle}
                defaultCenter={{
                  lat: parseFloat(place.latitude),
                  lng: parseFloat(place.longitude)
                }}
                radius={place.circle.radius}
                options={place.circle.options}
              />}
            </Fragment>
          );
        })}
      </GoogleMap>
    );
}

export default withScriptjs(withGoogleMap(Map));
