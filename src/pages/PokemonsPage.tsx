
import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from "../redux/store";
import { pokemonAction } from "../redux/slices/pokemonsSlice";
import PokemonList from "../components/Pokemons/PokemonList";
import Pagination from "../components/Pagination/Pagination";
import { useSearchParams, useNavigate } from "react-router-dom";
import { IPokemon } from "../models/IPokemon";

const PokemonsContainer = () => {
    const [query] = useSearchParams();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { pokemons, previous, next } = useAppSelector(state => state.PokemonSlice);

    useEffect(() => {
        const currentPage = query.get('page');
        const page = currentPage ? Number(currentPage) : 1;
        dispatch(pokemonAction.loadPokemon({ page }));
    }, [query, dispatch]);

    const onCardClick = (pokemon: IPokemon) => {
        console.log('Clicked Pokemon:', pokemon);
        navigate(`/pokemon/${pokemon.id}`);
    };

    const onAddToFavorites = (pokemon: IPokemon) => {
        dispatch(pokemonAction.addFavorite(pokemon));
    };

    return (
        <div>
            <PokemonList
                pokemons={pokemons}
                onCardClick={onCardClick}

            />
            <hr/>
            <Pagination prev={previous} next={next}/>
        </div>
    );
};

export default PokemonsContainer;
