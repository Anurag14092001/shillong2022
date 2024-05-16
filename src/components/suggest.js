import { getDatabase, onValue,ref } from 'firebase/database';
import React, { Component } from 'react'
import firedb from './firebaseconfig';

export default class Suggest extends Component {

constructor(){
    super();
    this.state={
        componenttable: [],
        ingredient: "",
        displayarr: [],
        color: "white",
        backgroundColor: "black" 
    }
}

    componentDidMount(){
        const db = getDatabase(firedb);
        var obj="";
        var records=[];
        onValue(ref(db, "Medicines/"),(snapshot)=>{
            snapshot.forEach((childSnapshot)=>{
                const key = childSnapshot.key;
                const ingredients = childSnapshot.val().ingredients;
                obj= {"name": key, "ingredients": ingredients.toString()};
                records.push(obj);
                
            }
            )
            this.setState({...this.state,componenttable: records},()=>{console.log(this.state.componenttable)});
            console.log(records);

        })
    }

    changedata=(e)=>{
     this.setState({...this.state,ingredient: e.target.value });
    }



  render() {

   const searchdata=()=>{
        const query = this.state.ingredient.toUpperCase().split("+").sort().toString();
        console.log(query)
        const database = this.state.componenttable;
        console.log(database);
        let records=[];
        var i=0
        for(;i<database.length;i++){
            const element = database[i].ingredients
            
            if(element===query){
                        
                records.push(database[i]);
            }
        }
        
        console.log(records);
        this.setState({...this.state,displayarr:records});
    }

    return (
      <>
   <input type="text" style={{color: "azure", marginTop: "10px", backgroundColor:"rgba(22, 20, 20, 0.712)"}} id="ingredient" placeholder='enter the ingredient' value={this.state.ingredient} onChange={this.changedata} aria-label="Search" className='form-control' />
    <p style={{textAlign: "center",marginTop: "10px"}} >  <button style={{backgroundColor: this.state.backgroundColor,color:this.state.color}} onMouseEnter={()=>{this.setState({...this.state,backgroundColor: "azure",color: "black"})}} onMouseLeave={()=>{this.setState({...this.state,backgroundColor: "black",color: "azure"})}} className='btn btn-primary success' onClick={searchdata}>Search</button></p>

   {this.state.displayarr[0] && <div className='card' style={{color: "azure",backgroundColor:"rgba(22, 20, 20, 0.712)",padding:"10px 20px"}}>
   <p style={{ textAlign: "center", backgroundColor:"rgba(255, 63, 29, 0.562)",padding:"5px 0px",borderRadius: "15px", fontStyle: "solid",color: "azure" }} >Suggested Medicines</p>
      {this.state.displayarr.map((element)=>{
      return(
        <>
        <li>Name: {element.name}</li>
        <ul>{element.ingredients.split(",").map((element)=>{return(
            <li>{element}</li>)
        })}</ul>
        

        
        </>
      )
    })}
    </div>}


      </>
    )
 }}
