import React from "react";
import { Link } from "react-router-dom";
import islands from '../../Images/Hoenn2.jpg';
import LandingPageCSS from './LandingPage.css'


export default function LandingPage(){
    return (
        <div>
            <img src={islands} alt='Pokemon islands' className="Principal-image"/>
            <div className="Inicial-box">
                <div className="Text-button">
                    <h1> Wellcome to PokeLand! </h1>
                    <Link to='/pokemons'>
                        <button class="learn-more">
                            <span class="circle" aria-hidden="true">
                                <span class="icon arrow"/>
                            </span>
                            <span class="button-text">Home</span>
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    )
}