import React from 'react';
import PokemonCard from '../../components/Pokemon/PokemonCard';
import { IPokemon } from '../../models/IPokemon';
import styles from './PokemonList.module.css';

interface PokemonListProps {
    pokemons: IPokemon[];
    onCardClick: (pokemon: IPokemon) => void;
}

const PokemonList: React.FC<PokemonListProps> = ({ pokemons, onCardClick }) => {
    return (
        <div className={styles.flexContainer}>
            {pokemons.map(pokemon => (
                <PokemonCard
                    key={pokemon.id}
                    pokemon={pokemon}
                    onClick={onCardClick}
                />
            ))}
        </div>
    );
};

export default PokemonList;