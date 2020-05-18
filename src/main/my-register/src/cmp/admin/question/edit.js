import React, { Component } from 'react';
import axios from 'axios';
import swal from 'sweetalert';
// import {Redirect} from 'react-router-dom';
// import { Redirect } from 'react-router-dom';
// const apiUrl = 'http://localhost:8080/api/auth';

class AdminQuestionEdit extends Component {

  constructor(props) {
    super(props)

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {

      exam_name:'',
      question: '',
      option_1: '',
      option_2: '',
      option_3: '',
      option_4: '',
      answer: '',
      mark: '',
      exam: [],

    };
  }

  componentDidMount() {
    axios.get('http://localhost:8080/api/auth/admin/question/edit/' + this.props.match.params.id)
      .then(res => {
        this.setState({

          exam_name:res.data.exam_name,
          question: res.data.question,
          option_1: res.data.option_1,
          option_2: res.data.option_2,
          option_3: res.data.option_3,
          option_4: res.data.option_4,
          answer: res.data.answer,
          mark: res.data.mark
        });
      })
      fetch(`http://localhost:8080/api/auth/admin/exam/list`)
        .then(response => response.json())
        .then(exam => this.setState({exam:exam}))
  }


  onChange = (event) => {

    this.setState({ [event.target.name]: event.target.value });
  }

  onSubmit = (e) => {

    // debugger;  
    e.preventDefault();

    const obj = {
      exam_name:this.state.exam_name,
      question: this.state.question,
      option_1: this.state.option_1,
      option_2: this.state.option_2,
      option_3: this.state.option_3,
      option_4: this.state.option_4,
      answer: this.state.answer,
      mark: this.state.mark,
    };

    axios.put('http://localhost:8080/api/auth/admin/question/edit/' + this.props.match.params.id, obj)
      .then((result) => {
        console.log(result.data);
        this.props.history.push('/admin/question/list');
        swal({
          title: "Done!",
          text: "Successfully Updated",
          icon: "success",
          timer: 2000,
          button: false,
        })

        // this.setState({ redirect: this.state.redirect === false });
      });
    // return  <Redirect  to={"/ViewQuestions"}/>

  }

  render() {
    const {option_1,option_2, option_3, option_4} = this.state;

    return (

      <div style={{backgroundColor:"#D5ECF3"}} class="jumbotron">

        <form class="top" onSubmit={this.onSubmit}>
        <div class="form-group form-inline">                            
                <label class="control-label col-sm-2" for="email">Exam Name<span style={{color:"red"}} class="required" >*</span></label>
        <select required name="exam_name" value={this.state.exam_name} class="form-control col-md-2" onChange={this.onChange}>
                                <option value="">Select</option>
                                {this.state.exam.map((team) => <option key={team.value} value={team.value}>{team.exam_name}</option>)}
                                
                            </select>  
        </div>

          <div class="form-group form-inline">
            <label for="inputEmail3" class="col-sm-2 col-form-label">Question<span style={{ color: "red" }} class="required" >*</span></label>
            <textarea class="form-control col-md-7" required name="question" value={this.state.question} placeholder="Type Question..?" onChange={this.onChange} rows="2" ></textarea>
          </div>

          <div class="form-group form-inline">
            <label for="inputEmail3" class="col-sm-2 col-form-label">Option 1<span style={{ color: "red" }} class="required" >*</span></label>
            <textarea class="form-control col-md-7" required name="option_1" value={this.state.option_1} placeholder="Type Option 1" onChange={this.onChange} rows="2" ></textarea>
          </div>

          <div class="form-group form-inline">
            <label for="inputEmail3" class="col-sm-2 col-form-label">Option 2<span style={{ color: "red" }} class="required" >*</span></label>
            <textarea class="form-control col-md-7" required name="option_2" value={this.state.option_2} placeholder="Type Option 2" onChange={this.onChange} rows="2" ></textarea>
          </div>

          <div class="form-group form-inline">
            <label for="inputEmail3" class="col-sm-2 col-form-label">Option 3<span style={{ color: "red" }} class="required" >*</span></label>
            <textarea class="form-control col-md-7" required name="option_3" value={this.state.option_3} placeholder="Type Option 3" onChange={this.onChange} rows="2" ></textarea>
          </div>

          <div class="form-group form-inline">
            <label for="inputEmail3" class="col-sm-2 col-form-label">Option 4<span style={{ color: "red" }} class="required" >*</span></label>
            <textarea class="form-control col-md-7" required name="option_4" value={this.state.option_4} placeholder="Type Option 4" onChange={this.onChange} rows="2" ></textarea>
          </div>

          <div class="form-group form-inline">
            <label class="control-label col-sm-2" for="email">Answer<span style={{ color: "red" }} class="required" >*</span></label>
            <select name="answer" required value={this.state.answer} class="form-control col-md-2" onChange={this.onChange}>
              <option value="">Select</option>
              <option value={option_1}>Option 1</option>
              <option value={option_2}>Option 2</option>
              <option value={option_3}>Option 3</option>
              <option value={option_4}>Option 4</option>
            </select>

          </div>

          <div class="form-group form-inline">
            <label class="control-label col-sm-2" for="email">Mark<span style={{ color: "red" }} class="required" >*</span></label>
            <input type="number" required class="form-control col-md-2" name="mark" value={this.state.mark} placeholder="Mark" onChange={this.onChange} />
          </div>


          <div class="form-group row">
            <div class="col-sm-10 offset-sm-2">
              <button style={{borderRadius:"10px"}} type="submit" class="btn btn-primary"><i class="fa fa-paper-plane"></i> Update</button>

            </div>
          </div>

        </form>

      </div>

    );
  }
}

export default AdminQuestionEdit;