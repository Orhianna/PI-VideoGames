import React, { Fragment } from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getVideoGames, getGenres, filterVideoGamesDB, filterVideoGamesByGenres, orderByName, orderByRating } from "../Actions";
import { Link } from 'react-router-dom';
import GameCard from "./GameCard";
import Paginate from "./Paginate";
import SearchBar from './SearchBar'
import '../Css/Home.css'


export default function Home (){

    const dispatch = useDispatch();
    const allGames = useSelector((state) => state.videogames); // es lo mismo que hacer el map state to props aqui lo que hacemos 
    //es guardar en la constante allgames todos los stados que hay dentro del array videogames
    const allGenres = useSelector((state) => state.genres)

    //---Paginado---
    const [orden, setOrden] = useState('')
    const [currentPage, setCurrentPage] = useState(1); //declaro un estado local y la pag actual, marcando el estado con el que va arrancar.
    const [videoGamesPerPage, setVideoGamesPerPage] = useState(15); //declaro otro estado local donde tengo la cantidad de juegos por pagina 
    const inOfLastGame = currentPage * videoGamesPerPage; //seteo el indice del ultimo juego y le digo sobre la pag actual multiplicame la cantidad de juegos por pagina
    const inOfFristGame = inOfLastGame - videoGamesPerPage; // necesito setear el indice de mi primer juego en cad apag, ya que a medida q cambie la pag el primer juego cambia
    const currentVideoGames = allGames.slice(inOfFristGame,inOfLastGame)

    const paging = (pages) => {
        setCurrentPage(pages)
    }

    //-------------

    useEffect(()=>{ // esto trae los generos
       dispatch(getGenres())
    },[dispatch])

    
    useEffect(()=>{ // esto reemplaza todo lo que hace el mapdispatch y mapstate
        dispatch(getVideoGames())
    },[dispatch]) // en los corchetes son excepcione que colocamos, ej para que funcione el dispatch tiene que haber el componente ej x
    
    function handleClick(e){
        e.preventDefault();
        dispatch(getVideoGames());
        setCurrentPage(1);
    }

    function handleSort(e){
        e.preventDefault();
        dispatch(orderByName(e.target.value));
        setCurrentPage(1);
        //setOrden(`Ordenado ${e.target.value}`)
        setOrden(e.target.value)
    }

    function handleSortRating(e){
        e.preventDefault();
        dispatch(orderByRating(e.target.value));
        setCurrentPage(1);
        //setOrden(`Ordenado ${e.target.value}`)
        setOrden(e.target.value)
    }


    function handleFilterVideoGamesByGenres(e){ 
        e.preventDefault();
        dispatch(filterVideoGamesByGenres(e.target.value))
    }



    function handleFilterVideoGamesDB(e){ 
        e.preventDefault();
        dispatch(filterVideoGamesDB(e.target.value))
    }


    return(
        <div className="Fondo-Home">
            

            <div className="Barra-Superior">
            <button className="Refresh-Boton"onClick={e => {handleClick(e)}}>Home</button>
            <Link to='/newvideogame'><button className="Crear-Video">Crear Video Juego</button></Link>
            </div>
            <h1 className="Titulo">VIDEOS JUEGOS</h1>
            

            <SearchBar/>
                        
            <div>
                <label className="Subtitulo">Orden Alfabetico</label>
                <select className="Selector" onChange={(e) => handleSort(e)}>
                    <option className ="fondo-selector" value= 'az'>A-Z</option>
                    <option className ="fondo-selector" value= 'za'>Z-A</option>
                </select>
                <label className="Subtitulo">Generos</label>
                <select className="Selector" onChange={(e) => handleFilterVideoGamesByGenres(e)}>
                    <option className ="fondo-selector" value='All'>Todos</option>
                    {allGenres.map(g => <option className ="fondo-selector" key={g.id} value={g.name}>{g.name}</option>)}
                    
                </select>
                <label className="Subtitulo">Rating</label>
                <select  className="Selector" onChange={(e) => handleSortRating(e)}>
                    <option className ="fondo-selector" value= 'Max-Min'>Max a Min</option>
                    <option className ="fondo-selector" value= 'Min-Max'>Min a Max</option>
                </select>
                <label className="Subtitulo">Juegos creados</label>
                <select className="Selector" onChange={(e) => handleFilterVideoGamesDB(e)}>
                    <option className ="fondo-selector" value= 'All'>Todos</option>
                    <option className ="fondo-selector" value= 'db'>Juegos Creados</option>
                    <option className ="fondo-selector" value= 'api'>Existentes</option>
                </select>
                <div className="Contenedor-Reload-Filter" >
                <button className="Reload-Filter" onClick={e => {handleClick(e)}}>Limpiar Filtros</button>
                </div>

                <div className="Card-Contenedor">

                {
                    currentVideoGames.length > 0 && currentVideoGames.map( g => {
                        return(
                        <Fragment key={g.id}>
                        <Link to={'/home/' + g.id}>

                        <GameCard name={g.name} 
                                  background_image={g.background_image} 
                                  rating={g.rating} 
                                  genres={g.genres}
                                  key={g.id}
                                  />
                                  
                        </Link>
                        </Fragment>
                                   
                        )
                    })
                }
                </div>
                <Paginate
                videoGamesPerPage={videoGamesPerPage}
                allGames={allGames.length}
                paging={paging}/>

            </div>

        </div>
    )


};