import React from "react";
import { Link } from "react-router-dom";

function CharacterCard({ character }) {
    return (
        <Link key={character.url} to={`/characters/${character.url.split("/").slice(-2, -1)[0]}`}>
            <div className="people-card">
                <h3>{character.name}</h3>
                <p>
                    <strong>Birth:</strong> {character.birth_year}
                </p>
                <p>
                    <strong>Gender:</strong> {character.gender}
                </p>
            </div>
        </Link>
    );
}

export default CharacterCard;
