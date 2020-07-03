import React, { Fragment, useState } from 'react'
import { FaStar } from "react-icons/fa"
import Button from 'react-bootstrap/Button';
import AuthService from "../../../services/auth.service.js";
const API_URL = 'http://localhost:8080/api/auth/';


const Rating = () => {

    const [rating, setRating] = useState(null);
    const [hover, setHover] = useState(null);


    const onSubmit = (e) => {
        e.preventDefault();
        console.log(rating)
        // alert("Your rating is "   +  rating)
}
    return (
        <Fragment>
            <form onSubmit={onSubmit}>

                <div className="Rating">

                    {[...Array(5)].map((star, i) => {
                        const ratingValue = i + 1;
                        return (
                            <label>
                                <input
                                    type="checkbox"
                                    name="rating"
                                    value={ratingValue}
                                    onClick={() => setRating(ratingValue)}
                                />
                                <FaStar
                                    className="star"
                                    color={ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
                                    size={70}

                                    onMouseEnter={() => setHover(ratingValue)}
                                    onMouseLeave={() => setHover(null)}
                                />
                            </label>
                        )

                    })}

                </div>
                <h4 className="value">Your rating is {rating}</h4>
                <div class="align">
                    <div class="proper">
                        <Button  type="submit" variant="info">Submit</Button>
                    </div>
                </div>
            </form>
        </Fragment>
    )
}

export default Rating;
