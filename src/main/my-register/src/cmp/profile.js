import React, { Component } from "react";
import AuthService from "../services/auth.service";
import { Link } from 'react-router-dom';
const API_URL = 'http://localhost:8080/api/auth/';


export default class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: [],
      currentUser: AuthService.getCurrentUser()
    };
    // console.log(this.state.currentUser.accessToken)
  }

  componentWillMount() {
    fetch(API_URL + `user/getById?id=` + AuthService.getCurrentUser().id)
      .then(res => res.json())
      .then(json => {
        // console.log(json)

          this.setState({
            users: [json]
          });
          // console.log(this.state.users)
        })
  }

  render() {
    const { currentUser,users } = this.state;

    return (
      <div className="container">
       <div class="card" id="card">
       <div class="card-footer">

        <header style={{backgroundColor:"#2092EC"}} className="jumbotron bg text-white">
        {users.map(info=>(
          <h3>
            <strong>{info.username}</strong> Profile  <Link to={"/profile/edit/" + AuthService.getCurrentUser().id} title="Edit profile"><b><i  style={{cursor:"pointer", color: "#F8F800"}} class="fa fa-edit" aria-hidden="true"></i></b></Link>
          </h3>
           ))}
          </header>

        {/* <p>
          <strong>Token:</strong>{" "}
          {currentUser.accessToken.substring(0, 20)} ...{" "}
          {currentUser.accessToken.substr(currentUser.accessToken.length - 20)}
        </p>
        <p>
          <strong>Id:</strong>{" "}
          {currentUser.id}
        </p> */}
        {users.map(info=>(
          <div>
        <p>
        <i class="fa fa-envelope" aria-hidden="true"></i> <strong>Email:</strong>{" "}
          {info.email}
        </p>
       
        <p>
        <i class="fa fa-phone" aria-hidden="true"></i> <strong>Phone Number:</strong>{" "}
          +91 {info.phone}
        </p>
        <p>
        <i class="fa fa-birthday-cake" aria-hidden="true"></i> <strong>Date Of Birth:</strong>{" "}
          {info.birth}
        </p>
        </div>
         ))}
        <i class="fa fa-user-circle-o" aria-hidden="true"></i> <strong>Authorities:</strong>
        <ul>
          {currentUser.roles &&
            currentUser.roles.map((role, index) => <li key={index}> {role}</li>)}
        </ul>
        </div>
        </div>
      </div>
    );
  }
}