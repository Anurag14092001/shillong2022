import React, { Component } from 'react'
import { useState } from 'react';
import firedb from "./firebaseconfig";
import { onValue, getDatabase, ref, set } from 'firebase/database';

export default class Medicinedatabase extends Component {
  constructor() {
    super();
    this.state = {
      medicinename: "",
      medicinededuction: "",
      tabledata: [],
      total: "0",
      displayarr: [],
      medicinetabletdeduction: "",
      color1: "azure",
      backgroundColor1: "black",
      color2: "azure",
      backgroundColor2: "black",



    }
  }

  searchdata=(e)=>{
        
       
    e.preventDefault();
    
    const db= getDatabase(firedb);
    let record=[];
    const name= this.state.medicinename.toUpperCase();
    onValue(ref(db, "Medicines/"+name), (snapshot)=>{
      
      const key = snapshot.key;
      const data= snapshot.val();
      record =[{"key": key, "data": data}]})
      console.log(record);
      this.setState({...this.state,displayarr:record},()=>{console.log(this.state.displayarr[0])});
      console.log("search complete");
    
  }

  commit=(e)=>{
   e.preventDefault();
   window.location.reload();
   
   
  }

  finish=(e)=>{
  e.preventDefault();
  const db= getDatabase(firedb);
  this.state.tabledata.forEach((obj)=>{
    let strips="";
    let tablets="";
    onValue(ref(db, "Medicines/"+obj.key),(snapshot)=>{
      strips = snapshot.val().amount;
      tablets = snapshot.val().tablettotal;
    })


    set(ref(db, "Medicines/"+obj.key),{
      amount: `${((parseFloat(tablets)+parseFloat(obj.deduction))/parseFloat(obj.data.tabletamount))}`,
        expiry: obj.data.expiry,
        ingredients: obj.data.ingredients,
        medicinepricepertablet: obj.data.medicinepricepertablet,
        name: obj.data.name,
        price: obj.data.price,
        shelflocation: obj.data.shelflocation,
        surpluslocation: obj.data.surpluslocation,
        tabletamount: obj.data.tabletamount,
        tablettotal: `${parseFloat(tablets)+parseFloat(obj.deduction)}`
    })}
    

  )
  this.setState({...this.state,tabledata:[]});
  }

  addmedicine = (e) => {
    e.preventDefault();
    const db= getDatabase(firedb);
    const name= this.state.medicinename.toUpperCase();
    var deduction="";
    if(this.state.medicinededuction===""&&this.state.medicinetabletdeduction!==""){
     deduction= `${parseFloat(this.state.medicinetabletdeduction)}`;}
    else if(this.state.medicinededuction!==""&&this.state.medicinetabletdeduction===""){
     deduction = `${parseFloat(this.state.medicinededuction)*parseFloat(this.state.displayarr[0].data.tabletamount)}`;
    }
    else if(this.state.medicinededuction!==""&&this.state.medicinetabletdeduction!==""){
    deduction = `${parseFloat(this.state.medicinetabletdeduction)+(parseFloat(this.state.medicinededuction)*parseFloat(this.state.displayarr[0].data.tabletamount))}`
    }
    console.log(deduction);
    var obj ="";
    onValue(ref(db, "Medicines/"+name),(snapshot)=>{
      
      const key= snapshot.key;
      const price= snapshot.val().price;
      const data= snapshot.val();
      const amount =snapshot.val().amount;
      const cost = `${(parseFloat(snapshot.val().price)*(parseFloat(deduction)/parseFloat(snapshot.val().tabletamount)))}`;
      
      obj = {"key":key,"price":price,"amount":amount,"deduction": deduction,"data":data,"cost":cost};
      console.log("check");
      console.log(obj);
      }
    )

    if(parseFloat(obj.data.tablettotal)>parseFloat(obj.deduction)){
      set(ref(db, "Medicines/"+obj.key),{
        amount: `${((parseFloat(obj.data.tablettotal)-parseFloat(obj.deduction))/parseFloat(obj.data.tabletamount))}`,
        expiry: obj.data.expiry,
        ingredients: obj.data.ingredients,
        medicinepricepertablet: obj.data.medicinepricepertablet,
        name: obj.data.name,
        price: obj.data.price,
        shelflocation: obj.data.shelflocation,
        surpluslocation: obj.data.surpluslocation,
        tabletamount: obj.data.tabletamount,
        tablettotal: `${parseFloat(obj.data.tablettotal)-parseFloat(obj.deduction)}`
      })
      this.setState({...this.state,tabledata:[...this.state.tabledata,obj],total: `${parseFloat(this.state.total)+parseFloat(obj.cost)}`});
  this.searchdata();
    console.log(obj);}

    if(parseFloat(obj.data.tablettotal)<parseFloat(obj.deduction)){
     alert(`there are only ${obj.amount} units of ${obj.key} remaining!`);
    }
    console.log(0);

    if(parseFloat(obj.data.tablettotal)===parseFloat(obj.deduction)){
      set(ref(db, "Medicines/"+obj.key),{
        amount: `${((parseFloat(obj.data.tablettotal)-parseFloat(obj.deduction))/parseFloat(obj.data.tabletamount))}`,
        expiry: obj.data.expiry,
        ingredients: obj.data.ingredients,
        medicinepricepertablet: obj.data.medicinepricepertablet,
        name: obj.data.name,
        price: obj.data.price,
        shelflocation: obj.data.shelflocation,
        surpluslocation: obj.data.surpluslocation,
        tabletamount: obj.data.tabletamount,
        tablettotal: `${parseFloat(obj.data.tablettotal)-parseFloat(obj.deduction)}`
      });
      console.log(1);
      this.setState({...this.state,tabledata:[...this.state.tabledata,obj],total: `${parseFloat(this.state.total)+parseFloat(obj.cost)}`});
      console.log(2);
      alert(`${obj.key} has been finished!`);
      
    }

    

  
   
    
  
  }




