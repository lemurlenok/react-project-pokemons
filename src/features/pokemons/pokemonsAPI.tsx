import axios from 'axios';

export const fetchPokemonsData = async (page: number) => {
    const limit = 20;
    const offset = (page - 1) * limit;
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
    return response.data;
};