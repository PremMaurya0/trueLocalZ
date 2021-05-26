

import Sidebar from '../../components/Sidebar'
const { compose, withProps } = require("recompose");
const {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
} = require("react-google-maps");
const { DrawingManager } = require("react-google-maps/lib/components/drawing/DrawingManager");


function Addbike() {
  const google = window.google;

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
      defaultCenter={new google.maps.LatLng(28.6139, 77.2090)}
    >
      <DrawingManager
        defaultDrawingMode={google.maps.drawing.OverlayType.CIRCLE}
        defaultOptions={{
          drawingControl: true,
          drawingControlOptions: {
            position: google.maps.ControlPosition.TOP_CENTER,
            drawingModes: [
              google.maps.drawing.OverlayType.CIRCLE,
              google.maps.drawing.OverlayType.POLYGON,
              
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
        <MapWithADrawingManager />



      </div>
    </div>
   
    </>
  );
}

export default Addbike;
