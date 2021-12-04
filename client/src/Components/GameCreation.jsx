import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import { createVideoGame, getGenres } from '../Actions'



//Ahora se guarda la info en base de datos, pero al hacerlos el servidor se crashea y no entiendo por que. Hay que resolverlo!!!!

export default function GameCreation(){
    const dispatch = useDispatch()
    const genres = useSelector((state) => state.genres)
    

    let allplatforms = [ 'PC','PlayStation','Xbox','Nintendo Switch', 'iOS', 'Android','Nintendo', 
    'PS Vita', 'PSP','Wii', 'GameCube', 'Game Boy', 'SNES', 'NES', 'Commodore', 'Atari', 'Genesis',
    ' SEGA', 'Dreamcast','3DO','Jaguar', 'Game Gear', 'Neo Geo'];

    const [input, setInput] = useState({
        name:'',
        description: '',
        released:'',
        rating:'',
        background_image:'',
        plataforms:[],
        genres:[]
    })

    function handleChange (e){
        //e.preventDefault()
        setInput({
            ...input,
            [e.target.name] : e.target.value
        })
        
        console.log(input)

    }

    function handleCheckPlataforms(e){
        if(e.target.checked){
            setInput({
                ...input,
                plataforms:[...input.plataforms,e.target.value]
            })
        }
    }

    function handleCheckGenres(e){
        if(e.target.checked){
            
            setInput({
                ...input,
                genres:[...input.genres,{name: e.target.value}]
            })
        }
    }

   
    function handleSubmit(e){
        e.preventDefault();
        if(!input.name){
            return alert('Nombre requerido')
        }else if (!input.description){
            return alert('Descripción requerida')
        }else {
        console.log(input);
        dispatch(createVideoGame(input))
        alert('Juego Creado')
        setInput({
        name:'',
        description: '',
        released:'',
        rating:'',
        background_image:'',
        plataforms:[],
        genres:[]
        })
      }

    }

    useEffect(() =>{
        dispatch(getGenres())
    }, [])
    
   
    return(
        <div>
            <Link to='/home'><button>Volver</button></Link>
            <h1>Crea tu Juego</h1>
            <form onSubmit={(e) => handleSubmit(e)}>
                <div>
                    <lable>Nombre :</lable>
                    <input type='text' onChange={(e) => handleChange(e)} value={input.name} name='name'/>
                    
                </div>
                <div>
                    <label>Descripción :</label>
                    <input type='text' onChange={(e) => handleChange(e)} value={input.description} name='description'/>
                    
                </div>
                <div>
                    <label>Fecha de lanzamiento :</label>
                    <input type='date' onChange={(e) => handleChange(e)} value={input.released} name='released'/>
                </div>
                <div>
                    <label>Rating :</label>
                    <input type='number' onChange={(e) => handleChange(e)} value={input.rating}  min="0" max="10" name='rating'/>
                </div>
                <div>
                    <label>Imagen :</label>
                    <input type='text' placeholder='Url de imagen' onChange={(e) => handleChange(e)} value={input.background_image} name='background_image'/>
                </div>
                <div>
                    <label>Plataformas :</label>
                    { allplatforms.map((e) => (
                    <label>
                    <input type='checkbox' onClick={(e) => handleCheckPlataforms(e)} value={e} name='plataforms' key={e}/>
                    {e}</label>))}
                    
                </div>
                <div>
                    <label>Generos :</label>
                    { genres.map((e) => (
                    <label>
                    <input type='checkbox' onClick={(e) => handleCheckGenres(e)} value={e.name} name='genres' key={e}/>
                    {e.name}</label>))}
                </div>
                <button type='submit'>Crear Juego</button>

            </form>
        </div>


    )
}