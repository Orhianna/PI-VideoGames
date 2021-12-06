import React from "react";
import { Link } from 'react-router-dom';
import '../Css/Landing.css'



export default function LandingPage(){
    return(
        
        <div className="fondo">
            <h1 className="frase">"Fue el destino quien me trajo aquí, <br/>
            pero soy yo,<br/> 
            quien trazó mi propio camino"</h1>
            <Link to='/home'>
                <button className="boton">S T A R T</button>
            </Link>
        </div>
        
    )
};