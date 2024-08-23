import React from 'react';
import { useNavigate } from 'react-router-dom';
import { IPokemon } from '../../models/IPokemon';
import styles from './PokemonCard.module.css';

interface PokemonCardProps {
    pokemon: IPokemon;
    onClick: (pokemon: IPokemon) => void;
}

const PokemonCard: React.FC<PokemonCardProps> = ({ pokemon, onClick }) => {
    const navigate = useNavigate();

    const handleCardClick = () => {
        navigate(`/pokemon/${pokemon.id}`);
    };

    return (
        <div className={styles.card} onClick={handleCardClick}>
            <img src={pokemon.imageUrl} alt={pokemon.name} className={styles.image} />
            <h2>{pokemon.name}</h2>
        </div>
    );
};

export default PokemonCard;