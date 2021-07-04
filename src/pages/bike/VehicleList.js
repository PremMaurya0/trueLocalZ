
import React,{useState,useEffect,Fragment} from 'react';
import { Link } from 'react-router-dom';
import { Modal, Button,Form } from "react-bootstrap";

import * as GlobalProvider from '../../providers/globals/globals';
import * as ApisService from "../../providers/apis/api";
import "./vehicle.css"


import Sidebar from '../../components/Sidebar';
//import Map from './Map'

import {
    withGoogleMap,
    GoogleMap,
    withScriptjs,
    Marker,
    Circle
  } from "react-google-maps";
  const { compose, withProps } = require("recompose");
  
function ListVehicle(){
    const [vehicle, setVehicle] = useState([]);
    const [items, setItems] = useState([]);
    const [showModal, setShow] = useState(false);
    const [mapModal, setShowmap] = useState(false);
    const [selectedID, setselectedID] = useState(0);
    const [data, setData] = useState([{id:1,latitude:"",longitude:"",circle:{
        radius: 3000,
        options: {
          strokeColor: "#ff0000"
        }
      }}]);
    const [currentItem, setCurrenItem] = useState(0);
  
  
    const map = React.createRef();
    const circle = React.createRef();

   

    const changeItem = (newItem) => {
 
        setCurrenItem(newItem);
        SingleArea(newItem);
        setShowmap(true);
        
    }

    useEffect(() => {
        list();  
    }, [])
  
    const list=()=>{
        ApisService.VList()
        .then(response => {
            setVehicle(response)
   
        }).catch(error => {
         
          console.log(error);
          GlobalProvider.errorMessage(error);
        
        });
      }

      const renderHeader = () => {
        let headerElement = ['DeviceId', 'model name', 'vechile Number', 'chissis number','Assign Area', 'Operation']

        return headerElement.map((key, index) => {
            return <th key={index} scope="col">{key.toUpperCase()}</th>
        })
    }

    const renderBody = () => {
        // let html; 
        return vehicle && vehicle.map(({ id,DeviceId, modelname,vechileNumber,chissisnumber,status, }) => {

            return (
                <tr key={id}>
                    <td scope="row">{DeviceId}</td>
                    <td>{modelname}</td>
                    <td>{vechileNumber}</td>
                    <td>{chissisnumber}</td>
                       
                              {status==0?<td ><button onClick={() => showModalForm(id)}>Assign</button></td>:<td><button onClick={() => showModalForm(id)}>Reassign</button></td>}          

                    <td className='opration'>
                        <button>View</button>
                        <Link to={`/vehicle/list/edit/${id}`}>Edit</Link>
                        <button onClick={() => removeData(id)}>Delete</button>
                    </td>
                </tr>
            )
        })
    }

    const removeData = (id) => {
      let dataobj={
        id:id
      }
      ApisService.deleteVechile(JSON.stringify({'vehicleobj':dataobj}))
      .then(response => {
        console.log(response);
         list();
      }).catch(error => {
        GlobalProvider.errorMessage(error);
      
      });
    }
    let newPosation={id:'',areaId:'',lat:'',lng:''};

    const showModalForm=(id)=>{
      setShow(true);
      AreaList();
      setselectedID(id)

    }

        const  AreaList=()=>{
            ApisService.areaList()
            .then(response => {
                setItems(response.areaList)
              
            }).catch(error => {
              GlobalProvider.errorMessage(error);
            
            });
        }
        const  SingleArea=(params)=>{
           
            let data={
                areanumber:params
            }
           
            ApisService.SingleArea(data)
            .then(response => {
               // console.log(response);
                setData([{id:1,latitude:response.List[0].lat,longitude:response.List[0].lng,circle:{
                    radius: 3000,
                    options: {
                      strokeColor: "#ff0000"
                    }
                  }}])
               
            }).catch(error => {
                console.log(error);
              GlobalProvider.errorMessage(error);
            
            });
        }
        useEffect(() => {
          navigator.geolocation.getCurrentPosition(onMarkerDragEnd);
        })
     
      const onMarkerDragEnd = (evt) => {
 console.log(evt)
  const bounds = circle.current.getBounds();
  const { latLng } = evt;
  const lat = latLng.lat();
  const lng = latLng.lng();

  if(bounds.contains(new window.google.maps.LatLng(lat, lng))==true){
      newPosation={id:selectedID,areaId:currentItem,lat,lng};
      console.log("Inside");
    }else{
      console.log("Outside");
    }

      };
       
    const UpdateVehicle=()=>{
 
      ApisService.updateVechile(JSON.stringify({'objectData':newPosation}))
      .then(response => {
      
        if(response.error === false) {
          closeModal();
          list();
          GlobalProvider.successMessage(response.message);
         
        } else {
         
          GlobalProvider.errorMessage(response.message);
        
        }
                
      }).catch(error => {
       
        console.log(error);
        GlobalProvider.errorMessage(error);
      
      });

     
    }
const closeModal=()=>{
  newPosation={id:'',areaId:'',lat:'',lng:''};
  setShow(false);
  setCurrenItem(0);
   setShowmap(false);
}


    const MapWithACircle = compose(
        withProps({
          googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyDZIIPkxUOhnlEUuegCFhDUpcAvTQIXozs&v=3.exp&libraries=geometry,drawing,places",
          loadingElement: <div style={{ height: `100%` }} />,
          containerElement: <div style={{ height: `300px` }} />,
          mapElement: <div style={{ height: `100%` }} />,
        }),
        withScriptjs,
        withGoogleMap
      )(props =>
         <GoogleMap  ref={map} key={new Date().getTime()}
            defaultZoom={12}
            defaultCenter={{ lat: parseFloat(data[0].latitude), lng: parseFloat(data[0].longitude) }} 
             
          >
            {data.map(place => {
              return (
                <Fragment key={place.id}>
                  <Marker
                    position={{
                      lat: parseFloat(place.latitude),
                      lng: parseFloat(place.longitude)
                    }} 
                    draggable={true}
                    onDragEnd={(e) => onMarkerDragEnd(e)}
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
          </GoogleMap> );



    return(
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
                <h1 id='title'>React Table</h1>
                <div class="intro-y col-span-12 overflow-auto lg:overflow-visible">
                <table className="table table-report -mt-2" id='area'>
                    <thead className="thead-light">
                        <tr>{renderHeader()}</tr>
                    </thead>
                    <tbody>
                        {renderBody()}
                    </tbody>
                </table>
            </div>

     <Modal show={showModal}  className="my-modal">
        <Modal.Header closeButton onClick={closeModal}>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <select className="form-control" defaultValue={{ AreaName: "Selected", value: 0 }} onChange={(event) => changeItem(event.target.value)}
         value={currentItem} >
        {items.map(o => <option key={o.AreaNumber} value={o.AreaNumber}>{o.AreaName}</option>)}
        </select>


                <div>


    
                {
                (mapModal===true)?<MapWithACircle></MapWithACircle>:null
                }

                </div>

       
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal} >
            Close
          </Button>
          <Button variant="primary" onClick={UpdateVehicle} >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

     </div>
    </div>
        </>
    )
}

export default  ListVehicle;