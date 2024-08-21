export const API_BASE_URL = 'https://pokeapi.co/api/v2/';


export const getPokemonImageUrl = (id: number): string =>
    `https://pokeapi.co/api/v2/pokemon/${id}/sprites/default`;


export const getPokemonDetailUrl = (name: string): string =>
    `${API_BASE_URL}pokemon/${name}`;