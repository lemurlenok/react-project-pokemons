import axios from 'axios';
import { IPokemonResponse } from '../models/IPokemonCharacteristic';

const axiosInstance = axios.create({
    baseURL: 'https://pokeapi.co/api/v2'
});

export const PokemonServices = {
    getAllPokemons: async (offset: number): Promise<IPokemonResponse> => {
        const response = await axiosInstance.get<IPokemonResponse>('/pokemon/', {
            params: {
                limit: 20,
                offset
            }
        });

        // Додаємо URL зображення до результатів
        const results = response.data.results.map((pokemon: any) => ({
            ...pokemon,
            id: pokemon.url.split('/')[6], // Отримання ID з URL
            imageUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.url.split('/')[6]}.png`
        }));

        return { results, next: response.data.next, previous: response.data.previous };
    },

    getImage: (id: string) => {
        return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
    }
};