import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector} from "react-redux";
import {getGameDetail } from '../Actions/index';
import { useEffect } from "react";



export default function GameDetail(props){
    
    
    const id = props.match.params.id;
    const dispatch = useDispatch();
    
        
    useEffect(() => {
        dispatch(getGameDetail(id))
    }, [dispatch])

    const aGame = useSelector ((state) => state.gamedetail)
  
    return(
        <div>
            {  
             
                aGame.length > 0 ?
                <div>
                    <h1>{aGame.map(el => el.name )}</h1>
                    <img src={aGame.map(el => el.background_image)} alt="" width="400px" height="300px"/>
                    
                    <h4>Rating : </h4>
                    <p>{aGame.map(el => el.rating)}</p>

                    <h4>Fecha de Lanzamiento : </h4>
                    <p>{aGame.map(el => el.released)}</p>
                    
                    <h4>Plataformas : </h4>
                    <p>{aGame.map(el => el.plataforms + ' ')}</p>
                    
                    <h4>Generos : </h4>
                    <p>{aGame.map(el => el.genres + ' ')}</p>
                    
                    <h4>Descripción :</h4>
                    <p>{aGame.map(el => el.description)}</p>

                </div> :  <div>
                    
                    <h1>{aGame.name}</h1>
                    <img src={aGame.background_image} alt="" width="400px" height="300px"/>
                   
                    <h4>Rating :</h4>
                    <p>{aGame.rating}</p>

                    <h4>Fecha de Lanzamiento :</h4>
                    <p>{aGame.released}</p>
                    
                    <h4>Plataformas :</h4>
                    <div>{' ' + aGame.platforms + ' '}</div>


                    <h4>Generos :</h4>
                    <div>{' '+ aGame.genres + ' '}</div>
                        
                    <h4>Descripción :</h4>
                    <p dangerouslySetInnerHTML={{__html: aGame.description}}/>
                   
                    </div>
                             
            }
            
            <Link to='/home'>
                <button>Volver</button>
            </Link>
        </div>

       
    )

}
