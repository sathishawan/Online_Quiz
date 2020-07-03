import React, { Component } from 'react';
import $ from "jquery";
import swal from 'sweetalert';

import { Modal, Button } from 'react-bootstrap'
import AuthService from "../../../services/auth.service.js";
const API_URL = 'http://localhost:8080/api/auth/';

var correctCount = 0;
var CorrectMarks = 0;
var notEvaluate = 0;
var wrongAnswer = 0;
var max_marks = 0;
var Status = "";
var score = 0;
var Average = 0;
const date = new Date();

export default class Selectexam extends Component {

    constructor(props) {
        super(props)

        this.state = {
            exam: [],
            users: [],
            perPage: 1,
            isLoaded: false,
            selectedOption: false,
            answer: '',
            show: false,
            isActive: true,
            isResult: false,
            marks: [],
            currentPage: 1,
            usersPerPage: 1,
            bgColor: '#535353',
            modal: false,
            currentUser: AuthService.getCurrentUser(),
            result: [], _userid: '', user_name: '', exam_name: '', total_questions: '', max_marks: '', right_answer: '', wrong_answer: '', overall_score: '', percentage: '', Status: '', exam_date: '',
            Answered: 0, Reviewed: 0, NotAnswered: 0, NotVisited: 0, seconds: '00', value: '5', isClicked: false
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.tick = this.tick.bind(this);
        this.changeHandler = this.changeHandler.bind(this);
        this.onRadioChange = this.onRadioChange.bind(this);
        // this.onSubmit=this.onSubmit.bind(this)
    }


    tick() {
        var min = Math.floor(this.secondsRemaining / 60);
        var sec = this.secondsRemaining - (min * 60);

        this.setState({
            value: min,
            seconds: sec,
        })

        if (sec < 10) {
            this.setState({
                seconds: "0" + this.state.seconds,
            })

        }

        if (min < 10) {
            this.setState({
                value: "0" + min,
            })

        }

        if (min === 0 & sec === 0) {
            clearInterval(this.intervalHandle);
            this.onSubmit();
        }


        this.secondsRemaining--
    }

    startCountDown() {
        this.intervalHandle = setInterval(this.tick, 1000);
        let time = this.state.value;
        this.secondsRemaining = time * 60;
        this.setState({
            isClicked: true
        })
    }


    componentDidMount() {
        fetch(API_URL + `examlist`)
            .then(response => response.json())
            .then(exam => {
                console.clear();
                this.setState({ exam: exam, isActive: true })
                console.log(exam)
                // console.log(exam);
            })

        // fetch(API_URL + `admin/result/list`)
        //     .then(response => response.json())
        //     .then(exam => {
        //         console.clear();
        //         this.setState({ marks: exam, isActive: true })
        //         console.log(exam)
        //         // console.log(exam);
        //     })


    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.intervalHandle = setInterval(this.tick, 1000);
        let time = this.state.value;
        this.secondsRemaining = time * 60;
        if (this.timer === 0 && this.state.seconds > 0) {
            this.timer = setInterval(this.countDown, 1000);
        };
        console.log(this.state.value)

        fetch(API_URL + `user/select/exam?exam_name=` + this.state.exam_name)
            .then(response => response.json())
            .then(users => {
                users.map((object, index) =>
                    index === 0 ? object.questionStatus = 'received' : object.questionStatus = 'notReceived');
                // console.log('userArray', users)
                this.setState({
                    users: users, show: true, isActive: false, isResult: true, NotVisited: users.length - 1, NotAnswered: 0, isClicked: true
                });
                // console.log(users)

            })
    }

    onRadioChange = (e, _id) => {
        this.setState({
            selectedOption: { ...this.state.selectedOption, [_id]: e.target.value },
            answer: e.target.value,
        })

        console.log(_id);
    }

    onSubmit = (e) => {
        e && e.preventDefault();
        swal({
            title: "Are you sure?",
          text: "Are you sure you want to Exit??",
          buttons: true,
          success: true,
          })
          .then(willExit => {
            if (willExit) {
        var question_length = this.state.users.length;
        
        this.state.users.map(question => {
            if (question.answer === this.state.selectedOption[question._id]) {
                correctCount += 1;
                console.log(correctCount)
            }
            else if (!this.state.selectedOption[question._id]) {
                notEvaluate += 1;
                console.log(notEvaluate);
            }
            else {
                wrongAnswer += 1;
                console.log(wrongAnswer)

            }

            CorrectMarks = correctCount * 2;
            max_marks = question_length * 2;
            score = CorrectMarks - wrongAnswer;
            if (score > 0) {
                Average = ((score / max_marks) * 100);

                if (Average >= 75) {
                    Status = "Good";
                }
                else if (Average >= 50) {
                    Status = "Moderate";
                }
                else if (Average < 50) {
                    Status = "Bad";
                }
            }
            else {
                Average = 0;
                Status = "Bad";
            }
            // console.log(Average)   
        })
        // alert("Right Answer:" + correctCount + ', ' +
        // "Wrong Answer:"   + wrongAnswer);
        this.setState({ selectedOption: {} })
        fetch(API_URL + 'answer', {
            method: 'POST',
            headers: {
                Accept: 'application/json', 'Content-Type': 'application/json'
            },
            body: JSON.stringify({ _userid: this.state.currentUser.id, user_name: this.state.currentUser.username, exam_name: this.state.exam_name, total_questions: question_length, max_marks: max_marks, right_answer: correctCount, wrong_answer: wrongAnswer, overall_score: score, percentage: Average, Status: Status, exam_date: date })
        }).then(response => {
            response.json().then(data => {
                this.setState({ result: data, modal: !this.state.modal })
                console.log(data);
            })
        })
        
    }
})
    }

        //   this.setState({
            
        //     users: users.filter(user => user._id !== id),
        //     alert_message: "success",
        // users:window.location.reload()
  
        //   })
        
      
      

 changeHandler = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({
            [name]: value
        })
    }
    onClose = () => {
        // this.props.history.push('/exam/list');
        this.setState({ modal: !this.state.modal });
        this.props.history.push('/exam/star');
        window.location.reload();

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
        let arrayTemp = this.state.users;
        let status = arrayTemp[this.state.currentPage - 2].questionStatus;
        if (status === 'notReceived') {
            arrayTemp[this.state.currentPage - 2].questionStatus = 'received';
        }

        if (this.state.currentPage > 1) {
            this.setState({
                currentPage: this.state.currentPage - 1,
                users: arrayTemp
            });
        }

    };

