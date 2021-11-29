import React from "react";

export default function GameCard({name, img, genres, rating}){
    return(
        <div>
            <h3>{name}</h3>
            <h5>{genres}</h5>
            <h5>{rating}</h5> 
            <img src={img} alt='img' width='300px' height='200px'/>
        </div>
    )
}