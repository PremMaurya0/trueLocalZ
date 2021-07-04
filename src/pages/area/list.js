import React,{useState,useEffect} from 'react';

import * as GlobalProvider from '../../providers/globals/globals';
import * as ApisService from "../../providers/apis/api";
import Sidebar from '../../components/Sidebar'
import "./style.css"

function AreaList(){
    const [area, setArea] = useState([])
   
    useEffect(() => {
        list()
    }, [])

    const list=()=>{
        ApisService.areaList()
        .then(response => {
            setArea(response.areaList)
            console.log(response);
        //   if(response.error === false) {
            
        //     GlobalProvider.successMessage(response.message);
           
        //   } else {
           
        //     GlobalProvider.errorMessage(response.message);
          
         // }
       
         
        }).catch(error => {
         
          console.log(error);
          GlobalProvider.errorMessage(error);
        
        });
      }

     

    const renderHeader = () => {
        let headerElement = ['Area ID', 'Area Name', 'No. of Bike', 'Active Bike','Inactive Bike', 'Operation']

        return headerElement.map((key, index) => {
            return <th key={index} scope="col">{key.toUpperCase()}</th>
        })
    }

    const renderBody = () => {
        return area && area.map(({ AreaNumber, AreaName }) => {
            return (
                <tr key={AreaNumber}>
                    <td scope="row">{AreaNumber}</td>
                    <td>{AreaName}</td>
                    <td>82</td>
                    <td>32</td>
                    <td>40</td>
                    <td className='opration'>
                        <button onClick={() => removeData(AreaNumber)}>Delete</button>
                    </td>
                </tr>
            )
        })
    }

    const removeData = (id) => {
        // let url = `https://jsonplaceholder.typicode.com/users/${id}`

        // axios.delete(url).then(res => {
        //     const del = employees.filter(employee => id !== employee.id)
        //     setEmployees(del)
        //     console.log('res', res)
        // })
    }


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

     </div>
    </div>
        </>
    )
}

export default AreaList;