  render() {

    const changedata = (e) => {
      this.setState({ [e.target.id]: e.target.value });
    }



    return (
      <>
        <div style={{paddingTop: "12px"}} className="input-group">
          <span className="input-group-text" style={{color:"azure",backgroundColor:"black"}} >Search</span>
          <input type="text" style={{backgroundColor: "rgba(22, 20, 20, 0.712)",color:"azure"}} id="medicinename" placeholder='enter name of medicine' value={this.state.medicinename} onChange={changedata} aria-label="Search" className="form-control" />
          
        </div>

       <p style={{textAlign: "center",paddingTop: "5px"}}> <button className='btn btn-primary success' style={{color: this.state.color1,backgroundColor: this.state.backgroundColor1}} onMouseEnter={()=>{this.setState({...this.state,color1: "black",backgroundColor1:"azure"})}} onMouseLeave={()=>{this.setState({...this.state,color1:"azure",backgroundColor1:"black"})}} onClick={this.searchdata} > Search </button></p>
        {this.state.displayarr.map((element)=>{
      return(
        <>
        <div className='card' style={{color: "azure",backgroundColor: "rgba(22, 20, 20, 0.712)",padding:"10px 10px"}}>
        <li>Name: {element.key}</li>
        <li>Shelf: {element.data.shelflocation}</li>
        <li>Surplus: {element.data.surpluslocation}</li>
        <li>strips left: {element.data.amount}</li>
        <li>tablets left: {(element.data.tablettotal)}</li>
        <li>Price per strip: {element.data.price}</li>
        <li>Tablets per strip: {element.data.tabletamount}</li>
        <li>price per tablet: {element.data.medicinepricepertablet}</li>
        <li>expiry: {element.data.expiry}</li>
        <input type="text" style={{color:"azure",backgroundColor:"black",margin:"5px 0px"}} id="medicinededuction" placeholder='Enter how many strips/bottles you want to add' value={this.state.medicinededuction} onChange={changedata} aria-label="Last name" className="form-control" />
        <input type="text" style={{color:"azure",backgroundColor:"black",margin:"5px 0px"}} id="medicinetabletdeduction" placeholder='Enter how many tablets you want to add' value={this.state.medicinetabletdeduction} onChange={changedata} aria-label="Last name" className="form-control" />
        <button className='btn btn-primary success' style={{margin:"5px 0px",color: this.state.color2,backgroundColor: this.state.backgroundColor2}} onMouseEnter={()=>{this.setState({...this.state,color2: "black",backgroundColor2:"azure"})}} onMouseLeave={()=>{this.setState({...this.state,color2:"azure",backgroundColor2:"black"})}} onClick={this.addmedicine} > Add </button>
        </div>
        </>
      )
    })}

       {this.state.tabledata[0] && <div className='card' style={{backgroundColor:"rgba(22, 20, 20, 0.712)",margin:"5px 0px"}}> <table style={{color: "azure" }} className="table">
          <thead>
            <tr>
              <th scope="col">Sl. No</th>
              <th scope="col">Medicine name</th>
              <th scope="col">Price per strip</th>
              <th scope="col">Number of Strips</th>
              <th scope="col">Total Cost for medicine</th>
            </tr>
          </thead>
          <tbody>

            {this.state.tabledata.map((element) => {
              return (
                <><tr>
                  <th scope='row'></th>
                  <td>{element.key}</td>
                  <td>{element.price}</td>
                  <td>{element.deduction/element.data.tabletamount}</td>
                  <td>{element.cost}</td>
                </tr>
                </>
              )
            })}
          </tbody>
        </table></div>}

        <h2 style={{textAlign: "center",color:"azure"}}>Total: {this.state.total} </h2>
        
        <p style={{textAlign: "center"}}><button className='btn btn-primary success' style={{margin:"5px 0px",color: this.state.color2,backgroundColor: this.state.backgroundColor2}} onMouseEnter={()=>{this.setState({...this.state,color2: "black",backgroundColor2:"azure"})}} onMouseLeave={()=>{this.setState({...this.state,color2:"azure",backgroundColor2:"black"})}} onClick={this.commit}> Save </button>

        <button className='btn btn-primary success' style={{margin:"5px 0px",color: this.state.color2,backgroundColor: this.state.backgroundColor2}} onMouseEnter={()=>{this.setState({...this.state,color2: "black",backgroundColor2:"azure"})}} onMouseLeave={()=>{this.setState({...this.state,color2:"azure",backgroundColor2:"black"})}} onClick={this.finish} > Cancel </button></p>

      </>

    )
  }
}
