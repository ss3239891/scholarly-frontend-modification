import React from "react";
import home from "../../assets/icons8-home.svg";
import discover from "../../assets/icons8-compass-24.png";
import user from "../../assets/icons8-user-male-30.png";
import setting from "../../assets/icons8-gear-16.png";
import noti from "../../assets/icons8-notification-24.png";
import { Link, withRouter } from "react-router-dom";

const currentTab = (history, path) => {
  if (history.location.pathname === path) {
    return {
      // backgroundColor: "rgb(255, 231, 235)",
      borderLeft: '5px solid #516cf0',
      // textDecoration: "none",
      fontWeight: '700',
      color: "#516cf0",
    };
  } else {
    return { textDecoration: "none", color: "#788699" };
  }
};
const Navbar = ({ history, click }) => {
  return (
    <>
      <div className="header">
        <div className="logo">Logo</div>
        <div className="top-icons1">
          <img src={setting} alt="setting" height="20" width="20" />
        </div>
        <div className="top-icons2">
          <img src={noti} alt="noti" height="20" width="20" />
        </div>
      </div>
      <div className="nav-items">
        <Link to="/" style={{ textDecoration: "none" }}>
          <div
            className="home"
            style={currentTab(history, "/")}
            onClick={click}
          >
            <img
              src={home}
              alt="home"
              height="25"
              width="25"
              className="icons-nav"
            />
            <span>Home</span>
          </div>
        </Link>
        <Link to="/company" style={{ textDecoration: "none" }}>
          <div
            className="company"
            onClick={click}
            style={currentTab(history, "/company")}
          >
            <img
              src={home}
              alt="home"
              height="25"
              width="25"
              className="icons-nav"
            />
            <span>Company</span>
          </div>
        </Link>
        <Link to="/discover" style={{ textDecoration: "none" }}>
          <div
            className="discover"
            onClick={click}
            style={currentTab(history, "/discover")}
          >
            <img
              src={discover}
              alt="home"
              height="25"
              width="25"
              className="icons-nav"
            />
            <span>Discover</span>
          </div>
        </Link>
        <Link to="/profile" style={{ textDecoration: "none" }}>
          <div
            className="username"
            onClick={click}
            style={currentTab(history, "/profile")}
          >
            <img
              src={user}
              alt="home"
              height="25"
              width="25"
              className="icons-nav"
            />
            <span>Shubham Gavali</span>
          </div>
        </Link>
      </div>
    </>
  );
};
export default withRouter(Navbar);
