import React, { Component } from 'react';
import axios from 'axios';
import swal from 'sweetalert';
import { Card, Button, InputGroup, FormControl } from 'react-bootstrap';
import {faList} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStepBackward, faFastBackward, faStepForward, faFastForward } from '@fortawesome/free-solid-svg-icons';
const API_URL = 'http://localhost:8080/api/auth/';



class AdminUserList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      users: [],
      alert_message: '',
      term:'',
      currentPage: 1,
      usersPerPage: 5,
    };
    this.searchHandler = this.searchHandler.bind(this); //this code

  }

  componentDidMount() {
    this.findAllUsers();
}
findAllUsers() {
    // currentPage -= 1;
    axios.get("http://localhost:8080/api/auth/admin/user/list")
        .then(response => response.data)
        .then((data) => {
            this.setState({
                users: data})
        });


};

changePage = event => {
        
  this.setState({
      [event.target.name]: parseInt(event.target.value)
  });

};
firstPage = () => {
 if(this.state.currentPage>1){
     this.setState({
         currentPage:1
     });
 }

  };

prevPage = () => {
  if(this.state.currentPage>1){
      this.setState({
          currentPage:this.state.currentPage-1
      });
  }

};

lastPage = () => {
if(this.state.currentPage < Math.ceil(this.state.users.length/this.state.usersPerPage))
{
    this.setState({
        currentPage:Math.ceil(this.state.users.length/this.state.usersPerPage)
    });
}
};

nextPage = () => {
if(this.state.currentPage<Math.ceil(this.state.users.length/this.state.usersPerPage)){
    this.setState({
        currentPage:this.state.currentPage+1
    });
}

};

  deleteUser(id) {
    console.log(id)
    if (window.confirm('Are you sure you want to delete?')) {
      const { users } = this.state;
      axios.delete(API_URL + 'admin/user/delete/' + id).then(result => {
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
    const { users, currentPage,usersPerPage } = this.state;
    const lastIndex=currentPage*usersPerPage;
    const firstIndex=lastIndex-usersPerPage;
    const currentUsers=users.slice(firstIndex,lastIndex);
    const totalPages=Math.ceil(users.length / usersPerPage);

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
          {/* {this.state.alert_message === "success" ?
            <div>
              <div id="success-alert" class="alert alert-primary alert-dismissible fade show col-md-6-center" role="alert">
                <strong> <i class="fa fa-check" aria-hidden="true"></i>
                </strong> &nbsp;&nbsp;User Deleted Successfully.
                <button type="button" class="close" data-dismiss="alert">&times;</button>
              </div>
            </div>
            : null} */}

          <div class="jumbotron" style={{ padding: 20, overflow: "auto" }}>
          <input style={{float:"right"}} type="text" className="form-control col-md-3" onChange={this.searchHandler} placeholder="Search..." />
            <br/><br/>
            <table class="table table-bordered table-hover">
              <thead>
              <th colspan="10" class="colspan"><FontAwesomeIcon icon={faList} /> User List</th>
                <tr>
                  <th>Username</th>
                  <th>Email</th>
                  {/* <th>Created Date</th> */}
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
              {users.length===0 ?
                    <tr align="center">
                  <td colSpan="10" style={{ color: "red" }}><b>No record(s) found..</b></td>
                    </tr> :
                    currentUsers.map((user,index)=>(
                        <tr key={index}>
                        {/* <td></td> */}
                         <td>{user.username}</td>
                          <td>{user.email}</td>
                    <td>
                      &nbsp; &nbsp; &nbsp;
                  <i class="fa fa-trash-o" title="delete" onClick={() => this.deleteUser(user.id)} style={{ fontSize: 20, color: "red", }}></i>
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




export default AdminUserList;
