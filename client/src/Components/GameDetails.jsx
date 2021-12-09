import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector} from "react-redux";
import {getGameDetail, resetDetailPage } from '../Actions/index';
import { useEffect } from "react";
import '../Css/GameDetail.css'



export default function GameDetail(props){
    
    
    const id = props.match.params.id;
    const dispatch = useDispatch();
    
        
    useEffect(() => {
        dispatch(getGameDetail(id))
        return ()=>{
            dispatch(resetDetailPage())
        }
    },[dispatch, id])

  
    const aGame = useSelector ((state) => state.gamedetail)
  
    return(
        <div className="Fondo-Detail">
            {  
             
                aGame.length > 0 ?
                <div className="Conte-General">
                    <h1 className="TituloDetail" >{aGame.map(el => el.name )}</h1>
                    <img className="ImagenDetail" src={aGame.map(el => el.background_image)} alt=""/>
                   
                   <div className="Conte-Sub"> 

                    <h4 className="TituloRating">⭐ Rating : </h4>
                    <p className="Conte-Rating">{aGame.map(el => el.rating)}</p>

                    <h4 className="TituloFecha">📆 Fecha de Lanzamiento : </h4>
                    <p className="Conte-Fecha">{aGame.map(el => el.released)}</p>
                    
                    <h4 className="TituloPlataforma">🎮 Plataformas : </h4>
                    <p className="Conte-Plataform">{ aGame && aGame.map(el => el.plataforms.join(",  "))}</p>
                    
                    <h4 className="TituloGeneros">⚔ Generos : </h4>
                    <p className="Conte-Generos">{ aGame && aGame.map(el => el.genres.join(",  "))}</p>
                    
                    <h4 className="TituloDescripcion">📜 Descripción :</h4>
                    <p className="Descripcion-Detalle" >{aGame.map(el => el.description)}</p>
                    </div>

                </div> :  <div className="Conte-General">
                    
                    <h1 className="TituloDetail">{aGame.name}</h1>
                    <img className="ImagenDetail" src={aGame.background_image} alt=""/>
                   
                   <div className="Conte-Sub">

                    <h4 className="TituloRating">⭐ Rating :</h4>
                    <p className="Conte-Rating">{aGame.rating}</p>

                    <h4 className="TituloFecha">📆 Fecha de Lanzamiento :</h4>
                    <p className="Conte-Fecha">{aGame.released}</p>
                    
                    <h4 className="TituloPlataforma">🎮 Plataformas :</h4>
                    <div className="Conte-Plataform">{aGame.platforms && aGame.platforms.join(",  ")}</div>


                    <h4 className="TituloGeneros">⚔ Generos :</h4>
                    <div className="Conte-Generos">{aGame.genres && aGame.genres.join(",  ")}</div>
                        
                    <h4 className="TituloDescripcion">📜 Descripción :</h4>
                    <p className="Descripcion-Detalle" dangerouslySetInnerHTML={{__html: aGame.description}}/>
                    </div>
                    </div>
                             
            }
            <div className="Contenedor-Boton-Volver-Det">
            <Link to='/home'>
                <button className="Boton-Volver-Det">◀ Volver</button>
            </Link>
            </div>
        </div>

       
    )

}
