import React, { Component } from 'react';
import firedb from './firebaseconfig';
import { child, DataSnapshot, get, getDatabase, onValue, ref } from 'firebase/database';


export default class Notices extends Component {

  constructor() {
    super();
    this.state = { arr1:[],
    arr2:[]};
  }

  componentDidMount = async (e) => {

    
    const db =getDatabase(firedb);
    
    onValue(ref(db, "Medicines"),(snapshot)=>{
      let records =[];
      snapshot.forEach((childSnapshot)=>{
        const key = childSnapshot.key;
        const amount  = childSnapshot.val().amount;
        const expiry = childSnapshot.val().expiry;
        const obj= {"key": key,"amount" : JSON.parse(amount),"expiry": expiry};
        records.push(obj);
      })
      console.log(records);
      this.setState({arr1: records});
      })
      
      
    
    }
  
      
    
  
     


  
  render() {
    return (<>
      <div style={{backgroundColor: "#2A3132",marginTop:"15px"}} className="card">
        <div className="card-body">
          <p style={{ textAlign: "center", backgroundColor:"#763626",padding:"5px 0px",borderRadius: "15px", fontStyle: "solid",color: "azure" }} >Low Medicine numbers</p>
          <ul name='numberlist'>

             {this.state.arr1.map((element)=>{
             if(element.amount===0) {return(
                 <><li style={{color: "red"}}><span style={{fontWeight: "bold"}}>{element.key}</span> has been exhausted!</li></>

               )}
               else if(element.amount<10){
                 return(
                   <><li style={{color: "lightblue"}}> <span style={{fontWeight: "bold"}}>{element.key}</span> is almost depleted. Only  <span style={{fontWeight: "bold"}}>{element.amount}</span> strips are remaining.</li>
                   </>
                 )
               }
             })}    
            
            <li></li>      </ul>
        </div></div>

      <div className='card' style={{backgroundColor: "#2A3132",marginTop:"15px"}}>
        <div className="card-body">
          <p style={{ textAlign: "center", backgroundColor:"#763626",padding:"5px 0px",borderRadius: "15px", fontStyle: "solid",color: "azure" }} >Expired Medicines</p>
          <ul name='expiredlist'>
   {this.state.arr1.map((element)=>{

    const d =new Date();
     const presentyear =d.getFullYear(); 
     const presentmonth=d.getMonth()+1;
     const expiryyear = parseInt(element.expiry.slice(3,7));
     const expirymonth =parseInt(element.expiry.slice(0,2));

     if(presentyear>expiryyear){
     return(<>
     <><li style={{color: "red"}}><span style={{fontWeight: "bold"}}>{element.key}</span> has expired!</li></>
     </>)}

      if(presentyear===expiryyear&&presentmonth>=expirymonth){
       return(<>
       <><li style={{color: "red"}}><span style={{fontWeight: "bold"}}>{element.key}</span> has expired!</li></>
     </>)}

if(presentyear===expiryyear&&(expirymonth-presentmonth)<=11&&(expirymonth-presentmonth)>0){
  return(<>
  <><li style={{color: "lightblue"}}><span style={{fontWeight: "bold"}}>{element.key}</span> will expire in {expirymonth-presentmonth} months, please start pushing it!</li></>
</>)}
     }
      
     )  
   }
          </ul>
        </div>
      </div></>

    )
  }
}
