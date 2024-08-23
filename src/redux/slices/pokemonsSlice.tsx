
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { IPokemon } from '../../models/IPokemon';
import { PokemonServices } from "../../services/api.services";

interface PokemonState {
    pokemons: IPokemon[];
    favoritePokemons: IPokemon[];
    isLoaded: boolean;
    error: string | null;
    page: number;
    next: string | null;
    previous: string | null;
    totalPages: number;
}

const initialState: PokemonState = {
    pokemons: [],
    favoritePokemons: [],
    isLoaded: false,
    error: null,
    next: null,
    previous: null,
    totalPages: 0,
    page: 1
};

export const loadPokemon = createAsyncThunk('PokemonSlice/loadPokemon', async ({ page }: { page: number }, thunkAPI) => {
    try {
        const offset = (page - 1) * 20;
        const pokemons = await PokemonServices.getAllPokemons(offset);
        return thunkAPI.fulfillWithValue(pokemons);
    } catch (e) {
        let error = e as AxiosError;
        return thunkAPI.rejectWithValue(error?.response?.data);
    }
});

export const PokemonSlice = createSlice({
    name: 'PokemonSlice',
    initialState: initialState,
    reducers: {
        addFavorite: (state, action) => {
            const pokemon = action.payload;
            if (!state.favoritePokemons.some(p => p.name === pokemon.name)) {
                state.favoritePokemons.push(pokemon);
            }
        },
        removeFavorite: (state, action) => {
            state.favoritePokemons = state.favoritePokemons.filter(p => p.name !== action.payload.name);
        }
    },
    extraReducers: builder =>
        builder
            .addCase(loadPokemon.fulfilled, (state, action) => {
                const { results, next, previous } = action.payload;
                state.pokemons = results;
                state.next = next;
                state.previous = previous;
            })
});

export const { addFavorite, removeFavorite } = PokemonSlice.actions;

export const pokemonAction = {
    loadPokemon,
    addFavorite,
    removeFavorite
};
