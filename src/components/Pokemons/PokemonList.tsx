import React from 'react';
import PokemonCard from '../Pokemon/PokemonCard';
import { IPokemon } from '../../models/IPokemon';
import styles from './PokemonList.module.css';

interface PokemonListProps {
    pokemons: IPokemon[];
    onCardClick: (pokemon: IPokemon) => void; // Додайте пропс onCardClick
}

const PokemonList: React.FC<PokemonListProps> = ({ pokemons, onCardClick }) => {
    return (
        <div className={styles.pokemonGrid}>
            {pokemons.map((pokemon) => (
                <PokemonCard key={pokemon.id} pokemon={pokemon} onClick={onCardClick} />
            ))}
        </div>
    );
};

export default PokemonList;