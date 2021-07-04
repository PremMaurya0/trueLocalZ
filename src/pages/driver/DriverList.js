import React,{useState,useEffect} from 'react';
import { Link } from 'react-router-dom';
import * as GlobalProvider from '../../providers/globals/globals';
import * as ApisService from "../../providers/apis/api";
import Sidebar from '../../components/Sidebar'



function DriverList(){




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


    <table class="table">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Driver Name</th>
      <th scope="col">Mobile No.</th>
      <th scope="col">Vehicle No.</th>
      <th scope="col">Current Status</th>
      <th scope="col" colSpan="3">Action</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">1</th>
      <td>Prem</td>
      <td>9966887744</td>
      <td>DL 56 1234</td>
      <td>Available</td>
      <td>
      <button>View</button>
       <Link to={`/driver/list/edit/1`}>Edit</Link>
        <button>Delete</button>
      </td>
    </tr>
    <tr>
      <th scope="row">2</th>
      <td>Test Driver</td>
      <td>88668877445</td>
      <td>DL 56 1234</td>
      <td>Un-Available</td>
      <td>
      <button>View</button>
       <Link to={`/driver/list/edit/2`}>Edit</Link>
        <button>Delete</button>
      </td>
    </tr>
    <tr>
      <th scope="row">3</th>
      <td>Driver 2</td>
      <td>7766887744</td>
      <td>DL 53 1234</td>
      <td>Available</td>
      <td>
      <button>View</button>
       <Link to={`/driver/list/edit/3`}>Edit</Link>
        <button>Delete</button>
      </td>
     
    </tr>
  </tbody>
</table>



    </div>
    </div>

         </>
    )
}

export default DriverList