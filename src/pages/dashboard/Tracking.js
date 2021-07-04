import React,{useState, useEffect,useRef,Fragment} from 'react';
import * as GlobalProvider from '../../providers/globals/globals';
import * as ApisService from "../../providers/apis/api";
import Sidebar from '../../components/Sidebar';
//import Map from './Map'
import socketIOClient from "socket.io-client";


import {
    withGoogleMap,
    GoogleMap,
    withScriptjs,
    Marker,
    Circle
  } from "react-google-maps";
  const { compose, withProps } = require("recompose");
  const ENDPOINT = "http://localhost:3001";

  
  function Tracking() {

    const [response, setResponse] = useState([]);
    const [responseArea, setResponseArea] = useState([]);
    const map = React.createRef();
    const circle = React.createRef();

    
    let Coords=[];
    useEffect(() => {
      const socket = socketIOClient(ENDPOINT,{'forceNew':true, query: "foo=48004695"});
      console.log(socket);
      socket.on("event", data => {
        Coords=[];
       Coords.push(data);
       console.log(data,"===111");
       setResponse(data);
      });
    // console.log(Coords,"===");
    // SingleArea("48004695");
      // CLEAN UP THE EFFECT
      return () => socket.disconnect();
      

    }, []);
    // useEffect(() => {
    //   SingleArea("48004695");
    // },[]);
   /// let Coords=[];
    const SingleArea=(areanumber)=>{

      ApisService.areaSingle({"areanumber":areanumber})
      .then(response => {
       
         // setVehicle(response)
         for(var x=0;x<response.List.length;x++){
          Coords.push({lat:parseFloat(response.List[x].lat),lng:parseFloat(response.List[x].lng)})
        }
        console.log(Coords)
         setResponseArea(Coords);
      }).catch(error => {
       
        console.log(error);
        GlobalProvider.errorMessage(error);
      
      });
    }



    const MapWithACircle = compose(
      withProps({
        googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyDZIIPkxUOhnlEUuegCFhDUpcAvTQIXozs&v=3.exp&libraries=geometry,drawing,places",
        loadingElement: <div style={{ height: `100%` }} />,
        containerElement: <div style={{ height: `600px` }} />,
        mapElement: <div style={{ height: `100%` }} />,
      }),
      withScriptjs,
      withGoogleMap
    )(props =>
       <GoogleMap  ref={map} key={new Date().getTime()}
          defaultZoom={8}
         // defaultCenter={{ lat:parseFloat(response[0].lat), lng:parseFloat(response[0].lng) }} 
           
        >
                        
            {response.map(place => {
              console.log(place,"------")
              return (
                <Fragment key={place.DeviceId}>
                  <Marker
                    position={{
                      lat: parseFloat(place.lat),
                      lng: parseFloat(place.lng)
                    }} 
                   
                  />
                  <Circle ref={circle}
                    defaultCenter={{
                      lat: parseFloat(response[0].lat),
                      lng: parseFloat(response[0].lng)
                    }}
                    radius={3000}
                   
                  />
                </Fragment>
              );
            })}
       </GoogleMap> );








    return (
      <>
      <div className="wrapper">
  
      <Sidebar></Sidebar>
  
       <div id="content">
         <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container-fluid">
  
              <button type="button" id="sidebarCollapse" class="btn btn-info">
                  <i className="fas fa-align-left"></i>
                
              </button>
  
          </div>
          </nav>
          
          <h1>Tracking</h1>
          <MapWithACircle></MapWithACircle>
          {/* {Coords.length>0 ? <MapWithACircle></MapWithACircle>:<p>Map Loading......</p>} */}
{/* { 
  <div>
  <h1>Tracking...11.</h1>
  {response.map( item => 
<p> Hello {item.DeviceId}</p>
  )
  }
</div>
} */}

        </div>
      </div>
     
      </>
    );
  }
  
  export default Tracking;