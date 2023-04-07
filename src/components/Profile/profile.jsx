import React from "react";
import { useHistory, useLocation } from "react-router-dom";
import './ProfileSelection.css'; // Import the CSS file

const ProfileSelectionPage = () => {
  const history = useHistory();
  const location = useLocation();
  const { userName, loggedInUserObj } = location.state;



  // define profiles array (can be fetched from API or database)
  const profiles = [
    { name: "John", avatar: "https://images.unsplash.com/photo-1593085512500-5d55148d6f0d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8Y2FydG9vbnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60" },
    { name: "Sarah", avatar: "https://images.unsplash.com/photo-1578632749014-ca77efd052eb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTV8fGFuaW1lfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60" },
    { name: "Alex", avatar: "https://images.unsplash.com/photo-1611457194403-d3aca4cf9d11?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=686&q=80" },
  ];

  // handle profile selection
  const handleProfileSelect = (profile) => {
    // save selected profile to localStorage or server
    console.log(`Selected profile: ${profile.name}`);
    console.log("from login " + { userName }, { loggedInUserObj })
    const userObj = {
      userName: userName,
      firstName: profile.name,
      isUserLoggedIn: true,
    };
    localStorage.setItem(loggedInUserObj.userName, JSON.stringify(userObj));
    history.push({
      pathname: "/dashboard",
      state: { userName: loggedInUserObj.userName },
    });
  };

  return (
    <div className="profile-selection-page"
      style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', height: '100vh' }}
    >
      <h1>Select your profile</h1>
      <div className="profiles-list"
        style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }} >
        {profiles.map((profile) => (
          <div
            className="profile-item"
            key={profile.name}
            onClick={() => handleProfileSelect(profile)}
          >
            <img src={profile.avatar} alt={profile.name} style={{ cursor: "pointer", width: '200px', height: '200px', borderRadius: '50%', marginRight: '10px' }} />
            <p>{profile.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfileSelectionPage;
