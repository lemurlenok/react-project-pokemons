import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { IPokemon, PokemonResponse } from '../../typse';
import { getPokemonDetailUrl } from '../../urls/pokemonUrls';

interface PokemonState {
    pokemons: IPokemon[];
    isLoaded: boolean;
    error: string | null;
    page: number;
    totalPages: number;
}

const initialState: PokemonState = {
    pokemons: [],
    isLoaded: false,
    error: null,
    page: 1,
    totalPages: 1,
};

export const fetchPokemons = createAsyncThunk(
    'pokemons/fetchPokemons',
    async (page: number) => {
        try {
            const response = await axios.get<PokemonResponse>(
                `https://pokeapi.co/api/v2/pokemon?offset=${(page - 1) * 20}&limit=20`
            );

            const pokemonDetailsPromises = response.data.results.map(async (pokemon) => {
                const detailResponse = await axios.get(getPokemonDetailUrl(pokemon.name));
                return {
                    id: detailResponse.data.id,
                    name: detailResponse.data.name,
                    url: pokemon.url,  // Додайте URL, якщо потрібно
                };
            });

            const pokemons = await Promise.all(pokemonDetailsPromises);

            return { pokemons, totalPages: Math.ceil(response.data.count / 20) };
        } catch (error) {
            // Виправте тип для 'error'
            const message = error instanceof Error ? error.message : 'Unknown error';
            throw new Error(message);
        }
    }
);

const pokemonsSlice = createSlice({
    name: 'pokemons',
    initialState,
    reducers: {
        setPage: (state, action) => {
            state.page = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPokemons.pending, (state) => {
                state.isLoaded = false;
                state.error = null;
            })
            .addCase(fetchPokemons.fulfilled, (state, action) => {
                state.isLoaded = true;
                state.pokemons = action.payload.pokemons;
                state.totalPages = action.payload.totalPages;
            })
            .addCase(fetchPokemons.rejected, (state, action) => {
                state.isLoaded = true;
                state.error = action.error.message || 'Unknown error';
            });
    },
});

export const { setPage } = pokemonsSlice.actions;
export default pokemonsSlice.reducer;