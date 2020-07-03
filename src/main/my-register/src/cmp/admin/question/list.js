import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';
import { Card, Button, InputGroup, FormControl } from 'react-bootstrap';
import { faList } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStepBackward, faFastBackward, faStepForward, faFastForward } from '@fortawesome/free-solid-svg-icons';
const API_URL = 'http://localhost:8080/api/auth/';


function searchingFor(search) {
  return function (x) {
    return x.question.toLowerCase().includes(search.toLowerCase()) || !search;
  }
}
class AdminQuestionList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      users: [],
      alert_message: '',
      currentPage: 1,
      usersPerPage: 2,
      search: '',
    };
    this.searchHandler = this.searchHandler.bind(this);
  }

  componentDidMount() {
  // currentPage -= 1;
    axios.get("http://localhost:8080/api/auth/admin/question/list")
      .then(response => response.data)
      .then((data) => {
        this.setState({
          users: data
        })
      });


  };

  deleteExam(id) {
    console.log(id)
          const { users } = this.state;
        
        swal({
          title: "Are you sure?",
        text: "Are you sure you want to delete??",
        icon: "warning",
        buttons: true,
        dangerMode: true,
        })
        .then(willDelete => {
          if (willDelete) {
            axios.delete(API_URL + 'admin/question/delete/' + id).then(result => {
              
                swal({
                  title: "Done!",
                  text: "Deleted Successfully",
                  icon: "success",
                  timer: 2000,
                  button: false
                });
                window.location.reload()
               
        })
      }
    });
  }
    
  onAdd = () => {
    this.props.history.push("/admin/question/add")
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
    if (this.state.currentPage < Math.ceil(this.state.usersPerPage)) {
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

  searchHandler(event) {
    this.setState({ search: event.target.value })
  }


  render() {
    const { users, currentPage, usersPerPage, search } = this.state;
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


      <div class="container" className="scroll">
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

          <button style={{ borderRadius: "10px" }} type="button" title="Add Questions" class="btn btn-success" onClick={this.onAdd}><i class="fa fa-plus"></i> Add Questions</button>
          <input onChange={this.searchHandler} value={this.state.search} style={{ float: "right" }} type="text" className="form-control col-md-3" placeholder="Search..." />
          <br /><br />
          <table class="table  table-bordered">
            <thead>
              <th colSpan="10" class="colspan"><FontAwesomeIcon icon={faList} /> Question List</th>
              <tr>
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
              {users.length === 0 ?
                <tr align="center">
                  <td colSpan="10" style={{ color: "red" }}><b>No record(s) found..</b></td>
                </tr> :
                currentUsers.filter(searchingFor(search)).map((user, index) => (
                  <tr key={index}>
                    {/* <td></td> */}
                    <td>{user.exam_name}</td>
                    <td>{user.question}</td>
                    <td>{user.option_1}</td>
                    <td>{user.option_2}</td>
                    <td>{user.option_3}</td>
                    <td>{user.option_4}</td>
                    <td>{user.answer}</td>
                    <td>{user.mark}</td>
                    <td>
                      <Link to={"/admin/question/edit/" + user._id} title="Edit"><i class="fa fa-edit" style={{ fontSize: 20, color: "DodgerBlue" }}></i></Link>
                     &nbsp;&nbsp;
                    <i class="fa fa-trash-o" title="Delete" onClick={() => this.deleteExam(user._id)} style={{ fontSize: 20, color: "red", }}></i>
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




export default AdminQuestionList;
