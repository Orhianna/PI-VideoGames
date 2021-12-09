
const initialState = {
    videogames : [],
    allvideogames: [],
    genres:[],
    gamedetail:[]
    
}



function rootReducer(state = initialState, action){
    switch(action.type){
        case 'GET_VIDEOGAMES':
            return{
                ...state,
                videogames: action.payload, // aca le digo que en mi estado videogames que es un arreglo vacio, que mande todo lo que
                allvideogames: action.payload,
                                       // la accion 'GET_VIDEOGAMES' me traiga.
            }

        
        case 'GET_VIDEOGAME_BY_NAME':
            return {
                ...state,
                videogames: action.payload
            }


            case 'FILTER_BY_GENRES':
            let normalize = state.allvideogames
            let filterGenre = normalize.filter(el => el.genres.includes(action.payload))
            //let filterGenre = normalize.includes(el => el.genres === action.payload)
        
            return {
                ...state,
                videogames: action.payload === 'All' ? normalize : filterGenre,
                
            }
              

        case 'GET_GAME-DETAIL':
                        
            return{
                ...state,
                gamedetail: action.payload
                
            }
           
        case 'CREATE_VIDEOGAME':
            return{
                ...state,
            }

        case 'FILTER_VIDEOGAME_DB':
            const totalGames = state.allvideogames
            const filterCreatedGames = action.payload === 'db' ? totalGames.filter(
                (e) => e.createdVideoGame === true) : totalGames.filter((e) => e.createdVideoGame !== true)
            return{
                ...state,
                videogames: action.payload === 'All' ? totalGames : filterCreatedGames

            }

        case 'GET_GENRES':
            return{
                ...state,
                genres: action.payload
            }


        case 'ORDER_BY_NAME':
            const orderGames = action.payload === 'az' ? 
            state.videogames.sort((a,b)=>{
                if(a.name > b.name){
                    return 1;
                }
                if(b.name > a.name){
                    return -1;
                }
                return 0;
            }) :
            state.videogames.sort((a,b)=>{
                if(a.name > b.name){ return -1;}
                if(b.name > a.name){ return 1; }
                return 0;

            })

            return{
                ...state,
                videogames: orderGames
            }
            
                    
            case 'ORDER_BY_RATING':
            const orderGamesRating = action.payload === 'Min-Max' ? 
            state.videogames.sort((a,b)=>{
                    if(a.rating > b.rating){ return 1 }
                    if(b.rating > a.rating){ return -1 }
                    return 0;
                }) :
            state.videogames.sort((a,b)=>{
                    if(a.rating > b.rating){ return -1 }
                    if(b.rating > a.rating){ return 1 }
                    return 0;
    
                })
            
            return{
                    ...state,
                    videogames: orderGamesRating
                }

            case 'RESET_DETAIL_PAGE':
              return{
                  ...state,
                  gamedetail:[]
              }

            

            
        default: return state;
    }

}

export default rootReducer;