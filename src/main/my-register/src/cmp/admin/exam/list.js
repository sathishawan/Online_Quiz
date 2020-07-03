import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';
import { Card, Button, InputGroup, FormControl } from 'react-bootstrap';
import { faList } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStepBackward, faFastBackward, faStepForward, faFastForward } from '@fortawesome/free-solid-svg-icons';
const API_URL = 'http://localhost:8080/api/auth/';

class AdminExamList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      users: [],
      count: [],
      alert_message: '',
      search: '',
      currentPage: 1,
      usersPerPage: 4,
    }
  }

  componentDidMount() {
    // currentPage -= 1;
    axios.get("http://localhost:8080/api/auth/admin/exam/list")
      .then(response => response.data)
      .then((data) => {
        this.setState({
          users: data
        })
      });

    axios.get("http://localhost:8080/api/auth/countByQuestionsAndMarks")
      .then(response => response.data)
      .then((data) => {
        this.setState({ count: data })
        console.log(this.state.count)
      });

  };

  deleteExam(id) {
    console.log(id)
    if (window.confirm('Are you sure you want to delete?')) {
      const { users } = this.state;
      axios.delete(API_URL + 'admin/exam/delete/' + id).then(result => {
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
    this.props.history.push("/admin/exam/add")
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

  updateSearch(event) {
    this.setState({ search: event.target.value.substr(0, 20) })
  }

  render() {
    const { users, currentPage, usersPerPage,count } = this.state;
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


      <div class="container">
        <br />
        {/* {this.state.alert_message==="success"?
                <div>
                <div id="success-alert" class="alert alert-primary alert-dismissible fade show col-md-6-center" role="alert">
                <strong> <i class="fa fa-check" aria-hidden="true"></i>
</strong> &nbsp;&nbsp;Exam Deleted Successfully.
                <button type="button" class="close" data-dismiss="alert">&times;</button>
                </div>
            </div>
                :null} */}

        <div class="jumbotron" style={{ padding: 20, overflow: "auto" }}>

          <button style={{ borderRadius: "10px" }} type="button" title="Add Exam" class="btn btn-success" onClick={this.onAdd}><i class="fa fa-plus"></i> Add Exam</button>
          <input onChange={this.updateSearch.bind(this)} value={this.state.search} style={{ float: "right" }} type="text" className="form-control col-md-3" placeholder="Search..." />
          <br /><br />
          <table class="table table-bordered">
            <thead>
              <th colspan="10" class="colspan"><FontAwesomeIcon icon={faList} /> Exam List</th>
              <tr>
                {/* <th>S.No</th> */}
                <th>Exam ID</th>
                <th>Exam Name</th>
                <th>Exam Date</th>
                <th>Exam Time</th>
                <th>Duration <b style={{ color: "#F6F700" }}>(hh:mm)</b></th>
                <th>Total Questions</th>
                {/* <th>Total Marks</th> */}
                <th>Action</th>
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
                    <td>{users.exam_id}</td>
                    <td>{users.exam_name}</td>
                    <td>{users.exam_date}</td>
                    <td>{users.exam_time}</td>
                    <td>{users.duration}</td>
                    {}
                    <td></td>
                    {/* <td></td> */}
                    <td>
                      <Link to={"/admin/exam/edit/" + users._id} title="Edit" ><i className="fa fa-edit" style={{ fontSize: 20, color: "DodgerBlue", }}></i></Link>  &nbsp; &nbsp; &nbsp;
                    <i className="fa fa-trash-o" title="Delete" onClick={() => this.deleteExam(users._id)} style={{ fontSize: 20, color: "red", }}></i>
                    </td>

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




export default AdminExamList;
