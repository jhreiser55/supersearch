import React from "react";
import Router from "next/router";
import jsCookie from "js-cookie";
import Header from '../components/Header';
import {getLogin} from '../lib/utils.js';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state={username: "", password: ""};
  }

  async handleUsername(evt){
        this.setState({username: evt.target.value});
  }

  async handlePassword(evt){
        this.setState({password: evt.target.value});
  }

  async handleLogin(){
    const loggedInUser = await getLogin({
      username: this.state.username,
      password: this.state.password
    });
    console.log(loggedInUser.status);
    if(loggedInUser.status == "success"){
      console.log(loggedInUser.username);
      jsCookie.set("username", loggedInUser.username);
      jsCookie.set("zip", loggedInUser.zip);
      Router.replace("/Search");
    }
    this.setState({loggedInUser});
  }

  render() {
    return (
     
      <div style={{ margin: "auto auto", width: "1000px", textAlign: "center", border: "2px solid green", padding: "9px" }}>
            
            <Header />
            
            <h2>Login</h2>

            <p><input placeholder = 'username' type='text' value={this.state.username} onChange={this.handleUsername.bind(this)}/></p>
            <p><input placeholder = 'password' type='password' value={this.state.password} onChange={this.handlePassword.bind(this)}/></p>
            <button onClick={this.handleLogin.bind(this)}>Submit</button>

            {'loggedInUser' in this.state ? <div>
                <p>{this.state.loggedInUser.status}</p>
            </div>: null}

              <style jsx>{`
                  h1{
                    color:black; 
                    font-family: "Arial";
                    margin: "auto auto"; 
                    width: 100%;
                    display: inline; 
                    textAlign: "center";
                    padding: "0 px";
                  }

                  h2,
                  a{
                    font-family: "Arial";
                    textAlign: "center";
                    color: black;
                    margin:"auto auto";
                    padding:"9px";
                  }

                  h3{
                    font-family: "Arial";
                    textAlign: center;
                    color: black;
                  }

                  p{
                    font-family: "Arial";
                    textAlign: center;
                    color: red;
                  }

                  .button-style{
                    margin: auto auto;
                    cursor: pointer;
                    background-color: green;
                    color: #ffffff;
                    width: 100px;
                    font-family: "Arial";
                  }

                  .description {
                    font-family: "Arial";
                    font-size: "10px";
                  }
                  
                  a {
                    text-decoration: underline;
                    color: green;
                  }

                  a:hover {
                    opacity: 0.6;
                  }
                  table {
                    font-family: arial, sans-serif;
                    border-collapse: collapse;
                    width: 100%;
                  }

                  td, th {
                    border: 1px solid #ffffff;
                    text-align: left;
                    padding: 8px;
                  }

                  tr:nth-child(even) {
                    background-color: #dddddd;
                  }
              `}</style>
      </div>
    );
  }
}

export default Home;
