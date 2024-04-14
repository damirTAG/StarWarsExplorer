import React, { useState, useEffect } from "react";
import { getCharacter } from "../api/swapi";
import { Link, useParams } from "react-router-dom";
import CharacterCard from "../components/CharacterCard";

function CharactersPage() {
    const [characters, setCharacters] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const { id } = useParams();

    useEffect(() => {
        let cancel = false;

        const fetchCharacters = async () => {
            setLoading(true);
            try {
                const characterIds = [...Array(82).keys()].map((i) => i + 1);
                const characterPromises = characterIds.filter((charId) => charId !== 17).map((id) => getCharacter(id));
                const data = await Promise.all(characterPromises);

                // Filter out undefined characters
                const filteredCharacters = data.filter(Boolean);

                setCharacters(filteredCharacters);
                setTotalPages(Math.ceil(filteredCharacters.length / 10));
                setLoading(false);
            } catch (error) {
                if (error.response && error.response.status === 404) {
                    console.error("Character not found:", error);
                    setCharacters([]);
                } else {
                    console.error("Error fetching characters:", error);
                }
                setLoading(false);
            }
        };

        fetchCharacters();

        return () => {
            cancel = true;
        };
    }, []);

    useEffect(() => {
        if (id) {
            getCharacter(id).then((data) => {
                if (!data.detail) {
                    setCharacters([data]);
                    setLoading(false);
                } else {
                    setLoading(false);
                }
            });
        }
    }, [id]);

    const handlePrevPage = () => {
        setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
    };

    const handleNextPage = () => {
        setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
    };

    const currentCharacters = characters.slice((currentPage - 1) * 10, currentPage * 10);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (currentCharacters.length === 0) {
        return <div>No characters found</div>;
    }

    return (
        <div className="container">
            <div className="character-list">
                {currentCharacters.map((character) => (
                    <Link key={character.url} to={`/characters/${character.url.split("/").slice(-2, -1)[0]}`}>
                        <CharacterCard character={character} />
                    </Link>
                ))}
            </div>
            <div className="pagination">
                <button
                    className="bg-[#080808] hover:-translate-y-[3px] hover:bg-[#101010] transition-all duration-200 rounded-lg p-2 px-3"
                    onClick={handlePrevPage}
                    disabled={currentPage === 1}
                >
                    Previous
                </button>
                <span>
                    {currentPage} / {totalPages}
                </span>
                <button
                    className="bg-[#080808] hover:-translate-y-[3px] hover:bg-[#101010] transition-all duration-200 rounded-lg p-2 px-3"
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                >
                    Next
                </button>
            </div>
            {id && <Link to="/characters">Back to All Characters</Link>}
        </div>
    );
}

export default CharactersPage;
