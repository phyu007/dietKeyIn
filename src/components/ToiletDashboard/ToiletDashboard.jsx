import React, { useEffect,useState } from "react";
import { useHistory, useLocation,useSearchParams } from "react-router-dom";
import './ToiletDashboard.css'; // Import the CSS file

const ToiletDashboardPage = () => {
  const history = useHistory();
  const location = useLocation();
  const { userName, loggedInUserObj } = location.state;

  

  const searchParams = new URLSearchParams(window.location.search);
  const deviceid = searchParams.get('deviceid');



  return (
   <p>Waiting Result  {loggedInUserObj.userName}</p>
  );
};

export default ToiletDashboardPage;
