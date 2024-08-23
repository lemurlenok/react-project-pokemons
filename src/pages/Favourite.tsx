import React, { useEffect, useState } from 'react';
import { IPokemonDetail } from '../models/IPokemonDetail';
import PokemonCard from '../components/Pokemon/PokemonCard';
import styles from './Favorites.module.css';

const Favourite: React.FC = () => {
    const [favoritePokemons, setFavoritePokemons] = useState<IPokemonDetail[]>([]);

    useEffect(() => {
        const fetchFavorites = () => {
            const storedFavorites = JSON.parse(localStorage.getItem('favoritePokemons') || '[]');
            setFavoritePokemons(storedFavorites);
        };

        fetchFavorites();
    }, []);

    if (favoritePokemons.length === 0) {
        return <div className={styles.noFavorites}>No favorite Pokémon yet!</div>;
    }

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Favorite Pokémon</h1>
            <div className={styles.pokemonGrid}>
                {favoritePokemons.map(pokemon => (
                    <PokemonCard
                        key={pokemon.id}
                        pokemon={pokemon}
                        onClick={() => {} }
                    />
                ))}
            </div>
        </div>
    );
};

export default Favourite;