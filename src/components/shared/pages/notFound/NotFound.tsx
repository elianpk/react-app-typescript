import React from "react";
import {Link } from 'react-router-dom'
import './NotFound.css'

export default function NotFoundPage() {
    return(
        <div className="NotFoundPage">
            {/* <!--dust particel--> */}
            <div>
            <div className="starsec"></div>
            <div className="starthird"></div>
            <div className="starfourth"></div>
            <div className="starfifth"></div>
            </div>
            {/* <!--Dust particle end---> */}

            <h1>404</h1>
            <p>Oops! Página não encontrada.</p>
            <Link className="button" to="/"> Volte a página inicial.</Link>
        </div>
    )
}
