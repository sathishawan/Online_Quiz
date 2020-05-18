import React, { Component } from 'react';
import axios from 'axios';
import swal from 'sweetalert';
const API_URL = 'http://localhost:8080/api/auth/';


function searchingFor(term){
  return function(u,v){
    let local  =  u.username.toLowerCase().includes(term.toLowerCase()) ;
    return local;
  }
}

class AdminUserIndex extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      users: [],
      alert_message: '',
      term:''
    };
    this.searchHandler = this.searchHandler.bind(this); //this code

  }

  componentDidMount() {
    fetch(API_URL + 'get_user')
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            users: result
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  deleteUser(id) {
    console.log(id)
    if (window.confirm('Are you sure you want to delete?')) {
      const { users } = this.state;
      axios.delete(API_URL + 'deleteUser/' + id).then(result => {
        console.log(result);
        swal({
          title: "Done!",
          text: "Deleted Successfully",
          icon: "success",
          timer: 2000,
          button: false,
        })
        this.setState({
          response: result,
          users: users.filter(user => user.id !== id),
          alert_message: "success",
        });
      });
    }
  }

  searchHandler(event){
    this.setState({term:event.target.value})

  }

  render() {
    const { error, isLoaded, users, term} = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (

        <div class="container">
          <h2 id="user">User Details</h2>
          <br />
          {/* {this.state.alert_message === "success" ?
            <div>
              <div id="success-alert" class="alert alert-primary alert-dismissible fade show col-md-6-center" role="alert">
                <strong> <i class="fa fa-check" aria-hidden="true"></i>
                </strong> &nbsp;&nbsp;User Deleted Successfully.
                <button type="button" class="close" data-dismiss="alert">&times;</button>
              </div>
            </div>
            : null} */}

          <div class="jumbotron" style={{ padding: 10, overflow: "auto" }}>
          <input style={{float:"right"}} type="text" className="form-control col-md-3" onChange={this.searchHandler} placeholder="Search..." />
            <br/><br/>
            <table class="table table-bordered table-hover">
              <thead>
                <tr>
                  <th>S.No</th>
                  <th>Username</th>
                  <th>Email</th>
                  {/* <th>Created Date</th> */}
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {(users.length > 0) ? users.filter(searchingFor(term)).map(user => (
                  <tr key={user.id}>
                    <td></td>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                    <td>
                      &nbsp; &nbsp; &nbsp;
                  <i class="fa fa-trash-o" title="delete" onClick={() => this.deleteUser(user.id)} style={{ fontSize: 20, color: "red", }}></i>
                    </td>
                  </tr>
                )) : <td style={{ textAlign: "center", color: "red", fontSize: 20 }} colSpan="9">No record(s) found...</td>}


              </tbody>
            </table>
          </div>
        </div>

      );
    }
  }
}




export default AdminUserIndex;
