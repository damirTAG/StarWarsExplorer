import React, { useState, useEffect } from "react";
import { getPlanet } from "../api/swapi";
import { useParams } from "react-router-dom";
import { _request } from "../api/swapi";

function PlanetDetail() {
    const [planet, setPlanet] = useState(null);
    const [residents, setResidents] = useState([]);
    const [films, setFilms] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        const fetchPlanet = async () => {
            try {
                const data = await getPlanet(id);
                if (!data.detail) {
                    setPlanet(data);

                    const residentData = await Promise.all(data.residents.map((residentUrl) => _request(residentUrl)));
                    setResidents(residentData);

                    const filmData = await Promise.all(data.films.map((filmUrl) => _request(filmUrl)));
                    setFilms(filmData);
                }
            } catch (error) {
                console.error("Error fetching planet:", error);
            }
        };

        fetchPlanet();
    }, [id]);

    if (!planet) {
        return <div className="text-white">Loading...</div>;
    }

    return (
        <div className="mx-auto text-white">
            <h2 className="text-3xl font-bold mb-4 text-yellow-300">{planet.name}</h2>
            <div className="flex">
                <div className="w-full h-auto flex flex-wrap">
                    <p className="text-lg mr-8">
                        <strong>Climate:</strong> {planet.climate}
                    </p>
                    <p className="text-lg mr-8">
                        <strong>Population:</strong> {planet.population}
                    </p>
                    <p className="text-lg mr-8">
                        <strong>Rotation Period:</strong> {planet.rotation_period} hours
                    </p>
                    <p className="text-lg mr-8">
                        <strong>Orbital Period:</strong> {planet.orbital_period} days
                    </p>
                    <p className="text-lg mr-8">
                        <strong>Diameter:</strong> {planet.diameter} km
                    </p>
                </div>
            </div>
            <div className="w-full h-auto flex flex-wrap">
                <p className="text-lg mr-8">
                    <strong>Gravity:</strong> {planet.gravity}
                </p>
                <p className="text-lg mr-8">
                    <strong>Terrain:</strong> {planet.terrain}
                </p>
                <p className="text-lg mr-8">
                    <strong>Surface Water:</strong> {planet.surface_water}%
                </p>
                <p className="text-lg mr-8">
                    <strong>Population:</strong> {planet.population}
                </p>
            </div>
            <div className="w-full h-auto flex flex-wrap">
                <strong className="">Residents: &nbsp;</strong>
                {residents.map((resident, index) => (
                    <p className="" key={index}>
                        {resident.name}, &nbsp;
                    </p>
                ))}
            </div>
            <div className="w-full h-auto flex flex-wrap">
                <strong className="">Films: &nbsp;</strong>
                {films.map((film, index) => (
                    <p className="" key={index}>
                        {film.title}, &nbsp;
                    </p>
                ))}
            </div>
        </div>
    );
}

export default PlanetDetail;
