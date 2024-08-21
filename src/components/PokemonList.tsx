import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store/store';
import { fetchPokemons, setPage } from '../features/pokemons/pokemonsSlice';
import { RootState } from '../store/store';
const PokemonList: React.FC = () => {
    const dispatch = useAppDispatch();
    const pokemons = useAppSelector((state: RootState) => state.pokemons.pokemons);
    const isLoaded = useAppSelector((state: RootState) => state.pokemons.isLoaded);
    const error = useAppSelector((state: RootState) => state.pokemons.error);
    const page = useAppSelector((state: RootState) => state.pokemons.page);
    const totalPages = useAppSelector((state: RootState) => state.pokemons.totalPages);

    useEffect(() => {
        dispatch(fetchPokemons(page));
    }, [dispatch, page]);

    const handleNextPage = () => {
        if (page < totalPages) {
            dispatch(setPage(page + 1));
        }
    };

    const handlePrevPage = () => {
        if (page > 1) {
            dispatch(setPage(page - 1));
        }
    };

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!isLoaded) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <ul>
                {pokemons.map((pokemon) => (
                    <li key={pokemon.name}>
                        <h3>{pokemon.name}</h3>
                        <img src={`https://pokeapi.co/api/v2/pokemon/${pokemon.name}/`} alt={pokemon.name} />
                    </li>
                ))}
            </ul>
            <button onClick={handlePrevPage} disabled={page === 1}>Previous</button>
            <button onClick={handleNextPage} disabled={page === totalPages}>Next</button>
        </div>
    );
};

export default PokemonList;