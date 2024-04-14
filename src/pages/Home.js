import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function HomePage() {
    const [searchQuery, setSearchQuery] = useState("");
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setSearchQuery("");
        navigate(`/search/${searchQuery}`);
    };

    return (
        <div className="home-container">
            <h2 className="text-3xl font-bold mb-4 text-yellow-300">Welcome to the Star Wars Universe</h2>
            <p className="text-lg mb-4">Explore the vast universe of Star Wars! You can search for planets, characters, and more.</p>
            <blockquote className="text-2xl text-yellow-300 italic">"May the Force be with you."</blockquote>
            <h1 className="text-3xl font-bold mb-4 text-yellow-300 my-10 ">Start Exploring Now!</h1>
            <form onSubmit={handleSubmit} className="flex items-center w-full">
                <input
                    type="text"
                    placeholder="Search for planets, films, peoples..."
                    value={searchQuery}
                    onChange={handleInputChange}
                    className="flex-grow px-4 py-2 rounded-l-md focus:outline-none bg-[#2a2a2b]"
                />
                <button
                    type="submit"
                    className="bg-yellow-300 text-black px-4 py-2 rounded-r-md hover:bg-yellow-400 transition duration-300"
                >
                    Search
                </button>
            </form>
        </div>
    );
}

export default HomePage;
