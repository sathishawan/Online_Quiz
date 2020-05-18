import React, { Component } from 'react'
import {Redirect} from 'react-router-dom'


class About extends Component  {

constructor(props){
super(props);
this.state={

    redirect:false,
};
this.logout = this.logout.bind(this)
}

componentDidMount()
{
    if(localStorage.getItem("userData"))
    {
        console.log('user Logged-In')
    }
    else
    {
           this.setState({redirect:true})
    }
}

logout()
{
   localStorage.setItem("userData","");
   localStorage.clear();
   this.setState({redirect:true});
}

    render(){

    if(this.state.redirect)
    {
        return (<Redirect to ={'/login'} />);
    }

    return (
        <div>
        <button class="btn-danger" onClick={this.logout}>Logout <i class="fa fa-power-off"></i></button>
        <br/><br/>
            About Component

        </div>
    )
    }
}

export default About;
