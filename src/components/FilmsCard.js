import React from "react";
import { Link } from "react-router-dom";

function FilmCard({ film }) {
    return (
        <div className="film-card bg-[#333] rounded-lg overflow-hidden shadow-md hover:shadow-xl transition duration-300">
            <div className="p-4">
                <h3 className="text-xl font-semibold text-yellow-300 mb-2">
                    <Link to={`/films/${film.url.split("/").reverse()[1]}`} className="hover:underline">
                        {film.title}
                    </Link>
                </h3>
                <p className="text-base text-white mb-4">Episode {film.episode_id}</p>
                <p className="text-sm text-gray-400">Release Date: {film.release_date}</p>
            </div>
        </div>
    );
}

export default FilmCard;
