import React from "react";
import { Card } from "./Card";
import Select from "react-select";
import InfiniteScroll from 'react-infinite-scroll-component';
import { getAllCompanies } from '../backend/apiconnector';

import countrydata from '../../assets/countries.json';


class Company extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      status:'',
      companies:[],
      filter: localStorage.getItem("scholarly-filter")?localStorage.getItem("scholarly-filter"):'all',
      page:1,
      hasMore:true,
      loading:true,
      countries: countrydata
    }
    this.handleFilterChange = this.handleFilterChange.bind(this)
    this.nextscroll = this.nextscroll.bind(this)
    this.companycheck = this.companycheck.bind(this)
  }

  componentDidMount(){
    // if(localStorage.getItem("scholarly-filter")){
    //   this.setState({filter: localStorage.getItem("scholarly-filter")})
    // }
    this.nextscroll()
  }

  handleFilterChange = (filter)=>{
    localStorage.setItem("scholarly-filter", filter.value)
    console.log(filter.value)
    this.setState({
      filter:filter.value,
      companies: [],
      page: 1,
      loading: true
    },() => {
      this.nextscroll()
    })
    console.log(filter)
  }


  shuffleArray(array) {
    let i = array.length - 1;
    for (; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  }

  companycheck(comp) {
    var complist = this.state.companies;
    for(let i=0; i<complist.length; i++){
      if(complist[i]._id===comp._id) return true
    }
    return false
  }

  nextscroll(){
    getAllCompanies(this.state.page, this.state.filter)
    .then(data => {
      // console.log(data.companies)
      var nextPageNumber = data.companies.length < 10 ? this.state.page : this.state.page + 1;
      var companylist = this.state.companies
      // console.log(data.companies.length)
      this.shuffleArray(data.companies).forEach(comp => {
        if(!this.companycheck(comp)) companylist.push(comp)
      });

      this.setState({
          status: data.status,
          companies:companylist,
          hasMore: data.companies.length < 8 ? false : true,
          page: nextPageNumber,
          loading: false
      })
    }).catch(err=>console.log(err))
  }

  
  render() {
    return (
      <>
        <nav className="navbar">
          <h1>Companies</h1>
          <div className="location-dropdown">
            <Select
              options={this.state.countries}
              className="loc-drop"
              value={this.state.filter}
              onChange={this.handleFilterChange}
              placeholder={this.state.filter==='all'?"Select the location..":this.state.filter}
            />
          </div>
        </nav>
        <div className="main-content-container">
          <div className="cards">
          <InfiniteScroll
            dataLength={this.state.companies.length}
            next={this.nextscroll}
            hasMore={this.state.hasMore}
            endMessage={
              <p style={{textAlign: 'center'}}>
                <b>Yay! You have seen it all</b>
              </p>
            }
          >
            <div className="all-cards">
              {this.state.companies.map((comp) => {
                return <Card key={comp._id} comp={comp} loc={this.state.filter}/>;
              })}
            </div>
            {this.state.hasMore && this.state.companies.length>0 &&
              <p style={{textAlign: 'center'}}>
                <b>Loading ...</b>
              </p>
            }
            </InfiniteScroll>
          </div>
        </div>
      </>
    );
  }
};
export { Company };