import React, { Component } from 'react';


import firedb from './firebaseconfig';

import { set, ref,  getDatabase, } from 'firebase/database';


export default class Addmedicine extends Component {

  constructor() {
    super();
   this.nameref = React.createRef();
   this.shelfref = React.createRef();
   this.surplusref = React.createRef();
   this.ingredientref =React.createRef();
   this.priceref = React.createRef();
   this.amountref = React.createRef();
   this.monthref = React.createRef();
   this.yearref = React.createRef();
   this.tabletamountref = React.createRef();

    this.state = {
      
      medicineName: "",
      medicineShelfLocation: "",
      medicineSurplusLocation: "",
      medicineingredients: "",
      medicineprice: "",
      medicinetabletamount: "",
      medicineamount: "",
      medicineexpirymonth: "",
      medicineexpiryyear: "",
      color1: "azure",
      backgroundColor1: "black",
    }
  }








  senddata = (e) => {
    

e.preventDefault();



console.log("0");
    const medicine = {
      name: this.state.medicineName.toUpperCase(),
      shelflocation: this.state.medicineShelfLocation.toUpperCase(),
      surpluslocation: this.state.medicineSurplusLocation.toUpperCase(),
      ingredients: this.state.medicineingredients.toUpperCase().split("+"),
      tablettotal: `${parseFloat(this.state.medicineamount)*parseFloat(this.state.medicinetabletamount)}`,
      price: this.state.medicineprice.toUpperCase(),
      amount: this.state.medicineamount.toUpperCase(),
      tabletamount: this.state.medicinetabletamount.toUpperCase(),
      medicinepricepertablet: `${parseInt(this.state.medicineprice)/parseInt(this.state.medicinetabletamount)}`.toUpperCase(),
      expiry: `${this.state.medicineexpirymonth}/${this.state.medicineexpiryyear}`.toUpperCase()
    };
    
    if(medicine.name===""||medicine.surpluslocation===""||medicine.shelflocation===""||this.state.medicineingredients.toUpperCase()===""||medicine.price===""||medicine.amount===""||medicine.tabletamount===""||this.state.medicineexpirymonth===""||this.state.medicineexpiryyear===""){
      alert("Please fill all the fields");}
      else{
      console.log("1")
    const db = getDatabase(firedb);
    console.log("2");
   set(ref(db, "Medicines/"+medicine.name),(medicine)).then(alert(`the details for ${this.state.medicineName} were updated`)).catch((err)=>{alert(err)});;
   
   this.nameref.current.value="";
   this.shelfref.current.value="";  
   this.surplusref.current.value="";   
   this.ingredientref.current.value="";
   this.priceref.current.value="";  
   this.amountref.current.value="";   
   this.monthref.current.value="";  
   this.yearref.current.value=""; 
   this.tabletamountref.current.value="";

   this.setState({
     medicineName: "",
      medicineShelfLocation: "",
      medicineSurplusLocation: "",
      medicineingredients: "",
      medicineprice: "",
      medicinetabletamount: "",
      medicineamount: "",
      medicineexpirymonth: "",
      medicineexpiryyear: ""
   })}

    

  }



  handlechange = e => {
    this.setState({ [e.target.name]: e.target.value });
    
  }

  render() {

const spanstyle={
  color: "azure",
  backgroundColor: "black"
}

const inputstyle={
  color: "azure",
  backgroundColor: "black"
}


    return (<>
       
      <form  >
      <h2 style={{textAlign: "center",color:"azure"}}>MEDICINE INPUT SECTION</h2>
        <div className="input-group flex-nowrap my-2">
          <span className="input-group-text" style={spanstyle} id="addon-wrapping">Medicine Name</span>
          <input type="text" name='medicineName' style={inputstyle} ref={this.nameref} className="form-control" onChange={this.handlechange} placeholder="Enter Name of Medicine" aria-label="Username" aria-describedby="addon-wrapping" />
        </div>

        <div className="input-group flex-nowrap my-2">
          <span className="input-group-text" style={spanstyle} id="addon-wrapping">Medicine Number</span>
          <input type="number" name='medicineamount' style={inputstyle}  ref={this.amountref} className="form-control" onChange={this.handlechange} placeholder="Enter number of strips of medicine" aria-label="Username" aria-describedby="addon-wrapping" />
        </div>

        <div className="input-group flex-nowrap my-2">
          <span className="input-group-text" style={spanstyle} id="addon-wrapping">Medicine Tablet Amount</span>
          <input type="text" name='medicinetabletamount' style={inputstyle}  ref={this.tabletamountref} className="form-control" onChange={this.handlechange} placeholder="Enter number of tablets per strip of medicine" aria-label="Username" aria-describedby="addon-wrapping" />
        </div>

        <div className="input-group flex-nowrap my-2">
          <span style={spanstyle} className="input-group-text" id="addon-wrapping">Medicine Shelf Location</span>
          <input type="text" name='medicineShelfLocation' style={inputstyle} ref={this.shelfref} className="form-control" onChange={this.handlechange} placeholder="Enter location of medicine for sale" aria-label="Username" aria-describedby="addon-wrapping" />
        </div>

        <div className="input-group flex-nowrap my-2">
          <span style={spanstyle} className="input-group-text" id="addon-wrapping">Medicine Surplus Location</span>
          <input type="text" name='medicineSurplusLocation' style={inputstyle} ref={this.surplusref} className="form-control" onChange={this.handlechange} placeholder="Enter Surplus Shelf Location" aria-label="Username" aria-describedby="addon-wrapping" />
        </div>

        <div className="input-group flex-nowrap my-2">
          <span style={spanstyle} className="input-group-text" id="addon-wrapping">Medicine ingredients</span>
          <input type="text" name='medicineingredients' style={inputstyle} ref={this.ingredientref} className="form-control" onChange={this.handlechange} placeholder="seperate the ingredients using a plus sign" aria-label="Username" aria-describedby="addon-wrapping" />
        </div>

        <div className="input-group flex-nowrap my-2">
          <span style={spanstyle} className="input-group-text" id="addon-wrapping">Medicine price</span>
          <input type="text" name='medicineprice' style={inputstyle} ref={this.priceref} className="form-control" onChange={this.handlechange} placeholder="seperate the ingredients using a plus sign" aria-label="Username" aria-describedby="addon-wrapping" />
        </div>

        <div className="input-group mb-3 my-2">
  <input type="text" className="form-control" style={inputstyle} name='medicineexpirymonth' ref={this.monthref} value={this.state.medicineexpirymonth} onChange={this.handlechange} placeholder="Month" aria-label="Month"/>
  <span style={spanstyle} className="input-group-text">Medicine expiry date</span>
  <input type="text" className="form-control" style={inputstyle} name='medicineexpiryyear' ref={this.yearref} value={this.state.medicineexpiryyear} onChange={this.handlechange} placeholder="Year" aria-label="Year"/>
         </div>
       <p style={{textAlign:"center"}}> <button style={{color: this.state.color1,backgroundColor:this.state.backgroundColor1}} onMouseLeave={()=>{this.setState({...this.state,color1:"azure",backgroundColor1:"black"})}} onMouseEnter={()=>{this.setState({...this.state,color1: "black",backgroundColor1:"azure"})}} className='btn btn-primary success my-3' onClick={this.senddata} >Add</button></p>

        </form>
       
    </>
    )
  }
}
