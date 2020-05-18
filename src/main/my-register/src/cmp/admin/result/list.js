import React, { Component } from 'react';
import { Card, Button, InputGroup, FormControl } from 'react-bootstrap';
import { faList } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStepBackward, faFastBackward, faStepForward, faFastForward } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import swal from 'sweetalert';
const API_URL = 'http://localhost:8080/api/auth/';


class AdminMarkView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      users: [],
      currentPage: 1,
      usersPerPage: 5,
    };
  }

  componentDidMount() {
    this.findAllUsers();
  }
  findAllUsers() {
    axios.get("http://localhost:8080/api/auth/admin/result/list")
      .then(response => response.data)
      .then((data) => {
        this.setState({ users: data })
        console.log(this.state.users)
      });


  };

  deleteExam(id) {
    console.log(id)
    if (window.confirm('Are you sure you want to delete?')) {
      const { users } = this.state;
      axios.delete(API_URL + 'admin/result/delete/' + id).then(result => {
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

  changePage = event => {

    this.setState({
      [event.target.name]: parseInt(event.target.value)
    });

  };
  firstPage = () => {
    if (this.state.currentPage > 1) {
      this.setState({
        currentPage: 1
      });
    }

  };

  prevPage = () => {
    if (this.state.currentPage > 1) {
      this.setState({
        currentPage: this.state.currentPage - 1
      });
    }

  };

  lastPage = () => {
    if (this.state.currentPage < Math.ceil(this.state.users.length / this.state.usersPerPage)) {
      this.setState({
        currentPage: Math.ceil(this.state.users.length / this.state.usersPerPage)
      });
    }
  };

  nextPage = () => {
    if (this.state.currentPage < Math.ceil(this.state.users.length / this.state.usersPerPage)) {
      this.setState({
        currentPage: this.state.currentPage + 1
      });
    }

  };

  render() {
    const { users, term, currentPage, usersPerPage } = this.state;
    const lastIndex = currentPage * usersPerPage;
    const firstIndex = lastIndex - usersPerPage;
    const currentUsers = users.slice(firstIndex, lastIndex);
    const totalPages = Math.ceil(users.length / usersPerPage);

    const pageNumCss = {
      width: "45px",
      border: "1px solid #17A2B8",
      color: "#17A2B8",
      textAlign: "center",
      fontWeight: "bold"
    };

    return (

      <div className="container">
        <br />
        <div className="jumbotron" style={{ padding: 20, overflow: "auto" }}>

          {/* <button  style={{borderRadius:"10px"}} type="button" title="Add Exam" className="btn btn-success" onClick={this.onAdd}><i className="fa fa-plus"></i> Add Exam</button> */}
          <input style={{ float: "right" }} value={term} type="text" className="form-control col-md-3" onChange={this.searchHandler} placeholder="Search..." />
          <br /><br />
          <table className="table table-bordered table-hover">
            <thead>
              <th colspan="10" class="colspan"><FontAwesomeIcon icon={faList} /> Result List</th>
              <tr>
                {/* <th>S.No</th> */}
                <th>User Name</th>
                <th>Exam Name</th>
                {/* <th>Total Questions</th> */}
                <th>Maximum Marks</th>
                <th>Obtained Marks</th>
                {/* <th>Percentage<b style={{color: "#F6F700"}}>(%)</b></th> */}
                {/* <th>Result</th> */}
                <th>Exam Date</th>
                {/* <th>Action</th> */}
              </tr>
            </thead>
            <tbody>
              {users.length === 0 ?
                <tr align="center">
                  <td colspan="10" style={{ color: "red" }}><b>No record(s) found..</b></td>
                </tr> :
                currentUsers.map((users, index) => (
                  <tr key={index}>
                    {/* <td></td> */}
                    <td>{users.user_name}</td>
                    <td>{users.exam_name}</td>
                    {/* <td>{users.total_questions}</td> */}
                    <td>{users.max_marks}</td>
                    {/* <td>{users.exam_time}</td> */}
                    <td>{users.overall_score}</td>
                    {/* <td>{users.percentage}</td> */}
                    {/* <td>{users.status}</td> */}
                    <td>{users.exam_date}</td>
                    {/* <td> */}
                    {/* <Link to={"/editExam/"+ users._id} title="Edit" ><i className="fa fa-edit" style={{ fontSize: 20, color: "DodgerBlue", }}></i></Link>   */}
                    {/* &nbsp; &nbsp; &nbsp; */}
                    {/* <i className="fa fa-trash-o" title="Delete" onClick={() => this.deleteExam(users._id)} style={{ fontSize: 20, color: "red", }}></i> */}
                    {/* </td> */}

                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>

        {users.length > 0 ?
          <Card.Footer>
            <div style={{ "float": "left" }}>
              Showing Page {currentPage} of {totalPages}
            </div>
            <div style={{ "float": "right" }}>
              <InputGroup size="sm">
                <InputGroup.Prepend>
                  <Button type="button" variant="outline-info" disabled={currentPage === 1 ? true : false}
                    onClick={this.firstPage}>
                    <FontAwesomeIcon icon={faFastBackward} /> First
                     </Button>
                  <Button type="button" variant="outline-info" disabled={currentPage === 1 ? true : false}
                    onClick={this.prevPage}>
                    <FontAwesomeIcon icon={faStepBackward} /> Prev
                      </Button>
                </InputGroup.Prepend>
                <FormControl style={pageNumCss} className={"bg-dark"} name="currentPage" value={currentPage}
                  onChange={this.changePage} />
                <InputGroup.Append>
                  <Button type="button" variant="outline-info" disabled={currentPage === totalPages ? true : false}
                    onClick={this.nextPage}>
                    <FontAwesomeIcon icon={faStepForward} /> Next
                      </Button>
                  <Button type="button" variant="outline-info" disabled={currentPage === totalPages ? true : false}
                    onClick={this.lastPage}>
                    <FontAwesomeIcon icon={faFastForward} /> Last
                     </Button>
                </InputGroup.Append>
              </InputGroup>
            </div>
          </Card.Footer> : null
        }

      </div>
    );

  }
}
export default AdminMarkView