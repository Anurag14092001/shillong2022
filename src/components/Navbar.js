import React, { Component } from 'react'
import PropTypes from 'prop-types' 
import {Link} from "react-router-dom";

export class Navbar extends Component {

  

  render() {
    let {title,toggletext,toggle,togglemode}=this.props;
    return (
      <nav className={`navbar navbar-expand-lg navbar-${toggle} bg-${toggle}`}>
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">The Mediciner</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/Ingredient">Suggest by ingredient</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/Medicinedatabase">Billing</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/Addmedicine">Add Medicine</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/Updatedatabase">Update Medicine Details</Link>
            </li>
            
            
            
          </ul>
        
        

          
        </div>
        </div>
      


    </nav>
    )
  }
}

export default Navbar