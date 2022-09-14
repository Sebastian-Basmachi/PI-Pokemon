const { Router } = require('express');
// const express = require('express')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const { getPokemon, postPokemon,  getPokemonParams } = require('../controlles/Pokemon')
const { getTypes } = require('../controlles/Type')

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
// router.use(express.json())
router.get('/pokemons', getPokemon);
router.get('/pokemons/:idPokemon', getPokemonParams);
router.post('/pokemons', postPokemon);
router.get('/types', getTypes);


module.exports = router;
