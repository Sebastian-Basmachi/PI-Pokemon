import { GET_TYPES, FILTER_BY_TYPE } from '../Actions/actionTypes.js';
import axios from 'axios';

export function getTypes(){
    return async function (dispatch){
        const types = await axios.get("http://localhost:3001/types")

        return dispatch({
            type: GET_TYPES,
            payload: types.data
        })
    }
}

export function filterByType(payload){
    return {
        type: FILTER_BY_TYPE,
        payload
    }
}