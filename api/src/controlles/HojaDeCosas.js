// en get todo los pokemons una de las opciones que pense fue esta, es interesante ver la diferencia entre
// las dos opciones y porque esta devuelve un array de objetos vacios y la otra no. Se debe al Promise.all, 
// ya que este espera que todos los estados de los objetos devueltos esten en fullfile para devovler el
// arreglo; en cambio en esta opcion, el map devuelve el arreglo con los objetos en estado pending quedando
// asi un arreglo de objetos vacio y terminando su ejecucion posteriormente al objeto devuelto.

// --->

    // urlType.map(async url => {
    //     let infoPokemon = await axios.get(url);
    //     let pokemonModel = {
    //         id: infoPokemon.data.id,
    //         name: infoPokemon.data.name,
    //         hp: infoPokemon.data.stats[0].base_stat,
    //         attack: infoPokemon.data.stats[1].base_stat,
    //         defense: infoPokemon.data.stats[2].base_stat,
    //         speed: infoPokemon.data.stats[5].base_stat,
    //         height: infoPokemon.data.height,
    //         weight: infoPokemon.data.weight,
    //         type: infoPokemon.data.types[0].type.name,
    //         image: 'url'
    //     }
    //     Pokemon.create(pokemonModel);
    //     return pokemonModel; //esta demás
    // })

    // setTimeout( async () => {
    //     let serchingPokemons = await Pokemon.findAll({ order: [['id']] })
    //     return res.json(serchingPokemons);
    // } ,5000)

// <---