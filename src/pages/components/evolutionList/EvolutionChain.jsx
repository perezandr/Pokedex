import styles from "./index.module.scss";
import Link from "next/link";
import { useState, useEffect } from "react";

const EvolutionList = ({ evolutionSprite }) => {
  const [shouldAlignStart, setShouldAlignStart] = useState(false);

  useEffect(() => {
    if (evolutionSprite.length > 5) {
      setShouldAlignStart(true);
    } else {
      setShouldAlignStart(false);
    }
  }, [evolutionSprite]);

  return (
    <>
      <h5 className={styles.title}>Evolution chain</h5>
      <ul
        className={`${styles.evolutionWrapper} ${
          shouldAlignStart ? styles.alignStart : ""
        }`}
      >
        {evolutionSprite?.map((evolution, index) => (
          <li className={styles.pokemonSpriteWrapper} key={index}>
            <Link href={`/pokedex/${evolution.name}`}>
              <img
                className={styles.pokemonSprite}
                src={evolution.sprite}
                alt={evolution.name}
              />
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
  // );
};

export default EvolutionList;
