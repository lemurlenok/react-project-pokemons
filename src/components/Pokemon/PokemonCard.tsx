import React from 'react';
import { IPokemon } from '../../models/IPokemon';
import styles from './PokemonCard.module.css';

interface PokemonCardProps {
    pokemon: IPokemon;
    onClick: (pokemon: IPokemon) => void; // Додайте пропс onClick
}

const PokemonCard: React.FC<PokemonCardProps> = ({ pokemon, onClick }) => {
    return (
        <div className={styles.pokemonCard} onClick={() => onClick(pokemon)}>
            <h3>{pokemon.name}</h3>
            <img
                src={pokemon.sprites.front_default}
                alt={pokemon.name}
                className={styles.pokemonImage}
            />
        </div>
    );
};

export default PokemonCard;