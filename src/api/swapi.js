import axios from "axios";

const BASE_URL = "https://swapi.dev/api/";

export async function _request(query) {
    try {
        const response = await axios.get(query);
        return response.data;
    } catch (error) {
        console.log("Get Data Error: ", error);
        throw error;
    }
}

export async function searchPlanets(query) {
    const url = `${BASE_URL}planets/?search=${query}`;
    return await _request(url);
}

export async function getPlanet(id) {
    const url = `${BASE_URL}planets/${id}/`;
    return await _request(url);
}

export async function searchCharacters(query) {
    const url = `${BASE_URL}people/?search=${query}`;
    return await _request(url);
}

export async function getCharacter(id) {
    const url = `${BASE_URL}people/${id}/`;
    return await _request(url);
}

export async function getFilms() {
    const url = `${BASE_URL}films/`;
    return await _request(url);
}

export async function getFilm(id) {
    return await _request(`${BASE_URL}films/${id}/`);
}

export async function searchFilm(query) {
    const url = `${BASE_URL}films/?search=${query}`;
    return await _request(url);
}
