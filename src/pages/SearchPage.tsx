import React, { useEffect, useState } from 'react';
import { IPokemon } from '../models/IPokemon';
import { useAppDispatch, useAppSelector } from '../redux/store';
import { pokemonAction } from '../redux/slices/pokemonsSlice';
import { useParams } from 'react-router-dom';

const SearchPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [pokemon, setPokemon] = useState<IPokemon | null>(null);
    const dispatch = useAppDispatch();
    const favoritePokemons = useAppSelector(state => state.PokemonSlice.favoritePokemons);

    useEffect(() => {
        if (id) {
            const fetchPokemonDetails = async () => {
                try {
                    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
                    const data = await response.json();
                    const transformedPokemon: IPokemon = {
                        id: data.id,
                        name: data.name,
                        abilities: data.abilities,
                        stats: data.stats,
                        types: data.types,
                        forms: data.forms || [], // Обробка випадків, коли forms може бути відсутнім
                        imageUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${data.id}.png`,
                        height: data.height,
                        weight: data.weight,
                        base_experience: data.base_experience
                    };
                    setPokemon(transformedPokemon);
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
        <div>
            {pokemon ? (
                <div>
                    <img src={pokemon.imageUrl} alt={pokemon.name} />
                    <h1>{pokemon.name}</h1>
                    <h2>Abilities</h2>
                    <ul>
                        {pokemon.abilities.map((ability, index) => (
                            <li key={index}>{ability.ability.name}</li>
                        ))}
                    </ul>
                    <h2>Stats</h2>
                    <ul>
                        {pokemon.stats.map((stat, index) => (
                            <li key={index}>
                                <strong>{stat.stat.name}:</strong> {stat.base_stat}
                            </li>
                        ))}
                    </ul>
                    <h2>Types</h2>
                    <ul>
                        {pokemon.types.map((type, index) => (
                            <li key={index}>{type.type.name}</li>
                        ))}
                    </ul>
                    {pokemon.forms.length > 0 && (
                        <>
                            <h2>Forms</h2>
                            <ul>
                                {pokemon.forms.map((form, index) => (
                                    <li key={index}>{form.name}</li>
                                ))}
                            </ul>
                        </>
                    )}
                    <button onClick={handleAddToFavorites}>
                        Add to Favorites
                    </button>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default SearchPage;