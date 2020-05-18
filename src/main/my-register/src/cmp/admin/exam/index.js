import React, { Component } from 'react'

export default class AdminExamList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            count: [],
        };
    }

    onAdd = () =>
    {
        this.props.history.push("/admin/exam/add")
    }

    onView = () =>
    {
        this.props.history.push("/admin/exam/list")
    }

    render() {
        return (
            <div >
                <div class="container mt-3">
                    <div class="row" id="row">
                        <div class="col-lg-4">
                            <div class="demo-content bg7"  onClick={this.onAdd}>
                            <div class="center" >
                           <div> <i class="fa fa-plus fa-3x"></i> </div>
                                <div class="list"><h1> Add Exam</h1></div>
                                </div>
                            </div>
                        </div>
                        <div class="space"></div>
                        <div class="col-lg-4">
                            <div class="demo-content bg7"  onClick={this.onView}>
                            <div class="center" >
                           <div> <i class="fa fa-search fa-3x"></i> </div>
                                <div class="list"><h1> View Exam</h1></div>
                                </div>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
