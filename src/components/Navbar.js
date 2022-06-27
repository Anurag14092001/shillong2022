import React, { Component } from 'react'
import PropTypes from 'prop-types' 
import {Link} from "react-router-dom";

export class Navbar extends Component {

  constructor(){
    super();
  this.state={
    color1 : "black",
    backgroundColor1: "azure",
    color2 : "black",
    backgroundColor2: "azure",
    color3 : "black",
    backgroundColor3: "azure",
    color4 : "black",
    backgroundColor4: "azure",
    color5 : "black",
    backgroundColor5: "azure",
    color6 : "black",
    backgroundColor6: "azure"
  }}

  render() {
    
    

 
    let {title,toggletext,toggle,togglemode}=this.props;
 

    return (
      <nav style={{backgroundColor: "rgb(24, 142, 252)",borderRadius: "5px"}} className={`navbar navbar-expand-lg navbar-${toggle} bg-${toggle}`}>
      <div className="container-fluid">
        <Link className="navbar-brand" style={{color: this.state.color1,backgroundColor: this.state.backgroundColor1,padding:"4px 10px",borderRadius: "4px",margin: "5px 5px"}} onMouseEnter={()=>{this.setState({color1 : "azure",backgroundColor1: "black"})}} onMouseLeave={()=>{this.setState({color1 : "black",backgroundColor1: "azure"})}} to="/">The Mediciner</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link active" style={{color: this.state.color2,backgroundColor: this.state.backgroundColor2,padding:"4px 10px",borderRadius: "4px",margin: "5px 5px"}} onMouseEnter={()=>{this.setState({color2 : "azure",backgroundColor2: "black"})}} onMouseLeave={()=>{this.setState({color2 : "black",backgroundColor2: "azure"})}}  aria-current="page" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active" style={{color: this.state.color3,backgroundColor: this.state.backgroundColor3,padding:"4px 10px",borderRadius: "4px",margin: "5px 5px"}} onMouseEnter={()=>{this.setState({color3 : "azure",backgroundColor3: "black"})}} onMouseLeave={()=>{this.setState({color3 : "black",backgroundColor3: "azure"})}} aria-current="page" to="/Ingredient">Suggest by ingredient</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active" style={{color: this.state.color4,backgroundColor: this.state.backgroundColor4,padding:"4px 10px",borderRadius: "4px",margin: "5px 5px"}} onMouseEnter={()=>{this.setState({color4 : "azure",backgroundColor4: "black"})}} onMouseLeave={()=>{this.setState({color4 : "black",backgroundColor4: "azure"})}}  aria-current="page" to="/Medicinedatabase">Billing</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active" style={{color: this.state.color5,backgroundColor: this.state.backgroundColor5,padding:"4px 10px",borderRadius: "4px",margin: "5px 5px"}} onMouseEnter={()=>{this.setState({color5 : "azure",backgroundColor5: "black"})}} onMouseLeave={()=>{this.setState({color5 : "black",backgroundColor5: "azure"})}}  aria-current="page" to="/Addmedicine">Add Medicine</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active" style={{color: this.state.color6,backgroundColor: this.state.backgroundColor6,padding:"4px 10px",borderRadius: "4px",margin: "5px 5px"}}  onMouseEnter={()=>{this.setState({color6 : "azure",backgroundColor6: "black"})}} onMouseLeave={()=>{this.setState({color6 : "black",backgroundColor6: "azure"})}} aria-current="page" to="/Updatedatabase">Update Medicine Details</Link>
            </li>
            
            
            
          </ul>
        
        

          
        </div>
        </div>
      


    </nav>
    )
  }
}

export default Navbar