    ActivePage = (Index) => {
        let arrayTemp = this.state.users;
        let status = arrayTemp[Index].questionStatus;
        if (status === 'notReceived') {
            arrayTemp[Index].questionStatus = 'received';
        }
        console.log(Index)
        this.setState({
            currentPage: Index + 1,
            users: arrayTemp
        });

    };

    nextPage = (type, _id, Index) => {
        // alert(_id);
        if (type === 'Save') {
            let arrayTemp = this.state.users;
            arrayTemp[this.state.currentPage - 1].questionStatus = 'answered';
            if (arrayTemp.length !== this.state.currentPage)
                arrayTemp[this.state.currentPage].questionStatus = 'received';
            let NotVisitedCount = 0, answerCount = 0;
            arrayTemp.map(object => {
                if (object.questionStatus === 'answered') {
                    answerCount++;
                } else if (object.questionStatus === 'notReceived') {
                    NotVisitedCount++;
                }
            });

            this.setState({
                Answered: answerCount,
                NotVisited: NotVisitedCount,
                currentPage: this.state.currentPage + 1,
                users: arrayTemp
            });

        }
        else {
            let arrayTemp = this.state.users;
            arrayTemp[this.state.currentPage - 1].questionStatus = 'reviewed';
            if (arrayTemp.length !== this.state.currentPage)
                arrayTemp[this.state.currentPage].questionStatus = 'received';
            let NotVisitedCount = 0, reviewedCount = 0;
            arrayTemp.map(object => {
                if (object.questionStatus === 'reviewed') {
                    reviewedCount++;
                } else if (object.questionStatus === 'notReceived') {
                    NotVisitedCount++;
                }
            });

            this.setState({
                Reviewed: reviewedCount,
                NotVisited: NotVisitedCount,
                currentPage: this.state.currentPage + 1
            });

        }
    };

    onSkip = () => {
        let arrayTemp = this.state.users;
        arrayTemp[this.state.currentPage - 1].questionStatus = 'notAnswered';
        if (arrayTemp.length !== this.state.currentPage)
            arrayTemp[this.state.currentPage].questionStatus = 'received';
        let NotVisitedCount = 0, NotAnsweredCount = 0;
        arrayTemp.map(object => {
            if (object.questionStatus === 'notAnswered') {
                NotAnsweredCount++;
            } else if (object.questionStatus === 'notReceived') {
                NotVisitedCount++;
            }
        });

        this.setState({
            NotAnswered: NotAnsweredCount,
            NotVisited: NotVisitedCount,
            currentPage: this.state.currentPage + 1
        });

    }

