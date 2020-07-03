import React, { Component } from 'react';
import AuthService from "../../../services/auth.service.js";
import { Card, Button, InputGroup, FormControl } from 'react-bootstrap';
import { faList } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStepBackward, faFastBackward, faStepForward, faFastForward } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import swal from 'sweetalert';
// import html2canvas from 'html2canvas'
// import jsPDF from 'jspdf'
const API_URL = 'http://localhost:8080/api/auth/';

class UserExamResult extends Component {

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
    fetch(API_URL + `user/findById?_userid=` + AuthService.getCurrentUser().id)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            users: result
          });
          // console.log(result.length)
        })
  }

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

  printOrder = () => {
    const printableElements = document.getElementById('printableId').innerHTML;
    const orderHtml = '<html><head><title></title></head><body>' + printableElements + '</body></html>'
    const oldPage = document.body.innerHTML;
    document.body.innerHTML = orderHtml;
    window.print();
    document.body.innerHTML = oldPage
}

// pdfDocument= () => {  
//   const input = document.getElementById('printableId');  
//   html2canvas(input)  
//     .then((canvas) => {  
//       var imgWidth = 200;  
//       var pageHeight = 290;  
//       var imgHeight = canvas.height * imgWidth / canvas.width;  
//       var heightLeft = imgHeight;  
//       const imgData = canvas.toDataURL('image/png');  
//       const pdf = new jsPDF('p', 'mm', 'a4')  
//       var position = 0;  
//       var heightLeft = imgHeight;  
//       pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight);  
//       pdf.save("download.pdf");  
//     });  
// }  



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

      <React.Fragment>
        <br />
        <div className="jumbotron" style={{ padding: 20, overflow: "auto" }}>

          <input style={{ float: "left" }} value={term} type="text" className="form-control col-md-3" onChange={this.searchHandler} placeholder="Search..." />
          <button style={{float:"right"}} class="btn btn-outline-primary btn-circle btn-circle-sm m-1" title="print" onClick={() => this.printOrder()}><i class="fa fa-print fa-lg"></i></button>          
          <button style={{float:"right"}} class="btn btn-outline-danger btn-circle btn-circle-sm m-1" title="pdf"><i class="fa fa-file-pdf-o fa-lg"></i></button>
          <div id="printableId">
          <table  className="table table-bordered table-hover">
            <thead>
              <th colspan="10" class="colspan"><FontAwesomeIcon icon={faList} /> Result List</th>
              <tr>
                {/* <th>S.No</th> */}
                {/* <th>Exam ID</th> */}

                <th>Exam Name</th>
                <th>Total Questions</th>
                <th>Maximum Marks</th>
                <th>Obtained Marks</th>
                <th>Right Answer <b style={{ color: "#00ff00" }}>(+2)</b></th>
                <th>Wrong Answer <b style={{ color: "#ff0000" }}>(-1)</b></th>
                {/* <th>Percentage<b style={{color: "#F6F700"}}>(%)</b></th> */}
                {/* <th>Result</th> */}
                <th>Exam Date</th>
                {/* <th>Action</th> */}
              </tr>
            </thead>
            <tbody>
              {users.length === 0 ?
                <tr align="center">
                  <td colspan="10" style={{ color: "red" }}><b>Yet Not Attending the Exam..</b></td>
                </tr> :
                currentUsers.map((users, index) => (
                  <tr key={index}>
                    {/* <td></td> */}
                    {/* <td>{users.exam_id}</td> */}
                    <td>{users.exam_name}</td>
                    <td>{users.total_questions}</td>
                    <td>{users.max_marks}</td>
                    {/* <td>{users.exam_time}</td> */}
                    <td>{users.overall_score}</td>
                    <td>{users.right_answer}</td>
                    <td>{users.wrong_answer}</td>
                    <td>{users.exam_date}</td>
                    {/* <td>
                      <Link to={"/editExam/"+ users._id} title="Edit" ><i className="fa fa-edit" style={{ fontSize: 20, color: "DodgerBlue", }}></i></Link>  
                  &nbsp; &nbsp; &nbsp;
                    <i className="fa fa-trash-o" title="Delete" onClick={() => this.deleteExam(users._id)} style={{ fontSize: 20, color: "red", }}></i>
                    </td> */}

                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
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

      </React.Fragment>
    );

  }
}
export default UserExamResult