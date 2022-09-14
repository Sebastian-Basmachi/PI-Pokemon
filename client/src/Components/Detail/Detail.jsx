import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getPokemonDetail } from '../../Actions/GetPokemons';
import Loading from "../Loading/Loading";
import DetailCSS from "./Detail.css"

export default function Detail(){

    const dispatch = useDispatch();
    const { idPokemon } = useParams();
    const info = useSelector(state => state.detail);

    useEffect(() => {
        dispatch(getPokemonDetail(idPokemon))
    }, [dispatch, idPokemon])


    return (
        <div className="Page-detail">
            { info[0] && info[0].id.toString() === idPokemon? 
            
                <div className="Container-detail">
                    <div id="Container-info">
                        <div className="Info-pokemon">
                            <h4>Health:</h4>
                            <progress value={info[0].hp} max="1000" className="ProgressBar"/>
                            <h5 className="Info-value">{info[0].hp}</h5>
                        </div>
                        <div className="Info-pokemon">
                            <h4>Attack:</h4>
                            <progress value={info[0].attack} max="1000" className="ProgressBar"/>
                            <h5 className="Info-value">{info[0].attack}</h5>
                        </div>
                        <div className="Info-pokemon">
                            <h4>Defense:</h4>
                            <progress value={info[0].defense} max="1000" className="ProgressBar"/>
                            <h5 className="Info-value">{info[0].defense}</h5>
                        </div>
                        <div className="Info-pokemon">
                            <h4>Speed:</h4>
                            <progress value={info[0].speed} max="1000" className="ProgressBar"/>
                            <h5 className="Info-value">{info[0].speed}</h5>
                        </div>
                        <div className="Info-pokemon">
                            <h4>Height:</h4>
                            <progress value={info[0].height} max="1000" className="ProgressBar"/>
                            <h5 className="Info-value">{info[0].height}</h5>
                        </div>
                        <div className="Info-pokemon">
                            <h4>Weight:</h4>
                            <progress value={info[0].weight} max="1000" className="ProgressBar"/>
                            <h5 className="Info-value">{info[0].weight}</h5>
                        </div>
                        <div className="Info-pokemon">
                            <h4>ID:</h4>
                            <h5 id="ID-value">{info[0].id}</h5>
                        </div>
                        <div>
                            <h4>Like:</h4>
                            <h5 id="Info-ike">{info[0].like}</h5>
                        </div>
                    </div>
                    <div id="Container-image">
                        <img src={info[0].image} alt={`${info[0].name}`} width="300px" height="300px"/>
                        <div id="Name-pokemon">
                            <h1>{info[0].name}</h1>
                        </div>
                    </div>
                    <div id="Info-types">
                        <h2 id="Header-types">Types:</h2>
                        <div id="Map-types">
                            {
                                info[0].types.map( tp => {
                                    return <h3 value={tp.name}>{tp.name}</h3>
                                })
                            }
                        </div>
                    </div>
                </div>

                : <div id="Loading-detail"><Loading/></div>
            }
        </div>
    )
}