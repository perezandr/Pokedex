// import { useRouter } from "next/router";
// import { useState } from "react";
// import styles from "./pokedex.module.scss";

// export default function Pokedex() {
//   const router = useRouter();
//   const [pokemonSearch, setPokemonSearch] = useState("");

//   const onHandleSubmit = (e) => {
//     e.preventDefault();
//     router.push(`/pokedex/${pokemonSearch}`);
//   };

//   const onHandleChange = (e) => {
//     setPokemonSearch(e.target.value);
//   };

//   return (
//     <div className={styles.Pokedex}>
//       <form className={styles.form} onSubmit={onHandleSubmit}>
//         <input
//           className={styles.inputPokemon}
//           type="text"
//           value={pokemonSearch}
//           onChange={onHandleChange}
//           placeholder="Gotta catch 'em all!"
//         />
//         <input className={styles.searchButton} type="submit" value="Search" />
//       </form>
//     </div>
//   );
// }
