import React, { useEffect,useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import './toiletUsers.css'; // Import the CSS file
import { getfamilymembers } from "../../api/urineAnalysis";
import { insertDummiesPHtemp } from "../../api/urineAnalysis";
import Cookies from 'js-cookie';

const ToiletUsersPage = () => {
  const history = useHistory();
  const location = useLocation();
  //const { userName, loggedInUserObj } = location.state;
  const [familyMem, setFamilyMem] = useState([]);
  const userName = Cookies.get('UserName');
  const loggedInUserObj = JSON.parse(Cookies.get('UserObj'));
  console.log("from welcome " , { loggedInUserObj })
  //console.log("account id " +  loggedInUserObj.id)


useEffect(() => {
  async function getFamilyMembers() {
    let id = {"account_id": loggedInUserObj.id}
    const response  = await getfamilymembers(id);  
    console.log("this is family members " , response)
    setFamilyMem(response);
  
  }
    getFamilyMembers();
}, [loggedInUserObj.id]); 
  // define profiles array (can be fetched from API or database)
  let profiles = [
    { name: "John", avatar: "https://images.unsplash.com/photo-1593085512500-5d55148d6f0d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8Y2FydG9vbnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60" },
    { name: "Sarah", avatar: "https://images.unsplash.com/photo-1578632749014-ca77efd052eb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTV8fGFuaW1lfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60" },
    { name: "Alex", avatar: "https://images.unsplash.com/photo-1611457194403-d3aca4cf9d11?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=686&q=80" },
    { name : "NiNi" , avatar: "https://images.unsplash.com/photo-1639628735078-ed2f038a193e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjZ8fGNhcnRvb258ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60"},
    { name : "David" , avatar: "https://images.unsplash.com/photo-1620428268482-cf1851a36764?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8Y2FydG9vbnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"},
  ];

  // If family members exist, replace the profiles array with a new array
// containing the family members' names and avatars
if (familyMem && familyMem.length > 0) {
  profiles = familyMem.map((member,index) => ({
    name: member.person_name,
    guid: member.guid,
    account_id: member.account_id,
    avatar: profiles[index].avatar,
  }));
  console.log(profiles);
}

 
  // handle profile selection
  const handleProfileSelect = async ( profile) => {
   
    // save selected profile to localStorage or server
    console.log(`Selected profile:`);
    console.log(profile);
    console.log("from login " + { userName }, { loggedInUserObj })
    
    const body = {
      account_id: profile.account_id,
      person_guid: profile.guid,
    }; 

      try {
        const response = await insertDummiesPHtemp(body);
        console.log("This is response", response);
  
        if (response.data.statusCode === 200) {
          console.log("Success logging in",response);
          const userObj = {
            userName: profile.name,
            isUserLoggedIn: true,
          };
          localStorage.setItem(loggedInUserObj.userName, JSON.stringify(userObj));
          console.log("toiletUsers loggedInUserObj",loggedInUserObj)
          const searchParams = new URLSearchParams(window.location.search);
          const deviceid = searchParams.get('deviceId');
          history.push({
            pathname: "/toiletDashboard/?deviceId=" + deviceid,
            state: { loggedInUserObj: userObj ,userName: loggedInUserObj.userName },
          });
        } else {
          console.error("Error logging in"); 
  
        }
      } catch (error) {
        console.error("Error logging in", error); 
        const userObj = {
          userName: profile.name,
          isUserLoggedIn: true,
        };
        localStorage.setItem(loggedInUserObj.userName, JSON.stringify(userObj));
        console.log("toiletUsers loggedInUserObj",loggedInUserObj)
        const searchParams = new URLSearchParams(window.location.search);
        const deviceid = searchParams.get('deviceid');
        history.push({
          pathname: "/toiletDashboard/?deviceId=" + deviceid,
          state: { loggedInUserObj: userObj ,userName: loggedInUserObj.userName },
        });
      } 
  };

  return (
    
    <div className="profile-selection-page"
      style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', height: '100vh' }}
    >
     
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

export default ToiletUsersPage;
