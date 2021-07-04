import React,{useState,useEffect} from 'react';

import * as GlobalProvider from '../../providers/globals/globals';
import * as ApisService from "../../providers/apis/api";
import Sidebar from '../../components/Sidebar'



function EditVehicle(props){
    const { id } = props.match.params;
    

const [objectData,setDevice]=useState({
   
});
        useEffect(()=>{

            list(id);
        },[]);
    
let name,value;

const handleInput = (e)=>{

  name = e.target.name;
  value = e.target.value;
  setDevice({...objectData,[name]:value});

}
const list=(id)=>{
    let data={
        id:id
    };

    ApisService.viewVechile(JSON.stringify({'vehicleobj':data}))
    .then(response => {
       console.log(response)
       setDevice(response);
    }).catch(error => {
     
      console.log(error);
     // GlobalProvider.errorMessage(error);
    
    });
  }


const submit=()=>{
  
    console.log(objectData);
    //let objectData=device;

    ApisService.editVechile(JSON.stringify({'vehicleobj':objectData}))
    .then(response => {
     // clearState();
      console.log(response);
    //    if(response.error === false) {
    //      GlobalProvider.successMessage(response.message);
         
    //    } else {
    //      GlobalProvider.errorMessage(response.message);  
    //    }
      
    }).catch(error => {
     
      console.log(error);
      //GlobalProvider.errorMessage(error);
    
    });

}

const clearState = () => {
  setDevice({
    DeviceId:"",
    modelname:"",
    vechileNumber:"",
    chissisnumber:"",
    areaId:0,
    lat:0,
    lng:0,
    status:0
});
};


    return(
        <>



<div className="wrapper">

<Sidebar></Sidebar>

 <div id="content">
   <nav className="navbar navbar-expand-lg navbar-light bg-light">
    <div className="container-fluid">

        <button type="button" id="sidebarCollapse" className="btn btn-info">
            <i className="fas fa-align-left"></i>            
        </button>

    </div>
    </nav>

        <section>
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-8 col-xl-6">
          <div className="row">
            <div className="col text-center">
              <h3>Edit Vehicle</h3>
             </div>
          </div>
          <form method="Post">
        
          <div className="row align-items-center">
            <div className="col mt-4">
              <input type="text" className="form-control" name="DeviceId" placeholder="Device Id" value={objectData.DeviceId} onChange={handleInput} />
            </div>
          </div>
          <div className="row align-items-center mt-4">
            <div className="col">
              <input type="text" className="form-control" placeholder="Model name" name="modelname" value={objectData.modelname} onChange={handleInput} />
            </div>
          </div>
          <div className="row align-items-center mt-4">
            <div className="col">
              <input type="text" className="form-control" placeholder="Vehicle number" name="vechileNumber" value={objectData.vechileNumber} onChange={handleInput} />
            </div>
            <div className="col">
              <input type="text" className="form-control" placeholder="Chassis number" name="chissisnumber" value={objectData.chissisnumber} onChange={handleInput} />
            </div>
          </div>
          <div className="row justify-content-start mt-4">
            <div className="col">
              {/* <div className="form-check">
                <label className="form-check-label">
                  <input type="checkbox" class="form-check-input" />
                  I Read and Accept <a href="https://www.froala.com">Terms and Conditions</a>
                </label>
              </div> */}

              <input type="button" className="btn btn-primary mt-4" onClick={submit} disabled={!objectData.DeviceId || !objectData.modelname || !objectData.vechileNumber || !objectData.chissisnumber} value="Submit" />
            </div>
          </div>
        
        </form>
        
        </div>
      </div>
    </div>
  </section>


     </div>
    </div>
        </>
    )
}

export default EditVehicle