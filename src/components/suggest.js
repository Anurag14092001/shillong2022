import { getDatabase, onValue,ref } from 'firebase/database';
import React, { Component } from 'react'
import firedb from './firebaseconfig';

export default class Suggest extends Component {

constructor(){
    super();
    this.state={
        componenttable: [],
        ingredient: "",
        displayarr: []
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
                obj= {"name": key, "ingredients": ingredients};
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
        const query = this.state.ingredient;
        const database = this.state.componenttable;
        console.log(database);
    let records=[];
        database.forEach((element)=>{
            element.ingredients.forEach(
                (childelement)=>{
                    if(childelement===query){
                        
                        records.push(element);
                    }
                }
            )
        })
        console.log(records);
        this.setState({...this.state,displayarr:records});
    }

    return (
      <>
   <input type="text" id="ingredient" placeholder='enter the ingredient' value={this.state.ingredient} onChange={this.changedata} aria-label="Search" className="form-control" />
      <button className='btn btn-primary success' onClick={searchdata}>Search</button>


      {this.state.displayarr.map((element)=>{
      return(
        <>
        <li>Name: {element.name}</li>
        <ul>{element.ingredients.map((ingredient)=>{
            <li>{ingredient}</li>
        })}</ul>

        
        </>
      )
    })}


      </>
    )
 }}
