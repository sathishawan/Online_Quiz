import React, { Component } from 'react';
import axios from 'axios';
import swal from 'sweetalert'
// import { Redirect } from 'react-router-dom';
// const apiUrl = 'http://localhost:8080/api/auth';

class AdminExamEdit extends Component {

  constructor(props) {
    super(props)

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {

      exam_id: '',
      exam_name: '',
      exam_date: '',
      exam_time: '',
      duration: ''

    };
  }

  componentDidMount() {
    axios.get('http://localhost:8080/api/auth/admin/exam/edit/' + this.props.match.params.id)
      .then(res => {
        this.setState({

          exam_id: res.data.exam_id,
          exam_name: res.data.exam_name,
          exam_date: res.data.exam_date,
          exam_time: res.data.exam_time,
          duration: res.data.duration
        });

      })
      .catch(function (error) {
        console.log(error);
      })
  }


  onChange = (event) => {

    this.setState({ [event.target.name]: event.target.value });
  }

  onSubmit = (e) => {

    // debugger;  
    e.preventDefault();

    const obj = {
      exam_id: this.state.exam_id,
      exam_name: this.state.exam_name,
      exam_date: this.state.exam_date,
      exam_time: this.state.exam_time,
      duration: this.state.duration
    };

    axios.put('http://localhost:8080/api/auth/admin/exam/edit/' + this.props.match.params.id, obj)
      .then((result) => {
        console.log(result.data);
        this.props.history.push('/admin/exam/list');
        swal({
          title: "Done!",
          text: "Successfully Updated",
          icon: "success",
          timer: 2000,
          button: false
        })
        console.log(this.state)
      });

  }

  render() {

    return (

      <div style={{ backgroundColor: "#D5ECF3" }} class="card col-md-8">

        <form onSubmit={this.onSubmit}>
          <div class="form-row">

            <div class="form-group col-md-4">
              <strong><label for="inputEmail4">Exam ID<span style={{ color: "red" }} class="required" >*</span></label> </strong>
              <input type="text" class="form-control" required name="exam_id" value={this.state.exam_id} placeholder="Exam ID" onChange={this.onChange} />
            </div>
            <div class="form-group col-md-8">
              <strong><label for="">Exam Name<span style={{ color: "red" }} class="required" >*</span></label> </strong>
              <input type="text" class="form-control" required name="exam_name" value={this.state.exam_name} placeholder="Exam Name" onChange={this.onChange} />
            </div>
          </div>
          <div class="form-row">
            <div class="form-group col-md-4">
              <strong><label for="date">Exam Date<span style={{ color: "red" }} class="required" >*</span></label> </strong>
              <input type="date" class="form-control" required name="exam_date" value={this.state.exam_date} placeholder="Exam Date" onChange={this.onChange} />
            </div>
            <div class="form-group col-md-4">
              <strong><label >Exam Time<span style={{ color: "red" }} class="required" >*</span></label> </strong>
              <select name="exam_time" required value={this.state.exam_time} class="form-control col-md-7" onChange={this.onChange}>
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
              <input type="time" class="form-control" name="duration" required value={this.state.duration} placeholder="Duration" onChange={this.onChange} />
            </div>
          </div>
          <br />
          <div class="form-group">
            <button style={{borderRadius:"10px"}} type="submit" class="btn btn-primary"><i class="fa fa-paper-plane"></i> Update</button> &nbsp;
          </div>
        </form>
      </div>

    );
  }
}

export default AdminExamEdit;