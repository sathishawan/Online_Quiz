import React, { Component } from 'react';
import axios from 'axios';
import AuthService from "./../../services/auth.service.js";

const API_URL = 'http://localhost:8080/api/auth/';

export default class UserDashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            examcount: [],
            resultCount: [], total_results: 0,
        };
    }

    componentDidMount() {

        axios.get(API_URL + 'user/examlistcount')
            .then(res => {
                const examcount = res.data;
                this.setState({ examcount });
                // console.log(examcount)
            })

        axios.get(API_URL + 'user/totalresultsForUser?_userid=' + AuthService.getCurrentUser().id)
            .then(res => {
                var resultCount = res.data;
                if (resultCount.length > 0) {
                    this.setState({ resultCount });
                    // console.log(resultCount);
                }
                else {
                    this.setState({ total_results: 0 });
                    // console.log(this.state.total_results);
                }
            })
    }

    onExamList = () => {
        this.props.history.push("/exam/list")
    }

    onResultList = () => {
        this.props.history.push("/result/list")
    }

    render() {
        // console.log(this.state.resultCount.length)

        const { resultCount } = this.state;
        const total_results = 0;

        return (
            <div >
                <div class="container mt-3">
                    <div class="row" id="row">
                        <div class="col-lg-4">
                            <div class="demo-content bg9" onClick={this.onExamList}>
                                <div class="center">
                                    EXAMS
                <div><h2>{this.state.examcount}</h2></div>
                                </div>
                                <div> <i id="fa-star-o" class="fa fa-list fa-3x"></i> </div>
                                <div class="list"><b> VIEW EXAMS</b></div>
                            </div>
                        </div>
                        <div class="space"></div>
                        {resultCount.length > 0 ?
                            <div class="col-lg-4">
                                <div class="demo-content bg9" onClick={this.onResultList}>
                                    <div class="center">
                                        RESULTS
                                    {resultCount.map(count => (
                                        <div><h2>{count.total_results}</h2></div>
                                    ))}
                                    </div>
                                    <div> <i id="fa-star-o" class="fa fa-star-o fa-3x"></i> </div>
                                    <div class="list"><b> VIEW RESULTS</b></div>
                                </div>
                            </div>
                            :
                            <div class="col-lg-4">
                                <div class="demo-content bg9" onClick={this.onResultList}>
                                    <div class="center">
                                        RESULTS
                                <div><h2>{total_results}</h2></div>
                                    </div>
                                    <div> <i id="fa-star-o" class="fa fa-star-o fa-3x"></i> </div>
                                    <div class="list"><b> VIEW RESULTS</b></div>
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </div>
        )
    }
}
