import React,{useState,useEffect} from 'react';

import * as GlobalProvider from '../../providers/globals/globals';
import * as ApisService from "../../providers/apis/api";
import Sidebar from '../../components/Sidebar'



function EditDriver(){

    const [selectedFile,setselectedFile]=useState({});
    const [driverObject,setDriver]=useState({
      drivername:"",
      driveremail:"",
      driverphone:"",
      driverexpr:"",
      driverlice:"",
      driverexpdate:"",
      driveraddress:""
    });

    let name,value;

    const handleInput = (e)=>{
    
      name = e.target.name;
      value = e.target.value;
      setDriver({...driverObject,[name]:value});
    
    }

    const onChangeHandler=event=>{
        var file = event.target.files[0];
       // console.log(file);
       // console.log(validateSize(event));
        if(validateSize(event)){ 
          console.log(file);
      // if return true allow to setState
      setselectedFile(file
          );
     
        }
      }
     const fileUploadHandler = () => {
        const data = new FormData()
        console.log("===",selectedFile);
        console.log(driverObject);

        // data.append('file', this.state.selectedFile)
        // console.log(data);
        // axios.post("http://localhost:8010/api/v1/upload", data)
        //   .then(res => { // then print response status
        //     toast.success('upload success')
        //   })
        //   .catch(err => { // then print response status
        //     toast.error('upload fail')
        //   })
     
      };
     const validateSize=(event)=>{
      let file = event.target.files[0];
      let size = 30000;
      let err = '';
      console.log(file.size);
      if (file.size > size) {
       err = file.type+'is too large, please pick a smaller file\n';
       console.log(err);
     }
     return true
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
              <h3>Edit Driver</h3>
             </div>
          </div>
          <form method="Post">
        
          <div className="row align-items-center  mt-4">
            <div className="col">
              <input type="text" className="form-control" name="drivername" placeholder="Driver Name" value={driverObject.drivername} onChange={handleInput} />
            </div>
            <div className="col">
            <label for="exampleFormControlFile1">Upload Photo</label>
              <input type="file" class="form-control-file" name="file" onChange={onChangeHandler} id="exampleFormControlFile1" />
            </div>
          </div>
          <div className="row align-items-center mt-4">
            <div className="col">
            <input type="text" className="form-control" name="driveremail" placeholder="Email Address.." value={driverObject.driveremail} onChange={handleInput} />
            </div>  
          </div>
          <div className="row align-items-center mt-4">
            <div className="col">
            <input type="text" className="form-control" name="driverphone" placeholder="Phone No..." value={driverObject.driverphone} onChange={handleInput} />
            </div>
            <div className="col">
            <input type="text" className="form-control" name="driverexpr" placeholder="Years of Driving Experience" value={driverObject.driverexpr} onChange={handleInput} />
            </div>
          </div>
          <div className="row align-items-center mt-4">
            <div className="col">
            <input type="text" className="form-control" name="driverlice" placeholder="Driver’s License No..." value={driverObject.driverlice} onChange={handleInput} />
            </div>
            <div className="col">
            <input type="text" className="form-control" name="driverexpdate" placeholder="Exp.Date....." value={driverObject.driverexpdate} onChange={handleInput} />
            </div>
          </div>
          <div className="row align-items-center mt-4">
            <div className="col">
            <input type="text" className="form-control" name="driveraddress" placeholder="Address..." value={driverObject.driveraddress} onChange={handleInput} />
            </div>
        
          </div>

          <div className="row justify-content-start mt-4">
            <div className="col">
              <input type="button" className="btn btn-primary mt-4" onClick={fileUploadHandler}  value="Submit" />
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

export default EditDriver