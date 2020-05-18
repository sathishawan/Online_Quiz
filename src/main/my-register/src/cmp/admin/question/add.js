import React, { Component } from 'react';
// import {Link} from 'react-router-dom'
import axios from 'axios';
import swal from 'sweetalert'

export default class AdminQuestionAdd extends Component {

    constructor(props) {
        super(props)

        this.initialstate = {

            question: '',
            option_1: '',
            option_2: '',
            option_3: '',
            option_4: '',
            answer: '',
            mark: '',
            alert_message: '',
            exam: [],
            exam_name:''

        };
        this.state = this.initialstate;
        this.changeHandler = this.changeHandler.bind(this);
        this.SubmitHandler = this.SubmitHandler.bind(this);

    }

    changeHandler(e) {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({
            [name]: value
        })
    }

    handleClear() {
        this.setState({ question: '' });
        this.setState({ option_1: '' });
        this.setState({ option_2: '' });
        this.setState({ option_3: '' });
        this.setState({ option_4: '' });
        this.setState({ answer: '' });
        this.setState({ mark: '' });
    }

    SubmitHandler(e) {
        e.preventDefault();
        this.setState(this.initialstate);
        console.log(this.state);
        axios.post('http://localhost:8080/api/auth/admin/question/add', this.state)
            .then(response => {
                //    this.setState({alert_message:"success"})
                swal({
                    title: "Done!",
                    text: "Successfully Inserted",
                    icon: "success",
                    timer: 20000,
                    button: false,
                })
                window.location.reload(true);
            })
            .catch(error => {
                this.setState({ alert_message: "error" })
            })


    }

    componentDidMount(){
        fetch(`http://localhost:8080/api/auth/admin/exam/list`)
        .then(response => response.json())
        .then(exam => this.setState({exam:exam}))
        
    }


    render() {
        
        const {exam_name, question, option_1, option_2, option_3, option_4, answer, mark} = this.state;
        // const {exam} = this.state;
        return (
            <div class="container">

                {/* {this.state.alert_message==="success"?
                        
                        <div>
                            {window.alert("Question Added Successfully !!")}
                        </div>
                            :null} */}

                <div style={{backgroundColor:"#D5ECF3"}} class="jumbotron">

                    <form class="top" onSubmit={this.SubmitHandler}>
                        <div class="form-group form-inline">                            
                <label class="control-label col-sm-2" for="email">Exam Name<span style={{color:"red"}} class="required" >*</span></label>
                <select  required name="exam_name" value={exam_name} class="form-control col-md-2" onChange={this.changeHandler}>
                                <option value="">Select</option>
                                {this.state.exam.map((team) => <option  key={team._id} value={team.exam_name}>{team.exam_name}</option>)}
                                
                            </select>              
                            </div>

                        <div class="form-group form-inline">
                            <label for="inputEmail3" class="col-sm-2 col-form-label">Question<span style={{ color: "red" }} class="required" >*</span></label>
                            <textarea class="form-control col-md-7" name="question" value={question} placeholder="Type Question..?" required onChange={this.changeHandler} rows="2" ></textarea>
                        </div>

                        <div class="form-group form-inline">
                            <label for="inputEmail3" class="col-sm-2 col-form-label">Option 1<span style={{ color: "red" }} class="required" >*</span></label>
                            <textarea class="form-control col-md-7" name="option_1" value={option_1} placeholder="Type Option 1" required onChange={this.changeHandler} rows="2" ></textarea>
                        </div>

                        <div class="form-group form-inline">
                            <label for="inputEmail3" class="col-sm-2 col-form-label">Option 2<span style={{ color: "red" }} class="required" >*</span></label>
                            <textarea class="form-control col-md-7" name="option_2" value={option_2} placeholder="Type Option 2" required onChange={this.changeHandler} rows="2" ></textarea>
                        </div>

                        <div class="form-group form-inline">
                            <label for="inputEmail3" class="col-sm-2 col-form-label">Option 3<span style={{ color: "red" }} class="required" >*</span></label>
                            <textarea class="form-control col-md-7" name="option_3" value={option_3} placeholder="Type Option 3" required onChange={this.changeHandler} rows="2" ></textarea>
                        </div>

                        <div class="form-group form-inline">
                            <label for="inputEmail3" class="col-sm-2 col-form-label">Option 4<span style={{ color: "red" }} class="required" >*</span></label>
                            <textarea class="form-control col-md-7" name="option_4" value={option_4} placeholder="Type Option 4" required onChange={this.changeHandler} rows="2" ></textarea>
                        </div>


                        <div class="form-group form-inline">
                            <label class="control-label col-sm-2" for="email">Answer<span style={{ color: "red" }} class="required" >*</span></label>
                            <select required name="answer" value={answer} class="form-control col-md-2" onChange={this.changeHandler}>
                                <option value="">Select</option>
                                <option value={option_1}>Option 1</option>
                                <option value={option_2}>Option 2</option>
                                <option value={option_3}>Option 3</option>
                                <option value={option_4}>Option 4</option>
                            </select>

                        </div>

                        <div class="form-group form-inline">
                            <label class="control-label col-sm-2" for="email">Marks<span style={{ color: "red" }} class="required" >*</span></label>
                            <input type="number" class="form-control col-md-2" name="mark" value={mark} placeholder="Mark" required onChange={this.changeHandler} />
                        </div>


                        <div class="form-group row">
                            <div class="col-sm-10 offset-sm-2">
                                <button style={{borderRadius:"10px"}} type="submit" class="btn btn-success"><i class="fa fa-paper-plane"></i>  Add Question</button> &nbsp;&nbsp;&nbsp;
                    <button style={{borderRadius:"10px"}} type="reset" class="btn btn-secondary" onClick={() => this.handleClear()}>Reset</button>
                            </div>
                        </div>

                    </form>

                </div>

            </div>
        )
    }
}
