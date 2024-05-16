import React, { Component } from 'react'
import PropTypes from 'prop-types' 
import {Link} from "react-router-dom";

export class Navbar extends Component {

  constructor(){
    super();
  this.state={
    color1 : "black",
    backgroundColor1: "#90AFC5",
    color2 : "black",
    backgroundColor2: "#90AFC5",
    color3 : "black",
    backgroundColor3: "#90AFC5",
    color4 : "black",
    backgroundColor4: "#90AFC5",
    color5 : "black",
    backgroundColor5: "#90AFC5",
    color6 : "black",
    backgroundColor6: "#90AFC5"
  }}

  render() {
    
    

 
    let {title,toggletext,toggle,togglemode}=this.props;
 

    return (
      <nav style={{backgroundColor: "#336B87",borderRadius: "5px"}} className={`navbar navbar-expand-lg navbar-${toggle} bg-${toggle}`}>
      <div className="container-fluid">
        <Link className="navbar-brand" style={{color: this.state.color1,backgroundColor: this.state.backgroundColor1,padding:"4px 10px",borderRadius: "4px",margin: "5px 5px"}} onMouseEnter={()=>{this.setState({color1 : "#90AFC5",backgroundColor1: "black"})}} onMouseLeave={()=>{this.setState({color1 : "black",backgroundColor1: "#90AFC5"})}} to="/">Medbook</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link active" style={{color: this.state.color2,backgroundColor: this.state.backgroundColor2,padding:"4px 10px",borderRadius: "4px",margin: "5px 5px"}} onMouseEnter={()=>{this.setState({color2 : "#90AFC5",backgroundColor2: "black"})}} onMouseLeave={()=>{this.setState({color2 : "black",backgroundColor2: "#90AFC5"})}}  aria-current="page" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active" style={{color: this.state.color3,backgroundColor: this.state.backgroundColor3,padding:"4px 10px",borderRadius: "4px",margin: "5px 5px"}} onMouseEnter={()=>{this.setState({color3 : "#90AFC5",backgroundColor3: "black"})}} onMouseLeave={()=>{this.setState({color3 : "black",backgroundColor3: "#90AFC5"})}} aria-current="page" to="/Ingredient">Suggest by ingredient</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active" style={{color: this.state.color4,backgroundColor: this.state.backgroundColor4,padding:"4px 10px",borderRadius: "4px",margin: "5px 5px"}} onMouseEnter={()=>{this.setState({color4 : "#90AFC5",backgroundColor4: "black"})}} onMouseLeave={()=>{this.setState({color4 : "black",backgroundColor4: "#90AFC5"})}}  aria-current="page" to="/Medicinedatabase">Billing</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active" style={{color: this.state.color5,backgroundColor: this.state.backgroundColor5,padding:"4px 10px",borderRadius: "4px",margin: "5px 5px"}} onMouseEnter={()=>{this.setState({color5 : "#90AFC5",backgroundColor5: "black"})}} onMouseLeave={()=>{this.setState({color5 : "black",backgroundColor5: "#90AFC5"})}}  aria-current="page" to="/Addmedicine">Add Medicine</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active" style={{color: this.state.color6,backgroundColor: this.state.backgroundColor6,padding:"4px 10px",borderRadius: "4px",margin: "5px 5px"}}  onMouseEnter={()=>{this.setState({color6 : "#90AFC5",backgroundColor6: "black"})}} onMouseLeave={()=>{this.setState({color6 : "black",backgroundColor6: "#90AFC5"})}} aria-current="page" to="/Updatedatabase">Update Medicine Details</Link>
            </li>
            
            
            
          </ul>
        
        

          
        </div>
        </div>
      


    </nav>
    )
  }
}

export default Navbar