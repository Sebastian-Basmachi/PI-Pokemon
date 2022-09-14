import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getPokemons } from "../../Actions/GetPokemons";
import { getTypes } from "../../Actions/GetTypes.js";
import { filterByType } from '../../Actions/GetTypes.js';
import { filterCreated } from '../../Actions/GetPokemons.js';
import { orderByName } from '../../Actions/GetPokemons.js';
import { orderByAttack } from '../../Actions/GetPokemons';
import Paginado from "../Paginado/Paginado.jsx";
import PokemonsCard from "../PokemonCard/PokemonsCard";
import { Link } from "react-router-dom";
import Loading from "../Loading/Loading";
import HomeCss from './Home.css'

export default function Home(){

    const dispatch = useDispatch();
    const allPokemons = useSelector(state => state.pokemons);
    let allTypes = useSelector(state => state.types);

    const [currentPage, setCurrentPage] = useState(1);
    // const [pokemonsPerPage, setPokemonsPerPage] = useState(12);
    const pokemonsPerPage = 12; // ES LO MISMO
    const indexOfLastPokemon = currentPage * pokemonsPerPage;
    const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage;
    const currentPokemons = allPokemons.slice(indexOfFirstPokemon, indexOfLastPokemon);
    const paginado = (pageNumber) => { setCurrentPage(pageNumber) };
    const [orderName, setOrderName] = useState();
    const [orderAttack, setOrderAttack] = useState();
    

    useEffect( ()=>{
        dispatch(getPokemons());
        dispatch(getTypes());
    }, [dispatch] );

    function handleClick(e){
        e.preventDefault();
        dispatch(getPokemons());
    }

    function handleFilterByType(e){
        e.preventDefault();
        dispatch(filterByType(e.target.value));
    }

    function handleFilterCreated(e){
        e.preventDefault();
        dispatch(filterCreated(e.target.value));
    }
    
    function handleOrderByName(e){
        e.preventDefault();
        dispatch(orderByName(e.target.value));
        setCurrentPage(1);
        setOrderName(e.target.value);
    }

    function handleOderByAttack(e){
        e.preventDefault();
        dispatch(orderByAttack(e.target.value));
        setCurrentPage(1);
        setOrderAttack(e.target.value);
    }

    return (
        <div className="Page">
            <div className="Filter-box">
                <button onClick={ e => {handleClick(e)} } className="button-ui">Refresh</button>

                {/* alfabetico */}
                <div className="Filters">
                    <p className="input-select">Aphabet order</p>
                    <select onChange={ (e) => {handleOrderByName(e)} } className="input"> 
                        <option value='asc'>ascendent</option>
                        <option value='des'>descendent</option>
                    </select>
                </div>
                
                {/* attack */}
                <div className="Filters">
                    <p className="input-select">Attack order</p>
                    <select onChange={ (e) => {handleOderByAttack(e)} } className="input">
                        <option value='asc'>ascendent</option>
                        <option value='des'>descendent</option>
                    </select>
                </div>
                
                <div className="Filters">
                    <p className="input-select">Types</p>
                    <select onChange={ e => {handleFilterByType(e)} } className="input">
                        <option value='all'>all</option>
                        {
                            allTypes?.map( tp => {
                                return <option value={tp.name}>{tp.name}</option>
                            })
                        }
                    </select>
                </div>
                
                <div className="Filters">
                    <p className="input-select">Creator</p>
                    <select onChange={ e => {handleFilterCreated(e)} } className="input">
                        <option value='all'>all</option>
                        <option value='existing? or api'>existing</option>
                        <option value='created'>created</option>
                    </select>
                </div>
            </div>
            { currentPokemons.length > 0?

                <div id="Container">
                    <div id="Paginado-L">
                        <Paginado allPokemons={allPokemons.length} pokemonsPerPage={pokemonsPerPage} paginado={paginado}/>
                    </div>
                    <div className="Cards-container">
                    {
                        currentPokemons && currentPokemons.map(pk => {
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

                : <div id="Loading"><Loading/></div>
            }
        </div>
    )
}
