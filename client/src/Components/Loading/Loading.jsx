import React from "react";
import loadPikachu from "../../Images/Pikachu2Gift.gif";
import LoadingCSS from "./Loading.css";

export default function Loading(){

    return (
        <div id="Gif">
            <img src={loadPikachu} alt="Loading logo" width="150px" height="150px"/>
            <div class="spinner">
                <span>L</span>
                <span>O</span>
                <span>A</span>
                <span>D</span>
                <span>I</span>
                <span>N</span>
                <span>G</span>
            </div>
        </div>
    )
}