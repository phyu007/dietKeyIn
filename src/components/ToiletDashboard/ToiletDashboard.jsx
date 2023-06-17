import React, { useEffect, useState } from "react";
import { useHistory, useLocation, useSearchParams } from "react-router-dom";
import './ToiletDashboard.css'; // Import the CSS file
import { getMeasurements, getRecommendedDiet } from "../../api/urineAnalysis";

const ToiletDashboardPage = () => {
  const history = useHistory();
  const location = useLocation();
  const { userName, loggedInUserObj } = location.state;
  var phresult = "a";
  var tempresult = "b";
  var recom = "No recommendation";
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

    if (response[0][0] != 0.0 && response[0][1] != 0.0) {
      console.log("this is after response ", response);
      phresult = response[0][0].toString();
      tempresult = response[0][1].toString();


      let urineresult = "";
      if (response[0][0] < 7) {
        urineresult = "Your urine is acidic!";
        //call recommandation
        let response1 = await getRecommendedDiet(response[0][0]);
        console.log(response1);
        recom = response1.recommended_items.toString();
        alert("PH is " + phresult + ": Temp is " + tempresult + ": " + urineresult + " Recommandation foods to eat are " + recom);
      } else {
        urineresult = "Your urine is not acidic!";
        alert("PH is " + phresult + ": Temp is " + tempresult + ": " + urineresult);
      }


      clearInterval(myInterval);
      window.close();
    } else {
      //check again  
    }
  }





  return (
    <div>
      <p>Waiting Result  {loggedInUserObj.userName}</p>
    </div>
  );
};

export default ToiletDashboardPage;
