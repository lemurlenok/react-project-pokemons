import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { IPokemonDetail } from '../models/IPokemonDetail';
import { PokemonServices } from '../services/api.services'; // Переконайтеся, що імпорт правильний
import styles from './PokemonDetailPage.module.css';

const PokemonDetailPage: React.FC = () => {
    const { id } = useParams<{ id: string | undefined }>(); // Зміна типу на string | undefined
    const [pokemon, setPokemon] = useState<IPokemonDetail | null>(null);
    const [isFavorite, setIsFavorite] = useState<boolean>(false);

    useEffect(() => {
        if (!id) return; // Додаємо перевірку на випадок, якщо id є undefined

        const fetchPokemon = async () => {
            try {
                const data = await PokemonServices.getPokemonById(id); // Переконайтеся, що id не undefined
                setPokemon(data);

                // Перевірка, чи є покемон у списку улюблених (приклад, якщо є метод перевірки)
                const favoritePokemons = JSON.parse(localStorage.getItem('favoritePokemons') || '[]');
                const isFavoritePokemon = favoritePokemons.some((fav: IPokemonDetail) => fav.id === data.id);
                setIsFavorite(isFavoritePokemon);
            } catch (error) {
                console.error('Error fetching Pokemon details:', error);
            }
        };

        fetchPokemon();
    }, [id]);

    const handleToggleFavorite = () => {
        if (!pokemon) return;

        const favoritePokemons = JSON.parse(localStorage.getItem('favoritePokemons') || '[]');
        if (isFavorite) {
            // Видалити з улюблених
            const updatedFavorites = favoritePokemons.filter((fav: IPokemonDetail) => fav.id !== pokemon.id);
            localStorage.setItem('favoritePokemons', JSON.stringify(updatedFavorites));
        } else {
            // Додати до улюблених
            favoritePokemons.push(pokemon);
            localStorage.setItem('favoritePokemons', JSON.stringify(favoritePokemons));
        }
        setIsFavorite(!isFavorite);
    };

    if (!pokemon) {
        return <div className={styles.loading}>Loading...</div>;
    }

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>{pokemon.name}</h1>
            <img className={styles.image} src={pokemon.imageUrl} alt={pokemon.name} />
            <div className={styles.info}>
                <p><strong>Height:</strong> {pokemon.height} dm</p>
                <p><strong>Weight:</strong> {pokemon.weight} hg</p>
                <p><strong>Base Experience:</strong> {pokemon.base_experience}</p>
            </div>

            <div className={styles.details}>
                <div className={styles.section}>
                    <h2>Abilities</h2>
                    <ul>
                        {pokemon.abilities.map((ability, index) => (
                            <li key={index} className={styles.listItem}>{ability.ability.name}</li>
                        ))}
                    </ul>
                </div>

                <div className={styles.section}>
                    <h2>Stats</h2>
                    <ul>
                        {pokemon.stats.map((stat, index) => (
                            <li key={index} className={styles.listItem}>
                                <strong>{stat.stat.name}:</strong> {stat.base_stat}
                            </li>
                        ))}
                    </ul>
                </div>

                <div className={styles.section}>
                    <h2>Types</h2>
                    <ul>
                        {pokemon.types.map((type, index) => (
                            <li key={index} className={styles.listItem}>{type.type.name}</li>
                        ))}
                    </ul>
                </div>

                <div className={styles.section}>
                    <h2>Forms</h2>
                    <ul>
                        {pokemon.forms.map((form, index) => (
                            <li key={index} className={styles.listItem}>{form.name}</li>
                        ))}
                    </ul>
                </div>
            </div>

            <button
                className={styles.favoriteButton}
                onClick={handleToggleFavorite}
                aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            >
                {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
            </button>
        </div>
    );
};

export default PokemonDetailPage;