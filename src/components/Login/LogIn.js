import React, { useState } from "react";
import { login } from "../../api/urineAnalysis";
import { useHistory } from "react-router-dom";
import { Redirect, Link } from "react-router-dom";
import Cookies from 'js-cookie';
import {
  ToastsContainer,
  ToastsStore,
  ToastsContainerPosition,
} from "react-toasts";

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();
  const [loggedInUserObj, setLoggedInUserObj] = useState(null);

  

  const handleSubmit = async (event) => {
    event.preventDefault();

    const body = {
      username: username,
      password: password,
    };

    try {
      const response = await login(body);
      console.log("This is response", response);

      if (response.data.statusCode === 200) {
        console.log("Success logging in",response);
        const userObj = {
          userName: username,
          firstName: response.data.firstName,
          lastName: response.data.lastName,
          id : response.data.body.id,
          isUserLoggedIn: true,
        };
        localStorage.setItem(username, JSON.stringify(userObj));
        console.log()
        //setLoggedInUserObj(userObj);
        Cookies.set('UserName', username, { expires: 365 });
        Cookies.set('UserObj', JSON.stringify(userObj), { expires: 365 });
        history.push({
          pathname: "/welcome",
          state: { loggedInUserObj: userObj, userName: username },
        });
      } else {
        console.error("Error logging in");
        ToastsStore.error("Invalid Username/Password.");

      }
    } catch (error) {
      console.error("Error logging in", error);
      ToastsStore.error("Invalid Username/Password.");
    }
  };

  return (
    <div className="container mt-2 mb-4 divMiddle">
      <div className="col-sm-8 ml-auto mr-auto">
        <h1 className="display-5 text-center pb-5">
          Watch what you eat, or you'll end up wearing it!
        </h1>
        <div
          className="tab-content col-sm-6 ml-auto mr-auto"
          id="pills-tabContent"
        >
          <div
            className="tab-pane fade show active"
            id="pills-signin"
            role="tabpanel"
            aria-labelledby="pills-signin-tab"
          >
            <div className="col-sm-12 border border-primary shadow rounded pt-2">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label className="font-weight-bold">
                    Username <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label className="font-weight-bold">
                    Password <span className="text-danger">*</span>
                  </label>
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                  />
                </div>
                <div className="form-group">
                  <div className="row">
                    <div className="col text-right">
                      {" "}
                      <Link to={"/register"}>Create Account</Link>{" "}
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <input
                    type="submit"
                    name="submit"
                    value="Sign In"
                    className="btn btn-block btn-primary"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
