import React, { useState } from 'react';
import { useDispatch } from "react-redux"
import { getPokemonByName } from "../../Actions/GetPokemons";
import { Link, NavLink, useHistory } from 'react-router-dom';
import AshPikachu from '../../Images/AshPikachu.png';
import NavBarCSS from './NavBar.css'

export default function NavBar() {

    const dispatch = useDispatch();
    const [name, setName] = useState("");
    const history = useHistory();
    // Window.searchName = '';

    function handleChange(e){
        e.preventDefault();
        setName(e.target.value); 
    }

    function handleClick(e){
        e.preventDefault();
        dispatch(getPokemonByName(name));
        Window.searchName = name;
        setName('');
        history.push('/pokemon_search');
    }


    return (
        <div>
            <div className='NavBar-top'>
                <div className='Image'>
                    <Link to='/pokemons'>
                        <img src={AshPikachu} alt='Ash and Pikachu' width='100px'/>
                    </Link>
                </div>
                <div className='Name-page'>
                    <Link to='/pokemons' id="Pokeland">
                        <h1>PokeLand</h1>
                    </Link>
                </div>
                <div className='Search-input'>
                    <input 
                        type='text'
                        placeholder='Search pokemon...'
                        value={name}
                        onChange={e => { handleChange(e) }}
                        className="input"
                    />
                    <button onClick={e => { handleClick(e) }} className='button-ui' id="button-navBar">Search</button>
                </div>
            </div>

            {/* barra inferior */}
            <div className='NavBar-bottom'>
                <NavLink to='/pokemons' className="Link"> 
                    <button className='button-NavBar-Page'><h3> Home </h3></button>
                </NavLink>
                <NavLink to='/pokemon_creator' className="Link">
                    <button className='button-NavBar-Page'><h3> Pokemon Creator </h3></button>
                </NavLink>
            </div>
        </div>
    )
}