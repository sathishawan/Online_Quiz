import React, { Component } from 'react';
import axios from 'axios';
// import AuthService from "./../../services/auth.service.js";

const API_URL = 'http://localhost:8080/api/auth/';


export default class AdminDashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            usercount: [],
            examcount: [],
            questioncount: [],
            resultCount: [],
        };
    }

    componentDidMount() {

        axios.get(API_URL + 'admin/userCount', { headers: {'Authorization': 'application/json'}})
            .then(res => {
                const usercount = res.data;
                this.setState({ usercount });
                // console.log('Total' + count)
            })

        axios.get(API_URL + 'admin/examCount')
            .then(res => {
                const examcount = res.data;
                this.setState({ examcount });
                // console.log('Total' + count)
            })

        axios.get(API_URL + 'admin/questionCount')
            .then(res => {
                const questioncount = res.data;
                this.setState({ questioncount });
                // console.log('Total' + count)
            })

            axios.get(API_URL + 'admin/resultCount')
            .then(res => {
                const resultCount = res.data;
                this.setState({ resultCount });
                // console.log('Total' + count)
            })
    }

    onUsers = () => {
        this.props.history.push('/admin/user/list');
    }
    onExams = () => {
        this.props.history.push('/admin/exam/index');
    }
    onQuestions = () => {
        this.props.history.push('/admin/question/index');
    }
    onResult = () => {
        this.props.history.push('/admin/result/list');    }


    render() {
        return (
            <div class="dashboard">

                <div class="container mt-3">
                    <div class="row">
                        <div class="col-lg-4">
                            <div class="demo-content bg1" onClick={this.onUsers}>
                                <div class="center">
                                    TOTAL USERS
                        <div><h2>{this.state.usercount}</h2></div>
                                </div>
                                <div> <i class="fa fa-users fa-3x"></i> </div>
                                <div class="list"><b> USERS LIST</b></div>
                            </div>
                        </div>
                        <div class="col-lg-4" >
                            <div class="demo-content bg2" onClick={this.onExams}>
                                <div class="center">
                                    TOTAL EXAMS
                                <div><h2>{this.state.examcount}</h2></div>
                                </div>
                                <div> <i class="fa fa-pencil-square-o fa-3x"></i> </div>
                                <div class="list"><b> EXAM LIST</b></div>
                            </div>
                        </div>
                        <div class="col-lg-4" >
                            <div class="demo-content bg3" onClick={this.onQuestions}>
                                <div class="center">
                                    TOTAL QUESTIONS
                            <div><h2>{this.state.questioncount}</h2></div>
                                </div>
                                <div> <i class="fa fa-question-circle-o fa-3x"></i> </div>
                                <div class="list"><b> QUESTION LIST</b></div>
                            </div>
                        </div>
                    </div>

                    <div class="row" id="top">
                        {/* <div class="col-lg-4" >
                            <div class="demo-content bg4" onClick={this.onSubjects}>
                                <div class="center">
                                    TOTAL SUBJECTS
                <div><h2>{this.state.examcount}</h2></div>
                                </div>
                                <div> <i class="fa fa-book fa-3x"></i> </div>
                                <div class="list"><b> SUBJECT LIST</b></div>
                            </div>
                        </div> */}
                        <div class="col-lg-4">
                            <div class="demo-content bg5" onClick={this.onResult}>
                                <div class="center">
                                    RESULTS
                <div><h2>{this.state.resultCount}</h2></div>
                                </div>
                                <div> <i id="fa-star-o" class="fa fa-star-o fa-3x"></i> </div>
                                <div class="list"><b> VIEW RESULTS</b></div>
                            </div>
                        </div>
                        {/* <div class="col-lg-4">
                            <div class="demo-content bg6">
                                <br /><br />
                    .col-lg-4</div>
                        </div> */}
                    </div>

                    {/* <div class="row">
            <div class="col-lg-3">
                <div class="demo-content">.col-lg-4</div>
            </div>
            <div class="col-lg-3">
                <div class="demo-content bg-alt">.col-lg-4</div>
            </div>
            <div class="col-lg-3">
                <div class="demo-content">.col-lg-4</div>
            </div>
        </div> */}
                </div>

            </div>
        )
    }
}
