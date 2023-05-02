import React, { useEffect,useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import './welcome.css'; // Import the CSS file
import { getfamilymembers } from "../../api/urineAnalysis";

const WelcomePage = () => {
  const history = useHistory();
  const location = useLocation();
  const { userName, loggedInUserObj } = location.state;

  console.log("from login " + { userName }, { loggedInUserObj })
  console.log("account id " +  loggedInUserObj.id)


useEffect(() => {
  async function getFamilyMembers() {
    let id = {"account_id": loggedInUserObj.id}
    const response  = await getfamilymembers(id);    
  }
    getFamilyMembers();
}, [loggedInUserObj.id]);

  // define profiles array (can be fetched from API or database)
  let profiles = [
    // { name: "Toilet Users", avatar: "https://images.unsplash.com/photo-1613743147091-122703615c97?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8dG9pbGV0JTIwdXNlcnMlMjBjYXJ0b29ufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=700&q=60" },
    { name: "Diet Key In", avatar: "https://images.unsplash.com/photo-1531928351158-2f736078e0a1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fGRpZXQlMjBwaWN0dXJlJTIwY2FydG9vbnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=700&q=60" },
  ];


  // handle profile selection
  const handleProfileSelect = (profile) => {
    // save selected profile to localStorage or server
    console.log(`Selected option: ${profile.name}`);
    console.log("from login " + { userName }, { loggedInUserObj })
    
    const userObj = {
      userName: userName,
      firstName: profile.name,
      isUserLoggedIn: true,
      id : loggedInUserObj.id,
    };
    localStorage.setItem(loggedInUserObj.userName, JSON.stringify(userObj));
    if(profile.name === "Diet Key In"){
      history.push({
        pathname: "/profiles",
        state: { loggedInUserObj: userObj, userName: userObj.userName },
      });
    }
    if(profile.name == "Toilet Users"){
      history.push({
        pathname: "/toiletUsers",
        state: { loggedInUserObj: userObj, userName: userName },
      });
    }

  };

  return (
    
    <div className="profile-selection-page"
      style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', height: '100vh' }}
    >
      <h1>Welcome</h1>
      <div className="profiles-list"
        style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }} >
        {profiles.map((profile) => (
          <div
            className="profile-item"
            key={profile.name}
            onClick={() => handleProfileSelect(profile)}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer', margin: '10px' }}
          >
            <img src={profile.avatar} alt={profile.name} style={{ cursor: "pointer", width: '200px', height: '200px', borderRadius: '50%', marginRight: '10px' }} />
            <p>{profile.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WelcomePage;
