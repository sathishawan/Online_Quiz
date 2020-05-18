import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';
const API_URL = 'http://localhost:8080/api/auth/';

class AdminQuestionView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      users: [],
      alert_message: ''

    };
  }

  componentDidMount() {
    fetch(API_URL + 'getQuestions')
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            users: result
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  deleteExam(id) {
    console.log(id)
    if (window.confirm('Are you sure you want to delete?')) {
      const { users } = this.state;
      axios.delete(API_URL + 'deleteQuestion/' + id).then(result => {
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
          users: users.filter(user => user._id !== id),
          alert_message: "success",
        });
      });
    }
  }

  onAdd = () => {
    this.props.history.push("/AddQuestions")
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
          <h3 id="center">Questions List</h3>
          <br />
          {/* {this.state.alert_message === "success" ?
            <div>
              <div id="success-alert" class="alert alert-primary alert-dismissible fade show col-md-6-center" role="alert">
                <strong> <i class="fa fa-check" aria-hidden="true"></i>
                </strong> &nbsp;&nbsp;Question Deleted Successfully.
                <button type="button" class="close" data-dismiss="alert">&times;</button>
              </div>
            </div>
            : null} */}
          <div class="jumbotron" style={{ padding: 20, overflow: "auto" }}>

            <button type="button" title="Add Questions" class="btn btn-success" onClick={this.onAdd}><i class="fa fa-plus"></i> Add Questions</button>
            <input style={{float:"right"}} type="text" className="form-control col-md-3" onChange={this.handleChange} placeholder="Search..." />
          <br/><br/>
            <table class="table  table-bordered">
              <thead>
                <tr>
                  <th>S.No</th>
                  <th>Exam Name</th>
                  <th>Question</th>
                  <th>Option1</th>
                  <th>Option2</th>
                  <th>Option3</th>
                  <th>option4</th>
                  <th>Answer</th>
                  <th>Mark</th>
                  {/* <th>Date Created</th>  */}
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {(users.length > 0) ? users.map(user => (
                  <tr key={user._id}>
                    <td></td>
                    <td>{user.exam_name}</td>
                    <td>{user.question}</td>
                    <td>{user.option_1}</td>
                    <td>{user.option_2}</td>
                    <td>{user.option_3}</td>
                    <td>{user.option_4}</td>
                    <td>{user.answer}</td>
                    <td>{user.mark}</td>
                    {/* <td>{user.created_date}</td> */}
                    <td>
                      <Link to={"/editQuestion/" + user._id} title="Edit"><i class="fa fa-edit" style={{ fontSize: 20, color: "DodgerBlue" }}></i></Link>
                     &nbsp; &nbsp;
                    <i class="fa fa-trash-o" title="Delete" onClick={() => this.deleteExam(user._id)} style={{ fontSize: 20, color: "red", }}></i>
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




export default AdminQuestionView;
