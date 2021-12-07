import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import { createVideoGame, getGenres } from '../Actions'
import '../Css/GameCreation.css'



//Ahora se guarda la info en base de datos, pero al hacerlos el servidor se crashea y no entiendo por que. Hay que resolverlo!!!!

export default function GameCreation(){
    const dispatch = useDispatch()
    //const genres = useSelector((state) => state.genres)
    

    let allplatforms = [ 'PC','PlayStation','Xbox','Nintendo Switch', 'iOS', 'Android','Nintendo', 
    'PS Vita', 'PSP','Wii', 'GameCube', 'Game Boy', 'SNES', 'NES', 'Commodore', 'Atari', 'Genesis',
    ' SEGA', 'Dreamcast','3DO','Jaguar', 'Game Gear', 'Neo Geo'];

    /* let allgenres = [ 'Action','Adventur','Arcade','Indie', 'Puzzle', 'Card','RPG', 
    'Shooter', 'Tereor','Romance', 'Fantasy', 'Auxilio', 'Noseya', 'Que', 'Ponerde', 'Juegos', 'Asies']; */

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

   
   /*  function handleSubmit(e){
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

    } */

    function handleSubmit(e){
        e.preventDefault();
        if(!input.name || input.name.length < 2){
            return alert('Coloca un nombre: debe poseer min 2 carácteres')
        }else if (!input.description){
            return alert('Descripción requerida')
        } else if(!input.released){
            return alert('Fecha de lanzamiento requerida')
        } else if(!input.rating){
            return alert('Coloca un Puntaje del 1 al 10')
        } else if(!input.genres){
            return alert('Coloca uno o más generos')

        }else if(input.plataforms.lenght < 1){
            return alert('Coloca una o más plataformas')
        }
        else {
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
        <div className="Fondo-Form">
            
            <div className="Contenedor-Boton-Volver-Crea">
            <Link to='/home'><button className="Boton-Crea">◀ Volver</button></Link>
            </div>
       
            <h1 className="Titulo-Pag-Crea">Crea tu Juego</h1> 
          
               
            <form className="Contenedor-Form" onSubmit={(e) => handleSubmit(e)}>
                <div className="Sub-Contenedores-Form">
                    <lable className="Nombre-Form">Nombre :</lable>
                    <input className="InputNombre-Form" type='text' placeholder=' Titulo de tu Juego...' onChange={(e) => handleChange(e)} value={input.name} name='name'/>
                    
                </div>
                <div className="Sub-Contenedores-Form">
                    <label className="Descripción-Form">Descripción :</label>
                    <input className="InputDescripción-Form" type='text' placeholder=' Detalle de tu Juego...' onChange={(e) => handleChange(e)} value={input.description} name='description'/>
                    
                </div>
                <div className="Sub-Contenedores-Form">
                    <label className="Fecha-Form">Fecha de lanzamiento :</label>
                    <input className="InputFecha-Form" type='date' onChange={(e) => handleChange(e)} value={input.released} name='released'/>
                </div>
                <div className="Sub-Contenedores-Form">
                    <label className="Rating-Form">Rating :</label>
                    <input className="InputRating-Form" type='number' placeholder=' Colocale un puntaje...' onChange={(e) => handleChange(e)} value={input.rating}  min="1" max="10" name='rating'/>
                </div>
                <div className="Sub-Contenedores-Form">
                    <label className="Imagen-Form">Imagen :</label>
                    <input className="InputImagen-Form" type='text' placeholder=' Url de imagen...' onChange={(e) => handleChange(e)} value={input.background_image} name='background_image'/>
                </div>
                <div className="Sub-Contenedores-Form">
                    <label className="Plataformas-Form" >Plataformas :</label>
                    { allplatforms.map((e) => (
                    <label className="InputPlataformas-Form">
                    <input className="Box-Check" type='checkbox' onClick={(e) => handleCheckPlataforms(e)} value={e} name='plataforms' key={e}/>
                    {e}</label>))}
                    
                </div>
                <div className="Sub-Contenedores-Form">
                    <label className="Generos-Form">Generos :</label>
                    { genres.map((e) => ( //volver a colocar genres
                    <label className="InputGeneros-Form">
                    <input className="Box-Check" type='checkbox' onClick={(e) => handleCheckGenres(e)} value={e.name} name='genres' key={e} />
                    {e.name}</label>))} {/* // colocar en value y dentro de las laber e.name */}
                </div>
                <div className="Contenedor-Boton-Submit"> 
                <button className="Boton-Crea" type='submit'>Crear Juego 🎮</button>
                </div>
                
            </form>
                
        </div>


    )
}