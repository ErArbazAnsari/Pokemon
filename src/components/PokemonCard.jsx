function PokemonCard({ pokemonData }) {
    return (
        <li className="pokemon-card">
            <figure>
                <img
                    src={pokemonData.sprites.other.dream_world.front_default}
                    alt={pokemonData.name}
                    width={200}
                    height={200}
                />
            </figure>
            <h1 className="pokemon-name">{pokemonData.name}</h1>
            <div className="pokemon-info pokemon-highlight">
                <p>
                    {pokemonData.types
                        .map((curtype) => curtype.type.name)
                        .join(", ")}
                </p>
            </div>

            <div className="grid-three-cols">
                <p className="pokemon-info">
                    <span>Height: </span>
                    {pokemonData.height}
                </p>
                <p className="pokemon-info">
                    <span>Weight: </span>
                    {pokemonData.weight}
                </p>
                <p className="pokemon-info">
                    <span>Speed: </span>
                    {pokemonData.stats[5].base_stat}
                </p>
            </div>

            <div className="grid-three-cols">
                <p className="pokemon-info">
                    <span>
                        Experience: <br />
                    </span>
                    {pokemonData.base_experience}
                </p>
                <p className="pokemon-info">
                    <span>
                        Attack: <br />
                    </span>
                    {pokemonData.stats[1].base_stat}
                </p>
                <p className="pokemon-info">
                    <span>
                        Ability: <br />
                    </span>
                    {pokemonData.abilities
                        .map((abilityInfo) => abilityInfo.ability.name)
                        .slice(0, 1)
                        .join(", ")}
                </p>
            </div>
        </li>
    );
}

export default PokemonCard;
