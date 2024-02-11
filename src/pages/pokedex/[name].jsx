import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Link from "next/link";
import styles from "./pokedex.module.scss";
import StatsChart from "../components/statsChart";
import EvolutionList from "../components/evolutionList";

export default function Pokedex() {
  const router = useRouter();
  const [pokemonData, setPokemonData] = useState({});
  const [pokemonSearch, setPokemonSearch] = useState("");

  const [evolutionSprite, setEvolutionSprite] = useState([]);

  useEffect(() => {
    const fetchPokemonData = async () => {
      setPokemonData({});

      setEvolutionSprite([]);
      const pokemonName = router.query.name && router.query.name.toLowerCase();

      if (!pokemonName) return;

      try {
        const pokemonResponseData = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
        )
          .then((response) => response.json())
          .catch((error) => router.push("/404"));

        setPokemonData(pokemonResponseData);

        const speciesResponse = await fetch(
          `https://pokeapi.co/api/v2/pokemon-species/${pokemonResponseData.id}`
        );

        const speciesData = await speciesResponse.json();

        const evolutionResponse = await fetch(speciesData.evolution_chain.url);

        const evolutionData = await evolutionResponse.json();

        const evolutionNames = extractEvolutionNames(
          evolutionData.chain,
          pokemonResponseData.name
        );

        const spritePromises = evolutionNames.map((name) =>
          fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
            .then((res) => res.json())
            .then((data) => ({
              name: name,
              sprite:
                data.sprites.versions["generation-viii"].icons.front_default,
            }))
        );

        const sprites = await Promise.all(spritePromises);
        setEvolutionSprite(sprites);
      } catch (error) {
        console.error("Failed to fetch Pokemon data:", error);
      }
    };

    fetchPokemonData();
  }, [router]);

  const extractEvolutionNames = (evolutionChain, currentPokemonName) => {
    const evolutionNames = [];

    if (evolutionChain.species && evolutionChain.species.name) {
      evolutionNames.push(evolutionChain.species.name);
    }

    if (evolutionChain.evolves_to && evolutionChain.evolves_to.length > 0) {
      evolutionChain.evolves_to.forEach((evolution) => {
        evolutionNames.push(...extractEvolutionNames(evolution));
      });
    }

    return evolutionNames.filter((name) => name != currentPokemonName);
  };

  const onHandleSubmit = (e) => {
    e.preventDefault();
    router.push(`/pokedex/${pokemonSearch.toLowerCase()}`);
  };

  const onHandleChange = (e) => {
    setPokemonSearch(e.target.value);
  };

  const onHandleClickNext = (e) => {
    e.preventDefault();
    router.push(`/pokedex/${pokemonData.id + 1}`);
  };

  const onHandleClickPrev = (e) => {
    e.preventDefault();
    router.push(`/pokedex/${pokemonData.id - 1}`);
  };

  return (
    <main className={styles.Main}>
      {pokemonData.sprites ? (
        <div className={styles.Pokedex}>
          <Link href="/">
            <button className={styles.buttonHome}>X</button>
          </Link>
          <div className={styles.PokemonWrapper}>
            <h4 className={styles.pokemonNumber}># {pokemonData.id}</h4>
            <img
              src={
                pokemonData.sprites.other.showdown.front_default !== null
                  ? pokemonData.sprites.other.showdown.front_default
                  : pokemonData.sprites.front_default
              }
              alt={pokemonData.name}
              className={styles.pokemonImage}
            />
            <div className={styles.PokemonNameWrapper}>
              <button className={styles.buttonPrev} onClick={onHandleClickPrev}>
                <img
                  width="24"
                  height="24"
                  src={`/icons/arrowLeft.png`}
                  alt="pokeball--v1"
                />
              </button>
              <h1 className={styles.title}>{pokemonData.name.toUpperCase()}</h1>
              <button className={styles.buttonNext} onClick={onHandleClickNext}>
                <img
                  width="24"
                  height="24"
                  src={`/icons/arrowRight.png`}
                  alt="pokeball--v1"
                />
              </button>
            </div>

            <form className={styles.form} onSubmit={onHandleSubmit}>
              <input
                className={styles.inputPokemon}
                type="text"
                value={pokemonSearch}
                onChange={onHandleChange}
                placeholder="Search a Pokemon"
              />
              <input className={styles.searchButton} type="submit" value="Go" />
            </form>
          </div>
          <div className={styles.types}>
            <ul>
              {pokemonData.types.map((type, i) => (
                <li key={i}>
                  <img
                    className={styles.typeIcons}
                    src={`/icons/${type.type.name}.svg`}
                    alt={`${type.type.name} icons`}
                  />
                  <p>{type.type.name}</p>
                </li>
              ))}
            </ul>
          </div>
          {evolutionSprite != [] && (
            <EvolutionList evolutionSprite={evolutionSprite} />
          )}
          <div className={styles.graphWrapper}>
            {pokemonData.stats && (
              <StatsChart pokemonStats={pokemonData.stats} />
            )}
          </div>
        </div>
      ) : (
        <div className={styles.wrapper}>
          <div className={styles.pokeball} />
        </div>
      )}
    </main>
  );
}
