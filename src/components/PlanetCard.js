import React from "react";
import { Link } from "react-router-dom";
import "../assets/styles/Cards.css";

function PlanetCard({ planet }) {
    return (
        <Link key={planet.url} to={`/planets/${planet.url.split("/").slice(-2, -1)[0]}`}>
            <div className="planet-card">
                <h3>{planet.name}</h3>
                <p>
                    <strong>Climate:</strong> {planet.climate}
                </p>
                <p>
                    <strong>Population:</strong> {planet.population}
                </p>
                <p>
                    <strong>Gravity:</strong> {planet.gravity}
                </p>
                <p>
                    <strong>Terrain:</strong> {planet.terrain}
                </p>
                <p>
                    <strong>Surface Water:</strong> {planet.surface_water}
                </p>
            </div>
        </Link>
    );
}

export default PlanetCard;
