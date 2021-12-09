import React from "react";
import '../Css/GameCard.css'


export default function GameCard({name, background_image, genres, rating}){


    return(
        
        <div className="Cards_item">
        <div className="Card">
            <img className="Imagen" src={background_image} alt='img'/>
            <h2 className="Nombre">{name}</h2>
            <h5 className="Generos">🔹Generos : {genres.join(",  ")}</h5>
            <h3 className="Raiting">{rating}</h3> 
        </div>
        </div>
        
    )
}