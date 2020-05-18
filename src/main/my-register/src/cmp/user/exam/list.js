import React, { Component } from 'react';
import AuthService from "../../../services/auth.service.js";
import { faList } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
const API_URL = 'http://localhost:8080/api/auth/';


class UserExamList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      users: [],
      alert_message: '',

    };
  }

  componentDidMount() {
    fetch(API_URL + `list/userById?id=` + AuthService.getCurrentUser().id)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            users: result
          });
          // console.log(result)
        },

        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  onSelectExam = () => {
    this.props.history.push('/exam/try');
  }

  render() {
    const { error, isLoaded, users } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (

        <div class="container">
          <br />
          {this.state.alert_message === "success" ?
            <div>
              <div id="success-alert" class="alert alert-primary alert-dismissible fade show col-md-6-center" role="alert">
                <strong> <i class="fa fa-check" aria-hidden="true"></i>
                </strong> &nbsp;&nbsp;User Deleted Successfully.
                <button type="button" class="close" data-dismiss="alert">&times;</button>
              </div>
            </div>
            : null}

          <div class="jumbotron" style={{ padding: 40, overflow: "auto",marginTop:"50px" }}>

            <table class="table table-bordered" >
              <thead style={{ textAlign: "center" }}>
                <th colspan="10" class="colspan"><FontAwesomeIcon icon={faList} /> Exam List</th>
                <tr>
                  {/* <th>S.No</th> */}
                  <th>Username</th>
                  <th>Email</th>
                  {/* <th>Created Date</th> */}
                  <th>Action</th>
                </tr>
              </thead>
              <tbody style={{ textAlign: "center" }}>
                {users.map(user => (
                  <tr key={user.id}>
                    {/* <td></td> */}
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                    <td>
                      <button style={{ borderRadius: "10px" }} type="button" class="btn btn-sm" onClick={this.onSelectExam}>View Exam <i class="fa fa-eye" aria-hidden="true"></i></button>
                    </td>
                  </tr>
                ))}

              </tbody>
            </table>
          </div>
        </div>

      );
    }
  }
}




export default UserExamList;
