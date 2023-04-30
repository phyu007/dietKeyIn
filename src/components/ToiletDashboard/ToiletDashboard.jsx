import React, { useEffect,useState } from "react";
import { useHistory, useLocation,useSearchParams } from "react-router-dom";
import './ToiletDashboard.css'; // Import the CSS file
import { getMeasurements } from "../../api/urineAnalysis";

const ToiletDashboardPage = () => {
  const history = useHistory();
  const location = useLocation();
  const { userName, loggedInUserObj } = location.state;

  

  const searchParams = new URLSearchParams(window.location.search);
  const deviceid = searchParams.get('deviceid');
  const personGuid = searchParams.get('guid');

  const myInterval = setInterval(myTimer, 1000);
 console.log(myInterval);
  async function myTimer() {
    const date = new Date();
    console.log(date.toLocaleTimeString());
    let params={};
      params['personGuid'] = personGuid;
      params['deviceId'] = deviceid;
      params['last'] = 1;

      const body = { 
        device_id: deviceid
      }; 
    const response  = await getMeasurements(body);  
    console.log("this is get measurements " , response)
    console.log(myInterval);
    if(response[0] == 0 || response[1] == 0 ){
      //check again
      clearInterval(myInterval);
    }else{
      //alert("PH is" + response[0] + ": Temp is" +  response[1])
      //call recommandation
      
      clearInterval(myInterval);
    }
    
  }

  



  return (
   <p>Waiting Result  {loggedInUserObj.userName}</p>
  );
};

export default ToiletDashboardPage;
