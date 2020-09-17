import React, { useState } from "react";
import Navbar from "./Navbar";
import { ToggleButton } from "./ToggleButton";
import { SideDrawer } from "./SideDrawer";
import { Backdrop } from "./Backdrop";
import { Company } from "./Company";
import { Route, Switch } from "react-router-dom";
import { Discover } from "./Discover";
import Profile from "./Profile";
import "./dashboard.css";
import HomeComponent from "./HomeComponent";
import Landing from "./CompanyDetail";

export const Dashboard = () => {
  const [isToggle, setIsToggle] = useState(false);

  let backDrop;
  const handleToggle = () => {
    setIsToggle(!isToggle);
  };

  const clickBackDrop = () => {
    setIsToggle(false);
  };

  if (isToggle) {
    backDrop = <Backdrop click={clickBackDrop} />;
  }
  return (
    <div className="main-dash-container">
      <div className="left-sidebar-container">
          <Navbar />
        </div>
      <div className="dash-container">
        
        <div className="mobile">
          <ToggleButton click={handleToggle} />
          <SideDrawer show={isToggle} click={clickBackDrop} />
          {backDrop}
        </div>

        <Switch>
          <Route exact path="/" component={HomeComponent} />
          <Route exact path="/company" component={Company} />
          <Route exact path="/discover" component={Discover} />
          <Route exact path="/profile" component={Profile} />
          <Route exact path="/company-detail/:companyId/:location" component={Landing} />
        </Switch>
      </div>
    </div>
  );
};
