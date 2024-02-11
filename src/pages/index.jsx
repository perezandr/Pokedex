import { useRouter } from "next/router";
import { useState } from "react";
import styles from "../styles/Home.module.scss";

export default function Pokedex() {
  const router = useRouter();
  const [pokemonSearch, setPokemonSearch] = useState("");

  const onHandleSubmit = (e) => {
    e.preventDefault();
    router.push(`/pokedex/${pokemonSearch}`);
  };

  const onHandleChange = (e) => {
    e.preventDefault();
    setPokemonSearch(e.target.value);
  };

  return (
    <main className={styles.Main}>
      <div className={styles.fillingDiv}></div>
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
      <div className={styles.pokeball}></div>
    </main>
  );
}
