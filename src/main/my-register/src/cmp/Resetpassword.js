import React, { Component } from 'react';
import axios from 'axios';
import swal from 'sweetalert'
import { NotificationContainer, NotificationManager } from 'react-notifications';
import queryString from 'query-string'


class Resetpassword extends Component {
    constructor(props) {
        super(props);
        this.state = { password: '', confirm_password: '',passwordError:'',confirm_passwordError:'', errors: {}, params: '' };
    }

    componentWillMount() {
        let url = this.props.location.search;
        let params = queryString.parse(url);
        this.setState({ params })
        console.log(params);
    }

    handleChange = e => {

        this.setState({ [e.target.name]: e.target.value });
    }

    validate=()=>
    {
       let passwordError='';
       let confirm_passwordError='';
       if(!this.state.password)
       {
           passwordError="New Password can't be blank";
       }
      else if(this.state.password.length<=7)
       {
            passwordError="New Password must be 8 characters"
       }
       if(!this.state.confirm_password)
       {
           confirm_passwordError="Confirm password can't be blank";
       }
       if(this.state.password!==this.state.confirm_password)
       {
           confirm_passwordError="Confirm password doesn't match"
       }
       if(passwordError || confirm_passwordError)
       {
           this.setState({passwordError,confirm_passwordError})
           return false
       }
       return true;
    }

    handleSubmit = e => {
        e.preventDefault();
        const isValid = this.validate();
        if(isValid)
        {
            const {token} = this.state.params
            const {password} = this.state;
        
            axios.put('http://localhost:8080/api/auth/reset-password/?token='+token,'&password='+password)
                .then((result) => {
                    console.log(result.data);
                    swal({
                        title: "Done",
                        text: "Your Password Successfully Updated",
                        icon: "success",
                        timer: 5000,
                        button: false,
                    })

                    this.setState({ password: '',confirm_password:'' });
                    this.props.history.push('/user/login')
    
                });        
            }
       

    }
    render() {
        const{password,confirm_password,passwordError,confirm_passwordError} = this.state;
        return (
            <div className="App">
                <form onSubmit={this.handleSubmit}>
                    <div className="row" style={{ marginTop: 20 }}>
                        <div className="col-sm-3"></div>
                        <div className="col-sm-6">
                            <div className="card">
                                <div style={{ color: "#0069D9" }} className="card-header text-center"><i className="fa fa-unlock-alt"></i> <strong>RESET PASSWORD</strong></div>
                                <div className="card-body">
                                    <div className="form-group">
                                        <label ><strong>New Password</strong></label>
                                        <input type="password"
                                            name="password"
                                            value={password}
                                            onChange={this.handleChange}
                                            className="form-control"
                                            placeholder="New Password" />
                                            <div style={{color:"red"}}>{passwordError}</div>
                                    </div>
                                    <div className="form-group">
                                        <label ><strong>Confirm Password</strong></label>
                                        <input type="password"
                                            name="confirm_password"
                                            value={confirm_password}
                                            onChange={this.handleChange}
                                            className="form-control"
                                            placeholder="Confirm Password" />
                                            <div style={{color:"red"}}>{confirm_passwordError}</div>
                                    </div>
                                </div>
                                <button type="submit"
                                    className="btn btn-primary" >
                                    <strong>RESET PASSWORD</strong></button>
                            </div>
                        </div>
                        <div className="col-sm-2"></div>
                    </div>
                </form>
            </div>
        )
    }
}
export default Resetpassword