import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import  {AxiosError} from 'axios';
import { IPokemon } from '../../models/IPokemon';
import {PokemonServices} from "../../services/api.services";

interface PokemonState {
    pokemons: IPokemon[];
    isLoaded: boolean;
    error: string | null;
    page: number;
    next: string | null,
    previous: string | null
    totalPages: number;
}

const initialState: PokemonState = {
    pokemons: [],
    isLoaded: false,
    error: null,
    next: null,
    previous: null,
    totalPages: 1,
};

let loadPokemon = createAsyncThunk ('PokemonSlice/loadPokemon', async ({ page }: { page: number }, thunkAPI) => {
    try {
        const offset = (page - 1) * 20;
        const pokemons = await PokemonServices.getAllPokemons(offset);
        return thunkAPI.fulfillWithValue(pokemons)
    }catch (e) {
        let error = e as AxiosError
        return thunkAPI.rejectWithValue(error?.response?.data)
    }

})


export const PokemonSlice = createSlice({
    name: 'PokemonSlice',
    initialState: initState,
    reducers: {},
    extraReducers: builder =>
        builder
            .addCase(loadPokemon.fulfilled, (state, action) => {
                const {results, next , previous} = action.payload;
                state.pokemons = results;
                state.next = next;
                state.previous = previous;
            })
})

export const pokemonAction = {
    ...PokemonSlice.actions,
    loadPokemon
}