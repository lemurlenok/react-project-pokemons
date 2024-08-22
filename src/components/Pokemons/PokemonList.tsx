import React from 'react';
import PokemonCard from '../Pokemon/PokemonCard';
import { IPokemon } from '../../models/IPokemon';
import styles from './PokemonList.module.css';

interface PokemonListProps {
    pokemons: IPokemon[];
    onCardClick: (pokemon: IPokemon) => void;
    onAddToFavorites: (pokemon: IPokemon) => void; // Додано пропс для обробки додавання до улюблених
}

const PokemonList: React.FC<PokemonListProps> = ({ pokemons, onCardClick, onAddToFavorites }) => {
    return (
        <div className={styles.pokemonGrid}>
            {pokemons.map((pokemon) => (
                <PokemonCard
                    key={pokemon.id} // Використовуйте унікальний ідентифікатор
                    pokemon={pokemon}
                    onClick={onCardClick}
                    onAddToFavorites={onAddToFavorites} // Передача обробника додавання до улюблених
                />
            ))}
        </div>
    );
};

export default PokemonList;