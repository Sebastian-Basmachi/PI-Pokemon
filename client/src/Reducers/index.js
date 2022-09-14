import { GET_POKEMONS, GET_POKEMON_DETAIL, GET_TYPES, GET_POKEMON_BY_NAME,
    FILTER_BY_TYPE, FILTER_BY_CREATED, ORDER_BY_NAME, ORDER_BY_ATTACK} from '../Actions/actionTypes.js';

const inicialState = {
    pokemons: [],
    allpokemons: [],
    types: [],
    detail: [],
    searched: []
}

function rootReducer(state = inicialState, action) {
    switch (action.type){

        case GET_POKEMONS:
            return { 
                ...state,
                pokemons: action.payload,
                allpokemons: action.payload
            }

        case GET_TYPES:
            let filterTypes = action.payload.filter(tp => tp.name !== 'shadow' && tp.name !== 'unknown')
            return { ...state, types: filterTypes }

        case GET_POKEMON_BY_NAME:
            return { ...state, searched: action.payload }

        case FILTER_BY_TYPE:
            const pokemons = state.allpokemons;
            if(action.payload === 'all'){
                return { ...state, pokemons: pokemons }
            } else{
                let typeOfPokemons = [];
                pokemons.forEach(pk => {
                    for (let i = 0; i < pk.types.length; i++) {
                        if(pk.types[i].name === action.payload){ typeOfPokemons.push(pk) } 
                    }
                })
                return { ...state, pokemons: typeOfPokemons }
            }

        case FILTER_BY_CREATED:
            const pokemon = state.allpokemons;
            if(action.payload === 'all'){
                return { ...state, pokemons: pokemon}
            }
            if(action.payload === 'created'){
                const pokemonsCreated = pokemon.filter(pk => pk.id >= 906 && pk.id <= 10000);
                return { ...state, pokemons: pokemonsCreated }
            } else{
                const pokemonsExisting = pokemon.filter(pk => pk.id <= 905 || pk.id >= 10001);
                return { ...state, pokemons: pokemonsExisting }
            }

            case ORDER_BY_NAME:
                const orderPokemons = state.pokemons;
                let sortByName = action.payload === 'asc' ?
                    orderPokemons.sort( (a,b) => a.name > b.name? 1 : -1 ) :
                    orderPokemons.sort( (a,b) => a.name > b.name? -1 : 1 );
                return { ...state, pokemons: sortByName }

            case ORDER_BY_ATTACK:
                const orderByAttack = state.pokemons;
                let sortByAttack = action.payload === 'asc' ?
                    orderByAttack.sort( (a,b) => a.attack > b.attack? 1 : -1 ) :
                    orderByAttack.sort( (a,b) => a.attack > b.attack? -1 : 1 );
                return { ...state, pokemons: sortByAttack }                
                
            case GET_POKEMON_DETAIL:
                return { ...state, detail: action.payload }

        default: return state;
    }
}

export default rootReducer;