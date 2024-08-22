import React from 'react';
import { useAppSelector } from "../redux/store";
import PokemonCard from "../components/Pokemon/PokemonCard";
import styles from './FavoritesPage.module.css';
import {IPokemon} from "../models/IPokemon";

const Favourite = () => {
    const { favoritePokemons } = useAppSelector(state => state.PokemonSlice);

    const handleCardClick = (pokemon: IPokemon) => {
        // Логіка при кліку на картку улюбленого покемона
    };

    const handleAddToFavorites = (pokemon: IPokemon) => {
        // Додавання до улюблених не потрібне на цій сторінці
    };

    return (
        <div>
            <h2>Favorite Pokémon</h2>
            <div className={styles.pokemonGrid}>
                {favoritePokemons.map(pokemon => (
                    <PokemonCard
                        key={pokemon.id}
                        pokemon={pokemon}
                        onClick={handleCardClick}
                        onAddToFavorites={handleAddToFavorites} // Передача обробника
                    />
                ))}
            </div>
        </div>
    );
};

export default Favourite;