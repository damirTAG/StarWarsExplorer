import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { _request } from "../api/swapi";

function MiscDetail() {
    const [item, setItem] = useState(null);
    const [relatedItems, setRelatedItems] = useState([]);
    const [loading, setLoading] = useState(true);

    const { id } = useParams();

    useEffect(() => {
        const path = window.location.pathname;
        const pathItems = path.split("/");
        const itemType = pathItems[pathItems.length - 2];
        const itemId = pathItems[pathItems.length - 1];

        const fetchItem = async () => {
            try {
                const data = await _request(`https://swapi.dev/api/${itemType}/${itemId}/`);
                if (!data.detail) {
                    setItem(data);

                    const relatedData = await Promise.all(data.films.map((url) => _request(url)));
                    setRelatedItems(relatedData);
                    setLoading(false);
                }
            } catch (error) {
                console.error(`Error fetching ${itemType} details:`, error);
            }
        };

        fetchItem();
    }, [id]);

    if (loading) {
        return <div className="text-white">Loading...</div>;
    }

    return (
        <div className="mx-auto text-white">
            <h2 className="text-3xl font-bold mb-4 text-yellow-300">{item.name || item.title}</h2>
            <div className="w-full h-auto flex flex-wrap">
                <p className="text-lg mr-8">
                    <strong>Name:</strong> {item.name || item.title}
                </p>
                {item.model && (
                    <p className="text-lg mr-8">
                        <strong>Model:</strong> {item.model}
                    </p>
                )}
                {item.classification && (
                    <p className="text-lg mr-8">
                        <strong>Classification:</strong> {item.classification}
                    </p>
                )}
                {item.manufacturer && (
                    <p className="text-lg mr-8">
                        <strong>Manufacturer:</strong> {item.manufacturer}
                    </p>
                )}
                {item.cost_in_credits && (
                    <p className="text-lg mr-8">
                        <strong>Cost in Credits:</strong> {item.cost_in_credits}
                    </p>
                )}
                {item.length && (
                    <p className="text-lg mr-8">
                        <strong>Length:</strong> {item.length} m
                    </p>
                )}
            </div>
            <div className="w-full h-auto flex">
                <strong className="">Films: &nbsp;</strong>
                {relatedItems.map((relatedItem, index) => (
                    <p className="" key={index}>
                        {relatedItem.title}, &nbsp;
                    </p>
                ))}
            </div>
        </div>
    );
}

export default MiscDetail;
