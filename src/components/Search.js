import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { searchPlanets, searchCharacters, searchFilm } from "../api/swapi";
import PlanetCard from "../components/PlanetCard";
import CharacterCard from "../components/CharacterCard";
import FilmCard from "./FilmsCard";

function SearchPage() {
    const [searchResults, setSearchResults] = useState([]);
    const [notFound, setNotFound] = useState(false);
    const { query } = useParams();

    useEffect(() => {
        if (query) {
            const fetchSearchResults = async () => {
                try {
                    const planetResults = await searchPlanets(query);
                    const characterResults = await searchCharacters(query);
                    const filmResults = await searchFilm(query);

                    const combinedResults = [...planetResults.results, ...characterResults.results, ...filmResults.results];

                    setSearchResults(combinedResults);
                    setNotFound(combinedResults.length === 0);
                } catch (error) {
                    console.error("Error fetching search results:", error);
                    setNotFound(true);
                }
            };

            fetchSearchResults();
        }
    }, [query]);

    if (notFound) {
        return (
            <div>
                <h2>No results found for "{query}"</h2>
                <Link to="/">Back to Home</Link>
            </div>
        );
    }

    return (
        <div>
            <h2>Search Results for "{query}"</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {searchResults.map((item, index) => {
                    if (item.hasOwnProperty("climate")) {
                        return <PlanetCard key={index} planet={item} />;
                    } else if (item.hasOwnProperty("gender")) {
                        return <CharacterCard key={index} character={item} />;
                    } else if (item.hasOwnProperty("director")) {
                        return <FilmCard key={index} film={item} />;
                    }
                    return null;
                })}
            </div>
            <Link to="/">Back to Home</Link>
        </div>
    );
}

export default SearchPage;
