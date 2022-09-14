const axios = require('axios');
const { Op } = require('sequelize');
const { Pokemon, Type } = require('../db');
const { getTypes } = require('../controlles/Type')


let idCountPost = 905; // del id 905 salta al id 10001 y sigue hasta el id 10249
const getPokemon = async (req, res) => {
    const { name } = req.query;
    try{
        if(name){
            if(isNaN(name) !== true) return res.status(400).send('Name should be a word');
            let findPokemonInApi = await Pokemon.findAll({ 
                where: { 
                    name: name 
                },
                include: {
                    model: Type,
                    attributes: ['name']
                }
            });
            if(findPokemonInApi.length > 0) { return res.json(findPokemonInApi) }
            else {
                let urlApi = await axios.get('https://pokeapi.co/api/v2/pokemon/'+ name);

                let pokemonModel = {
                    id: urlApi.data.id,
                    name: urlApi.data.name,
                    hp: urlApi.data.stats[0].base_stat,
                    attack: urlApi.data.stats[1].base_stat,
                    defense: urlApi.data.stats[2].base_stat,
                    speed: urlApi.data.stats[5].base_stat,
                    height: urlApi.data.height,
                    weight: urlApi.data.weight,
                    image: urlApi.data.sprites.other.dream_world.front_default
                }

                let typesPokemonsApi = urlApi.data.types.map(tp => {
                    let temp = {};
                    return temp = {name: tp.type.name};
                });
                pokemonModel.types = typesPokemonsApi;


                return res.json([pokemonModel]);
            }
        }
        else{
            let serchingPokemonsDb = await Pokemon.findAll({
                include: {
                    model: Type,
                    attributes: ['name']
                }
            });

            let urlType = [];
            let urlApi = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=40');
            urlApi.data.results.map( pok => { urlType.push(pok.url) });

            let resultsOfPokemons = await Promise.all(urlType.map( async url => {

                let infoPokemon = await axios.get(url);
                let pokemonModel = {
                    id: infoPokemon.data.id,
                    name: infoPokemon.data.name,
                    hp: infoPokemon.data.stats[0].base_stat,
                    attack: infoPokemon.data.stats[1].base_stat,
                    defense: infoPokemon.data.stats[2].base_stat,
                    speed: infoPokemon.data.stats[5].base_stat,
                    height: infoPokemon.data.height,
                    weight: infoPokemon.data.weight,
                    image: infoPokemon.data.sprites.other.dream_world.front_default
                }
                
                let typesPokemonsApi = infoPokemon.data.types.map(tp => {
                    let temp = {};
                    return temp = {name: tp.type.name};
                });
                pokemonModel.types = typesPokemonsApi;
    
                return pokemonModel;
            }))

            resultsOfPokemons = resultsOfPokemons.concat(serchingPokemonsDb); 
            return res.json(resultsOfPokemons);
        }
    } catch(e) {
        res.status(400).send('Something is doing wrong')
    }
}


const getPokemonParams = async (req, res) => {
    let { idPokemon } = req.params;
    try {
        if(isNaN(idPokemon) === true) return res.status(400).send('ID should be a number');
        let findPokemonInApi = await Pokemon.findAll({ 
            where: { 
                id: idPokemon 
            },
            include: {
                model: Type,
                attributes: ['name']
            } 
        });
        if(findPokemonInApi.length > 0) { return res.json(findPokemonInApi) }
        else {
            let urlApi = await axios.get('https://pokeapi.co/api/v2/pokemon/'+ idPokemon);

            let pokemonModel = {
                id: urlApi.data.id,
                name: urlApi.data.name,
                hp: urlApi.data.stats[0].base_stat,
                attack: urlApi.data.stats[1].base_stat,
                defense: urlApi.data.stats[2].base_stat,
                speed: urlApi.data.stats[5].base_stat,
                height: urlApi.data.height,
                weight: urlApi.data.weight,
                image: urlApi.data.sprites.other.dream_world.front_default
            }

            let typesPokemonsApi = urlApi.data.types.map(tp => {
                let temp = {};
                return temp = {name: tp.type.name};
            });
            pokemonModel.types = typesPokemonsApi;

            return res.json([pokemonModel]);
        }
    } catch(e) {
        res.status(400).send('ID not exist')
    }
}


const postPokemon = async (req, res) => {
    let { name, types } = req.body;
    try{
        if(!name || isNaN(name) !== true || !types) { return res.status(400).send("Variables are wrong") }
        else{
            let id = idCountPost += 1;
            req.body.id = id;
            req.body.name = name.toLowerCase();
            let newPokemon = await Pokemon.create(req.body);
            let pokemonTypes = await Type.findAll({ 
                where: {name: types}
            })
            newPokemon.addType(pokemonTypes);
            res.send(`Pokemon ${name} was created`);
        }
    } catch(e) {
        res.status(400).send("Pokemon wasn't created");
    }
}


module.exports = {
    getPokemon,
    getPokemonParams,
    postPokemon
};