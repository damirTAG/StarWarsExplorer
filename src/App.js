import React from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";

import Header from "./components/Header";
import Footer from "./components/Footer";

import HomePage from "./pages/Home";

import PlanetsPage from "./pages/Planets";
import PlanetDetail from "./pages/PlanetDetail";

import CharactersPage from "./pages/Characters";
import CharactersDetail from "./pages/CharacterDetail";

import FilmsPage from "./pages/Films";
import FilmsDetail from "./pages/FilmsDetail";

import MiscDetail from "./pages/Misc";

import SearchPage from "./components/Search";

function App() {
    return (
        <Router>
            <div className="App">
                <div id="base-bg"></div>
                <div id="secondary-bg"></div>
                <Header />
                <main className="container App-main">
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/planets" element={<PlanetsPage />} />
                        <Route path="/planets/:id" element={<PlanetDetail />} />
                        <Route path="/search/:query" element={<SearchPage />} />
                        <Route path="/characters" element={<CharactersPage />} />
                        <Route path="/characters/:id" element={<CharactersDetail />} />
                        <Route path="/films" element={<FilmsPage />} />
                        <Route path="/films/:id" element={<FilmsDetail />} />
                        <Route path="/species/:id" element={<MiscDetail />} />
                        <Route path="/vehicles/:id" element={<MiscDetail />} />
                        <Route path="/starships/:id" element={<MiscDetail />} />
                    </Routes>
                </main>
                <Footer />
            </div>
        </Router>
    );
}

export default App;
