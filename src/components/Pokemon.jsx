import React, { useEffect, useState } from "react";
import "./pokemon.css";
import PokemonCard from "./PokemonCard";

function Pokemon() {
    const [pokemon, setPokemon] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [search, setSearch] = useState("");

    const API = "https://pokeapi.co/api/v2/pokemon?limit=200";

    const fetchApiData = async () => {
        try {
            const response = await fetch(API);
            const data = await response.json();

            const detailedPokemonData = data.results.map(
                async (currPokemon) => {
                    try {
                        const data = await fetch(currPokemon.url).then(
                            (response) => response.json()
                        );
                        return data;
                    } catch (error) {
                        console.error(
                            `Failed to fetch data for URL: ${currPokemon.url}`,
                            error
                        );
                        throw error;
                    }
                }
            );

            const detailedResponse = await Promise.all(detailedPokemonData);
            setPokemon(detailedResponse);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching data from API", error);
            setLoading(false);
            setError(error);
        }
    };

    useEffect(() => {
        fetchApiData();
    }, []);

    const searchData = pokemon.filter((currPokemon) => {
        return currPokemon.name.toLowerCase().includes(search.toLowerCase());
    });

    if (loading) {
        return (
            <div style={{ textAlign: "center" }}>
                <h2 style={{ fontSize: "20px" }}>Pokemon Loading...</h2>
            </div>
        );
    }

    if (error) {
        return (
            <div style={{ textAlign: "center" }}>
                <h2 style={{ fontSize: "20px" }}>Error: {error.message}</h2>
            </div>
        );
    }

    return (
        <div>
            <section className="container">
                <header>
                    <h1>Let's Catch Pokemon</h1>
                </header>
                <div className="pokemon-search">
                    <input
                        type="text"
                        placeholder="Search Pokemon"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        autoFocus
                        style={{fontSize: "20px"}}
                    />
                </div>
                <ul className="cards">
                    {searchData.map((currPokemon) => (
                        <PokemonCard
                            key={currPokemon.id}
                            pokemonData={currPokemon}
                        />
                    ))}
                </ul>
            </section>
        </div>
    );
}

export default Pokemon;
