import { useRouter } from "next/router";
import { useState } from "react";
import styles from "../styles/Home.module.scss";

export default function Pokedex() {
  const router = useRouter();
  const [pokemonSearch, setPokemonSearch] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  const onHandleSubmit = (e) => {
    e.preventDefault();
    router.push(`/pokedex/${pokemonSearch}`);
  };

  const onHandleChange = (e) => {
    e.preventDefault();
    setPokemonSearch(e.target.value);
  };

  const onHandleClick = () => {
    if (isVisible == true) {
    }
    setIsVisible(() => true);
  };

  return (
    <main className={styles.Main}>
      <div className={styles.pokeball} onClick={onHandleClick}>
        {isVisible && (
          <form className={styles.form} onSubmit={onHandleSubmit}>
            <input
              className={styles.inputPokemon}
              type="text"
              value={pokemonSearch}
              onChange={onHandleChange}
              placeholder="Search a Pokemon"
            />
            <input
              className={styles.searchButton}
              type="submit"
              value="Search"
            />
          </form>
        )}
      </div>
    </main>
  );
}
