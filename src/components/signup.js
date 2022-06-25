import React, { Component } from 'react'
import { useState } from 'react';

export default class Signup extends Component {

 state = {
            username: "",
            password: ""
        }
    

    postdata = async (e) => {
        e.preventDefault();

        const { username, password } = this.state;

        const send = await fetch("https://medical-172ac-default-rtdb.firebaseio.com/aliases.json",
            {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username: username,
                    password: password

                })
            });
            this.setState({
                username: "",
                password: ""
            })

        }

         onchangeusername = (event) => {

            this.setState({ username: event.target.value });
        }
         onchangepassword = (event) => {
            this.setState({ password: event.target.value });
        }
    render() {



        

            

        

        return (
            <form method='POST'>
                <p style={{ textAlign: "center" }}>Enter Username: <input value={this.state.username}
                    onChange={this.onchangeusername} type="text" /></p>
                <p style={{ textAlign: "center" }}>Enter Password: <input value={this.state.password} onChange={this.onchangepassword} type="text" /></p>
                <p style={{ textAlign: "center" }}><button onClick={this.postdata} className='btn btn-primary'>Submit</button></p>
            </form>
        )
    }
}


