import React, { Component } from 'react';
import { FaStar } from "react-icons/fa"
import Button from 'react-bootstrap/Button';

export default class star extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             rating:null,
             ratingValue:null,
             hover:null,
             setHover:null,
        }
    }

    onStar=(e)=>
    {
        e.preventDefault();
        console.log(this.state.ratingValue)
    }
    onMouseEnterHandler=(e)=>
    {
    this.setState({ratingValue:e.target.style.color = '#ffc107'})
    }
    
    onMouseLeaveHandler=(e)=>
    {
        this.setState({ratingValue:e.target.style.color = '#e4e5e9'})
    }

    render() {
        const{ratingValue,hover,rating,setHover} = this.state;

return(
        <div className="Rating">
        
        {[...Array(5)].map((star, i) => {
            const ratingValue = i + 1;

        return (
            <div>
                <form>
                    <input 
                    type="radio" 
                    name="rating"
                    value={ratingValue}
                    onClick={this.onStar}
                    />
                    <FaStar
                     className="star"
                     size={70}
                     color={ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
                     onMouseOver={this.onMouseEnterHandler}
                    onMouseLeave={this.onMouseLeaveHandler} 
                    />
                </form>
            </div>
        )
    })}
    </div>
)
    }
}
