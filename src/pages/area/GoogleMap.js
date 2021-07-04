import React,{useState} from 'react';
import * as GlobalProvider from '../../providers/globals/globals';
import * as ApisService from "../../providers/apis/api";
import Sidebar from '../../components/Sidebar'

function Map(props) {

 const onScriptLoad = () => {
    const map = new window.google.maps.Map(
      document.getElementById(props.id),
      props.options);
      console.log(map);
     props.onMapLoad(map);
    

  }

  if (!window.google) {
    var s = document.createElement('script');
    s.type = 'text/javascript';
    s.src = `https://maps.google.com/maps/api/js?key=AIzaSyDZIIPkxUOhnlEUuegCFhDUpcAvTQIXozs&libraries=drawing&v=weekly`;
    var x = document.getElementsByTagName('script')[0];
    x.parentNode.insertBefore(s, x);
    // Below is important. 
    //We cannot access google.maps until it's finished loading
   
    s.addEventListener('load', e => {
     console.log("oooo");
      onScriptLoad()
    })
  } else {

    console.log("ooooppppppp");

   

    onScriptLoad()
  }

  return(
    <>

    <div style={{ width: 500, height: 500 }} id={props.id} />
   


    </>
  );
};

export default Map;
