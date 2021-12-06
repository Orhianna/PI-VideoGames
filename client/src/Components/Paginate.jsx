import React from "react";
import '../Css/Paginate.css'

export default function Paginate ({videoGamesPerPage, allGames,paging}){
    const pages = []

    for (let p = 1; p <= Math.ceil(allGames/videoGamesPerPage); p++) {
        pages.push(p)  
    }

    return(
        <nav >
            <ul>
                {pages?.map(num =>(
                    <li className="Paginado" key={num}>
                        <button className="BotonPaginado" onClick={()=>paging(num)}>{num}</button>
                    </li>
                ))}
            </ul>

        </nav>
    )
}