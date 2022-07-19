import React, { Component ,useRef} from 'react';
import firedb from './firebaseconfig';
import { getDatabase, set, ref, onValue } from 'firebase/database';

export default class Updatemedicine extends Component {
  
 

  constructor() {
    super();
    this.nameref=React.createRef();
    this.amountref=React.createRef();
    this.tabletamountref=React.createRef();
    this.shelfref=React.createRef();
    this.surplusref=React.createRef();
    this.priceref=React.createRef();
    this.ingredientsref=React.createRef();
    this.monthref=React.createRef();
    this.yearref=React.createRef();
    this.state = {
      medicinename: "",
      
      medicineshelflocation: "",

      medicinetabletamount: "",

      medicineexpirymonth: "",

      medicineexpiryyear: "",
     
      medicinesurpluslocation: "",
      
      medicineingredients: "",
      
      medicineprice: "",

      medicineamount: "", 
      queryname: "",
      displayarr: [],color1: "azure",
      backgroundColor1: "black",
      color2: "azure",
      backgroundColor2: "black",
      color3: "azure",
      backgroundColor3: "black"
      
    }
  }

  pastedata=()=>{
    
    this.nameref.current.value=this.state.displayarr[0].key;
    this.amountref.current.value=this.state.displayarr[0].amount;
    this.tabletamountref.current.value=this.state.displayarr[0].tabletamount;
    this.shelfref.current.value=this.state.displayarr[0].shelf;
    this.surplusref.current.value=this.state.displayarr[0].surplus;
    this.priceref.current.value=this.state.displayarr[0].price;
    this.ingredientsref.current.value=this.state.displayarr[0].ingredients.join("+");
    this.monthref.current.value=this.state.displayarr[0].expiry.split("/")[0];
    this.yearref.current.value=this.state.displayarr[0].expiry.split("/")[1];

    this.setState( {...this.state,
      medicinename:this.state.displayarr[0].key ,
      
      medicineshelflocation: this.state.displayarr[0].shelf ,

      medicinetabletamount: this.state.displayarr[0].tabletamount,

      medicineexpirymonth: this.state.displayarr[0].expiry.split("/")[0],

      medicineexpiryyear: this.state.displayarr[0].expiry.split("/")[1],
     
      medicinesurpluslocation: this.state.displayarr[0].surplus,
      
      medicineingredients: this.state.displayarr[0].ingredients.join("+"),
      
      medicineprice: this.state.displayarr[0].price,

      medicineamount: this.state.displayarr[0].amount, 
    
      
    }
    )
    
    
  }

  handlechange = (e) => {
    this.setState({ [e.target.name]: e.target.value, });

  }
  
