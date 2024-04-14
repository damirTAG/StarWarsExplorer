import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Header() {
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
        <header className="bg-black text-white">
            <div className="container mx-auto px-4 py-6 flex justify-between items-center">
                <div className="logo">
                    <Link to="/">
                        <img
                            src="https://lumiere-a.akamaihd.net/v1/images/sw_logo_stacked_2x-52b4f6d33087_7ef430af.png?region=0,0,586,254"
                            alt="Header-logo"
                            className="w-32"
                        />
                    </Link>
                </div>
                <nav className="space-x-4">
                    <Link to="/" className="text-lg hover:text-yellow-300 transition duration-300">
                        Home
                    </Link>
                    <Link to="/planets" className="text-lg hover:text-yellow-300 transition duration-300">
                        Planets
                    </Link>
                    <Link to="/characters" className="text-lg hover:text-yellow-300 transition duration-300">
                        Peoples
                    </Link>
                    <Link to="/films" className="text-lg hover:text-yellow-300 transition duration-300">
                        Films
                    </Link>
                </nav>
                <form onSubmit={handleSubmit} className="flex items-center">
                    <input
                        type="text"
                        placeholder="Search..."
                        value={searchQuery}
                        onChange={handleInputChange}
                        className="px-4 py-2 rounded-l-md focus:outline-none bg-black"
                    />
                    <button
                        type="submit"
                        className="bg-yellow-300 text-black px-4 py-2 rounded-r-md hover:bg-yellow-400 transition duration-300"
                    >
                        Search
                    </button>
                </form>
            </div>
        </header>
    );
}

export default Header;
