import React, { useState, useEffect } from "react";
import { getCharacter } from "../api/swapi";
import { useParams } from "react-router-dom";
import { _request } from "../api/swapi";

function CharacterDetail() {
    const [character, setCharacter] = useState(null);
    const [homeworld, setHomeworld] = useState(null);
    const [films, setFilms] = useState([]);
    const [species, setSpecies] = useState([]);
    const [vehicles, setVehicles] = useState([]);
    const [starships, setStarships] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        const fetchCharacter = async () => {
            try {
                const data = await getCharacter(id);
                if (!data.detail) {
                    setCharacter(data);

                    const filmData = await Promise.all(data.films.map((filmUrl) => _request(filmUrl)));
                    setFilms(filmData);

                    const speciesData = await Promise.all(data.species.map((speciesUrl) => _request(speciesUrl)));
                    setSpecies(speciesData);

                    const vehicleData = await Promise.all(data.vehicles.map((vehicleUrl) => _request(vehicleUrl)));
                    setVehicles(vehicleData);

                    const starshipData = await Promise.all(data.starships.map((starshipUrl) => _request(starshipUrl)));
                    setStarships(starshipData);

                    // Fetching homeworld
                    const hwData = await _request(data.homeworld);
                    setHomeworld(hwData);
                }
            } catch (error) {
                console.error("Error fetching character:", error);
            }
        };

        fetchCharacter();
    }, [id]);

    if (!character) {
        return <div className="text-white">Loading...</div>;
    }

    return (
        <div className="mx-auto text-white">
            <h2 className="text-3xl font-bold mb-4 text-yellow-300">{character.name}</h2>
            <div className="w-full h-auto flex flex-wrap">
                <p className="text-lg mr-8">
                    <strong>Birth Year:</strong> {character.birth_year}
                </p>
                <p className="text-lg mr-8">
                    <strong>Eye Color:</strong> {character.eye_color}
                </p>
                <p className="text-lg mr-8">
                    <strong>Gender:</strong> {character.gender}
                </p>
                <p className="text-lg mr-8">
                    <strong>Hair Color:</strong> {character.hair_color}
                </p>
                <p className="text-lg mr-8">
                    <strong>Height:</strong> {character.height} cm
                </p>
            </div>
            <div className="w-full h-auto flex flex-wrap">
                <p className="text-lg mr-8">
                    <strong>Mass:</strong> {character.mass} kg
                </p>
                <p className="text-lg mr-8">
                    <strong>Skin Color:</strong> {character.skin_color}
                </p>
                <p className="text-lg mr-8">
                    <strong>Homeworld:</strong> {homeworld ? homeworld.name : "Unknown"}
                </p>
            </div>
            <div className="w-full h-auto flex flex-wrap">
                <strong className="">Films: &nbsp;</strong>
                {films.map((film, index) => (
                    <p className="" key={index}>
                        {film.title}, &nbsp;
                    </p>
                ))}
            </div>
            <div className="w-full h-auto flex flex-wrap">
                <strong className="">Species: &nbsp;</strong>
                {species.map((specie, index) => (
                    <p className="" key={index}>
                        {specie.name}, &nbsp;
                    </p>
                ))}
            </div>
            <div className="w-full h-auto flex">
                <strong className="">Vehicles: &nbsp;</strong>
                {vehicles.map((vehicle, index) => (
                    <p className="" key={index}>
                        {vehicle.name}, &nbsp;
                    </p>
                ))}
            </div>
            <div className="w-full h-auto flex">
                <strong className="">Starships: &nbsp;</strong>
                {starships.map((starship, index) => (
                    <p className="" key={index}>
                        {starship.name}, &nbsp;
                    </p>
                ))}
            </div>
        </div>
    );
}

export default CharacterDetail;
