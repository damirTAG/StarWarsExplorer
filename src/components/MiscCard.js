import React from "react";
import { Link } from "react-router-dom";

function MiscCard({ item }) {
    return (
        <div className="card">
            <Link to={`/${item.url.split("/")[4]}/${item.url.split("/")[5]}`} className="block">
                <h3 className="text-xl font-bold text-yellow-300">{item.name || item.title}</h3>
            </Link>
        </div>
    );
}

export default MiscCard;