    Update = (questionStatus) => {

        switch (questionStatus) {
            case "received":
                return "#535353";
            case "reviewed":
                return "blue";
            case "notReceived":
                return "#535353";
            case "answered":
                return "#4AB616";
            case "notAnswered":
                return "red";
        }
    }

    deSelect = (e) => {

        if (e.target.checked && !this.state.selectedOption) {
            this.setState({
                selectedOption: true,
            })
        }
        else if (e.target.checked && this.state.selectedOption) {
            this.setState({
                selectedOption: false,
            })
        }
    }

    render() {
        // console.log(this.state.users);
        const { exam_name, users, currentPage, usersPerPage } = this.state;
        const lastIndex = currentPage * usersPerPage;
        const firstIndex = lastIndex - usersPerPage;
        const currentUsers = users.slice(firstIndex, lastIndex);
        const totalPages = Math.ceil(users.length / usersPerPage);
        const { NotVisited, Answered, Reviewed, NotAnswered } = this.state;
        
        return (
            <div className="container">
                {this.state.isActive ?
                    <div className="card" style={{ marginTop: "5%", backgroundColor: "#D5ECF3" }}>
                        <form>
                            <h3 style={{ textAlign: "center", color: "Blue", fontFamily: "Bangers script" }}><b> <u>Take a Test</u></b></h3>
                            <div style={{ marginLeft: "30%", marginTop: "10%" }} className="form-group form-inline" >
                                <label style={{ color: "Blue", fontSize: "15px", marginTop: "-3px" }} className="control-label col-sm-2" htmlFor="email"><b>Select Exam</b></label>

                                <select required name="exam_name" value={exam_name} style={{ borderRadius: "20px" }} className="btn btn-secondary form-control col-md-3" onChange={this.changeHandler} >
                                    <option value="">Select</option>
                                    {this.state.exam.map((team) => <option key={team._id} value={team.value}>{team._id}</option>)}
                                </select>&nbsp;&nbsp; <p style={{ color: "red", fontFamily: "Monaco" }}>(You Must Select One Exam Before Starting  Test)</p>
                            </div>
                            <div style={{ marginTop: "10%" }} className="col text- center">
                                <button onClick={this.handleSubmit} style={{ borderRadius: "30px" }} title="Start Test" disabled={!this.state.exam_name} className="btn btn-primary">Start Test <i className="fa fa-arrow-right" aria-hidden="true"></i></button>
                            </div>
                        </form>
                    </div>
                    : null}


                <div className="App" >

                    <div className="row">

                        <div className="col-lg-8">
                            {users.length === 0 ?
                                <tr></tr> :
                                currentUsers.map((question, index) => (
                                    <div key={index}>
                                        <div style={{ backgroundColor: "#3D7EF1", color: "white" }} class="card-body"><b>{question.exam_name} : Question {currentPage} of {totalPages}</b></div>
                                        <div class="card" style={{ marginTop: "-1px", height: "420px" }}>
                                            <div style={{ backgroundColor: "#535353", color: "white" }} class="card-header"> &nbsp;{question.question}</div>

                                            <div class="card-body">
                                                {/* <label> */}
                                                <input type="radio" style={{ cursor: "pointer" }}
                                                    name={"ans[" + question._id + "]"}
                                                    checked={this.state.selectedOption[question._id] === question.option_1}
                                                    onClick={this.deSelect}
                                                    id={question.option_1}
                                                    value={question.option_1}
                                                    onChange={(e) => this.onRadioChange(e, question._id, question.answer, question.question)} /> <b>{question.option_1}</b>
                                                {/* </label> */}
                                            </div>

                                            <div class="card-body">
                                                {/* <label> */}
                                                <input type="radio" style={{ cursor: "pointer" }}
                                                    name={"ans[" + question._id + "]"}
                                                    checked={this.state.selectedOption[question._id] === question.option_2}
                                                    onClick={this.deSelect}
                                                    id={question.option_2}
                                                    value={question.option_2}
                                                    onChange={(e) => this.onRadioChange(e, question._id, question.answer, question.question)} /> <b>{question.option_2}</b>
                                                {/* </label> */}
                                            </div>

                                            <div class="card-body">
                                                {/* <label> */}
                                                <input type="radio" style={{ cursor: "pointer" }}
                                                    name={"ans[" + question._id + "]"}
                                                    checked={this.state.selectedOption[question._id] === question.option_3}
                                                    onClick={this.deSelect}
                                                    id={question.option_3}
                                                    value={question.option_3}
                                                    onChange={(e) => this.onRadioChange(e, question._id, question.answer, question.question)} /> <b>{question.option_3}</b>
                                                {/* </label> */}
                                            </div>

                                            <div class="card-body">
                                                {/* <label> */}
                                                <input type="radio" style={{ cursor: "pointer" }}
                                                    name={"ans[" + question._id + "]"}
                                                    checked={this.state.selectedOption[question._id] === question.option_4}
                                                    onClick={this.deSelect}
                                                    id={question.option_4}
                                                    value={question.option_4}
                                                    onChange={(e) => this.onRadioChange(e, question._id, question.answer, question.question)} /> <b>{question.option_4}</b>
                                                {/* </label> */}
                                            </div>
                                        </div>

                                    </div>
                                ))}
                        </div>

                        {this.state.isResult ?
                            <div class="card col-lg-4">

                                <div style={{ marginTop: "-20px", backgroundColor: "#3D7EF1", color: "white", textAlign: "center", fontWeight: "bold" }} className="row card-header">TIME LEFT :&nbsp;&nbsp;{this.state.value} : {this.state.seconds}<p> </p></div>
                                <div class="row card-body" id="ScrollStyle">
                                    {users.map((object, Index) => (
                                        <div key={object._id}>
                                            <div onClick={() => this.ActivePage(Index)} style={{ margin: "8px", width: "40px", height: "30px", color: "white", textAlign: "center", backgroundColor: this.Update(object.questionStatus), cursor: "pointer" }}>{Index + 1}</div>
                                        </div>
                                    ))}

                                </div>
                                <div class="card-footer" style={{ width: "auto", marginTop: "20px" }}>
                                    <p><b>Summary</b></p>
                                    <div >
                                        <div class="row ">
                                            <div class="Answered" style={{ color: "white", textAlign: "center" }}>{Answered}</div> &nbsp;&nbsp; <p><b>Answered</b></p>
                                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                <div class="Reviewed" style={{ color: "white", textAlign: "center" }}>{Reviewed}</div> &nbsp;&nbsp;&nbsp; <p><b>Reviewed</b></p>
                                        </div>
                                    </div>
                                    <div >
                                        <div class="row ">
                                            <div class="NotAnswered" style={{ color: "white", textAlign: "center" }}>{NotAnswered}</div> &nbsp;&nbsp; <p><b>Not Answered</b></p>
                                                &nbsp;&nbsp;&nbsp;
                                <div class="NotVisited" style={{ color: "white", textAlign: "center" }}>{NotVisited}</div>&nbsp; &nbsp; <p><b>Not Visited</b></p>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            : null}
                    </div>

                    {users.length === 0 ?
                        <tr align="center"></tr> :
                        currentUsers.map((question, Index) => (
                            <div key={question._id}>
                                <div class="btn-toolbar text-center well" style={{ marginLeft: "-12px" }}>

                                    <button disabled={currentPage === 1 ? true : false} onClick={this.prevPage} style={{ backgroundColor: "#F87F00", color: "#fff" }} type="button" class="btn col-xs-2 ml-3"><i class="fa fa-backward"></i>  PREVIOUS</button>
                                    <button disabled={currentPage === totalPages ? true : false} style={{ backgroundColor: "#4AB616", color: "#fff" }} onClick={() => this.nextPage("Save", question._id, Index)} type="button" class="btn btn-success col-xs-2  ml-3">
                                        SAVE & NEXT  <i class="fa fa-forward"></i>
                                    </button>
                                    <button disabled={currentPage === totalPages ? true : false} onClick={() => this.nextPage("Rev")} style={{ color: "#fff", backgroundColor: "#0000FF" }} type="button" class="btn btn-primary col-xs-2  ml-3">REVIEW & NEXT <i class="fa fa-check-circle" aria-hidden="true"></i>
                                    </button>
                                    <button disabled={currentPage === totalPages ? true : false} type="button" class="btn btn-secondary col-xs-2  ml-3" style={{ color: "#fff" }} onClick={this.onSkip}>
                                        SKIP <i class="fa fa-fast-forward" aria-hidden="true"></i></button>
                                    <button type="submit" class="btn btn-danger col-xs-2  ml-3" data-toggle="modal" id="click" data-target="#myModal" style={{ backgroundColor: "#FF0000" }} onClick={this.onSubmit}> FINISH & EXIT <i class="fa fa-sign-out"></i></button>
                                </div>
                            </div>
                        ))}

                </div>


                <div>


                    <div >


                        <Modal size="lg" show={this.state.modal} >
                            <Modal.Header closeButton onClick={this.onClose}>
                                <Modal.Title >RESULT</Modal.Title>
                            </Modal.Header>
                            <Modal.Body >
                                <div class="card">
                                    <div class="card-footer">
                                        <div class="float-left">
                                            <h4 class="text-primary">Total Questions <i class="fa fa-question" aria-hidden="true"></i></h4>
                                        </div>
                                        <div class="float-right">
                                            <h4 class="text-right text-primary"><b>{this.state.users.length} </b></h4>
                                        </div>
                                    </div>

                                    <div class="card-body">
                                        <div class="float-left">
                                            <h4 class="text-success">Right Answer <i class="fa fa-check-circle" aria-hidden="true"></i></h4>
                                        </div>
                                        <div class="float-right">
                                            <h4 class="text-right text-success"><b>{correctCount} </b></h4>
                                        </div>
                                    </div>

                                    <div class="card-footer">
                                        <div class="float-left">
                                            <h4 class="text-danger">Wrong Answer <i class="fa fa-times-circle-o" aria-hidden="true"></i></h4>
                                        </div>
                                        <div class="float-right">
                                            <h4 class="text-right text-danger"><b>{wrongAnswer} </b></h4>
                                        </div>
                                    </div>

                                    <div class="card-body">
                                        <div class="float-left">
                                            <h4 class="text-info">Overall Score <i class="fa fa-star" aria-hidden="true"></i></h4>
                                        </div>
                                        <div class="float-right">
                                            <h4 class="text-right text-info"><b>{score}</b> </h4>
                                        </div>
                                    </div>

                                    <div class="card-footer">
                                        <div class="float-left">
                                            <h4 style={{ color: "#7C0000" }}>Overall Percentage <i class="fa fa-percent" aria-hidden="true"></i></h4>
                                        </div>
                                        <div class="float-right">
                                            <h4 class="text-right" style={{ color: "#7C0000" }}><b>{Average.toFixed(2)}</b> </h4>
                                        </div>
                                    </div>

                                </div>


                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="danger" onClick={this.onClose}>
                                    Close
                                </Button>

                            </Modal.Footer>
                        </Modal>
                        {/* <div class="modal fade" id="myModal" role="dialog" data-backdrop="static" data-keyboard="false" tabindex="-1">
                            <div class="modal-dialog modal-lg" >


                                <div class="modal-content" style={{ backgroundColor: "#D5ECF3" }}>

                                    <div class="modal-body">
                                        <button type="button" onClick={this.onClose} class="close" title="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                        <br />
                                        <h2 style={{ textAlign: "center", color: "#5F0A2B", fontFamily: "" }}>RESULT</h2>
                                        <div class="card">
                                            <div class="card-footer">
                                                <div class="float-left">
                                                    <h4 class="text-primary">Total Questions <i class="fa fa-question" aria-hidden="true"></i></h4>
                                                </div>
                                                <div class="float-right">
                                                    <h4 class="text-right text-primary"><b>{this.state.users.length} </b></h4>
                                                </div>
                                            </div>

                                            <div class="card-body">
                                                <div class="float-left">
                                                    <h4 class="text-success">Right Answer <i class="fa fa-check-circle" aria-hidden="true"></i></h4>
                                                </div>
                                                <div class="float-right">
                                                    <h4 class="text-right text-success"><b>{correctCount} </b></h4>
                                                </div>
                                            </div>

                                            <div class="card-footer">
                                                <div class="float-left">
                                                    <h4 class="text-danger">Wrong Answer <i class="fa fa-times-circle-o" aria-hidden="true"></i></h4>
                                                </div>
                                                <div class="float-right">
                                                    <h4 class="text-right text-danger"><b>{wrongAnswer} </b></h4>
                                                </div>
                                            </div>

                                            <div class="card-body">
                                                <div class="float-left">
                                                    <h4 class="text-info">Overall Score <i class="fa fa-star" aria-hidden="true"></i></h4>
                                                </div>
                                                <div class="float-right">
                                                    <h4 class="text-right text-info"><b>{score}</b> </h4>
                                                </div>
                                            </div>

                                            <div class="card-footer">
                                                <div class="float-left">
                                                    <h4 style={{ color: "#7C0000" }}>Overall Percentage <i class="fa fa-percent" aria-hidden="true"></i></h4>
                                                </div>
                                                <div class="float-right">
                                                    <h4 class="text-right" style={{ color: "#7C0000" }}><b>{Average}</b> </h4>
                                                </div>
                                            </div>

                                        </div>
                                    </div>

                                    <div class="modal-footer">
                                        <button onClick={this.onClose} type="button" title="close" class="btn btn-danger" data-dismiss="modal">Close</button>
                                    </div>
                                </div>

                            </div>
                        </div> */}
                    </div>

                </div>

            </div>
        )
    }
}
