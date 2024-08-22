import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../redux/store';
import { pokemonAction } from '../redux/slices/pokemonsSlice';
import { useParams } from 'react-router-dom';
import { IPokemon } from '../models/IPokemon';
import styles from '../pages/'


const PokemonDetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [pokemon, setPokemon] = useState<IPokemon | null>(null);
    const dispatch = useAppDispatch();
    const favoritePokemons = useAppSelector(state => state.PokemonSlice.favoritePokemons);

    useEffect(() => {
        if (id) {
            // Змінюється залежно від вашого API
            const fetchPokemonDetails = async () => {
                try {
                    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
                    const data = await response.json();
                    setPokemon(data);
                } catch (error) {
                    console.error('Failed to fetch Pokémon details:', error);
                }
            };
            fetchPokemonDetails();
        }
    }, [id]);

    const handleAddToFavorites = () => {
        if (pokemon) {
            dispatch(pokemonAction.addFavorite(pokemon));
        }
    };

    return (
        <div className={styles.container}>
            {pokemon ? (
                <div className={styles.pokemonDetail}>
                    <img
                        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`}
                        alt={pokemon.name}
                        className={styles.pokemonImage}
                    />
                    <h1>{pokemon.name}</h1>
                    <div className={styles.pokemonStats}>
                        <h2>Abilities</h2>
                        <ul>
                            {pokemon.abilities.map((ability: any) => (
                                <li key={ability.ability.name}>{ability.ability.name}</li>
                            ))}
                        </ul>
                        <h2>Stats</h2>
                        <ul>
                            {pokemon.stats.map((stat: any) => (
                                <li key={stat.stat.name}>
                                    {stat.stat.name}: {stat.base_stat}
                                </li>
                            ))}
                        </ul>
                        <h2>Types</h2>
                        <ul>
                            {pokemon.types.map((type: any) => (
                                <li key={type.type.name}>{type.type.name}</li>
                            ))}
                        </ul>
                        <h2>Forms</h2>
                        <ul>
                            {pokemon.forms.map((form: any) => (
                                <li key={form.name}>{form.name}</li>
                            ))}
                        </ul>
                    </div>
                    <button
                        className={styles.favoriteButton}
                        onClick={handleAddToFavorites}
                    >
                        Add to Favorites
                    </button>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default PokemonDetailPage;