import React, { useState, useEffect } from "react";
import { getFilm } from "../api/swapi";
import { useParams } from "react-router-dom";
import { _request } from "../api/swapi";

function FilmsDetail() {
    const [film, setFilm] = useState(null);
    const [characters, setCharacters] = useState([]);
    const [planets, setPlanets] = useState([]);
    const [starships, setStarships] = useState([]);
    const [vehicles, setVehicles] = useState([]);
    const [species, setSpecies] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        const fetchFilm = async () => {
            try {
                const data = await getFilm(id);
                if (!data.detail) {
                    setFilm(data);

                    const characterData = await Promise.all(data.characters.map((characterUrl) => _request(characterUrl)));
                    setCharacters(characterData);

                    const planetData = await Promise.all(data.planets.map((planetUrl) => _request(planetUrl)));
                    setPlanets(planetData);

                    const starshipData = await Promise.all(data.starships.map((starshipUrl) => _request(starshipUrl)));
                    setStarships(starshipData);

                    const vehicleData = await Promise.all(data.vehicles.map((vehicleUrl) => _request(vehicleUrl)));
                    setVehicles(vehicleData);

                    const speciesData = await Promise.all(data.species.map((speciesUrl) => _request(speciesUrl)));
                    setSpecies(speciesData);
                }
            } catch (error) {
                console.error("Error fetching film:", error);
            }
        };

        fetchFilm();
    }, [id]);

    if (!film) {
        return <div className="text-white">Loading...</div>;
    }

    return (
        <div className="mx-auto text-white">
            <h2 className="text-3xl font-bold mb-4 text-yellow-300">{film.title}</h2>
            <div className="w-full h-auto flex flex-wrap">
                <p className="text-lg mr-8">
                    <strong>Director:</strong> {film.director}
                </p>
                <p className="text-lg mr-8">
                    <strong>Producer:</strong> {film.producer}
                </p>
                <p className="text-lg mr-8">
                    <strong>Release Date:</strong> {film.release_date}
                </p>
            </div>
            <div className="w-full h-auto flex flex-wrap">
                <strong className="">Characters: &nbsp;</strong>
                {characters.map((character, index) => (
                    <p className="" key={index}>
                        <a href={`/characters/${character.url.split("/").reverse()[1]}`} className="text-yellow-200 hover:underline">
                            {character.name}
                        </a>
                        , &nbsp;
                    </p>
                ))}
            </div>
            <div className="w-full h-auto flex flex-wrap">
                <strong className="">Planets: &nbsp;</strong>
                {planets.map((planet, index) => (
                    <p className="" key={index}>
                        <a href={`/planets/${planet.url.split("/").reverse()[1]}`} className="text-yellow-200 hover:underline">
                            {planet.name}
                        </a>
                        , &nbsp;
                    </p>
                ))}
            </div>
            <div className="w-full h-auto flex flex-wrap">
                <strong className="">Starships: &nbsp;</strong>
                {starships.map((starship, index) => (
                    <p className="" key={index}>
                        <a href={`/starships/${starship.url.split("/").reverse()[1]}`} className="text-yellow-200 hover:underline">
                            {starship.name}
                        </a>
                        , &nbsp;
                    </p>
                ))}
            </div>
            <div className="w-full h-auto flex flex-wrap">
                <strong className="">Vehicles: &nbsp;</strong>
                {vehicles.map((vehicle, index) => (
                    <p className="" key={index}>
                        <a href={`/vehicles/${vehicle.url.split("/").reverse()[1]}`} className="text-yellow-200 hover:underline">
                            {vehicle.name}
                        </a>
                        , &nbsp;
                    </p>
                ))}
            </div>
            <div className="w-full h-auto flex flex-wrap">
                <strong className="">Species: &nbsp;</strong>
                {species.map((specie, index) => (
                    <p className="" key={index}>
                        <a href={`/species/${specie.url.split("/").reverse()[1]}`} className="text-yellow-200 hover:underline">
                            {specie.name}
                        </a>
                        , &nbsp;
                    </p>
                ))}
            </div>
        </div>
    );
}

export default FilmsDetail;
