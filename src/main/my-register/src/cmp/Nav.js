import React, { Component } from 'react'
import {
    Link
  } from "react-router-dom";
  
class Nav extends Component {
    render(){
    return (
        <nav class="navbar navbar-inverse">
  <div class="container-fluid">
    <div class="navbar-header">
      <a class="navbar-brand" href="/"><i class="fa fa-trophy" id="color"></i></a>
    </div>
    <ul class="nav navbar-nav">
      <li class="disable"><a href="/home">Home</a></li>
      <li class="disable"><a href="/about">About</a></li>
      {/* <li><a href="#">Page 2</a></li> */}
    </ul>
    <ul class="nav navbar-nav navbar-right">
      <li><a href="/register"><span class="glyphicon glyphicon-user"></span> Sign Up</a></li>
      <li class="active"><a href="/"><span class="glyphicon glyphicon-log-in"></span> User Login</a></li>
      <li><a href="/admin"><span class="glyphicon glyphicon-log-in"></span> Admin Login</a></li>

    </ul>
  </div>
</nav>
        
    )
    }
}

export default Nav
