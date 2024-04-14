import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import PlanetCard from "../components/PlanetCard";
import { searchPlanets, getPlanet } from "../api/swapi";
import { Link, useParams } from "react-router-dom";

function PlanetsPage({ searchQuery }) {
    const [planets, setPlanets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const { id } = useParams();

    useEffect(() => {
        const fetchPlanets = async () => {
            setLoading(true);
            try {
                let data;
                if (searchQuery) {
                    const searchData = await searchPlanets(searchQuery, currentPage);
                    data = searchData.results;
                    setTotalPages(Math.ceil(searchData.count / 10));
                } else {
                    const planetIds = [...Array(60).keys()].map((i) => i + 1);
                    const planetPromises = planetIds.map((id) => getPlanet(id));
                    data = await Promise.all(planetPromises);
                    setTotalPages(6);
                }

                setPlanets(data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching planets:", error);
                setLoading(false);
            }
        };

        fetchPlanets();
    }, [currentPage, searchQuery]);

    useEffect(() => {
        if (id) {
            getPlanet(id).then((data) => {
                if (!data.detail) {
                    setPlanets([data]);
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

    if (loading) {
        return <div>Loading...</div>;
    }

    if (planets.length === 0) {
        return <div>No planets found</div>;
    }

    return (
        <div className="container">
            <div className="planet-list">
                {planets.slice((currentPage - 1) * 10, currentPage * 10).map((planet) => (
                    <Link key={planet.url} to={`/planets/${planet.url.split("/").slice(-2, -1)[0]}`}>
                        <PlanetCard planet={planet} />
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
            {searchQuery && <Link to="/planets">Back to All Planets</Link>}
        </div>
    );
}

PlanetsPage.propTypes = {
    searchQuery: PropTypes.string,
};

export default PlanetsPage;
