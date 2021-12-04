import React from "react";


export default function GameCard({name, background_image, genres, rating}){


    return(
        <div>
            <h3>{name}</h3>
            <h5>{genres}</h5>
            <h4>{rating}</h4> 
            <img src={background_image} alt='img' width='300px' height='200px'/>
        </div>
    )
}