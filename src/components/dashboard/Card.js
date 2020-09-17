import React from "react";
import "./card.css";
import google from "../../assets/icons8-google.svg";
import SkeletonLoader from "tiny-skeleton-loader-react";
import { useState, useEffect } from "react";
import { Redirect, Link } from "react-router-dom";
import Landing from "./CompanyDetail";
export const Card = ({ comp, loc }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  });

  const displaylocation = (company) => {
    if(company === undefined) return ""
    const { city, state, country } = company
    if(!state) return city + ", " + country
    if(!city) return state + ", " + country
    return city + ", " + state
  }

  const loadContent = () => {
    const findlocindex = (filter, locarr) => {
      for(let i=0; i<locarr.length; i++){
        if(locarr[i].country === filter){
          return locarr[i]
        }
      }
      return locarr[0]
    }
    const location = JSON.stringify(displaylocation(findlocindex(loc, comp.locations)))

    if (loading) {
      return (
        <div className="details">
          <SkeletonLoader width="75px" height="75px" />
          <div className="main-detail">
            <div className="comp-name">
              <SkeletonLoader height="30px" />
            </div>
            <div className="location">
              <SkeletonLoader height="1.5625rem" />
            </div>
            <div className="people">
              <SkeletonLoader height="1.4375rem" />
            </div>
            <div className="no-of-jobs">
              <SkeletonLoader height="1.4375rem" />
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <Link
          to={`/company-detail/${comp._id}/${location}`}
          style={{ textDecoration: "none", color: "black" }}
        >
          <div className="details">
            <img src={comp.logo} alt="" className="card-img" />
            <div className="main-detail">
              <div className="comp-name">{comp.name}</div>
              {/* <div className="location">{JSON.parse(location)}</div> */}
              {/* {console.log(location.split('"'))} */}
              {loc === "all" && (
                  <div className="location">{location.split('"')[1]}</div>
              )}
              {loc !== "all" && (
                  comp.locations.map(location => {
                    // console.log('11', location)
                    if(location.city === loc || location.state === loc || location.country === loc) {
                      return <div className="location" key={'loc-' + comp._id}>{displaylocation(location)}</div>
                    }
                  })
              )}

              <div className="people">{comp.number_of_assignments} Assignment{comp.number_of_assignments>1?'s':''}</div>
                <div className="no-of-jobs">{comp.openings>1?`${comp.openings} Openings`:comp.openings===1?'1 Opening':'Openings yet to be updated'}</div>
            </div>
          </div>
        </Link>
      );
    }
  };
  return <div className="card-container" key={comp._id}>{loadContent()}</div>;
};
