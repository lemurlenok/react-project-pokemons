import React from 'react';
import { Link } from 'react-router-dom'; // Імпортуйте Link
import { IPokemon } from '../../models/IPokemon';
import styles from './PokemonCard.module.css';

interface PokemonCardProps {
    pokemon: IPokemon;
    onClick: (pokemon: IPokemon) => void;
    onAddToFavorites: (pokemon: IPokemon) => void;
}

const PokemonCard: React.FC<PokemonCardProps> = ({ pokemon, onClick, onAddToFavorites }) => {
    const spriteUrl = pokemon.imageUrl || 'default-image.png'; // Заміна на дефолтне зображення

    return (
        <div className={styles.pokemonCard} onClick={() => onClick(pokemon)}>
            <img
                src={spriteUrl}
                alt={pokemon.name}
                className={styles.pokemonImage}
            />
            <h3>
                <Link to={`/pokemon/${pokemon.id}`} className={styles.pokemonName}>
                    {pokemon.name}
                </Link>
            </h3>
            <button onClick={(e) => {
                e.stopPropagation(); // Переконуємось, що кліки по кнопці не ведуть до переходу на нову сторінку
                onAddToFavorites(pokemon);
            }} className={styles.favoriteButton}>
                Add to Favorites
            </button>
        </div>
    );
};

export default PokemonCard;