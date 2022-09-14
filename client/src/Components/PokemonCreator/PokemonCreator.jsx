import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
import { postPokemon } from "../../Actions/GetPokemons";
import { getTypes } from "../../Actions/GetTypes";
import PokemonGym from "../../Images/PokemonGym2.jpg"
import PokemonCreatorCSS from './PokemonCreator.css';


export default function PokemonCreator(){

    const history = useHistory()
    const dispatch = useDispatch();
    const types = useSelector(state => state.types);
    const [pokemonCreated, setPokemonCreated] = useState({
        name: "",
        hp: Number,
        attack: Number,
        defense: Number,
        speed: Number,
        height: Number,
        weight: Number,
        image: "",
        types: [],
        like: ""
    });

    useEffect( () => {
        dispatch(getTypes());
    }, [dispatch])
    
    function handleChange(e){
        e.preventDefault();
        setPokemonCreated({
            ...pokemonCreated,
            [e.target.name]: e.target.value
        })
        // if(e.target.name === 'name'){
        //     Window.nameCongratulation = e.target.value;
        // }
    }

    function handleType(e){
        e.preventDefault();
        let typeExist = pokemonCreated.types?.includes(e.target.value);
        if(typeExist === false){
            setPokemonCreated({
                ...pokemonCreated,
                types: [ ...pokemonCreated.types, e.target.value ]
            })
        }
    }

    function handleSubmit(e){
        e.preventDefault();
        // let pokemonName = document.forms["form"]["name"].value;
        // if(pokemonName === "" || isNaN(pokemonName) !== true) {
        //     alert("Name must be filled out and be a word");
        // }
        if(pokemonCreated.types.length === 0){
            alert("The pokemon must be of at least one type")
        }
        else {
            console.log(pokemonCreated)
            dispatch(postPokemon(pokemonCreated));
            alert('The pokemon was creat!');
            setPokemonCreated({
                name: "",
                hp: Number,
                attack: Number,
                defense: Number,
                speed: Number,
                height: Number,
                weight: Number,
                image: "",
                types: [],
                like: ""
            });
            history.push('/pokemons');
        }
    }
        
    function handleDelete(e){
        e.preventDefault();
        let newTypes = pokemonCreated.types.filter( tp => tp !== e.target.value );
        setPokemonCreated({
            ...pokemonCreated,
            types: newTypes
        });
    }

    return (
        <div className="PageCreator">
            <div>
                <h1 className="Header">Create your pokemon!</h1>
                <form name="form" onSubmit={ e => {handleSubmit(e)} } className="Form">
                    <div className="Name-input">
                        <label className="input-name">Name:  </label>
                        <input
                            type='text'
                            minlength="3"
                            required="required"
                            value={pokemonCreated.name}
                            name='name'
                            onChange={ e => {handleChange(e)} }
                            className="input"
                        />
                    </div>
                    <div className="Health-input">
                        <label className="name-bar">Health</label>
                        <input
                            type='range'
                            min="1" 
                            max="1000"
                            value={pokemonCreated.hp}
                            name='hp'
                            onChange={ e => {handleChange(e)} }
                        />
                        <p className="value-bar">{pokemonCreated.hp}</p>
                    </div>
                    <div className="Attack-input">
                        <label className="name-bar">Attack</label>
                        <input
                            type='range'
                            min="1" 
                            max="1000" 
                            value={pokemonCreated.attack}
                            name='attack'
                            onChange={ e => {handleChange(e)} }
                        />
                        <p className="value-bar">{pokemonCreated.attack}</p>
                    </div>
                    <div className="Defense-input">
                        <label className="name-bar">Defense</label>
                        <input
                            type='range'
                            min="1" 
                            max="1000"
                            value={pokemonCreated.defense}
                            name='defense'
                            onChange={ e => {handleChange(e)} }
                        />
                        <p className="value-bar">{pokemonCreated.defense}</p>
                    </div>
                    <div className="Speed-input">
                        <label className="name-bar">Speed</label>
                        <input
                            type='range'
                            min="1" 
                            max="1000"
                            value={pokemonCreated.speed}
                            name='speed'
                            onChange={ e => {handleChange(e)} }
                        />
                        <p className="value-bar">{pokemonCreated.speed}</p>
                    </div>
                    <div className="Height-input">
                        <label className="name-bar">Height</label>
                        <input
                            type='range'
                            min="1" 
                            max="1000" 
                            value={pokemonCreated.height}
                            name='height'
                            onChange={ e => {handleChange(e)} }
                        />
                        <p className="value-bar">{pokemonCreated.height}</p>
                    </div>
                    <div className="Weight-input">
                        <label className="name-bar">Weight</label>
                        <input
                            type='range'
                            min="1" 
                            max="1000"
                            value={pokemonCreated.weight}
                            name='weight'
                            onChange={ e => {handleChange(e)} }
                        />
                        <p className="value-bar">{pokemonCreated.weight}</p>
                    </div>
                    <div className="Image-input">
                        <label className="input-name">Image:  </label>
                        <input
                            type='text'
                            value={pokemonCreated.image}
                            name='image'
                            onChange={ e => {handleChange(e)} }
                            className="input"

                        />
                    </div>
                    <div>
                        <label className="input-name">Like:  </label>
                        <input
                            type='text'
                            value={pokemonCreated.like}
                            name='like'
                            onChange={ e => {handleChange(e)} }
                            className="input"
                        />
                    </div>
                    <label className="Header-types">Select the types of your pokemon</label>
                    <select onChange={ e => {handleType(e)} } className="Types-select">
                    {
                        types?.map( tp => {
                            return <option key={tp.name} value={tp.name}>{tp.name}</option>
                        })
                    }
                    </select>
                    <ul className="Types-list">
                        {pokemonCreated.types.map(tp => {
                            return (
                                <div key={tp.name} className={tp.name}>
                                    <button value={tp} onClick={ e => {handleDelete(e)} } className="Delete-button">X</button>
                                    <a>{tp}</a>
                                </div>
                            )
                        })}
                    </ul>
                    <div className="Container-creator">
                        <button type='submit' className="cssbuttons-io-button">+ Create pokemon</button>
                    </div>
                </form>
            </div>
        </div>
    )
}