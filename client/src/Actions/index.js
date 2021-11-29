import axios from 'axios';

export function getVideoGames(){ // aca sucede la conexion entre front y back
    return async function(dispatch){
        var json = await axios.get(`http://localhost:3001/videogames`);

        return dispatch({
            type: 'GET_VIDEOGAMES',
            payload: json.data // aca te devuelve la respuesta con un data, a diferencia de promesas
        })
    }
};

/* export function filterVideoGamesByGenres(payload){
    return{
        type: 'FILTER_BY_GENRES',
        payload
    }
} */

export function filterVideoGamesDB(payload){
    return{
        type: 'FILTER_VIDEOGAME_DB',
        payload
    }
}