import React, { Fragment } from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getVideoGames, filterVideoGamesDB } from "../Actions";
import { Link } from 'react-router-dom';
import GameCard from "./GameCard";
import Paginate from "./Paginate";

export default function Home (){

    const dispatch = useDispatch();
    const allGames = useSelector((state) => state.videogames); // es lo mismo que hacer el map state to props aqui lo que hacemos 
    //es guardar en la constante allgames todos los stados que hay dentro del array videogames

    //---Paginado---
    const [currentPage, setCurrentPage] = useState(1); //declaro un estado local y la pag actual, marcando el estado con el que va arrancar.
    const [videoGamesPerPage, setVideoGamesPerPage] = useState(15); //declaro otro estado local donde tengo la cantidad de juegos por pagina 
    const inOfLastGame = currentPage * videoGamesPerPage; //seteo el indice del ultimo juego y le digo sobre la pag actual multiplicame la cantidad de juegos por pagina
    const inOfFristGame = inOfLastGame - videoGamesPerPage; // necesito setear el indice de mi primer juego en cad apag, ya que a medida q cambie la pag el primer juego cambia
    const currentVideoGames = allGames.slice(inOfFristGame,inOfLastGame)

    const paging = (pages) => {
        setCurrentPage(pages)
    }





    
    useEffect(()=>{ // esto reemplaza todo lo que hace el mapdispatch y mapstate
        dispatch(getVideoGames());
    },[]) // en los corchetes son excepcione que colocamos, ej para que funcione el dispatch tiene que haber el componente ej x
    
    function handleClick(e){
        e.preventDefault();
        dispatch(getVideoGames());
    }

    function filterVideoGamesDB(e){ //arreglar el filter
        dispatch(filterVideoGamesDB(e.target.value))
    }


    return(
        <div>

            <button onClick={e => {handleClick(e)}}>Refresh</button>
            <Link to='/videogame'>Crear Video Juego</Link>
            <h1>VIDEO JUEGOS</h1>
                        
            <div>
                <label>Orden Alfabetico</label>
                <select>
                    <option value= 'az'>A-Z</option>
                    <option value= 'za'>Z-A</option>
                </select>
                <label>Generos</label>
                <select>
                    <option value='All'>Todos</option>
                    {/* {genres && genres.map(g => <option key={g.name} value={g.name}>{g.name}</option>)} */}
                    {/* <option>Acción</option>
                    <option>Indie</option>
                    <option>Aventura</option>
                    <option>RPG</option>
                    <option>Estrategia</option>
                    <option>Shooter</option>
                    <option>Casual</option>
                    <option>Simulación</option>
                    <option>Puzzle</option>
                    <option>Plataformas</option>
                    <option>Arcade</option>
                    <option>Carreras</option>
                    <option>Multijugador</option>
                    <option>Deportes</option>
                    <option>Peleas</option>
                    <option>Famil</option> */}
                </select>
                <label>Rating</label>
                <select>
                    <option value= 'Max-Min'>Max a Min</option>
                    <option value= 'Min-Max'>Min a Max</option>
                </select>
                <label>Juegos creados</label>
                <select onChange={ e => filterVideoGamesDB(e)}>
                    <option value= 'All'>Todos</option>
                    <option value= 'db'>Juegos Creados</option>
                    <option value= 'api'>Existentes</option>
                </select>

                {
                    currentVideoGames && currentVideoGames.map( g => {
                        return(
                        
                        <Link to={'/home/' + g.id}>

                        <GameCard name={g.name} 
                                  img={g.img} 
                                  rating={g.rating} 
                                  genres={g.genres}
                                  key={g.id} />
                        </Link>
                                   
                        )
                    })
                }
                <Paginate
                videoGamesPerPage={videoGamesPerPage}
                allGames={allGames.length}
                paging={paging}/>

            </div>




        </div>
    )




}