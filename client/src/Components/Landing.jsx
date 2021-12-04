import React from "react";
import { Link } from 'react-router-dom';


export default function LandingPage(){
    return(
        <dic>
            <h1>Bienvenidos</h1>
            <Link to='/home'>
                <button>START</button>
            </Link>
        </dic>
    )
};