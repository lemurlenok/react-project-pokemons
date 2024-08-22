import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; // Імплементуйте useParams
import { PokemonServices } from '../services/api.services';
import { IPokemon } from '../models/IPokemon';

const PokemonDetailPage = () => {
    const { id } = useParams(); // Отримання id з URL
    const [pokemon, setPokemon] = useState<IPokemon | null>(null);

    useEffect(() => {
        const fetchPokemon = async () => {
            if (id) {
                try {
                    const response = await PokemonServices.getAllPokemons(0); // Використовуйте відповідний метод для отримання детальної інформації
                    const foundPokemon = response.results.find(p => p.id === Number(id)); // Перетворюємо id на число
                    setPokemon(foundPokemon || null);
                } catch (error) {
                    console.error('Failed to fetch Pokémon details:', error);
                }
            }
        };

        fetchPokemon();
    }, [id]);

    return (
        <div>
            {pokemon ? (
                <div>
                    <h1>{pokemon.name}</h1>
                    <img src={pokemon.imageUrl} alt={pokemon.name} />
                    <p>Details about {pokemon.name}</p>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default PokemonDetailPage;