import React, { useEffect, useState } from "react";
import { useHistory, useLocation, useSearchParams } from "react-router-dom";
import './ToiletDashboard.css'; // Import the CSS file
import { getMeasurements, getRecommendedDiet } from "../../api/urineAnalysis";

const ToiletDashboardPage = () => {
  const history = useHistory();
  const location = useLocation();
  const { userName, loggedInUserObj } = location.state;
  var phresult = "";
  var tempresult = "";
  var recom = "";

  useEffect(() => {
    console.log("Inisde useEffect",phresult,tempresult,recom)
  }, [phresult,tempresult,recom]); 

  const searchParams = new URLSearchParams(window.location.search);
  const deviceid = searchParams.get('deviceid');
  const personGuid = searchParams.get('guid');

  const myInterval = setInterval(myTimer, 10000);
  console.log(myInterval);
  async function myTimer() {
    const date = new Date();
    console.log(date.toLocaleTimeString());
    let params = {};
    params['personGuid'] = personGuid;
    params['deviceId'] = deviceid;
    params['last'] = 1;

    const body = {
      device_id: deviceid
    };
    const response = await getMeasurements(body);
    console.log("this is get measurements ", response)
    console.log("this is response[0]",response[0][0]);

    if (response[0][0] != 0.0 && response[0][1] != 0.0) {
    console.log("this is after response ", response );
      phresult = response[0][0].toString();
      tempresult = response[0][1].toString();
      
      //alert("PH is" + response[0] + ": Temp is" +  response[1])
      //call recommandation
      let response1 = await getRecommendedDiet(response[0][0]);
      console.log(response1);
      recom =response1;
      clearInterval(myInterval);
    } else {
      //check again 
      phresult = response[0][0].toString();
      tempresult = response[0][1].toString();

      let response1 = await getRecommendedDiet(response[0][0]);
      console.log(response1);
      recom =response1;
      clearInterval(myInterval);
    }

  }





  return (
    <div>
      <p>Waiting Result  {loggedInUserObj.userName}</p>
      
      <p>PH is  {phresult}</p>
      <p>Temperature is  {tempresult}</p>
      <p>Recommendation is  {recom}</p>
    </div>
  );
};

export default ToiletDashboardPage;
