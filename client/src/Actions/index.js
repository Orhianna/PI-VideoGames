import axios from 'axios';

export function getVideoGames(){ // aca sucede la conexion entre front y back
    return async function(dispatch){
        var json = await axios.get(`http://localhost:3001/videogames`);
        console.log("QUE INFO TRAE DE JSON:", json)

        return dispatch({
            type: 'GET_VIDEOGAMES',
            payload: json.data // aca te devuelve la respuesta con un data, a diferencia de promesas
        })
    }
};

export function getGenres(){
    return async function(dispatch){
        const allGenres = await axios.get(`http://localhost:3001/genres`)
        return dispatch({
            type: 'GET_GENRES',
            payload: allGenres.data
        })
    }
};



export function getVideoGameByName(name){ // aca sucede la conexion entre front y back
    return async function(dispatch){
        try{
        var game = await axios.get(`http://localhost:3001/videogames?name=` + name);
        console.log("QUE INFO TRAE DE NAME:", name)

        return dispatch({
            type: 'GET_VIDEOGAME_BY_NAME',
            payload: game.data // 
        })
    } catch(error){ return error}
}
};

export function createVideoGame (payload){
    return async function(dispatch){
        const info = await axios.post(`http://localhost:3001/videogame`, payload)
        console.log("QUE INFO TRAE DE POST:", info)
        return dispatch({
            type: 'CREATE_VIDEOGAME',
            info
    })}
};


export function filterVideoGamesByGenres(payload){
    return({
        type: 'FILTER_BY_GENRES',
        payload
    })
};

export function filterVideoGamesDB(payload){  
    return({
        type: 'FILTER_VIDEOGAME_DB',
        payload
    })
};

export function orderByName (payload){
    return({
        type: 'ORDER_BY_NAME',
        payload
    })
};

export function orderByRating (payload){
    return({
        type: 'ORDER_BY_RATING',
        payload
    })
};

export function getGameDetail(id){
    return async function(dispatch){
        try{
            let json = await axios.get(`http://localhost:3001/videogame/${id}`);
            console.log("QUE INFO TRAE DE DETAIL :", json.data)
            return dispatch({
                type: 'GET_GAME-DETAIL',
                payload: json.data
            })
        } catch (error){
            return error
        }
    }    
};

export function resetDetailPage(){ //reset para la pagina de detail
    return({
        type: 'RESET_DETAIL_PAGE',
    })
};

