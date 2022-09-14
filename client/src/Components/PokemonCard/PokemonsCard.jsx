import React from "react";
import PokemonsCardsCSS from './PokemonsCards.css'

export default function PokemonsCard({name, image, types}){

    return(
        <div className="Container-card">
            <h3 id="Name-card">{name}</h3>
            <div id="types-card">
                {
                    types.map(tp => {
                return <h5 key={tp.name}> {tp.name} </h5>})
                }
            </div>
            <img src={image} alt={`${name}`} width="150px" height="150px"/>
        </div>
    )
}
