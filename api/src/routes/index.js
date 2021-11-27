const { Router } = require('express');
const { Videogame, Gender } = require('../db')
const { v4: uuid } = require("uuid")
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const axios = require ('axios');
require('dotenv').config();
const { API_KEY } = process.env;

//const Videogame = require('../models/Videogame');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

//Get info de la API

/* const getinfoApi = async () => {
    const apiUrl = page => axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=${page}`)
    const pages = [apiUrl(1), apiUrl(2), apiUrl(3), apiUrl(4), apiUrl(5), apiUrl(6)]
    const games = []
    await Promise.all(pages)
        .then(responses => {
            responses.forEach(response => games.push(
                response.data.results.map(g => {
                    
                    return {
                        id: g.id,
                        name: g.name,
                        background_image: g.background_image,
                        rating: g.rating,
                        genres: g.genres.map(gender => gender.name),
                        platforms: g.platforms.map(platform => platform.platform.name)
                    }
                })
            ))
        })
        .catch(error => {
            return error
        })
    return games

} */

 
const getGameApi = async () => {
    try{
    const games = []
    let url = `https://api.rawg.io/api/games?key=${API_KEY}`;
    //creo un array para poder pushear lo que me traiga de la api. Guardo la url en una variable
                                   //RECORDAR COLOCAR i<=5 PARA QUE TRAIGA LOS 100, Y COLOCAR EN FORCE DEL INDEX EN TRUE
     
    for( let i = 1; i<= 1; i++){ //como no se puede hacer un paginado recorro la cantidad de paginas q necesite traer. 
        let pages = await axios.get(url) // hago llamado a la api para traer la info
        
        
        pages.data.results.map( g => { // voy a la info de la api para ingresar a la data especifica y mapeo los objetos dentro del array results
            games.push({ // pusheo al array vacio que cree, para tener la info local
                id: g.id,
                name: g.name,
                img: g.background_image,
                rating: g.rating,
                genres: g.genres.map(gender => gender.name),
                platforms: g.platforms.map(platform => platform.platform.name)

            })
        })
        url = pages.data.next; //le vuelvo a dar valor a la url ingresando a la siguiente pagina, ya que next es la propiedad q ellos nos brindan en la api para navegar
         
    }
    
    return games // retorno mi array
  
   } catch(error){ return error }


};

//Get info DB

const getGameDataBase = async function (){
    try{
    return await Videogame.findAll({
        include:{
            model: Gender,
            attributes: ['name'],
            through: {
                attributes:[]
            },
        }
    })

  } catch(error){return error}
};

//Mix Api y DB

const getinfoAll = async function (){
    try {

    let apiData = await getGameApi();
    let dbData = await getGameDataBase();
    const totalData = apiData.concat(dbData);
    return totalData;

   } catch(error){return error}
};

//Rutas GET /videogames

router.get('/videogames', async function(req,res){
    const name = req.query.name
    try{

    let allGames = await getinfoAll();

    if(name){
        let videogameName = await allGames.filter( g => g.name.toLowerCase().includes(name.toLowerCase()))
        // toLowerCase se encarga de pasar todo a minuscula para que no haya un conflicto entre lo q traemos de api y lo q escribe el usuairo
      // por que si queremos hacer una busqueda en Mayu no tiraria error ya que por detras todo se pasa a minuscula. El includes hace una busqueda global, 
      //o sea que no importa si el nombre esta al principio o es una parte te trae todo lo relacionado a ese texto que se escribio
      if(videogameName.length){
          res.status(200).json(videogameName)
      } else { 

        res.status(404).send('No se encuentra ese video juego') }

    } else { res.status(200).json(allGames)}

   } catch(error){return error}

});

//GET VIDEOGAMES BY ID
//Obtener el detalle de un videojuego en particular
//Debe traer solo los datos pedidos en la ruta de detalle de videojuego
//Incluir los géneros asociados

router.get('/videogame/:id', async function(req,res){


    try{    

    const { id } = req.params;

        if(id.length > 7 && typeof id === "string") {
        
        
        let gameCreated = await getGameDataBase()
        let gameID = await gameCreated.filter(gi => gi.id === id)

       /*  if (gameID !== undefined){
            return res.status(200).json({data:gameID, message:'Juego encontrado'})
        } else {return res.status(404).send('Juego no encontrado por id')} */  //puedo colocarlo si quiero que me muestre mensaje

        return res.status(200).json(gameID)
       } 
       
       else {

            const gameById = await axios.get(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`)
            const oneGame = {
                id: gameById.data.id,
                name: gameById.data.name,
                img: gameById.data.background_image,
                rating: gameById.data.rating,
                description: gameById.data.description,
                genres: gameById.data.genres.map(gender => gender.name),
                platforms: gameById.data.parent_platforms.map(p => p.platform.name)
            }
           
        return res.status(200).json(oneGame)
    } 
    
   } catch(error){ return error }
       
});


// GET GENRES
//Obtener todos los tipos de géneros de videojuegos posibles
//En una primera instancia deberán traerlos desde rawg y guardarlos en su propia base de datos y luego ya utilizarlos desde allí
router.get('/genres', async function(req, res){

    try{

    const genresApi = await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`)
    
    const genres = genresApi.data.results.map(g => g.name)
    
    genres.forEach(el => { Gender.findOrCreate({ where : { name: el}})
        
    });  

    const allGenres = await Gender.findAll();
    
    res.send(allGenres);

 } catch(error){return error}

});

// POST /videogame:
//Recibe los datos recolectados desde el formulario controlado de la ruta de creación de videojuego por body
//Crea un videojuego en la base de datos


router.post('/videogame', async function (req, res){

    try{

    let { name, img, description, released , rating , genres , plataforms, createdVideoGame } = req.body
    
    if(!name || !description || !plataforms){ // le pregunto si estan esos datos, sino debe completarlos
        return res.status(404).send('Falta datos para la creacion del juego')
    }

    let newGame = await Videogame.create({ // creo mi video juegos en la base de datos
               
                name,
                img,
                description,
                released,
                rating,
                plataforms,
                createdVideoGame,
                
    })
    
    genres.forEach( async g => {// recorro por los generos que me pasen y los busco en mi base de datos
        
        let genderDB = await Gender.findAll({where: {name: g.name}})
        newGame.addGender(genderDB) // le agrego a mi juego creado el genero seleccionado de la base
    })
     res.status(200).send('Juego creado con exito');
        
    } catch(error){ return error }
            
});





module.exports = router;
