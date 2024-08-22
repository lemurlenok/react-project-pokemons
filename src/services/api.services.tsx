import axios from "axios";
import {IPokemonResponse} from "../models/IPokemonCharacteristic";

const axiosInstance = axios.create({
    baseURL: 'https://pokeapi.co/api/v2'
})

export const PokemonServices = {
    getAllPokemons: async (offset: number): Promise<IPokemonResponse> => {
        const response = await axiosInstance.get<IPokemonResponse>(`/pokemon/`, {
            params: {
                limit: 20,
                offset
            }
        })
        return response.data
    },
    getImage: (id:string) => {
        return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
    }
}