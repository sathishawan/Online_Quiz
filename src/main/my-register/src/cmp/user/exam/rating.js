import React, { useState } from 'react'
import { FaStar } from "react-icons/fa" 

const Rating = () => {

    const [rating, setRating] = useState(null);
    const [hover, setHover] = useState(null);

        return (
            <div>
            <div className="Rating">
               
                {[...Array(5)].map((star,i)=>{
                    const ratingValue =i+1;
                    return (
                        <label>
                            <input 
                            type="radio"
                             name="rating"  
                             value={ratingValue}
                             onClick={()=>setRating(ratingValue)}
                             />
                            <FaStar 
                            className="star" 
                            color={ratingValue <= ( hover || rating ) ? "#ffc107" : "#e4e5e9"} 
                            size={70}
                            onMouseEnter={()=>setHover(ratingValue)}
                            onMouseLeave={()=>setHover(null)}
                            />
                        </label>
                    )

                })}                                
                
            </div>
            <h4 className="value">Your rating is {rating}</h4>

            </div>
        ) 
}

export default Rating;
