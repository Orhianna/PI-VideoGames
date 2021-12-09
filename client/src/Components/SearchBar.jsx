import React from "react";
import { useState } from "react";
import {  useDispatch } from 'react-redux';
import { getVideoGameByName } from "../Actions";
import '../Css/SearchBar.css'


export default function SearchBar(){
    const dispatch = useDispatch();
    const [name, setName] = useState('');
    
    function handleInputChange(e){
        e.preventDefault()
        setName(e.target.value)
        console.log(name) 
        // ver como hacer q despues de la busqueda vuelva el imput a estar vacio
    } 

    function handleSubmit(e){
        e.preventDefault()
        if(!name){ return alert('Colocar un busqueda')
        } else {
        dispatch(getVideoGameByName(name))
        setName('')
        document.getElementById("search").value='';}
    }

    return(
        <div className="ContenedorSearchBar">
            <input id="search" className="InputSearchBar" type="text"
            placeholder= "Buscar Juego..." 
            onChange={(e) => handleInputChange(e)}/>
            <button className="botonSearchBar" type='submit' onClick={(e) => handleSubmit(e)}>Buscar🔎</button>
        </div>
    )
}