import {configureStore} from "@reduxjs/toolkit";
import {useDispatch, useSelector} from "react-redux";
import {PokemonSlice} from "./slices/pokemonsSlice";

export const store = configureStore({
    reducer: {
        PokemonSlice: PokemonSlice.reducer
    }
})



export const useAppSelector = useSelector.withTypes<ReturnType<typeof store.getState>>();
export const useAppDispatch = useDispatch.withTypes<typeof store.dispatch>();