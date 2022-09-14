import React, { useState } from "react";
import { useSelector } from "react-redux";
import PokemonsCard from "../PokemonCard/PokemonsCard";
import { Link } from "react-router-dom";
import Paginado from "../Paginado/Paginado.jsx";
import Loading from "../Loading/Loading";
import SearchCSS from "./Search.css";

export default function Search(){

    
    const pokemonSearch = useSelector(state => state.searched);
    const searchName = Window.searchName;
    const [currentPageSearch, setCurrentPageSearch] = useState(1);
    const pokemonsPerPageSearch = 12;
    const indexOfLastPokemonSearch = currentPageSearch * pokemonsPerPageSearch;
    const indexOfFirstPokemonSearch = indexOfLastPokemonSearch - pokemonsPerPageSearch;
    const currentPokemonsSearch = pokemonSearch.slice(indexOfFirstPokemonSearch, indexOfLastPokemonSearch);
    const paginadoSearch = (pageNumber) => { setCurrentPageSearch(pageNumber) };


    return (
        <div className="Page-search">
            {
                currentPokemonsSearch[0] && currentPokemonsSearch[0].name === searchName?

                <div id="Container-search">
                    <div id="Paginado-L-search">
                        <Paginado allPokemons={pokemonSearch.length} pokemonsPerPage={pokemonsPerPageSearch} paginado={paginadoSearch}/>
                    </div>
                    <div className="Cards-container-search">
                    {
                        currentPokemonsSearch && currentPokemonsSearch.map(pk => {
                            return (
                                <div>
                                <Link to={`/pokemon_detail/${pk.id}`} id="Link-home">
                                    <PokemonsCard name={pk.name} image={pk.image} types={pk.types} />
                                </Link>
                                </div>
                            )
                        })
                    }
                    </div>
                </div>

                : <div id="Loading-search"><Loading/></div>
            }
        </div>
    )
}
