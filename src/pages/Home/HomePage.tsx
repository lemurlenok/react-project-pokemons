import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { fetchPokemons, setPage } from '../../features/pokemons/pokemonsSlice';
import { IPokemon } from '../../typse';

const Home: React.FC = () => {
    const dispatch = useAppDispatch();
    const pokemons = useAppSelector((state) => state.pokemons.pokemons);
    const isLoaded = useAppSelector((state) => state.pokemons.isLoaded);
    const error = useAppSelector((state) => state.pokemons.error);
    const page = useAppSelector((state) => state.pokemons.page);
    const totalPages = useAppSelector((state) => state.pokemons.totalPages);

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
            <h1>Pokémon List</h1>
            <ul>
                {pokemons.map((pokemon) => (
                    <li key={pokemon.name}>
                        <Link to={`/pokemon/${pokemon.name}`}>
                            <h3>{pokemon.name}</h3>
                            <img
                                src={`https://pokeapi.co/api/v2/pokemon/${pokemon.name}/sprites/front_default`}
                                alt={pokemon.name}
                            />
                        </Link>
                    </li>
                ))}
            </ul>
            <button onClick={handlePrevPage} disabled={page === 1}>Previous</button>
            <button onClick={handleNextPage} disabled={page === totalPages}>Next</button>
        </div>
    );
};

export default Home;