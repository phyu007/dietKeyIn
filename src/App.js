import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.js";
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import LogIn from "./components/Login/LogIn";
import DashBoard from "./components/DashBoard/DashBoard";
import Register from "./components/Register/Register";
import { ProtectedRoute } from "./ProtectedRoute";
import Page404 from "./components/Page404/Page404";
import ProfileSelectionPage from "./components/Profile/profile";
import WelcomePage from "./components/Welcome/welcome";
import ToiletUsersPage from "./components/ToiletUsers/toiletUsers";
import ToiletDashboardPage from "./components/ToiletDashboard/ToiletDashboard";
function App() {  
  return (
    <div>
      <Router>
        <Switch>
          <Route path="/" exact component={LogIn} />
          <Route path="/register" exact component={Register} />
          <ProtectedRoute exact path="/dashboard" component={DashBoard} />
          <ProtectedRoute path="/profiles" component={ProfileSelectionPage} />
          <ProtectedRoute path="/welcome" component={WelcomePage} />
          <Route path="/toiletUsers" component={ToiletUsersPage} />
          <ProtectedRoute
            path="/toiletDashboard"
            component={ToiletDashboardPage}
          />
          <Route path="*" component={Page404} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
