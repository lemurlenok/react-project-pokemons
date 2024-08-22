import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../redux/store";
import {pokemonAction} from "../redux/slices/pokemonsSlice";
import PokemonsComponent from "../components/Pokemons/PokemonList";
import Pagination from "../components/Pagination/Pagination";
import {useSearchParams} from "react-router-dom";

const Pokemons = () => {

    const [query] = useSearchParams({page: '1'})

    let dispatch = useAppDispatch();
    let {pokemons, previous, next} = useAppSelector(state => state.PokemonSlice)

    useEffect(() => {
        const currentPage = query.get('page');
        const page = currentPage ? Number(currentPage) : 1;

        dispatch(pokemonAction.loadPokemon({ page }))
    }, [query.get('page'), dispatch]);


    return (
        <div>
            <Pokemons pokemons={pokemons}/>
            <hr/>
            <Pagination prev={previous} next={next}/>
        </div>
    );
};

export default Pokemons;