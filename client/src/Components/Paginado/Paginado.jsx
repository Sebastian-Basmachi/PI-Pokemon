import React from "react";
import PaginadoCSS from "./Paginado.css";

export default function Paginado ({allPokemons, pokemonsPerPage, paginado}){

    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(allPokemons/pokemonsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <nav id="Paginado">
            <ul>
                { pageNumbers && pageNumbers.map(number => (
                    <div key={number} className="Paginado">
                        <a onClick={ () => paginado(number) }>{number}</a>
                    </div>
                ))}
            </ul>
        </nav>
    )
}