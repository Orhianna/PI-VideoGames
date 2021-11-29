import React from "react";

export default function Paginate ({videoGamesPerPage, allGames,paging}){
    const pages = []

    for (let p = 1; p <= Math.ceil(allGames/videoGamesPerPage); p++) {
        pages.push(p)  
    }

    return(
        <nav>
            <ul>
                {pages?.map(num =>(
                    <li key={num}>
                        <a onClick={()=>paging(num)}>{num}</a>
                    </li>
                ))}
            </ul>

        </nav>
    )
}