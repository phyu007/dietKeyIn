import React, { useEffect,useState } from "react";
import { useHistory, useLocation,useSearchParams } from "react-router-dom";
import './ToiletDashboard.css'; // Import the CSS file

const ToiletDashboardPage = () => {
  const history = useHistory();
  const location = useLocation();
  const { userName, loggedInUserObj } = location.state;

  const queryParams = new URLSearchParams(location.search);
    // Access individual query parameters by calling .get() method on queryParams object
  const deviceId = queryParams.get('deviceId');
  console.log("this is deviceID",deviceId); // ▶ URLSearchParams {}





  return (
   <p>hello from toiletDashboard - {loggedInUserObj.userName}</p>
  );
};

export default ToiletDashboardPage;
