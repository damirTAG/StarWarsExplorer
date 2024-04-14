import React, { useState, useEffect } from "react";
import { getFilms } from "../api/swapi";
import FilmCard from "../components/FilmsCard";

function FilmsPage() {
    const [films, setFilms] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFilms = async () => {
            try {
                const data = await getFilms();
                if (data.results) {
                    setFilms(data.results);
                    setLoading(false);
                }
            } catch (error) {
                console.error("Error fetching films:", error);
                setLoading(false);
            }
        };

        fetchFilms();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (films.length === 0) {
        return <div>No films found</div>;
    }

    return (
        <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-4 text-yellow-300">Star Wars Films</h2>
            <div className="film-list grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {films.map((film) => (
                    <FilmCard key={film.url} film={film} />
                ))}
            </div>
        </div>
    );
}

export default FilmsPage;
