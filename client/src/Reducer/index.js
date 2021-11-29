
const initialState = {
    videogames : [],
    allvideogames: []
}



function rootReducer(state = initialState, action){
    switch(action.type){
        case 'GET_VIDEOGAMES':
            return{
                ...state,
                videogames: action.payload, // aca le digo que en mi estado videogames que es un arreglo vacio, que mande todo lo que
                allvideogames: action.payload                        // la accion 'GET_VIDEOGAMES' me traiga.
            }

       /*  case 'FILTER_BY_GENRES':
            const allGames = state.
            return{

            } */

        case 'FILTER_VIDEOGAME_DB':
            const filterCreatedGames = action.payload === 'db' ? state.allvideogames.filter(g => g.createdVideoGame) : state.allvideogames.filter(g => !g.createdVideoGame)
            return{
                ...state,
                videogames: action.payload === 'All' ? state.allvideogames : filterCreatedGames

            }
        default: return state;
    }

}

export default rootReducer;