  updatedata = (e) => {
    e.preventDefault();
  

   
    const db=getDatabase(firedb);
    
    const medicine={
      name: this.state.medicinename.toUpperCase(),
      shelflocation: this.state.medicineshelflocation.toUpperCase(),
      surpluslocation: this.state.medicinesurpluslocation.toUpperCase(),
      ingredients: this.state.medicineingredients.toUpperCase().split("+"),
      tablettotal: `${parseFloat(this.state.medicineamount.toUpperCase())*parseFloat(this.state.medicinetabletamount.toUpperCase())}`,
      price: this.state.medicineprice.toUpperCase(),
      amount: this.state.medicineamount.toUpperCase(),
      tabletamount: this.state.medicinetabletamount.toUpperCase(),
      medicinepricepertablet: `${parseInt(this.state.medicineprice)/parseInt(this.state.medicinetabletamount)}`.toUpperCase(),
      expiry: `${(this.state.medicineexpirymonth)}/${(this.state.medicineexpiryyear)}`.toUpperCase()
    }
    
    if(medicine.name===""||medicine.shelflocation===""||medicine.surpluslocation===""||this.state.medicineingredients.toUpperCase()===""||medicine.price===""||medicine.amount===""||medicine.tabletamount===""||this.state.medicineexpirymonth===""||this.state.medicineexpiryyear===""){
 alert("Please fill all the fields");
    }else{
      set(ref(db, "Medicines/"+this.state.medicinename),(medicine)).then(alert(`the details for ${this.state.medicinename} were updated`)).catch((err)=>{alert(err)});
      console.log("4");

      
      this.nameref.current.value="";
      this.amountref.current.value="";
      this.tabletamountref.current.value="";
      this.shelfref.current.value="";
      this.surplusref.current.value="";
      this.priceref.current.value="";
      this.ingredientsref.current.value="";
      this.monthref.current.value="";
      this.yearref.current.value="";

      this.setState( {...this.state,
       
        medicinename: "",
      
        medicineshelflocation: "",
  
        medicinetabletamount: "",
  
        medicineexpirymonth: "",
  
        medicineexpiryyear: "",
       
        medicinesurpluslocation: "",
        
        medicineingredients: "",
        
        medicineprice: "",
  
        medicineamount: "",  
      
        
      }
      )}

    }
    
    
      searchdata=(e)=>{
        
       
        e.preventDefault();
        
        const db= getDatabase(firedb);
        let record=[];
        const name= this.state.queryname.toUpperCase();
        onValue(ref(db, "Medicines/"+name), (snapshot)=>{
         const key= snapshot.key;
         const price =snapshot.val().price;
         const expiry =snapshot.val().expiry;
         const amount =snapshot.val().amount;
         const pertab =snapshot.val().medicinepricepertablet;
         const shelf =snapshot.val().shelflocation;
         const surplus =snapshot.val().surpluslocation;
         const ingredients= snapshot.val().ingredients;
         const tabletamount =snapshot.val().tabletamount;
         record=[{"key":key, "price":price,"ingredients":ingredients, "tabletamount": tabletamount,"surplus":surplus,"amount":amount,"pertab":pertab,"shelf":shelf,"expiry":expiry}];
         console.log(record);
        })
        this.setState({displayarr:record});

      }

  
  render() {

    const inputstyle={
      color: "azure",
      backgroundColor: "black"
    }

    const spanstyle={
      color: "azure",
      backgroundColor: "black"
    }

    return (
      <>
   <form >
     <h2 style={{textAlign: "center",color:"azure"}}>Reference Section</h2>
     <div className="input-group flex-nowrap my-2">
          <span style={spanstyle} className="input-group-text" id="addon-wrapping">Medicine</span>
          <input type="text" style={inputstyle} name='queryname'  className="form-control" onChange={this.handlechange} placeholder="Enter the name of medicine" aria-label="Username" aria-describedby="addon-wrapping" />
        </div>
        <p style={{textAlign: "center"}}><button style={{color: this.state.color1,backgroundColor:this.state.backgroundColor1}} onMouseLeave={()=>{this.setState({...this.state,color1:"azure",backgroundColor1:"black"})}} onMouseEnter={()=>{this.setState({...this.state,color1: "black",backgroundColor1:"azure"})}} onClick={this.searchdata} className='btn btn-primary success'> Search</button></p>
   </form>

   <div className="card my-3" style={{color: "azure",backgroundColor: "rgba(22, 20, 20, 0.712)"}} >
  <ul className="list-group list-group-flush">
    {this.state.displayarr.map((element)=>{
      return(
        <>
        <li>Name: {element.key}</li>
        <li>Expiry: {element.expiry}</li>
        <li>Shelf: {element.shelf}</li>
        <li>surplus: {element.surplus}</li>
        <li>Number of strips remaining: {element.amount}</li>
        <li>Number of tablets per strip: {element.tabletamount}</li>
        <li>Price per strip: Rs.{element.price}</li>
        <li>Cost per Tablet: Rs.{element.pertab}</li>
        <li><ul >Ingredients:{element.ingredients.map((element)=>{return(<><li>{element}</li></>)})}</ul></li>
       <button style={{color: this.state.color2,backgroundColor:this.state.backgroundColor2}} onMouseLeave={()=>{this.setState({...this.state,color2:"azure",backgroundColor2:"black"})}} onMouseEnter={()=>{this.setState({...this.state,color2: "black",backgroundColor2:"azure"})}} className='btn btn-primary success' onClick={this.pastedata} >Paste</button>
        
        
        </>
      )
    })}
  </ul>
  
</div>


 <form >
        <h2 style={{textAlign: "center",color:"azure"}}>Enter Medicine Details to be Updated</h2>

        <div className="input-group flex-nowrap my-2">
          <span style={spanstyle} className="input-group-text" id="addon-wrapping">Medicine name</span>
          <input type="text" style={inputstyle} name='medicinename' ref={this.nameref} id="updatemedicinename" className="form-control" onChange={this.handlechange} placeholder="seperate the ingredients using a plus sign" aria-label="Username" aria-describedby="addon-wrapping" />
        </div>

        <div className="input-group flex-nowrap my-2">
          <span style={spanstyle} className="input-group-text" id="addon-wrapping">Medicine Amount</span>
          <input type="text" style={inputstyle} name='medicineamount' ref={this.amountref} id="updatemedicinename" className="form-control" onChange={this.handlechange} placeholder="Enter the new number of medicines after addition " aria-label="Username" aria-describedby="addon-wrapping" />
        </div>

        <div className="input-group flex-nowrap my-2">
          <span style={spanstyle} className="input-group-text" id="addon-wrapping">Medicine Tablet Amount</span>
          <input  type="text" style={inputstyle} name='medicinetabletamount' ref={this.tabletamountref} id="updatemedicinename" className="form-control" onChange={this.handlechange} placeholder="Enter the number of tablets per strip " aria-label="Username" aria-describedby="addon-wrapping" />
        </div>

        <div className="input-group flex-nowrap my-2">
          <span style={spanstyle} className="input-group-text" id="addon-wrapping">Medicine shelf location</span>
          <input type="text" style={inputstyle} name='medicineshelflocation' ref={this.shelfref} id="updatemedicineshelflocation" className="form-control" onChange={this.handlechange} placeholder="seperate the ingredients using a plus sign" aria-label="Username" aria-describedby="addon-wrapping" />
        </div>

        <div className="input-group flex-nowrap my-2">
          <span style={spanstyle} className="input-group-text" id="addon-wrapping">Medicine Surplus Shelf location</span>
          <input type="text" style={inputstyle} name='medicinesurpluslocation' ref={this.surplusref} id="updatemedicinesurpluslocation" className="form-control" onChange={this.handlechange} placeholder="seperate the ingredients using a plus sign" aria-label="Username" aria-describedby="addon-wrapping" />
        </div>

        <div className="input-group flex-nowrap my-2">
          <span style={spanstyle} className="input-group-text" id="addon-wrapping">Medicine Price</span>
          <input type="text" style={inputstyle} name='medicineprice' ref={this.priceref} id="updatemedicineprice" className="form-control" onChange={this.handlechange} placeholder="seperate the ingredients using a plus sign" aria-label="Username" aria-describedby="addon-wrapping" />
        </div>

        <div className="input-group flex-nowrap my-2">
          <span style={spanstyle} className="input-group-text" id="addon-wrapping">Medicine ingredients</span>
          <input type="text" style={inputstyle} name='medicineingredients' ref={this.ingredientsref} id="updatemedicineingredients" className="form-control" onChange={this.handlechange} placeholder="seperate the ingredients using a plus sign" aria-label="Username" aria-describedby="addon-wrapping" />
        </div>

        <div className="input-group mb-3 my-2">
  <input type="text" style={inputstyle} className="form-control" name='medicineexpirymonth' ref={this.monthref} onChange={this.handlechange} value={this.state.medicineexpirymonth} placeholder="New Month" aria-label="Month"/>
  <span style={spanstyle} className="input-group-text">Medicine expiry date</span>
  <input type="text" style={inputstyle} className="form-control" name='medicineexpiryyear' ref={this.yearref} onChange={this.handlechange} value={this.state.medicineexpiryyear} placeholder="New Year" aria-label="Year"/>
         </div>

      <p style={{textAlign: "center"}}>  <button style={{color: this.state.color3,backgroundColor:this.state.backgroundColor3}} onMouseLeave={()=>{this.setState({...this.state,color3:"azure",backgroundColor3:"black"})}} onMouseEnter={()=>{this.setState({...this.state,color3: "black",backgroundColor3:"azure"})}} className='btn btn-primary success my-3' onClick={this.updatedata}>Update</button></p>
</form>

      </>
    )
  }
}
