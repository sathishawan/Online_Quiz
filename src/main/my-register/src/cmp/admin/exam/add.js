import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios';
import swal from 'sweetalert'

// import $ from 'jquery';



export default class AdminExamAdd extends Component {

    constructor(props) {
        super(props)

        this.initialstate = {
            exam_id: '',
            exam_name: '',
            duration: '',
            exam_time: '',
            exam_date: '',
            alert_message: '',
            error: false,
            errorMessage: "",
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
        this.setState({ exam_id: '' });
        this.setState({ exam_name: '' });
        this.setState({ exam_date: '' });
        this.setState({ exam_time: '' });
        this.setState({ duration: '' });

    }

    SubmitHandler(e) {

        e.preventDefault();
        this.setState(this.initialstate);
        axios.post('http://localhost:8080/api/auth/admin/exam/add', this.state)
            .then(response => {
                swal({
                    title: "Done!",
                    text: "Successfully Inserted",
                    icon: "success",
                    timer: 2000,
                    button: false
                })
            })
            .catch(error => {
                this.setState({ alert_message: "error" })
                alert("Exam ID or Exam Name already exist");
            })


    }

    render() {

        const { exam_id, exam_name, exam_date, exam_time, duration } = this.state;
        return (
            <div class="panel-body">
                <div class="bs-example">
                    <div class="clearfix">
                        <Link title="Exam List" class="center" style={{ fontSize: 22, color: "blue" }} to={"/admin/exam/list"}><u><b>Exam list</b></u></Link>
                    </div>
                    {/* {this.state.alert_message==="success"?
                <div>
                <div id="success-alert" class="alert alert-success alert-dismissible fade show col-md-8 center" role="alert">
                <strong><i class="fa fa-check" aria-hidden="true"></i>
</strong> &nbsp;&nbsp;Exam Added Successfully.
                <button type="button" class="close" data-dismiss="alert">&times;</button>

                </div>
            </div>
                :null} */}
                    <div style={{ backgroundColor: "#D5ECF3" }} class="card col-md-8">

                        <form onSubmit={this.SubmitHandler}>
                            <div class="form-row">

                                <div class="form-group col-md-4">
                                    <strong><label for="inputEmail4">Exam ID<span style={{ color: "red" }} class="required" >*</span></label> </strong>
                                    <input type="text" class="form-control" name="exam_id" value={exam_id} placeholder="Exam ID" required onChange={this.changeHandler} />
                                </div>
                                <div class="form-group col-md-8">
                                    <strong><label for="">Exam Name<span style={{ color: "red" }} class="required" >*</span></label> </strong>
                                    <input type="text" class="form-control" name="exam_name" value={exam_name} placeholder="Exam Name" required onChange={this.changeHandler} />
                                </div>
                            </div>
                            <div class="form-row">
                                <div class="form-group col-md-4">
                                    <strong><label for="date">Exam Date<span style={{ color: "red" }} class="required" >*</span></label> </strong>
                                    <input type="date" class="form-control" name="exam_date" value={exam_date} required placeholder="Exam Date" onChange={this.changeHandler} />
                                </div>
                                <div class="form-group col-md-4">
                                    <strong><label >Exam Time<span style={{ color: "red" }} class="required" >*</span></label> </strong>
                                    <select required name="exam_time" value={exam_time} class="form-control col-md-7" onChange={this.changeHandler}>
                                        <option value="">Select</option>
                                        <option value="12:00 AM">12:00 AM</option>
                                        <option value="12:30 AM">12:30 AM</option>
                                        <option value="01:00 AM">01:00 AM</option>
                                        <option value="01:30 AM">01:30 AM</option>
                                        <option value="02:00 AM">02:00 AM </option>
                                        <option value="02:30 AM">02:30 AM</option>
                                        <option value="03:00 AM">03:00 AM</option>
                                        <option value="03:30 AM">03:30 AM</option>
                                        <option value="04:00 AM">04:00 AM</option>
                                        <option value="04:30 AM">04:30 AM</option>
                                        <option value="05:00 AM">05:00 AM</option>
                                        <option value="05:30 AM">05:30 AM</option>
                                        <option value="06:00 AM">06:00 AM</option>
                                        <option value="06:30 AM">06:30 AM</option>
                                        <option value="07:00 AM">07:00 AM</option>
                                        <option value="07:30 AM">07:30 AM</option>
                                        <option value="08:00 AM">08:00 AM</option>
                                        <option value="08:30 AM">08:30 AM</option>
                                        <option value="09:00 AM">09:00 AM</option>
                                        <option value="09:30 AM">09:30 AM</option>
                                        <option value="10:00 AM">10:00 AM</option>
                                        <option value="10:30 AM">10:30 AM</option>
                                        <option value="11:00 AM">11:00 AM</option>
                                        <option value="11:30 AM">11:30 AM</option>
                                        <option value="12:00 PM">12:00 PM</option>
                                        <option value="12:30 PM">12:30 PM</option>
                                        <option value="01:00 PM">01:00 PM</option>
                                        <option value="01:30 PM">01:30 PM</option>
                                        <option value="02:00 PM">02:00 PM </option>
                                        <option value="02:30 PM">02:30 PM</option>
                                        <option value="03:00 PM">03:00 PM</option>
                                        <option value="03:30 PM">03:30 PM</option>
                                        <option value="04:00 PM">04:00 PM</option>
                                        <option value="04:30 PM">04:30 PM</option>
                                        <option value="05:00 PM">05:00 PM</option>
                                        <option value="05:30 PM">05:30 PM</option>
                                        <option value="06:00 PM">06:00 PM</option>
                                        <option value="06:30 PM">06:30 PM</option>
                                        <option value="07:00 PM">07:00 PM</option>
                                        <option value="07:30 PM">07:30 PM</option>
                                        <option value="08:00 PM">08:00 PM</option>
                                        <option value="08:30 PM">08:30 PM</option>
                                        <option value="09:00 PM">09:00 PM</option>
                                        <option value="09:30 PM">09:30 PM</option>
                                        <option value="10:00 PM">10:00 PM</option>
                                        <option value="10:30 PM">10:30 PM</option>
                                        <option value="11:00 PM">11:00 PM</option>
                                        <option value="11:30 PM">11:30 PM</option>

                                    </select>
                                </div>
                                <div class="form-group col-md-4">
                                    <strong><label for="inputZip">Duration<span style={{ color: "red" }} class="required" >*</span> </label></strong>
                                    <input type="time" class="form-control" name="duration" value={duration} required placeholder="Duration" onChange={this.changeHandler} />
                                </div>
                            </div>
                            <br />
                            <div class="form-group col-md-4 pull-right">
                                <button style={{borderRadius:"10px"}} type="submit" class="btn btn-success"><i class="fa fa-paper-plane"></i> Submit</button> &nbsp;
                    <button type="reset" style={{borderRadius:"10px"}} class="btn btn-secondary" onClick={() => this.handleClear()}>Reset</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}
