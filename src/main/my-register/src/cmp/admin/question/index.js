import React, { Component } from 'react'

export default class AdminQuestionList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            count: [],
        };
    }

    onAdd = () => {
        this.props.history.push("/admin/question/add")
    }

    onList = () => {
        this.props.history.push("/admin/question/list")
    }

    render() {
        return (
            <div >
                <div class="container mt-3" style={{}}>
                    <div class="row" id="row">
                        <div class="col-lg-4">
                            <div class="demo-content bg8" onClick={this.onAdd}>
                                <div class="center" >
                                    <div> <i class="fa fa-plus fa-3x"></i> </div>
                                    <div class="list"><h2>Add Question</h2></div>
                                    <i class="fa fa-info-circle"></i> Add Question Manually

                                </div>
                            </div>
                        </div>
                        <div class="col-lg-4">
                            <div class="demo-content bg8" onClick={this.onList}>
                                <div class="center" >
                                    <div> <i class="fa fa-search fa-3x"></i> </div>
                                    <div class="list"><h2>View Question </h2></div>
                                    <i class="fa fa-info-circle"></i> View list of Questions
                                </div>

                            </div>
                        </div>
                        <div class="col-lg-4">
                            <div class="demo-content bg8" onClick={this.onList}>
                                <div class="center" >
                                    <div> <i class="fa fa-cloud-upload fa-3x"></i> </div>
                                    <div class="list"><h2>File Import</h2></div>
                                    <i class="fa fa-info-circle"></i> Import file externally
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
