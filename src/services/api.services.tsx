
import axios from 'axios';
import { IPokemonResponse } from '../models/IPokemonCharacteristic';
import {IPokemonDetail} from "../models/IPokemonDetail";

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
    },
    getPokemonById: async (id: string): Promise<IPokemonDetail> => {
        const response = await axiosInstance.get(`/pokemon/${id}`);

        const data = response.data;

        // Перетворюємо дані на тип IPokemonDetail
        const pokemonDetail: IPokemonDetail = {
            id: data.id,
            name: data.name,
            imageUrl: data.sprites.front_default,
            height: data.height,
            weight: data.weight,
            base_experience: data.base_experience,
            abilities: data.abilities.map((ability: any) => ({
                ability: {
                    name: ability.ability.name
                }
            })),
            stats: data.stats.map((stat: any) => ({
                stat: {
                    name: stat.stat.name
                },
                base_stat: stat.base_stat
            })),
            types: data.types.map((type: any) => ({
                type: {
                    name: type.type.name
                }
            })),
            forms: data.forms.map((form: any) => ({
                name: form.name
            }))
        };

        return pokemonDetail;
    }
};
