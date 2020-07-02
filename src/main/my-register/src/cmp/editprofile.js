import React, { Component } from 'react';
import axios from 'axios';
import swal from 'sweetalert'
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import { isEmail } from "validator";
import AuthService from "../services/auth.service";

// import { Redirect } from 'react-router-dom';
const API_URL = 'http://localhost:8080/api/auth/';

// const user = AuthService.getCurrentUser();
// console.log(user)

class Editprofile extends Component {

  constructor(props) {
    super(props)

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {

      username: '',usernameError:'',
      email: '',emailError:'',
      phone: '',phoneError:'',
      birth: '',birthError:'',
      currentUser: AuthService.getCurrentUser()
    };
  }

  componentDidMount() {
    axios.get(API_URL + `user/getById?id=` + AuthService.getCurrentUser().id)
      .then(res => {
        this.setState({

            username: res.data.username,
            email: res.data.email,
            phone: res.data.phone,
            birth: res.data.birth
        });
        // console.log(this.state.birth)

      })
      .catch(function (error) {
        console.log(error);
      })
  }


  onChange = (event) => {

    this.setState({ [event.target.name]: event.target.value });
  }

  validate=()=>
  {
    let usernameError='';
    let emailError='';
    let phoneError='';
    let birthError='';
       if(!this.state.username)
       {
           usernameError="User Name can't be blank";
       }
       if(!this.state.email)
       {
           emailError="Email can't be blank";
       }
       if(!this.state.phone)
       {
           phoneError="Phone Number can't be blank";
       }
       if(!this.state.birth)
       {
           birthError="Date Of Birth can't be blank";
       }
       if(usernameError || emailError || phoneError || birthError)
       {
           this.setState({usernameError,emailError, phoneError, birthError})
           return false
       }
       return true;
  }

  onSubmit = (e) => {

    // debugger;  
    e.preventDefault();
    const isValid = this.validate();
    if(isValid){
    const obj = {
        username: this.state.username,
        email: this.state.email,
        phone: this.state.phone,
        birth: this.state.birth
    };

    axios.put('http://localhost:8080/api/auth/user/editById/' + AuthService.getCurrentUser().id, obj)
      .then((result) => {
        console.log(result.data);
        swal({
          title: "Done!",
          text: "Profile Updated Successfully",
          icon: "success",
          timer: 2000,
          button: false
        })
        this.props.history.push('/profile');
        console.log(this.state.username)
      });
    }

  }

  render() {
      const{username,email,phone,birth,usernameError,emailError,phoneError,birthError} = this.state;

    return (

<body class="body-background">
    <div class="container">
        <div class="row d-flex justify-content-center mx-auto">
            <div class="col-md-6 col-xs-12 div-style">
            <form onSubmit={this.onSubmit}>
                <div style={{fontSize:"25px",color:"#007CF8"}} class="d-flex justify-content-center mx-auto main-label" >
                <b>EDIT PROFILE</b>                
                </div>
                <div class="form-group">
                    <input type="text" class="form-control text-box"  value={username} name="username" id="username"  placeholder="Enter username" onChange={this.onChange}/>
                    <div style={{color:"red"}}>{usernameError}</div>

                </div>
                <div class="form-group">
                    <input type="email" class="form-control text-box"  value={email} name="email" id="email" aria-describedby="email" placeholder="Email" onChange={this.onChange}/>
                    <div style={{color:"red"}}>{emailError}</div>

                </div>
                <div class="form-group">
                    <input type="number" class="form-control text-box"  value={phone} name="phone" id="phone" placeholder="Phone Number" onChange={this.onChange}/>
                    <div style={{color:"red"}}>{phoneError}</div>

                </div>
                <div class="form-group">
                    <input type="date" class="form-control text-box"  value={birth} name="birth" id="birth" placeholder="Date Of Birth" onChange={this.onChange}/>
                    <div style={{color:"red"}}>{birthError}</div>
                </div>
                <div class="form-group justify-content-center d-flex">
                    <button type="submit" class="btn btn-danger button-submit"><i class="fa fa-paper-plane"></i> Update</button>
                </div>
            </form>
        </div>
        </div>
    </div>
      </body>

    );
  }
}

export default Editprofile;