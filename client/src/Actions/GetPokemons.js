import { GET_POKEMONS, GET_POKEMON_DETAIL, GET_POKEMON_BY_NAME,
    FILTER_BY_CREATED, ORDER_BY_NAME, ORDER_BY_ATTACK } from '../Actions/actionTypes.js';
import axios from 'axios';


export function getPokemons(){
    return async function(dispatch){
        try {
            const pokemons = await axios.get("http://localhost:3001/pokemons");
            
            return dispatch({
                type: GET_POKEMONS,
                payload: pokemons.data
            })
            
        } catch(e) {
            console.log(e);
        }
    }  
}

export function getPokemonByName(name){
    return async function(dispatch){
        try {
            let nameCase = name.toLowerCase();
            const pokemon = await axios.get("http://localhost:3001/pokemons?name=" + nameCase);

            return dispatch({
                type: GET_POKEMON_BY_NAME,
                payload: pokemon.data
            })
            
        } catch(e) {
            console.log(e); 
        }
    }
}

export function getPokemonDetail(idPokemon){
    return async function(dispatch){
        try {
            const pokemonDetail = await axios.get("http://localhost:3001/pokemons/" + idPokemon);

            return dispatch({
                type: GET_POKEMON_DETAIL,
                payload: pokemonDetail.data
            })
            
        } catch(e) {
            console.log(e); 
        }
    }
}

export function filterCreated(payload){
    return {
        type: FILTER_BY_CREATED,
        payload
    }
}

export function orderByName(payload){
    return {
        type: ORDER_BY_NAME,
        payload
    }
}

export function orderByAttack(payload){
    return {
        type: ORDER_BY_ATTACK,
        payload
    }
}

export function postPokemon(payload){
    return async function(){
        try {
            const pokemonCreated = await axios.post("http://localhost:3001/pokemons", payload);
            return pokemonCreated;
        } catch(e) {
            console.log(e);
        }
    }
}