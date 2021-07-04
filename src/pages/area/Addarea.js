
import React,{useState, useRef} from 'react';
import { Modal, Button,Form } from "react-bootstrap";

import * as GlobalProvider from '../../providers/globals/globals';
import * as ApisService from "../../providers/apis/api";
import Sidebar from '../../components/Sidebar'
import Map from './GoogleMap'
const { compose, withProps } = require("recompose");
const {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
} = require("react-google-maps");
const { DrawingManager } = require("react-google-maps/lib/components/drawing/DrawingManager");



function AddArea() {
  const [showModal, setShow] = useState(false);
  const [areadata,setAreaName] = useState({shapetype:'',redius:'',AreaName:'',AreaNumber:'',lat:'',lng:''});
const AreaName = useRef(null);
  let name,value;
  
  const handleInput = (e)=>{
   // e.preventDefault();
    name = e.target.name;
    value = e.target.value;
    setAreaName({...areadata,[name]:value});
  
  }
 const shapes=[];let areaValue={};
 
  const handleOverlayComplete=(e)=>{
    setShow(true);
    const shape = e.overlay;
    shape.type = e.type;
    window.google.maps.event.addListener(shape, "click", () => {
     
      toggleSelection(shape);
    });
    toggleSelection(shape);
   areaValue={
    shapetype:"circle",
    redius:e.overlay.getRadius(),
    lat:e.overlay.getCenter().lat(),
    lng:e.overlay.getCenter().lng()
  
  }
  //  areadata.shapetype="circle";
  //  areadata.redius=e.overlay.getRadius();
  //  areadata.lat=e.overlay.getCenter().lat();
  //  areadata.lng=e.overlay.getCenter().lng();
  // setAreaName(areaValue);
    shapes.push(shape);
    
  };
  const toggleSelection=(shape)=> {
  
    if (shape.getEditable() === true) shape.setEditable(false);
    else shape.setEditable(true);
  }

  const deleteShapes=(e)=> {
   // e.preventDefault();
    setShow(false);
    if(shapes.length>0){
    shapes.forEach(shape => shape.setMap(null));
    }
    
  }
  const save=(e)=>{
    
    e.preventDefault();
   // console.log(areaValue)
   
     var uniqueNumber=Math.floor(Math.random() * 1000000000);
     areadata.AreaNumber=uniqueNumber;
     areadata.AreaName=AreaName.current.value;
    // console.log(areadata)
    const arr=[];
     arr.push(areadata);
  
    ApisService.addArea(arr)
    .then(response => {
    
      if(response.error === false) {
        setShow(false);
        GlobalProvider.successMessage(response.message);
       
      } else {
       
        GlobalProvider.errorMessage(response.message);
      
      }
      arr=[];
      setAreaName({shapetype:'',redius:'',AreaName:'',AreaNumber:'',lat:'',lng:''})
      setShow(false);
     
    }).catch(error => {
     
      console.log(error);
      //GlobalProvider.errorMessage(error);
    
    });

  }

  const MapWithADrawingManager = compose(
    withProps({
      googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyDZIIPkxUOhnlEUuegCFhDUpcAvTQIXozs&v=3.exp&libraries=geometry,drawing,places",
      loadingElement: <div style={{ height: `100%` }} />,
      containerElement: <div style={{ height: `500px` }} />,
      mapElement: <div style={{ height: `100%` }} />,
    }),
    withScriptjs,
    withGoogleMap
  )(props =>
    <GoogleMap
      defaultZoom={5}
      defaultCenter={new window.google.maps.LatLng(28.6139, 77.2090)}
    >
      <DrawingManager
        defaultDrawingMode={window.google.maps.drawing.OverlayType.CIRCLE}
        defaultOptions={{
          drawingControl: true,
          drawingControlOptions: {
            position: window.google.maps.ControlPosition.TOP_CENTER,
            drawingModes: [
              window.google.maps.drawing.OverlayType.CIRCLE,
             // window.google.maps.drawing.OverlayType.POLYGON,
              
            ],
          },
          circleOptions: {
            fillColor: `#ffff00`,
            fillOpacity: 1,
            strokeWeight: 5,
            clickable: false,
            editable: true,
            zIndex: 1,
          },
        }}
        onOverlayComplete={handleOverlayComplete}
      />
    </GoogleMap>
  );

 
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

        {/* <Map
        id="myMap"
        options={{
          center: { lat: 41.0082, lng: 28.9784 },
          zoom: 8
        }}
        onMapLoad={map => {
          var marker = new window.google.maps.Marker({
            position: { lat: 41.0082, lng: 28.9784 },
            map: map,
            title: 'Hello Istanbul!'
          });
        }}
      /> */}
       
        <MapWithADrawingManager />

        <Modal show={showModal} onHide={deleteShapes}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form.Group >
              <Form.Label>Area Name: </Form.Label>
           
              {/* <Form.Control type="text" name="AreaName" onChange={handleInput} value={areadata.AreaName} placeholder="Please enter area name.."/>            */}
          
          </Form.Group>
          <input type="text" class="form-control" ref={AreaName} placeholder="Please enter area name.."/>
      
        {/* Woohoo, you're reading this text in a modal!
        <form method="Post" class="form-signin">
        <label for="inputarea" class="sr-only">Area Name</label>
         <input type="text" id="inputarea" name="AreaName" class="form-control" placeholder="Password" value={areadata.AreaName} onChange={handleInput}  required />
      
        </form> */}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={deleteShapes}>
            Close
          </Button>
          <Button variant="primary" onClick={save}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>



      </div>
    </div>
   
    </>
  );
}

export default AddArea;
