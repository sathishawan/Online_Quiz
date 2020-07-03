import React, { Component } from 'react';
import swal from 'sweetalert'
import Button from 'react-bootstrap/Button';
import AuthService from "../../../services/auth.service.js";
const API_URL = 'http://localhost:8080/api/auth/';

const date = new Date();

class star extends Component {

    constructor(props) {
        super(props);

        this.state = {
            stars: [],
            feedBack: [],
            user_id: '',
            user_name: '',
            review: '',
            created_date: '',
            rating_value: '',
            ratingValue: 0,
            rating: 0,
            hovered: 0,
            selectedIcon: "★",
            deselectedIcon: "☆",
            currentUser: AuthService.getCurrentUser(),
            count:0

        };

        let outOf = props.outOf ? props.outOf : 5;

        for (var i = 0; i < outOf; i++) {
            this.state.stars.push(i + 1);
        }
    }

    changeRating(newRating) {
        this.setState({
            rating: newRating
        });

        if (this.props.onChange)
            this.props.onChange(newRating);
    }

    hoverRating(rating) {
        this.setState({
            hovered: rating
        });
    }

    onBack = () => {
        this.props.history.push("/dashboard/index");
    }

    onSubmit = (e) => {
        e.preventDefault();
        var rating_value = this.state.rating;

        console.log(rating_value)
        fetch(API_URL + 'user/rating', {
            method: 'POST',
            headers: {
                Accept: 'application/json', 'Content-Type': 'application/json'
            },
            body: JSON.stringify({ user_id: this.state.currentUser.id, user_name: this.state.currentUser.username, rating_value: this.state.rating, review: this.state.review, created_date: date })
        }).then(response => {
            response.json().then(data => {
                this.setState({ feedBack: data, count:this.state.count+1})
                console.log(this.state.count)
                swal({
                    title: "Done!",
                    text: "Feedback submitted successfully",
                    icon: "success",
                    timer: 2000,
                    button: false
                  })
                  this.props.history.push("/dashboard/index");
                })
        })
    }

    changeHandler = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({
            [name]: value
        })
    }

    render() {

        const { stars, rating, hovered, deselectedIcon, selectedIcon, review } = this.state;

        return (
            <div>
                <form>

                    <div className="rating" style={{ fontSize: '7em', color: "#ffc107" }}>

                        {stars.map(star => {
                            return (
                                <span
                                    style={{ cursor: 'pointer' }}
                                    onClick={() => { this.changeRating(star); }}
                                    onMouseEnter={() => { this.hoverRating(star); }}
                                    onMouseLeave={() => { this.hoverRating(0); }}
                                    value={selectedIcon}
                                >
                                    {rating < star ?
                                        hovered < star ? deselectedIcon : selectedIcon
                                        :
                                        selectedIcon
                                    }
                                </span>

                            );
                        })}


                    </div>
                    <h4 style={{marginTop:"20px",color:"#138496"}} className="value">Your rating is {rating}</h4>

                    <hr />
                    <div class="row d-flex justify-content-center mx-auto">
                        <div className="col-md-8">
                            <label for="comment"><b>Add a written review</b></label>
                            <textarea value={review} class="form-control" rows="4" onChange={this.changeHandler} name="review"></textarea>
                        </div>
                    </div>
                    <div class="align">
                        <div class="proper">
                            <Button onClick={this.onBack} type="submit" variant="secondary"><i class="fa fa-angle-left" aria-hidden="true"></i> Go Back</Button>
                            <Button onClick={this.onSubmit} style={{ marginLeft: "20px" }} disabled={!this.state.rating || !this.state.review} type="submit" variant="info">Submit</Button>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

export default star