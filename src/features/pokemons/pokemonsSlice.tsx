import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchPokemonsData } from './pokemonsAPI';
import { IPokemon, PokemonState } from '../../typse';

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
        const data = await fetchPokemonsData(page);
        return data;
    }
);

const pokemonSlice = createSlice({
    name: 'pokemons',
    initialState,
    reducers: {
        setPage: (state, action) => {
            state.page = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPokemons.pending, (state) => {
                state.isLoaded = false;
                state.error = null;
            })
            .addCase(fetchPokemons.fulfilled, (state, action) => {
                state.pokemons = action.payload.results;
                state.totalPages = Math.ceil(action.payload.count / 20);
                state.isLoaded = true;
            })
            .addCase(fetchPokemons.rejected, (state, action) => {
                state.isLoaded = true;
                state.error = action.error.message || 'Failed to load pokemons';
            });
    },
});

export const { setPage } = pokemonSlice.actions;
export default pokemonSlice.reducer;