import React, { Component } from 'react';
import axios from 'axios';
import swal from 'sweetalert';
import { NotificationContainer, NotificationManager } from 'react-notifications';

class Forgetpassword extends Component {
    constructor(props) {
        super(props);
        this.state = { email: "", errors: {}, isLoading: false, isActive: true, isResult: false };
        this.handleInput = this.handleInput.bind(this);

    }

    handleInput = e => {

        this.setState({ [e.target.name]: e.target.value });
    }

    handleForm = e => {
        e.preventDefault();
        this.setState({ isLoading: true, isActive: false, isResult: true })
        setTimeout(() => {
            this.setState({ isLoading: false })
        }, 2000)
        if (this.state.email === '') {
            NotificationManager.warning("Email is Required");
            return false;
        }
        const data = { email: this.state.email };
        axios
            .post("http://localhost:8080/api/auth/forgot-password?email=" + this.state.email, data)
            .then(result => {
                console.log(result)
                console.log(result.data)
                swal({
                    title: "Done",
                    text: "Password Reset link sent to your email.\nPlease check the your email.\nYour received link valid only upto 30 minutes.",
                    icon: "success",
                    timer: 5000,
                    button: false,
                })
                this.setState({ email: '' });
                // NotificationManager.success("Password Reset link sent to yout email .Please check the your email.Link Will be Valid For 30 min");
            })
            .catch(err => {
                if (err.response && err.response.status === 404)
                    NotificationManager.error(err.response.data.msg);
                else
                    NotificationManager.error("Something Went Wrong");
                this.setState({ errors: err.response })
            });

    }
    render() {
        const { isLoading } = this.state;
        return (
            <div className="App">
                {/* {this.state.isActive ? */}
                <form onSubmit={this.handleForm}>
                    <div className="row" style={{ marginTop: 20 }}>
                        <div className="col-md-3"></div>
                        <div className="col-md-6">
                            <NotificationContainer />
                            <div className="card">
                                <div className="alert alert-primary">
                                    {/* <button type="button" className="close" data-dismiss="alert" aria-hidden="true">&times;</button> */}
                                    <strong>Info</strong> Enter your valid email before procced to password reset.
                            </div>
                                <div className="card-body">
                                    <div className="form-group">
                                        <label ><strong>Email address</strong></label>
                                        <input id="mainInput" type="email" name="email" value={this.state.email} onChange={this.handleInput} className="form-control" placeholder="Email" required="required" />
                                    </div>
                                </div>
                                <button type="submit" disabled={isLoading} disabled={!this.state.email} className="btn btn-primary">
                                    {isLoading && <i className="fa fa-spinner fa-spin"></i>} {isLoading && <span><strong>SENDING...</strong></span>}
                                    {!isLoading && <span><strong>SEND EMAIL</strong></span>}

                                </button>
                            </div>
                        </div>
                        <div className="col-sm-2"></div>
                    </div>
                </form>
                {/* : null} */}

                {/* {this.state.isResult ?
                <div >
                    <div className="col-md-3"></div>
                    <div  className="col-md-12">
                        <div className="alert alert-primary" style={{marginTop:"50px"}}>
<br/>                            <h4 style={{ fontFamily: "Ubuntu, sans-serif", fontSize: "28px" }}>Thank You!!</h4><br />
                            <h5><i className="fa fa-clock-o"></i> Your received Link valid only upto 30 minutes.</h5>
                            <hr />
                            <h5>If this is a valid email address, within the next few minutes you will receive an email containing details on how to reset your password.</h5>
                        </div>
                    </div>
                    <br/><br/>
                    <h4 style={{textAlign:"center"}}>If you do not receive this email,</h4>
                    <h4 style={{textAlign:"center"}}><a href="#">please contact support</a></h4>
                </div>
                :null} */}
            </div>
        )
    }
}
export default Forgetpassword