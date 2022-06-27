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
      medicinetabletdeduction: ""



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

  addmedicine = (e) => {
    e.preventDefault();
    const db= getDatabase(firedb);
    const name= this.state.medicinename.toUpperCase();
    var deduction="";
    if(this.state.medicinededuction===""&&this.state.medicinetabletdeduction!==""){
     deduction= `${parseFloat(this.state.medicinetabletdeduction)/parseFloat(this.state.displayarr[0].data.tabletamount)}`;}
    else if(this.state.medicinededuction!==""&&this.state.medicinetabletdeduction===""){
     deduction = this.state.medicinededuction;
    }
    else if(this.state.medicinededuction!==""&&this.state.medicinetabletdeduction!==""){
    deduction = `${parseFloat(this.state.medicinededuction)+(parseFloat(this.state.medicinetabletdeduction)/parseFloat(this.state.displayarr[0].data.tabletamount))}`
    }
    console.log(deduction);
    var obj ="";
    onValue(ref(db, "Medicines/"+name),(snapshot)=>{
      
      const key= snapshot.key;
      const price= snapshot.val().price;
      const data= snapshot.val();
      const amount =snapshot.val().amount;
      const cost = `${(parseFloat(snapshot.val().price)*parseFloat(deduction))}`;
      
      obj = {"key":key,"price":price,"amount":amount,"deduction": deduction,"data":data,"cost":cost};
      console.log("check");
      console.log(obj);
      }
    )

    if(parseFloat(obj.amount)>parseFloat(obj.deduction)){
      set(ref(db, "Medicines/"+obj.key),{
        amount: `${(parseFloat(obj.amount)-parseFloat(obj.deduction))}`,
        expiry: obj.data.expiry,
        ingredients: obj.data.ingredients,
        medicinepricepertablet: obj.data.medicinepricepertablet,
        name: obj.data.name,
        price: obj.data.price,
        shelflocation: obj.data.shelflocation,
        surpluslocation: obj.data.surpluslocation,
        tabletamount: obj.data.tabletamount
      })
      this.setState({...this.state,tabledata:[...this.state.tabledata,obj],total: `${parseFloat(this.state.total)+parseFloat(obj.cost)}`});
  this.searchdata();
    console.log(obj);}

    if(parseFloat(obj.amount)<parseFloat(obj.deduction)){
     alert(`there are only ${obj.amount} units of ${obj.key} remaining!`);
    }

    if(parseFloat(obj.amount)===parseFloat(obj.deduction)){
      set(ref(db, "Medicines/"+obj.key),{
        amount: `${(parseFloat(obj.amount)-parseFloat(obj.deduction))}`,
        expiry: obj.data.expiry,
        ingredients: obj.data.ingredients,
        medicinepricepertablet: obj.data.medicinepricepertablet,
        name: obj.data.name,
        price: obj.data.price,
        shelflocation: obj.data.shelflocation,
        surpluslocation: obj.data.surpluslocation,
        tabletamount: obj.data.tabletamount
      })
      this.setState({...this.state,tabledata:[...this.state.tabledata,obj],total: `${parseFloat(this.state.total)+parseFloat(obj.cost)}`});
      alert(`${obj.key} has been finished!`);
      this.searchdata();
    }

    

  
   
    
  
  }




  render() {

    const changedata = (e) => {
      this.setState({ [e.target.id]: e.target.value });
    }



    return (
      <>
        <div style={{paddingTop: "12px"}} className="input-group">
          <span className="input-group-text">Search</span>
          <input type="text" id="medicinename" placeholder='enter name of medicine' value={this.state.medicinename} onChange={changedata} aria-label="Search" className="form-control" />
          
        </div>

       <p style={{textAlign: "center",paddingTop: "5px"}}> <button className='btn btn-primary success'  onClick={this.searchdata} > Search </button></p>
        {this.state.displayarr.map((element)=>{
      return(
        <>
        <li>Name: {element.key}</li>
        <li>Shelf: {element.data.shelflocation}</li>
        <li>Surplus: {element.data.surpluslocation}</li>
        <li>strips left: {element.data.amount}</li>
        <li>Price per strip: {element.data.price}</li>
        <li>Tablets per strip: {element.data.tabletamount}</li>
        <li>price per tablet: {element.data.medicinepricepertablet}</li>
        <li>expiry: {element.data.expiry}</li>
        <input type="text" id="medicinededuction" placeholder='Enter how many strips/bottles you want to add' value={this.state.medicinededuction} onChange={changedata} aria-label="Last name" className="form-control" />
        <input type="text" id="medicinetabletdeduction" placeholder='Enter how many tablets you want to add' value={this.state.medicinetabletdeduction} onChange={changedata} aria-label="Last name" className="form-control" />
        <button className='btn btn-primary success' onClick={this.addmedicine} > Add </button>
        </>
      )
    })}

        <table style={{color: "azure"}} className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
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
                  <th scope='row'>#</th>
                  <td>{element.key}</td>
                  <td>{element.price}</td>
                  <td>{element.deduction}</td>
                  <td>{element.cost}</td>
                </tr>
                </>
              )
            })}
          </tbody>
        </table>

        <h2>Total: {this.state.total} </h2>

      </>

    )
  }
}
