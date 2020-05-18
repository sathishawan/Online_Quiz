import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';  
import swal from 'sweetalert';
const API_URL = 'http://localhost:8080/api/auth/';

function searchingFor(term){
  return function(u,v,w,x){
    let local  =  u.exam_name.toLowerCase().includes(term.toLowerCase()) ;
    return local;
  }
}

class AdminExamView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      users: [],
      question_count:[],
      alert_message:'',
      term:'',
    }
    this.searchHandler = this.searchHandler.bind(this);
  }

  componentDidMount() {
    fetch(API_URL + 'getExam')
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

      fetch(API_URL + 'CountGroupByQuestions')
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            question_count: result
          });
          console.log(result)
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  searchHandler(event){
    this.setState({term:event.target.value})

  }

  deleteExam(id) {  
    console.log(id) 
    if(window.confirm('Are you sure you want to delete?' ))      
    {
    const { users } = this.state;   
    axios.delete(API_URL + 'deleteExam/' +id).then(result=>{ 
      console.log(result) ;
      swal({
        title: "Done!",
        text: "Deleted Successfully",
        icon: "success",
        timer: 2000,
        button: false,
      })
      this.setState({  
        response:result, 
        users:users.filter(user=>user._id !== id),
        alert_message:"success",
      }); 
    });
  }
  }  
  
  onAdd = () =>
  {
      this.props.history.push("/AddExam")
  }

  render() {
    const { error, isLoaded, users , term} = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (


        <div class="container">
          <h3 id="center">Exam List</h3>
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

          <button type="button" title="Add Exam" class="btn btn-success" onClick={this.onAdd}><i class="fa fa-plus"></i> Add Exam</button>
           <input style={{float:"right"}} value={term} type="text" className="form-control col-md-3" onChange={this.searchHandler} placeholder="Search..." />
          <br/><br/>
          <table class="table table-bordered">
            <thead>
              <tr>
                <th>S.No</th>
                <th>Exam ID</th>
                <th>Exam Name</th>
                <th>Exam Date</th>
                <th>Exam Time</th>
                <th>Duration <b style={{color: "#F6F700"}}>(hh:mm)</b></th>
                <th>Total Questions</th>
                <th>Total Marks</th>
                {/* <th>Date Created</th>  */}
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
            {(users.length > 0) ? users.filter(searchingFor(term)).map(user => (
                <tr key={user._id}>
                  <td></td>
                  <td>{user.exam_id}</td>
                  <td>{user.exam_name}</td>
                  <td>{user.exam_date}</td>
                  <td>{user.exam_time}</td>
                  <td>{user.duration}</td>
                  <td></td>
                 
                  <td></td>
                  {/* <td>{user.created_date}</td> */}
                  <td>
                  <Link to={"/editExam/"+ user._id} title="Edit" ><i class="fa fa-edit" style={{ fontSize: 20, color: "DodgerBlue", }}></i></Link>  &nbsp; &nbsp; &nbsp; 
                    <i class="fa fa-trash-o" title="Delete" onClick={() => this.deleteExam(user._id)} style={{ fontSize: 20, color: "red", }}></i>
                  </td>
                </tr>
                 )) : <td style={{textAlign:"center", color:"red", fontSize:20 }} colSpan="9">No record(s) found...</td> }


            </tbody>
          </table>
          </div>
        </div>

      );
    }
  }
}




export default AdminExamView;
